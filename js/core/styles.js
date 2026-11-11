// Each view brings its own stylesheet. Only the active one is enabled, so the
// pages' global rules (body, .navbar, ...) never clash with each other.
window.Chamazon = window.Chamazon || {};
Chamazon.styles = (function () {
  const links = {};

  function load(href) {
    if (links[href]) return Promise.resolve(links[href]);
    return new Promise((resolve) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.view = '1';
      const done = () => { links[href] = link; resolve(link); };
      link.onload = done;
      link.onerror = done; // never block navigation on a missing sheet
      document.head.appendChild(link);
    });
  }

  return {
    /** Enable `href` (loading it first if needed) and disable all other view sheets. */
    async use(href) {
      const active = await load(href);
      Object.values(links).forEach((l) => { l.disabled = l !== active; });
    },
  };
})();
