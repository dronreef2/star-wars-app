import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
  className?: string;
}

export function SearchBar({ 
  placeholder = "Buscar...", 
  onSearch, 
  onClear,
  className = '' 
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }, [query, onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    if (onClear) {
      onClear();
    }
  }, [onClear]);
  return (
    <form onSubmit={handleSubmit} className={`relative group ${className}`}>
      <div className="relative">
        {/* Holographic glow background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20 rounded-lg blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        
        {/* Search icon with glow effect */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
          <Search className="h-5 w-5 text-cyan-400 filter drop-shadow-[0_0_6px_rgba(34,211,238,0.6)] group-focus-within:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-300" />
        </div>
        
        {/* Main input field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="relative block w-full pl-10 pr-12 py-3 border-2 border-slate-600 rounded-lg bg-slate-800/80 backdrop-blur-sm text-cyan-100 placeholder-slate-400 font-orbitron tracking-wider
                   focus:outline-none focus:border-cyan-400 focus:bg-slate-800/90 focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] 
                   transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-800/85"
        />
        
        {/* Scanning line effect on focus */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg scanning-line" />
        
        {/* Clear button with hover effects */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 group/clear hover:scale-110 transition-transform duration-200"
          >
            <X className="h-5 w-5 text-slate-400 group-hover/clear:text-red-400 group-hover/clear:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] transition-all duration-300" />
          </button>
        )}
        
        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
      </div>
      
      <button
        type="submit"
        className="sr-only"
      >
        Buscar
      </button>
    </form>
  );
}
