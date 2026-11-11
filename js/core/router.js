// Tiny hash router. The whole site lives on index.html: changing the route
// swaps the content of #app (or opens a pop-up) without reloading the page.
//   #/                      home
//   #/product/<id>          product page
//   #/buy/<id>?qty=2        UPI payment
//   #/order/<id>?qty=2      order confirmation
//   #/signin, #/membership  pop-ups shown over the current page
window.Chamazon = window.Chamazon || {};
Chamazon.router = (function () {
  const routes = [];
  let token = 0;          // guards against out-of-order async renders
  let basePath = '/';     // last full-page route (what a pop-up closes back to)
  let renderedKey = null; // hash of the page currently on screen
  let modalOpen = false;
  let modalFromPage = false;

  function add(pattern, view) {
    const keys = [];
    const re = new RegExp('^' + pattern.replace(/:(\w+)/g, (_, k) => { keys.push(k); return '([^/]+)'; }) + '$');
    routes.push({ re, keys, view });
  }

  function parse() {
    const raw = location.hash.slice(1) || '/';
    const [path, qs] = raw.split('?');
    return { raw, path, query: Object.fromEntries(new URLSearchParams(qs || '')) };
  }

  function match(path) {
    for (const r of routes) {
      const m = r.re.exec(path);
      if (m) {
        const params = {};
        r.keys.forEach((k, i) => { params[k] = decodeURIComponent(m[i + 1]); });
        return { view: r.view, params };
      }
    }
    return null;
  }

  function go(path) {
    if (location.hash === '#' + path) resolve();
    else location.hash = path;
  }

  function replace(path) {
    location.replace(location.pathname + location.search + '#' + path);
  }

  async function showPage(view, ctx) {
    const my = ++token;
    await Chamazon.styles.use(view.css(ctx));
    if (my !== token) return;
    document.title = view.title(ctx);
    document.getElementById('app').innerHTML = view.render(ctx);
    window.scrollTo(0, 0);
    if (view.mount) view.mount(document.getElementById('app'), ctx);
    Chamazon.ui.refreshHeader();
  }

  function showModal(view, ctx) {
    const root = document.getElementById('modal-root');
    root.innerHTML = view.render(ctx);
    document.body.classList.add('modal-open');
    modalOpen = true;
    if (view.mount) view.mount(root, ctx);
    Chamazon.ui.refreshHeader();
  }

  function hideModal() {
    if (!modalOpen) return;
    document.getElementById('modal-root').innerHTML = '';
    document.body.classList.remove('modal-open');
    modalOpen = false;
  }

  async function resolve() {
    const { raw, path, query } = parse();
    const found = match(path);
    if (!found) { replace('/'); return; }
    const ctx = { path, query, params: found.params };
    const view = found.view;
    if (view.load && view.load(ctx) === false) { replace('/'); return; }

    if (view.modal) {
      if (renderedKey === null) {           // opened by URL on a fresh load
        modalFromPage = false;
        basePath = '/';
        renderedKey = '/';
        await showPage(Chamazon.views.home, { path: '/', query: {}, params: {} });
      } else {
        modalFromPage = true;
      }
      hideModal();
      showModal(view, ctx);
      return;
    }

    const wasModal = modalOpen;
    hideModal();
    basePath = raw;
    if (wasModal && renderedKey === raw) return; // closed a pop-up: page is already there
    renderedKey = raw;
    await showPage(view, ctx);
  }

  return {
    add, go, replace,
    start() {
      window.addEventListener('hashchange', resolve);
      resolve();
    },
    /** Close the open pop-up and return to the page underneath. */
    closeModal() {
      if (!modalOpen) return;
      if (modalFromPage) history.back();
      else go(basePath);
    },
  };
})();
