# 🔧 Como Configurar Variáveis de Ambiente no GitHub Pages

## 📋 Problema Identificado
O erro 401 do Supabase indica que as credenciais não estão sendo carregadas na versão online do GitHub Pages.

## ✅ Soluções

### Solução 1: GitHub Actions com Environment Variables

1. **Acesse seu repositório no GitHub:**
   - https://github.com/dronreef2/star-wars-app

2. **Vá para Settings → Secrets and variables → Actions**

3. **Adicione as seguintes variáveis como "Repository secrets":**
   - Nome: `VITE_SUPABASE_URL`
   - Valor: `https://yexmstntkspbvhipkvev.supabase.co`
   
   - Nome: `VITE_SUPABASE_KEY` 
   - Valor: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlleG1zdG50a3NwYnZoaXBrdmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDk5MDksImV4cCI6MjA1MjUyNTkwOX0.9aQU3pfnl_G4dP8e8cF2BzEQCFNgDvKYuSSTl0KEgQ0`

### Solução 2: Hardcode Temporário (RÁPIDA)

Para uma solução imediata, podemos adicionar as variáveis diretamente no código (temporariamente).

### Solução 3: GitHub Actions Workflow

Criar um workflow que injeta as variáveis durante o build.

## 🚀 Próximos Passos

1. Escolha uma das soluções acima
2. Implemente a solução
3. Faça novo deploy
4. Teste a aplicação

---

**Vou implementar a Solução 2 (temporária) agora para você testar rapidamente!**
