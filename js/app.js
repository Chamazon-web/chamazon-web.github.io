// Entry point: global behaviour, then start the router.
document.addEventListener('click', (e) => {
  const t = e.target;

  // "Back to top" links
  const top = t.closest('[data-action="top"]');
  if (top) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Clicking the logo goes home
  if (t.closest('.nav-logo')) {
    Chamazon.router.go('/');
    return;
  }

  // X button, or a click on the dark backdrop, closes a pop-up
  if (t.closest('[data-close]') || t.hasAttribute('data-overlay')) {
    Chamazon.router.closeModal();
  }

  // Links that point at "#" (placeholders) should not change the route
  const a = t.closest('a');
  if (a && a.getAttribute('href') === '#') e.preventDefault();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') Chamazon.router.closeModal();
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-close]')) {
    e.preventDefault();
    Chamazon.router.closeModal();
  }
});

Chamazon.router.start();
