# Chamazon

A demo online shopping site built as a **single-page app**: there is only one
page (`index.html`). Clicking around swaps the content in place - no page
reloads and no separate HTML file per page. Plain HTML, CSS and JavaScript, no
build step.

## Run it

Opening `index.html` directly in a browser works. A local server is also fine:

```bash
npm start              # needs Node.js, serves on http://localhost:3000
# or
npm run start:python   # needs Python 3
```

## How navigation works

The URL hash decides what is on screen, so refresh and the browser Back button
both work:

| URL                      | Shows                                    |
| ------------------------ | ---------------------------------------- |
| `#/`                     | Home (product grid, search)              |
| `#/product/<id>`         | Product page, e.g. `#/product/iphone`    |
| `#/buy/<id>?qty=2`       | UPI payment                              |
| `#/order/<id>?qty=2`     | Order confirmation                       |
| `#/signin`               | Sign-in pop-up over the current page     |
| `#/membership`           | Membership pop-up over the current page  |

Sign-in and Membership are real pop-ups: close them with X, Esc or a click on
the dark backdrop and you are back on the page you were on.

## Project structure

```
chamazon/
├── index.html              The only page: <div id="app"> + <div id="modal-root">
├── css/
│   ├── base.css            Always loaded
│   ├── signin.css          Pop-up styles (scoped to the pop-up)
│   ├── membership.css      Pop-up styles (scoped to the pop-up)
│   ├── home.css, buy.css, order.css
│   ├── product.css         Shared by iphone, macbook, powerbank, vr, neckbands, mouse
│   └── products/           Own stylesheets for the other 10 products
├── js/
│   ├── data/products.js    Product catalogue (the only place product info lives)
│   ├── core/
│   │   ├── util.js         Price formatting, image paths, helpers
│   │   ├── store.js        Cart + signed-in user (localStorage)
│   │   ├── styles.js       Switches the active stylesheet per view
│   │   └── router.js       Hash router
│   ├── views/
│   │   ├── layout.js       Shared headers / footers
│   │   ├── home.js         Home page + live search
│   │   ├── product.js      Product page (quantity, cart, thumbnails)
│   │   ├── checkout.js     Payment + order confirmation
│   │   └── modals.js       Sign-in and Membership pop-ups
│   └── app.js              Global click/keyboard handling, starts the router
└── assets/images/          Product and site images
```

## Adding a product

1. Add an entry to `js/data/products.js` (copy an existing one).
2. Put its image in `assets/images/`.

The home grid, product page, payment and order pages all pick it up
automatically.

## Notes

- Demo only: sign-in and payment are not real and there is no backend.
- A few product pages load one thumbnail from `m.media-amazon.com` (needs internet).
- Font Awesome icons load from a CDN.
