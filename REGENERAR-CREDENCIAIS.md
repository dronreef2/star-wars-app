# 🔑 Regenerar Credenciais do Supabase

## 🚨 Problema Identificado

O erro **"Invalid API key"** indica que a chave atual do Supabase pode ter expirado ou não está funcionando corretamente.

## 🔧 Solução: Regenerar Credenciais

### Passo 1: Acessar o Painel do Supabase
1. Acesse: https://supabase.com/dashboard
2. Faça login na sua conta
3. Selecione o projeto: **Star Wars App**

### Passo 2: Obter Novas Credenciais
1. Vá para **Settings** > **API**
2. Copie as seguintes informações:
   - **Project URL**: `https://[seu-projeto].supabase.co`
   - **Anon/Public Key**: `eyJ...` (chave longa)

### Passo 3: Atualizar o Código
Substitua as credenciais no arquivo `src/services/supabaseClient.ts`:

```typescript
const supabaseUrl = 'https://[NOVA-URL].supabase.co';
const supabaseKey = '[NOVA-CHAVE-AQUI]';
```

### Passo 4: Verificar RLS (Row Level Security)
1. No Supabase, vá para **Authentication** > **Policies**
2. Verifique se as tabelas `game_results` e `player_stats` têm políticas que permitem acesso público para SELECT

### Passo 5: Testar as Políticas SQL
Execute no SQL Editor do Supabase:

```sql
-- Verificar se consegue acessar as tabelas
SELECT COUNT(*) FROM game_results;
SELECT COUNT(*) FROM player_stats;

-- Se der erro, execute estas políticas:
DROP POLICY IF EXISTS "Allow public read access" ON game_results;
DROP POLICY IF EXISTS "Allow public write access" ON game_results;
DROP POLICY IF EXISTS "Allow public read access" ON player_stats;
DROP POLICY IF EXISTS "Allow public write access" ON player_stats;

CREATE POLICY "Allow public access" ON game_results FOR ALL USING (true);
CREATE POLICY "Allow public access" ON player_stats FOR ALL USING (true);
```

## 🎯 Alternativa Rápida: Desabilitar RLS Temporariamente

Se quiser uma solução mais rápida, pode desabilitar o RLS temporariamente:

1. No Supabase, vá para **Table Editor**
2. Selecione a tabela `game_results`
3. Clique no ícone de configurações
4. Desabilite "Enable Row Level Security (RLS)"
5. Repita para `player_stats`

## 📱 Teste Local
Após fazer as mudanças:
```bash
npm run build
git add .
git commit -m "🔑 Atualiza credenciais Supabase"
git push origin main
```

A aplicação em https://dronreef2.github.io/star-wars-app deve funcionar em alguns minutos.
