import { User, Globe, Film, Rocket, Car, Users } from 'lucide-react';
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
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
