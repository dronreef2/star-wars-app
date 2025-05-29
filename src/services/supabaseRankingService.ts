import { supabase } from './supabaseClient';
import type { GameResult, PlayerStats } from './rankingService';

// Interface para as estatísticas do sistema
export interface SystemStats {
  totalGames: number;
  totalPlayers: number;
  activePlayers: number;
  averageGameScore: number;
  mostActivePlayer: PlayerStats | null;
}

class SupabaseRankingService {
  // Salvar resultado de uma partida no Supabase
  async saveGameResult(result: Omit<GameResult, 'id' | 'date'>): Promise<GameResult> {
    const gameResult: GameResult = {
      ...result,
      id: this.generateId(),
      date: new Date().toISOString()
    };

    // Salva no Supabase
    const { error } = await supabase
      .from('game_results')
      .insert(gameResult);

    if (error) {
      console.error('Erro ao salvar resultado no Supabase:', error);
      throw new Error('Falha ao salvar resultado do jogo');
    }

    // Atualiza as estatísticas do jogador
    await this.updatePlayerStats(gameResult);
    
    return gameResult;
  }

  // Obter todos os resultados de jogos
  async getGameResults(): Promise<GameResult[]> {
    const { data, error } = await supabase
      .from('game_results')
      .select('*')
      .order('date', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Erro ao buscar resultados no Supabase:', error);
      return [];
    }

    return data as GameResult[];
  }

  // Obter estatísticas de todos os jogadores
  async getPlayerStats(): Promise<PlayerStats[]> {
    const { data, error } = await supabase
      .from('player_stats')
      .select('*');

    if (error) {
      console.error('Erro ao buscar estatísticas no Supabase:', error);
      return [];
    }

    return data as PlayerStats[];
  }

  // Obter estatísticas de um jogador específico
  async getPlayerStatsByName(playerName: string): Promise<PlayerStats | null> {
    const { data, error } = await supabase
      .from('player_stats')
      .select('*')
      .eq('name', playerName)
      .single();

    if (error) {
      console.error(`Erro ao buscar estatísticas do jogador ${playerName}:`, error);
      return null;
    }

    return data as PlayerStats;
  }

  // Obter ranking geral (ordenado por taxa de vitória e pontuação média)
  async getGlobalRanking(): Promise<PlayerStats[]> {
    const { data, error } = await supabase
      .from('player_stats')
      .select('*')
      .gte('totalGames', 1)
      .order('winRate', { ascending: false })
      .order('averageScore', { ascending: false });

    if (error) {
      console.error('Erro ao buscar ranking global no Supabase:', error);
      return [];
    }

    return data as PlayerStats[];
  }

  // Obter top jogadores por diferentes critérios
  async getTopPlayers(criteria: 'wins' | 'games' | 'average' | 'winRate' = 'winRate', limit = 10): Promise<PlayerStats[]> {
    let orderBy = 'winRate';
    switch (criteria) {
      case 'wins': orderBy = 'totalWins'; break;
      case 'games': orderBy = 'totalGames'; break;
      case 'average': orderBy = 'averageScore'; break;
      case 'winRate': orderBy = 'winRate'; break;
    }

    const { data, error } = await supabase
      .from('player_stats')
      .select('*')
      .order(orderBy, { ascending: false })
      .limit(limit);

    if (error) {
      console.error(`Erro ao buscar top jogadores por ${criteria}:`, error);
      return [];
    }

    return data as PlayerStats[];
  }

  // Obter histórico de partidas de um jogador
  async getPlayerGameHistory(playerName: string): Promise<GameResult[]> {
    // Esta consulta é mais complexa, pois precisamos buscar jogos onde o array de players contém o nome
    // Utilizamos a função contains do PostgreSQL através do Supabase
    const { data, error } = await supabase
      .from('game_results')
      .select('*')
      .filter('players', 'cs', `{"name":"${playerName}"}`)
      .order('date', { ascending: false });

    if (error) {
      console.error(`Erro ao buscar histórico de jogos de ${playerName}:`, error);
      return [];
    }

    return data as GameResult[];
  }

