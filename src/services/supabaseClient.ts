import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
// Primeiro tenta usar variáveis de ambiente, depois fallback para valores diretos (temporário para produção)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yexmstntkspbvhipkvev.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlleG1zdG50a3NwYnZoaXBrdmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDk5MDksImV4cCI6MjA1MjUyNTkwOX0.9aQU3pfnl_G4dP8e8cF2BzEQCFNgDvKYuSSTl0KEgQ0';

// Verificação de debug
console.log('🔧 Supabase Config:', {
  url: supabaseUrl ? '✅ URL configurada' : '❌ URL não encontrada',
  key: supabaseKey ? '✅ KEY configurada' : '❌ KEY não encontrada',
  isProduction: !import.meta.env.DEV
});

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ As variáveis de ambiente do Supabase não estão configuradas corretamente.');
  throw new Error('Supabase não configurado corretamente');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
