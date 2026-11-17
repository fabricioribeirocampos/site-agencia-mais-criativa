# Site — Criativa+ Agência

Site estático (HTML + CSS + JS), sem build. Funciona direto no Vercel.

## 1. Antes de publicar: edite seus dados

Abra `script.js` e troque o bloco `CONFIG` no topo:

```js
const CONFIG = {
  whatsapp: "5521970084480",        // DDI + DDD + número, só dígitos
  instagram: "criativamais.agencia", // sem @
  email: "contato@seudominio.com.br",
};
```

Todos os botões de WhatsApp do site usam esse número, cada um com uma mensagem pronta.

No `index.html`, procure e preencha os textos entre colchetes:
- `[SEU PREÇO]`, `[PREÇO CHEIO]`, `[X]` (seção Combo)
- `[PRAZO]` e `[FORMAS DE PAGAMENTO]` (seção Dúvidas)

## 2. Subir no Vercel

**Opção A: sem GitHub (mais rápido)**
1. Instale o Node.js e rode no terminal, dentro desta pasta:
   ```
   npx vercel
   ```
2. Faça login, aceite as opções padrão e pronto. Para publicar em produção: `npx vercel --prod`.

**Opção B: com GitHub (recomendado)**
1. Crie um repositório no GitHub e envie esta pasta.
2. Em vercel.com, clique em **Add New → Project** e importe o repositório.
3. Framework Preset: **Other**. Não precisa de comando de build. Clique em **Deploy**.
4. A cada alteração enviada ao GitHub, o site atualiza sozinho.

## 3. Domínio próprio

No painel do projeto no Vercel: **Settings → Domains → Add** e digite seu domínio (ex.: `criativamais.com.br`). O Vercel mostra os registros DNS para configurar onde você comprou o domínio (ex.: Registro.br).

## Estrutura

```
index.html     página
styles.css     visual
script.js      configuração e interações
favicon.svg    ícone da aba
logo.png
```
