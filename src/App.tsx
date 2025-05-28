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
import { useSwapiData, useSwapiSearch } from './hooks/useSwapi';
import type { ResourceType, Person, Planet, Film, Starship, Vehicle, Species } from './types/swapi';

function App() {
  const [activeTab, setActiveTab] = useState<ResourceType>('people');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Hooks para dados e busca
  const { data: listData, loading: listLoading, error: listError, refetch } = useSwapiData(activeTab, currentPage);
  const { data: searchData, loading: searchLoading, error: searchError, search, clearSearch } = useSwapiSearch(activeTab);

  // Determinar quais dados mostrar
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
          <div key={`${vehicle.url}-${index}`} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{vehicle.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{vehicle.model}</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Classe:</span>
                <span className="text-sm text-gray-900">{vehicle.vehicle_class}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Fabricante:</span>
                <span className="text-sm text-gray-900">{vehicle.manufacturer}</span>
              </div>
            </div>
          </div>
        ));
      
      case 'species':
        return (displayData.results as Species[]).map((species, index) => (
          <div key={`${species.url}-${index}`} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{species.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{species.classification}</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Designação:</span>
                <span className="text-sm text-gray-900">{species.designation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Altura média:</span>
                <span className="text-sm text-gray-900">{species.average_height} cm</span>
              </div>
            </div>
          </div>
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barra de busca */}
        <div className="mb-8">
          <SearchBar
            placeholder={getPlaceholderText()}
            onSearch={handleSearch}
            onClear={handleClearSearch}
            className="max-w-md mx-auto"
          />
        </div>

        {/* Conteúdo principal */}
        {error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : (
          <>
            {/* Resultados */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {isLoading ? (
                <LoadingCard count={6} />
              ) : (
                renderCards()
              )}
            </div>

            {/* Informações dos resultados */}
            {displayData && !isLoading && (
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-600">
                  {searchQuery ? (
                    `${displayData.count} resultado(s) encontrado(s) para "${searchQuery}"`
                  ) : (
                    `${displayData.count} ${activeTab} encontrado(s)`
                  )}
                </p>
              </div>
            )}

            {/* Paginação (apenas para listagem, não para busca) */}
            {!searchQuery && displayData && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
