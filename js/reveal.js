// Reveal ao scroll — compartilhado entre todas as páginas.
// Chame initReveal() depois que o conteúdo dinâmico já estiver no DOM.

export function initReveal() {
  const reveals = document.querySelectorAll(".reveal:not([data-reveal-bound])");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((el) => {
    el.setAttribute("data-reveal-bound", "true");
    observer.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add("in");
  });
}
