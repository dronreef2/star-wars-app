import { ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  const pages = [];
  const maxVisiblePages = 5;
  
  // Calcular quais páginas mostrar
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  // Ajustar startPage se endPage for menor que maxVisiblePages
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;
  return (
    <div className={`flex items-center justify-center space-x-3 p-4 ${className}`}>
      {/* Botão Anterior */}      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="group relative inline-flex items-center px-4 py-2 text-sm font-bold font-orbitron text-cyan-300 bg-slate-800 border-2 border-slate-600 rounded-lg hover:border-cyan-400 hover:text-cyan-200 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-600 disabled:hover:bg-slate-800 transition-all duration-300 tracking-wider overflow-hidden"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-300" />
        
        <ChevronRight className="h-4 w-4 mr-2 rotate-180 filter drop-shadow-[0_0_6px_rgba(34,211,238,0.6)] group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300" />
        <span className="relative z-10">ANTERIOR</span>
      </button>

      {/* Primeira página */}
      {startPage > 1 && (
        <>          <button
            type="button"
            onClick={() => onPageChange(1)}
            className="group relative px-4 py-2 text-sm font-bold font-orbitron text-slate-300 bg-slate-800 border-2 border-slate-600 rounded-lg hover:border-yellow-400 hover:text-yellow-300 hover:bg-slate-700 transition-all duration-300 tracking-wider overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">1</span>
          </button>
          {startPage > 2 && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          )}
        </>
      )}

      {/* Páginas visíveis */}
      {pages.map((page) => (        <button
          type="button"
          key={page}
          onClick={() => onPageChange(page)}
          className={`group relative px-4 py-2 text-sm font-bold font-orbitron rounded-lg transition-all duration-300 tracking-wider overflow-hidden ${
            page === currentPage
              ? 'text-yellow-300 bg-yellow-500/20 border-2 border-yellow-400 shadow-[0_0_20px_rgba(251,191,36,0.4)] transform scale-110'
              : 'text-slate-300 bg-slate-800 border-2 border-slate-600 hover:border-yellow-400 hover:text-yellow-300 hover:bg-slate-700'
          }`}
        >
          {/* Active page glow */}
          {page === currentPage && (
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-300/20 to-yellow-400/20 animate-pulse" />
          )}
          
          {/* Hover effect for non-active pages */}
          {page !== currentPage && (
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          
          <span className="relative z-10">{page}</span>
        </button>
      ))}

      {/* Última página */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          )}          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className="group relative px-4 py-2 text-sm font-bold font-orbitron text-slate-300 bg-slate-800 border-2 border-slate-600 rounded-lg hover:border-yellow-400 hover:text-yellow-300 hover:bg-slate-700 transition-all duration-300 tracking-wider overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">{totalPages}</span>
          </button>
        </>
      )}

      {/* Botão Próximo */}      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="group relative inline-flex items-center px-4 py-2 text-sm font-bold font-orbitron text-cyan-300 bg-slate-800 border-2 border-slate-600 rounded-lg hover:border-cyan-400 hover:text-cyan-200 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-600 disabled:hover:bg-slate-800 transition-all duration-300 tracking-wider overflow-hidden"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cyan-400/10 opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-300" />
        
        <span className="relative z-10">PRÓXIMO</span>
        <ChevronRight className="h-4 w-4 ml-2 filter drop-shadow-[0_0_6px_rgba(34,211,238,0.6)] group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300" />
      </button>
    </div>
  );
}
