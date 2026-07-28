import {
  auth,
  db,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "./firebase-init.js";
import { AREAS_PRECONFIGURAS } from "./areas-preconfiguras.js";

/* ---------------------------------------------------------
   HELPERS GENÉRICOS
--------------------------------------------------------- */
async function fetchAll(collectionName) {
  const snap = await getDocs(collection(db, collectionName));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

async function saveDoc(collectionName, id, data) {
  if (id) {
    await updateDoc(doc(db, collectionName, id), data);
  } else {
    await addDoc(collection(db, collectionName), data);
  }
}

async function removeDoc(collectionName, id) {
  await deleteDoc(doc(db, collectionName, id));
}

function toArray(str) {
  return str.split(",").map((s) => s.trim()).filter(Boolean);
}

function renderAreaCheckboxes(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = AREAS_PRECONFIGURAS.map(
    (a) => `
    <label class="admin-checkbox-item" data-slug="${a.slug}">
      <input type="checkbox" value="${a.slug}"> ${a.nome}
    </label>
  `
  ).join("");

  container.querySelectorAll(".admin-checkbox-item").forEach((item) => {
    const checkbox = item.querySelector("input");
    checkbox.addEventListener("change", () => {
      item.classList.toggle("checked", checkbox.checked);
    });
  });
}

function getCheckedAreas(containerId) {
  return Array.from(document.querySelectorAll(`#${containerId} input:checked`)).map((c) => c.value);
}

function setCheckedAreas(containerId, areasSelecionadas) {
  document.querySelectorAll(`#${containerId} .admin-checkbox-item`).forEach((item) => {
    const checkbox = item.querySelector("input");
    const marcado = (areasSelecionadas || []).includes(checkbox.value);
    checkbox.checked = marcado;
    item.classList.toggle("checked", marcado);
  });
}

/* ---------------------------------------------------------
   AUTENTICAÇÃO
--------------------------------------------------------- */
const loginScreen = document.getElementById("login-screen");
const adminScreen = document.getElementById("admin-screen");

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginScreen.style.display = "none";
    adminScreen.style.display = "block";
    renderAreaCheckboxes("cursos-areas-checkboxes");
    renderAreaCheckboxes("ferramentas-areas-checkboxes");
    renderAreaCheckboxes("vagas-areas-checkboxes");
    carregarCursos();
    carregarFerramentas();
    carregarVagas();
    carregarProdutos();
  } else {
    loginScreen.style.display = "block";
    adminScreen.style.display = "none";
  }
});

document.getElementById("login-btn").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const errorEl = document.getElementById("login-error");
  errorEl.style.display = "none";

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    errorEl.textContent = "E-mail ou senha incorretos.";
    errorEl.style.display = "block";
  }
});

document.getElementById("logout-btn").addEventListener("click", async () => {
  await signOut(auth);
});

/* ---------------------------------------------------------
   TABS
--------------------------------------------------------- */
document.querySelectorAll(".admin-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".admin-tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".admin-panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`panel-${tab.dataset.tab}`).classList.add("active");
  });
});

/* ---------------------------------------------------------
   CURSOS / RECURSOS GRATUITOS
--------------------------------------------------------- */
async function carregarCursos() {
  const cursos = await fetchAll("cursos");
  const container = document.getElementById("cursos-lista");

  if (cursos.length === 0) {
    container.innerHTML = '<p class="admin-state">nenhum recurso cadastrado ainda.</p>';
    return;
  }

  container.innerHTML = cursos
    .map(
      (c) => `
    <div class="admin-item">
      <p class="admin-item-title">${c.titulo}</p>
      <p class="admin-item-meta">${c.instituicao} · ${c.tipo} · ${c.nivel} · ${c.horas}h</p>
      <p class="admin-item-meta">áreas: ${(c.areas || []).join(", ") || "nenhuma"}</p>
      <div class="admin-item-actions">
        <button class="admin-edit-btn" onclick="editarCurso('${c.id}')">editar</button>
        <button class="admin-delete-btn" onclick="deletarCurso('${c.id}')">remover</button>
      </div>
    </div>
  `
    )
    .join("");
}

