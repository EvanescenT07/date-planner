"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, ArrowRight } from "lucide-react";
import { EscapeButton } from "./EscapeButton";
import { useMusic } from "@/components/music/MusicProvider";

interface IntroDecisionStepProps {
  onAccept: () => void;
}

type IntroStage = "question" | "celebration";

interface ConfettiParticle {
  id: number;
  top: string;
  left?: string;
  right?: string;
  size: number;
  color: string;
  delay: number;
}

const CONFETTI_PARTICLES: ConfettiParticle[] = [
  { id: 1, top: "14%", left: "12%", size: 10, color: "bg-pink-300/70", delay: 0 },
  { id: 2, top: "22%", right: "14%", size: 8, color: "bg-rose-400/60", delay: 0.2 },
  { id: 3, top: "42%", left: "8%", size: 12, color: "bg-pink-400/50", delay: 0.4 },
  { id: 4, top: "50%", right: "10%", size: 14, color: "bg-rose-300/60", delay: 0.1 },
  { id: 5, top: "72%", left: "18%", size: 9, color: "bg-pink-200/80", delay: 0.3 },
  { id: 6, top: "78%", right: "18%", size: 11, color: "bg-pink-400/50", delay: 0.5 },
];

/**
 * Two-stage introductory flow:
 * Stage 1 ("question"): "Can I ask you something?" with playful evasive NO and YES button.
 * Stage 2 ("celebration"): "HUH?? you said yes?? 🤭" with celebratory confetti and "okay okay! →" proceed button.
 */
export const IntroDecisionStep: React.FC<IntroDecisionStepProps> = ({ onAccept }) => {
  const { play } = useMusic();
  const [stage, setStage] = useState<IntroStage>("question");
  const arenaRef = useRef<HTMLDivElement | null>(null);
  const yesButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleYes = async () => {
    // Initiate background audio playback in response to direct user gesture
    await play();
    setStage("celebration");
  };

  return (
    <div
      ref={arenaRef}
      className="relative w-full flex flex-col items-center justify-center min-h-[380px] text-center px-4 py-4 overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {stage === "question" ? (
          <motion.div
            key="question-stage"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full flex flex-col items-center justify-center"
          >
            {/* Decorative Envelope Sticker with Rainbow Heart */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative mb-6"
            >
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-pink-100 via-rose-100 to-pink-200/80 flex items-center justify-center shadow-inner relative border border-white/60">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center justify-center"
                >
                  <span className="text-4xl filter drop-shadow">💌</span>
                </motion.div>

                <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-[var(--primary)] animate-pulse" />
                <Heart className="absolute -bottom-1 -left-2 w-4 h-4 fill-[var(--primary)] text-[var(--primary)]" />
              </div>
            </motion.div>

            {/* Romantic Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-playfair text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] mb-2 tracking-tight"
            >
              Can I ask you something?
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-[var(--text-secondary)] text-sm sm:text-base font-normal mb-8 max-w-xs"
            >
              Promise you&apos;ll answer honestly.
            </motion.p>

            {/* Button Action Zone */}
            <div className="w-full flex items-center justify-center gap-4 relative z-10">
              {/* YES Button */}
              <motion.button
                ref={yesButtonRef}
                type="button"
                onClick={handleYes}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.2 }}
                className="px-8 py-3 rounded-full font-medium text-sm text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-md hover:shadow-lg transition-colors flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
              >
                <span>YES</span>
                <span>💖</span>
              </motion.button>

              {/* Evasive NO Button */}
              <EscapeButton
                containerRef={arenaRef}
                forbiddenRef={yesButtonRef}
                escapeDistance={90}
                cooldownMs={200}
              >
                NO
              </EscapeButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration-stage"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full flex flex-col items-center justify-center relative py-2"
          >
            {/* Background Floating Confetti Dots */}
            {CONFETTI_PARTICLES.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0.4, 0.9, 0.4],
                  scale: [1, 1.25, 1],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
                style={{
                  top: particle.top,
                  left: particle.left,
                  right: particle.right,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                }}
                className={`absolute rounded-full pointer-events-none ${particle.color}`}
              />
            ))}

            {/* Celebratory Party Popper Illustration */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: [0, 1.2, 1], rotate: [0, 8, -6, 0] }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="relative mb-6"
            >
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-100 via-pink-100 to-rose-200/90 flex items-center justify-center shadow-md relative border border-white/70">
                <span className="text-5xl filter drop-shadow-md select-none">🎉</span>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-500 animate-bounce" />
                <Heart className="absolute -bottom-1 -left-2 w-5 h-5 fill-[var(--primary)] text-[var(--primary)]" />
              </div>
            </motion.div>

            {/* Shocked / Joyful Heading matching Reference */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-playfair text-2xl sm:text-3xl font-bold text-[var(--primary)] mb-2 tracking-tight flex items-center justify-center gap-2 flex-wrap"
            >
              <span>HUH?? you said yes??</span>
              <span className="text-3xl sm:text-4xl">🤭</span>
            </motion.h1>

            {/* Processing Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="text-[var(--text-secondary)] text-sm sm:text-base font-normal mb-8 max-w-xs"
            >
              okay i need a minute to process this
            </motion.p>

            {/* "okay okay! →" Action Button */}
            <motion.button
              type="button"
              onClick={onAccept}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.35 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 rounded-full font-medium text-sm text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
            >
              <span>okay okay!</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroDecisionStep;
