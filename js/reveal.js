// Reveal ao scroll — compartilhado entre todas as páginas.
// Usa Intersection Observer com stagger em cards
// Chame initReveal() depois que o conteúdo dinâmico já estiver no DOM.
//
// Blindado: se o IntersectionObserver não existir, ou qualquer coisa aqui
// falhar, o conteúdo é revelado imediatamente. Uma animação de entrada
// nunca deve deixar o site com conteúdo invisível.

function revealAll(elements) {
  elements.forEach((el) => {
    if (el.classList.contains('card-grid') || el.classList.contains('bento-grid')) {
      el.querySelectorAll('.resource-card, .bento-card').forEach((card) => {
        card.classList.add('reveal-in');
      });
    }
    el.classList.add('reveal-in');
  });
}

export function initReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal:not([data-reveal-bound]), .card-grid:not([data-reveal-bound]), .bento-grid:not([data-reveal-bound])'
  );

  if (!revealElements.length) return;

  // Sem suporte a IntersectionObserver: revela tudo direto, sem animação.
  if (typeof IntersectionObserver === 'undefined') {
    revealElements.forEach((el) => el.setAttribute('data-reveal-bound', 'true'));
    revealAll(revealElements);
    return;
  }

  try {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealAll([entry.target]);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => {
      el.setAttribute('data-reveal-bound', 'true');
      observer.observe(el);

      // Elemento já visível no carregamento (acima da dobra)
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        revealAll([el]);
        observer.unobserve(el);
      }
    });
  } catch (err) {
    // Qualquer erro inesperado: garante que o conteúdo apareça mesmo assim.
    console.warn('Reveal falhou, revelando conteúdo sem animação:', err);
    revealElements.forEach((el) => el.setAttribute('data-reveal-bound', 'true'));
    revealAll(revealElements);
  }
}
