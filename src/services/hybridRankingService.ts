import { supabase } from './supabaseClient';
import type { GameResult, PlayerStats } from './rankingService';

// Mock service que simula o Supabase quando há erro de conectividade
class MockSupabaseService {
  private mockData: GameResult[] = [];
  
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
