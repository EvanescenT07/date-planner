"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PrimaryButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Romantic primary button with full pill border radius,
 * smooth hover/tap micro-interactions, and glowing shadow.
 */
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
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
        "inline-flex items-center justify-center gap-2 px-8 py-3.5",
        "rounded-full text-white font-medium text-base tracking-wide",
        "bg-[var(--primary)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-hover)]",
        "shadow-[0_10px_25px_rgba(231,143,179,0.35)]",
        "transition-colors duration-200 cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
        fullWidth ? "w-full" : "w-auto",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
    </motion.button>
  );
};

export default PrimaryButton;
