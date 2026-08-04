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

let allCursos = [];
let allAreas = [];
let activeAreas = new Set();

function cursoCardHTML(curso) {
  return `
    <a class="resource-card reveal" href="${curso.link}" target="_blank" rel="noopener" style="display:block;">
      <div class="resource-cover">${curso.capa ? `<img src="${curso.capa}" alt="">` : "/curso"}</div>
      <div class="resource-body">
        <div class="resource-areas">
          ${(curso.areas || [])
            .map((a) => `<span class="area-tag">${a}</span>`)
            .join("")}
        </div>
        <p class="resource-title">${curso.titulo}</p>
        <p class="resource-desc">${curso.descricao}</p>
        <div class="resource-foot">
          <span class="status-tag">${
            curso.tipo === "universidade" ? curso.instituicao : "grátis"
          }</span>
          <span class="status-tag">${curso.nivel || ""}</span>
        </div>
      </div>
    </a>
  `;
}

function applyFilters() {
  const busca = document.getElementById("busca");
  const termo = busca.value.trim().toLowerCase();

  // Atualiza a URL automaticamente (busca + áreas ativas)
  const url = new URL(window.location);

  if (termo) {
    url.searchParams.set("q", termo);
  } else {
    url.searchParams.delete("q");
  }

  if (activeAreas.size > 0) {
    url.searchParams.set("areas", Array.from(activeAreas).join(","));
  } else {
    url.searchParams.delete("areas");
  }

  history.replaceState({}, "", url);

  let filtrados = allCursos;

  if (activeAreas.size > 0) {
    filtrados = filtrados.filter((c) =>
      (c.areas || []).some((a) => activeAreas.has(a)),
    );
  }

  if (termo) {
    filtrados = filtrados.filter((c) => c.titulo.toLowerCase().includes(termo));
  }

  document.getElementById("cursos-grid").innerHTML =
    filtrados.map(cursoCardHTML).join("") ||
    '<p class="state-msg">nenhum curso encontrado com esse filtro.</p>';

  initReveal();
}

function renderFilterChips() {
  const container = document.getElementById("filtro-areas");

  container.innerHTML = allAreas
    .map(
      (a) =>
        `<button class="filter-chip" data-area="${a.slug}">${a.nome}</button>`,
    )
    .join("");

  container.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const slug = chip.dataset.area;

      if (activeAreas.has(slug)) {
        activeAreas.delete(slug);
        chip.classList.remove("active");
      } else {
        activeAreas.add(slug);
        chip.classList.add("active");
      }

      applyFilters();
    });
  });
}

async function render() {
  allCursos = await fetchAll("cursos");
  allAreas = AREAS_PRECONFIGURAS;

  renderFilterChips();

  // Lê a pesquisa e as áreas da URL
  const params = new URLSearchParams(window.location.search);
  const pesquisa = params.get("q");
  const areasParam = params.get("areas");

  if (pesquisa) {
    document.getElementById("busca").value = pesquisa;
  }

  if (areasParam) {
    areasParam.split(",").forEach((slug) => {
      const trimmed = slug.trim();
      if (!trimmed) return;
      activeAreas.add(trimmed);
      const chip = document.querySelector(
        `.filter-chip[data-area="${trimmed}"]`,
      );
      if (chip) chip.classList.add("active");
    });
  }

  applyFilters();

  document.getElementById("busca").addEventListener("input", applyFilters);
}

render();
