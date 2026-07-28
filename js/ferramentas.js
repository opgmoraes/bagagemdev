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

let allFerramentas = [];
let activeCategoria = null;

const IMPORTANCIA_LABEL = { obrigatorio: "obrigatório", importante: "importante", opcional: "opcional" };

function ferramentaCardHTML(f) {
  return `
    <a class="resource-card reveal" href="${f.link}" target="_blank" rel="noopener" style="display:block;">
      <div class="resource-cover">/${f.categoria || "ferramenta"}</div>
      <div class="resource-body">
        <span class="resource-tag">${f.categoria || ""}</span>
        <p class="resource-title">${f.nome}</p>
        <p class="resource-desc">${f.descricao}</p>
        <span class="status-tag ${f.importancia === "obrigatorio" ? "paid" : ""}">${IMPORTANCIA_LABEL[f.importancia] || ""}</span>
      </div>
    </a>
  `;
}

function applyFilter() {
  const filtradas = activeCategoria
    ? allFerramentas.filter((f) => f.categoria === activeCategoria)
    : allFerramentas;
  document.getElementById("ferramentas-grid").innerHTML =
    filtradas.map(ferramentaCardHTML).join("") || '<p class="state-msg">nenhuma ferramenta encontrada.</p>';
  initReveal();
}

function renderChips() {
  const categorias = [...new Set(allFerramentas.map((f) => f.categoria).filter(Boolean))];
  const container = document.getElementById("filtro-categorias");
  container.innerHTML = categorias.map((c) => `<button class="filter-chip" data-cat="${c}">${c}</button>`).join("");
  container.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const isActive = chip.classList.contains("active");
      container.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
      activeCategoria = isActive ? null : chip.dataset.cat;
      if (!isActive) chip.classList.add("active");
      applyFilter();
    });
  });
}

async function render() {
  allFerramentas = await fetchAll("ferramentas");
  renderChips();
  applyFilter();
}

render();
