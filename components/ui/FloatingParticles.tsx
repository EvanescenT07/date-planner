"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Particle {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
}

/**
 * Ambient floating heart background particles.
 * Generates lightweight drifting hearts with low opacity and slow motion.
 * Automatically halts when user prefers reduced motion.
 */
export const FloatingParticles: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Generate deterministic particle values to avoid hydration variance
  const particles: Particle[] = useMemo(() => {
    return [
      { id: 1, size: 14, left: 10, delay: 0, duration: 18, opacity: 0.25 },
      { id: 2, size: 20, left: 25, delay: 4, duration: 22, opacity: 0.18 },
      { id: 3, size: 16, left: 45, delay: 2, duration: 19, opacity: 0.22 },
      { id: 4, size: 24, left: 65, delay: 6, duration: 24, opacity: 0.15 },
      { id: 5, size: 18, left: 82, delay: 1, duration: 20, opacity: 0.2 },
      { id: 6, size: 12, left: 92, delay: 5, duration: 16, opacity: 0.28 },
      { id: 7, size: 22, left: 35, delay: 8, duration: 25, opacity: 0.14 },
    ];
  }, []);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110vh", x: 0, opacity: 0 }}
          animate={{
            y: "-10vh",
            x: [0, 15, -15, 0],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width={p.size}
            height={p.size}
            fill="#E78FB3"
            stroke="none"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;
