// Script para verificar estrutura atual das tabelas no Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yexmstntkspbvhipkvev.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlleG1zdG50a3NwYnZoaXBrdmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MzA3NjAsImV4cCI6MjA2NDEwNjc2MH0.9MVu_aCo1UTsPmEQvTyf4eGKHBBxo9c3URdC-lTo5PI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTableStructure() {
  try {
    console.log('🔍 Verificando estrutura das tabelas...');
    
    // Verificar se as tabelas existem tentando inserir dados vazios (vai dar erro mas mostra as colunas)
    console.log('\n📋 Estrutura esperada vs atual:');
    
    console.log('\n🎮 game_results - Estrutura esperada pelo código:');
    console.log('- id (string)');
    console.log('- date (string/timestamp)');
    console.log('- players (array de objetos com name, score, percentage)');
    console.log('- winner (string | null)');
    console.log('- totalQuestions (number)');
    console.log('- duration (number, opcional)');
    
    console.log('\n📊 player_stats - Estrutura esperada pelo código:');
    console.log('- name (string)');
    console.log('- totalGames (number)');
    console.log('- totalWins (number)');
    console.log('- totalScore (number)');
    console.log('- totalQuestions (number)');
    console.log('- averageScore (number)');
    console.log('- winRate (number)');
    console.log('- bestScore (number)');
    console.log('- lastPlayed (string/timestamp)');
    
    console.log('\n🧪 Testando inserção para descobrir estrutura atual...');
    
    // Tentar inserir em game_results para ver quais colunas existem
    const { error: gameError } = await supabase
      .from('game_results')
      .insert({});
    
    if (gameError) {
      console.log('📋 Colunas existentes em game_results baseado no erro:');
      console.log('   Erro:', gameError.message);
    }
    
    // Tentar inserir em player_stats para ver quais colunas existem
    const { error: statsError } = await supabase
      .from('player_stats')
      .insert({});
    
    if (statsError) {
      console.log('📋 Colunas existentes em player_stats baseado no erro:');
      console.log('   Erro:', statsError.message);
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar estrutura:', error);
  }
}

checkTableStructure();
