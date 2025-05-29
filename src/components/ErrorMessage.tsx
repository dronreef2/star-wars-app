import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({ message, onRetry, className = '' }: ErrorMessageProps) {
  return (
    <div className={`relative bg-gradient-to-br from-red-900/80 to-red-800/80 backdrop-blur-sm border-2 border-red-500/50 rounded-lg p-6 overflow-hidden group ${className}`}>
      {/* Danger warning pattern */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(239,68,68,0.1)_10px,rgba(239,68,68,0.1)_20px)]" />
      
      {/* Alert scanning effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="relative">
            <AlertCircle className="h-8 w-8 text-red-400 mr-3 animate-pulse filter drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            {/* Rotating danger ring */}
            <div className="absolute inset-0 border-2 border-red-500 rounded-full animate-spin opacity-60" />
          </div>
          <h3 className="text-xl font-bold font-orbitron text-red-300 tracking-wider holographic-text">
            SISTEMA COMPROMETIDO
          </h3>
        </div>
        
        <div className="bg-black/30 border border-red-500/30 rounded p-4 mb-4">
          <p className="text-red-200 font-mono text-sm leading-relaxed">
            <span className="text-red-400">[ERRO]</span> {message}
          </p>
        </div>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="relative group/btn inline-flex items-center px-6 py-3 border-2 border-red-500 text-sm font-bold font-orbitron rounded-md text-red-300 bg-red-500/10 hover:bg-red-500/20 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300 tracking-wider overflow-hidden"
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-red-400/20 to-red-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            
            {/* Rotating refresh icon */}
            <RefreshCw className="h-5 w-5 mr-2 relative z-10 group-hover/btn:animate-spin transition-transform duration-300" />
            <span className="relative z-10">RESTAURAR SISTEMA</span>
            
            {/* Button scanning line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/40 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
          </button>
        )}
      </div>
      
      {/* Corner warning lights */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      <div className="absolute bottom-2 left-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
      <div className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
    </div>
  );
}
