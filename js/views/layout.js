// Shared page chrome (headers, panels, footers) and live header updates.
window.Chamazon = window.Chamazon || {};
Chamazon.views = Chamazon.views || {};
Chamazon.ui = {
  /** Keep cart count + "Hello, <name>" in sync everywhere on screen. */
  refreshHeader() {
    const n = Chamazon.cart.count();
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = n > 0 ? '(' + n + ')' : '';
    });
    const user = Chamazon.auth.user();
    document.querySelectorAll('[data-hello]').forEach((el) => {
      el.textContent = user ? 'Hello, ' + user : 'Hello, sign in';
    });
  },

  /** Wire a header search box. onSearch(text) is called on typing / Enter / click. */
  bindSearch(root, { live, onSearch }) {
    const input = root.querySelector('.nav-search input');
    const icon = root.querySelector('.search-icon');
    if (!input) return null;
    if (live) input.addEventListener('input', () => onSearch(input.value));
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') onSearch(input.value); });
    if (icon) icon.addEventListener('click', () => onSearch(input.value));
    return input;
  },
};

Chamazon.layout = {
  homeHeader() {
    return `
    <header>
        <div class="navbar">
            <div class="nav-logo"><div class="logo"></div></div>
            <div class="nav-address border">
                <div class="add-icon"><i class="fa-solid fa-location-dot"></i></div>
                <div class="address">
                    <p class="add-first">Deliver To</p>
                    <p class="add-second">India</p>
                </div>
            </div>
            <div class="nav-search">
                <select class="search-select"><option>All</option></select>
                <input placeholder="Search Chamazon">
                <div class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
            </div>
            <div class="nav-sign-in border">
                <a href="#/signin"><p><span data-hello>Hello, sign in</span></p>
                <p class="nav-second">Accounts &amp; Lists</p></a>
            </div>
            <div class="nav-return border">
                <p><span>Returns</span></p>
                <p class="nav-second">&amp; Orders</p>
            </div>
            <div class="nav-cart border">
                <i class="fa-solid fa-cart-shopping"></i>
                Cart <span data-cart-count></span>
            </div>
        </div>
    </header>
    <div class="panel">
        <div class="panel-all border"><i class="fa-solid fa-bars"></i> All</div>
        <div class="panel-ops border">
            <p>Today's Deals</p>
            <p>Shop Deals in Electronics</p>
            <p>Registry</p>
            <p>Gift Cards</p>
            <p>Sell</p>
        </div>
        <div class="panel-deals border">
            <p><a href="#/membership">Membership</a></p>
        </div>
    </div>`;
  },

  homeFooter() {
    return `
    <footer>
        <div class="base"><a href="#/" data-action="top">Back to top</a></div>
        <div class="footer-content">
            <ul>
                <h3>Get to Know Us</h3>
                <p>About Us</p>
                <p>Careers</p>
                <p>About chamazon</p>
            </ul>
            <ul>
                <h3>Connect with Us</h3>
                <p>Facebook</p>
                <p>Instagram</p>
                <p>Twitter</p>
            </ul>
            <ul>
                <h3>Make Money with Us</h3>
                <p>Sell Products on Chamazon</p>
                <p>Become an Affiliate</p>
                <p>Advertise Your Products</p>
                <p>Sell on Chamazon Business</p>
                <p>Self-Publish with Us</p>
            </ul>
            <ul>
                <h3>Let Us Help You</h3>
                <p>Your Account</p>
                <p>Your Orders</p>
                <p>Returns &amp;<br> Replacement</p>
                <p>Chamazon Assistant</p>
                <p>Help</p>
            </ul>
        </div>
        <div class="copyright">© 2026 Chamazon. All Rights Reserved.</div>
    </footer>`;
  },

  productHeader() {
    return `
  <header>
    <div class="navbar">
        <div class="nav-logo"><div class="logo"></div></div>
        <div class="nav-address border">
            <div class="add-icon"><i class="fa-solid fa-location-dot"></i></div>
            <div class="address">
                <p class="add-first">Deliver To</p>
                <p class="add-second">India</p>
            </div>
        </div>
        <div class="nav-search">
            <select><option>All</option></select>
            <input placeholder="Search Chamazon">
            <div class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
        </div>
        <div class="nav-sign-in border">
            <a href="#/signin"><p><span data-hello>Hello, sign in</span></p>
            <p class="nav-second">Accounts &amp; Lists</p></a>
        </div>
        <div class="nav-return border">
            <p><span>Returns</span></p>
            <p class="nav-second">&amp; Orders</p>
        </div>
        <div class="nav-cart border">
            <i class="fa-solid fa-cart-shopping"></i>
            Cart <span data-cart-count></span>
        </div>
    </div>
  </header>
  <div class="panel">
    <div class="panel-all border">
        <a href="#/"><div class="home-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="23" fill="white">
                <rect x="15" y="4" width="2.5" height="5" />
                <path d="M12 3L2 12h3v8h14v-8h3L12 3mz 17h-4v-5h4v5z" />
            </svg><p>Home</p>
        </div></a>
    </div>
    <div class="panel-ops border">
        <p>Today's Deals</p>
        <p>Shop Deals in Electronics</p>
        <p>Registry</p>
        <p>Gift Cards</p>
        <p>Sell</p>
    </div>
    <div class="panel-deals border">
        <a href="#/membership">Membership</a>
    </div>
  </div>`;
  },

  productFooter() {
    return `
<footer>
    <div class="back"><a href="#/" data-action="top">Back to top</a></div>
    <div class="footer-content">
        <div>
            <h3>Get to Know Us</h3>
            <p>About Us</p>
            <p>Careers</p>
            <p>Press Releases</p>
        </div>
        <div>
            <h3>Connect with Us</h3>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
        </div>
        <div>
            <h3>Make Money with Us</h3>
            <p>Sell Products</p>
            <p>Become an Affiliate</p>
            <p>Advertise Products</p>
        </div>
        <div>
            <h3>Let Us Help You</h3>
            <p>Your Account</p>
            <p>Returns Centre</p>
            <p>Help</p>
        </div>
    </div>
    <div class="copyright">© 2026 Chamazon. All Rights Reserved.</div>
</footer>`;
  },
};
