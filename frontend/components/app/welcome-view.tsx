import { Button } from '@/components/livekit/button';

function WelcomeImage() {
  return (
    <div className="relative">
      {/* Animated gradient background circle */}
      <div className="absolute -inset-8 bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Brain/Book learning icon - education theme */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative text-indigo-600 dark:text-indigo-400 mb-4 size-20"
      >
        <g className="animate-book-flip">
          {/* Open Book */}
          <path
            d="M10 20C10 18 11 16 13 16H35C37 16 38 17 38 19V60C38 58 37 56 35 56H13C11 56 10 58 10 60V20Z"
            fill="currentColor"
            opacity="0.8"
          />
          <path
            d="M70 20C70 18 69 16 67 16H45C43 16 42 17 42 19V60C42 58 43 56 45 56H67C69 56 70 58 70 60V20Z"
            fill="currentColor"
            opacity="0.8"
          />
          {/* Lightbulb on left page - idea */}
          <circle cx="24" cy="35" r="6" fill="white" opacity="0.4" className="animate-pulse-gentle" />
          <path d="M24 30 L24 26 M24 44 L24 40 M18 35 L14 35 M30 35 L34 35" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          {/* Checkmark on right page - success */}
          <path d="M48 32 L54 38 L64 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" className="animate-check-draw" />
        </g>
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
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50 dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-pink-950/20" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
      
      <section className="relative bg-transparent flex flex-col items-center justify-center text-center min-h-screen px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <WelcomeImage />

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Teach-the-Tutor
            </h1>
            <p className="text-foreground/80 max-w-prose pt-2 leading-7 font-medium text-lg">
              Master coding concepts through active recall with three learning modes
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 pt-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={onStartCall} 
              className="w-72 font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105"
            >
              {startButtonText}
            </Button>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground pt-2 max-w-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span>📖 Learn Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{animationDelay: '0.2s'}} />
                <span>❓ Quiz Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" style={{animationDelay: '0.4s'}} />
                <span>🎓 Teach-Back Mode</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-8 left-0 flex w-full items-center justify-center px-4 z-10">
        <div className="bg-background/80 dark:bg-background/60 backdrop-blur-md rounded-2xl px-6 py-3 border border-border/50 shadow-lg">
          <p className="text-muted-foreground max-w-prose text-xs leading-5 font-normal text-pretty md:text-sm">
            Powered by <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Murf Falcon TTS</span> • Learn through teaching{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.livekit.io/agents/start/voice-ai/"
              className="underline hover:text-foreground transition-colors"
            >
              Voice AI docs
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
