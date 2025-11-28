import { Button } from '@/components/livekit/button';

function WelcomeImage() {
  return (
    <div className="relative">
      {/* Animated gradient background */}
      <div className="absolute -inset-12 bg-gradient-to-br from-orange-500/20 via-green-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Shopping Cart with Fresh Produce Icon */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative mb-6"
      >
        {/* Shopping Cart */}
        <g className="animate-bounce-gentle">
          <path
            d="M30 25 L35 25 L45 75 L85 75 L92 40 L40 40"
            stroke="url(#cartGradient)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-2xl"
          />
          <defs>
            <linearGradient id="cartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="50%" stopColor="#ff8c42" />
              <stop offset="100%" stopColor="#ffa366" />
            </linearGradient>
            <linearGradient id="produceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4caf50" />
              <stop offset="50%" stopColor="#66bb6a" />
              <stop offset="100%" stopColor="#81c784" />
            </linearGradient>
          </defs>

          {/* Cart wheels */}
          <circle cx="50" cy="85" r="6" fill="url(#cartGradient)" />
          <circle cx="75" cy="85" r="6" fill="url(#cartGradient)" />

          {/* Fresh produce items in cart */}
          <circle cx="55" cy="55" r="8" fill="#ff6b35" opacity="0.9" />
          <circle cx="70" cy="50" r="7" fill="#4caf50" opacity="0.9" />
          <circle cx="62" cy="60" r="6" fill="#ffd700" opacity="0.9" />

          {/* Leaf accent for freshness */}
          <path d="M75 45 Q75 35 85 35 Q80 40 80 45 Q80 50 75 45 Z" fill="url(#produceGradient)" opacity="0.9" />
        </g>

        {/* Speed/delivery indicators */}
        <circle cx="25" cy="30" r="4" fill="#4caf50" className="animate-pulse" />
        <circle cx="95" cy="30" r="4" fill="#4caf50" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        <circle cx="40" cy="95" r="4" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '1s' }} />
        <circle cx="80" cy="95" r="4" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
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
      {/* Fresh food gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50/50 to-green-50/50 dark:from-slate-950 dark:via-orange-950/20 dark:to-green-950/20" />

      {/* Floating animated orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-400/10 dark:bg-orange-500/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-400/10 dark:bg-green-500/5 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-400/8 dark:bg-yellow-500/4 rounded-full blur-3xl animate-pulse" />

      <section className="relative bg-transparent flex flex-col items-center justify-center text-center min-h-screen px-4 py-12 pb-32">
        <div className="max-w-3xl mx-auto space-y-8">
          <WelcomeImage />

          <div className="space-y-4">
            {/* Main heading */}
            <div className="space-y-3">
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 dark:from-orange-400 dark:via-yellow-400 dark:to-green-400 bg-clip-text text-transparent tracking-tight">
                QuickMart Express
              </h1>
              <div className="flex items-center justify-center gap-3">
                <span className="inline-block w-12 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></span>
                <p className="text-lg md:text-xl font-bold text-orange-600 dark:text-orange-400 tracking-wide uppercase">
                  Fresh Groceries • Fast Delivery
                </p>
                <span className="inline-block w-12 h-1 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full"></span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600 dark:text-green-400">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                <p className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-400">
                  🛒 Voice Ordering Available
                </p>
              </div>
              <p className="text-foreground/90 leading-7 font-medium text-lg">
                Order your favorite groceries, snacks, and fresh food using just your voice!
              </p>
            </div>

            <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              Our AI-powered voice assistant makes grocery shopping effortless.
              Just speak naturally and we'll help you build your cart.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 pt-6">
            <Button
              variant="primary"
              size="lg"
              onClick={onStartCall}
              className="w-80 font-bold text-xl py-7 bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 hover:from-orange-700 hover:via-yellow-700 hover:to-green-700 shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all duration-300 hover:scale-105 rounded-2xl border-2 border-white/20"
            >
              <span className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                {startButtonText}
              </span>
            </Button>

            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 w-full max-w-3xl">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 border border-orange-200/50 dark:border-orange-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-2">🚀</div>
                <h3 className="font-bold text-orange-600 dark:text-orange-400 mb-1">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">30-minute express delivery</p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 border border-green-200/50 dark:border-green-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-2">🥬</div>
                <h3 className="font-bold text-green-600 dark:text-green-400 mb-1">Fresh Items</h3>
                <p className="text-sm text-muted-foreground">Farm-fresh produce daily</p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 border border-yellow-200/50 dark:border-yellow-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-2">💳</div>
                <h3 className="font-bold text-yellow-600 dark:text-yellow-400 mb-1">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">Safe & encrypted checkout</p>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold pt-4">
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-full backdrop-blur-sm border border-green-200/50 dark:border-green-800/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-600 dark:text-green-400">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-foreground">Safe Checkout</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-full backdrop-blur-sm border border-green-200/50 dark:border-green-800/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-600 dark:text-green-400">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-foreground">Fresh Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-full backdrop-blur-sm border border-green-200/50 dark:border-green-800/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-600 dark:text-green-400">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-foreground">Smart Ordering</span>
              </div>
            </div>

            {/* Info notice */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-800 rounded-xl p-4 max-w-2xl mx-auto mt-6">
              <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                <strong>💡 Tip:</strong> You can add items by name, ask for recipe ingredients,
                view your cart, update quantities, and place your order - all with your voice!
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-8 left-0 flex w-full items-center justify-center px-4 z-10">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl px-8 py-4 border border-orange-200/50 dark:border-orange-800/50 shadow-2xl">
          <p className="text-muted-foreground max-w-prose text-sm leading-6 font-medium text-center">
            Powered by <span className="text-orange-600 dark:text-orange-400 font-bold">Murf Falcon TTS</span> •
            Lightning-fast voice AI for seamless ordering •{' '}
            <span className="text-green-600 dark:text-green-400 font-semibold">Fresh Daily</span>
          </p>
        </div>
      </div>
    </div>
  );
};
