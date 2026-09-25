import { describe, it, expect } from "vitest";
import { generateWhatsAppUrl, generateGoogleCalendarUrl } from "@/lib/integrations";
import { TARGET_PHONE_NUMBER } from "@/lib/constants";
import { PlannerData } from "@/types/planner";

describe("Integrations Utility Functions", () => {
  const mockPlannerData: PlannerData = {
    name: "Sarah",
    date: "2026-10-15",
    time: "18:30",
    food: "Sushi",
    activity: "Sunset Walk",
    note: "Looking forward to it!",
  };

  describe("generateWhatsAppUrl", () => {
    it("should generate a valid wa.me URL targeting the configured phone number", () => {
      const url = generateWhatsAppUrl(mockPlannerData);
      expect(url).toContain(`https://wa.me/${TARGET_PHONE_NUMBER}?text=`);
    });

    it("should contain encoded date plan details with emojis", () => {
      const url = generateWhatsAppUrl(mockPlannerData);
      const decodedText = decodeURIComponent(url.split("?text=")[1]);

      expect(decodedText).toContain("Hi! 🌸");
      expect(decodedText).toContain("I'm Sarah.");
      expect(decodedText).toContain("📅 Date: 2026-10-15");
      expect(decodedText).toContain("🕒 Time: 18:30");
      expect(decodedText).toContain("🍽 Food: Sushi");
      expect(decodedText).toContain("🎡 Activity: Sunset Walk");
      expect(decodedText).toContain("💌 Note:\nLooking forward to it!");
      expect(decodedText).toContain("See you soon ❤️");
    });

    it("should handle empty optional notes gracefully with 'None'", () => {
      const emptyNoteData: PlannerData = {
        ...mockPlannerData,
        note: "   ",
      };
      const url = generateWhatsAppUrl(emptyNoteData);
      const decodedText = decodeURIComponent(url.split("?text=")[1]);

      expect(decodedText).toContain("💌 Note:\nNone");
    });
  });

  describe("generateGoogleCalendarUrl", () => {
    it("should target Google Calendar template render endpoint", () => {
      const url = generateGoogleCalendarUrl(mockPlannerData);
      expect(url).toContain("https://calendar.google.com/calendar/render?action=TEMPLATE");
      expect(url).toContain("text=Date%20with%20Iqbal");
    });

    it("should compute dates parameter spanning 2 hours", () => {
      const url = generateGoogleCalendarUrl(mockPlannerData);
      // 2026-10-15 18:30 -> start: 20261015T183000, end: 20261015T203000
      expect(url).toContain("dates=20261015T183000/20261015T203000");
    });

    it("should format details with romantic date plan summary", () => {
      const url = generateGoogleCalendarUrl(mockPlannerData);
      expect(url).toContain("Romantic%20Date%20Plan");
      expect(url).toContain("Name%3A%20Sarah");
      expect(url).toContain("Food%3A%20Sushi");
      expect(url).toContain("Activity%3A%20Sunset%20Walk");
    });
  });
});
