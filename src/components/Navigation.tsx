import { User, Globe, Film, Rocket, Car, Users, Brain, Medal } from 'lucide-react';
import type { ResourceType } from '../types/swapi';

interface NavigationProps {
  activeTab: ResourceType;
  onTabChange: (tab: ResourceType) => void;
}

const tabs = [
  { id: 'people' as ResourceType, label: 'Personagens', icon: User },
  { id: 'planets' as ResourceType, label: 'Planetas', icon: Globe },
  { id: 'films' as ResourceType, label: 'Filmes', icon: Film },
  { id: 'starships' as ResourceType, label: 'Naves', icon: Rocket },
  { id: 'vehicles' as ResourceType, label: 'Veículos', icon: Car },
  { id: 'species' as ResourceType, label: 'Espécies', icon: Users },
  { id: 'quiz' as ResourceType, label: 'Quiz', icon: Brain },
  { id: 'ranking' as ResourceType, label: 'Ranking', icon: Medal },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-b border-yellow-400/30 overflow-hidden sticky top-0 z-40">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/5 via-transparent to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      {/* Scanning light effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent scanning-light" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}                  className={`relative group flex items-center px-3 py-2 text-xs font-bold font-orbitron border transition-all duration-300 whitespace-nowrap rounded-lg overflow-hidden min-w-max ${
                    isActive
                      ? 'border-yellow-400 text-yellow-300 bg-yellow-400/15 shadow-[0_0_20px_rgba(251,191,36,0.4)] transform scale-105 z-10'
                      : 'border-slate-600/60 text-slate-300 hover:text-yellow-200 hover:border-yellow-400/60 hover:bg-yellow-400/8 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:scale-102'
                  }`}
                >
                  {/* Glow effect for active tab */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/25 via-yellow-300/15 to-yellow-400/25 animate-pulse" />
                      <div className="absolute inset-0 border-2 border-yellow-400/40 rounded-lg animate-pulse" />
                    </>
                  )}
                  
                  {/* Hover scanning effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <Icon className={`h-3 w-3 mr-1.5 relative z-10 transition-all duration-300 ${
                    isActive ? 'text-yellow-300 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]' : 'group-hover:text-yellow-200'
                  }`} />
                  <span className="relative z-10 tracking-wider text-xs">{tab.label}</span>
                  
                  {/* Bottom light bar for active tab */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1 right-1 h-0.5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 lightsaber-glow" />
                  )}
                  
                  {/* Corner indicators for active tab */}
                  {isActive && (
                    <>
                      <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" />
                      <div className="absolute bottom-1 left-1 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Bottom edge light */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
    </nav>
  );
}
