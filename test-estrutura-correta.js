// Script de teste CORRETO para verificar conexão com Supabase
import { createClient } from '@supabase/supabase-js';

// Carregar variáveis de ambiente
const supabaseUrl = 'https://yexmstntkspbvhipkvev.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlleG1zdG50a3NwYnZoaXBrdmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MzA3NjAsImV4cCI6MjA2NDEwNjc2MH0.9MVu_aCo1UTsPmEQvTyf4eGKHBBxo9c3URdC-lTo5PI';

console.log('🧪 Testando conexão com Supabase - ESTRUTURA CORRETA...');
console.log('URL:', supabaseUrl);
console.log('Key (primeiros 20 chars):', supabaseKey.substring(0, 20) + '...');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n📊 Testando leitura das tabelas...');
    
    // Testar se consegue acessar as tabelas
    const { data: gameResults, error: gameError } = await supabase
      .from('game_results')
      .select('*')
      .limit(1);
    
    if (gameError) {
      console.error('❌ Erro ao acessar game_results:', gameError.message);
      console.error('   Código:', gameError.code);
      console.error('   Detalhes:', gameError.details);
    } else {
      console.log('✅ Tabela game_results acessível!');
      console.log('   Registros encontrados:', gameResults.length);
    }

    const { data: playerStats, error: statsError } = await supabase
      .from('player_stats')
      .select('*')
      .limit(1);
    
    if (statsError) {
      console.error('❌ Erro ao acessar player_stats:', statsError.message);
      console.error('   Código:', statsError.code);
      console.error('   Detalhes:', statsError.details);
    } else {
      console.log('✅ Tabela player_stats acessível!');
      console.log('   Registros encontrados:', playerStats.length);
    }

    // Testar inserção com estrutura CORRETA baseada no TypeScript
    console.log('\n📝 Testando inserção com estrutura correta...');
    
    const gameResult = {
      id: `test-${Date.now()}`,
      date: new Date().toISOString(),
      players: [
        { name: 'Teste Player 1', score: 8, percentage: 80 },
        { name: 'Teste Player 2', score: 6, percentage: 60 }
      ],
      winner: 'Teste Player 1',
      totalQuestions: 10
    };

    const { data: insertGameData, error: insertGameError } = await supabase
      .from('game_results')
      .insert(gameResult)
      .select();

    if (insertGameError) {
      console.error('❌ Erro ao inserir game_result:', insertGameError.message);
      console.error('   Código:', insertGameError.code);
      console.error('   Detalhes:', insertGameError.details);
    } else {
      console.log('✅ Inserção de game_result bem-sucedida!');
      console.log('   Dados inseridos:', insertGameData);
      
      // Testar inserção de player_stats
      console.log('\n📝 Testando inserção de player_stats...');
      
      const playerStat = {
        name: 'Teste Player 1',
        totalGames: 1,
        totalWins: 1,
        totalScore: 8,
        totalQuestions: 10,
        averageScore: 8,
        winRate: 100,
        bestScore: 80,
        lastPlayed: new Date().toISOString()
      };

      const { data: insertStatsData, error: insertStatsError } = await supabase
        .from('player_stats')
        .insert(playerStat)
        .select();

      if (insertStatsError) {
        console.error('❌ Erro ao inserir player_stats:', insertStatsError.message);
        console.error('   Código:', insertStatsError.code);
        console.error('   Detalhes:', insertStatsError.details);
      } else {
        console.log('✅ Inserção de player_stats bem-sucedida!');
        console.log('   Dados inseridos:', insertStatsData);
      }
    }

  } catch (error) {
    console.error('❌ Erro geral:', error.message);
    console.error('   Stack:', error.stack);
  }
}

testConnection();
