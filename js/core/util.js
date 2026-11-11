// Small helpers shared by all views.
window.Chamazon = window.Chamazon || {};
Chamazon.util = {
  /** Escape text for safe use inside HTML. */
  esc(value) {
    return String(value).replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  },

  /** Image path: external URLs are used as-is, local names live in assets/images. */
  img(name) {
    return /^https?:/.test(name) ? name : 'assets/images/' + name;
  },

  /** 156100 -> "₹1,56,100" */
  price(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  },

  /** Clamp a quantity coming from the URL to 1-4 (same as the dropdown). */
  qty(value) {
    const n = parseInt(value, 10);
    return Number.isFinite(n) ? Math.min(Math.max(n, 1), 4) : 1;
  },

  byId(id) {
    return Chamazon.products.find((p) => p.id === id) || null;
  },
};
