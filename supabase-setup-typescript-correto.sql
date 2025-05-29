-- Script SQL CORRETO para criar as tabelas com a estrutura esperada pelo código TypeScript
-- Execute este script no SQL Editor do Supabase para corrigir a estrutura

-- PRIMEIRO: Dropar as tabelas existentes se houver problemas de estrutura
DROP TABLE IF EXISTS game_results CASCADE;
DROP TABLE IF EXISTS player_stats CASCADE;

-- Tabela game_results com estrutura CORRETA baseada no TypeScript
CREATE TABLE game_results (
    id TEXT PRIMARY KEY,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    players JSONB NOT NULL,  -- Array de objetos {name, score, percentage}
    winner TEXT,  -- Pode ser null em caso de empate
    "totalQuestions" INTEGER NOT NULL,  -- Entre aspas por causa do camelCase
    duration INTEGER  -- Opcional, duração em segundos
);

-- Tabela player_stats com estrutura CORRETA baseada no TypeScript
CREATE TABLE player_stats (
    name TEXT PRIMARY KEY,
    "totalGames" INTEGER NOT NULL DEFAULT 0,  -- Entre aspas por causa do camelCase
    "totalWins" INTEGER NOT NULL DEFAULT 0,
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "totalQuestions" INTEGER NOT NULL DEFAULT 0,
    "averageScore" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "winRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "bestScore" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "lastPlayed" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Índices para melhorar performance
CREATE INDEX idx_game_results_date ON game_results(date DESC);
CREATE INDEX idx_game_results_winner ON game_results(winner);
CREATE INDEX idx_player_stats_winrate ON player_stats("winRate" DESC);
CREATE INDEX idx_player_stats_totalgames ON player_stats("totalGames" DESC);

-- Habilitar Row Level Security
ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público (necessário para funcionar com a chave anon)
CREATE POLICY "public_read_game_results" ON game_results FOR SELECT USING (true);
CREATE POLICY "public_insert_game_results" ON game_results FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_game_results" ON game_results FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "public_delete_game_results" ON game_results FOR DELETE USING (true);

CREATE POLICY "public_read_player_stats" ON player_stats FOR SELECT USING (true);
CREATE POLICY "public_insert_player_stats" ON player_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_player_stats" ON player_stats FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "public_delete_player_stats" ON player_stats FOR DELETE USING (true);

-- Comentários para documentação
COMMENT ON TABLE game_results IS 'Resultados dos jogos do quiz Star Wars';
COMMENT ON TABLE player_stats IS 'Estatísticas dos jogadores';
COMMENT ON COLUMN game_results.players IS 'Array JSON com dados dos jogadores: [{name, score, percentage}]';
COMMENT ON COLUMN game_results.winner IS 'Nome do vencedor ou null se empate';
COMMENT ON COLUMN game_results."totalQuestions" IS 'Número total de perguntas do quiz';
COMMENT ON COLUMN player_stats."winRate" IS 'Taxa de vitórias em porcentagem (0-100)';

-- Verificar se as tabelas foram criadas corretamente
SELECT 'game_results criada:' as status, COUNT(*) as registros FROM game_results;
SELECT 'player_stats criada:' as status, COUNT(*) as registros FROM player_stats;
