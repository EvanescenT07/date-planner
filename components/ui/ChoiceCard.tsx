"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ChoiceCardProps {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onSelect: (id: string) => void;
  className?: string;
}

/**
 * Animated selectable choice card with soft rounded borders,
 * glowing active states, and tactile micro-interactions.
 */
export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  id,
  title,
  description,
  icon,
  selected,
  onSelect,
  className,
}) => {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={() => onSelect(id)}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col items-center justify-center p-4 text-center",
        "rounded-[22px] border-2 cursor-pointer select-none transition-all duration-250",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
        selected
          ? "border-[var(--primary)] bg-gradient-to-b from-white to-[var(--accent)]/40 shadow-[0_12px_30px_rgba(231,143,179,0.22)]"
          : "border-[var(--border)] bg-white/70 hover:border-[var(--primary)]/50 hover:bg-white shadow-[0_4px_16px_rgba(231,143,179,0.06)]",
        className
      )}
    >
      {/* Selected Indicator Heart */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 450, damping: 20 }}
          className="absolute top-2.5 right-2.5 h-3.5 w-3.5 rounded-full bg-[var(--primary)] flex items-center justify-center"
        >
          <span className="text-[8px] text-white">♥</span>
        </motion.div>
      )}

      {/* Choice Icon */}
      {icon && (
        <div
          className={cn(
            "mb-2.5 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200",
            selected
              ? "bg-[var(--primary)]/15 text-[var(--primary)] scale-110"
              : "bg-[var(--secondary)]/40 text-[var(--primary)] group-hover:scale-105"
          )}
        >
          {icon}
        </div>
      )}

      <div className="font-medium text-sm sm:text-base text-[var(--text-primary)]">
        {title}
      </div>

      {description && (
        <div className="mt-1 text-xs text-[var(--text-secondary)] line-clamp-1">
          {description}
        </div>
      )}
    </motion.button>
  );
};

export default ChoiceCard;
