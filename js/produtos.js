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

function produtoHTML(p) {
  return `
    <div class="product-detail reveal" style="padding:32px 0; border-top:0.5px solid var(--border);">
      <div class="product-cover">${p.capa ? `<img src="${p.capa}" alt="">` : "/produto"}</div>
      <div>
        <p class="section-title" style="margin-bottom:10px;">${p.titulo}</p>
        <p class="section-desc" style="max-width:520px; margin-bottom:14px;">${p.descricaoCompleta || p.descricao}</p>
        <p class="product-price">R$ ${Number(p.preco).toFixed(2)}</p>
        <a class="btn-primary" href="${p.linkCheckout}" target="_blank" rel="noopener">comprar agora</a>
        <p class="form-note" style="margin-top:12px;">pagamento processado pela Cakto — o acesso chega automaticamente no seu e-mail.</p>
      </div>
    </div>
  `;
}

async function render() {
  const produtos = await fetchAll("produtos");
  document.getElementById("produtos-lista").innerHTML =
    produtos.map(produtoHTML).join("") || '<p class="state-msg">nenhum produto cadastrado ainda.</p>';
  initReveal();
}

render();
