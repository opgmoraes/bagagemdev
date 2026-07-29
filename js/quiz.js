// Quiz de área — usa as 15 áreas pré-configuradas (sem depender do Firestore)
// 10 perguntas, 5 alternativas + opção de pular cada uma. Cada área aparece em
// pelo menos 3 perguntas diferentes, então nenhuma resposta isolada decide o resultado sozinha.

const SKIP = { label: "prefiro pular essa", scores: {}, isSkip: true };

const QUESTIONS = [
  {
    text: "O que te dá mais satisfação?",
    options: [
      { label: "Resolver um problema de lógica até funcionar certinho", scores: { backend: 2, devops: 1 } },
      { label: "Ver uma tela ficar bonita e fácil de usar", scores: { frontend: 2, "ux-ui": 1 } },
      { label: "Descobrir um padrão escondido num monte de dados", scores: { dados: 2, "analista-dados": 1 } },
      { label: "Encontrar uma falha de segurança antes que alguém a explore", scores: { seguranca: 2 } },
      { label: "Organizar caos e transformar isso em processo claro", scores: { "analista-sistemas": 2, "product-manager": 1 } },
      SKIP,
    ],
  },
  {
    text: "Como você prefere passar o dia trabalhando?",
    options: [
      { label: "Organizando estrutura e regras que ninguém vê, mas que tudo depende delas", scores: { backend: 2 } },
      { label: "Ajustando pixel, cor e interação até parecer certo", scores: { frontend: 2, "ux-ui": 1 } },
      { label: "Automatizando processos e cuidando de servidores", scores: { devops: 2, cloud: 1 } },
      { label: "Testando tudo até garantir que nada quebre", scores: { qa: 2 } },
      { label: "Decidindo o que entra no roadmap e por quê", scores: { "product-manager": 2 } },
      SKIP,
    ],
  },
  {
    text: "Qual dessas frases mais parece com você?",
    options: [
      { label: '"Se o banco de dados está certo, o resto se resolve"', scores: { backend: 2, dados: 1 } },
      { label: '"A experiência de quem usa vem antes de tudo"', scores: { frontend: 2, "ux-ui": 2 } },
      { label: '"Números não mentem, só precisam ser bem lidos"', scores: { "analista-dados": 2, "analista-bi": 1 } },
      { label: '"Prefiro prevenir o problema do que corrigir depois"', scores: { seguranca: 2, qa: 1 } },
      { label: '"Gosto de entender o processo antes de mexer em qualquer coisa"', scores: { "analista-sistemas": 2 } },
      SKIP,
    ],
  },
  {
    text: "Você já mexeu com tecnologia. O que rendeu mais?",
    options: [
      { label: "Criar uma API ou automação que funciona sozinha", scores: { backend: 2 } },
      { label: "Montar um layout ou app com JavaScript", scores: { frontend: 2 } },
      { label: "Configurar um servidor, Docker ou deploy", scores: { devops: 2, cloud: 1 } },
      { label: "Testar um app no celular e no computador", scores: { mobile: 2, qa: 1 } },
      { label: "Montar uma planilha ou dashboard que facilitou a vida de alguém", scores: { "analista-bi": 2, "analista-dados": 1 } },
      SKIP,
    ],
  },
  {
    text: "O que mais te interessa no mundo da tecnologia hoje?",
    options: [
      { label: "Inteligência Artificial e como ela está mudando tudo", scores: { ia: 2 } },
      { label: "Como grandes empresas guardam e usam dados", scores: { dados: 2, cloud: 1 } },
      { label: "Como apps ficam disponíveis para milhões de pessoas", scores: { cloud: 2, devops: 1 } },
      { label: "Como proteger sistemas de ataques e vazamentos", scores: { seguranca: 2 } },
      { label: "Como produtos digitais são pensados do zero", scores: { "product-manager": 2, "ux-ui": 1 } },
      SKIP,
    ],
  },
  {
    text: "Prefere trabalhar mais com o quê?",
    options: [
      { label: "Interface visual (o que a pessoa vê)", scores: { frontend: 2, "ux-ui": 1 } },
      { label: "Lógica de servidor (o que roda por trás)", scores: { backend: 2 } },
      { label: "Um pouco dos dois, de ponta a ponta", scores: { fullstack: 3 } },
      { label: "Apps de celular (Android/iOS)", scores: { mobile: 2 } },
      { label: "Requisitos e regras de negócio", scores: { "analista-sistemas": 2 } },
      SKIP,
    ],
  },
  {
    text: "Qual dessas tarefas te atrai mais no dia a dia?",
    options: [
      { label: "Conversar com áreas do negócio pra entender o que elas precisam e documentar isso", scores: { "analista-sistemas": 2 } },
      { label: "Montar dashboards e relatórios visuais pra apoiar decisões", scores: { "analista-bi": 2, "analista-dados": 1 } },
      { label: "Pesquisar como as pessoas usam um produto e desenhar a solução", scores: { "ux-ui": 2 } },
      { label: "Definir prioridades e liderar o roadmap de um produto", scores: { "product-manager": 2 } },
      { label: "Escrever consultas SQL pra responder uma pergunta de negócio", scores: { "analista-dados": 2, dados: 1 } },
      SKIP,
    ],
  },
  {
    text: "Como você lida melhor com dados no trabalho?",
    options: [
      { label: "Construindo pipelines pra mover dados em grande escala", scores: { dados: 2, cloud: 1 } },
      { label: "Explorando planilhas e SQL pra achar uma resposta rápida", scores: { "analista-dados": 2 } },
      { label: "Transformando números em gráfico e dashboard pro time entender", scores: { "analista-bi": 2 } },
      { label: "Treinando modelos pra automatizar uma decisão", scores: { ia: 2 } },
      { label: "Prefiro não trabalhar diretamente com dados", scores: { frontend: 1, "ux-ui": 1 } },
      SKIP,
    ],
  },
  {
    text: "Numa equipe, qual desses papéis combina mais com você?",
    options: [
      { label: "Quem garante que nada em produção vai quebrar", scores: { devops: 2, qa: 1 } },
      { label: "Quem acha o bug que ninguém viu", scores: { qa: 2 } },
      { label: "Quem pensa no risco antes de todo mundo", scores: { seguranca: 2 } },
      { label: "Quem organiza prioridade e alinha expectativa", scores: { "product-manager": 2, "analista-sistemas": 1 } },
      { label: "Quem cuida de como cada tela vai parecer e funcionar", scores: { "ux-ui": 2, frontend: 1 } },
      SKIP,
    ],
  },
  {
    text: "Qual é o seu nível de experiência atual?",
    options: [
      { label: "Nunca programei", scores: { backend: 1, frontend: 1, "analista-sistemas": 1 } },
      { label: "Já fiz alguns cursos ou exercícios", scores: { backend: 1, frontend: 1, qa: 1, mobile: 1 } },
      { label: "Já sei o básico e quero me especializar", scores: { dados: 1, backend: 1, devops: 1, fullstack: 1 } },
      { label: "Já trabalho com tecnologia e quero migrar de área", scores: { ia: 1, cloud: 1, seguranca: 1, "product-manager": 1 } },
      { label: "Já trabalho com dados ou negócio e quero migrar pra TI", scores: { "analista-dados": 1, "analista-bi": 1, "analista-sistemas": 1 } },
      SKIP,
    ],
  },
];

