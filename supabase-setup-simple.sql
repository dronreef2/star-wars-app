-- SQL SIMPLIFICADO para configurar as tabelas no Supabase
-- Execute este script no SQL Editor do Supabase

-- Tabela para armazenar resultados dos jogos
CREATE TABLE game_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    players TEXT[],
    winner TEXT,
    total_questions INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para armazenar estatísticas dos jogadores
CREATE TABLE player_stats (
    name TEXT PRIMARY KEY,
    total_games INTEGER DEFAULT 0,
    total_wins INTEGER DEFAULT 0,
    total_score INTEGER DEFAULT 0,
    win_rate DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público
CREATE POLICY "public_read_game_results" ON game_results FOR SELECT USING (true);
CREATE POLICY "public_insert_game_results" ON game_results FOR INSERT WITH CHECK (true);
CREATE POLICY "public_read_player_stats" ON player_stats FOR SELECT USING (true);
CREATE POLICY "public_insert_player_stats" ON player_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_player_stats" ON player_stats FOR UPDATE USING (true) WITH CHECK (true);
