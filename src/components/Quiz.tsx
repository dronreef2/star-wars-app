import { useState, useEffect, useCallback } from 'react';
import swapiService from '../services/swapiService';
import { rankingService } from '../services/rankingService';
import { hybridRankingService } from '../services/hybridRankingService';
import type { Film, Person } from '../types/swapi';
import { 
  Trophy, 
  User, 
  Star, 
  RotateCcw, 
  Target, 
  Brain,
  Sword,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: 'films' | 'people' | 'planets' | 'starships';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Player {
  name: string;
  score: number;
  answers: { questionId: number; correct: boolean; answer: string }[];
}

interface QuizState {
  players: [Player, Player];
  currentPlayer: 0 | 1;
  currentQuestion: number;
  questions: QuizQuestion[];
  gamePhase: 'setup' | 'playing' | 'finished';
  totalQuestions: number;
}

export function Quiz() {
  const [quizState, setQuizState] = useState<QuizState>({
    players: [
      { name: '', score: 0, answers: [] },
      { name: '', score: 0, answers: [] }
    ],
    currentPlayer: 0,
    currentQuestion: 0,
    questions: [],
    gamePhase: 'setup',
    totalQuestions: 10
  });
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const generateQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const questions: QuizQuestion[] = [];
      
      // Gerar perguntas sobre filmes famosos
      const films = await swapiService.getFilms();
      const famousFilms = films.results.slice(0, 6); // Os 6 primeiros filmes
      
      famousFilms.forEach((film: Film, filmIndex: number) => {
        // Pergunta sobre diretor
        questions.push({
          id: questions.length + 1,
          question: `Quem dirigiu o filme "${film.title}"?`,
          options: shuffleArray([
            film.director,
            'J.J. Abrams',
            'Rian Johnson',
            'Ron Howard'
          ]),
          correctAnswer: 0,
          category: 'films',
          difficulty: 'medium'
        });

        // Pergunta sobre ano de lançamento
        if (filmIndex < 3) {
          const releaseYear = film.release_date.split('-')[0];
          questions.push({
            id: questions.length + 1,
            question: `Em que ano foi lançado "${film.title}"?`,
            options: shuffleArray([
              releaseYear,
              String(Number(releaseYear) + 1),
              String(Number(releaseYear) - 1),
              String(Number(releaseYear) + 2)
            ]),
            correctAnswer: 0,
            category: 'films',
            difficulty: 'hard'
          });
        }
      });

      // Gerar perguntas sobre personagens famosos
      const people = await swapiService.getPeople();
      const famousCharacters = [
        people.results.find(p => p.name === 'Luke Skywalker'),
        people.results.find(p => p.name === 'Darth Vader'),
        people.results.find(p => p.name === 'Leia Organa'),
        people.results.find(p => p.name === 'Obi-Wan Kenobi'),
        people.results.find(p => p.name === 'Yoda'),
        people.results.find(p => p.name === 'Han Solo')
      ].filter(Boolean) as Person[];

      famousCharacters.forEach((character: Person) => {
        // Pergunta sobre planeta natal
        questions.push({
          id: questions.length + 1,
          question: `Qual é o planeta natal de ${character.name}?`,
          options: shuffleArray([
            character.homeworld.split('/').slice(-2, -1)[0] === '1' ? 'Tatooine' :
            character.homeworld.split('/').slice(-2, -1)[0] === '2' ? 'Alderaan' :
            character.homeworld.split('/').slice(-2, -1)[0] === '8' ? 'Naboo' :
            character.homeworld.split('/').slice(-2, -1)[0] === '20' ? 'Stewart' : 'Desconhecido',
            'Coruscant',
            'Hoth',
            'Dagobah'
          ]),
          correctAnswer: 0,
          category: 'people',
          difficulty: 'medium'
        });

        // Pergunta sobre características físicas
        if (character.height !== 'unknown') {
          questions.push({
            id: questions.length + 1,
            question: `Qual é a altura de ${character.name}?`,
            options: shuffleArray([
              `${character.height}cm`,
              `${Number(character.height) + 10}cm`,
              `${Number(character.height) - 10}cm`,
              `${Number(character.height) + 20}cm`
            ]),
            correctAnswer: 0,
            category: 'people',
            difficulty: 'hard'
          });
        }
      });

      // Adicionar perguntas gerais de conhecimento Star Wars
      const generalQuestions: QuizQuestion[] = [
        {
          id: questions.length + 1,
          question: 'Qual é a arma característica dos Jedi?',
          options: ['Sabre de luz', 'Blaster', 'Vibro-espada', 'Força'],
          correctAnswer: 0,
          category: 'people',
          difficulty: 'easy'
        },
        {
          id: questions.length + 2,
          question: 'Qual é o nome da estação espacial do Império?',
          options: ['Estrela da Morte', 'Estrela Destruidora', 'Nave Imperial', 'Base Estelar'],
          correctAnswer: 0,
          category: 'starships',
          difficulty: 'easy'
        },
        {
          id: questions.length + 3,
          question: 'Quem é o mestre Jedi de Luke Skywalker?',
          options: ['Yoda', 'Obi-Wan Kenobi', 'Mace Windu', 'Qui-Gon Jinn'],
          correctAnswer: 0,
          category: 'people',
          difficulty: 'easy'
        },
        {
          id: questions.length + 4,
          question: 'Qual é o planeta desértico onde Luke Skywalker cresceu?',
          options: ['Tatooine', 'Jakku', 'Geonosis', 'Jedha'],
          correctAnswer: 0,
          category: 'planets',
          difficulty: 'easy'
        }
      ];

      questions.push(...generalQuestions);

      // Selecionar aleatoriamente as perguntas para o quiz
      const selectedQuestions = shuffleArray(questions).slice(0, quizState.totalQuestions);
      
      setQuizState(prev => ({
        ...prev,
        questions: selectedQuestions
      }));
    } catch (error) {
      console.error('Erro ao gerar perguntas:', error);
    } finally {
      setLoading(false);
    }
  }, [quizState.totalQuestions]);

  useEffect(() => {
    if (quizState.gamePhase === 'playing' && quizState.questions.length === 0) {
      generateQuestions();
    }
  }, [quizState.gamePhase, quizState.questions.length, generateQuestions]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = () => {
    if (quizState.players[0].name && quizState.players[1].name) {
      setQuizState(prev => ({ ...prev, gamePhase: 'playing' }));
    }
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = quizState.questions[quizState.currentQuestion];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const currentPlayerIndex = quizState.currentPlayer;

    setQuizState(prev => {
      const newState = { ...prev };
      
      // Atualizar pontuação e respostas do jogador atual
      if (isCorrect) {
        newState.players[currentPlayerIndex].score += 1;
      }
      
      newState.players[currentPlayerIndex].answers.push({
        questionId: currentQuestion.id,
        correct: isCorrect,
        answer: currentQuestion.options[selectedAnswer]
      });
      
      // Próxima pergunta ou fim do jogo
      if (newState.currentQuestion + 1 < newState.totalQuestions) {
        newState.currentQuestion += 1;
        newState.currentPlayer = newState.currentPlayer === 0 ? 1 : 0;
      } else {
        newState.gamePhase = 'finished';
        
        // Determinar o vencedor e salvar resultado
        const winner = newState.players[0].score > newState.players[1].score ? 
          newState.players[0].name :
          newState.players[1].score > newState.players[0].score ? 
          newState.players[1].name : 
          null;
          
        // Preparar os dados do resultado
        const gameResult = {
          players: newState.players.map(player => ({
            name: player.name,
            score: player.score,
            percentage: (player.score / newState.totalQuestions) * 100
          })),
          winner,
          totalQuestions: newState.totalQuestions
        };

        // Salvar localmente
        rankingService.saveGameResult(gameResult);
        
        // Salvar no Supabase (assíncrono, não bloqueia a UI)
        hybridRankingService.saveGameResult(gameResult)
          .then(() => console.log("Resultado salvo com sucesso no Supabase"))
          .catch(error => console.error("Erro ao salvar no Supabase:", error));
      }

      return newState;
    });

    setSelectedAnswer(null);
  };
  const resetGame = () => {
    setQuizState({
      players: [
        { name: '', score: 0, answers: [] },
        { name: '', score: 0, answers: [] }
      ],
      currentPlayer: 0,
      currentQuestion: 0,
      questions: [],
      gamePhase: 'setup',
      totalQuestions: 10
    });
    setSelectedAnswer(null);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white flex items-center justify-center relative overflow-hidden">
        {/* Estrelas de fundo animadas */}        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`loading-star-${i}-${Math.random()}`}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="text-center relative z-10 bg-black/30 backdrop-blur-md rounded-3xl p-12 border border-yellow-500/30">
          <div className="relative mb-8">
            <Star className="w-20 h-20 text-yellow-400 mx-auto animate-spin" />
            <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Preparando o Quiz
          </h2>
          <p className="text-xl text-gray-300 mb-6">Gerando perguntas da galáxia muito, muito distante...</p>          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={`loading-dot-${i}`}
                className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (quizState.gamePhase === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white flex items-center justify-center relative overflow-hidden p-4">        {/* Estrelas de fundo */}        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={`setup-star-${i}-${Math.random().toString(36)}`}
              className="absolute bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animation: `twinkle ${Math.random() * 4 + 2}s infinite`
              }}
            />
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-lg w-full border border-yellow-500/20 relative z-10">
          {/* Header com ícones */}
          <div className="text-center mb-10">
            <div className="flex justify-center items-center mb-6">
              <Sword className="w-12 h-12 text-yellow-400 mr-4" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Quiz Star Wars
              </h1>
              <Sword className="w-12 h-12 text-yellow-400 ml-4 scale-x-[-1]" />
            </div>
            <p className="text-gray-300 text-lg">
              Teste seus conhecimentos sobre a galáxia muito, muito distante!
            </p>
          </div>

          <div className="space-y-8">
            {/* Jogador 1 */}
            <div className="space-y-3">
              <label htmlFor="player1-name" className="flex items-center text-sm font-medium text-yellow-300">
                <User className="w-5 h-5 mr-2" />
                Nome do Jogador 1
              </label>
              <input
                id="player1-name"
                type="text"
                value={quizState.players[0].name}
                onChange={(e) => setQuizState(prev => ({
                  ...prev,
                  players: [
                    { ...prev.players[0], name: e.target.value },
                    prev.players[1]
                  ]
                }))}
                className="w-full p-4 bg-gray-700/80 rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 text-white placeholder-gray-400"
                placeholder="Digite o nome do primeiro jogador"
              />
            </div>

            {/* Jogador 2 */}
            <div className="space-y-3">
              <label htmlFor="player2-name" className="flex items-center text-sm font-medium text-yellow-300">
                <User className="w-5 h-5 mr-2" />
                Nome do Jogador 2
              </label>
              <input
                id="player2-name"
                type="text"
                value={quizState.players[1].name}
                onChange={(e) => setQuizState(prev => ({
                  ...prev,
                  players: [
                    prev.players[0],
                    { ...prev.players[1], name: e.target.value }
                  ]
                }))}
                className="w-full p-4 bg-gray-700/80 rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 text-white placeholder-gray-400"
                placeholder="Digite o nome do segundo jogador"
              />
            </div>

            {/* Número de perguntas */}
            <div className="space-y-3">
              <label htmlFor="question-count" className="flex items-center text-sm font-medium text-yellow-300">
                <Brain className="w-5 h-5 mr-2" />
                Número de Perguntas
              </label>
              <select
                id="question-count"
                value={quizState.totalQuestions}
                onChange={(e) => setQuizState(prev => ({
                  ...prev,
                  totalQuestions: Number(e.target.value)
                }))}
                className="w-full p-4 bg-gray-700/80 rounded-xl border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 text-white"
              >
                <option value={5}>5 perguntas - Padawan</option>
                <option value={10}>10 perguntas - Cavaleiro Jedi</option>
                <option value={15}>15 perguntas - Mestre Jedi</option>
                <option value={20}>20 perguntas - Grande Mestre</option>
              </select>
            </div>

            {/* Botão de iniciar */}
            <button
              type="button"
              onClick={startGame}
              disabled={!quizState.players[0].name || !quizState.players[1].name}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-lg"
            >
              <Target className="w-6 h-6" />
              Iniciar Batalha do Conhecimento
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Footer decorativo */}
          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>Que a Força esteja com vocês! 🌟</p>
          </div>
        </div>
      </div>
    );
  }

  if (quizState.gamePhase === 'finished') {
    const winner = quizState.players[0].score > quizState.players[1].score ? 
      quizState.players[0] : 
      quizState.players[1].score > quizState.players[0].score ? 
      quizState.players[1] : 
      null;    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Estrelas de fundo */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={`final-star-${i}-${Math.random().toString(36)}`}
              className="absolute bg-white rounded-full opacity-50 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-4 max-w-6xl mx-auto">
          {/* Header de resultados */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-8">
              <Trophy className="w-24 h-24 mx-auto text-yellow-400 animate-bounce" />
              <div className="absolute -top-4 -right-4">
                <Sparkles className="w-12 h-12 text-yellow-300 animate-spin" />
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Resultado Final
            </h1>
            {winner ? (
              <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-lg p-8 rounded-3xl border border-yellow-500/30 mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Star className="w-10 h-10 text-yellow-400" />
                  <p className="text-4xl font-bold text-yellow-400">
                    {winner.name} é o Campeão!
                  </p>
                  <Star className="w-10 h-10 text-yellow-400" />
                </div>
                <p className="text-xl text-gray-300">
                  Que a Força esteja sempre com você! 🌟
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg p-8 rounded-3xl border border-blue-500/30 mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Star className="w-10 h-10 text-blue-400" />
                  <p className="text-4xl font-bold text-blue-400">
                    Empate Épico!
                  </p>
                  <Star className="w-10 h-10 text-blue-400" />
                </div>
                <p className="text-xl text-gray-300">
                  Ambos os Jedis demonstraram grande sabedoria! 🤝
                </p>
              </div>
            )}
          </div>

          {/* Resultados detalhados dos jogadores */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {quizState.players.map((player, index) => (
              <div 
                key={`player-result-${index}-${player.name}`} 
                className={`relative bg-gradient-to-br backdrop-blur-lg p-8 rounded-3xl border-2 shadow-2xl transform transition-all duration-500 hover:scale-105 ${
                  winner && winner.name === player.name
                    ? 'from-yellow-600/30 to-yellow-700/30 border-yellow-500 shadow-yellow-500/20'
                    : 'from-gray-800/90 to-gray-900/90 border-gray-600'
                }`}
              >
                {/* Badge de vencedor */}
                {winner && winner.name === player.name && (
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-full shadow-lg">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                )}

                {/* Header do jogador */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${
                      winner && winner.name === player.name
                        ? 'bg-yellow-500'
                        : 'bg-gray-600'
                    }`}>
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{player.name}</h2>
                      <p className="text-gray-400">
                        {winner && winner.name === player.name ? 'Vencedor' : 'Participante'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-4xl font-extrabold ${
                      winner && winner.name === player.name
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}>
                      {player.score}
                    </div>
                    <div className="text-gray-400 text-sm">
                      de {quizState.totalQuestions}
                    </div>
                  </div>
                </div>

                {/* Progresso do jogador */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Aproveitamento</span>
                    <span className="font-bold">
                      {Math.round((player.score / quizState.totalQuestions) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        winner && winner.name === player.name
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                          : 'bg-gradient-to-r from-blue-400 to-blue-500'
                      }`}
                      style={{ width: `${(player.score / quizState.totalQuestions) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Respostas detalhadas */}
                <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                  {quizState.questions.map((question, qIndex) => {
                    const playerAnswer = player.answers.find(a => a.questionId === question.id);
                    if (!playerAnswer) return null;
                    
                    return (
                      <div 
                        key={`answer-${question.id}-${qIndex}`} 
                        className={`p-4 rounded-2xl border ${
                          playerAnswer.correct 
                            ? 'bg-green-500/10 border-green-500/30' 
                            : 'bg-red-500/10 border-red-500/30'
                        }`}
                      >
                        <p className="font-medium mb-2 text-sm">
                          {qIndex + 1}. {question.question}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`text-lg ${playerAnswer.correct ? 'text-green-400' : 'text-red-400'}`}>
                            {playerAnswer.correct ? '✅' : '❌'}
                          </span>
                          <span className="text-sm">{playerAnswer.answer}</span>
                        </div>
                        {!playerAnswer.correct && (
                          <p className="text-green-400 text-xs mt-2 pl-6">
                            ✓ Resposta correta: {question.options[question.correctAnswer]}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Botão para jogar novamente */}
          <div className="text-center">
            <button
              type="button"
              onClick={resetGame}
              className="group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-4 mx-auto"
            >
              <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-xl">Nova Batalha do Conhecimento</span>
              <Sparkles className="w-6 h-6 animate-pulse" />
            </button>
            <p className="text-gray-400 mt-4 text-lg">
              Prepare-se para enfrentar novos desafios da galáxia!
            </p>
          </div>
        </div>
      </div>
    );
  }
  const currentQuestion = quizState.questions[quizState.currentQuestion];
  const currentPlayer = quizState.players[quizState.currentPlayer];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Estrelas de fundo */}
      <div className="absolute inset-0">
        {[...Array(75)].map((_, i) => (
          <div
            key={`game-star-${i}-${Math.random().toString(36)}`}
            className="absolute bg-white rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4 max-w-6xl mx-auto">
        {/* Header do jogo modernizado */}
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-lg p-6 rounded-3xl mb-8 border border-yellow-500/20 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            {/* Placar dos jogadores */}
            <div className="flex gap-6">
              {quizState.players.map((player, index) => (
                <div 
                  key={`player-header-${index}-${player.name}`} 
                  className={`relative p-4 rounded-2xl transition-all duration-500 transform ${
                    index === quizState.currentPlayer 
                      ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 scale-105 shadow-lg shadow-yellow-500/30' 
                      : 'bg-gray-700/80 hover:bg-gray-600/80'
                  }`}
                >
                  {index === quizState.currentPlayer && (
                    <div className="absolute -top-2 -right-2">
                      <Star className="w-6 h-6 text-yellow-300 animate-spin" />
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <User className="w-8 h-8" />
                    <div>
                      <p className="font-bold text-lg">{player.name}</p>
                      <p className="text-3xl font-extrabold">{player.score}</p>
                    </div>
                  </div>
                  {index === quizState.currentPlayer && (
                    <div className="mt-2 text-center text-sm font-medium">
                      Sua vez!
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Progresso da partida */}
            <div className="text-right bg-gray-800/50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-yellow-400" />
                <p className="text-lg font-semibold">
                  Pergunta {quizState.currentQuestion + 1} de {quizState.totalQuestions}
                </p>
              </div>
              <div className="w-64 bg-gray-700 rounded-full h-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-700 shadow-lg"
                  style={{ width: `${((quizState.currentQuestion + 1) / quizState.totalQuestions) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-300 mt-2">
                {Math.round(((quizState.currentQuestion + 1) / quizState.totalQuestions) * 100)}% concluído
              </p>
            </div>
          </div>
        </div>

        {/* Pergunta atual modernizada */}
        {currentQuestion && (
          <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-yellow-500/20">
            <div className="mb-8">
              {/* Indicador do jogador atual e dificuldade */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-2xl">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-400">
                      {currentPlayer.name}
                    </p>
                    <p className="text-gray-300">É sua vez de brilhar!</p>
                  </div>
                </div>
                
                <div className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${
                  currentQuestion.difficulty === 'easy' 
                    ? 'text-green-400 border-green-400 bg-green-400/10' :
                  currentQuestion.difficulty === 'medium' 
                    ? 'text-yellow-400 border-yellow-400 bg-yellow-400/10' : 
                    'text-red-400 border-red-400 bg-red-400/10'
                }`}>
                  {currentQuestion.difficulty === 'easy' ? '⭐ Fácil' : 
                   currentQuestion.difficulty === 'medium' ? '⭐⭐ Médio' : '⭐⭐⭐ Difícil'}
                </div>
              </div>

              {/* Pergunta */}
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-2xl border border-blue-500/20">
                <h2 className="text-3xl font-bold leading-relaxed text-center">
                  {currentQuestion.question}
                </h2>
              </div>
            </div>

            {/* Opções de resposta modernizadas */}
            <div className="grid gap-4 mb-10">
              {currentQuestion.options.map((option, index) => (
                <button
                  type="button"
                  key={`option-${index}-${option.substring(0, 20).replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedAnswer(index)}
                  className={`group relative p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                    selectedAnswer === index
                      ? 'border-yellow-400 bg-gradient-to-r from-yellow-600/30 to-yellow-500/30 shadow-lg shadow-yellow-500/20'
                      : 'border-gray-600 bg-gradient-to-r from-gray-700/50 to-gray-800/50 hover:border-gray-500 hover:bg-gradient-to-r hover:from-gray-600/50 hover:to-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      selectedAnswer === index
                        ? 'bg-yellow-500 text-white shadow-lg'
                        : 'bg-gray-600 text-gray-300 group-hover:bg-gray-500'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg font-medium flex-1">
                      {option}
                    </span>
                    {selectedAnswer === index && (
                      <div className="animate-pulse">
                        <ChevronRight className="w-6 h-6 text-yellow-300" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Botão de confirmação modernizado */}
            <div className="text-center">
              <button
                type="button"
                onClick={submitAnswer}
                disabled={selectedAnswer === null}
                className="group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center gap-3 mx-auto"
              >
                <Target className="w-6 h-6" />
                {selectedAnswer !== null ? 'Confirmar Resposta' : 'Selecione uma opção'}
                {selectedAnswer !== null && (
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