const RESULT_TEXT = {
  backend: { nome: "Backend", desc: "Você curte resolver o que acontece por trás das telas — lógica, dados e estrutura. Backend combina com você." },
  frontend: { nome: "Frontend", desc: "Você se conecta com o que a pessoa vê e sente ao usar algo. Frontend combina com você." },
  fullstack: { nome: "Full Stack", desc: "Você gosta de dominar os dois lados — construir aplicações completas de ponta a ponta. Full Stack combina com você." },
  devops: { nome: "DevOps", desc: "Você curte automação, infraestrutura e fazer tudo rodar liso em produção. DevOps combina com você." },
  dados: { nome: "Data Engineer", desc: "Você gosta de encontrar sentido em números e informação, construindo pipelines de dados. Data Engineer combina com você." },
  qa: { nome: "QA / Testes", desc: "Você tem o olho clínico pra encontrar bugs antes que virem problema. QA combina com você." },
  mobile: { nome: "Mobile", desc: "Você curte criar experiências para o bolso das pessoas — apps de Android e iOS. Mobile combina com você." },
  seguranca: { nome: "Cibersegurança", desc: "Você pensa como quem protege — sempre um passo à frente das ameaças. Cibersegurança combina com você." },
  cloud: { nome: "Cloud Architecture", desc: "Você curte pensar em escala, disponibilidade e infraestrutura robusta. Cloud Architecture combina com você." },
  ia: { nome: "IA Engineer", desc: "Você está fascinado pelo que a inteligência artificial pode construir. IA Engineer combina com você." },
  "analista-sistemas": { nome: "Analista de Sistemas", desc: "Você gosta de traduzir a necessidade do negócio em requisitos técnicos claros. Analista de Sistemas combina com você." },
  "analista-dados": { nome: "Analista de Dados", desc: "Você gosta de explorar planilhas e SQL pra transformar dados em decisão rápida. Analista de Dados combina com você." },
  "analista-bi": { nome: "Analista de BI", desc: "Você gosta de montar dashboards e entregar inteligência de dados pro time todo. Analista de BI combina com você." },
  "ux-ui": { nome: "UX/UI Design", desc: "Você gosta de entender como as pessoas usam um produto e desenhar essa experiência. UX/UI Design combina com você." },
  "product-manager": { nome: "Product Manager", desc: "Você gosta de definir prioridades e conectar negócio, design e engenharia. Product Manager combina com você." },
};

