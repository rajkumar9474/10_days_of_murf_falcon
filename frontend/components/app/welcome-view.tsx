import { Button } from '@/components/livekit/button';

function WelcomeImage() {
  return (
    <div className="relative">
      {/* Animated gradient background circle */}
      <div className="absolute -inset-8 bg-gradient-to-br from-emerald-400/20 via-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Heart with pulse icon - wellness theme */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative text-emerald-500 dark:text-emerald-400 mb-4 size-20"
      >
        <g className="animate-pulse-gentle">
          <path
            d="M40 68C39.2 68 38.4 67.7 37.8 67.2C35.6 65.4 33.5 63.7 31.6 62.1L31.5 62C23.8 55.3 17.1 49.4 12.4 43.7C7.2 37.4 4.5 31.4 4.5 25C4.5 19 6.6 13.6 10.4 9.7C14.3 5.9 19.7 3.7 25.6 3.7C29.8 3.7 33.7 4.9 37.2 7.2C38.9 8.4 40.5 9.8 42 11.5C43.5 9.8 45.1 8.4 46.8 7.2C50.3 4.9 54.2 3.7 58.4 3.7C64.3 3.7 69.7 5.9 73.6 9.7C77.4 13.6 79.5 19 79.5 25C79.5 31.4 76.8 37.4 71.6 43.7C66.9 49.4 60.2 55.3 52.5 62L52.4 62.1C50.5 63.7 48.4 65.4 46.2 67.2C45.6 67.7 44.8 68 44 68H40Z"
            fill="currentColor"
            opacity="0.9"
          />
          {/* Heartbeat line */}
          <path
            d="M15 32H25L30 22L35 42L40 32H50"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-heartbeat"
          />
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
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/50 dark:from-emerald-950/20 dark:via-teal-950/10 dark:to-cyan-950/20" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300/20 dark:bg-teal-500/10 rounded-full blur-3xl animate-float-delayed" />
      
      <section className="relative bg-transparent flex flex-col items-center justify-center text-center min-h-screen px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <WelcomeImage />

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Health & Wellness Companion
            </h1>
            <p className="text-foreground/80 max-w-prose pt-2 leading-7 font-medium text-lg">
              Your daily check-in partner for mindful reflection and goal setting
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 pt-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={onStartCall} 
              className="w-72 font-semibold text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105"
            >
              {startButtonText}
            </Button>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Supportive</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" style={{animationDelay: '0.2s'}} />
                <span>Non-judgmental</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" style={{animationDelay: '0.4s'}} />
                <span>Grounded</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-8 left-0 flex w-full items-center justify-center px-4 z-10">
        <div className="bg-background/80 dark:bg-background/60 backdrop-blur-md rounded-2xl px-6 py-3 border border-border/50 shadow-lg">
          <p className="text-muted-foreground max-w-prose text-xs leading-5 font-normal text-pretty md:text-sm">
            Powered by <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Murf Falcon TTS</span> • Need help? Check out the{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.livekit.io/agents/start/voice-ai/"
              className="underline hover:text-foreground transition-colors"
            >
              Voice AI quickstart
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
