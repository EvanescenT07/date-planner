"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { StepTitle } from "@/components/ui/StepTitle";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { ACTIVITY_OPTIONS } from "@/lib/constants";

interface ActivityStepProps {
  selectedActivity: string;
  onSelectActivity: (activityId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

/**
 * Step 4 — Activity Selection.
 * Provides curated romantic activity options with custom vector illustrations.
 */
export const ActivityStep: React.FC<ActivityStepProps> = ({
  selectedActivity,
  onSelectActivity,
  onNext,
  onBack,
}) => {
  const [error, setError] = useState<string>("");

  const handleNext = () => {
    if (!selectedActivity) {
      setError("Please choose what fun thing we'll do together ✨");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <StepTitle
        emoji="🎡"
        title="What shall we do together?"
        subtitle="Creating sweet memories, one laughter at a time."
      />

      <div className="w-full grid grid-cols-2 gap-3 mb-6" role="radiogroup" aria-label="Activity options">
        {ACTIVITY_OPTIONS.map((item) => (
          <ChoiceCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            icon={
              <Image
                src={item.iconPath}
                alt={item.title}
                width={28}
                height={28}
                className="h-7 w-7 object-contain transition-transform group-hover:scale-110"
              />
            }
            selected={selectedActivity === item.id}
            onSelect={(id) => {
              onSelectActivity(id);
              if (error) setError("");
            }}
          />
        ))}
      </div>

      {error && (
        <p className="mb-6 text-xs text-rose-500 font-medium text-center">
          {error}
        </p>
      )}

      <div className="w-full flex items-center justify-between gap-3">
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

export default ActivityStep;