let currentQuestion = 0;
let scores = {};
let resultSlug = null;

const introEl = document.getElementById("quiz-intro");
const questionScreenEl = document.getElementById("quiz-question-screen");
const resultScreenEl = document.getElementById("quiz-result-screen");

document.getElementById("quiz-start").addEventListener("click", startQuiz);
document.getElementById("quiz-restart").addEventListener("click", () => {
  currentQuestion = 0;
  scores = {};
  startQuiz();
});

function startQuiz() {
  introEl.style.display = "none";
  resultScreenEl.style.display = "none";
  questionScreenEl.style.display = "block";
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[currentQuestion];
  document.getElementById("quiz-progress-fill").style.width = `${(currentQuestion / QUESTIONS.length) * 100}%`;
  document.getElementById("quiz-step-counter").textContent = `pergunta ${currentQuestion + 1} de ${QUESTIONS.length}`;
  document.getElementById("quiz-question-text").textContent = q.text;
  document.getElementById("quiz-options").innerHTML = q.options
    .map((opt, i) => `<button class="${opt.isSkip ? "quiz-option-skip" : "quiz-option"}" data-index="${i}">${opt.label}</button>`)
    .join("");

  document.querySelectorAll(".quiz-option, .quiz-option-skip").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      document.querySelectorAll(".quiz-option, .quiz-option-skip").forEach((b) => (b.disabled = true));
      btn.classList.add("selected");

      const opt = q.options[Number(btn.dataset.index)];
      Object.entries(opt.scores).forEach(([area, pts]) => {
        scores[area] = (scores[area] || 0) + pts;
      });

      setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < QUESTIONS.length) {
          renderQuestion();
        } else {
          showResult();
        }
      }, 220);
    });
  });
}

async function showResult() {
  document.getElementById("quiz-progress-fill").style.width = "100%";

  const ranking = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  questionScreenEl.style.display = "none";
  resultScreenEl.style.display = "block";

  // Se pulou perguntas demais e não sobrou pontuação nenhuma
  if (ranking.length === 0) {
    document.getElementById("quiz-result-area").textContent = "sem resultado ainda";
    document.getElementById("quiz-result-desc").textContent =
      "você pulou perguntas demais pra gente identificar uma área. tenta responder mais dessa vez — mesmo um palpite ajuda.";
    document.getElementById("quiz-see-area").style.display = "none";
    document.getElementById("quiz-ranking").innerHTML = "";
    return;
  }
  document.getElementById("quiz-see-area").style.display = "";

  resultSlug = ranking[0][0];
  const info = RESULT_TEXT[resultSlug];

  document.getElementById("quiz-result-area").textContent = info.nome;
  document.getElementById("quiz-result-desc").textContent = info.desc;

  document.getElementById("quiz-see-area").onclick = () => {
    location.href = `../area-detalhe/?slug=${resultSlug}`;
  };

  const maxScore = ranking[0][1] || 1;
  const top3 = ranking.slice(0, 3).filter(([, pts]) => pts > 0);
  document.getElementById("quiz-ranking").innerHTML = `
    <p class="quiz-ranking-title">também combina com você</p>
    ${top3
      .map(([slug, pts]) => {
        const nome = RESULT_TEXT[slug]?.nome || slug;
        const pct = Math.round((pts / maxScore) * 100);
        return `
        <div class="quiz-ranking-item">
          <span class="quiz-ranking-name">${nome}</span>
          <div class="quiz-ranking-bar-track"><div class="quiz-ranking-bar-fill" style="width:${pct}%"></div></div>
          <span class="quiz-ranking-pct">${pct}%</span>
        </div>
      `;
      })
      .join("")}
  `;
}
