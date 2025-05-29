// Script de teste para verificar conexão com Supabase
import { createClient } from '@supabase/supabase-js';

// Carregar variáveis de ambiente
const supabaseUrl = 'https://yexmstntkspbvhipkvev.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlleG1zdG50a3NwYnZoaXBrdmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MzA3NjAsImV4cCI6MjA2NDEwNjc2MH0.9MVu_aCo1UTsPmEQvTyf4eGKHBBxo9c3URdC-lTo5PI';

console.log('🧪 Testando conexão com Supabase...');
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

    // Testar inserção
    console.log('\n📝 Testando inserção...');
    const { data: insertData, error: insertError } = await supabase
      .from('game_results')
      .insert({
        player_name: 'Teste API',
        score: 100,
        total_questions: 10,
        correct_answers: 10,
        game_duration: 60,
        difficulty: 'easy'
      })
      .select();

    if (insertError) {
      console.error('❌ Erro ao inserir dados:', insertError.message);
      console.error('   Código:', insertError.code);
      console.error('   Detalhes:', insertError.details);
    } else {
      console.log('✅ Inserção bem-sucedida!');
      console.log('   Dados inseridos:', insertData);
    }

  } catch (error) {
    console.error('❌ Erro geral:', error.message);
    console.error('   Stack:', error.stack);
  }
}

testConnection();
