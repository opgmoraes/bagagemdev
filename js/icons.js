// Injeta o sprite de ícones SVG no início do <body> de qualquer página.
// Uso: <script src="js/icons.js"></script> logo após abrir o <body>.

(async () => {
  try {
    const res = await fetch('assets/icons/sprite.svg');
    const svgText = await res.text();
    const holder = document.createElement('div');
    holder.innerHTML = svgText;
    document.body.insertBefore(holder.firstElementChild, document.body.firstChild);
  } catch (err) {
    console.warn('Não foi possível carregar o sprite de ícones:', err);
  }
})();
