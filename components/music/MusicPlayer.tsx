"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronUp, ChevronDown, Music } from "lucide-react";
import { useMusic } from "./MusicProvider";
import { VolumeControl } from "@/components/ui/VolumeControl";
import { cn } from "@/lib/utils";

/**
 * Floating glassmorphism music player situated at bottom-right corner.
 * Features animated equalizer bars, responsive collapsed/expanded modes,
 * and seamless volume controls.
 */
export const MusicPlayer: React.FC = () => {
  const { isPlaying, isMuted, volume, togglePlay, toggleMute, setVolume } = useMusic();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end"
    >
      <div
        className={cn(
          "glassmorphism rounded-full px-3 py-2 sm:px-4 sm:py-2.5",
          "shadow-[0_12px_32px_rgba(231,143,179,0.25)]",
          "flex items-center gap-2 sm:gap-3 transition-all duration-300"
        )}
      >
        {/* Play / Pause Toggle Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full text-white cursor-pointer select-none",
            "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)]",
            "shadow-[0_4px_12px_rgba(231,143,179,0.4)]",
            "transition-transform active:scale-95 hover:scale-105",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          )}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 fill-white" />
          ) : (
            <Play className="h-4 w-4 fill-white translate-x-0.5" />
          )}
        </button>

        {/* Music Status & Animated Equalizer */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[var(--text-primary)] tracking-wide flex items-center gap-1.5">
              <Music className="h-3 w-3 text-[var(--primary)]" />
              Romantic Melodies
            </span>
            <span className="text-[10px] text-[var(--text-secondary)]">
              {isPlaying ? "Playing softly..." : "Paused"}
            </span>
          </div>

          {/* Equalizer animation */}
          <div className="flex items-center gap-0.5 h-4 w-6 px-1 py-0.5" aria-hidden="true">
            {isPlaying ? (
              <>
                <span className="w-1 rounded-full bg-[var(--primary)] animate-eq-1" />
                <span className="w-1 rounded-full bg-[var(--primary-hover)] animate-eq-2" />
                <span className="w-1 rounded-full bg-[var(--primary)] animate-eq-3" />
                <span className="w-1 rounded-full bg-[var(--primary-hover)] animate-eq-2" />
              </>
            ) : (
              <span className="w-full h-[2px] bg-[var(--primary)]/40 rounded-full" />
            )}
          </div>
        </div>

        {/* Expand / Collapse Volume Controls */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Collapse volume settings" : "Expand volume settings"}
          className="p-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors cursor-pointer"
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Expanded Glassmorphism Volume Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "mt-2 glassmorphism rounded-2xl p-3",
              "shadow-[0_8px_24px_rgba(231,143,179,0.2)]",
              "flex flex-col gap-2 min-w-[200px]"
            )}
          >
            <div className="text-[11px] font-medium text-[var(--text-secondary)] ml-1">
              Music Volume
            </div>
            <VolumeControl
              volume={volume}
              isMuted={isMuted}
              onVolumeChange={setVolume}
              onToggleMute={toggleMute}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MusicPlayer;
