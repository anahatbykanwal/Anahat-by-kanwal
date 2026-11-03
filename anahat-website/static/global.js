console.log("global.js is running!");

document.addEventListener("DOMContentLoaded", () => {
  // Load Header Component
  loadComponent(
    "header-placeholder",
    "/anahat-website/templates/componenets/header.html",
    updateHeaderCartCount
  );

  // Load Review Component
 loadComponent(
  "review-placeholder",
  "/anahat-website/templates/componenets/review.html",
  () => {
    if (typeof initReviewCarousel === "function") {
      initReviewCarousel();
    }
  }
);

  // Load Footer Component
  loadComponent(
    "footer-placeholder",
    "/anahat-website/templates/componenets/footer.html"
  );
});

/**
 * Reusable function to fetch component HTML and insert into placeholder
 */
function loadComponent(placeholderId, filePath, callback) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;

  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}`);
      }
      return response.text();
    })
    .then((htmlData) => {
      placeholder.innerHTML = htmlData;
      if (callback && typeof callback === "function") {
        callback();
      }
    })
    .catch((error) => console.error("Component loading error:", error));
}

// --- 1. GET & SAVE CART (LocalStorage Management) ---
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("anahat_cart")) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("anahat_cart", JSON.stringify(cart));
  updateHeaderCartCount();
}

// --- 2. UPDATE HEADER BAG BADGE / COUNT ---
function updateHeaderCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 1), 0);
  
  const countElements = document.querySelectorAll("#cartCountBadge, .bag-count, .cart-counter");
  countElements.forEach(el => {
    el.textContent = totalItems;
    el.style.display = totalItems > 0 ? "inline-flex" : "none";
  });
}

// --- 3. GLOBAL ADD TO CART FUNCTION ---
function addToCart(product, quantity = 1) {
  let cart = getCart();
  
  const existingIndex = cart.findIndex(item => item.id === product.id && item.size === product.size);
  
  if (existingIndex > -1) {
    cart[existingIndex].quantity += parseInt(quantity);
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      mainImage: product.mainImage || product.image || "",
      size: product.size || "S",
      quantity: parseInt(quantity),
      category: product.category || ""
    });
  }
  
  saveCart(cart);
}

// --- 4. HEADER CART ICON CLICK (Directly go to Checkout or Cart page) ---
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderCartCount();
  
  // Header cart icon click par direct checkout page par le jayein
  document.addEventListener("click", (e) => {
    const cartTrigger = e.target.closest("#headerCartBtn, .cart-btn, .bag-icon, [data-action='open-cart']");
    if (cartTrigger) {
      e.preventDefault();
      window.location.href = "/anahat-website/static/assets/pages/checkouts/checkout.html";
    }
  });
});


// =======================================================================================================
// Header Search function
// =======================================================================================================

function initGlobalSearch() {
  const searchInput = document.getElementById("headerSearchInput");
  const searchBtn = document.getElementById("headerSearchBtn");

  if (!searchInput) return;

  const handleSearch = () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) return;

    const isCollectionPage = window.location.href.includes("collectionproduct.html");

    if (isCollectionPage) {
      if (typeof PRODUCTS_DATA !== "undefined") {
        const filtered = PRODUCTS_DATA.filter(p => 
          p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
        );
        const grid = document.getElementById("productGrid");
        const emptyState = document.getElementById("emptyState");
        
        if (grid && typeof generateProductGridHTML === "function") {
          if (filtered.length === 0) {
            grid.innerHTML = "";
            if (emptyState) emptyState.hidden = false;
          } else {
            if (emptyState) emptyState.hidden = true;
            grid.innerHTML = generateProductGridHTML(filtered);
          }
        }
      }
    } else {
      window.location.href = `/anahat-website/static/assets/pages/Collections/collectionproduct.html?search=${encodeURIComponent(query)}`;
    }
  };

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  });

  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleSearch();
    });
  }
}

loadComponent("header-placeholder", "/anahat-website/templates/componenets/header.html", () => {
  updateHeaderCartCount();
  setTimeout(() => {
    initGlobalSearch();
  }, 100);
});



// =======================================================================================================
//  Review Carousel & Form Handling (LocalStorage based reviews)
// =======================================================================================================


document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initGlobalReviews, 400);
});

function initGlobalReviews() {
  const defaultReviews = [
    {
      name: "Pedro Santos",
      city: "GRANADA",
      rating: 5,
      comment: "Sin duda repetiríamos. Nos ha gustado lo bien equipada que estaba. Además fueron muy amables."
    },
    {
      name: "Maria Samper",
      city: "MADRID",
      rating: 4,
      comment: "We had a great time staying here. Arrival was seamless and location is great."
    },
    {
      name: "Ayesha Malik",
      city: "LAHORE",
      rating: 5,
      comment: "The quality of the silk embroidery on my dress exceeded my expectations! Elegant packaging."
    }
  ];

  function getStoredReviews() {
    try {
      const saved = localStorage.getItem("anahat_client_reviews");
      if (!saved) {
        localStorage.setItem("anahat_client_reviews", JSON.stringify(defaultReviews));
        return defaultReviews;
      }
      return JSON.parse(saved);
    } catch (e) {
      return defaultReviews;
    }
  }

  let reviews = getStoredReviews();
  let currentIndex = 0;
  let selectedRating = 5;

  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const reviewForm = document.getElementById('reviewForm');
  const starContainer = document.getElementById('starInput');

  if (!track) return;

  function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<span class="${i <= rating ? '' : 'star-empty'}">★</span>`;
    }
    return html;
  }

  // Star Rating Selector Handle karna
  if (starContainer && !starContainer.hasAttribute('data-bound')) {
    starContainer.setAttribute('data-bound', 'true');
    starContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.star-btn');
      if (!btn) return;
      selectedRating = parseInt(btn.dataset.rating, 10);
      const stars = starContainer.querySelectorAll('.star-btn');
      stars.forEach((s) => {
        const val = parseInt(s.dataset.rating, 10);
        s.classList.toggle('active', val <= selectedRating);
      });
    });
  }

  function renderReviews() {
    reviews = getStoredReviews();
    track.innerHTML = reviews.map((rev, idx) => `
      <div class="review-card ${idx === currentIndex ? 'active' : ''}" data-index="${idx}" style="flex: 0 0 320px; max-width: 320px; background: #ffffff; border: 1px solid #deded1; border-radius: 6px; padding: 30px 24px; margin: 0 14px; text-align: center; position: relative; box-shadow: 0 12px 35px rgba(47, 57, 43, .09);">
        <div class="review-stars" style="font-size: 16px; color: #bd9561; margin-bottom: 14px; letter-spacing: 2px;">${renderStars(rev.rating)}</div>
        <p class="review-text" style="font: 400 13px/1.6 Georgia, serif; color: #252820; margin-bottom: 18px; font-style: italic;">"${rev.comment}"</p>
        <div class="review-author" style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #252820;">${rev.name} - <span style="color: #6c6e64; font-weight: 500;">${rev.city}</span></div>
      </div>
    `).join('');
    updateCarousel();
  }

  function updateCarousel() {
    const cards = track.querySelectorAll('.review-card');
    if (!cards.length) return;

    cards.forEach((card, idx) => {
      card.classList.toggle('active', idx === currentIndex);
    });

    const containerWidth = track.parentElement.offsetWidth;
    const activeCard = cards[currentIndex];
    
    if (activeCard) {
      const cardOffsetLeft = activeCard.offsetLeft;
      const cardWidth = activeCard.offsetWidth;
      const moveDistance = cardOffsetLeft - (containerWidth / 2) + (cardWidth / 2);
      track.style.transform = `translateX(${-moveDistance}px)`;
    }
  }

  // Next Arrow Click Handler
  if (nextBtn && !nextBtn.hasAttribute('data-bound')) {
    nextBtn.setAttribute('data-bound', 'true');
    nextBtn.addEventListener('click', () => { 
      reviews = getStoredReviews();
      currentIndex = (currentIndex + 1) % reviews.length; 
      updateCarousel(); 
    });
  }
  
  // Prev Arrow Click Handler
  if (prevBtn && !prevBtn.hasAttribute('data-bound')) {
    prevBtn.setAttribute('data-bound', 'true');
    prevBtn.addEventListener('click', () => { 
      reviews = getStoredReviews();
      currentIndex = (currentIndex - 1 + reviews.length) % reviews.length; 
      updateCarousel(); 
    });
  }

  // Form Submit Handler (Bina page reload hue review add karna)
  if (reviewForm && !reviewForm.hasAttribute('data-bound')) {
    reviewForm.setAttribute('data-bound', 'true');
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Page reload hone se rokna
      
      const nameVal = document.getElementById('reviewerName').value.trim();
      const cityVal = document.getElementById('reviewerCity').value.trim().toUpperCase();
      const commentVal = document.getElementById('reviewerComment').value.trim();

      if (!nameVal || !cityVal || !commentVal) return;

      let currentReviews = getStoredReviews();
      currentReviews.unshift({ 
        name: nameVal, 
        city: cityVal, 
        rating: selectedRating, 
        comment: commentVal 
      });

      try {
        localStorage.setItem("anahat_client_reviews", JSON.stringify(currentReviews));
      } catch (err) {
        console.error("Error saving review:", err);
      }

      currentIndex = 0;
      renderReviews();
      reviewForm.reset();
      selectedRating = 5;

      const toast = document.getElementById('toast');
      if (toast) {
        toast.textContent = 'Thank you! Your review is now published.';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
      }
    });
  }

  renderReviews();
}


// ========================================================================
// Persistent Auto-Fixer for Cart Badge
// ========================================================================
function applyPersistentBadge() {
  try {
    const cart = JSON.parse(localStorage.getItem('anahat_cart') || '[]');
    const totalCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    
    const badge = document.getElementById('headerCartCount');
    if (badge) {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
      badge.style.visibility = 'visible';
      badge.style.opacity = '1';
    }
  } catch (e) {
    console.error("Badge fixer error:", e);
  }
}

// Har event par run ho taake refresh hone par gayab na ho
window.addEventListener('DOMContentLoaded', applyPersistentBadge);
window.addEventListener('load', applyPersistentBadge);
// Thodi thodi dair baad check karein agar header dynamically load hota hai
setInterval(applyPersistentBadge, 500);






window.showToast = function(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  // Agar pehle se koi timer chal raha ho toh usay clear kar dein
  if (toast.hideTimer) {
    clearTimeout(toast.hideTimer);
  }

  // 3 seconds baad toast khud hi screen se remove ho jayega
  toast.hideTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};
