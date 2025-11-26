import { Button } from '@/components/livekit/button';

function WelcomeImage() {
  return (
    <div className="relative">
      {/* Animated gradient background */}
      <div className="absolute -inset-12 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Bank Security Shield Icon */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative mb-6"
      >
        {/* Shield */}
        <g className="animate-bounce-gentle">
          <path
            d="M60 10 L95 25 L95 50 C95 75 80 95 60 110 C40 95 25 75 25 50 L25 25 Z"
            fill="url(#shieldGradient)"
            className="drop-shadow-2xl"
          />
          <defs>
            <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
          
          {/* Lock icon in shield */}
          <circle cx="60" cy="55" r="12" fill="white" opacity="0.9" />
          <rect x="54" y="60" width="12" height="15" rx="2" fill="white" opacity="0.9" />
          <path d="M54 58 L54 52 C54 48.7 56.7 46 60 46 C63.3 46 66 48.7 66 52 L66 58" 
                stroke="white" strokeWidth="3" fill="none" opacity="0.9" />
        </g>
        
        {/* Security badge indicators */}
        <circle cx="30" cy="35" r="4" fill="#10B981" className="animate-pulse" />
        <circle cx="90" cy="35" r="4" fill="#10B981" className="animate-pulse" style={{animationDelay: '0.5s'}} />
        <circle cx="45" cy="90" r="4" fill="#10B981" className="animate-pulse" style={{animationDelay: '1s'}} />
        <circle cx="75" cy="90" r="4" fill="#10B981" className="animate-pulse" style={{animationDelay: '1.5s'}} />
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
      {/* Professional banking gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/50 dark:from-slate-950 dark:via-blue-950/30 dark:to-cyan-950/30" />
      
      {/* Floating animated orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-teal-400/8 dark:bg-teal-500/4 rounded-full blur-3xl animate-pulse" />
      
      <section className="relative bg-transparent flex flex-col items-center justify-center text-center min-h-screen px-4 py-12 pb-32">
        <div className="max-w-3xl mx-auto space-y-8">
          <WelcomeImage />

          <div className="space-y-4">
            {/* Main heading */}
            <div className="space-y-3">
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent tracking-tight">
                SBI Bank
              </h1>
              <div className="flex items-center justify-center gap-3">
                <span className="inline-block w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></span>
                <p className="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
                  State Bank of India • Fraud Prevention
                </p>
                <span className="inline-block w-12 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"></span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border border-red-200 dark:border-red-800 rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-600 dark:text-red-400">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <p className="text-xl md:text-2xl font-bold text-red-700 dark:text-red-400">
                  Fraud Alert Detected
                </p>
              </div>
              <p className="text-foreground/90 leading-7 font-medium text-lg">
                We've detected suspicious activity on your account and need to verify with you immediately
              </p>
            </div>

            <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              Our AI fraud prevention system will verify your identity and help secure your account. 
              This call typically takes 2-3 minutes.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 pt-6">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={onStartCall} 
              className="w-80 font-bold text-xl py-7 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 hover:from-blue-700 hover:via-cyan-700 hover:to-teal-700 shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300 hover:scale-105 rounded-2xl border-2 border-white/20"
            >
              <span className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {startButtonText}
              </span>
            </Button>
            
            {/* Security features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 w-full max-w-3xl">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 border border-blue-200/50 dark:border-blue-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-2">🔐</div>
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-1">Multi-Factor</h3>
                <p className="text-sm text-muted-foreground">Secure verification process</p>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 border border-cyan-200/50 dark:border-cyan-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="font-bold text-cyan-600 dark:text-cyan-400 mb-1">Real-Time</h3>
                <p className="text-sm text-muted-foreground">Instant fraud detection</p>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 border border-teal-200/50 dark:border-teal-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-2">🛡️</div>
                <h3 className="font-bold text-teal-600 dark:text-teal-400 mb-1">Protected</h3>
                <p className="text-sm text-muted-foreground">Bank-grade security</p>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold pt-4">
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-full backdrop-blur-sm border border-green-200/50 dark:border-green-800/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-600 dark:text-green-400">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="text-foreground">Encrypted Call</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-full backdrop-blur-sm border border-green-200/50 dark:border-green-800/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-600 dark:text-green-400">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="text-foreground">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-full backdrop-blur-sm border border-green-200/50 dark:border-green-800/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-600 dark:text-green-400">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="text-foreground">AI-Powered</span>
              </div>
            </div>

            {/* Warning notice */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-xl p-4 max-w-2xl mx-auto mt-6">
              <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                <strong>⚠️ Important:</strong> We will never ask for your full card number, PIN, or password. 
                If anyone does, it's a scam. Hang up and call us directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-8 left-0 flex w-full items-center justify-center px-4 z-10">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl px-8 py-4 border border-blue-200/50 dark:border-blue-800/50 shadow-2xl">
          <p className="text-muted-foreground max-w-prose text-sm leading-6 font-medium text-center">
            Powered by <span className="text-blue-600 dark:text-blue-400 font-bold">Murf Falcon TTS</span> • 
            Fastest voice AI for secure banking •{' '}
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">24/7 Fraud Protection</span>
          </p>
        </div>
      </div>
    </div>
  );
};
