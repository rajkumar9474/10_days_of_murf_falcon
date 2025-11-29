'use client';

import { Button } from '@/components/livekit/button';
import { useEffect, useState } from 'react';

function DragonIcon() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-8 size-28 md:size-32 text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.8)] animate-pulse"
      style={{
        filter: 'drop-shadow(0 0 40px rgba(251, 191, 36, 0.6)) drop-shadow(0 0 60px rgba(251, 191, 36, 0.3))',
        animation: 'float 6s ease-in-out infinite'
      }}
    >
      <path
        d="M40 10C35 10 30 12 26 16C22 20 20 25 20 30C20 32 20.5 34 21 36L15 42C13 44 13 47 15 49L19 53L15 57C13 59 13 62 15 64L21 70C23 72 26 72 28 70L32 66L36 70C38 72 41 72 43 70L49 64C51 62 51 59 49 57L45 53L49 49C51 47 51 44 49 42L43 36C43.5 34 44 32 44 30C44 25 42 20 38 16C34 12 29 10 24 10H40ZM40 20C42 20 44 21 45 23C46 25 47 27 47 30C47 33 46 35 45 37C44 39 42 40 40 40C38 40 36 39 35 37C34 35 33 33 33 30C33 27 34 25 35 23C36 21 38 20 40 20ZM28 28C29.1 28 30 28.9 30 30C30 31.1 29.1 32 28 32C26.9 32 26 31.1 26 30C26 28.9 26.9 28 28 28ZM52 28C53.1 28 54 28.9 54 30C54 31.1 53.1 32 52 32C50.9 32 50 31.1 50 30C50 28.9 50.9 28 52 28Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Floating particle component
function FloatingParticle({ delay, duration, x, y }: { delay: number; duration: number; x: string; y: string }) {
  return (
    <div
      className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
      style={{
        left: x,
        top: y,
        animation: `float-particle ${duration}s ease-in-out ${delay}s infinite`,
        boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)'
      }}
    />
  );
}

// Decorative corner ornament
function CornerOrnament({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4 rotate-90',
    'bottom-left': 'bottom-4 left-4 -rotate-90',
    'bottom-right': 'bottom-4 right-4 rotate-180'
  };

  return (
    <div className={`absolute ${positionClasses[position]} w-16 h-16 opacity-30 pointer-events-none`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 10 L10 40 Q10 50 20 50 L40 50 M10 10 L40 10 Q50 10 50 20 L50 40"
          stroke="currentColor"
          strokeWidth="2"
          className="text-amber-500"
        />
        <circle cx="10" cy="10" r="3" fill="currentColor" className="text-amber-400" />
      </svg>
    </div>
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radial gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-purple-900/20 via-purple-900/5 to-transparent blur-3xl animate-pulse"
          style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-amber-900/15 via-amber-900/5 to-transparent blur-3xl animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '1s' }} />

        {/* Floating particles */}
        {mounted && (
          <>
            <FloatingParticle delay={0} duration={8} x="10%" y="20%" />
            <FloatingParticle delay={1} duration={10} x="85%" y="30%" />
            <FloatingParticle delay={2} duration={9} x="25%" y="70%" />
            <FloatingParticle delay={0.5} duration={11} x="75%" y="60%" />
            <FloatingParticle delay={1.5} duration={7} x="50%" y="15%" />
            <FloatingParticle delay={2.5} duration={9} x="90%" y="80%" />
            <FloatingParticle delay={3} duration={10} x="15%" y="85%" />
            <FloatingParticle delay={0.8} duration={8} x="60%" y="90%" />
          </>
        )}
      </div>

      {/* Decorative corner ornaments */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      {/* Main content */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 min-h-screen">
        {/* Ornate border container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Top decorative line */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <DragonIcon />

          {/* Title with ornate styling */}
          <div className="relative inline-block mb-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight relative z-10"
              style={{
                fontFamily: 'Georgia, serif',
                textShadow: '0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3)'
              }}>
              <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Epic Fantasy
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full" />
          </div>

          {/* Dragon emoji with glow */}
          <div className="text-6xl mb-6 animate-bounce" style={{
            animationDuration: '3s',
            filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))'
          }}>
            🐉
          </div>

          {/* Description with ornate box */}
          <div className="relative max-w-2xl mx-auto mb-8 p-6 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(217, 119, 6, 0.05) 100%)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              boxShadow: '0 0 30px rgba(251, 191, 36, 0.1), inset 0 0 30px rgba(251, 191, 36, 0.05)'
            }}>
            <p className="text-amber-100 text-xl md:text-2xl leading-8 font-medium mb-4">
              Embark on a <span className="text-amber-300 font-bold">voice-guided journey</span> through a world of dragons, magic, and ancient mysteries.
            </p>

            <p className="text-amber-200/70 text-base md:text-lg leading-7">
              Your Game Master awaits to guide you through an epic tale of adventure, peril, and glory.
            </p>

            {/* Decorative dots */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            </div>
          </div>

          {/* Call to action */}
          <div className="flex flex-col items-center gap-4 mt-10">
            <Button
              variant="primary"
              size="lg"
              onClick={onStartCall}
              className="fantasy-glow w-80 font-bold text-xl py-8 rounded-xl relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #d97706 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s ease-in-out infinite',
                boxShadow: '0 0 40px rgba(251, 191, 36, 0.6), 0 10px 30px rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(251, 191, 36, 0.5)'
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-2xl">⚔️</span>
                <span style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
                  BEGIN ADVENTURE
                </span>
                <span className="text-2xl">⚔️</span>
              </span>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>

            {/* Feature badges */}
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-950/30 border border-amber-500/30">
                <span className="text-xl">🎙️</span>
                <span className="text-amber-200 text-sm font-medium">Voice-Powered</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-950/30 border border-amber-500/30">
                <span className="text-xl">🎲</span>
                <span className="text-amber-200 text-sm font-medium">Interactive Story</span>
              </div>
            </div>
          </div>

          {/* Bottom decorative line */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </div>
      </section>

      {/* Footer */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-20">
        <div className="px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-amber-500/20">
          <p className="text-amber-200/60 text-xs md:text-sm">
            Powered by <span className="text-amber-300 font-semibold">LiveKit Agents</span> & <span className="text-amber-300 font-semibold">Murf Falcon TTS</span> •{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.livekit.io/agents/start/voice-ai/"
              className="text-amber-400 hover:text-amber-300 transition-colors underline"
            >
              Learn more
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10%, 90% {
            opacity: 1;
          }
          50% {
            transform: translate(var(--tx, 20px), var(--ty, -100px));
          }
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};
