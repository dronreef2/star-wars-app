import axios from 'axios';
import type { 
  ApiResponse, 
  Person, 
  Planet, 
  Film, 
  Starship, 
  Vehicle, 
  Species, 
  ResourceType,
  SwapiRoot 
} from '../types/swapi';

const BASE_URL = 'https://swapi.py4e.com/api';

// Instância do axios configurada
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error);
    return Promise.reject(error);
  }
);

class SwapiService {
  // Método genérico para fazer requisições
  private async get<T>(endpoint: string): Promise<T> {
    const response = await api.get<T>(endpoint);
    return response.data;
  }

  // Buscar informações da raiz da API
  async getRoot(): Promise<SwapiRoot> {
    return this.get<SwapiRoot>('/');
  }

  // Buscar pessoas
  async getPeople(page = 1): Promise<ApiResponse<Person>> {
    return this.get<ApiResponse<Person>>(`/people/?page=${page}`);
  }

  async getPerson(id: number): Promise<Person> {
    return this.get<Person>(`/people/${id}/`);
  }

  async searchPeople(query: string): Promise<ApiResponse<Person>> {
    return this.get<ApiResponse<Person>>(`/people/?search=${encodeURIComponent(query)}`);
  }

  // Buscar planetas
  async getPlanets(page = 1): Promise<ApiResponse<Planet>> {
    return this.get<ApiResponse<Planet>>(`/planets/?page=${page}`);
  }

  async getPlanet(id: number): Promise<Planet> {
    return this.get<Planet>(`/planets/${id}/`);
  }

  async searchPlanets(query: string): Promise<ApiResponse<Planet>> {
    return this.get<ApiResponse<Planet>>(`/planets/?search=${encodeURIComponent(query)}`);
  }

  // Buscar filmes
  async getFilms(): Promise<ApiResponse<Film>> {
    return this.get<ApiResponse<Film>>('/films/');
  }

  async getFilm(id: number): Promise<Film> {
    return this.get<Film>(`/films/${id}/`);
  }

  async searchFilms(query: string): Promise<ApiResponse<Film>> {
    return this.get<ApiResponse<Film>>(`/films/?search=${encodeURIComponent(query)}`);
  }

  // Buscar naves
  async getStarships(page = 1): Promise<ApiResponse<Starship>> {
    return this.get<ApiResponse<Starship>>(`/starships/?page=${page}`);
  }

  async getStarship(id: number): Promise<Starship> {
    return this.get<Starship>(`/starships/${id}/`);
  }

  async searchStarships(query: string): Promise<ApiResponse<Starship>> {
    return this.get<ApiResponse<Starship>>(`/starships/?search=${encodeURIComponent(query)}`);
  }

  // Buscar veículos
  async getVehicles(page = 1): Promise<ApiResponse<Vehicle>> {
    return this.get<ApiResponse<Vehicle>>(`/vehicles/?page=${page}`);
  }

  async getVehicle(id: number): Promise<Vehicle> {
    return this.get<Vehicle>(`/vehicles/${id}/`);
  }

  async searchVehicles(query: string): Promise<ApiResponse<Vehicle>> {
    return this.get<ApiResponse<Vehicle>>(`/vehicles/?search=${encodeURIComponent(query)}`);
  }

  // Buscar espécies
  async getSpecies(page = 1): Promise<ApiResponse<Species>> {
    return this.get<ApiResponse<Species>>(`/species/?page=${page}`);
  }

  async getSpeciesById(id: number): Promise<Species> {
    return this.get<Species>(`/species/${id}/`);
  }

  async searchSpecies(query: string): Promise<ApiResponse<Species>> {
    return this.get<ApiResponse<Species>>(`/species/?search=${encodeURIComponent(query)}`);
  }

  // Método genérico para buscar qualquer recurso
  async searchResource<T>(resourceType: ResourceType, query: string): Promise<ApiResponse<T>> {
    return this.get<ApiResponse<T>>(`/${resourceType}/?search=${encodeURIComponent(query)}`);
  }

  // Buscar recurso por URL completa
  async getResourceByUrl<T>(url: string): Promise<T> {
    const cleanUrl = url.replace(BASE_URL, '');
    return this.get<T>(cleanUrl);
  }
  // Extrair ID de uma URL da SWAPI
  extractIdFromUrl(url: string): number {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? Number.parseInt(matches[1], 10) : 0;
  }
}

export default new SwapiService();
