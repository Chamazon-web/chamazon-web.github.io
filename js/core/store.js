// Persistent state (cart + signed-in user) kept in localStorage.
window.Chamazon = window.Chamazon || {};
(function () {
  const CART = 'chamazon.cart';
  const USER = 'chamazon.user';

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }
  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage unavailable (private mode / blocked) - keep going */
    }
  }

  Chamazon.cart = {
    all() { return read(CART, {}); },
    count() { return Object.values(Chamazon.cart.all()).reduce((a, b) => a + b, 0); },
    add(id, qty) {
      const cart = Chamazon.cart.all();
      cart[id] = Math.min((cart[id] || 0) + qty, 99);
      write(CART, cart);
      Chamazon.ui.refreshHeader();
    },
  };

  Chamazon.auth = {
    user() { return read(USER, null); },
    login(name) { write(USER, name); Chamazon.ui.refreshHeader(); },
    logout() {
      try { localStorage.removeItem(USER); } catch (e) { /* ignore */ }
      Chamazon.ui.refreshHeader();
    },
  };
})();
