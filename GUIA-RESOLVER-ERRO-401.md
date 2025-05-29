# 🔧 GUIA DEFINITIVO: Resolvendo Erro 401 do Supabase

## ❌ PROBLEMA CONFIRMADO
O teste realizado confirmou que a chave API atual está **INVÁLIDA**:
```
❌ Erro ao acessar game_results: Invalid API key
❌ Erro ao acessar player_stats: Invalid API key  
❌ Erro ao inserir dados: Invalid API key
```

## 🎯 SOLUÇÃO PASSO A PASSO

### 1️⃣ **ACESSE O PAINEL DO SUPABASE**
1. Vá para: https://app.supabase.com/
2. Faça login na sua conta
3. Selecione o projeto: **yexmstntkspbvhipkvev**

### 2️⃣ **REGENERAR CREDENCIAIS**
1. No painel lateral, clique em **"Settings"** (⚙️)
2. Clique em **"API"**
3. Você verá duas seções importantes:

#### 📋 **Project URL** (não muda)
```
https://yexmstntkspbvhipkvev.supabase.co
```

#### 🔑 **API Keys** (ESTAS PODEM ESTAR EXPIRADAS)
- **anon public**: Esta é a chave que está falhando
- **service_role**: Para operações de admin

### 3️⃣ **OPÇÕES PARA RESOLVER**

#### **OPÇÃO A: Copiar Novas Chaves (Mais Rápida)**
1. Na seção **API Keys**, clique no ícone de **"olho"** 👁️ para revelar a chave
2. Clique no ícone de **"copiar"** 📋 ao lado da chave **anon public**
3. Se a chave for diferente da atual, substitua no arquivo `.env`

#### **OPÇÃO B: Regenerar Chaves (Mais Segura)**
1. Na seção **API Keys**, procure por um botão **"Regenerate"** ou **"Reset"**
2. Clique para regenerar a chave **anon public**
3. ⚠️ **ATENÇÃO**: Isso invalidará a chave antiga!
4. Copie a nova chave gerada

### 4️⃣ **ATUALIZAR O ARQUIVO .ENV**
Substitua a chave atual no arquivo `.env`:

```env
# Supabase Environment Variables
VITE_SUPABASE_URL=https://yexmstntkspbvhipkvev.supabase.co
VITE_SUPABASE_KEY=NOVA_CHAVE_AQUI
```

### 5️⃣ **VERIFICAR POLÍTICAS RLS**
No painel do Supabase:
1. Vá para **"Table Editor"**
2. Selecione a tabela **game_results**
3. Clique na aba **"RLS"** (Row Level Security)
4. Verifique se as políticas estão **HABILITADAS** e **ATIVAS**:
   - ✅ **"Permitir SELECT para todos"**
   - ✅ **"Permitir INSERT para todos"**

### 6️⃣ **TESTAR A CONEXÃO**
Após atualizar a chave, execute:
```bash
node test-supabase.js
```

Você deve ver:
```
✅ Tabela game_results acessível!
✅ Tabela player_stats acessível!
✅ Inserção bem-sucedida!
```

## 🔍 **POSSÍVEIS CAUSAS DO ERRO**

1. **Chave Expirada**: A chave JWT pode ter expirado
2. **Projeto Pausado**: Projeto Supabase pode estar pausado por inatividade
3. **Cota Excedida**: Limite gratuito pode ter sido atingido
4. **Configuração RLS**: Políticas de segurança muito restritivas

## 🆘 **SE AINDA NÃO FUNCIONAR**

### **Verificar Status do Projeto**
1. No painel do Supabase, verifique se há algum banner vermelho
2. Verifique se o projeto está **"Active"** (não pausado)
3. Verifique o uso na aba **"Usage"**

### **Recriar as Tabelas** (último recurso)
Se necessário, execute novamente o SQL:
```sql
-- Este script está no arquivo: supabase-setup-simple.sql
```

## 📝 **CHECKLIST FINAL**

- [ ] Acessei o painel do Supabase
- [ ] Verifiquei que o projeto está ativo
- [ ] Copiei a nova chave API (anon public)
- [ ] Atualizei o arquivo `.env`
- [ ] Testei com `node test-supabase.js`
- [ ] Configurei GitHub Secrets (se usar deploy)

## 🎯 **PRÓXIMOS PASSOS APÓS RESOLVER**

1. **Configurar GitHub Secrets** para o deploy
2. **Testar aplicação localmente** com `npm run dev`
3. **Fazer deploy** com as novas credenciais
4. **Testar ranking online** na aplicação

---

**💡 DICA**: Se você não conseguir acessar o painel do Supabase ou se o projeto não existir mais, será necessário criar um novo projeto e reconfigurar tudo desde o início.
