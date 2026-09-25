"use client";

import React from "react";
import { Volume2, VolumeX, Volume1 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VolumeControlProps {
  volume: number; // 0 to 1
  isMuted: boolean;
  onVolumeChange: (newVolume: number) => void;
  onToggleMute: () => void;
  className?: string;
}

/**
 * Romantic volume control slider with mute toggle and dynamic volume iconography.
 */
export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
  className,
}) => {
  const currentVolume = isMuted ? 0 : volume;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onVolumeChange(val);
  };

  return (
    <div className={cn("flex items-center gap-2 px-1 select-none", className)}>
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
        className="p-1.5 rounded-full text-[var(--primary)] hover:bg-[var(--secondary)]/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
      >
        {isMuted || currentVolume === 0 ? (
          <VolumeX className="h-4 w-4" />
        ) : currentVolume < 0.5 ? (
          <Volume1 className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </button>

      <div className="relative flex items-center w-20 sm:w-24">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={currentVolume}
          onChange={handleSliderChange}
          aria-label="Volume slider"
          className={cn(
            "w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-[var(--secondary)]",
            "accent-[var(--primary)] focus:outline-none",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5",
            "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--primary)]",
            "[&::-webkit-slider-thumb]:shadow-[0_2px_4px_rgba(231,143,179,0.4)]",
            "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
          )}
        />
      </div>

      <span className="text-[11px] font-medium text-[var(--text-secondary)] min-w-[28px] text-right">
        {Math.round(currentVolume * 100)}%
      </span>
    </div>
  );
};

export default VolumeControl;
