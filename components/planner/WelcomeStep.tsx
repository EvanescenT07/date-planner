"use client";

import React, { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { StepTitle } from "@/components/ui/StepTitle";
import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useMusic } from "@/components/music/MusicProvider";

interface WelcomeStepProps {
  name: string;
  onUpdateName: (name: string) => void;
  onNext: () => void;
}

/**
 * Step 0 — Welcome screen.
 * Captures user's name, initiates background music, and kickstarts the romantic session.
 */
export const WelcomeStep: React.FC<WelcomeStepProps> = ({
  name,
  onUpdateName,
  onNext,
}) => {
  const { play } = useMusic();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please whisper your name to begin ❤️");
      return;
    }
    setError("");
    // Start music on explicit user interaction per browser autoplay policies
    await play();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
      <StepTitle
        emoji="💌"
        title="Hi, before we plan our date..."
        subtitle="May I know who I'm planning this special moment with?"
      />

      <div className="w-full max-w-sm mb-8 space-y-4">
        <InputField
          label="Your Lovely Name"
          placeholder="e.g. Sarah"
          value={name}
          onChange={(e) => {
            onUpdateName(e.target.value);
            if (error) setError("");
          }}
          autoFocus
          error={error}
          icon={<Heart className="h-4 w-4" />}
        />
      </div>

      <PrimaryButton
        type="submit"
        fullWidth
        className="max-w-sm"
        icon={<Sparkles className="h-4 w-4" />}
      >
        Let&apos;s Start
      </PrimaryButton>
    </form>
  );
};

export default WelcomeStep;