window.salvarCurso = async function () {
  const id = document.getElementById("cursos-id").value || null;
  const titulo = document.getElementById("cursos-titulo").value.trim();
  const instituicao = document.getElementById("cursos-instituicao").value.trim();
  const descricao = document.getElementById("cursos-descricao").value.trim();
  const tipo = document.getElementById("cursos-tipo").value;
  const nivel = document.getElementById("cursos-nivel").value;
  const horas = document.getElementById("cursos-horas").value;
  const link = document.getElementById("cursos-link").value.trim();
  const areas = getCheckedAreas("cursos-areas-checkboxes");

  if (!titulo || !instituicao || !descricao || !tipo || !nivel || !horas || !link || areas.length === 0) {
    alert("Preencha todos os campos obrigatórios (*) e selecione ao menos uma área.");
    return;
  }

  await saveDoc("cursos", id, {
    titulo, instituicao, descricao, tipo, nivel,
    horas: Number(horas), link, areas,
    criadoEm: new Date(),
  });

  window.limparCurso();
  carregarCursos();
};

window.editarCurso = async function (id) {
  const cursos = await fetchAll("cursos");
  const curso = cursos.find((c) => c.id === id);
  if (!curso) return;

  document.getElementById("cursos-id").value = curso.id;
  document.getElementById("cursos-titulo").value = curso.titulo;
  document.getElementById("cursos-instituicao").value = curso.instituicao;
  document.getElementById("cursos-descricao").value = curso.descricao;
  document.getElementById("cursos-tipo").value = curso.tipo;
  document.getElementById("cursos-nivel").value = curso.nivel;
  document.getElementById("cursos-horas").value = curso.horas;
  document.getElementById("cursos-link").value = curso.link;
  setCheckedAreas("cursos-areas-checkboxes", curso.areas);

  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.deletarCurso = async function (id) {
  if (!confirm("Remover este recurso?")) return;
  await removeDoc("cursos", id);
  carregarCursos();
};

window.limparCurso = function () {
  document.getElementById("cursos-id").value = "";
  document.getElementById("cursos-titulo").value = "";
  document.getElementById("cursos-instituicao").value = "";
  document.getElementById("cursos-descricao").value = "";
  document.getElementById("cursos-tipo").value = "";
  document.getElementById("cursos-nivel").value = "";
  document.getElementById("cursos-horas").value = "";
  document.getElementById("cursos-link").value = "";
  setCheckedAreas("cursos-areas-checkboxes", []);
};

/* ---------------------------------------------------------
   FERRAMENTAS
--------------------------------------------------------- */
async function carregarFerramentas() {
  const ferramentas = await fetchAll("ferramentas");
  const container = document.getElementById("ferramentas-lista");

  if (ferramentas.length === 0) {
    container.innerHTML = '<p class="admin-state">nenhuma ferramenta cadastrada ainda.</p>';
    return;
  }

  container.innerHTML = ferramentas
    .map(
      (f) => `
    <div class="admin-item">
      <p class="admin-item-title">${f.nome}</p>
      <p class="admin-item-meta">${f.categoria} · ${f.importancia}</p>
      <div class="admin-item-actions">
        <button class="admin-edit-btn" onclick="editarFerramenta('${f.id}')">editar</button>
        <button class="admin-delete-btn" onclick="deletarFerramenta('${f.id}')">remover</button>
      </div>
    </div>
  `
    )
    .join("");
}

window.salvarFerramenta = async function () {
  const id = document.getElementById("ferramentas-id").value || null;
  const nome = document.getElementById("ferramentas-nome").value.trim();
  const categoria = document.getElementById("ferramentas-categoria").value.trim();
  const descricao = document.getElementById("ferramentas-descricao").value.trim();
  const importancia = document.getElementById("ferramentas-importancia").value;
  const link = document.getElementById("ferramentas-link").value.trim();
  const areas = getCheckedAreas("ferramentas-areas-checkboxes");

  if (!nome || !categoria || !descricao || !importancia || !link) {
    alert("Preencha todos os campos obrigatórios (*)");
    return;
  }

  await saveDoc("ferramentas", id, {
    nome, categoria, descricao, importancia, link, areas,
    criadoEm: new Date(),
  });

  window.limparFerramenta();
  carregarFerramentas();
};

window.editarFerramenta = async function (id) {
  const ferramentas = await fetchAll("ferramentas");
  const f = ferramentas.find((x) => x.id === id);
  if (!f) return;

  document.getElementById("ferramentas-id").value = f.id;
  document.getElementById("ferramentas-nome").value = f.nome;
  document.getElementById("ferramentas-categoria").value = f.categoria;
  document.getElementById("ferramentas-descricao").value = f.descricao;
  document.getElementById("ferramentas-importancia").value = f.importancia;
  document.getElementById("ferramentas-link").value = f.link;
  setCheckedAreas("ferramentas-areas-checkboxes", f.areas);

  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.deletarFerramenta = async function (id) {
  if (!confirm("Remover esta ferramenta?")) return;
  await removeDoc("ferramentas", id);
  carregarFerramentas();
};

window.limparFerramenta = function () {
  document.getElementById("ferramentas-id").value = "";
  document.getElementById("ferramentas-nome").value = "";
  document.getElementById("ferramentas-categoria").value = "";
  document.getElementById("ferramentas-descricao").value = "";
  document.getElementById("ferramentas-importancia").value = "";
  document.getElementById("ferramentas-link").value = "";
  setCheckedAreas("ferramentas-areas-checkboxes", []);
};

/* ---------------------------------------------------------
   VAGAS
--------------------------------------------------------- */
async function carregarVagas() {
  const vagas = await fetchAll("vagas");
  const container = document.getElementById("vagas-lista");

  if (vagas.length === 0) {
    container.innerHTML = '<p class="admin-state">nenhuma vaga cadastrada ainda.</p>';
    return;
  }

  vagas.sort((a, b) => {
    const dateA = a.dataCriacao?.seconds ? a.dataCriacao.seconds : new Date(a.dataCriacao).getTime() / 1000;
    const dateB = b.dataCriacao?.seconds ? b.dataCriacao.seconds : new Date(b.dataCriacao).getTime() / 1000;
    return dateB - dateA;
  });

  container.innerHTML = vagas
    .map(
      (v) => `
    <div class="admin-item">
      <p class="admin-item-title">${v.titulo}</p>
      <p class="admin-item-meta">${v.empresa} · ${v.localizacao}</p>
      <p class="admin-item-meta">R$ ${v.salario?.min?.toLocaleString("pt-BR") || 0} - R$ ${v.salario?.max?.toLocaleString("pt-BR") || 0}</p>
      <div class="admin-item-actions">
        <button class="admin-edit-btn" onclick="editarVaga('${v.id}')">editar</button>
        <button class="admin-delete-btn" onclick="deletarVaga('${v.id}')">remover</button>
      </div>
    </div>
  `
    )
    .join("");
}

window.salvarVaga = async function () {
  const id = document.getElementById("vagas-id").value || null;
  const titulo = document.getElementById("vagas-titulo").value.trim();
  const empresa = document.getElementById("vagas-empresa").value.trim();
  const localizacao = document.getElementById("vagas-localizacao").value.trim();
  const tipo = document.getElementById("vagas-tipo").value;
  const salarioMin = document.getElementById("vagas-salario-min").value;
  const salarioMax = document.getElementById("vagas-salario-max").value;
  const descricao = document.getElementById("vagas-descricao").value.trim();
  const requisitos = document.getElementById("vagas-requisitos").value.trim();
  const linguagens = toArray(document.getElementById("vagas-linguagens").value);
  const areas = getCheckedAreas("vagas-areas-checkboxes");
  const link = document.getElementById("vagas-link").value.trim();

  if (!titulo || !empresa || !localizacao || !tipo || !salarioMin || !salarioMax || !descricao || !requisitos || !link || areas.length === 0) {
    alert("Preencha todos os campos obrigatórios (*) e selecione ao menos uma área.");
    return;
  }

  await saveDoc("vagas", id, {
    titulo, empresa, localizacao, tipo,
    salario: { min: Number(salarioMin), max: Number(salarioMax) },
    descricao, requisitos, linguagens, areas, link,
    dataCriacao: new Date(),
  });

  window.limparVaga();
  carregarVagas();
};

window.editarVaga = async function (id) {
  const vagas = await fetchAll("vagas");
  const vaga = vagas.find((v) => v.id === id);
  if (!vaga) return;

  document.getElementById("vagas-id").value = vaga.id;
  document.getElementById("vagas-titulo").value = vaga.titulo;
  document.getElementById("vagas-empresa").value = vaga.empresa;
  document.getElementById("vagas-localizacao").value = vaga.localizacao;
  document.getElementById("vagas-tipo").value = vaga.tipo;
  document.getElementById("vagas-salario-min").value = vaga.salario?.min || "";
  document.getElementById("vagas-salario-max").value = vaga.salario?.max || "";
  document.getElementById("vagas-descricao").value = vaga.descricao;
  document.getElementById("vagas-requisitos").value = vaga.requisitos;
  document.getElementById("vagas-linguagens").value = (vaga.linguagens || []).join(", ");
  setCheckedAreas("vagas-areas-checkboxes", vaga.areas);
  document.getElementById("vagas-link").value = vaga.link;

  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.deletarVaga = async function (id) {
  if (!confirm("Remover esta vaga?")) return;
  await removeDoc("vagas", id);
  carregarVagas();
};

window.limparVaga = function () {
  document.getElementById("vagas-id").value = "";
  document.getElementById("vagas-titulo").value = "";
  document.getElementById("vagas-empresa").value = "";
  document.getElementById("vagas-localizacao").value = "";
  document.getElementById("vagas-tipo").value = "";
  document.getElementById("vagas-salario-min").value = "";
  document.getElementById("vagas-salario-max").value = "";
  document.getElementById("vagas-descricao").value = "";
  document.getElementById("vagas-requisitos").value = "";
  document.getElementById("vagas-linguagens").value = "";
  setCheckedAreas("vagas-areas-checkboxes", []);
  document.getElementById("vagas-link").value = "";
};

/* ---------------------------------------------------------
   PRODUTOS
--------------------------------------------------------- */
async function carregarProdutos() {
  const produtos = await fetchAll("produtos");
  const container = document.getElementById("produtos-lista");

  if (produtos.length === 0) {
    container.innerHTML = '<p class="admin-state">nenhum produto cadastrado ainda.</p>';
    return;
  }

  container.innerHTML = produtos
    .map(
      (p) => `
    <div class="admin-item">
      <p class="admin-item-title">${p.titulo}</p>
      <p class="admin-item-meta">R$ ${Number(p.preco).toFixed(2)}</p>
      <div class="admin-item-actions">
        <button class="admin-edit-btn" onclick="editarProduto('${p.id}')">editar</button>
        <button class="admin-delete-btn" onclick="deletarProduto('${p.id}')">remover</button>
      </div>
    </div>
  `
    )
    .join("");
}

window.salvarProduto = async function () {
  const id = document.getElementById("produtos-id").value || null;
  const titulo = document.getElementById("produtos-titulo").value.trim();
  const descricao = document.getElementById("produtos-descricao").value.trim();
  const descricaoCompleta = document.getElementById("produtos-descricao-completa").value.trim();
  const preco = document.getElementById("produtos-preco").value;
  const capa = document.getElementById("produtos-capa").value.trim();
  const linkCheckout = document.getElementById("produtos-checkout").value.trim();

  if (!titulo || !descricao || !preco || !linkCheckout) {
    alert("Preencha todos os campos obrigatórios (*)");
    return;
  }

  await saveDoc("produtos", id, {
    titulo, descricao, descricaoCompleta,
    preco: Number(preco), capa, linkCheckout,
    criadoEm: new Date(),
  });

  window.limparProduto();
  carregarProdutos();
};

window.editarProduto = async function (id) {
  const produtos = await fetchAll("produtos");
  const p = produtos.find((x) => x.id === id);
  if (!p) return;

  document.getElementById("produtos-id").value = p.id;
  document.getElementById("produtos-titulo").value = p.titulo;
  document.getElementById("produtos-descricao").value = p.descricao;
  document.getElementById("produtos-descricao-completa").value = p.descricaoCompleta || "";
  document.getElementById("produtos-preco").value = p.preco;
  document.getElementById("produtos-capa").value = p.capa || "";
  document.getElementById("produtos-checkout").value = p.linkCheckout;

  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.deletarProduto = async function (id) {
  if (!confirm("Remover este produto?")) return;
  await removeDoc("produtos", id);
  carregarProdutos();
};

window.limparProduto = function () {
  document.getElementById("produtos-id").value = "";
  document.getElementById("produtos-titulo").value = "";
  document.getElementById("produtos-descricao").value = "";
  document.getElementById("produtos-descricao-completa").value = "";
  document.getElementById("produtos-preco").value = "";
  document.getElementById("produtos-capa").value = "";
  document.getElementById("produtos-checkout").value = "";
};
