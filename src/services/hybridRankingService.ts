import { supabase } from './supabaseClient';
import type { GameResult, PlayerStats } from './rankingService';

// Mock service que simula o Supabase quando há erro de conectividade
class MockSupabaseService {
  private mockData: GameResult[] = [];
  
  constructor() {
    // Carregar dados do localStorage se existirem
    this.loadFromLocalStorage();
    
    // Inicializar com alguns dados de demonstração se vazio
    if (this.mockData.length === 0) {
      this.initializeDemoData();
    }
  }
  
  private loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('star-wars-offline-data');
      if (saved) {
        this.mockData = JSON.parse(saved);
        console.log('📱 Dados offline carregados do localStorage:', this.mockData.length);
      }
    } catch (error) {
      console.warn('⚠️ Erro ao carregar dados offline:', error);
    }
  }
  
  private saveToLocalStorage() {
    try {
      localStorage.setItem('star-wars-offline-data', JSON.stringify(this.mockData));
    } catch (error) {
      console.warn('⚠️ Erro ao salvar dados offline:', error);
    }
  }
    private initializeDemoData() {
    const demoResults: GameResult[] = [
      {
        id: 'demo-1',
        players: [
          { name: 'Demo Player', score: 8, percentage: 80 },
          { name: 'Jedi Trainee', score: 6, percentage: 60 }
        ],
        winner: 'Demo Player',
        totalQuestions: 10,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 dia atrás
      },
      {
        id: 'demo-2',
        players: [
          { name: 'Jedi Master', score: 9, percentage: 90 },
          { name: 'Sith Apprentice', score: 7, percentage: 70 }
        ],
        winner: 'Jedi Master',
        totalQuestions: 10,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 dias atrás
      },
      {
        id: 'demo-3',
        players: [
          { name: 'Sith Lord', score: 10, percentage: 100 },
          { name: 'Rebel Fighter', score: 8, percentage: 80 }
        ],
        winner: 'Sith Lord',
        totalQuestions: 10,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 dias atrás
      }
    ];
    
    this.mockData = demoResults;
    this.saveToLocalStorage();
    console.log('🎮 Dados de demonstração inicializados');
  }
  
  async saveGameResult(result: Omit<GameResult, 'id' | 'date'>): Promise<GameResult> {
    const gameResult: GameResult = {
      ...result,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    
    this.mockData.push(gameResult);
    console.log('📝 Salvando no mock (offline):', gameResult);
    return gameResult;
  }
  
  async getGameResults(): Promise<GameResult[]> {
    console.log('📊 Retornando dados mock (offline)');
    return this.mockData;
  }
  
  async getPlayerStats(): Promise<PlayerStats[]> {
    console.log('📈 Retornando stats mock (offline)');
    const stats: PlayerStats[] = [      {
        name: 'Demo Player',
        totalGames: 5,
        averageScore: 85,
        bestScore: 100,
        winRate: 80,        totalWins: 4,
        totalQuestions: 50,        totalScore: 425,
        lastPlayed: new Date().toISOString()
      }
    ];
    return stats;
  }
  
  async getTopPlayers(): Promise<PlayerStats[]> {
    return this.getPlayerStats();
  }
  
  async updatePlayerStats(): Promise<void> {
    console.log('📊 Atualizando stats mock (offline)');
  }
  
  async getSystemStats() {
    return {
      totalGames: this.mockData.length,
      totalPlayers: 1,
      activePlayers: 1,
      averageGameScore: 85,
      mostActivePlayer: null
    };
  }
}

// Service híbrido que tenta usar Supabase, mas faz fallback para mock
class HybridRankingService {
  private mockService = new MockSupabaseService();
  
  private async checkSupabaseConnection(): Promise<boolean> {
    try {
      const { error } = await supabase.from('game_results').select('count').limit(1);
      if (error) {
        console.warn('⚠️ Supabase indisponível, usando modo offline:', error.message);
        return false;
      }
      return true;    } catch {
      console.warn('⚠️ Erro de conectividade, usando modo offline');
      return false;
    }
  }
  
  async saveGameResult(result: Omit<GameResult, 'id' | 'date'>): Promise<GameResult> {
    const isConnected = await this.checkSupabaseConnection();
    
    if (!isConnected) {
      return this.mockService.saveGameResult(result);
    }
    
    try {
      const gameResult: GameResult = {
        ...result,
        id: Date.now().toString(),
        date: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('game_results')
        .insert(gameResult);
      
      if (error) throw error;
      
      console.log('✅ Resultado salvo no Supabase:', gameResult);
      return gameResult;
    } catch (error) {
      console.warn('⚠️ Fallback para modo offline:', error);
      return this.mockService.saveGameResult(result);
    }
  }
  
  async getGameResults(): Promise<GameResult[]> {
    const isConnected = await this.checkSupabaseConnection();
    
    if (!isConnected) {
      return this.mockService.getGameResults();
    }
    
    try {
      const { data, error } = await supabase
        .from('game_results')
        .select('*')
        .order('date', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      
      console.log('✅ Resultados carregados do Supabase:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.warn('⚠️ Fallback para modo offline:', error);
      return this.mockService.getGameResults();
    }
  }
  
  async getPlayerStats(): Promise<PlayerStats[]> {
    const isConnected = await this.checkSupabaseConnection();
    
    if (!isConnected) {
      return this.mockService.getPlayerStats();
    }
    
    try {
      const { data, error } = await supabase
        .from('player_stats')
        .select('*')
        .order('winRate', { ascending: false });
      
      if (error) throw error;
      
      console.log('✅ Stats carregadas do Supabase:', data?.length || 0);
      return data || [];
    } catch (error) {
      console.warn('⚠️ Fallback para modo offline:', error);
      return this.mockService.getPlayerStats();
    }
  }
  
  async getTopPlayers(): Promise<PlayerStats[]> {
    const stats = await this.getPlayerStats();
    return stats.slice(0, 20);
  }
  
  async updatePlayerStats(): Promise<void> {
    const isConnected = await this.checkSupabaseConnection();
    
    if (!isConnected) {
      return this.mockService.updatePlayerStats();
    }
    
    // Implementação real do Supabase seria aqui
    console.log('✅ Stats atualizadas');
  }
  
  async getSystemStats() {
    const isConnected = await this.checkSupabaseConnection();
    
    if (!isConnected) {
      return this.mockService.getSystemStats();
    }
    
    try {
      const { data: gamesData } = await supabase
        .from('game_results')
        .select('*');
      
      const { data: playersData } = await supabase
        .from('player_stats')
        .select('*');
      
      return {
        totalGames: gamesData?.length || 0,
        totalPlayers: playersData?.length || 0,
        activePlayers: playersData?.filter(p => {
          const lastPlayed = new Date(p.lastPlayed);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return lastPlayed > thirtyDaysAgo;
        }).length || 0,
        averageGameScore: gamesData?.reduce((acc, game) => acc + game.score, 0) / (gamesData?.length || 1) || 0,
        mostActivePlayer: playersData?.[0] || null
      };
    } catch (error) {
      console.warn('⚠️ Fallback para modo offline:', error);
      return this.mockService.getSystemStats();
    }
  }
}

// Exportar instância única
export const hybridRankingService = new HybridRankingService();
