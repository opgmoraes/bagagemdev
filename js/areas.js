import { initReveal } from "./reveal.js";
import { AREAS_PRECONFIGURAS } from "./areas-preconfiguras.js";

const AREA_ICONS = {
  frontend: "layout", backend: "database", fullstack: "code", devops: "server",
  dados: "bar-chart", qa: "check-circle", mobile: "smartphone", seguranca: "lock",
  cloud: "cloud", ia: "brain",
};

function formatarFaixa(area) {
  if (area.faixaSalarial) return area.faixaSalarial;
  if (area.faixaSalarialMin && area.faixaSalarialMax) {
    const fmt = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
    return `${fmt(area.faixaSalarialMin)} - ${fmt(area.faixaSalarialMax)}`;
  }
  return "";
}

function areaCardHTML(area, i) {
  return `
    <a class="bento-card reveal" href="../area-detalhe/?slug=${area.slug}">
      <div class="bento-top">
        <span class="bento-index">${String(i + 1).padStart(2, "0")}</span>
        <svg class="icon" style="width:20px;height:20px;color:var(--text-muted);"><use href="#icon-${AREA_ICONS[area.slug] || "code"}"></use></svg>
      </div>
      <div>
        <p class="bento-title">${area.nome}</p>
        <p class="bento-desc">${area.descricao}</p>
        <div class="bento-foot">
          <span class="status-tag">nível ${area.dificuldade || "-"}/5</span>
          <span class="status-tag">${formatarFaixa(area)}</span>
        </div>
      </div>
    </a>
  `;
}

function render() {
  const areas = AREAS_PRECONFIGURAS;
  document.getElementById("areas-grid").innerHTML =
    areas.map(areaCardHTML).join("") || '<p class="state-msg">nenhuma área cadastrada ainda.</p>';
  initReveal();
}

render();
