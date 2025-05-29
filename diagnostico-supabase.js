// Script avançado de diagnóstico do Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yexmstntkspbvhipkvev.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlleG1zdG50a3NwYnZoaXBrdmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MzA3NjAsImV4cCI6MjA2NDEwNjc2MH0.9MVu_aCo1UTsPmEQvTyf4eGKHBBxo9c3URdC-lTo5PI';

console.log('🔍 DIAGNÓSTICO COMPLETO DO SUPABASE');
console.log('=====================================');
console.log(`📍 URL: ${supabaseUrl}`);
console.log(`🔑 Key: ${supabaseKey.substring(0, 30)}...`);
console.log('');

// Decodificar JWT para verificar expiração
function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

// Verificar token
console.log('🔍 ANÁLISE DO TOKEN JWT:');
const tokenData = decodeJWT(supabaseKey);
if (tokenData) {
  console.log(`   📅 Emitido em: ${new Date(tokenData.iat * 1000).toLocaleString()}`);
  console.log(`   ⏰ Expira em: ${new Date(tokenData.exp * 1000).toLocaleString()}`);
  console.log(`   🏢 Projeto: ${tokenData.ref}`);
  console.log(`   👤 Role: ${tokenData.role}`);
  
  const now = Date.now() / 1000;
  const isExpired = tokenData.exp < now;
  console.log(`   ✅ Status: ${isExpired ? '❌ EXPIRADO' : '✅ VÁLIDO'}`);
  
  if (isExpired) {
    console.log(`   ⚠️  Token expirou há ${Math.round((now - tokenData.exp) / 86400)} dias`);
  } else {
    console.log(`   ⏳ Token expira em ${Math.round((tokenData.exp - now) / 86400)} dias`);
  }
} else {
  console.log('   ❌ Não foi possível decodificar o token');
}
console.log('');

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnosticoCompleto() {
  console.log('🌐 TESTE DE CONECTIVIDADE:');
  
  // Teste 1: Ping básico
  try {
    const response = await fetch(supabaseUrl);
    console.log(`   ✅ Servidor acessível (${response.status})`);
  } catch (error) {
    console.log(`   ❌ Servidor inacessível: ${error.message}`);
    return;
  }

  // Teste 2: Endpoint da API
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    console.log(`   ✅ API REST acessível (${response.status})`);
    
    if (response.status === 401) {
      console.log('   ⚠️  Erro 401: Chave API inválida ou expirada');
    }
  } catch (error) {
    console.log(`   ❌ API REST inacessível: ${error.message}`);
  }

  console.log('');
  console.log('📋 TESTE DE TABELAS:');

  // Teste 3: Listar tabelas
  try {
    const { data, error } = await supabase.rpc('version');
    if (error) {
      console.log(`   ❌ Erro ao conectar: ${error.message}`);
      console.log(`   📄 Detalhes: ${JSON.stringify(error, null, 2)}`);
    } else {
      console.log(`   ✅ Conexão estabelecida`);
    }
  } catch (error) {
    console.log(`   ❌ Erro geral: ${error.message}`);
  }

  // Teste 4: Verificar tabelas específicas
  const tabelas = ['game_results', 'player_stats'];
  
  for (const tabela of tabelas) {
    try {
      console.log(`\n   🔍 Testando tabela: ${tabela}`);
      
      const { data, error, status, statusText } = await supabase
        .from(tabela)
        .select('*')
        .limit(1);
      
      if (error) {
        console.log(`   ❌ Erro: ${error.message}`);
        console.log(`   📊 Status HTTP: ${status}`);
        console.log(`   📝 Status Text: ${statusText}`);
        if (error.details) {
          console.log(`   🔍 Detalhes: ${error.details}`);
        }
        if (error.hint) {
          console.log(`   💡 Dica: ${error.hint}`);
        }
      } else {
        console.log(`   ✅ Tabela acessível (${data.length} registros)`);
      }
    } catch (error) {
      console.log(`   ❌ Erro na tabela ${tabela}: ${error.message}`);
    }
  }

  console.log('');
  console.log('🔧 PRÓXIMOS PASSOS:');
  
  if (tokenData && tokenData.exp < Date.now() / 1000) {
    console.log('   1. ⚠️  TOKEN EXPIRADO - Regenere a chave API no painel Supabase');
    console.log('   2. 🔄 Acesse: https://app.supabase.com/project/yexmstntkspbvhipkvev/settings/api');
    console.log('   3. 📋 Copie a nova chave "anon public"');
    console.log('   4. 📝 Atualize o arquivo .env');
  } else {
    console.log('   1. 🔍 Verifique se o projeto está ativo no painel Supabase');
    console.log('   2. 🔒 Verifique as políticas RLS das tabelas');
    console.log('   3. 💰 Verifique se não excedeu a cota gratuita');
    console.log('   4. 🔄 Tente regenerar a chave API mesmo assim');
  }
}

diagnosticoCompleto().catch(console.error);
