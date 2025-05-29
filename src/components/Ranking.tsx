import { useState, useEffect } from 'react';
import { rankingService } from '../services/rankingService';
import type { GameResult, PlayerStats } from '../services/rankingService';
import { 
  Trophy, 
  Medal, 
  Star, 
  Calendar, 
  Users, 
  Target, 
  TrendingUp,
  Clock,
  Download,
  Upload,
  Trash2,
  ChevronDown,
  ChevronUp,
  Crown,
  Zap,
  Award
} from 'lucide-react';

interface SystemStats {
  totalGames: number;
  totalPlayers: number;
  activePlayers: number;
  averageGameScore: number;
  mostActivePlayer: PlayerStats | null;
}

export function Ranking() {
  const [activeTab, setActiveTab] = useState<'ranking' | 'history' | 'stats'>('ranking');
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [expandedGame, setExpandedGame] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setGameResults(rankingService.getGameResults());
    setPlayerStats(rankingService.getGlobalRanking());
    setSystemStats(rankingService.getSystemStats());
  };

  const handleExportData = () => {
    const data = rankingService.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `star-wars-quiz-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        if (rankingService.importData(content)) {
          loadData();        alert('Dados importados com sucesso!');
        } else {
          alert('Erro ao importar dados. Verifique o formato do arquivo.');
        }
      } catch {
        alert('Erro ao ler o arquivo.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleClearData = () => {
    if (window.confirm('Tem certeza que deseja apagar todos os dados? Esta ação não pode ser desfeita.')) {
      rankingService.clearAllData();
      loadData();
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

  const getRankIcon = (position: number) => {
    switch (position) {
      case 0: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 1: return <Medal className="w-6 h-6 text-gray-400" />;
      case 2: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <Star className="w-6 h-6 text-blue-400" />;
    }
  };

  const getRankBadge = (position: number) => {
    const badges = [
      { bg: 'bg-gradient-to-r from-yellow-500 to-yellow-600', text: 'Mestre Jedi', border: 'border-yellow-400' },
      { bg: 'bg-gradient-to-r from-gray-400 to-gray-500', text: 'Cavaleiro Jedi', border: 'border-gray-400' },
      { bg: 'bg-gradient-to-r from-amber-600 to-amber-700', text: 'Padawan', border: 'border-amber-500' },
    ];
    
    return badges[position] || { bg: 'bg-gradient-to-r from-blue-500 to-blue-600', text: 'Iniciante', border: 'border-blue-400' };
  };

  if (!systemStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-spin" />
          <p className="text-xl">Carregando dados do ranking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Estrelas de fundo */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={`ranking-star-${i}-${Math.random().toString(36)}`}
            className="absolute bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Trophy className="w-16 h-16 text-yellow-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Ranking Galáctico
            </h1>
            <Trophy className="w-16 h-16 text-yellow-400" />
          </div>
          
          {/* Estatísticas gerais */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg p-4 rounded-2xl border border-yellow-500/20">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{systemStats.totalPlayers}</p>
              <p className="text-sm text-gray-300">Jogadores</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg p-4 rounded-2xl border border-yellow-500/20">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{systemStats.totalGames}</p>
              <p className="text-sm text-gray-300">Partidas</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg p-4 rounded-2xl border border-yellow-500/20">
              <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{systemStats.activePlayers}</p>
              <p className="text-sm text-gray-300">Ativos (30d)</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg p-4 rounded-2xl border border-yellow-500/20">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{systemStats.averageGameScore.toFixed(1)}</p>
              <p className="text-sm text-gray-300">Média Geral</p>
            </div>
          </div>
        </div>

        {/* Navegação */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl p-2 border border-yellow-500/20">
            <div className="flex gap-2">
              {[
                { key: 'ranking', label: 'Ranking', icon: Trophy },
                { key: 'history', label: 'Histórico', icon: Clock },
                { key: 'stats', label: 'Estatísticas', icon: TrendingUp }              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as 'ranking' | 'history' | 'stats')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conteúdo das abas */}
        {activeTab === 'ranking' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">🏆 Hall da Fama Jedi</h2>
            
            {playerStats.length === 0 ? (
              <div className="text-center py-16">
                <Star className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-400">Nenhum jogo registrado ainda</p>
                <p className="text-gray-500">Seja o primeiro a entrar no ranking!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {playerStats.map((player, index) => {
                  const badge = getRankBadge(index);
                  return (
                    <div
                      key={`rank-${player.name}-${index}`}
                      className={`relative bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg p-6 rounded-3xl border-2 ${badge.border} shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]`}
                    >
                      {/* Posição */}
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full border-2 border-yellow-500 flex items-center justify-center font-bold text-xl">
                        #{index + 1}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-4">
                            {getRankIcon(index)}
                            <div>
                              <h3 className="text-2xl font-bold">{player.name}</h3>
                              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${badge.bg} text-white mt-1`}>
                                {badge.text}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                          <div>
                            <p className="text-3xl font-bold text-yellow-400">{player.totalWins}</p>
                            <p className="text-sm text-gray-400">Vitórias</p>
                          </div>
                          <div>
                            <p className="text-3xl font-bold text-blue-400">{player.winRate.toFixed(1)}%</p>
                            <p className="text-sm text-gray-400">Taxa de Vitória</p>
                          </div>
                          <div>
                            <p className="text-3xl font-bold text-green-400">{player.averageScore.toFixed(1)}</p>
                            <p className="text-sm text-gray-400">Média</p>
                          </div>
                          <div>
                            <p className="text-3xl font-bold text-purple-400">{player.totalGames}</p>
                            <p className="text-sm text-gray-400">Jogos</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>Melhor Score: {player.bestScore.toFixed(1)}%</span>
                          <span>Último jogo: {formatDate(player.lastPlayed)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">📜 Histórico de Batalhas</h2>
            
            {gameResults.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-400">Nenhum jogo registrado</p>
              </div>
            ) : (
              <div className="space-y-4">
                {gameResults.map((game) => (
                  <div
                    key={game.id}
                    className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-3xl border border-yellow-500/20 overflow-hidden"
                  >
                    <div 
                      className="p-6 cursor-pointer hover:bg-gray-700/30 transition-colors"
                      onClick={() => setExpandedGame(expandedGame === game.id ? null : game.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Calendar className="w-6 h-6 text-blue-400" />
                          <div>
                            <p className="font-bold text-lg">{formatDate(game.date)}</p>
                            <p className="text-gray-400">
                              {game.totalQuestions} perguntas • 
                              {game.winner ? ` Vencedor: ${game.winner}` : ' Empate'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex gap-2">
                            {game.players.map((player, index) => (
                              <span 
                                key={`game-${game.id}-player-${index}`}
                                className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                              >
                                {player.name}: {player.score}
                              </span>
                            ))}
                          </div>
                          {expandedGame === game.id ? 
                            <ChevronUp className="w-6 h-6" /> : 
                            <ChevronDown className="w-6 h-6" />
                          }
                        </div>
                      </div>
                    </div>

                    {expandedGame === game.id && (
                      <div className="px-6 pb-6 border-t border-gray-700">
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                          {game.players.map((player, index) => (
                            <div 
                              key={`expanded-${game.id}-player-${index}`}
                              className={`p-4 rounded-2xl border-2 ${
                                game.winner === player.name
                                  ? 'bg-yellow-500/10 border-yellow-500'
                                  : 'bg-gray-700/30 border-gray-600'
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                {game.winner === player.name && (
                                  <Crown className="w-6 h-6 text-yellow-400" />
                                )}
                                <h4 className="text-xl font-bold">{player.name}</h4>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>Pontuação:</span>
                                  <span className="font-bold">{player.score}/{game.totalQuestions}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Aproveitamento:</span>
                                  <span className="font-bold">{player.percentage.toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      game.winner === player.name
                                        ? 'bg-yellow-400'
                                        : 'bg-blue-400'
                                    }`}
                                    style={{ width: `${player.percentage}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">📊 Estatísticas & Gerenciamento</h2>
            
            {/* Controles de dados */}
            <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg p-6 rounded-3xl border border-yellow-500/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6" />
                Gerenciar Dados
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={handleExportData}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Exportar Dados
                </button>
                
                <label className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition-colors cursor-pointer">
                  <Upload className="w-5 h-5" />
                  Importar Dados
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                  />
                </label>
                
                <button
                  onClick={handleClearData}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  Limpar Dados
                </button>
              </div>
            </div>

            {/* Estatísticas detalhadas */}
            {systemStats.mostActivePlayer && (
              <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg p-6 rounded-3xl border border-yellow-500/20">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Jogador Mais Ativo
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{systemStats.mostActivePlayer.name}</p>
                      <p className="text-gray-400">{systemStats.mostActivePlayer.totalGames} jogos realizados</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-yellow-400">
                      {systemStats.mostActivePlayer.winRate.toFixed(1)}%
                    </p>
                    <p className="text-gray-400">Taxa de vitória</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
