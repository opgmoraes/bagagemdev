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

const AREA_ICONS = {
  frontend: "layout", backend: "database", fullstack: "code", devops: "server",
  dados: "bar-chart", qa: "check-circle", mobile: "smartphone", seguranca: "lock",
  cloud: "cloud", ia: "brain",
};

function areaCardHTML(area) {
  return `
    <a class="resource-card reveal" href="area-detalhe/?slug=${area.slug}" style="display:block;">
      <div class="resource-cover"><svg class="icon" style="width:22px;height:22px;color:var(--text-muted);"><use href="#icon-${AREA_ICONS[area.slug] || "code"}"></use></svg></div>
      <div class="resource-body">
        <span class="resource-tag">/${area.slug}</span>
        <p class="resource-title">${area.nome}</p>
        <p class="resource-desc">${area.descricao}</p>
        <span class="status-tag">explorar →</span>
      </div>
    </a>
  `;
}

function cursoCardHTML(curso) {
  return `
    <a class="resource-card reveal" href="${curso.link}" target="_blank" rel="noopener" style="display:block;">
      <div class="resource-cover">${curso.capa ? `<img src="${curso.capa}" alt="">` : `/${(curso.areas || [])[0] || "curso"}`}</div>
      <div class="resource-body">
        <div class="resource-areas">${(curso.areas || []).map((a) => `<span class="area-tag">${a}</span>`).join("")}</div>
        <p class="resource-title">${curso.titulo}</p>
        <p class="resource-desc">${curso.descricao}</p>
        <span class="status-tag">grátis</span>
      </div>
    </a>
  `;
}

function produtoCardHTML(produto) {
  return `
    <a class="resource-card reveal" href="produtos/" style="display:block;">
      <div class="resource-cover">${produto.capa ? `<img src="${produto.capa}" alt="">` : "/produto"}</div>
      <div class="resource-body">
        <p class="resource-title">${produto.titulo}</p>
        <p class="resource-desc">${produto.descricao}</p>
        <span class="status-tag paid">R$ ${Number(produto.preco).toFixed(2)}</span>
      </div>
    </a>
  `;
}

async function render() {
  const [cursos, produtos] = await Promise.all([
    fetchAll("cursos"),
    fetchAll("produtos"),
  ]);
  const areas = AREAS_PRECONFIGURAS;

  document.getElementById("areas-preview").innerHTML =
    areas.slice(0, 3).map(areaCardHTML).join("") || '<p class="state-msg">nenhuma área cadastrada ainda.</p>';

  document.getElementById("cursos-preview").innerHTML =
    cursos.slice(0, 3).map(cursoCardHTML).join("") || '<p class="state-msg">nenhum curso cadastrado ainda.</p>';

  document.getElementById("produtos-preview").innerHTML =
    produtos.slice(0, 3).map(produtoCardHTML).join("") || '<p class="state-msg">nenhum produto cadastrado ainda.</p>';

  initReveal();
}

render();
