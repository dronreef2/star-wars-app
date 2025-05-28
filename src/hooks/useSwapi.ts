import { useState, useEffect } from 'react';
import swapiService from '../services/swapiService';
import type { ApiResponse, ResourceType } from '../types/swapi';

// Hook para buscar dados com paginação
export function useSwapiData<T>(resourceType: ResourceType, page = 1) {
  const [data, setData] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let response: ApiResponse<T>;

        switch (resourceType) {
          case 'people':
            response = await swapiService.getPeople(page) as ApiResponse<T>;
            break;
          case 'planets':
            response = await swapiService.getPlanets(page) as ApiResponse<T>;
            break;
          case 'films':
            response = await swapiService.getFilms() as ApiResponse<T>;
            break;
          case 'starships':
            response = await swapiService.getStarships(page) as ApiResponse<T>;
            break;
          case 'vehicles':
            response = await swapiService.getVehicles(page) as ApiResponse<T>;
            break;
          case 'species':
            response = await swapiService.getSpecies(page) as ApiResponse<T>;
            break;
          default:
            throw new Error(`Tipo de recurso não suportado: ${resourceType}`);
        }

        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resourceType, page]);

  const refetch = () => {
    // Força uma nova busca usando o mesmo estado atual
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let response: ApiResponse<T>;

        switch (resourceType) {
          case 'people':
            response = await swapiService.getPeople(page) as ApiResponse<T>;
            break;
          case 'planets':
            response = await swapiService.getPlanets(page) as ApiResponse<T>;
            break;
          case 'films':
            response = await swapiService.getFilms() as ApiResponse<T>;
            break;
          case 'starships':
            response = await swapiService.getStarships(page) as ApiResponse<T>;
            break;
          case 'vehicles':
            response = await swapiService.getVehicles(page) as ApiResponse<T>;
            break;
          case 'species':
            response = await swapiService.getSpecies(page) as ApiResponse<T>;
            break;
          default:
            throw new Error(`Tipo de recurso não suportado: ${resourceType}`);
        }

        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  return { data, loading, error, refetch };
}

// Hook para buscar um item específico
export function useSwapiItem<T>(resourceType: ResourceType, id: number | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === null) {
      setData(null);
      return;
    }

    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);

        let response: T;

        switch (resourceType) {
          case 'people':
            response = await swapiService.getPerson(id) as T;
            break;
          case 'planets':
            response = await swapiService.getPlanet(id) as T;
            break;
          case 'films':
            response = await swapiService.getFilm(id) as T;
            break;
          case 'starships':
            response = await swapiService.getStarship(id) as T;
            break;
          case 'vehicles':
            response = await swapiService.getVehicle(id) as T;
            break;
          case 'species':
            response = await swapiService.getSpeciesById(id) as T;
            break;
          default:
            throw new Error(`Tipo de recurso não suportado: ${resourceType}`);
        }

        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [resourceType, id]);

  return { data, loading, error };
}

// Hook para busca
export function useSwapiSearch<T>(resourceType: ResourceType) {
  const [data, setData] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) {
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let response: ApiResponse<T>;

      switch (resourceType) {
        case 'people':
          response = await swapiService.searchPeople(query) as ApiResponse<T>;
          break;
        case 'planets':
          response = await swapiService.searchPlanets(query) as ApiResponse<T>;
          break;
        case 'films':
          response = await swapiService.searchFilms(query) as ApiResponse<T>;
          break;
        case 'starships':
          response = await swapiService.searchStarships(query) as ApiResponse<T>;
          break;
        case 'vehicles':
          response = await swapiService.searchVehicles(query) as ApiResponse<T>;
          break;
        case 'species':
          response = await swapiService.searchSpecies(query) as ApiResponse<T>;
          break;
        default:
          throw new Error(`Tipo de recurso não suportado: ${resourceType}`);
      }

      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setData(null);
    setError(null);
  };

  return { data, loading, error, search, clearSearch };
}
