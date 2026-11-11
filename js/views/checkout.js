// Checkout: UPI payment page, then order confirmation.
(function () {
  const loadProduct = (ctx) => {
    ctx.product = Chamazon.util.byId(ctx.params.id);
    ctx.qty = Chamazon.util.qty(ctx.query.qty);
    return !!ctx.product;
  };

  Chamazon.views.buy = {
    css: () => 'css/buy.css',
    title: () => 'Chamazon Buy',
    load: loadProduct,
    render(ctx) {
      return `
<div class="upi-container">
  <div class="upi-title">Pay via UPI</div>

  <div class="qr-box">
    <div class="qr-placeholder">
      <img src="${Chamazon.util.img('Qr.png')}" alt="UPI QR code" height="300px">
    </div>
  </div>

  <div class="upi-subtitle">Scan the QR code to pay</div>

  <div class="upi-footer">
    <a href="#/order/${ctx.product.id}?qty=${ctx.qty}"><div class="button">Proceed</div></a>
  </div>
  <div class="check">You can proceed after payment</div>
</div>`;
    },
  };

  Chamazon.views.order = {
    css: () => 'css/order.css',
    title: () => 'Chamazon-Order Placed',
    load: loadProduct,
    render(ctx) {
      const { esc, price } = Chamazon.util;
      const p = ctx.product;
      // Delivery estimate: 3 days from today.
      const eta = new Date();
      eta.setDate(eta.getDate() + 3);
      const delivery = eta.toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      });
      return `
<header class="navbar">
    <div class="logo">Chamazon<span>.in</span></div>
    <div class="cart">🛒 Your Orders</div>
</header>
<main class="container">
    <div class="success-icon">✓</div>
    <h1>Order placed successfully!</h1>
    <p class="message">
        Thank you for shopping with us.<br>
        Your order has been placed successfully.
    </p>
    <p class="order-id">Order ID: ${p.orderId}</p>
    <section class="order-card">
        <h2>Order Details</h2>
        <div class="detail">
            <span class="label">Product</span>
            <strong>${esc(p.orderName)}</strong>
        </div>
        <div class="detail">
            <span class="label">Quantity</span>
            <strong>${ctx.qty}</strong>
        </div>
        <div class="detail">
            <span class="label">Payment Method</span>
            <strong>UPI</strong>
        </div>
        <div class="detail">
            <span class="label">Total Amount</span>
            <strong>${price(p.price * ctx.qty)}</strong>
        </div>
        <div class="delivery">
            <h3>🚚 Expected Delivery</h3>
            <p>${delivery}</p>
            <p>Your package is being prepared.</p>
        </div>
    </section>
    <a href="#/" class="button">Continue Shopping</a>
    <p class="footer">This is a demo order confirmation page.</p>
</main>`;
    },
  };

  Chamazon.router.add('/buy/:id', Chamazon.views.buy);
  Chamazon.router.add('/order/:id', Chamazon.views.order);
})();
