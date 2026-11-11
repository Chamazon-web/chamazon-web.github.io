// Home page: hero + product grid with live search.
Chamazon.views.home = {
  css: () => 'css/home.css',
  title: () => 'Chamazon',

  render() {
    const { esc, img } = Chamazon.util;
    const boxes = Chamazon.products.map((p, i) => `
        <div class="box${i + 1} box" data-product="${p.id}">
            <div class="box-content">
                <h2>${esc(p.name)}</h2>
                <div class="box-img" style="background-image: url('${img(p.gridImage)}');"></div>
                <p><a href="#/product/${p.id}">Buy Now</a></p>
            </div>
        </div>`).join('');

    return `${Chamazon.layout.homeHeader()}
    <div class="hero-section">
        <img class="hero-img" src="${img('hero.png')}" alt="Chamazon deals">
        <div class="hero-msg">
            <p>You are on chamazon.com. You can also shop on Chamazon India for millions of products with fast local delivery.<a href="#/"> Click here to go to chamazon.in</a></p>
        </div>
    </div>
    <div class="shop-section">${boxes}
    </div>
    ${Chamazon.layout.homeFooter()}`;
  },

  mount(root, ctx) {
    const grid = root.querySelector('.shop-section');
    const boxes = Array.from(grid.querySelectorAll('.box'));

    function filter(text) {
      const q = text.trim().toLowerCase();
      let visible = 0;
      boxes.forEach((box) => {
        const show = !q || box.querySelector('h2').textContent.toLowerCase().includes(q);
        box.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      let msg = grid.querySelector('.no-results');
      if (!visible) {
        if (!msg) {
          msg = document.createElement('p');
          msg.className = 'no-results';
          msg.style.cssText = 'grid-column:1/-1;padding:24px;text-align:center;font-size:1.1rem;';
          grid.appendChild(msg);
        }
        msg.textContent = 'No products match "' + text.trim() + '".';
      } else if (msg) {
        msg.remove();
      }
    }

    const input = Chamazon.ui.bindSearch(root, { live: true, onSearch: filter });
    if (input && ctx.query.q) { input.value = ctx.query.q; filter(ctx.query.q); }
  },
};
Chamazon.router.add('/', Chamazon.views.home);
