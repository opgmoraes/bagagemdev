// Menu hambúrguer mobile — compartilhado por todas as páginas públicas.
// Uso: <script src="js/nav.js"></script> depois do <nav>.

(() => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha o menu ao clicar em qualquer link (útil em navegação de página única)
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();
