import { Rocket, Users, Package, Fuel } from 'lucide-react';
import type { Starship } from '../types/swapi';
import { Card, DetailItem } from './Card';

interface StarshipCardProps {
  starship: Starship;
  onClick?: () => void;
}

export function StarshipCard({ starship, onClick }: StarshipCardProps) {
  const formatCredits = (credits: string) => {
    if (credits === 'unknown') return 'Desconhecido';
    const num = Number.parseInt(credits);
    if (Number.isNaN(num)) return credits;
    return num.toLocaleString('pt-BR');
  };

  return (
    <Card
      title={starship.name}
      subtitle={starship.model}
      onClick={onClick}
    >
      <DetailItem label="Classe" value={starship.starship_class} />
      <DetailItem label="Fabricante" value={starship.manufacturer} />
      <DetailItem label="Comprimento" value={`${starship.length} m`} />
      <DetailItem label="Custo" value={`${formatCredits(starship.cost_in_credits)} créditos`} />
    </Card>
  );
}

interface StarshipDetailProps {
  starship: Starship;
}

export function StarshipDetail({ starship }: StarshipDetailProps) {
  const formatCredits = (credits: string) => {
    if (credits === 'unknown') return 'Desconhecido';
    const num = Number.parseInt(credits);
    if (Number.isNaN(num)) return credits;
    return num.toLocaleString('pt-BR');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center mb-6">
        <div className="bg-purple-100 p-3 rounded-full mr-4">
          <Rocket className="h-8 w-8 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{starship.name}</h1>
          <p className="text-lg text-gray-600">{starship.model}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Especificações Técnicas */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Especificações Técnicas
          </h2>
          
          <div className="space-y-3">
            <DetailItem label="Classe" value={starship.starship_class} />
            <DetailItem label="Fabricante" value={starship.manufacturer} />
            <DetailItem label="Comprimento" value={`${starship.length} m`} />
            <DetailItem label="Velocidade máxima" value={starship.max_atmosphering_speed} />
            <DetailItem label="Classificação do hyperdrive" value={starship.hyperdrive_rating} />
            <DetailItem label="MGLT" value={starship.MGLT} />
          </div>
        </div>

        {/* Capacidades */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Capacidades
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-500 mr-3" />
              <DetailItem label="Tripulação" value={starship.crew} />
            </div>
            
            <DetailItem label="Passageiros" value={starship.passengers} />
            
            <div className="flex items-center">
              <Package className="h-5 w-5 text-gray-500 mr-3" />
              <DetailItem label="Capacidade de carga" value={starship.cargo_capacity} />
            </div>
            
            <div className="flex items-center">
              <Fuel className="h-5 w-5 text-gray-500 mr-3" />
              <DetailItem label="Consumíveis" value={starship.consumables} />
            </div>
            
            <DetailItem 
              label="Custo" 
              value={`${formatCredits(starship.cost_in_credits)} créditos`} 
            />
            
            <DetailItem 
              label="Pilotos conhecidos" 
              value={starship.pilots.length.toString()} 
            />
            
            <DetailItem 
              label="Filmes" 
              value={starship.films.length.toString()} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
