import { createClient } from '@supabase/supabase-js';

// É importante substituir estas variáveis pelos seus dados reais do Supabase
// Você pode encontrar essas informações no painel do Supabase > Configurações > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('As variáveis de ambiente do Supabase não estão configuradas corretamente.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
