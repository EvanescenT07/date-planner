"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { useDatePlanner } from "@/hooks/useDatePlanner";
import { FloatingCard } from "@/components/ui/FloatingCard";
import { ProgressHearts } from "@/components/ui/ProgressHearts";
import { StepWrapper } from "./StepWrapper";
import { WelcomeStep } from "./WelcomeStep";
import { DateStep } from "./DateStep";
import { TimeStep } from "./TimeStep";
import { FoodStep } from "./FoodStep";
import { ActivityStep } from "./ActivityStep";
import { NoteStep } from "./NoteStep";
import { ConfirmationStep } from "./ConfirmationStep";
import { IntroDecisionStep } from "./IntroDecisionStep";

/**
 * Main orchestrator for the multi-step romantic date planner wizard.
 * Coordinates smooth step transitions, progress indicator, and persistent state.
 */
export const PlannerContainer: React.FC = () => {
  const {
    introAccepted,
    acceptIntro,
    step,
    data,
    isHydrated,
    next,
    back,
    goToStep,
    updateField,
    reset,
  } = useDatePlanner();

  // Prevent hydration flash while restoring sessionStorage
  if (!isHydrated) {
    return (
      <div className="w-full max-w-[480px] mx-auto min-h-[420px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-[var(--primary)] animate-pulse">
          <span className="text-3xl">🌸</span>
          <span className="text-sm font-medium tracking-wide text-[var(--text-secondary)]">
            Preparing your invitation...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Progress hearts displayed for planning steps 1 through 5 once intro is accepted */}
      {introAccepted && step >= 1 && step <= 5 && (
        <div className="mb-4">
          <ProgressHearts currentStep={step} totalSteps={5} />
        </div>
      )}

      {/* Main interactive floating card */}
      <FloatingCard>
        <AnimatePresence mode="wait">
          {!introAccepted ? (
            <StepWrapper stepKey="intro-decision">
              <IntroDecisionStep onAccept={acceptIntro} />
            </StepWrapper>
          ) : (
            <>
              {step === 0 && (
                <StepWrapper stepKey={0}>
                  <WelcomeStep
                    name={data.name}
                    onUpdateName={(name) => updateField("name", name)}
                    onNext={next}
                  />
                </StepWrapper>
              )}

          {step === 1 && (
            <StepWrapper stepKey={1}>
              <DateStep
                date={data.date}
                onUpdateDate={(date) => updateField("date", date)}
                onNext={next}
                onBack={back}
              />
            </StepWrapper>
          )}

          {step === 2 && (
            <StepWrapper stepKey={2}>
              <TimeStep
                time={data.time}
                onUpdateTime={(time) => updateField("time", time)}
                onNext={next}
                onBack={back}
              />
            </StepWrapper>
          )}

          {step === 3 && (
            <StepWrapper stepKey={3}>
              <FoodStep
                selectedFood={data.food}
                onSelectFood={(food) => updateField("food", food)}
                onNext={next}
                onBack={back}
              />
            </StepWrapper>
          )}

          {step === 4 && (
            <StepWrapper stepKey={4}>
              <ActivityStep
                selectedActivity={data.activity}
                onSelectActivity={(activity) => updateField("activity", activity)}
                onNext={next}
                onBack={back}
              />
            </StepWrapper>
          )}

          {step === 5 && (
            <StepWrapper stepKey={5}>
              <NoteStep
                note={data.note}
                onUpdateNote={(note) => updateField("note", note)}
                onNext={next}
                onBack={back}
              />
            </StepWrapper>
          )}

              {step === 6 && (
                <StepWrapper stepKey={6}>
                  <ConfirmationStep
                    data={data}
                    onReset={reset}
                    onEditStep={(targetStep) => goToStep(targetStep)}
                  />
                </StepWrapper>
              )}
            </>
          )}
        </AnimatePresence>
      </FloatingCard>
    </div>
  );
};

export default PlannerContainer;
