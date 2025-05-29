interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24'
  };

  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
      {/* Death Star Loading Animation */}
      <div className="relative">
        {/* Outer ring with glow */}
        <div className={`${sizeClasses[size]} rounded-full border-4 border-slate-600 relative overflow-hidden death-star-animation`}>
          {/* Death Star superlaser */}
          <div className="absolute top-1/4 right-1/4 w-1/4 h-1/4 bg-red-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
          
          {/* Death Star surface details */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700" />
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-slate-500 to-slate-600 opacity-60" />
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 border border-slate-400 rounded-full opacity-30" />
          
          {/* Rotating energy beam */}
          <div className="absolute inset-0 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin shadow-[0_0_30px_rgba(251,191,36,0.6)]" />
        </div>
        
        {/* Surrounding energy particles */}
        <div className="absolute -inset-4">          {[...Array(8)].map((_, i) => (
            <div
              key={`particle-${i}-${Date.now()}`}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 45}deg) translateY(-2rem)`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Loading text with holographic effect */}
      <div className="mt-6 text-center">
        <p className="text-cyan-400 font-orbitron font-bold tracking-wider text-lg holographic-text">
          LOADING
        </p>
        <div className="flex justify-center mt-2 space-x-1">          {[...Array(3)].map((_, i) => (
            <div
              key={`dot-${i}-${Date.now()}`}
              className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface LoadingCardProps {
  count?: number;
}

export function LoadingCard({ count = 1 }: LoadingCardProps) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={`loading-card-${Date.now()}-${index}`} className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-2xl p-6 border-2 border-slate-600 overflow-hidden group">
          {/* Holographic scanning effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-2000 scanning-light" />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 grid-pattern opacity-10" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="h-6 bg-gradient-to-r from-slate-600 to-slate-500 rounded mb-3 w-3/4 animate-pulse shadow-[0_0_10px_rgba(148,163,184,0.3)]" />
                <div className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-1/2 animate-pulse" />
              </div>
              {/* Holographic indicator */}
              <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 bg-gradient-to-r from-slate-600 to-slate-500 rounded w-1/3 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded w-1/4 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.3)]" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gradient-to-r from-slate-600 to-slate-500 rounded w-1/4 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-slate-600 to-slate-500 rounded w-1/3 animate-pulse" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded w-1/2 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.3)]" />
                <div className="h-4 bg-gradient-to-r from-slate-600 to-slate-500 rounded w-1/4 animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Corner accent lights */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        </div>
      ))}
    </>
  );
}
