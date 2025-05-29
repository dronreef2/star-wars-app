import { useState, useEffect } from 'react';
import { supabaseRankingService } from '../services/supabaseRankingService';
import { rankingService } from '../services/rankingService';
import type { GameResult, PlayerStats } from '../services/rankingService';
import type { SystemStats } from '../services/supabaseRankingService';
import { 
  Trophy, 
  Medal, 
  Star, 
  Calendar, 
  Users, 
  Target, 
  TrendingUp,
  Clock,
  ChevronDown,
  ChevronUp,
  Crown,
  Zap,
  Award,
  Cloud,
  Check,
  AlertCircle
} from 'lucide-react';

export function RankingSupabase() {
  const [activeTab, setActiveTab] = useState<'ranking' | 'history' | 'stats'>('ranking');
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [expandedGame, setExpandedGame] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortCriteria, setSortCriteria] = useState<'winRate' | 'wins' | 'games' | 'average'>('winRate');
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'migrating' | 'success' | 'error'>('idle');
  
  useEffect(() => {
    loadData();
  }, [sortCriteria]);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (activeTab === 'ranking') {
        const topPlayers = await supabaseRankingService.getTopPlayers(sortCriteria, 20);
        setPlayerStats(topPlayers);
      } else if (activeTab === 'history') {
        const results = await supabaseRankingService.getGameResults();
        setGameResults(results);
      } else if (activeTab === 'stats') {
        const stats = await supabaseRankingService.getSystemStats();
        setSystemStats(stats);
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Falha ao carregar dados do Supabase. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab: 'ranking' | 'history' | 'stats') => {
    setActiveTab(tab);
    loadData();
  };

  const getBadgeInfo = (stats: PlayerStats) => {
    if (stats.winRate >= 70) {
      return { 
        icon: <Crown className="h-5 w-5 text-yellow-400" />,
        name: 'Mestre Jedi', 
        color: 'bg-gradient-to-r from-yellow-600 to-yellow-300'
      };
    } else if (stats.winRate >= 50) {
      return { 
        icon: <Award className="h-5 w-5 text-blue-400" />,
        name: 'Cavaleiro Jedi', 
        color: 'bg-gradient-to-r from-blue-600 to-blue-400'
      };
    } else {
      return { 
        icon: <Zap className="h-5 w-5 text-green-400" />,
        name: 'Padawan', 
        color: 'bg-gradient-to-r from-green-700 to-green-500'
      };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const migrateLocalData = async () => {
    setMigrationStatus('migrating');
    try {
      const success = await supabaseRankingService.migrateLocalDataToSupabase(rankingService);
      if (success) {
        setMigrationStatus('success');
        // Recarrega dados após migração
        loadData();
        // Volta para o status ocioso após 3 segundos
        setTimeout(() => setMigrationStatus('idle'), 3000);
      } else {
        setMigrationStatus('error');
      }
    } catch (err) {
      console.error('Erro na migração:', err);
      setMigrationStatus('error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center space-x-4 mb-8">
        <Medal className="h-8 w-8 text-yellow-400" />
        <h1 className="text-2xl font-bold text-white font-orbitron tracking-wider">
          Ranking Galáctico <span className="text-blue-400">(Online)</span>
        </h1>
        <div className="ml-auto flex">
          <div className="flex items-center space-x-1 text-sm text-blue-300">
            <Cloud className="h-4 w-4" />
            <span>Dados salvos online</span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-800/40 backdrop-blur-sm p-1 rounded-lg">
        <button
          onClick={() => handleTabChange('ranking')}
          className={`flex items-center px-4 py-2 rounded-md flex-1 transition-all ${
            activeTab === 'ranking' 
              ? 'bg-blue-600/40 text-blue-100 shadow-inner border border-blue-500/50' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className={`w-5 h-5 mr-2 ${activeTab === 'ranking' ? 'text-yellow-400' : 'text-slate-500'}`} />
          Ranking
        </button>
        <button
          onClick={() => handleTabChange('history')}
          className={`flex items-center px-4 py-2 rounded-md flex-1 transition-all ${
            activeTab === 'history' 
              ? 'bg-blue-600/40 text-blue-100 shadow-inner border border-blue-500/50' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className={`w-5 h-5 mr-2 ${activeTab === 'history' ? 'text-green-400' : 'text-slate-500'}`} />
          Histórico
        </button>
        <button
          onClick={() => handleTabChange('stats')}
          className={`flex items-center px-4 py-2 rounded-md flex-1 transition-all ${
            activeTab === 'stats' 
              ? 'bg-blue-600/40 text-blue-100 shadow-inner border border-blue-500/50' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className={`w-5 h-5 mr-2 ${activeTab === 'stats' ? 'text-purple-400' : 'text-slate-500'}`} />
          Estatísticas
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/40 border border-red-500 rounded-lg text-red-200 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 text-red-400 mt-0.5" />
          <p>{error}</p>
        </div>
      )}
      
      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Tabs content */}
      {!isLoading && !error && (
        <>
          {/* Ranking Tab */}
          {activeTab === 'ranking' && (
            <div>
              {/* Sorting options */}
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setSortCriteria('winRate')}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    sortCriteria === 'winRate' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  Taxa de Vitória
                </button>
                <button
                  onClick={() => setSortCriteria('average')}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    sortCriteria === 'average' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  Pontuação Média
                </button>
                <button
                  onClick={() => setSortCriteria('wins')}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    sortCriteria === 'wins' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  Total de Vitórias
                </button>
                <button
                  onClick={() => setSortCriteria('games')}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    sortCriteria === 'games' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  Total de Jogos
                </button>
              </div>

              {playerStats.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Trophy className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p>Nenhum jogador registrado ainda.</p>
                </div>
              ) : (
                <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg overflow-hidden">
                  {playerStats.map((player, index) => {
                    const badge = getBadgeInfo(player);
                    return (
                      <div 
                        key={player.name}
                        className={`flex items-center p-4 border-b border-slate-700 ${
                          index < 3 ? 'bg-gradient-to-r from-slate-800/80 to-slate-700/40' : ''
                        }`}
                      >
                        <div className="flex items-center justify-center w-8 h-8 mr-4">
                          {index < 3 ? (
                            <div className={`
                              w-8 h-8 rounded-full flex items-center justify-center font-bold
                              ${index === 0 ? 'bg-yellow-500 text-yellow-900' : 
                                index === 1 ? 'bg-gray-400 text-gray-800' : 
                                'bg-amber-700 text-amber-200'}
                            `}>
                              {index + 1}
                            </div>
                          ) : (
                            <div className="text-slate-500 font-medium w-8 text-center">
                              {index + 1}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-semibold text-white">{player.name}</div>
                          <div className="text-xs text-slate-400">
                            Última partida: {formatDate(player.lastPlayed)}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end mr-4">
                          <div className="text-white font-medium">
                            {sortCriteria === 'average' 
                              ? `${player.averageScore.toFixed(1)}pts` 
                              : sortCriteria === 'wins'
                              ? `${player.totalWins} vitórias`
                              : sortCriteria === 'games'
                              ? `${player.totalGames} jogos`
                              : `${player.winRate.toFixed(1)}%`}
                          </div>
                          <div className="text-xs text-slate-400">
                            {player.totalGames} jogos
                          </div>
                        </div>
                        
                        <div className={`text-xs px-2 py-1 rounded-full text-white flex items-center space-x-1 ${badge.color}`}>
                          {badge.icon}
                          <span>{badge.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          
          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              {gameResults.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p>Nenhuma partida registrada ainda.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {gameResults.map((game) => (
                    <div 
                      key={game.id} 
                      className="bg-slate-800/40 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-700"
                    >
                      <div 
                        className="p-4 cursor-pointer hover:bg-slate-700/50 transition"
                        onClick={() => setExpandedGame(expandedGame === game.id ? null : game.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                            <span className="text-sm text-slate-300">
                              {formatDate(game.date)}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {game.winner && (
                              <span className="bg-yellow-600/30 text-yellow-300 text-xs px-2 py-0.5 rounded">
                                Vencedor: {game.winner}
                              </span>
                            )}
                            {!game.winner && (
                              <span className="bg-blue-600/30 text-blue-300 text-xs px-2 py-0.5 rounded">
                                Empate
                              </span>
                            )}
                            
                            {expandedGame === game.id ? (
                              <ChevronUp className="h-4 w-4 text-slate-400" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-slate-400" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {expandedGame === game.id && (
                        <div className="bg-slate-900/80 border-t border-slate-700 p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {game.players.map((player, index) => (
                              <div 
                                key={index} 
                                className={`p-3 rounded-lg border ${
                                  game.winner === player.name
                                    ? 'bg-yellow-900/20 border-yellow-700'
                                    : 'bg-slate-800/50 border-slate-700'
                                }`}
                              >
                                <div className="flex items-center mb-2">
                                  <div className="text-lg font-medium text-white">{player.name}</div>
                                  {game.winner === player.name && (
                                    <Trophy className="h-4 w-4 ml-2 text-yellow-400" />
                                  )}
                                </div>
                                
                                <div className="text-sm text-slate-300">
                                  <div className="flex justify-between">
                                    <span>Pontuação:</span>
                                    <span className="font-medium">
                                      {player.score} / {game.totalQuestions}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Taxa de acerto:</span>
                                    <span className="font-medium">
                                      {player.percentage.toFixed(1)}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {game.duration && (
                            <div className="mt-2 text-xs text-slate-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Duração: {(game.duration / 1000).toFixed(1)} segundos
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Stats Tab */}
          {activeTab === 'stats' && systemStats && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-lg border border-slate-700">
                  <div className="flex items-center mb-3">
                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                    <h3 className="text-lg font-medium text-white">Estatísticas Gerais</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total de Partidas:</span>
                      <span className="text-white font-medium">{systemStats.totalGames}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total de Jogadores:</span>
                      <span className="text-white font-medium">{systemStats.totalPlayers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Jogadores Ativos (30d):</span>
                      <span className="text-white font-medium">{systemStats.activePlayers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Pontuação Média:</span>
                      <span className="text-white font-medium">
                        {systemStats.averageGameScore.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {systemStats.mostActivePlayer && (
                  <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm p-4 rounded-lg border border-blue-800/50">
                    <div className="flex items-center mb-3">
                      <Users className="h-5 w-5 mr-2 text-blue-400" />
                      <h3 className="text-lg font-medium text-white">Jogador Mais Ativo</h3>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold text-white mb-1">
                        {systemStats.mostActivePlayer.name}
                      </div>
                      <div className="text-sm text-blue-300 mb-3">
                        {systemStats.mostActivePlayer.totalGames} partidas jogadas
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-slate-800/50 p-2 rounded">
                          <div className="text-slate-400">Taxa de Vitória</div>
                          <div className="text-white font-medium">
                            {systemStats.mostActivePlayer.winRate.toFixed(1)}%
                          </div>
                        </div>
                        <div className="bg-slate-800/50 p-2 rounded">
                          <div className="text-slate-400">Pontuação Média</div>
                          <div className="text-white font-medium">
                            {systemStats.mostActivePlayer.averageScore.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-lg border border-slate-700">
                <div className="flex items-center mb-4">
                  <Target className="h-5 w-5 mr-2 text-green-400" />
                  <h3 className="text-lg font-medium text-white">Gerenciamento de Dados</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <button
                      onClick={migrateLocalData}
                      disabled={migrationStatus === 'migrating'}
                      className={`
                        w-full flex items-center justify-center px-4 py-3 rounded
                        ${migrationStatus === 'idle' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 
                          migrationStatus === 'migrating' ? 'bg-slate-700 text-slate-300 cursor-not-allowed' :
                          migrationStatus === 'success' ? 'bg-green-700 text-white' :
                          'bg-red-700 text-white'
                        }
                      `}
                    >
                      {migrationStatus === 'idle' && (
                        <>
                          <Cloud className="h-5 w-5 mr-2" />
                          <span>Migrar Dados Locais para Supabase</span>
                        </>
                      )}
                      {migrationStatus === 'migrating' && (
                        <>
                          <div className="h-5 w-5 mr-2 border-t-2 border-r-2 border-white rounded-full animate-spin" />
                          <span>Migrando Dados...</span>
                        </>
                      )}
                      {migrationStatus === 'success' && (
                        <>
                          <Check className="h-5 w-5 mr-2" />
                          <span>Dados Migrados com Sucesso</span>
                        </>
                      )}
                      {migrationStatus === 'error' && (
                        <>
                          <AlertCircle className="h-5 w-5 mr-2" />
                          <span>Erro ao Migrar Dados</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="flex justify-between text-xs text-slate-400">
                    <div>
                      Os dados são armazenados de forma segura no Supabase
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
