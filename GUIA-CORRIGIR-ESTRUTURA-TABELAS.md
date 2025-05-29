# 🔧 GUIA: Como Corrigir a Estrutura das Tabelas no Supabase

## 🎯 Problema Identificado
A estrutura das tabelas no Supabase não corresponde à estrutura esperada pelo código TypeScript do projeto.

## 📋 Estrutura Atual vs Esperada

### ❌ Estrutura Atual (Incorreta)
```sql
-- Baseada no script antigo
game_results: id, date, players[], winner, total_questions
player_stats: name, total_games, total_wins, total_score, win_rate, etc.
```

### ✅ Estrutura Necessária (Correta)
```sql
-- Baseada no código TypeScript
game_results: id, date, players, winner, totalQuestions, duration
player_stats: name, totalGames, totalWins, totalScore, totalQuestions, averageScore, winRate, bestScore, lastPlayed
```

## 🚀 Passos para Corrigir

### 1. Acessar o Supabase Dashboard
1. Vá para https://supabase.com/dashboard
2. Faça login na sua conta
3. Selecione o projeto: `yexmstntkspbvhipkvev`

### 2. Abrir o SQL Editor
1. No menu lateral, clique em **"SQL Editor"**
2. Clique em **"New query"**

### 3. Executar o Script de Correção
1. **Copie TODO o conteúdo** do arquivo: `supabase-setup-typescript-correto.sql`
2. **Cole no SQL Editor**
3. Clique em **"Run"** (botão azul)

### 4. Verificar o Resultado
Você deve ver mensagens como:
```
game_results criada: 0 registros
player_stats criada: 0 registros
```

## 🧪 Teste Após Correção

Execute no terminal do projeto:
```bash
node test-estrutura-correta.js
```

**Resultado esperado:**
```
✅ Tabela game_results acessível!
✅ Tabela player_stats acessível!
✅ Inserção de game_result bem-sucedida!
✅ Inserção de player_stats bem-sucedida!
```

## 🔍 Principais Diferenças Corrigidas

### game_results
- ❌ `total_questions` → ✅ `totalQuestions` (camelCase)
- ❌ `players[]` simples → ✅ `players JSONB` (objetos complexos)

### player_stats
- ❌ `total_games` → ✅ `totalGames` (camelCase)
- ❌ `total_wins` → ✅ `totalWins` (camelCase)
- ❌ `total_score` → ✅ `totalScore` (camelCase)
- ➕ Adicionado: `totalQuestions`, `averageScore`, `bestScore`, `lastPlayed`

## 🎯 Após a Correção

1. **Erro 401**: ✅ RESOLVIDO (nova chave API)
2. **Estrutura**: ✅ RESOLVIDO (com este script)
3. **Inserção de dados**: ✅ Funcionará perfeitamente
4. **Ranking online**: ✅ Totalmente funcional

## ⚠️ Importante

Este script:
- **Apaga as tabelas existentes** (se houver dados, serão perdidos)
- **Recria com estrutura correta**
- **Mantém as políticas de segurança RLS**
- **É seguro executar múltiplas vezes**

## 🏁 Status Final Esperado

Após executar este script:
- ✅ Conexão com Supabase: OK
- ✅ Estrutura das tabelas: OK
- ✅ Inserção de dados: OK
- ✅ Ranking online completo: OK
- ✅ Star Wars App 100% funcional: OK

---

**Execute o script e depois teste novamente! 🚀**
