import { initReveal } from "./reveal.js";
import { getDocs, collection, db } from "./firebase-init.js";
import { AREAS_PRECONFIGURAS } from "./areas-preconfiguras.js";

async function fetchAll(collectionName) {
  try {
    const snap = await getDocs(collection(db, collectionName));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn(`Erro ao carregar ${collectionName}:`, err);
    return [];
  }
}

function normalizarSlug(s) {
  return (s || "")
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function cursoCardHTML(curso) {
  return `
    <a class="resource-card reveal" href="${curso.link}" target="_blank" rel="noopener" style="display:block;">
      <div class="resource-cover">${curso.capa ? `<img src="${curso.capa}" alt="">` : "/curso"}</div>
      <div class="resource-body">
        <span class="resource-tag">${curso.instituicao || ""}</span>
        <p class="resource-title">${curso.titulo}</p>
        <p class="resource-desc">${curso.descricao}</p>
        <span class="status-tag">grátis</span>
      </div>
    </a>
  `;
}

async function render() {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");

  const cursos = await fetchAll("cursos");
  const area = AREAS_PRECONFIGURAS.find((a) => a.slug === slug);

  if (!area) {
    document.getElementById("area-nome").textContent = "área não encontrada";
    document.getElementById("area-descricao").textContent = "verifique o link ou volte pra lista de áreas.";
    return;
  }

  document.title = `${area.nome} — Bagagem Dev`;
  document.getElementById("area-slug-crumb").textContent = area.slug;
  document.getElementById("area-nome").textContent = area.nome;
  document.getElementById("area-descricao").textContent = area.descricao;
  document.getElementById("area-dificuldade").textContent = area.dificuldade ? `${area.dificuldade}/5` : "—";

  const faixaTexto = area.faixaSalarial
    ? area.faixaSalarial
    : area.faixaSalarialMin && area.faixaSalarialMax
    ? `${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(area.faixaSalarialMin)} - ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(area.faixaSalarialMax)}`
    : "—";
  document.getElementById("area-faixa").textContent = faixaTexto;
  document.getElementById("area-tempo").textContent = area.tempoPrimeiraVaga || "—";

  const downloadBtn = document.getElementById("area-download-roadmap");
  if (area.roadmapDownloadUrl) {
    downloadBtn.href = area.roadmapDownloadUrl;
  } else {
    downloadBtn.style.display = "none";
  }

  const roadmap = area.roadmap || [];
  document.getElementById("area-roadmap").innerHTML =
    roadmap
      .map(
        (step, i) => `
      <div class="roadmap-step reveal">
        <span class="roadmap-index">${String(i + 1).padStart(2, "0")}</span>
        <div>
          <p class="roadmap-step-title">${step.titulo}</p>
          <span class="roadmap-step-level">${typeof step.nivel === "number" ? `nível ${step.nivel}` : step.nivel}</span>
          ${
            step.subtopicos && step.subtopicos.length
              ? `<div class="roadmap-subtopicos">${step.subtopicos.map((s) => `<span class="roadmap-subtopico">${s}</span>`).join("")}</div>`
              : ""
          }
        </div>
      </div>
    `
      )
      .join("") || '<p class="state-msg">roadmap ainda não cadastrado.</p>';

  const slugNormalizado = normalizarSlug(slug);
  const cursosDaArea = cursos.filter((c) => (c.areas || []).some((a) => normalizarSlug(a) === slugNormalizado));
  document.getElementById("area-cursos-grid").innerHTML =
    cursosDaArea.map(cursoCardHTML).join("") || '<p class="state-msg">nenhum curso cadastrado pra essa área ainda.</p>';

  const faculdades = area.faculdadesRelacionadas || [];
  document.getElementById("area-faculdades").innerHTML =
    faculdades
      .map(
        (f) => `
      <div class="info-list-item">
        <p class="info-list-title">${f.curso}</p>
        <span class="info-list-sub">${f.tipo}${f.duracao ? " · " + f.duracao : ""}</span>
      </div>
    `
      )
      .join("") || '<p class="state-msg">nenhuma faculdade cadastrada ainda.</p>';

  const termos = area.termosEssenciais || [];
  document.getElementById("area-termos").innerHTML =
    termos.map((t) => `<span class="chip">${t}</span>`).join("") ||
    '<p class="state-msg">nenhum termo cadastrado ainda.</p>';

  initReveal();
}

render();
