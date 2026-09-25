"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  Clock,
  Utensils,
  Sparkles,
  MessageCircle,
  RotateCcw,
  Heart,
} from "lucide-react";
import { PlannerData } from "@/types/planner";
import { StepTitle } from "@/components/ui/StepTitle";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { generateWhatsAppUrl, generateGoogleCalendarUrl } from "@/lib/integrations";

interface ConfirmationStepProps {
  data: PlannerData;
  onReset: () => void;
  onEditStep: (stepNumber: 1 | 2 | 3 | 4 | 5) => void;
}

/**
 * Step 6 — Confirmation & Summary.
 * Visualizes the finalized romantic rendezvous and allows direct
 * dispatch to WhatsApp and Google Calendar.
 */
export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  data,
  onReset,
  onEditStep,
}) => {
  // Fire gentle celebratory confetti on arrival
  useEffect(() => {
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#E78FB3", "#FFD6E7", "#F8D8E8", "#D875A0", "#FFFFFF"],
        disableForReducedMotion: true,
      });
    } catch {
      // Confetti is an enhancement; proceed silently if canvas is unavailable
    }
  }, []);

  const whatsAppUrl = generateWhatsAppUrl(data);
  const calendarUrl = generateGoogleCalendarUrl(data);

  return (
    <div className="w-full flex flex-col items-center">
      <StepTitle
        emoji="💖"
        title="It's a Date!"
        subtitle={`I cannot wait to spend this enchanting day with you, ${data.name}.`}
      />

      {/* Romantic Summary Card */}
      <div className="w-full max-w-sm rounded-[24px] bg-gradient-to-b from-white/95 to-[var(--background)] border border-[var(--border)] p-5 mb-6 shadow-[0_10px_30px_rgba(231,143,179,0.12)]">
        <div className="flex items-center justify-between border-b border-[var(--border)]/70 pb-3 mb-3">
          <span className="font-serif text-lg font-semibold text-[var(--text-primary)]">
            Our Date Plan
          </span>
          <Heart className="h-5 w-5 fill-[var(--primary)] text-[var(--primary)]" />
        </div>

        <div className="space-y-3 text-sm">
          {/* Date */}
          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Image
                src="/icons/calendar-empty.svg"
                alt="Calendar"
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
              Date:
            </span>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="font-medium text-[var(--text-primary)] hover:text-[var(--primary)] underline decoration-dotted cursor-pointer"
            >
              {data.date || "Not set"}
            </button>
          </div>

          {/* Time */}
          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Clock className="h-4 w-4 text-[var(--primary)]" />
              Time:
            </span>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="font-medium text-[var(--text-primary)] hover:text-[var(--primary)] underline decoration-dotted cursor-pointer"
            >
              {data.time || "Not set"}
            </button>
          </div>

          {/* Food */}
          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Utensils className="h-4 w-4 text-[var(--primary)]" />
              Food:
            </span>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="font-medium text-[var(--text-primary)] hover:text-[var(--primary)] underline decoration-dotted cursor-pointer"
            >
              {data.food || "Not set"}
            </button>
          </div>

          {/* Activity */}
          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Sparkles className="h-4 w-4 text-[var(--primary)]" />
              Activity:
            </span>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="font-medium text-[var(--text-primary)] hover:text-[var(--primary)] underline decoration-dotted cursor-pointer"
            >
              {data.activity || "Not set"}
            </button>
          </div>

          {/* Note */}
          {data.note.trim() && (
            <div className="pt-2 border-t border-[var(--border)]/70">
              <span className="block text-xs text-[var(--text-secondary)] mb-1">
                Your Secret Note:
              </span>
              <p className="text-xs text-[var(--text-primary)] italic bg-[var(--accent)]/30 rounded-xl p-2.5">
                &ldquo;{data.note.trim()}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Integration Call to Actions */}
      <div className="w-full max-w-sm flex flex-col gap-3 mb-6">
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <PrimaryButton
            type="button"
            fullWidth
            icon={<MessageCircle className="h-5 w-5" />}
            className="bg-[#25D366] hover:bg-[#20ba59] shadow-[0_10px_25px_rgba(37,211,102,0.3)]"
          >
            Send WhatsApp Invitation
          </PrimaryButton>
        </a>

        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <SecondaryButton
            type="button"
            fullWidth
            icon={
              <Image
                src="/icons/calendar-empty.svg"
                alt="Calendar"
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
            }
          >
            Add to Google Calendar
          </SecondaryButton>
        </a>
      </div>

      {/* Reset & Start Over */}
      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors cursor-pointer py-1"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Plan Another Romantic Date
      </button>
    </div>
  );
};

export default ConfirmationStep;
