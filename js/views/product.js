// Product page, rendered from the catalogue entry for #/product/<id>.
Chamazon.views.product = {
  css: (ctx) => ctx.cssFile,
  title: (ctx) => 'Chamazon - ' + ctx.product.name,

  load(ctx) {
    ctx.product = Chamazon.util.byId(ctx.params.id);
    if (!ctx.product) return false;
    // A few products ship their own tweaked stylesheet.
    ctx.cssFile = Chamazon.views.product.customCss.includes(ctx.product.id)
      ? 'css/products/' + ctx.product.id + '.css'
      : 'css/product.css';
    return true;
  },
  customCss: ['floormate', 'wallclock', 'softtoys', 'toys', 'controller', 'bags', 'shoe', 'smartwatch', 'jacket', 'airpods'],

  render(ctx) {
    const { esc, img, price } = Chamazon.util;
    const p = ctx.product;
    const thumbs = p.images.map((src, i) => `
            <div class="thumb${i === 0 ? ' active' : ''}" data-src="${esc(src)}">
                <img src="${esc(img(src))}">
            </div>`).join('');
    const about = p.about.map((t) => `<li>${esc(t)}</li>`).join('\n            ');
    const offer = p.bankOffer > 0 ? `
        <div class="offer-box">
            <h3>Bank Offer</h3>
            <p>Get extra ${price(p.bankOffer)} off on selected bank cards.</p>
            <a href="#">See all offers</a>
        </div>` : '';

    return `${Chamazon.layout.productHeader()}

<div class="breadcrumb">
    ${p.breadcrumb.map(esc).join(' › ')}
</div>
<main class="product-container">
    <section class="product-images">
        <div class="thumbnail-list">${thumbs}
        </div>
        <div class="main-image">
            <img src="${esc(img(p.images[0]))}">
        </div>
    </section>

    <section class="product-info">
        <h1>${esc(p.title)}</h1>
        <p class="brand">Visit the <a href="#">Chamazon Store</a></p>
        <div class="rating-row">
            <span class="rating">${p.rating} ★</span>
            <a href="#"> ${p.ratingCount.toLocaleString('en-IN')} ratings</a>
            <span>|</span>
            <a href="#"> Search this page</a>
        </div>
        <hr>
        <p class="deal">Limited time deal</p>
        <div class="price">
            <span class="discount">${esc(p.discount)}</span>
            <span class="amount">${price(p.price)}</span>
        </div>
        <p class="mrp">M.R.P.: <s>${price(p.mrp)}</s></p>
        <p>Inclusive of all taxes</p>
        ${offer}
        <div class="feature">
            <div>🚚 <b>Free Delivery</b></div>
            <div>🔄 <b>No Replacement</b></div>
            <div>🛡️ <b>NO Warranty</b></div>
            <div>💳 <b>Secure Payment</b></div>
        </div>
        <hr>
        <h3>About this item</h3>
        <ul>
            ${about}
        </ul>
    </section>

    <aside class="buy-box">
        <div class="buy-price">${price(p.price)}</div>
        <p><span class="blue">FREE delivery</span> <b> Tomorrow.</b></p>
        <p>📍 Deliver to <b>India 121001</b></p>
        <h3 class="stock">In Stock</h3>
        <label>Quantity:</label>
        <select class="quantity" id="qty">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
        </select>
        <button class="cart-btn" id="add-to-cart">Add to Cart</button>
        <a href="#/buy/${p.id}" id="buy-link"><button class="buy-btn">Buy Now</button></a>
        <div class="secure">🔒 Secure transaction</div>
        <div class="seller">
            <p>Ships from <b>Chamazon</b></p>
            <p>Sold by <b>Chamazon Retail</b></p>
            <p>Payment <b>Secure payment</b></p>
        </div>
        <button class="wishlist">♡ Add to Wish List</button>
    </aside>
</main>

<section class="description">
    <h2>Product Description</h2>
    <p>${esc(p.description)}</p>
</section>

${Chamazon.layout.productFooter()}`;
  },

  mount(root, ctx) {
    const p = ctx.product;
    const qty = root.querySelector('#qty');
    const buy = root.querySelector('#buy-link');
    const add = root.querySelector('#add-to-cart');
    const mainImg = root.querySelector('.main-image img');

    const selectedQty = () => parseInt(qty.value, 10) || 1;
    qty.addEventListener('change', () => { buy.href = '#/buy/' + p.id + '?qty=' + selectedQty(); });

    add.addEventListener('click', () => {
      Chamazon.cart.add(p.id, selectedQty());
      const label = add.textContent;
      add.textContent = 'Added ✓';
      add.disabled = true;
      setTimeout(() => { add.textContent = label; add.disabled = false; }, 1200);
    });

    // Click a thumbnail to show it as the main image.
    root.querySelectorAll('.thumb').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        root.querySelectorAll('.thumb').forEach((t) => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImg.src = Chamazon.util.img(thumb.dataset.src);
      });
    });

    // Searching from a product page takes you to the home grid, filtered.
    Chamazon.ui.bindSearch(root, {
      live: false,
      onSearch: (text) => Chamazon.router.go('/' + (text.trim() ? '?q=' + encodeURIComponent(text.trim()) : '')),
    });
  },
};
Chamazon.router.add('/product/:id', Chamazon.views.product);
