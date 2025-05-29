export interface GameResult {
  id: string;
  date: string;
  players: {
    name: string;
    score: number;
    percentage: number;
  }[];
  winner: string | null;
  totalQuestions: number;
  duration?: number;
}

export interface PlayerStats {
  name: string;
  totalGames: number;
  totalWins: number;
  totalScore: number;
  totalQuestions: number;
  averageScore: number;
  winRate: number;
  bestScore: number;
  lastPlayed: string;
}

class RankingService {
  private readonly STORAGE_KEY = 'star-wars-quiz-ranking';
  private readonly STATS_KEY = 'star-wars-quiz-stats';

  // Salvar resultado de uma partida
  saveGameResult(result: Omit<GameResult, 'id' | 'date'>): GameResult {
    const gameResult: GameResult = {
      ...result,
      id: this.generateId(),
      date: new Date().toISOString()
    };

    const existingResults = this.getGameResults();
    existingResults.unshift(gameResult); // Adiciona no início (mais recente primeiro)
    
    // Manter apenas os últimos 100 jogos para não sobrecarregar o localStorage
    const limitedResults = existingResults.slice(0, 100);
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(limitedResults));
    this.updatePlayerStats(gameResult);
    
    return gameResult;
  }

  // Obter todos os resultados de jogos
  getGameResults(): GameResult[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  // Obter estatísticas de todos os jogadores
  getPlayerStats(): PlayerStats[] {
    const stored = localStorage.getItem(this.STATS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  // Obter estatísticas de um jogador específico
  getPlayerStatsByName(playerName: string): PlayerStats | null {
    const stats = this.getPlayerStats();
    return stats.find(stat => stat.name.toLowerCase() === playerName.toLowerCase()) || null;
  }

  // Obter ranking geral (ordenado por taxa de vitória e pontuação média)
  getGlobalRanking(): PlayerStats[] {
    return this.getPlayerStats()
      .filter(player => player.totalGames >= 1) // Pelo menos 1 jogo
      .sort((a, b) => {
        // Primeiro por taxa de vitória, depois por pontuação média
        if (b.winRate !== a.winRate) {
          return b.winRate - a.winRate;
        }
        return b.averageScore - a.averageScore;
      });
  }

  // Obter top jogadores por diferentes critérios
  getTopPlayers(criteria: 'wins' | 'games' | 'average' | 'winRate' = 'winRate', limit = 10): PlayerStats[] {
    const stats = this.getPlayerStats();
    
    const sortedStats = stats.sort((a, b) => {
      switch (criteria) {
        case 'wins':
          return b.totalWins - a.totalWins;
        case 'games':
          return b.totalGames - a.totalGames;
        case 'average':
          return b.averageScore - a.averageScore;
        case 'winRate':
        default:
          return b.winRate - a.winRate;
      }
    });

    return sortedStats.slice(0, limit);
  }

  // Obter histórico de partidas de um jogador
  getPlayerGameHistory(playerName: string): GameResult[] {
    return this.getGameResults().filter(game => 
      game.players.some(player => 
        player.name.toLowerCase() === playerName.toLowerCase()
      )
    );
  }

  // Limpar todos os dados (para reset)
  clearAllData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.STATS_KEY);
  }

  // Exportar dados para backup
  exportData(): string {
    const data = {
      gameResults: this.getGameResults(),
      playerStats: this.getPlayerStats(),
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }

  // Importar dados de backup
  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.gameResults && Array.isArray(data.gameResults)) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data.gameResults));
      }
      
      if (data.playerStats && Array.isArray(data.playerStats)) {
        localStorage.setItem(this.STATS_KEY, JSON.stringify(data.playerStats));
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao importar dados:', error);
      return false;
    }
  }

  private updatePlayerStats(gameResult: GameResult): void {
    const existingStats = this.getPlayerStats();
    
    gameResult.players.forEach(playerResult => {
      let playerStats = existingStats.find(stat => 
        stat.name.toLowerCase() === playerResult.name.toLowerCase()
      );

      if (!playerStats) {
        playerStats = {
          name: playerResult.name,
          totalGames: 0,
          totalWins: 0,
          totalScore: 0,
          totalQuestions: 0,
          averageScore: 0,
          winRate: 0,
          bestScore: 0,
          lastPlayed: gameResult.date
        };
        existingStats.push(playerStats);
      }

      // Atualizar estatísticas
      playerStats.totalGames += 1;
      playerStats.totalScore += playerResult.score;
      playerStats.totalQuestions += gameResult.totalQuestions;
      playerStats.lastPlayed = gameResult.date;
      
      // Verificar se ganhou
      if (gameResult.winner === playerResult.name) {
        playerStats.totalWins += 1;
      }
      
      // Calcular médias
      playerStats.averageScore = playerStats.totalScore / playerStats.totalGames;
      playerStats.winRate = (playerStats.totalWins / playerStats.totalGames) * 100;
      
      // Atualizar melhor pontuação
      const currentPercentage = (playerResult.score / gameResult.totalQuestions) * 100;
      if (currentPercentage > playerStats.bestScore) {
        playerStats.bestScore = currentPercentage;
      }
    });

    localStorage.setItem(this.STATS_KEY, JSON.stringify(existingStats));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Obter estatísticas gerais do sistema
  getSystemStats() {
    const gameResults = this.getGameResults();
    const playerStats = this.getPlayerStats();
    
    return {
      totalGames: gameResults.length,
      totalPlayers: playerStats.length,
      activePlayers: playerStats.filter(p => {
        const lastPlayed = new Date(p.lastPlayed);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return lastPlayed > thirtyDaysAgo;
      }).length,
      averageGameScore: gameResults.reduce((sum, game) => {
        const totalScore = game.players.reduce((playerSum, player) => playerSum + player.score, 0);
        return sum + (totalScore / game.players.length);
      }, 0) / (gameResults.length || 1),
      mostActivePlayer: playerStats.reduce((most, current) => 
        current.totalGames > (most?.totalGames || 0) ? current : most, null as PlayerStats | null
      )
    };
  }
}

export const rankingService = new RankingService();
