"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface EscapeButtonProps {
  /** Reference to the bounding container (e.g. FloatingCard / action arena) */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Optional reference to an element the button must never overlap (e.g. YES button) */
  forbiddenRef?: React.RefObject<HTMLElement | null>;
  /** Proximity threshold in pixels to trigger evasion on desktop */
  escapeDistance?: number;
  /** Cooldown in milliseconds between successive movements */
  cooldownMs?: number;
  /** Callback fired whenever the button evades */
  onEscape?: () => void;
  /** Child content (e.g. "No") */
  children: React.ReactNode;
  className?: string;
}

interface Position {
  x: number;
  y: number;
}

/**
 * Reusable playful evasive button.
 * Smoothly escapes when the cursor gets close on desktop or when tapped on mobile,
 * staying strictly within container bounds and avoiding collisions with forbidden elements.
 */
export const EscapeButton: React.FC<EscapeButtonProps> = ({
  containerRef,
  forbiddenRef,
  escapeDistance = 100,
  cooldownMs = 200,
  onEscape,
  children,
  className,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState<number>(0);
  const lastEscapeTimeRef = useRef<number>(0);

  // Computes a valid, non-overlapping target position within safe container boundaries
  const calculateSafeEscapePosition = useCallback((): Position | null => {
    if (!buttonRef.current || !containerRef.current) return null;

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const forbiddenRect = forbiddenRef?.current?.getBoundingClientRect();

    // Initial button origin without Framer Motion transform offsets
    const originLeft = buttonRect.left - position.x;
    const originTop = buttonRect.top - position.y;

    const padding = 16;
    const minX = containerRect.left + padding - originLeft;
    const maxX = containerRect.right - padding - buttonRect.width - originLeft;
    const minY = containerRect.top + padding - originTop;
    const maxY = containerRect.bottom - padding - buttonRect.height - originTop;

    // Guard if container dimensions are somehow constrained
    if (minX > maxX || minY > maxY) {
      return { x: 0, y: 0 };
    }

    const maxAttempts = 20;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const candidateX = Math.round(minX + Math.random() * (maxX - minX));
      const candidateY = Math.round(minY + Math.random() * (maxY - minY));

      const candidateAbsLeft = originLeft + candidateX;
      const candidateAbsTop = originTop + candidateY;
      const candidateAbsRight = candidateAbsLeft + buttonRect.width;
      const candidateAbsBottom = candidateAbsTop + buttonRect.height;

      // Check collision with the forbidden element if provided
      if (forbiddenRect) {
        const buffer = 20;
        const overlapsForbidden = !(
          candidateAbsRight < forbiddenRect.left - buffer ||
          candidateAbsLeft > forbiddenRect.right + buffer ||
          candidateAbsBottom < forbiddenRect.top - buffer ||
          candidateAbsTop > forbiddenRect.bottom + buffer
        );

        if (overlapsForbidden) continue;
      }

      // Check minimum displacement to prevent imperceptible or jittery micro-movements
      const distance = Math.hypot(candidateX - position.x, candidateY - position.y);
      if (distance >= 50) {
        return { x: candidateX, y: candidateY };
      }
    }

    // Fallback safe delta offset
    return {
      x: Math.max(minX, Math.min(maxX, position.x + (Math.random() > 0.5 ? 80 : -80))),
      y: Math.max(minY, Math.min(maxY, position.y + (Math.random() > 0.5 ? 60 : -60))),
    };
  }, [containerRef, forbiddenRef, position]);

  const triggerEscape = useCallback(() => {
    if (shouldReduceMotion) return;

    const now = Date.now();
    if (now - lastEscapeTimeRef.current < cooldownMs) return;
    lastEscapeTimeRef.current = now;

    const nextPos = calculateSafeEscapePosition();
    if (nextPos) {
      setPosition(nextPos);
      setEscapeCount((prev) => prev + 1);
      onEscape?.();
    }
  }, [calculateSafeEscapePosition, cooldownMs, onEscape, shouldReduceMotion]);

  // Desktop proximity tracking
  useEffect(() => {
    if (shouldReduceMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!buttonRef.current) return;
      const btnRect = buttonRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      const distance = Math.hypot(event.clientX - btnCenterX, event.clientY - btnCenterY);

      if (distance < escapeDistance) {
        triggerEscape();
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [containerRef, escapeDistance, shouldReduceMotion, triggerEscape]);

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      aria-label="No"
      onClick={(e) => {
        if (!shouldReduceMotion) {
          e.preventDefault();
          triggerEscape();
        }
      }}
      animate={{
        x: shouldReduceMotion ? 0 : position.x,
        y: shouldReduceMotion ? 0 : position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 18,
      }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "px-6 py-2.5 rounded-full font-medium text-sm transition-colors",
        "bg-white/90 hover:bg-white text-[var(--text-secondary)] border border-[var(--border-subtle)]",
        "shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40",
        "cursor-pointer select-none",
        className
      )}
    >
      {shouldReduceMotion
        ? children
        : escapeCount > 4
        ? "Still no? 🥺"
        : escapeCount > 2
        ? "Nope! 💨"
        : children}
    </motion.button>
  );
};

export default EscapeButton;
