"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StepTitleProps {
  title: string;
  subtitle?: string;
  emoji?: string;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Romantic step heading with Playfair Display serif typography,
 * smooth entrance animations, and descriptive subtitle.
 */
export const StepTitle: React.FC<StepTitleProps> = ({
  title,
  subtitle,
  emoji,
  icon,
  className,
}) => {
  return (
    <div className={cn("text-center mb-6 sm:mb-8", className)}>
      {icon ? (
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="flex items-center justify-center mb-2 select-none"
        >
          {icon}
        </motion.div>
      ) : emoji ? (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 18 }}
          className="text-3xl sm:text-4xl mb-2 select-none"
        >
          {emoji}
        </motion.div>
      ) : null}

      <motion.h2
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="mt-1.5 text-sm sm:text-base text-[var(--text-secondary)] font-normal max-w-sm mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default StepTitle;
