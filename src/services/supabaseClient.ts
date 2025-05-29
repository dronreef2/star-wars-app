import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
// NOTA: Estas são credenciais temporárias para resolver o erro 401 no GitHub Pages
// Em produção, use GitHub Secrets conforme documentado em CONFIGURAR-SECRETS.md
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yexmstntkspbvhipkvev.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlleG1zdG50a3NwYnZoaXBrdmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDk5MDksImV4cCI6MjA1MjUyNTkwOX0.9aQU3pfnl_G4dP8e8cF2BzEQCFNgDvKYuSSTl0KEgQ0';

// Verificação de debug detalhada
console.log('🔧 Supabase Debug Info:', {
  url: supabaseUrl,
  keyPrefix: supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'não encontrada',
  isProduction: !import.meta.env.DEV,
  envVars: {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'definida' : 'não definida',
    VITE_SUPABASE_KEY: import.meta.env.VITE_SUPABASE_KEY ? 'definida' : 'não definida'
  }
});

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Credenciais do Supabase não configuradas');
  throw new Error('Supabase não configurado corretamente');
}

// Criar cliente Supabase com configurações adicionais
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false // Desabilitar persistência de sessão para evitar problemas
  }
});

// Teste de conectividade
supabase.from('game_results').select('count').limit(1).then(
  (result) => {
    console.log('✅ Conexão Supabase OK:', result.status === 200 ? 'Sucesso' : 'Erro');
    if (result.error) {
      console.error('❌ Erro de conexão Supabase:', result.error.message);
    }
  }
);
