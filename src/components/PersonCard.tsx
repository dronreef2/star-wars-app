import { User, Calendar, Eye, Weight, Ruler } from 'lucide-react';
import type { Person } from '../types/swapi';
import { Card, DetailItem } from './Card';

interface PersonCardProps {
  person: Person;
  onClick?: () => void;
}

export function PersonCard({ person, onClick }: PersonCardProps) {
  return (
    <Card
      title={person.name}
      subtitle={`Nascimento: ${person.birth_year}`}
      onClick={onClick}
    >
      <DetailItem label="Gênero" value={person.gender} />
      <DetailItem label="Altura" value={`${person.height} cm`} />
      <DetailItem label="Peso" value={`${person.mass} kg`} />
      <DetailItem label="Cor dos olhos" value={person.eye_color} />
      <DetailItem label="Cor do cabelo" value={person.hair_color} />
    </Card>
  );
}

interface PersonDetailProps {
  person: Person;
}

export function PersonDetail({ person }: PersonDetailProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{person.name}</h1>
          <p className="text-lg text-gray-600">{person.birth_year}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informações Físicas */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Características Físicas
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <Ruler className="h-5 w-5 text-gray-500 mr-3" />
              <DetailItem label="Altura" value={`${person.height} cm`} />
            </div>
            
            <div className="flex items-center">
              <Weight className="h-5 w-5 text-gray-500 mr-3" />
              <DetailItem label="Peso" value={`${person.mass} kg`} />
            </div>
            
            <div className="flex items-center">
              <Eye className="h-5 w-5 text-gray-500 mr-3" />
              <DetailItem label="Cor dos olhos" value={person.eye_color} />
            </div>
            
            <DetailItem label="Cor do cabelo" value={person.hair_color} />
            <DetailItem label="Cor da pele" value={person.skin_color} />
          </div>
        </div>

        {/* Informações Gerais */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Informações Gerais
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-3" />
              <DetailItem label="Nascimento" value={person.birth_year} />
            </div>
            
            <DetailItem label="Gênero" value={person.gender} />
            <DetailItem 
              label="Filmes" 
              value={person.films.length.toString()} 
            />
            <DetailItem 
              label="Espécies" 
              value={person.species.length || 'Humano'} 
            />
            <DetailItem 
              label="Veículos" 
              value={person.vehicles.length.toString()} 
            />
            <DetailItem 
              label="Naves" 
              value={person.starships.length.toString()} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
