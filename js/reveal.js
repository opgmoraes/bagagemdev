// Reveal ao scroll — compartilhado entre todas as páginas.
// Usa Intersection Observer com stagger em cards
// Chame initReveal() depois que o conteúdo dinâmico já estiver no DOM.

export function initReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Se for um container com múltiplos cards, fazer stagger
        if (element.classList.contains('card-grid') || element.classList.contains('bento-grid')) {
          const cards = element.querySelectorAll('.resource-card, .bento-card');
          cards.forEach((card, cardIndex) => {
            const delay = cardIndex * 80; // 80ms stagger
            card.style.animationDelay = `${delay}ms`;
            card.classList.add('reveal-in');
          });
        } else {
          // Para elementos individuais
          element.classList.add('reveal-in');
        }

        // Remover listener após animar
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Observar .reveal e .card-grid
  const revealElements = document.querySelectorAll('.reveal:not([data-reveal-bound]), .card-grid:not([data-reveal-bound]), .bento-grid:not([data-reveal-bound])');
  revealElements.forEach((el) => {
    el.setAttribute('data-reveal-bound', 'true');
    observer.observe(el);

    // Check se já está em viewport (para elementos acima do fold)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      if (el.classList.contains('card-grid') || el.classList.contains('bento-grid')) {
        const cards = el.querySelectorAll('.resource-card, .bento-card');
        cards.forEach((card, idx) => {
          card.style.animationDelay = `${idx * 80}ms`;
          card.classList.add('reveal-in');
        });
      } else {
        el.classList.add('reveal-in');
      }
      observer.unobserve(el);
    }
  });
}
