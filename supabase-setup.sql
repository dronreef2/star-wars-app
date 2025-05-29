-- SQL para configurar as tabelas no Supabase
-- Execute este script no SQL Editor do Supabase

-- Tabela para armazenar resultados dos jogos
CREATE TABLE IF NOT EXISTS game_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    players TEXT[] NOT NULL,
    winner TEXT NOT NULL,
    total_questions INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela para armazenar estatísticas dos jogadores
CREATE TABLE IF NOT EXISTS player_stats (
    name TEXT PRIMARY KEY,
    total_games INTEGER DEFAULT 0,
    total_wins INTEGER DEFAULT 0,
    total_score INTEGER DEFAULT 0,
    win_rate DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_game_results_date ON game_results(date DESC);
CREATE INDEX IF NOT EXISTS idx_game_results_winner ON game_results(winner);
CREATE INDEX IF NOT EXISTS idx_player_stats_total_wins ON player_stats(total_wins DESC);
CREATE INDEX IF NOT EXISTS idx_player_stats_win_rate ON player_stats(win_rate DESC);

-- Função para atualizar o timestamp updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at na tabela player_stats
CREATE TRIGGER update_player_stats_updated_at 
    BEFORE UPDATE ON player_stats 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS) para segurança
ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (permite leitura e escrita para todos os usuários anônimos)
-- Nota: Em produção, você pode querer políticas mais restritivas

-- Remover políticas existentes se houver
DROP POLICY IF EXISTS "Permitir leitura de game_results para todos" ON game_results;
DROP POLICY IF EXISTS "Permitir inserção de game_results para todos" ON game_results;
DROP POLICY IF EXISTS "Permitir leitura de player_stats para todos" ON player_stats;
DROP POLICY IF EXISTS "Permitir inserção de player_stats para todos" ON player_stats;
DROP POLICY IF EXISTS "Permitir atualização de player_stats para todos" ON player_stats;

-- Criar novas políticas
CREATE POLICY "Permitir leitura de game_results para todos" 
    ON game_results FOR SELECT 
    USING (true);

CREATE POLICY "Permitir inserção de game_results para todos" 
    ON game_results FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Permitir leitura de player_stats para todos" 
    ON player_stats FOR SELECT 
    USING (true);

CREATE POLICY "Permitir inserção de player_stats para todos" 
    ON player_stats FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Permitir atualização de player_stats para todos" 
    ON player_stats FOR UPDATE 
    USING (true)
    WITH CHECK (true);

-- Comentários para documentação
COMMENT ON TABLE game_results IS 'Armazena os resultados de cada jogo do quiz Star Wars';
COMMENT ON TABLE player_stats IS 'Armazena estatísticas agregadas dos jogadores';
COMMENT ON COLUMN game_results.players IS 'Array com os nomes dos jogadores participantes';
COMMENT ON COLUMN game_results.winner IS 'Nome do jogador vencedor';
COMMENT ON COLUMN game_results.total_questions IS 'Número total de perguntas do quiz';
COMMENT ON COLUMN player_stats.win_rate IS 'Taxa de vitórias em porcentagem (0-100)';
