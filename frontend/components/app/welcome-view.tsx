import { Button } from '@/components/livekit/button';

function WelcomeImage() {
  return (
    <div className="relative">
      {/* Animated gradient background circle */}
      <div className="absolute -inset-12 bg-gradient-to-br from-orange-400/20 via-red-400/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Physics Wallah Logo-inspired icon */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative mb-6"
      >
        {/* Graduation cap */}
        <g className="animate-bounce-gentle">
          {/* Cap top */}
          <path
            d="M60 25 L20 40 L60 55 L100 40 Z"
            fill="#FF6B35"
            className="drop-shadow-lg"
          />
          {/* Cap board */}
          <rect x="15" y="40" width="90" height="4" rx="2" fill="#FF6B35" opacity="0.8" />
          {/* Cap tassel */}
          <circle cx="102" cy="35" r="3" fill="#FFD700" className="animate-swing" />
          <line x1="102" y1="38" x2="102" y2="48" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
        </g>
        
        {/* Book stack */}
        <g className="animate-book-stack">
          <rect x="35" y="60" width="50" height="8" rx="2" fill="#4F46E5" opacity="0.9" />
          <rect x="30" y="68" width="60" height="8" rx="2" fill="#7C3AED" opacity="0.9" />
          <rect x="25" y="76" width="70" height="8" rx="2" fill="#EC4899" opacity="0.9" />
        </g>
        
        {/* Sparkle effects */}
        <circle cx="25" cy="30" r="2" fill="#FFD700" className="animate-twinkle" />
        <circle cx="95" cy="65" r="2" fill="#FFD700" className="animate-twinkle" style={{animationDelay: '0.3s'}} />
        <circle cx="40" cy="85" r="2" fill="#FFD700" className="animate-twinkle" style={{animationDelay: '0.6s'}} />
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
  return (
    <div ref={ref} className="min-h-screen relative overflow-hidden">
      {/* Physics Wallah brand colors gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white to-purple-50/80 dark:from-orange-950/20 dark:via-gray-900 dark:to-purple-950/20" />
      
      {/* Floating animated orbs - Physics Wallah colors */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-400/15 dark:bg-orange-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/15 dark:bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-400/10 dark:bg-red-500/8 rounded-full blur-3xl animate-pulse" />
      
      <section className="relative bg-transparent flex flex-col items-center justify-center text-center min-h-screen px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <WelcomeImage />

          <div className="space-y-4">
            {/* Main heading with Physics Wallah tagline */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 dark:from-orange-400 dark:via-red-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight">
                Physics Wallah
              </h1>
              <div className="flex items-center justify-center gap-2 text-lg md:text-xl font-bold text-orange-600 dark:text-orange-400">
                <span className="inline-block w-8 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></span>
                <p className="tracking-wide">Padhega India Tab Badhega India</p>
                <span className="inline-block w-8 h-1 bg-gradient-to-r from-red-500 to-purple-500 rounded-full"></span>
              </div>
            </div>
            
            <p className="text-foreground/90 max-w-2xl mx-auto pt-2 leading-8 font-medium text-xl md:text-2xl">
              Talk to our AI counselor about your{' '}
              <span className="text-orange-600 dark:text-orange-400 font-bold">JEE</span> or{' '}
              <span className="text-purple-600 dark:text-purple-400 font-bold">NEET</span>{' '}
              preparation journey
            </p>

            <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              Get personalized guidance on courses, pricing, and exam preparation at India's most affordable coaching platform
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 pt-6">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={onStartCall} 
              className="w-80 font-bold text-xl py-7 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 hover:from-orange-600 hover:via-red-600 hover:to-purple-700 shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all duration-300 hover:scale-105 rounded-2xl border-2 border-white/20"
            >
              <span className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {startButtonText}
              </span>
            </Button>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 w-full max-w-3xl">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 border border-orange-200/50 dark:border-orange-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-2">📚</div>
                <h3 className="font-bold text-orange-600 dark:text-orange-400 mb-1">Lakshya & Arjuna</h3>
                <p className="text-sm text-muted-foreground">Complete JEE/NEET programs</p>
              </div>
              
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 border border-purple-200/50 dark:border-purple-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-2">₹</div>
                <h3 className="font-bold text-purple-600 dark:text-purple-400 mb-1">₹3,999/year</h3>
                <p className="text-sm text-muted-foreground">40x cheaper than Kota</p>
              </div>
              
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 border border-red-200/50 dark:border-red-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-2">👨‍🏫</div>
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-1">Expert Faculty</h3>
                <p className="text-sm text-muted-foreground">By Alakh Pandey Sir & team</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold pt-4">
              <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-foreground">7M+ Students</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{animationDelay: '0.2s'}} />
                <span className="text-foreground">IIT/AIIMS Success</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" style={{animationDelay: '0.4s'}} />
                <span className="text-foreground">Free YouTube Classes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-8 left-0 flex w-full items-center justify-center px-4 z-10">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl px-8 py-4 border border-orange-200/50 dark:border-orange-800/50 shadow-2xl">
          <p className="text-muted-foreground max-w-prose text-sm leading-6 font-medium text-center">
            Powered by <span className="text-orange-600 dark:text-orange-400 font-bold">Murf Falcon TTS</span> • 
            The fastest voice AI for education •{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.pw.live"
              className="text-purple-600 dark:text-purple-400 font-semibold underline hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              Visit Physics Wallah
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

