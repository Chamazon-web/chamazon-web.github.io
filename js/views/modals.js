// Sign-in and Membership open as pop-ups over whatever page you are on.
(function () {
  const closeButton = (cls) =>
    `<div class="${cls}"><p><a role="button" tabindex="0" data-close>X</a></p></div>`;

  Chamazon.views.signin = {
    modal: true,
    render() {
      const user = Chamazon.auth.user();
      if (user) {
        return `
<div class="sign-in-overlay" data-overlay>
    <div class="login-box">
        ${closeButton('sign-in-close')}
        <h2>Hello, ${Chamazon.util.esc(user)}</h2>
        <form id="signout-form">
            <button class="submit-btn">Sign out</button>
        </form>
    </div>
</div>`;
      }
      return `
<div class="sign-in-overlay" data-overlay>
    <div class="login-box">
        ${closeButton('sign-in-close')}
        <h2>Sign-in</h2>
        <form id="signin-form" novalidate>
            <p class="form-error" hidden></p>
            <input type="text" id="user-id" placeholder="Chamazon ID" autocomplete="username">
            <input type="password" id="password" placeholder="Password" autocomplete="current-password">
            <button class="submit-btn">Login</button>
        </form>
    </div>
</div>`;
    },

    mount(root) {
      const signin = root.querySelector('#signin-form');
      const signout = root.querySelector('#signout-form');
      if (signin) {
        const error = signin.querySelector('.form-error');
        signin.addEventListener('submit', (e) => {
          e.preventDefault();
          const id = signin.querySelector('#user-id').value.trim();
          const pw = signin.querySelector('#password').value;
          if (!id || !pw) {
            error.textContent = 'Please enter your Chamazon ID and password.';
            error.hidden = false;
            return;
          }
          // Demo site: no backend, so any ID/password "signs in".
          Chamazon.auth.login(id);
          Chamazon.router.closeModal();
        });
        signin.querySelector('#user-id').focus();
      }
      if (signout) {
        signout.addEventListener('submit', (e) => {
          e.preventDefault();
          Chamazon.auth.logout();
          Chamazon.router.closeModal();
        });
      }
    },
  };

  Chamazon.views.membership = {
    modal: true,
    render() {
      return `
<div class="membership-overlay" data-overlay>
    <div class="membership-card">
        ${closeButton('membership-close')}
        <div class="premium-icon">♛</div>
        <h1>Premium</h1>
        <p class="premium-subtitle">More benefits. A better you.</p>
        <div class="plans">
            <div class="plan active">
                <h3>Weekly</h3>
                <span>₹99 / week</span>
            </div>
            <div class="plan">
                <h3>Monthly</h3>
                <span>₹199 / month</span>
            </div>
            <div class="plan yearly">
                <div class="best-value">Best Value</div>
                <h3>Yearly</h3>
                <span>₹1,499 / year</span>
            </div>
        </div>
        <div class="benefits">
            <div class="benefit">
                <div class="benefit-icon delivery">🚚</div>
                <div>
                    <h3>Free &amp; Faster Delivery</h3>
                    <p>Get free and faster delivery on eligible orders.</p>
                </div>
            </div>
            <div class="benefit">
                <div class="benefit-icon access">⚡</div>
                <div>
                    <h3>Early Access</h3>
                    <p>Be the first to access exclusive deals and offers.</p>
                </div>
            </div>
            <div class="benefit">
                <div class="benefit-icon entertainment">▶</div>
                <div>
                    <h3>Entertainment</h3>
                    <p>Enjoy movies, shows and exclusive content.</p>
                </div>
            </div>
            <div class="benefit">
                <div class="benefit-icon offers">♛</div>
                <div>
                    <h3>Exclusive Offers</h3>
                    <p>Special discounts only for Premium members.</p>
                </div>
            </div>
        </div>
        <div class="subscription-box">
            <div class="price">₹99 <span>/ week</span></div>
            <button class="subscribe-btn">Subscribe Now</button>
            <p>Cancel anytime. <a href="#">Terms and conditions apply.</a></p>
        </div>
    </div>
</div>`;
    },

    mount(root) {
      const plans = Array.from(root.querySelectorAll('.plan'));
      const price = root.querySelector('.subscription-box .price');
      const subscribe = root.querySelector('.subscribe-btn');
      plans.forEach((plan) => {
        plan.style.cursor = 'pointer';
        plan.addEventListener('click', () => {
          plans.forEach((p) => p.classList.remove('active'));
          plan.classList.add('active');
          const [amount, ...rest] = plan.querySelector('span').textContent.split(' ');
          price.innerHTML = amount + ' <span>' + rest.join(' ') + '</span>';
        });
      });
      subscribe.addEventListener('click', () => {
        subscribe.textContent = 'Subscribed ✓';
        subscribe.disabled = true;
      });
    },
  };

  Chamazon.router.add('/signin', Chamazon.views.signin);
  Chamazon.router.add('/membership', Chamazon.views.membership);
})();
