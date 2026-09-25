"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FloatingCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  layoutId?: string;
}

/**
 * Centered floating card with 32px rounded corners, soft romantic shadow,
 * and subtle glassmorphic backdrop for mobile and desktop screens.
 * Responsive max-width capped at 480px on desktop to maintain intimate framing.
 */
export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className,
  layoutId,
  ...props
}) => {
  return (
    <motion.div
      layoutId={layoutId}
      className={cn(
        "w-full max-w-[480px] mx-auto",
        "bg-white/95 backdrop-blur-xl",
        "rounded-[32px] border border-[var(--border)]",
        "p-6 sm:p-8",
        "shadow-[0_20px_60px_rgba(231,143,179,0.14)]",
        "relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Delicate romantic inner ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[var(--accent)]/30 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[var(--secondary)]/40 blur-2xl"
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default FloatingCard;
