"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

export interface MusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (newVolume: number) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

const STORAGE_KEY_MUSIC_MUTED = "datePlannerMusicMuted";
const STORAGE_KEY_MUSIC_VOLUME = "datePlannerMusicVolume";

/**
 * Romantic Music Provider managing persistent audio playback, volume controls,
 * and seamless background audio across steps.
 */
export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.65);
  const [hasUserStarted, setHasUserStarted] = useState<boolean>(false);

  // Restore volume and mute preferences from localStorage
  useEffect(() => {
    try {
      const savedMuted = window.localStorage.getItem(STORAGE_KEY_MUSIC_MUTED);
      if (savedMuted !== null) {
        setIsMuted(savedMuted === "true");
      }

      const savedVol = window.localStorage.getItem(STORAGE_KEY_MUSIC_VOLUME);
      if (savedVol !== null) {
        const parsed = parseFloat(savedVol);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
          setVolumeState(parsed);
        }
      }
    } catch (err) {
      if (err instanceof DOMException) {
        console.warn("Storage access restricted for music settings:", err.message);
      }
    }
  }, []);

  // Update HTMLAudioElement volume & muted properties
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Procedural gentle romantic chime generator for ambient mood
  const playRomanticChime = useCallback((ctx: AudioContext, freq: number, delay: number) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.04 * (isMuted ? 0 : volume), ctx.currentTime + delay + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 2.4);
    } catch (err) {
      if (err instanceof DOMException) {
        console.warn("AudioContext tone generation prevented:", err.message);
      }
    }
  }, [isMuted, volume]);

  const startAmbientLoop = useCallback(() => {
    if (synthIntervalRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Gentle C Major 7 chord progression (C4, E4, G4, B4, D5)
      const chordNotes = [
        [261.63, 329.63, 392.0, 493.88], // Cmaj7
        [220.0, 261.63, 329.63, 392.0],  // Am7
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [196.0, 246.94, 293.66, 392.0],  // G7
      ];

      let chordIndex = 0;

      const playChord = () => {
        const notes = chordNotes[chordIndex % chordNotes.length];
        notes.forEach((freq, idx) => {
          playRomanticChime(ctx, freq, idx * 0.4);
        });
        chordIndex++;
      };

      playChord();
      synthIntervalRef.current = setInterval(playChord, 4500);
    } catch (err) {
      if (err instanceof DOMException) {
        console.warn("Ambient synthesizer unavailable:", err.message);
      }
    }
  }, [playRomanticChime]);

  const stopAmbientLoop = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  }, []);

  const play = useCallback(async () => {
    setHasUserStarted(true);

    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        return;
      } catch (err) {
        if (err instanceof DOMException) {
          // Fallback to procedural ambient romantic chime if file playback fails
          console.info("Audio file playback fallback triggered. Using ambient generator.", err.message);
          startAmbientLoop();
          setIsPlaying(true);
          return;
        }
      }
    } else {
      startAmbientLoop();
      setIsPlaying(true);
    }
  }, [startAmbientLoop]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopAmbientLoop();
    setIsPlaying(false);
  }, [stopAmbientLoop]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY_MUSIC_MUTED, String(nextMuted));
      } catch (err) {
        if (err instanceof DOMException) {
          console.warn("Could not save mute preference:", err.message);
        }
      }
      return nextMuted;
    });
  }, []);

  const setVolume = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY_MUSIC_VOLUME, String(clamped));
    } catch (err) {
      if (err instanceof DOMException) {
        console.warn("Could not save volume preference:", err.message);
      }
    }
  }, [isMuted]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      stopAmbientLoop();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [stopAmbientLoop]);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        play,
        pause,
        togglePlay,
        toggleMute,
        setVolume,
      }}
    >
      {/* Background audio element for public/music/background.mp3 */}
      <audio
        ref={audioRef}
        src="/music/background.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          if (hasUserStarted && isPlaying) {
            startAmbientLoop();
          }
        }}
      />
      {children}
    </MusicContext.Provider>
  );
};

export function useMusic(): MusicContextType {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}

export default MusicProvider;
