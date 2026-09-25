import { format, parse, addHours, isValid } from "date-fns";
import { PlannerData } from "@/types/planner";
import { TARGET_PHONE_NUMBER } from "@/lib/constants";

/**
 * Generates a prefilled WhatsApp message URL according to PRD specification.
 *
 * @param data - User date planner choices
 * @returns Fully encoded WhatsApp URL
 */
export function generateWhatsAppUrl(data: PlannerData): string {
  const noteSection = data.note.trim() ? data.note.trim() : "None";

  const messageText = `Hi! 🌸\n\nI'm ${data.name}.\n\nOur date plan:\n\n📅 Date: ${data.date}\n🕒 Time: ${data.time}\n🍽 Food: ${data.food}\n🎡 Activity: ${data.activity}\n\n💌 Note:\n${noteSection}\n\nSee you soon ❤️`;

  return `https://wa.me/${TARGET_PHONE_NUMBER}?text=${encodeURIComponent(messageText)}`;
}

/**
 * Generates a Google Calendar event template URL according to PRD specification.
 * Sets title to "Date with Iqbal", event duration to 2 hours, and passes date choices.
 *
 * @param data - User date planner choices
 * @returns Fully formatted Google Calendar template URL
 */
export function generateGoogleCalendarUrl(data: PlannerData): string {
  const title = encodeURIComponent("Date with Iqbal");

  const noteSection = data.note.trim() ? data.note.trim() : "No special notes.";
  const details = encodeURIComponent(
    `Romantic Date Plan\n\nName: ${data.name}\nFood: ${data.food}\nActivity: ${data.activity}\nNote:\n${noteSection}`
  );

  let datesParam = "";
  try {
    const combinedString = `${data.date} ${data.time}`;
    const startDate = parse(combinedString, "yyyy-MM-dd HH:mm", new Date());

    if (isValid(startDate)) {
      const endDate = addHours(startDate, 2);
      const startIso = format(startDate, "yyyyMMdd'T'HHmmss");
      const endIso = format(endDate, "yyyyMMdd'T'HHmmss");
      datesParam = `&dates=${startIso}/${endIso}`;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.warn("Could not parse date/time for Google Calendar:", error.message);
    }
  }

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}${datesParam}&details=${details}`;
}
