# 🚀 Star Wars App

Aplicativo interativo sobre o universo Star Wars com informações dos personagens, planetas, naves e mais! Inclui um quiz para testar seus conhecimentos na galáxia muito, muito distante.

## ✨ Funcionalidades

- **Exploração de Dados Star Wars**: Pesquise personagens, planetas, naves, filmes e espécies do universo Star Wars
- **Quiz Interativo**: Teste seus conhecimentos em um quiz competitivo para 2 jogadores
- **Sistema de Ranking**: Acompanhe seu desempenho e compare com outros jogadores
- **Ranking Online com Supabase**: Salve resultados na nuvem e veja rankings globais

## 🛠️ Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase (para armazenamento online)

## 📋 Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Conta no Supabase (para o sistema de ranking online)

## 🔧 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/star-wars-app.git
   cd star-wars-app
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o Supabase:
   - Crie uma conta em [supabase.com](https://supabase.com/)
   - Acesse [Supabase](https://supabase.com) e crie uma conta
- Crie um novo projeto
- Configure as credenciais no arquivo `.env`:
   ```env
   VITE_SUPABASE_URL=https://yexmstntkspbvhipkvev.supabase.co
   VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlleG1zdG50a3NwYnZoaXBrdmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDk5MDksImV4cCI6MjA1MjUyNTkwOX0.9aQU3pfnl_G4dP8e8cF2BzEQCFNgDvKYuSSTl0KEgQ0
   ```
- Configure as tabelas no Supabase:
   - Acesse o SQL Editor no painel do Supabase
   - Execute o script SQL fornecido no arquivo `supabase-setup.sql`
   - Ou crie manualmente as tabelas:
     - `game_results`: id (UUID), date (timestamp), players (text[]), winner (text), total_questions (integer)
     - `player_stats`: name (text, primary key), total_games (integer), total_wins (integer), total_score (integer), win_rate (decimal)

4. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🔧 Configuração do Supabase

Para configurar rapidamente o banco de dados:

1. Acesse seu projeto no [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá para "SQL Editor"
3. Execute o conteúdo do arquivo `supabase-setup.sql`
4. Verifique se as tabelas foram criadas corretamente em "Table Editor"
   ```bash
   npm run dev
   ```
## 🚀 Deploy

Para fazer deploy no GitHub Pages:

1. Certifique-se de que o arquivo `package.json` tenha a propriedade `homepage` configurada com seu URL do GitHub Pages
2. Execute:
   ```bash
   npm run build
   npm run deploy
   ```

## 📖 Como Usar

1. Navegue entre as categorias usando as abas na parte superior
2. Para jogar o quiz, selecione a aba "Quiz" e siga as instruções na tela
3. Para ver o ranking local, selecione a aba "Ranking"
4. Para ver o ranking online, selecione a aba "Ranking Online"

## 🌟 Funcionalidades do Sistema de Ranking

### Ranking Local
- Armazena dados localmente usando localStorage
- Mostra estatísticas de jogadores, histórico de partidas e rankings

### Ranking Online (Supabase)
- Armazena dados na nuvem via Supabase
- Permite ranking global entre todos os jogadores
- Sincroniza automáticamente os resultados dos jogos

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

---

Que a Força esteja com você! 🌟
