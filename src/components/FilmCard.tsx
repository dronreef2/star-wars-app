import { Film as FilmIcon, Calendar, User } from 'lucide-react';
import type { Film } from '../types/swapi';
import { Card, DetailItem } from './Card';

interface FilmCardProps {
  film: Film;
  onClick?: () => void;
}

export function FilmCard({ film, onClick }: FilmCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card
      title={film.title}
      subtitle={`Episódio ${film.episode_id} • ${formatDate(film.release_date)}`}
      onClick={onClick}
    >
      <DetailItem label="Diretor" value={film.director} />
      <DetailItem label="Produtor" value={film.producer} />
      <DetailItem label="Personagens" value={film.characters.length.toString()} />
      <DetailItem label="Planetas" value={film.planets.length.toString()} />
    </Card>
  );
}

interface FilmDetailProps {
  film: Film;
}

export function FilmDetail({ film }: FilmDetailProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center mb-6">
        <div className="bg-yellow-100 p-3 rounded-full mr-4">
          <FilmIcon className="h-8 w-8 text-yellow-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{film.title}</h1>
          <p className="text-lg text-gray-600">Episódio {film.episode_id}</p>
        </div>
      </div>

      {/* Opening Crawl */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">
          Abertura
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {film.opening_crawl}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informações de Produção */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Produção
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-500 mr-3" />
              <DetailItem label="Diretor" value={film.director} />
            </div>
            
            <DetailItem label="Produtor" value={film.producer} />
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-3" />
              <DetailItem label="Lançamento" value={formatDate(film.release_date)} />
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            Conteúdo
          </h2>
          
          <div className="space-y-3">
            <DetailItem 
              label="Personagens" 
              value={film.characters.length.toString()} 
            />
            <DetailItem 
              label="Planetas" 
              value={film.planets.length.toString()} 
            />
            <DetailItem 
              label="Naves" 
              value={film.starships.length.toString()} 
            />
            <DetailItem 
              label="Veículos" 
              value={film.vehicles.length.toString()} 
            />
            <DetailItem 
              label="Espécies" 
              value={film.species.length.toString()} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
