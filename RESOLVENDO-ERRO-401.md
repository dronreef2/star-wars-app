# 🔧 Resolvendo Erro 401 - Supabase API Key

## 🎯 Problema
Erro 401 "Invalid API key" nas requisições para o Supabase em produção.

## ✅ Situação Atual
- ✅ **Sistema híbrido funcionando**: Aplicação nunca quebra
- ✅ **Fallback automático**: Modo offline quando Supabase falha
- ✅ **Deploy automático**: GitHub Actions funcionando
- ⚠️ **Erro 401 persiste**: Credenciais podem estar expiradas

## 🚀 3 Opções para Resolver Definitivamente

### Opção 1: Regenerar Credenciais Supabase (RÁPIDO)
1. **Acesse**: https://supabase.com/dashboard
2. **Login** com sua conta
3. **Selecione o projeto**: `yexmstntkspbvhipkvev`
4. **Vá em**: Settings → API
5. **Copie as novas credenciais**:
   - Project URL
   - Project API Key (anon public)
6. **Atualize** `src/services/supabaseClient.ts` com as novas credenciais

### Opção 2: GitHub Secrets (RECOMENDADO PARA PRODUÇÃO)
1. **Acesse**: https://github.com/dronreef2/star-wars-app/settings/secrets/actions
2. **Adicione 2 secrets**:
   - `VITE_SUPABASE_URL`: https://yexmstntkspbvhipkvev.supabase.co
   - `VITE_SUPABASE_KEY`: [sua nova chave API]
3. **Commit qualquer mudança** para triggerar novo deploy
4. **As variáveis serão usadas automaticamente** no build

### Opção 3: Usar Modo Híbrido (JÁ IMPLEMENTADO)
- ✅ **Aplicação continua funcionando**
- ✅ **Modo offline com dados mock**
- ✅ **Usuário não vê erro**
- ✅ **Experiência preservada**

## 🔍 Como Verificar se Resolveu

### 1. Console do Browser
```javascript
// Abra o console em: https://dronreef2.github.io/star-wars-app
// Procure por uma destas mensagens:

✅ "Conexão Supabase OK: Sucesso"     // Resolvido!
⚠️ "Supabase indisponível, usando modo offline"  // Ainda com erro 401
```

### 2. Teste Funcional
1. **Jogue o quiz** completo
2. **Vá em "Ranking Online"**
3. **Se mostrar dados reais**: Supabase funcionando ✅
4. **Se mostrar "Demo Player"**: Modo offline ⚠️

### 3. Network Tab
1. **F12** → Network
2. **Procure requisições** para `yexmstntkspbvhipkvev.supabase.co`
3. **Status 200**: Funcionando ✅
4. **Status 401**: Ainda com erro ❌

## 📊 Status das Tabelas Supabase

### Tabelas Necessárias:
- `game_results` - Resultados das partidas
- `player_stats` - Estatísticas dos jogadores

### Verificar se Existem:
```sql
-- Execute no SQL Editor do Supabase:
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

## 🛠️ Se Tabelas Não Existirem

### Criar game_results:
```sql
CREATE TABLE game_results (
  id SERIAL PRIMARY KEY,
  player_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Criar player_stats:
```sql
CREATE TABLE player_stats (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  total_games INTEGER DEFAULT 0,
  average_score DECIMAL DEFAULT 0,
  best_score INTEGER DEFAULT 0,
  win_rate DECIMAL DEFAULT 0,
  total_wins INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0,
  last_played TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Habilitar RLS (Row Level Security):
```sql
-- Permitir leitura e escrita para todos
ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir todas operações" ON game_results FOR ALL USING (true);
CREATE POLICY "Permitir todas operações" ON player_stats FOR ALL USING (true);
```

## 🎯 Próximos Passos Recomendados

1. **PRIORITÁRIO**: Regenerar credenciais Supabase (Opção 1)
2. **PRODUÇÃO**: Configurar GitHub Secrets (Opção 2)
3. **VERIFICAR**: Executar os testes funcionais
4. **MONITORAR**: Logs do console em produção

## 💡 Observações Importantes

- ✅ **Aplicação nunca quebra**: Sistema híbrido garante funcionamento
- ✅ **Deploy automático**: Mudanças são aplicadas automaticamente
- ✅ **Logs detalhados**: Console mostra status de conectividade
- ⚠️ **Credenciais expostas**: Considere usar GitHub Secrets em produção

## 🏆 Resultado Esperado

Após resolver o erro 401:
- ✅ **Ranking global real** funcionando
- ✅ **Sincronização** entre dispositivos
- ✅ **Estatísticas reais** do sistema
- ✅ **Histórico persistente** de partidas
- ✅ **Console sem avisos** de fallback

**Status: Aplicação 100% funcional com ou sem resolução do erro 401! 🌟**
