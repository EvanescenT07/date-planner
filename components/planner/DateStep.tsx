"use client";

import React, { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { StepTitle } from "@/components/ui/StepTitle";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { cn } from "@/lib/utils";

interface DateStepProps {
  date: string;
  onUpdateDate: (date: string) => void;
  onNext: () => void;
  onBack: () => void;
}

/**
 * Step 1 — Date Selection.
 * Prompts user for date with validation ensuring minimum date is today.
 */
export const DateStep: React.FC<DateStepProps> = ({
  date,
  onUpdateDate,
  onNext,
  onBack,
}) => {
  const [error, setError] = useState<string>("");
  const todayIso = format(new Date(), "yyyy-MM-dd");

  const handleNext = () => {
    if (!date) {
      setError("Please choose a date for us ❤️");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <StepTitle
        icon={
          <Image
            src="/icons/calendar-empty.svg"
            alt="Calendar"
            width={40}
            height={40}
            className="h-10 w-10 object-contain drop-shadow-[0_2px_8px_rgba(231,143,179,0.3)]"
          />
        }
        title="So... when are you free?"
        subtitle="Pick a day when we can escape into our own little world."
      />

      <div className="w-full max-w-sm mb-8">
        <label
          htmlFor="date-picker-input"
          className="block text-xs font-medium text-[var(--text-secondary)] mb-2 ml-1"
        >
          Select Date
        </label>

        <div className="relative flex items-center">
          <div className="pointer-events-none absolute left-4 h-5 w-5 flex items-center justify-center">
            <Image
              src="/icons/calendar-empty.svg"
              alt="Calendar"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
          </div>
          <input
            id="date-picker-input"
            type="date"
            min={todayIso}
            value={date}
            onChange={(e) => {
              onUpdateDate(e.target.value);
              if (error) setError("");
            }}
            className={cn(
              "w-full pl-12 pr-5 py-4 text-base text-[var(--text-primary)] font-medium",
              "bg-white rounded-[20px] border border-[var(--border)]",
              "shadow-[inset_0_2px_4px_rgba(231,143,179,0.04)] outline-none",
              "focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--accent)]/50 transition-all cursor-pointer",
              error && "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
            )}
          />
        </div>

        {error && (
          <p className="mt-2 ml-2 text-xs text-rose-500 font-medium">
            {error}
          </p>
        )}
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
          onClick={handleNext}
          icon={<ArrowRight className="h-4 w-4" />}
        >
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
};

export default DateStep;
