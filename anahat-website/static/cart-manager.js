'use strict';

(() => {
  // Prevent initializing the component twice on the same page.
  if (window.AnahatCart) return;

  const CART_KEY = 'anahat_cart';
  const CHECKOUT_KEY = 'anahat_checkout_items';
  const CHECKOUT_URL =
    '/anahat-website/static/assets/pages/checkouts/checkout.html';

  let cart = loadCart();

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCount();
  }

  function money(value) {
    return 'Rs. ' + Number(value || 0).toLocaleString('en-PK');
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[character]));
  }

  function key(item) {
    return `${item.id}::${item.variant || ''}`;
  }

  function updateCount() {
    const count = cart.reduce(
      (total, item) => total + (Number(item.quantity) || 1),
      0
    );

    document.querySelectorAll('[data-cart-count]').forEach(element => {
      element.textContent = count;
      element.hidden = count === 0;
    });
  }

  function add(product, quantity = 1) {
    if (!product || product.id == null || !product.name || product.price == null) {
      alert('Product details are missing. Check its ID, name and price.');
      return;
    }

    const item = {
      id: String(product.id),
      name: String(product.name),
      price: Number(product.price),
      image: product.image || '',
      variant: product.variant || product.size || '',
      quantity: Math.max(1, Number(quantity) || 1),
      selected: true
    };

    const existing = cart.find(saved => key(saved) === key(item));

    if (existing) {
      existing.quantity += item.quantity;
      existing.selected = true;
    } else {
      cart.push(item);
    }

    saveCart();
    render();
    open();
  }

  function selectedItems() {
    return cart.filter(item => item.selected !== false);
  }

  function subtotal() {
    return selectedItems().reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
      0
    );
  }

  function open() {
    document.querySelector('#anahat-cart-overlay')?.classList.add('is-open');
    document.querySelector('#anahat-cart-drawer')?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    render();
  }

  function close() {
    document.querySelector('#anahat-cart-overlay')?.classList.remove('is-open');
    document.querySelector('#anahat-cart-drawer')?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function remove(id, variant = '') {
    cart = cart.filter(item =>
      !(String(item.id) === String(id) &&
        String(item.variant || '') === String(variant || ''))
    );
    saveCart();
    render();
  }

  function changeQuantity(id, variant, change) {
    const item = cart.find(product =>
      String(product.id) === String(id) &&
      String(product.variant || '') === String(variant || '')
    );

    if (!item) return;

    item.quantity = Math.max(1, Number(item.quantity || 1) + change);
    saveCart();
    render();
  }

  function checkout() {
    const items = selectedItems();

    if (!items.length) {
      alert('Please select at least one item to checkout.');
      return;
    }

    localStorage.setItem(CHECKOUT_KEY, JSON.stringify(items));
    window.location.href = CHECKOUT_URL;
  }

  function installStyles() {
    if (document.querySelector('#anahat-cart-styles')) return;

    const style = document.createElement('style');
    style.id = 'anahat-cart-styles';
    style.textContent = `
      #anahat-cart-overlay {
        position:fixed; inset:0; z-index:9998;
        background:rgba(0,0,0,.45); opacity:0; visibility:hidden;
      }
      #anahat-cart-overlay.is-open { opacity:1; visibility:visible; }
      #anahat-cart-drawer {
        position:fixed; z-index:9999; top:0; right:0;
        width:min(440px,100%); height:100vh; background:#fffdf8;
        color:#252820; display:flex; flex-direction:column;
        transform:translateX(105%); transition:transform .25s ease;
        font-family:inherit; box-shadow:-8px 0 25px #0002;
      }
      #anahat-cart-drawer.is-open { transform:translateX(0); }
      #anahat-cart-drawer * { box-sizing:border-box; }
      .ac-header,.ac-footer { padding:18px 20px; border-bottom:1px solid #e5e0d6; }
      .ac-header { display:flex; justify-content:space-between; align-items:center; }
      .ac-header h2 { margin:0; font-size:22px; }
      .ac-close { border:0; background:none; font-size:28px; cursor:pointer; }
      .ac-body { padding:15px 20px; overflow:auto; flex:1; }
      .ac-empty { padding:45px 10px; text-align:center; color:#6c6e64; }
      .ac-select-all { display:flex; gap:8px; align-items:center; margin-bottom:12px; }
      .ac-item { display:grid; grid-template-columns:18px 68px 1fr; gap:10px;
        padding:14px 0; border-bottom:1px solid #e5e0d6; }
      .ac-item img,.ac-placeholder { width:68px; height:82px; object-fit:cover;
        background:#e4e9df; border-radius:4px; }
      .ac-item h3 { margin:0 0 6px; font-size:14px; }
      .ac-item p { margin:4px 0; font-size:13px; }
      .ac-item input { accent-color:#526b58; }
      .ac-controls { display:flex; align-items:center; gap:8px; margin-top:8px; }
      .ac-controls button { cursor:pointer; }
      .ac-qty { display:flex; align-items:center; border:1px solid #ddd; }
      .ac-qty button { width:27px; height:26px; border:0; background:none; }
      .ac-qty span { min-width:22px; text-align:center; font-size:13px; }
      .ac-remove { border:0; background:none; color:#8b5146; text-decoration:underline; }
      .ac-subtotal { display:flex; justify-content:space-between; margin-bottom:14px; }
      .ac-checkout { width:100%; padding:14px; border:0; border-radius:4px;
        background:#526b58; color:white; cursor:pointer; font-weight:600; }
      .ac-checkout:disabled { opacity:.45; cursor:not-allowed; }
      [data-cart-count][hidden] { display:none !important; }
    `;
    document.head.appendChild(style);
  }

  function installMarkup() {
    if (document.querySelector('#anahat-cart-drawer')) return;

    document.body.insertAdjacentHTML('beforeend', `
      <div id="anahat-cart-overlay" data-cart-close></div>
      <aside id="anahat-cart-drawer" aria-label="Shopping bag" role="dialog">
        <header class="ac-header">
          <h2>Your Bag <span id="ac-count">(0)</span></h2>
          <button class="ac-close" type="button" data-cart-close aria-label="Close">×</button>
        </header>
        <div class="ac-body" id="ac-body"></div>
        <footer class="ac-footer" id="ac-footer"></footer>
      </aside>
    `);
  }

  function render() {
    const body = document.querySelector('#ac-body');
    const footer = document.querySelector('#ac-footer');
    const count = document.querySelector('#ac-count');

    if (!body || !footer) return;

    if (count) {
      count.textContent = '(' + cart.reduce(
        (sum, item) => sum + Number(item.quantity || 1), 0
      ) + ')';
    }

    if (!cart.length) {
      body.innerHTML = '<div class="ac-empty">Your bag is empty.</div>';
      footer.innerHTML = '<button class="ac-checkout" data-cart-close>Continue Shopping</button>';
      return;
    }

    body.innerHTML = `
      <label class="ac-select-all">
        <input type="checkbox" data-cart-select-all
          ${cart.every(item => item.selected !== false) ? 'checked' : ''}>
        Select all
      </label>
      ${cart.map(item => `
        <article class="ac-item">
          <input type="checkbox" data-cart-select="${escapeHTML(item.id)}"
            data-cart-variant="${escapeHTML(item.variant || '')}"
            ${item.selected !== false ? 'checked' : ''}>
          ${item.image
            ? `<img src="${escapeHTML(item.image)}" alt="">`
            : '<div class="ac-placeholder"></div>'}
          <div>
            <h3>${escapeHTML(item.name)}</h3>
            ${item.variant ? `<p>Option: ${escapeHTML(item.variant)}</p>` : ''}
            <p>${money(item.price)}</p>
            <div class="ac-controls">
              <div class="ac-qty">
                <button data-cart-qty="-1" data-id="${escapeHTML(item.id)}"
                  data-variant="${escapeHTML(item.variant || '')}">−</button>
                <span>${Number(item.quantity) || 1}</span>
                <button data-cart-qty="1" data-id="${escapeHTML(item.id)}"
                  data-variant="${escapeHTML(item.variant || '')}">+</button>
              </div>
              <button class="ac-remove" data-cart-remove="${escapeHTML(item.id)}"
                data-variant="${escapeHTML(item.variant || '')}">Remove</button>
            </div>
            <p><strong>${money(Number(item.price) * Number(item.quantity || 1))}</strong></p>
          </div>
        </article>
      `).join('')}
    `;

    footer.innerHTML = `
      <div class="ac-subtotal">
        <strong>Subtotal (${selectedItems().length} selected)</strong>
        <strong>${money(subtotal())}</strong>
      </div>
      <button class="ac-checkout" data-cart-checkout
        ${selectedItems().length ? '' : 'disabled'}>
        Proceed to Checkout
      </button>
    `;
  }

  function productDetails(button) {
    const card = button.closest(
      '[data-product-id], .product-card, .product, article'
    ) || button;

    const buttonData = button.dataset;
    const cardData = card.dataset || {};

    const id = buttonData.productId || cardData.productId;
    const name = buttonData.productName || cardData.productName ||
      card.querySelector('.product-name, .product-title, h2, h3')?.textContent?.trim();
    const rawPrice = buttonData.productPrice || cardData.productPrice ||
      card.querySelector('.product-price, .price')?.textContent;
    const image = buttonData.productImage || cardData.productImage ||
      card.querySelector('img')?.getAttribute('src') || '';
    const variant = buttonData.productVariant || cardData.productVariant || '';

    const price = Number(String(rawPrice || '').replace(/[^\d.]/g, ''));

    if (!id || !name || !Number.isFinite(price)) {
      console.error('Cart button needs product ID, name and price:', button);
      alert('This product button needs its product ID, name and price.');
      return null;
    }

    return { id, name, price, image, variant };
  }

  function bindEvents() {
    document.addEventListener('click', event => {
      const addButton = event.target.closest(
        '[data-cart-add], [data-cart-buy-now], [data-add-to-cart], [data-add-to-bag], [data-buy-now]'
      );

      if (addButton) {
        event.preventDefault();
        const product = productDetails(addButton);
        if (product) add(product, addButton.dataset.quantity || 1);
        return;
      }

      if (event.target.closest('[data-cart-open]')) {
        event.preventDefault();
        open();
        return;
      }

      if (event.target.closest('[data-cart-close]')) {
        close();
        return;
      }

      const quantityButton = event.target.closest('[data-cart-qty]');
      if (quantityButton) {
        changeQuantity(
          quantityButton.dataset.id,
          quantityButton.dataset.variant,
          Number(quantityButton.dataset.cartQty)
        );
        return;
      }

      const removeButton = event.target.closest('[data-cart-remove]');
      if (removeButton) {
        remove(removeButton.dataset.cartRemove, removeButton.dataset.variant);
        return;
      }

      if (event.target.closest('[data-cart-checkout]')) checkout();
    });

    document.addEventListener('change', event => {
      if (event.target.matches('[data-cart-select-all]')) {
        cart.forEach(item => { item.selected = event.target.checked; });
        saveCart();
        render();
      }

      if (event.target.matches('[data-cart-select]')) {
        const id = event.target.dataset.cartSelect;
        const variant = event.target.dataset.cartVariant || '';
        const item = cart.find(product =>
          String(product.id) === String(id) &&
          String(product.variant || '') === String(variant)
        );

        if (item) {
          item.selected = event.target.checked;
          saveCart();
          render();
        }
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') close();
    });
  }

  const api = {
    add,
    open,
    close,
    render,
    getCart: () => [...cart],
    getSelectedItems: selectedItems,
    remove,
    updateQuantity: changeQuantity,
    goToCheckout: checkout,
    saveCart(items) {
      cart = Array.isArray(items) ? items : [];
      saveCart();
      render();
    },
    clearCart() {
      cart = [];
      localStorage.removeItem(CHECKOUT_KEY);
      saveCart();
      render();
    }
  };

  function init() {
    installStyles();
    installMarkup();
    bindEvents();
    updateCount();
    render();

    window.AnahatCart = api;
    // Compatibility for existing code that uses CartManager:
    window.CartManager = api;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();