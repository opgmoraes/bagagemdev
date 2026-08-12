// Injeta o sprite de ícones SVG no início do <body> de qualquer página.
// Uso: <script src="js/icons.js"></script> ou <script src="../js/icons.js"></script>
// O caminho do sprite é calculado a partir do próprio <script>, então funciona
// em qualquer profundidade de pasta (raiz, /areas/, /quiz/ etc).

(async () => {
  try {
    const scriptEl = document.currentScript;
    const base = scriptEl ? scriptEl.src.replace(/js\/icons\.js.*$/, '') : '';
    const res = await fetch(base + 'assets/icons/sprite.svg');
    if (!res.ok) throw new Error(`sprite.svg respondeu ${res.status}`);
    const svgText = await res.text();
    const holder = document.createElement('div');
    holder.innerHTML = svgText;
    document.body.insertBefore(holder.firstElementChild, document.body.firstChild);
  } catch (err) {
    console.warn('Não foi possível carregar o sprite de ícones:', err);
  }
})();
