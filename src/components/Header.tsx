import { Star, Github, ExternalLink, Zap, Sword, Sparkles, Shield, Rocket } from 'lucide-react';

export function Header() {
  return (
    <>
      {/* Campo de estrelas animado ultra denso */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(200)].map((_, i) => (
          <div
            key={`star-${Math.random().toString(36).substr(2, 9)}-${i}`}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1.5 + Math.random() * 3}s`,
              transform: `scale(${0.5 + Math.random() * 1.5})`,
            }}
          />
        ))}
      </div>      {/* Meteoros passando ocasionalmente */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={`meteor-${i}-${Math.random().toString(36).substr(2, 9)}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.8)]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animation: `meteor ${8 + Math.random() * 4}s linear infinite`,
              animationDelay: `${i * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Nebulosas épicas múltiplas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-blue-500/15 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-radial from-purple-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-radial from-yellow-400/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-cyan-400/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <header className="relative z-10 bg-gradient-to-b from-black via-slate-900/98 to-black border-b-4 border-yellow-400 shadow-2xl overflow-hidden">
        {/* Padrão holográfico de fundo mais complexo */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(34,211,238,0.08)_25%,rgba(34,211,238,0.08)_50%,transparent_50%,transparent_75%,rgba(34,211,238,0.08)_75%)] bg-[length:15px_15px] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_25%,rgba(251,191,36,0.05)_25%,rgba(251,191,36,0.05)_50%,transparent_50%,transparent_75%,rgba(251,191,36,0.05)_75%)] bg-[length:20px_20px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Múltiplos efeitos de varredura holográfica */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/12 to-transparent scanning-light-slow" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-yellow-400/8 to-transparent scanning-light-slow" style={{ animationDelay: '2s', animationDuration: '8s' }} />        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
          <div className="text-center mb-4">
            {/* Logo épico central compacto */}
            <div className="relative inline-block mb-3">
              <div className="relative">
                {/* Anéis de energia girando mais compactos */}
                <div className="absolute inset-0 w-24 h-24 border-2 border-yellow-400/40 rounded-full animate-spin" style={{ animationDuration: '12s' }} />
                <div className="absolute inset-1 w-22 h-22 border border-cyan-400/40 rounded-full animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
                <div className="absolute inset-2 w-20 h-20 border border-purple-400/30 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
                
                {/* Logo central com efeito de Estrela da Morte compacto */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full p-6 death-star-glow shadow-2xl border-2 border-yellow-300/50">
                  <Star className="w-full h-full text-black fill-current death-star-loading drop-shadow-xl" />
                  {/* Superlaser da Estrela da Morte compacto */}
                  <div className="absolute top-5 right-5 w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.9)]" />
                  <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full animate-ping" />
                  
                  {/* Detalhes adicionais da Estrela da Morte */}
                  <div className="absolute top-8 left-5 w-1 h-1 bg-slate-600 rounded-full" />
                  <div className="absolute bottom-8 right-8 w-1 h-1 bg-slate-600 rounded-full" />
                  <div className="absolute bottom-5 left-8 w-1 h-1 bg-slate-600 rounded-full" />
                </div>                {/* Partículas de energia flutuando compactas */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`energy-particle-${i}-${Math.random().toString(36).substr(2, 9)}`}
                    className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full animate-ping shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-3rem)`,
                      animationDelay: `${i * 0.25}s`,
                      animationDuration: `${2 + (i % 3)}s`,
                    }}
                  />
                ))}

                {/* Órbitas planetárias compactas */}
                {[...Array(2)].map((_, i) => (
                  <div
                    key={`orbit-${i}-${Math.random().toString(36).substr(2, 9)}`}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 180}deg) translateY(-${4 + i}rem)`,
                      animation: `orbit ${4 + i * 2}s linear infinite`,
                    }}
                  />
                ))}
              </div>
            </div>            {/* Título épico compacto */}
            <div className="slide-in-from-space">
              <h1 className="text-3xl md:text-4xl font-bold star-wars-font mb-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl tracking-wider transform hover:scale-105 transition-transform duration-500">
                STAR WARS
              </h1>
              <div className="text-xl md:text-2xl font-bold text-cyan-300 mb-3 holographic-text tracking-widest transform hover:text-yellow-300 transition-colors duration-300">
                GALACTIC DATABASE
              </div>
            </div>            {/* Subtítulo épico compacto */}
            <div className="max-w-2xl mx-auto mb-4 fade-in-up">
              <p className="text-sm md:text-base text-yellow-300 font-orbitron mb-2 tracking-wide leading-relaxed animate-pulse">
                "Há muito tempo, numa galáxia muito, muito distante..."
              </p>
              <p className="text-xs md:text-sm text-cyan-200 font-mono tracking-wider mb-2">
                Explore os mistérios do universo Star Wars através da Force
              </p>
              <div className="flex items-center justify-center space-x-3 text-yellow-400">
                <Rocket className="h-4 w-4 animate-bounce" />
                <span className="text-xs font-bold tracking-widest">QUE A FORÇA ESTEJA COM VOCÊ</span>
                <Rocket className="h-4 w-4 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>            {/* Estatísticas em formato holográfico compactas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 max-w-3xl mx-auto">
              <div className="bg-slate-800/60 border border-yellow-400/40 rounded-lg p-3 backdrop-blur-sm hover:border-yellow-400/80 hover:bg-slate-800/80 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <Sparkles className="h-5 w-5 text-yellow-400 mx-auto mb-1 animate-pulse" />
                <div className="text-lg font-bold text-yellow-300 mb-1 font-orbitron">87</div>
                <div className="text-xs text-cyan-300 tracking-wider">PERSONAGENS</div>
                <div className="mt-1 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded" />
              </div>
              <div className="bg-slate-800/60 border border-cyan-400/40 rounded-lg p-3 backdrop-blur-sm hover:border-cyan-400/80 hover:bg-slate-800/80 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <Shield className="h-5 w-5 text-cyan-400 mx-auto mb-1 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="text-lg font-bold text-cyan-300 mb-1 font-orbitron">60</div>
                <div className="text-xs text-yellow-300 tracking-wider">PLANETAS</div>
                <div className="mt-1 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded" />
              </div>
              <div className="bg-slate-800/60 border border-yellow-400/40 rounded-lg p-3 backdrop-blur-sm hover:border-yellow-400/80 hover:bg-slate-800/80 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <Sword className="h-5 w-5 text-yellow-400 mx-auto mb-1 animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="text-lg font-bold text-yellow-300 mb-1 font-orbitron">36</div>
                <div className="text-xs text-cyan-300 tracking-wider">NAVES</div>
                <div className="mt-1 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded" />
              </div>
              <div className="bg-slate-800/60 border border-cyan-400/40 rounded-lg p-3 backdrop-blur-sm hover:border-cyan-400/80 hover:bg-slate-800/80 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <Zap className="h-5 w-5 text-cyan-400 mx-auto mb-1 animate-pulse" style={{ animationDelay: '1.5s' }} />
                <div className="text-lg font-bold text-cyan-300 mb-1 font-orbitron">6</div>
                <div className="text-xs text-yellow-300 tracking-wider">FILMES</div>
                <div className="mt-1 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded" />
              </div>
            </div>            {/* Botões de ação épicos compactos */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 slide-in-right">
              <a
                href="https://swapi.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white font-bold text-xs rounded-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] tracking-wider border border-cyan-400/30 hover:border-cyan-400/80"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <ExternalLink className="h-4 w-4 mr-2 relative z-10 animate-pulse" />
                <span className="relative z-10 font-orbitron">SWAPI DOCS</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              
              <a
                href="https://github.com/DronReef2/star-wars-app"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 text-black font-bold text-xs rounded-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] tracking-wider border border-yellow-400/30 hover:border-yellow-400/80"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-yellow-300/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Github className="h-4 w-4 mr-2 relative z-10 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <span className="relative z-10 font-orbitron">GITHUB REPO</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
          </div>          {/* Linha decorativa épica compacta */}
          <div className="relative mb-2">
            <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full" />
            <div className="absolute inset-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-60 rounded-full" />
            <div className="absolute inset-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse opacity-40 rounded-full" style={{ animationDelay: '1s' }} />
          </div>

          {/* Mensagem adicional épica compacta */}
          <div className="text-center">
            <p className="text-sm text-cyan-300 font-mono tracking-wider opacity-80 animate-pulse">
              [ SISTEMA IMPERIAL CONECTADO - ACESSO AUTORIZADO ]
            </p>
          </div>
        </div>        {/* Efeito de borda inferior compacto */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-cyan-400 via-yellow-400 via-cyan-400 to-yellow-400 lightsaber-glow animate-pulse" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-yellow-400 to-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </header>
    </>
  );
}
