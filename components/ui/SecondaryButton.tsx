"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SecondaryButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Romantic secondary button with soft glassmorphism tone,
 * smooth hover/tap micro-interactions, and accessible focus state.
 */
export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  icon,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3",
        "rounded-full text-[var(--text-primary)] font-medium text-sm sm:text-base",
        "bg-white/80 hover:bg-[var(--secondary)] active:bg-[var(--accent)]",
        "border border-[var(--border)]",
        "shadow-[0_4px_16px_rgba(231,143,179,0.08)]",
        "transition-colors duration-200 cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        fullWidth ? "w-full" : "w-auto",
        className
      )}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};

export default SecondaryButton;
