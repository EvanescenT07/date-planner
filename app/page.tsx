import React from "react";
import { MusicProvider } from "@/components/music/MusicProvider";
import { MusicPlayer } from "@/components/music/MusicPlayer";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { PlannerContainer } from "@/components/planner/PlannerContainer";

export default function HomePage() {
  return (
    <MusicProvider>
      <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFF8FA] via-[#FFF0F5] to-[#FFEBF2] px-4 py-8 sm:py-12">
        {/* Subtle ambient floating heart particles */}
        <FloatingParticles />

        {/* Top Decorative Branding / Crest */}
        <header className="relative z-10 w-full text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[var(--border)] shadow-[0_2px_10px_rgba(231,143,179,0.1)]">
            <span className="text-xs font-medium text-[var(--primary)] tracking-widest uppercase">
              A Special Invitation
            </span>
            <span className="text-xs text-[var(--primary)]">🌸</span>
          </div>
        </header>

        {/* Central Card Section */}
        <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-auto">
          <PlannerContainer />
        </main>

        {/* Romantic Bottom Footer */}
        <footer className="relative z-10 w-full text-center mt-6 sm:mt-8">
          <p className="text-xs text-[var(--text-secondary)] font-normal flex items-center justify-center gap-1">
            <span>Handcrafted with love for an unforgettable evening</span>
            <span className="text-[var(--primary)]">❤️</span>
          </p>
        </footer>

        {/* Persistent Floating Music Controller */}
        <MusicPlayer />
      </div>
    </MusicProvider>
  );
}
