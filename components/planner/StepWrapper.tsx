"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StepWrapperProps {
  children: React.ReactNode;
  stepKey: string | number;
}

/**
 * Animated step container providing consistent entry/exit transitions
 * (fade, slight scale, and Y-translation) conforming to the PRD motion spec.
 */
export const StepWrapper: React.FC<StepWrapperProps> = ({ children, stepKey }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 18, scale: 0.98 },
    animate: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, scale: 1 },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: -18, scale: 0.98 },
  };

  return (
    <motion.div
      key={stepKey}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full flex flex-col items-center"
    >
      {children}
    </motion.div>
  );
};

export default StepWrapper;
