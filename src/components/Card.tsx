import { ChevronRight } from 'lucide-react';

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Card({ title, subtitle, children, onClick, className = '' }: CardProps) {
  const baseClasses = "relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 p-4 sm:p-5 md:p-6 border-2 border-slate-600 hover:border-cyan-400/50 overflow-hidden group w-full min-h-[280px] flex flex-col";
  const clickableClasses = onClick ? "cursor-pointer hover:bg-gradient-to-br hover:from-slate-700 hover:to-slate-800 transform hover:scale-[1.02] active:scale-[0.98]" : "";
  
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div 
      className={`${baseClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyPress}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      {/* Holographic grid background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      {/* Scanning light effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      {/* Energy border pulse */}
      <div className="absolute inset-0 border border-cyan-400/20 rounded-xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-1 font-orbitron tracking-wider holographic-text break-words">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-wide break-words">{subtitle}</p>
            )}
          </div>
          {onClick && (
            <div className="relative flex-shrink-0 self-start sm:self-center">
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 group-hover:text-yellow-400 transition-colors duration-300 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              {/* Rotating accent ring */}
              <div className="absolute inset-0 border border-cyan-400/30 rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
        </div>
        
        <div className="space-y-2 sm:space-y-3 flex-grow">
          {children}
        </div>
      </div>
      
      {/* Corner accent lights */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
      <div className="absolute bottom-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string | number;
  className?: string;
}

export function DetailItem({ label, value, className = '' }: DetailItemProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 px-4 bg-slate-800/50 rounded-lg border border-slate-600/50 hover:border-cyan-400/50 transition-all duration-300 group hover:bg-slate-700/60 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] ${className}`}>
      {/* Label */}
      <span className="text-sm font-bold text-cyan-200 font-orbitron tracking-wide group-hover:text-cyan-100 transition-colors duration-300 mb-2 sm:mb-0 min-w-0 sm:min-w-[120px] flex-shrink-0">
        {label}:
      </span>
      
      {/* Value com quebra responsiva melhorada */}
      <span className="text-sm text-yellow-300 font-mono font-medium filter drop-shadow-[0_0_3px_rgba(251,191,36,0.4)] group-hover:text-yellow-200 transition-colors duration-300 break-words sm:text-right max-w-full sm:max-w-[240px] flex-grow">
        {value}
      </span>
      
      {/* Indicador de hover/foco sutil */}
      <div className="absolute inset-0 border border-cyan-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
