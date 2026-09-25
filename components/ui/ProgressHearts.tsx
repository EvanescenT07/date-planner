"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProgressHeartsProps {
  currentStep: number;
  totalSteps?: number;
  className?: string;
}

/**
 * Top-center progress indicator with animated romantic hearts.
 * As user advances through steps, hearts fill with spring scale animations.
 */
export const ProgressHearts: React.FC<ProgressHeartsProps> = ({
  currentStep,
  totalSteps = 5,
  className,
}) => {
  return (
    <div
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Progress: step ${currentStep} of ${totalSteps}`}
      className={cn("flex items-center justify-center gap-2.5 py-2", className)}
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isFilled = currentStep >= stepNumber;
        const isCurrent = currentStep === stepNumber;

        return (
          <div key={index} className="relative flex items-center justify-center">
            <motion.div
              initial={false}
              animate={{
                scale: isCurrent ? [1, 1.25, 1.1] : isFilled ? 1.05 : 0.95,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="transition-colors duration-300"
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-all duration-300",
                  isFilled
                    ? "fill-[var(--primary)] text-[var(--primary)] drop-shadow-[0_2px_6px_rgba(231,143,179,0.5)]"
                    : "fill-transparent text-[var(--secondary)] hover:text-[var(--primary)]/60"
                )}
                strokeWidth={isFilled ? 1.5 : 2}
              />
            </motion.div>

            {/* Micro sparkle burst for the active current step */}
            {isCurrent && (
              <motion.span
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                className="pointer-events-none absolute h-4 w-4 rounded-full border border-[var(--primary)]"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressHearts;
