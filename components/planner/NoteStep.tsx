"use client";

import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { StepTitle } from "@/components/ui/StepTitle";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { cn } from "@/lib/utils";

interface NoteStepProps {
  note: string;
  onUpdateNote: (note: string) => void;
  onNext: () => void;
  onBack: () => void;
}

/**
 * Step 5 — Optional Note.
 * Provides a gentle textarea where the user can leave a secret message or dietary preference.
 */
export const NoteStep: React.FC<NoteStepProps> = ({
  note,
  onUpdateNote,
  onNext,
  onBack,
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      <StepTitle
        emoji="💌"
        title="A little secret note?"
        subtitle="Any cravings, allergies, or sweet words you'd like to share?"
      />

      <div className="w-full max-w-sm mb-8">
        <div className="relative">
          <textarea
            rows={4}
            value={note}
            onChange={(e) => onUpdateNote(e.target.value)}
            placeholder="Anything you'd like to tell me? (Optional)"
            className={cn(
              "w-full p-4 text-base text-[var(--text-primary)]",
              "bg-white rounded-[22px] border border-[var(--border)]",
              "placeholder:text-[var(--text-secondary)]/50",
              "shadow-[inset_0_2px_4px_rgba(231,143,179,0.04)] outline-none resize-none",
              "focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--accent)]/50 transition-all"
            )}
          />
        </div>
        <p className="mt-2 text-right text-xs text-[var(--text-secondary)]">
          {note.length} / 280 characters
        </p>
      </div>

      <div className="w-full max-w-sm flex items-center justify-between gap-3">
        <SecondaryButton
          type="button"
          onClick={onBack}
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Back
        </SecondaryButton>

        <PrimaryButton
          type="button"
          onClick={onNext}
          icon={<ArrowRight className="h-4 w-4" />}
        >
          Review Plan
        </PrimaryButton>
      </div>
    </div>
  );
};

export default NoteStep;
