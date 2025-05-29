import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { SearchBar } from './components/SearchBar';
import { Pagination } from './components/Pagination';
import { LoadingCard } from './components/Loading';
import { ErrorMessage } from './components/ErrorMessage';
import { PersonCard } from './components/PersonCard';
import { PlanetCard } from './components/PlanetCard';
import { FilmCard } from './components/FilmCard';
import { StarshipCard } from './components/StarshipCard';
import { Card, DetailItem } from './components/Card';
import { Quiz } from './components/Quiz';
import { Ranking } from './components/Ranking';
import { useSwapiData, useSwapiSearch } from './hooks/useSwapi';
import type { ResourceType, Person, Planet, Film, Starship, Vehicle, Species } from './types/swapi';

function App() {
  const [activeTab, setActiveTab] = useState<ResourceType>('quiz');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Hooks para dados e busca (sempre chamados, mas condicionalmente utilizados)
  const { data: listData, loading: listLoading, error: listError, refetch } = useSwapiData(
    activeTab === 'quiz' || activeTab === 'ranking' ? 'people' : activeTab, 
    currentPage
  );
  const { data: searchData, loading: searchLoading, error: searchError, search, clearSearch } = useSwapiSearch(
    activeTab === 'quiz' || activeTab === 'ranking' ? 'people' : activeTab
  );

  // Determinar quais dados mostrar (apenas para tabs que não são quiz)
  const displayData = searchQuery ? searchData : listData;
  const isLoading = searchQuery ? searchLoading : listLoading;
  const error = searchQuery ? searchError : listError;

  // Calcular paginação
  const totalPages = useMemo(() => {
    if (!listData?.count) return 1;
    return Math.ceil(listData.count / 10);
  }, [listData?.count]);

  // Handlers
  const handleTabChange = (tab: ResourceType) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchQuery('');
    clearSearch();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    search(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    clearSearch();
  };

  const handleRetry = () => {
    if (searchQuery) {
      search(searchQuery);
    } else {
      refetch();
    }
  };

  // Se for quiz ou ranking, renderizar componentes específicos
  if (activeTab === 'quiz') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
        <Quiz />
      </div>
    );
  }

  if (activeTab === 'ranking') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
        <Ranking />
      </div>
    );
  }

  // Renderizar cards baseado no tipo de recurso
  const renderCards = () => {
    if (!displayData?.results) return null;

    switch (activeTab) {
      case 'people':
        return (displayData.results as Person[]).map((person, index) => (
          <PersonCard key={`${person.url}-${index}`} person={person} />
        ));
      
      case 'planets':
        return (displayData.results as Planet[]).map((planet, index) => (
          <PlanetCard key={`${planet.url}-${index}`} planet={planet} />
        ));
      
      case 'films':
        return (displayData.results as Film[]).map((film, index) => (
          <FilmCard key={`${film.url}-${index}`} film={film} />
        ));
      
      case 'starships':
        return (displayData.results as Starship[]).map((starship, index) => (
          <StarshipCard key={`${starship.url}-${index}`} starship={starship} />
        ));
      
      case 'vehicles':
        return (displayData.results as Vehicle[]).map((vehicle, index) => (
          <Card key={`${vehicle.url}-${index}`} title={vehicle.name} subtitle={vehicle.model}>
            <DetailItem label="Classe" value={vehicle.vehicle_class} />
            <DetailItem label="Fabricante" value={vehicle.manufacturer} />
            <DetailItem label="Comprimento" value={`${vehicle.length} m`} />
            <DetailItem label="Passageiros" value={vehicle.passengers} />
            <DetailItem label="Capacidade de carga" value={vehicle.cargo_capacity} />
          </Card>
        ));
      
      case 'species':
        return (displayData.results as Species[]).map((species, index) => (
          <Card key={`${species.url}-${index}`} title={species.name} subtitle={species.classification}>
            <DetailItem label="Designação" value={species.designation} />
            <DetailItem label="Altura média" value={`${species.average_height} cm`} />
            <DetailItem label="Expectativa de vida" value={species.average_lifespan} />
            <DetailItem label="Linguagem" value={species.language} />
            <DetailItem label="Mundo natal" value={species.homeworld ? '1 planeta' : 'Desconhecido'} />
          </Card>
        ));
      
      default:
        return null;
    }
  };

  const getPlaceholderText = () => {
    const placeholders = {
      people: 'Buscar personagens...',
      planets: 'Buscar planetas...',
      films: 'Buscar filmes...',
      starships: 'Buscar naves...',
      vehicles: 'Buscar veículos...',
      species: 'Buscar espécies...'
    };
    return placeholders[activeTab];
  };

  return (
    <div className="min-h-screen relative">
      {/* Fundo animado adicional */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/5 to-purple-900/5 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Header />
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="relative z-10 w-full max-w-none mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8">
        {/* Barra de busca - centralizada e responsiva */}
        <div className="mb-6 sm:mb-8">
          <SearchBar
            placeholder={getPlaceholderText()}
            onSearch={handleSearch}
            onClear={handleClearSearch}
            className="max-w-md mx-auto"
          />
        </div>

        {/* Conteúdo principal */}
        {error ? (
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <ErrorMessage message={error} onRetry={handleRetry} />
            </div>
          </div>
        ) : (
          <>
            {/* Resultados - Grid responsivo com melhor uso do espaço */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 mb-6 md:mb-8 w-full">
              {isLoading ? (
                <LoadingCard count={8} />
              ) : (
                renderCards()
              )}
            </div>

            {/* Informações dos resultados - centralizado */}
            {displayData && !isLoading && (
              <div className="flex justify-center mb-6">
                <p className="text-sm md:text-base text-cyan-300 font-orbitron tracking-wider text-center bg-slate-800/50 px-4 py-2 rounded-lg border border-cyan-400/30">
                  {searchQuery ? (
                    `${displayData.count} resultado(s) encontrado(s) para "${searchQuery}"`
                  ) : (
                    `${displayData.count} ${activeTab} encontrado(s)`
                  )}
                </p>
              </div>
            )}

            {/* Paginação (apenas para listagem, não para busca) - centralizada */}
            {!searchQuery && displayData && totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
