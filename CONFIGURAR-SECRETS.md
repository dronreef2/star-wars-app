# 🔧 Configuração dos Secrets do GitHub

## ⚠️ URGENTE: Configurar Variáveis de Ambiente

Para resolver o erro 401 no GitHub Pages, você precisa configurar os **secrets** do repositório no GitHub.

## 📋 Passo a Passo

### 1. Acessar as Configurações do Repositório
1. Vá para o seu repositório no GitHub: `https://github.com/dronreef2/star-wars-app`
2. Clique na aba **"Settings"** (Configurações)
3. No menu lateral esquerdo, clique em **"Secrets and variables"**
4. Clique em **"Actions"**

### 2. Adicionar os Secrets
Clique no botão **"New repository secret"** e adicione os seguintes secrets:

#### Secret 1: VITE_SUPABASE_URL
- **Nome:** `VITE_SUPABASE_URL`
- **Valor:** `https://yexmstntkspbvhipkvev.supabase.co`

#### Secret 2: VITE_SUPABASE_KEY
- **Nome:** `VITE_SUPABASE_KEY`
- **Valor:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlleG1zdG50a3NwYnZoaXBrdmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDk5MDksImV4cCI6MjA1MjUyNTkwOX0.9aQU3pfnl_G4dP8e8cF2BzEQCFNgDvKYuSSTl0KEgQ0`

### 3. Habilitar GitHub Pages
1. Ainda nas configurações do repositório, procure **"Pages"** no menu lateral
2. Em **"Source"**, selecione **"GitHub Actions"**
3. Salve as configurações

## 🚀 Resultado Esperado

Após configurar os secrets:
1. O próximo push para a branch `main` irá disparar o workflow automaticamente
2. As variáveis de ambiente estarão disponíveis durante o build
3. O Supabase funcionará corretamente no GitHub Pages
4. O ranking online estará operacional em: `https://dronreef2.github.io/star-wars-app`

## 🔄 Próximos Passos

1. **Configure os secrets** seguindo as instruções acima
2. **Faça um commit** para disparar o novo workflow:
   ```bash
   git add .
   git commit -m "🔧 Adiciona workflow GitHub Actions com secrets Supabase"
   git push origin main
   ```
3. **Aguarde o deploy** (será visível na aba "Actions" do repositório)
4. **Teste o ranking online** após o deploy concluir

## 📝 Observações Importantes

- ✅ O workflow está configurado para usar os secrets de forma segura
- ✅ As credenciais não ficam expostas no código
- ✅ O build será feito com as variáveis de ambiente corretas
- ✅ O deploy é automático após cada push na main

## 🐛 Solução de Problemas

Se ainda houver problemas após configurar os secrets:
1. Verifique se os nomes dos secrets estão exatos (case-sensitive)
2. Confirme se o GitHub Pages está configurado para "GitHub Actions"
3. Verifique os logs na aba "Actions" para erros específicos
