"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { StepTitle } from "@/components/ui/StepTitle";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { FOOD_OPTIONS } from "@/lib/constants";

interface FoodStepProps {
  selectedFood: string;
  onSelectFood: (foodId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

/**
 * Step 3 — Food Selection.
 * Presents interactive animated cards featuring romantic culinary choices.
 */
export const FoodStep: React.FC<FoodStepProps> = ({
  selectedFood,
  onSelectFood,
  onNext,
  onBack,
}) => {
  const [error, setError] = useState<string>("");

  const handleNext = () => {
    if (!selectedFood) {
      setError("Please choose what delicious cuisine we'll share 🍽");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <StepTitle
        emoji="🍽"
        title="What are you craving?"
        subtitle="Good food is twice as delicious when shared with you."
      />

      <div className="w-full grid grid-cols-2 gap-3 mb-6" role="radiogroup" aria-label="Food options">
        {FOOD_OPTIONS.map((item) => (
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
            selected={selectedFood === item.id}
            onSelect={(id) => {
              onSelectFood(id);
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

export default FoodStep;
