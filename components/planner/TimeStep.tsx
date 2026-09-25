"use client";

import React, { useState } from "react";
import { Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { StepTitle } from "@/components/ui/StepTitle";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { TIME_SLOTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TimeStepProps {
  time: string;
  onUpdateTime: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

/**
 * Step 2 — Time Selection.
 * Enables user to pick a time from 30-minute intervals between 10:00 and 22:00.
 */
export const TimeStep: React.FC<TimeStepProps> = ({
  time,
  onUpdateTime,
  onNext,
  onBack,
}) => {
  const [error, setError] = useState<string>("");

  const handleNext = () => {
    if (!time) {
      setError("Please choose a time for our rendezvous ✨");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <StepTitle
        emoji="🕒"
        title="What time should we meet?"
        subtitle="Every second waiting for this date is going to feel like magic."
      />

      <div className="w-full max-w-sm mb-8 space-y-4">
        {/* Custom styled select box */}
        <div className="relative">
          <label
            htmlFor="time-select-dropdown"
            className="block text-xs font-medium text-[var(--text-secondary)] mb-2 ml-1"
          >
            Select Meeting Time
          </label>
          <div className="relative flex items-center">
            <Clock className="pointer-events-none absolute left-4 h-5 w-5 text-[var(--primary)]" />
            <select
              id="time-select-dropdown"
              value={time}
              onChange={(e) => {
                onUpdateTime(e.target.value);
                if (error) setError("");
              }}
              className={cn(
                "w-full pl-12 pr-10 py-4 text-base text-[var(--text-primary)] font-medium",
                "bg-white rounded-[20px] border border-[var(--border)]",
                "shadow-[inset_0_2px_4px_rgba(231,143,179,0.04)] outline-none cursor-pointer",
                "focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--accent)]/50 transition-all",
                error && "border-rose-400 focus:border-rose-500"
              )}
            >
              <option value="" disabled>
                -- Choose a time slot --
              </option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          {error && (
            <p className="mt-2 ml-2 text-xs text-rose-500 font-medium">
              {error}
            </p>
          )}
        </div>

        {/* Quick romantic time shortcuts */}
        <div className="pt-2">
          <div className="text-[11px] font-medium text-[var(--text-secondary)] mb-2 ml-1">
            Popular romantic hours:
          </div>
          <div className="grid grid-cols-4 gap-2">
            {["12:00", "16:30", "18:30", "19:30"].map((quickSlot) => (
              <button
                key={quickSlot}
                type="button"
                onClick={() => {
                  onUpdateTime(quickSlot);
                  if (error) setError("");
                }}
                className={cn(
                  "py-2 text-xs font-medium rounded-full transition-all cursor-pointer border",
                  time === quickSlot
                    ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-[0_4px_10px_rgba(231,143,179,0.35)]"
                    : "bg-white/80 text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/60"
                )}
              >
                {quickSlot}
              </button>
            ))}
          </div>
        </div>
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

export default TimeStep;
