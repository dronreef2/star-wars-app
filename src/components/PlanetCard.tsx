import { Globe, Users, Thermometer, Mountain } from 'lucide-react';
import type { Planet } from '../types/swapi';
import { Card, DetailItem } from './Card';

interface PlanetCardProps {
  planet: Planet;
  onClick?: () => void;
}

export function PlanetCard({ planet, onClick }: PlanetCardProps) {
  const formatPopulation = (population: string) => {
    if (population === 'unknown') return 'Desconhecida';
    const num = Number.parseInt(population);
    if (Number.isNaN(num)) return population;
    return num.toLocaleString('pt-BR');
  };

  return (
    <Card
      title={planet.name}
      subtitle={`Diâmetro: ${planet.diameter} km`}
      onClick={onClick}
    >
      <DetailItem label="Clima" value={planet.climate} />
      <DetailItem label="Terreno" value={planet.terrain} />
      <DetailItem label="População" value={formatPopulation(planet.population)} />
      <DetailItem label="Gravidade" value={planet.gravity} />
    </Card>
  );
}

interface PlanetDetailProps {
  planet: Planet;
}

export function PlanetDetail({ planet }: PlanetDetailProps) {
  const formatPopulation = (population: string) => {
    if (population === 'unknown') return 'Desconhecida';
    const num = Number.parseInt(population);
    if (Number.isNaN(num)) return population;
    return num.toLocaleString('pt-BR');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center mb-6">
        <div className="bg-green-100 p-3 rounded-full mr-4">
          <Globe className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{planet.name}</h1>
          <p className="text-lg text-gray-600">Diâmetro: {planet.diameter} km</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Características Físicas */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Características Físicas
          </h2>
          
          <div className="space-y-3">
            <DetailItem label="Diâmetro" value={`${planet.diameter} km`} />
            <DetailItem label="Período de rotação" value={`${planet.rotation_period} horas`} />
            <DetailItem label="Período orbital" value={`${planet.orbital_period} dias`} />
            <DetailItem label="Gravidade" value={planet.gravity} />
            <DetailItem label="Água superficial" value={`${planet.surface_water}%`} />
          </div>
        </div>

        {/* Ambiente e População */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Ambiente e População
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <Thermometer className="h-5 w-5 text-gray-500 mr-3" />
              <DetailItem label="Clima" value={planet.climate} />
            </div>
            
            <div className="flex items-center">
              <Mountain className="h-5 w-5 text-gray-500 mr-3" />
              <DetailItem label="Terreno" value={planet.terrain} />
            </div>
            
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-500 mr-3" />
              <DetailItem label="População" value={formatPopulation(planet.population)} />
            </div>
            
            <DetailItem 
              label="Residentes conhecidos" 
              value={planet.residents.length.toString()} 
            />
            <DetailItem 
              label="Filmes" 
              value={planet.films.length.toString()} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