  // Obter estatísticas gerais do sistema
  async getSystemStats(): Promise<SystemStats> {
    // Total de jogos
    const { count: totalGames } = await supabase
      .from('game_results')
      .select('*', { count: 'exact', head: true });

    // Total de jogadores
    const { count: totalPlayers } = await supabase
      .from('player_stats')
      .select('*', { count: 'exact', head: true });

    // Jogadores ativos (últimos 30 dias)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { count: activePlayers } = await supabase
      .from('player_stats')
      .select('*', { count: 'exact', head: true })
      .gte('lastPlayed', thirtyDaysAgo.toISOString());

    // Jogador mais ativo
    const { data: mostActivePlayerData } = await supabase
      .from('player_stats')
      .select('*')
      .order('totalGames', { ascending: false })
      .limit(1);

    const mostActivePlayer = mostActivePlayerData && mostActivePlayerData.length > 0 
      ? mostActivePlayerData[0] as PlayerStats 
      : null;

    // Pontuação média dos jogos
    const { data: gameScores } = await supabase
      .from('game_results')
      .select('players');

    let totalScore = 0;
    let totalPlayerCounts = 0;

    if (gameScores) {
      gameScores.forEach((game: any) => {
        const gameScore = game.players.reduce((sum: number, player: any) => sum + player.score, 0);
        totalScore += gameScore;
        totalPlayerCounts += game.players.length;
      });
    }

    const averageGameScore = totalPlayerCounts > 0 ? totalScore / totalPlayerCounts : 0;

    return {
      totalGames: totalGames || 0,
      totalPlayers: totalPlayers || 0,
      activePlayers: activePlayers || 0,
      averageGameScore,
      mostActivePlayer
    };
  }

  // Método privado para atualizar as estatísticas do jogador
  private async updatePlayerStats(gameResult: GameResult): Promise<void> {
    for (const playerResult of gameResult.players) {
      // Busca estatísticas existentes do jogador
      const { data: existingStats } = await supabase
        .from('player_stats')
        .select('*')
        .eq('name', playerResult.name)
        .maybeSingle();

      let playerStats: PlayerStats;
      
      if (!existingStats) {
        // Criar novo registro para o jogador
        playerStats = {
          name: playerResult.name,
          totalGames: 1,
          totalWins: gameResult.winner === playerResult.name ? 1 : 0,
          totalScore: playerResult.score,
          totalQuestions: gameResult.totalQuestions,
          averageScore: playerResult.score,
          winRate: gameResult.winner === playerResult.name ? 100 : 0,
          bestScore: (playerResult.score / gameResult.totalQuestions) * 100,
          lastPlayed: gameResult.date
        };

        await supabase.from('player_stats').insert(playerStats);
      } else {
        // Atualizar estatísticas existentes
        playerStats = existingStats as PlayerStats;
        
        const updatedStats: Partial<PlayerStats> = {
          totalGames: playerStats.totalGames + 1,
          totalWins: playerStats.totalWins + (gameResult.winner === playerResult.name ? 1 : 0),
          totalScore: playerStats.totalScore + playerResult.score,
          totalQuestions: playerStats.totalQuestions + gameResult.totalQuestions,
          lastPlayed: gameResult.date
        };

        // Calcular médias
        updatedStats.averageScore = (updatedStats.totalScore || 0) / (updatedStats.totalGames || 1);
        updatedStats.winRate = ((updatedStats.totalWins || 0) / (updatedStats.totalGames || 1)) * 100;
        
        // Atualizar melhor pontuação se necessário
        const currentPercentage = (playerResult.score / gameResult.totalQuestions) * 100;
        if (currentPercentage > playerStats.bestScore) {
          updatedStats.bestScore = currentPercentage;
        }

        // Envia atualização para o Supabase
        await supabase
          .from('player_stats')
          .update(updatedStats)
          .eq('name', playerStats.name);
      }
    }
  }

  // Gerar um ID único
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Migrar dados do localStorage para o Supabase
  async migrateLocalDataToSupabase(localService: any): Promise<boolean> {
    try {
      // Obter dados locais
      const gameResults = localService.getGameResults();
      
      // Inserir jogos no Supabase (em lotes pequenos para evitar erros)
      for (const result of gameResults) {
        await supabase.from('game_results').insert(result);
      }
      
      // Atualizar estatísticas para cada jogador
      const playerStats = localService.getPlayerStats();
      for (const stats of playerStats) {
        await supabase.from('player_stats').upsert(stats, {
          onConflict: 'name'
        });
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao migrar dados para o Supabase:', error);
      return false;
    }
  }
}

export const supabaseRankingService = new SupabaseRankingService();
