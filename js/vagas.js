import { AREAS_PRECONFIGURAS } from "./areas-preconfiguras.js";
import { initReveal } from "./reveal.js";
import { getDocs, collection, db } from "./firebase-init.js";

async function fetchAll(collectionName) {
  try {
    const snap = await getDocs(collection(db, collectionName));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn(`Erro ao carregar ${collectionName}:`, err);
    return [];
  }
}

let todasAsVagas = [];
let todasAsAreas = [];
let areasSelecionadas = new Set();

function formatarData(data) {
  let d;
  if (data?.seconds) {
    d = new Date(data.seconds * 1000);
  } else {
    d = new Date(data);
  }
  const agora = new Date();
  const diff = Math.floor((agora - d) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "hoje";
  if (diff === 1) return "ontem";
  if (diff < 7) return `${diff} dias atrás`;
  if (diff < 30) return `${Math.floor(diff / 7)} semanas atrás`;
  return d.toLocaleDateString("pt-BR");
}

function formatarSalario(min, max) {
  const fmt = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
  return `${fmt(min)} - ${fmt(max)}`;
}

function vagaCardHTML(vaga) {
  return `
    <div class="vaga-card reveal">
      <p class="vaga-empresa">${vaga.empresa}</p>
      <p class="vaga-titulo">${vaga.titulo}</p>
      <div class="vaga-info">
        <div class="vaga-info-item">📍 ${vaga.localizacao}</div>
        <div class="vaga-info-item">💰 ${formatarSalario(vaga.salario.min, vaga.salario.max)}</div>
        <div class="vaga-info-item">⏰ ${formatarData(vaga.dataCriacao)}</div>
      </div>
      <div class="vaga-linguagens">
        ${(vaga.linguagens || []).map((lang) => `<span class="vaga-linguagem">${lang}</span>`).join("")}
      </div>
      <div class="vaga-cta">
        <a class="vaga-link" href="${vaga.link}" target="_blank" rel="noopener">ver vaga →</a>
      </div>
    </div>
  `;
}

function analisarLinguagensPopulares(vagas) {
  const contagem = {};
  vagas.forEach((vaga) => {
    (vaga.linguagens || []).forEach((lang) => {
      contagem[lang] = (contagem[lang] || 0) + 1;
    });
  });
  return Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .map(([linguagem, freq]) => ({ linguagem, frequencia: freq }));
}

function analisarAreasPopulares(vagas) {
  const contagem = {};
  vagas.forEach((vaga) => {
    (vaga.areas || []).forEach((area) => {
      contagem[area] = (contagem[area] || 0) + 1;
    });
  });
  return Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .map(([area, freq]) => ({ area, frequencia: freq }));
}

function calcularSalarioMedio(vagas, area = null) {
  let vagasFiltradas = vagas;
  if (area) {
    vagasFiltradas = vagas.filter((v) => v.areas && v.areas.includes(area));
  }
  if (vagasFiltradas.length === 0) return null;

  const todos = vagasFiltradas.flatMap((v) => [v.salario.min, v.salario.max]);
  const media = todos.reduce((a, b) => a + b, 0) / todos.length;
  return Math.round(media);
}

function aplicarFiltros() {
  const termo = document.getElementById("busca-vagas").value.trim().toLowerCase();
  let filtradas = todasAsVagas;

  if (areasSelecionadas.size > 0) {
    filtradas = filtradas.filter((v) => v.areas && v.areas.some((a) => areasSelecionadas.has(a)));
  }

  if (termo) {
    filtradas = filtradas.filter(
      (v) =>
        v.titulo.toLowerCase().includes(termo) ||
        v.empresa.toLowerCase().includes(termo) ||
        (v.linguagens || []).some((l) => l.toLowerCase().includes(termo))
    );
  }

  filtradas = [...filtradas].sort((a, b) => {
    const dateA = a.dataCriacao?.seconds ? a.dataCriacao.seconds : new Date(a.dataCriacao).getTime() / 1000;
    const dateB = b.dataCriacao?.seconds ? b.dataCriacao.seconds : new Date(b.dataCriacao).getTime() / 1000;
    return dateB - dateA;
  });

  const mensagemVazia = todasAsVagas.length === 0
    ? '<p class="state-msg">nenhuma vaga cadastrada ainda — em breve, novas oportunidades por aqui.</p>'
    : '<p class="state-msg">nenhuma vaga encontrada com esse filtro.</p>';

  document.getElementById("vagas-lista").innerHTML =
    filtradas.map(vagaCardHTML).join("") || mensagemVazia;

  initReveal();
  atualizarStats(filtradas);
}

function renderizarFiltrosAreas() {
  const container = document.getElementById("filtro-areas-vagas");
  container.innerHTML = todasAsAreas
    .map((a) => `<button class="filter-chip" data-area="${a.slug}">${a.nome}</button>`)
    .join("");

  container.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const slug = chip.dataset.area;
      if (areasSelecionadas.has(slug)) {
        areasSelecionadas.delete(slug);
        chip.classList.remove("active");
      } else {
        areasSelecionadas.add(slug);
        chip.classList.add("active");
      }
      aplicarFiltros();
    });
  });
}

function atualizarStats(vagas) {
  const salarioMedio = calcularSalarioMedio(vagas);
  document.getElementById("salario-geral").textContent = salarioMedio
    ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(salarioMedio)
    : "—";

  const salariosPorArea = {};
  todasAsAreas.forEach((area) => {
    const med = calcularSalarioMedio(vagas, area.slug);
    if (med) salariosPorArea[area.nome] = med;
  });

  const salarioAreaHTML = Object.entries(salariosPorArea)
    .slice(0, 3)
    .map(
      ([area, sal]) => `
    <div class="stat-item">
      <span class="stat-label">${area}</span>
      <span class="stat-value">${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(sal)}</span>
    </div>
  `
    )
    .join("");
  document.getElementById("salarios-area").innerHTML = salarioAreaHTML;

  const linguagensTop = analisarLinguagensPopulares(vagas).slice(0, 5);
  document.getElementById("linguagens-top").innerHTML =
    linguagensTop
      .map(
        ({ linguagem, frequencia }) => `
    <div class="stat-item">
      <span class="stat-label">${linguagem}</span>
      <span class="stat-value">${frequencia}x</span>
    </div>
  `
      )
      .join("") || '<p class="state-msg" style="font-size:11px;">nenhuma linguagem</p>';

  const areasTop = analisarAreasPopulares(vagas).slice(0, 5);
  document.getElementById("areas-top").innerHTML =
    areasTop
      .map(
        ({ area, frequencia }) => `
    <div class="stat-item">
      <span class="stat-label">${area}</span>
      <span class="stat-value">${frequencia}x</span>
    </div>
  `
      )
      .join("") || '<p class="state-msg" style="font-size:11px;">nenhuma área</p>';

  document.getElementById("total-vagas").textContent = vagas.length;
}

async function init() {
  todasAsVagas = await fetchAll("vagas");
  todasAsAreas = AREAS_PRECONFIGURAS;

  renderizarFiltrosAreas();
  aplicarFiltros();

  document.getElementById("busca-vagas").addEventListener("input", aplicarFiltros);
}

init();
