# Bagagem Dev

Site de orientação pra quem tá começando ou perdido em TI: 10 áreas com roadmap completo, cursos gratuitos, ferramentas recomendadas, quiz de área, vagas do mercado e uma vitrine de produtos pagos.

Feito em HTML + CSS + JavaScript puro (sem framework, sem build step) + Firebase (Firestore + Authentication).

---

## Índice

1. [O que já vem pronto](#o-que-já-vem-pronto)
2. [Instalar o Firebase (passo a passo)](#instalar-o-firebase-passo-a-passo)
3. [Configurar as chaves com segurança](#configurar-as-chaves-com-segurança)
   - [Rodando local, no seu computador](#cenário-a--rodando-local-no-seu-computador-pra-testar)
   - [Publicando no GitHub Pages com GitHub Secrets](#cenário-b--publicando-no-github-pages-produção--usando-github-secrets)
   - [Restringir a API key por domínio](#reforço-extra-restringir-a-api-key-por-domínio)
   - [Repositório privado](#recomendação-extra-repositório-privado)
4. [Publicar as regras de segurança](#publicar-as-regras-de-segurança)
5. [Rodar o projeto localmente](#rodar-o-projeto-localmente)
6. [Como usar o painel admin](#como-usar-o-painel-admin)
7. [Estrutura do projeto](#estrutura-do-projeto)
8. [Segurança — o que foi implementado](#segurança--o-que-foi-implementado)
9. [Deploy em produção](#deploy-em-produção)
10. [Troubleshooting](#troubleshooting)

---

## O que já vem pronto

Você **não precisa cadastrar nada pra começar** — isso já vem no código:

- **10 áreas de TI** completas (Frontend, Backend, Full Stack, DevOps, Data Engineer, QA, Mobile, Cibersegurança, Cloud Architecture, IA Engineer), cada uma com:
  - Descrição, dificuldade, faixa salarial, tempo até a primeira vaga
  - Roadmap de 7-8 níveis com subtópicos (baseado no roadmap.sh)
  - Faculdades relacionadas (Análise e Desenvolvimento de Sistemas, Ciência da Computação, etc)
  - Linguagens mais populares e termos essenciais
- **Quiz de 7 perguntas** que aponta a área ideal + ranking das áreas secundárias que também combinam

O que você cadastra pelo **painel admin** (`/admin.html`):
- 📚 Recursos gratuitos (cursos) — aparecem automaticamente na área certa, dentro do roadmap
- 🛠️ Ferramentas
- 💼 Vagas (as 18 de exemplo servem de fallback até você cadastrar as suas)
- 💰 Produtos pagos (vitrine com link de checkout Cakto)

---

## Instalar o Firebase (passo a passo)

### 1. Criar o projeto

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. **Adicionar projeto** → nome `bagagem-dev` (ou o que preferir)
3. Pode desabilitar o Google Analytics (não é necessário)
4. **Criar projeto** e aguarde

### 2. Registrar o app Web

1. Na tela do projeto, clique no ícone **`</>`** (Web)
2. Apelido: "site" (qualquer nome)
3. **Não marque** "Configurar Firebase Hosting" (vamos usar outro serviço de hospedagem)
4. **Registrar app**
5. Você vai ver um bloco `firebaseConfig` — **guarde essa tela aberta**, você vai usar no próximo passo

### 3. Ativar o Firestore Database

1. Menu lateral → **Firestore Database** → **Criar banco de dados**
2. Modo: **produção**
3. Localização: `southamerica-east1` (São Paulo) — mais rápido pro Brasil
4. **Criar**

### 4. Ativar a Authentication

1. Menu lateral → **Authentication** → aba **Sign-in method**
2. Ative **E-mail/senha** → **Salvar**
3. Aba **Users** → **Add user**
4. Cadastre seu e-mail e uma senha forte — esse será seu login de admin
5. Depois de criado, **copie o "User UID"** que aparece na lista (algo como `aBcD3fGh...`) — você vai precisar dele no passo 6

---

## Configurar as chaves com segurança

Este é um projeto **estático** (sem servidor Node, sem build tool tipo Webpack/Vite). Isso muda como "variáveis de ambiente" funcionam aqui — mas dá pra ter algo equivalente ao que a Vercel faz, **de graça**, usando GitHub Actions + GitHub Secrets. Existem dois cenários:

### Cenário A — rodando local, no seu computador (pra testar)

1. Abra `js/firebase-config.js` (já existe no projeto, com valores `"COLE_AQUI"`)
2. Volte na tela do Firebase Console (passo 2 acima) e copie os valores reais do `firebaseConfig`
3. Cole substituindo cada `"COLE_AQUI"`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "bagagem-dev-xxxx.firebaseapp.com",
  projectId: "bagagem-dev-xxxx",
  storageBucket: "bagagem-dev-xxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

4. Salve o arquivo. Esse arquivo **nunca vai pro Git** (está no `.gitignore`) — é só pra você testar na sua máquina.

### Cenário B — publicando no GitHub Pages (produção) — usando GitHub Secrets

Aqui é onde entram as "variáveis de ambiente" de verdade, do jeito que você usaria na Vercel: guardadas de forma criptografada no GitHub, nunca aparecem no código, e são injetadas automaticamente a cada deploy pelo **GitHub Actions** (gratuito). O projeto já vem com o workflow pronto em `.github/workflows/deploy.yml` — você só precisa cadastrar os Secrets uma vez.

**Passo a passo:**

1. Crie um repositório no GitHub e suba este projeto (veja a seção [Deploy em produção](#deploy-em-produção))
2. No repositório → **Settings → Secrets and variables → Actions**
3. Clique **New repository secret** e cadastre, um por um, esses 6 secrets (os valores são os mesmos do `firebaseConfig` que você copiou no Firebase Console):

| Nome do Secret | Valor |
|---|---|
| `FIREBASE_API_KEY` | seu `apiKey` |
| `FIREBASE_AUTH_DOMAIN` | seu `authDomain` |
| `FIREBASE_PROJECT_ID` | seu `projectId` |
| `FIREBASE_STORAGE_BUCKET` | seu `storageBucket` |
| `FIREBASE_MESSAGING_SENDER_ID` | seu `messagingSenderId` |
| `FIREBASE_APP_ID` | seu `appId` |

4. Pronto. A partir de agora, toda vez que você der `git push` na branch `main`, o GitHub Actions vai automaticamente:
   - Pegar os 6 secrets
   - Gerar um `js/firebase-config.js` só dentro do ambiente de build (nunca commitado)
   - Publicar o site atualizado no GitHub Pages

Você pode acompanhar o deploy rodando na aba **Actions** do repositório.

### Por que isso é seguro (e o que "seguro" quer dizer aqui)

As chaves do Firebase Web (`apiKey`, `authDomain` etc) **sempre vão aparecer no código do site publicado** — dá pra ver pelo "Inspecionar" do navegador. Isso é normal e o [próprio Google confirma que é esperado](https://firebase.google.com/docs/projects/api-keys): essa chave não é uma senha, é só um identificador do projeto.

A segurança de verdade vem de duas camadas, que já estão implementadas:
1. **Firestore Rules** — controla quem pode ler/escrever cada coleção, não importa quem tem a chave
2. **Firebase Authentication** — só quem tem seu e-mail/senha vira admin

O que os **GitHub Secrets** resolvem é outra coisa: impedir que a chave apareça **commitada no histórico do repositório** (o que facilitaria bots que escaneiam GitHub público atrás de `projectId` pra tentar abusar de cota gratuita), e te dar o mesmo fluxo de trabalho de "variável de ambiente" que você já conhece de Vercel/Netlify, sem custar nada.

### Reforço extra: restringir a API key por domínio

Isso reduz o risco de abuso na prática, direto no Google Cloud Console (mesmo projeto do Firebase, é grátis):

1. Acesse [console.cloud.google.com](https://console.cloud.google.com) e selecione o mesmo projeto do Firebase
2. Menu → **APIs e Serviços → Credenciais**
3. Clique na chave de API (a mesma `apiKey` do Firebase)
4. Em **"Restrições de aplicativo"**, escolha **"Referenciadores HTTP (sites)"**
5. Adicione os domínios permitidos, um por linha:
   ```
   https://SEU_USUARIO.github.io/*
   http://localhost:8000/*
   ```
6. Salvar

A partir daí, mesmo que alguém copie sua `apiKey`, ela só funciona em requisições vindas do seu domínio do GitHub Pages ou do seu `localhost` de teste — em qualquer outro lugar, o Google bloqueia a requisição.

### Recomendação extra: repositório privado

Vale considerar deixar o repositório do GitHub **privado**. Desde 2021 o GitHub permite publicar GitHub Pages a partir de um repositório privado mesmo no plano gratuito — o **site continua público** (é a natureza de um site), mas ninguém consegue ver seu código-fonte, histórico de commits ou comentários. Não custa nada a mais e adiciona uma camada extra de privacidade, em cima de tudo que já foi implementado acima.

Pra fazer isso: ao criar o repositório no GitHub, marque **Private** em vez de Public. GitHub Actions e Secrets funcionam normalmente em repositórios privados no plano gratuito.

---

## Publicar as regras de segurança

1. No Firebase Console → **Firestore Database** → aba **Regras**
2. Apague todo o conteúdo que estiver lá
3. Abra o arquivo `firestore.rules` deste projeto, copie **tudo**
4. Cole no Firebase Console
5. Troque a linha `"SEU_UID_AQUI"` pelo UID que você copiou no passo 4 do Firebase (dentro de Authentication → Users)
6. Clique **Publicar**

Essas regras garantem que:
- Qualquer visitante consegue **ler** cursos, ferramentas, vagas e produtos (é conteúdo público do site)
- Só **você** (autenticado com o UID configurado) consegue **criar, editar ou apagar** esses dados
- Qualquer coleção que não esteja explicitamente liberada fica **bloqueada por padrão**

---

## Rodar o projeto localmente

Não precisa instalar nada além de um servidor HTTP simples (o navegador bloqueia módulos JS abertos direto do disco por segurança).

```bash
cd bagagem-dev
python3 -m http.server 8000
```

Depois abra:
- `http://localhost:8000` — site
- `http://localhost:8000/admin.html` — painel admin (login com o e-mail/senha que você criou no Firebase)

Se preferir, qualquer outro servidor estático funciona também (Live Server do VS Code, `npx serve`, etc).

---

## Como usar o painel admin

1. Acesse `/admin.html` e faça login
2. Você vai ver 4 abas:

### 📚 Recursos Gratuitos
Cadastre cursos, tutoriais, guias. **Marque as áreas relacionadas** (checkboxes) — o curso vai aparecer automaticamente na seção "cursos gratuitos" de cada área marcada, dentro do roadmap.

### 🛠️ Ferramentas
Cadastre ferramentas recomendadas (editor, terminal, design, etc), com categoria e nível de importância.

### 💼 Vagas
Cadastre vagas reais que você encontrar no mercado (LinkedIn, Glassdoor, etc). O site começa sem nenhuma vaga cadastrada — assim que você adicionar a primeira, ela já aparece em `/vagas.html` com filtro por área e estatísticas (salário médio, linguagens e áreas mais demandadas) calculadas em cima do que você mesmo cadastrar.

### 💰 Produtos
Cadastre produtos pagos (packs, e-books, etc) com link de checkout da Cakto.

Todas as abas têm **editar** e **remover** em cada item cadastrado.

---

## Estrutura do projeto

```
bagagem-dev/
├── .github/
│   └── workflows/
│       └── deploy.yml            → GitHub Actions: injeta os Secrets e publica no Pages
├── scripts/
│   └── build-firebase-config.js  → gera firebase-config.js a partir dos Secrets (rodado pelo Actions)
├── index.html                   → Home
├── areas.html                    → Grid das 10 áreas
├── area-detalhe.html             → Detalhe de área (roadmap, cursos, faculdades)
├── recursos.html                 → Cursos gratuitos com filtro por área
├── ferramentas.html              → Ferramentas recomendadas
├── quiz.html                     → Quiz de área
├── vagas.html                    → Vagas + estatísticas de mercado
├── produtos.html                 → Vitrine de produtos pagos
├── admin.html                    → Painel administrativo
├── css/
│   ├── variables.css            → Cores, tipografia, tokens de design
│   ├── base.css                 → Reset, nav, hero, botão flutuante
│   ├── components.css           → Cards, tags, filtros, quiz, roadmap
│   └── admin.css                → Estilos específicos do admin
├── js/
│   ├── firebase-config.js       → 🔒 suas chaves reais (fora do Git — só local/gerado no build)
│   ├── firebase-config.example.js → modelo público, sem chaves reais
│   ├── firebase-init.js         → inicialização do Firebase
│   ├── areas-preconfiguras.js   → as 10 áreas + roadmaps (não precisa editar)
│   ├── admin.js                 → lógica do painel admin
│   ├── index.js / areas.js / area-detalhe.js / recursos.js /
│   │   ferramentas.js / quiz.js / vagas.js / produtos.js
│   └── reveal.js                → animação de entrada ao rolar a página
├── firestore.rules              → regras de segurança (cole no Firebase Console)
├── .gitignore                   → protege firebase-config.js e afins
└── README.md                    → este arquivo
```

---

## Segurança — o que foi implementado

- **Autenticação real** via Firebase Auth (e-mail/senha) — só você acessa o admin
- **Regras de Firestore** restringindo escrita ao seu UID; leitura pública só nas coleções de conteúdo
- **Bloqueio por padrão** de qualquer coleção não explicitamente liberada nas regras
- **Chaves fora do Git**: `firebase-config.js` real nunca é commitado (`.gitignore`), só o template (`firebase-config.example.js`) fica público
- **Sem dependências externas** de terceiros além do próprio Firebase (menos superfície de ataque)
- **Sem inputs perigosos**: o admin não injeta HTML arbitrário nos dados — os campos são todos texto simples renderizados como texto

---

## Deploy em produção

O projeto já vem com deploy automático configurado (`.github/workflows/deploy.yml`), gratuito, usando GitHub Actions + GitHub Pages. Veja o passo a passo completo na seção [Cenário B](#cenário-b--publicando-no-github-pages-produção--usando-github-secrets) acima — resumindo:

1. Crie um repositório no GitHub (pode ser **privado**, veja a recomendação acima)
2. Suba o projeto:

```bash
git init
git add .
git commit -m "Deploy inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/bagagem-dev.git
git push -u origin main
```

3. Cadastre os 6 GitHub Secrets (tabela na seção acima)
4. Vá em **Settings → Pages** e configure a fonte como **Deploy from a branch → `gh-pages` → / (root)** (essa branch é criada automaticamente pelo workflow no primeiro deploy)
5. Pronto — a cada `git push` na `main`, o site é rebuildado e publicado sozinho

Você pode acompanhar o progresso do deploy na aba **Actions** do repositório. O site fica disponível em `https://SEU_USUARIO.github.io/bagagem-dev`.

⚠️ Confirme sempre que `js/firebase-config.js` (o real, com suas chaves) nunca aparece em `git status` como arquivo pronto pra commit — ele deve estar sempre ignorado, porque só o workflow o gera (a partir dos Secrets) no momento do deploy.

---

## Troubleshooting

**Erro "Firebase: Error (auth/invalid-api-key)" ou nada carrega**
→ Você preencheu `js/firebase-config.js` com valores reais? Confira se não sobrou nenhum `"COLE_AQUI"`.

**Erro "permission-denied" no console**
→ Você trocou `SEU_UID_AQUI` no `firestore.rules` pelo seu UID real e clicou em **Publicar**?

**Login não funciona no admin**
→ Confirme que criou o usuário em Authentication → Users, e que ativou o método "E-mail/senha" em Sign-in method.

**Cursos não aparecem na área**
→ No admin, ao cadastrar o recurso, marque o checkbox da área correspondente. Sem marcar nenhuma área, o curso fica "órfão" e só aparece em `/recursos.html`.

**"404 local-store.js" ou erro parecido**
→ Isso era de uma versão antiga do projeto (modo de teste local). A versão atual não usa mais esse arquivo — se ainda aparecer, você está com uma pasta antiga misturada, use só os arquivos deste pacote.

**Site publicado no GitHub Pages não conecta no Firebase / fica em branco**
→ Confira na aba **Actions** do repositório se o último deploy rodou com sucesso (ícone verde). Se falhou, clique nele pra ver o log — geralmente é algum Secret com nome digitado errado. Os 6 nomes precisam ser exatamente: `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID`.

**Nenhuma vaga aparece em `/vagas.html`**
→ Esperado logo depois de instalar o projeto — não existe nenhuma vaga de exemplo pré-cadastrada. Cadastre as suas pelo admin (aba **💼 Vagas**) e elas aparecem automaticamente.

---

Bora! 🚀
