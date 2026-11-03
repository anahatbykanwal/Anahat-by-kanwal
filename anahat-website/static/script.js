

// Automatically initialize product detail page if container exists
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("productDetailViewApp")) {
    initProductDetailPage();
  }
});
/* ==========================================================================
   ANAHAT BY KANWAL - CATALOG, COLLECTIONS & PRODUCT DETAIL MANAGER
   ========================================================================== */

// --- 1. PRODUCT CATALOG DATABASE (With Rich Sizes & 4-5 Gallery Images) ---
const PRODUCTS_DATA = [
  {
    id: "anahat-001",
    title: "Hand Paint Dresses",
    category: "Hand Paint Dresses",
    season: "Spring/Summer",
    price: 18500,
    rating: 5.0,
    badge: "Bestseller",
    featured: true,
    mainImage: "/anahat-website/static/assets/images/collections/hand painted dress/plum hand paint dress/modal shoot.jpg",
    galleryImages: [
      "/anahat-website/static/assets/images/collections/hand painted dress/plum hand paint dress/modal shoot.jpg",
      "/anahat-website/static/assets/images/collections/hand painted dress/plum hand paint dress/closeup.jpg"
     
    ],
    description: "Hand-painted organic silk ensemble with silver hand-embellishments. Inspired by the resilience of the lotus flower blooming independently.",
    fabric: "Pure Organic Silk",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "anahat-002",
    title: "Hand-Painted Floral Stole",
    category: "Hijabs & Stoles",
    season: "Signature Edition",
    price: 1000,
    rating: 4.9,
    badge: "Artisan",
    featured: true,
    mainImage:"/anahat-website/static/assets/images/collections/purple stole/modal shoot.jpg" ,
    galleryImages: [
      "/anahat-website/static/assets/images/collections/purple stole/modal shoot.jpg",
      "/anahat-website/static/assets/images/collections/purple stole/stole shoot.jpeg",
      "/anahat-website/static/assets/images/collections/purple stole/Purple Stole.jpeg",
      "/anahat-website/static/assets/images/collections/purple stole/wooden shoot purple stole.jpg",
    ],
    description: "Custom hand-painted floral motifs on lightweight sheer fabric with delicate finished edges.",
    fabric: "Pure Chiffon / Georgette",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "anahat-003",
    title: "Minimalist Linen Abaya",
    category: "Abayas",
    season: "Spring/Summer",
    price: 7000,
    rating: 4.8,
    badge: "New",
    featured: true,
    mainImage: "/anahat-website/static/assets/images/collections/abaya/sky abaya/abaya.jpeg",
    galleryImages: [
      "/anahat-website/static/assets/images/collections/abaya/sky abaya/abaya.jpeg",
      "/anahat-website/static/assets/images/collections/abaya/sky abaya/sky-abaya back.jpeg",
      "/anahat-website/static/assets/images/collections/abaya/sky abaya/sky-abaya flare.jpeg",
      "/anahat-website/static/assets/images/collections/abaya/sky abaya/sky-abaya side.jpeg"
    ],
    description: "Relaxed silhouette abaya featuring subtle embroidery along the sleeves and premium breathable weave.",
    fabric: "Breathable Linen Blend",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "anahat-004",
    title: "Gold Leaf Quran Calligraphy ",
    category: "Calligraphy & Decor",
    season: "Signature Edition",
    price: 10000,
    rating: 5.0,
    badge: "Handmade",
    featured: true,
    mainImage: "/anahat-website/static/assets/images/collections/calligraphy/parents dua/calligraphy - Copy.jpg",
    galleryImages: [
      "/anahat-website/static/assets/images/collections/calligraphy/parents dua/calligraphy - Copy.jpg",
      "/anahat-website/static/assets/images/collections/calligraphy/parents dua/gold foil close up texture.jpg",
      "/anahat-website/static/assets/images/collections/calligraphy/parents dua/Gemini_Generated_Image_liglizliglizligl.jpg"
    ],
    description: "Original hand-written arabic calligraphy accented with genuine gold leaf on custom wooden framed canvas.",
    fabric: "Canvas & Wood Frame",
    sizes: ["8x10 inches", "12x16 inches", "16x20 inches"]
  },
  {
    id: "anahat-005",
    title: "Velvet Cap Shawal",
    category: "Winter Cap Shawal",
    season: "Autumn/Winter",
    price: 8000,
    rating: 4.7,
    badge: "Limited",
    featured: false,
    mainImage: "/anahat-website/static/assets/images/collections/cap shawal/black velvet/Modal shoot.jpeg",
    galleryImages: [
      "/anahat-website/static/assets/images/collections/cap shawal/black velvet/Modal shoot.jpeg",
      "/anahat-website/static/assets/images/collections/cap shawal/black velvet/Side psoe.jpeg",
      "/anahat-website/static/assets/images/collections/cap shawal/black velvet/Closeup.jpeg"
    ],
    description: "Contemporary velvet capshawal crafted with subtle hand painted embellishment along the neckline.",
    fabric: "Velvet",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "anahat-006",
    title: "Handcrafted Pipe Cleaner Bouquet",
    category: "Art & Craft",
    season: "Signature Edition",
    price: 8000,
    rating: 4.9,
    badge: "Artisan",
    featured: false,
    mainImage: "/anahat-website/static/assets/images/collections/bouquet/prrple pipe cleaning bouquet/modal shoot.jpg",
    galleryImages: [
      "/anahat-website/static/assets/images/collections/bouquet/prrple pipe cleaning bouquet/modal shoot.jpg",
      "/anahat-website/static/assets/images/collections/bouquet/prrple pipe cleaning bouquet/product back shoot.jpg",
      "/anahat-website/static/assets/images/collections/bouquet/prrple pipe cleaning bouquet/closeup.jpg",
      "/anahat-website/static/assets/images/collections/bouquet/prrple pipe cleaning bouquet/close shot.jpg"
    ],
    description: "Add a touch of timeless charm to your space or gift a piece of everlasting art with our Handmade Purple Pipe Cleaner Bouquet. Expertly crafted with love, care, and intricate detail using high-quality pipe cleaners, this bouquet captures the vibrant beauty of real flowers without ever wilting.",
    // fabric: "Epoxy Resin & Warm LED",
    sizes: ["8x10 inches", "12x16 inches", "16x20 inches"]
  }
];





// --- 2. INITIALIZATION ON DOM LOAD ---
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("productGrid") && document.getElementById("heroTitle")) {
    renderIndexBestsellers();
  }

  if (document.getElementById("categoryChips")) {
    initCollectionsGallery();
  }

  if (document.getElementById("productDetailViewApp")) {
    initProductDetailPage();
  }
});

// --- 3. INDEX PAGE BESTSELLERS LOGIC ---
function renderIndexBestsellers() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const bestsellers = PRODUCTS_DATA.filter((p) => p.featured);
  grid.innerHTML = generateProductGridHTML(bestsellers);
}

// --- 4. COLLECTIONS GALLERY LOGIC ---
// --- 4. COLLECTIONS GALLERY LOGIC ---
activeCategory = "All";
activeSeason = "All";
activeSort = "featured";

function initCollectionsGallery() {
  const grid = document.getElementById("productGrid");
  const emptyState = document.getElementById("emptyState");
  if (!grid) return;

  if (typeof PRODUCTS_DATA === "undefined") return;

  // 1. URL se Search aur Category parameters read karein
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search");
  const categoryParam = urlParams.get("category");

  if (categoryParam) {
    activeCategory = categoryParam;
    updateActiveChipUI(categoryParam);
  }

  // Agar search query mojood hai, toh header input mein bhi likh dein
  if (searchQuery) {
    const searchInput = document.getElementById("headerSearchInput");
    if (searchInput) searchInput.value = searchQuery;
  }

  // Event Listeners for Filters
  const chipsContainer = document.getElementById("categoryChips");
  if (chipsContainer) {
    chipsContainer.addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if (!chip) return;

      document.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeCategory = chip.getAttribute("data-category");
      filterAndRenderProducts();
    });
  }

  const seasonSelect = document.getElementById("seasonSelect");
  if (seasonSelect) {
    seasonSelect.addEventListener("change", (e) => {
      activeSeason = e.target.value;
      filterAndRenderProducts();
    });
  }

  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeSort = e.target.value;
      filterAndRenderProducts();
    });
  }

  // ===========================================================================
  // Initial render call with filters & search applied
  // ============================================================================
  filterAndRenderProducts();
}

function updateActiveChipUI(catName) {
  document.querySelectorAll(".filter-chip").forEach((c) => {
    if (c.getAttribute("data-category") === catName) {
      c.classList.add("active");
    } else {
      c.classList.remove("active");
    }
  });
}

function filterAndRenderProducts() {
  const grid = document.getElementById("productGrid");
  const emptyState = document.getElementById("emptyState");
  if (!grid) return;

  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search");

  let filtered = [...PRODUCTS_DATA];

  // Search Query Filtering
  if (searchQuery) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Category Filter
  if (activeCategory !== "All") {
    filtered = filtered.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
  }

  // Season Filter
  if (activeSeason !== "All") {
    filtered = filtered.filter((p) => p.season.toLowerCase() === activeSeason.toLowerCase());
  }

  // Sorting
  if (activeSort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeSort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeSort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (filtered.length === 0) {
    grid.innerHTML = "";
    if (emptyState) emptyState.hidden = false;
  } else {
    if (emptyState) emptyState.hidden = true;
    grid.innerHTML = generateProductGridHTML(filtered);
  }
}
// --- 5. PRODUCT GRID HTML GENERATOR ---
function generateProductGridHTML(products) {
  return products
    .map(
      (product) => `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-wrap" onclick="navigateToProduct('${product.id}')">
        <img src="${product.mainImage}" alt="${product.title}" loading="lazy" />
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
      </div>

      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3 class="product-title" onclick="navigateToProduct('${product.id}')">${product.title}</h3>
        <p class="product-price">Rs. ${product.price.toLocaleString()}</p>

        <div class="product-card-actions">
          <button type="button" class="btn-card btn-add-bag" onclick="handleCardAddToCart('${product.id}')">
            <i class="fa-solid fa-bag-shopping"></i> Add to Bag
          </button>
          <button type="button" class="btn-card btn-buy-now" onclick="handleCardBuyNow('${product.id}')">
            Buy Now →
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function navigateToProduct(id) {
  window.location.href = `/anahat-website/static/assets/pages/Collections/product.html?product_id=${id}`;
}




// ===============================================================
  // 1. Item ko global cart data mein add karein
// =================================================

function handleCardAddToCart(id) {
  const item = PRODUCTS_DATA.find((p) => p.id === id);
  if (item) {
    // 1. Item ko global cart data mein add karein
    if (typeof addToCart === "function") {
      addToCart({ 
        id: item.id, 
        title: item.title || item.name || item.productName , 
        price: item.price, 
        image: item.mainImage ||""|| item.productName ,
        // size: item.sizes[0] || "M", // Default size agar available ho
        size: currentSelectedSize // 👈 Yahan se selected size fetch hokar cart mein ja raha hai!
      }, 1);
    }
  showToast("Item added to bag successfully!");
  console.log("Triggering Toast...");

    // 2. Cart Drawer UI ko render karein aur Drawer open karein
    if (typeof renderCartDrawerUI === "function") {
      renderCartDrawerUI();
    }
    if (typeof openCartDrawer === "function") {
      openCartDrawer();
    }
  }
}
function handleCardBuyNow(id) {
  handleCardAddToCart(id);
  window.location.href = "/anahat-website/static/assets/pages/checkouts/checkout.html";
}

// ======================================================================
// 6. STANDALONE PRODUCT DETAIL PAGE CONTROLLER 
// ======================================================================
// let currentSelectedSize = "S";
// let currentQuantity = 1;

// function initProductDetailPage() {
//   const appContainer = document.getElementById("productDetailViewApp");
//   if (!appContainer) return;

//   const urlParams = new URLSearchParams(window.location.search);
//   const productId = urlParams.get("product_id") || "anahat-001";

//   const product = PRODUCTS_DATA.find((p) => p.id === productId) || PRODUCTS_DATA[0];
  
//   // 1. Safe Size Assignment (Agar product ke apne sizes hain toh wo lo, warna default S,M,L,XL)
//   const productSizes = (Array.isArray(product.sizes) && product.sizes.length > 0) 
//     ? product.sizes 
//     : ["S", "M", "L", "XL"];
    
//   currentSelectedSize = productSizes[0];
//   currentQuantity = 1;

//   appContainer.innerHTML = `
//     <div style="max-width: 1180px; margin: 40px auto; padding: 0 24px;">
//       <a href="/anahat-website/static/assets/pages/Collections/collectionproduct.html" style="display:inline-block; font-size:11px; font-weight:700; text-transform:uppercase; color:var(--sage-dark); margin-bottom:24px;">← Back to Collections</a>
      
//       <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: 50px; background: var(--paper); padding: 40px; border-radius: 16px; border: 1px solid var(--line); box-shadow: var(--shadow);">
        
//         <!-- Left: Gallery Side -->
//         <div>
//           <div style="aspect-ratio: 4/5; border-radius: 12px; overflow: hidden; margin-bottom: 16px; border: 1px solid var(--line);">
//             <img id="detailMainImg" src="${product.mainImage}" alt="${product.title}" style="width:100%; height:100%; object-fit:cover;" />
//           </div>
//           <div style="display: flex; gap: 10px; flex-wrap: wrap;">
//             ${(product.galleryImages || [product.mainImage]).map(imgUrl => `
//               <img src="${imgUrl}" onclick="switchDetailImage('${imgUrl}')" style="width: 70px; height: 80px; object-fit: cover; border-radius: 6px; cursor: pointer; border: 1px solid var(--line);" />
//             `).join("")}
//           </div>
//         </div>

//         <!-- Right: Details & Action Side -->
//         <div style="display: flex; flex-direction: column; justify-content: center;">
//           <span style="font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 700; color: var(--sage-dark); margin-bottom: 6px;">${product.category}</span>
//           <h1 style="font: 500 32px var(--serif); color: var(--ink); margin-bottom: 10px;">${product.title}</h1>
//           <p style="font-size: 20px; font-weight: 700; color: var(--ink); margin-bottom: 16px;">Rs. ${product.price.toLocaleString()}</p>
          
//           <p style="font-size: 13.5px; color: var(--muted); line-height: 1.7; margin-bottom: 20px;">${product.description}</p>
//           <p style="font-size: 12px; color: var(--ink); margin-bottom: 24px;"><strong>Fabric &amp; Craft:</strong> ${product.fabric}</p>

//           <!-- Size Selector Buttons -->
//           <div style="margin-bottom: 24px;">
//             <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
//               <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--ink);">Select Size:</span>
//               <button type="button" onclick="openSizeGuideModal()" style="font-size: 11px; color: var(--sage-dark); text-decoration: underline; background: none; border: none; cursor: pointer;">Size Guide 📏</button>
//             </div>
//             <div style="display: flex; gap: 10px;" id="sizeButtonsContainer">
//               ${productSizes.map((sz, idx) => `
//                 <button type="button" class="detail-size-btn ${idx === 0 ? "active" : ""}" onclick="selectDetailSize(this, '${sz}')" style="padding: 10px 18px; border: 1px solid ${idx === 0 ? 'var(--sage)' : 'var(--line)'}; background: ${idx === 0 ? 'var(--sage)' : 'white'}; color: ${idx === 0 ? 'white' : 'var(--ink)'}; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 700;">${sz}</button>
//               `).join("")}
//             </div>
//           </div>

//           <!-- Quantity Selector -->
//           <div style="margin-bottom: 30px;">
//             <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 8px; color: var(--ink);">Quantity:</span>
//             <div style="display: flex; align-items: center; gap: 12px;">
//               <button onclick="adjustDetailQty(-1)" style="width: 36px; height: 36px; border: 1px solid var(--line); background: white; border-radius: 6px; font-weight: bold; cursor: pointer;">-</button>
//               <span id="detailQtyVal" style="font-size: 15px; font-weight: 700;">1</span>
//               <button onclick="adjustDetailQty(1)" style="width: 36px; height: 36px; border: 1px solid var(--line); background: white; border-radius: 6px; font-weight: bold; cursor: pointer;">+</button>
//             </div>
//           </div>

//           <!-- Dual Action Buttons -->
//           <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
//             <button type="button" onclick="submitDetailAddBag('${product.id}')" style="padding: 14px; background: transparent; color: var(--sage-dark); border: 1px solid var(--sage); border-radius: var(--radius); font-size: 11px; font-weight: 700; text-transform: uppercase; cursor: pointer;">
//               <i class="fa-solid fa-bag-shopping"></i> Add to Bag
//             </button>
//             <button type="button" onclick="submitDetailBuyNow('${product.id}')" style="padding: 14px; background: var(--ink); color: white; border: 1px solid var(--ink); border-radius: var(--radius); font-size: 11px; font-weight: 700; text-transform: uppercase; cursor: pointer;">
//               Buy Now →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   `;
// }



function initProductDetailPage() {
  const appContainer = document.getElementById("productDetailViewApp");
  if (!appContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("product_id") || "anahat-001";

  const product = PRODUCTS_DATA.find((p) => p.id === productId) || PRODUCTS_DATA[0];
  
  // 👈 Yeh check karega ke agar product mein 'sizes' array mojood hai, tab hi size section dikhao
  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
  
  if (hasSizes) {
    currentSelectedSize = product.sizes[0];
  } else {
    currentSelectedSize = "Standard"; // Agar size na ho toh default standard save ho jaye
  }
  
  currentQuantity = 1;

  // Related products nikalne ke liye
  const relatedProducts = PRODUCTS_DATA.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  appContainer.innerHTML = `
    <div style="max-width: 1180px; margin: 40px auto; padding: 0 24px;">
      <a href="/anahat-website/static/assets/pages/Collections/collectionproduct.html" style="display:inline-block; font-size:11px; font-weight:700; text-transform:uppercase; color:var(--sage-dark); margin-bottom:24px;">← Back to Collections</a>
      
      <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: 50px; background: var(--paper); padding: 40px; border-radius: 16px; border: 1px solid var(--line); box-shadow: var(--shadow);">
        
        <!-- Left: Gallery Side -->
        <div>
          <div style="aspect-ratio: 4/5; border-radius: 12px; overflow: hidden; margin-bottom: 16px; border: 1px solid var(--line);">
            <img id="detailMainImg" src="${product.mainImage}" alt="${product.title}" style="width:100%; height:100%; object-fit:cover;" />
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            ${(product.galleryImages || [product.mainImage]).map(imgUrl => `
              <img src="${imgUrl}" onclick="switchDetailImage('${imgUrl}')" style="width: 70px; height: 80px; object-fit: cover; border-radius: 6px; cursor: pointer; border: 1px solid var(--line);" />
            `).join("")}
          </div>
        </div>

        <!-- Right: Details & Action Side -->
        <div style="display: flex; flex-direction: column; justify-content: center;">
          <span style="font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 700; color: var(--sage-dark); margin-bottom: 6px;">${product.category}</span>
          <h1 style="font: 500 32px var(--serif); color: var(--ink); margin-bottom: 10px;">${product.title}</h1>
          <p style="font-size: 20px; font-weight: 700; color: var(--ink); margin-bottom: 16px;">Rs. ${product.price.toLocaleString()}</p>
          
          <p style="font-size: 13.5px; color: var(--muted); line-height: 1.7; margin-bottom: 20px;">${product.description}</p>
          <p style="font-size: 12px; color: var(--ink); margin-bottom: 24px;"><strong>Fabric &amp; Craft:</strong> ${product.fabric}</p>

          <!-- Size Selector (Sirf tab dikھے گا jab product mein sizes mojood honge!) -->
          ${hasSizes ? `
            <div style="margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--ink);">Select Size:</span>
                <button type="button" onclick="openSizeGuideModal()" style="font-size: 11px; color: var(--sage-dark); text-decoration: underline; background: none; border: none; cursor: pointer;">Size Guide 📏</button>
              </div>
              <div style="display: flex; gap: 10px;" id="sizeButtonsContainer">
                ${product.sizes.map((sz, idx) => `
                  <button type="button" class="detail-size-btn ${idx === 0 ? "active" : ""}" onclick="selectDetailSize(this, '${sz}')" style="padding: 10px 18px; border: 1px solid ${idx === 0 ? 'var(--sage)' : 'var(--line)'}; background: ${idx === 0 ? 'var(--sage)' : 'white'}; color: ${idx === 0 ? 'white' : 'var(--ink)'}; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 700;">${sz}</button>
                `).join("")}
              </div>
            </div>
          ` : ''}

          <!---------------------------------- Quantity Selector -------------------------------->


          <div style="margin-bottom: 30px;">
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 8px; color: var(--ink);">Quantity:</span>
            <div style="display: flex; align-items: center; gap: 12px;">
              <button onclick="adjustDetailQty(-1)" style="width: 36px; height: 36px; border: 1px solid var(--line); background: white; border-radius: 6px; font-weight: bold; cursor: pointer;">-</button>
              <span id="detailQtyVal" style="font-size: 15px; font-weight: 700;">1</span>
              <button onclick="adjustDetailQty(1)" style="width: 36px; height: 36px; border: 1px solid var(--line); background: white; border-radius: 6px; font-weight: bold; cursor: pointer;">+</button>
            </div>
          </div>

          <!------------------------------------- Dual Action Buttons ---------------------------->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <button type="button" onclick="submitDetailAddBag('${product.id}')" style="padding: 14px; background: transparent; color: var(--sage-dark); border: 1px solid var(--sage); border-radius: var(--radius); font-size: 11px; font-weight: 700; text-transform: uppercase; cursor: pointer;">
              <i class="fa-solid fa-bag-shopping"></i> Add to Bag
            </button>
            <button type="button" onclick="submitDetailBuyNow('${product.id}')" style="padding: 14px; background: var(--ink); color: white; border: 1px solid var(--ink); border-radius: var(--radius); font-size: 11px; font-weight: 700; text-transform: uppercase; cursor: pointer;">
              Buy Now →
            </button>
          </div>
        </div>
      </div>
      

      <!-- Related Products Section -->
      ${relatedProducts.length > 0 ? `
        <div style="margin-top: 60px;">
          <h3 style="font: 500 24px var(--serif); color: var(--ink); margin-bottom: 24px; text-align: center;">You May Also Like</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
            ${generateProductGridHTML(relatedProducts)}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}


// ======================================================================
// 8. PRODUCT DETAIL PAGE INTERACTION HELPERS
// ======================================================================
function switchDetailImage(imgUrl) {
  const mainImg = document.getElementById("detailMainImg");
  if (mainImg) mainImg.src = imgUrl;
}

function selectDetailSize(btn, sz) {
  currentSelectedSize = sz; // 👈 Yahin se size properly capture hoga!
  
  document.querySelectorAll(".detail-size-btn").forEach(b => {
    b.style.borderColor = "var(--line)";
    b.style.background = "white";
    b.style.color = "var(--ink)";
  });
  
  btn.style.borderColor = "var(--sage)";
  btn.style.background = "var(--sage)";
  btn.style.color = "white";
}

function adjustDetailQty(delta) {
  currentQuantity += delta;
  if (currentQuantity < 1) currentQuantity = 1;
  const qtyEl = document.getElementById("detailQtyVal");
  if (qtyEl) qtyEl.textContent = currentQuantity;
}

function submitDetailAddBag(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (product) {
    addToCart({
      id: product.id,
      name: product.title,
      title: product.title,
      price: product.price,
      image: product.mainImage,
      size: currentSelectedSize || "S" // 👈 Ensure karta hai ke size pass ho
    }, currentQuantity);
  }
}

function submitDetailBuyNow(productId) {
  submitDetailAddBag(productId);
  window.location.href = "/anahat-website/static/assets/pages/checkouts/checkout.html";
}

function openSizeGuideModal() {
  const modal = document.getElementById("sizeGuideModal");
  if (modal) modal.style.display = "flex";
}

function closeSizeGuideModal() {
  const modal = document.getElementById("sizeGuideModal");
  if (modal) modal.style.display = "none";
}




// ======================================================================
// 8. PRODUCT DETAIL PAGE INTERACTION HELPERS
// ======================================================================


function updateCartHeaderBadge(cart) {
  // Agar cart array nahi hai, toh safe tarike se localStorage ya CartManager se utha lein
  if (!Array.isArray(cart)) {
    cart = (typeof CartManager !== 'undefined' && CartManager.getCart) 
      ? CartManager.getCart() 
      : JSON.parse(localStorage.getItem('anahat_cart') || '[]');
  }
  
  // Agar phir bhi array na mile toh empty array rakh lein taake error na aaye
  if (!Array.isArray(cart)) {
    cart = [];
  }

  const badge = document.getElementById('headerCartCount');
  if (badge) {
    const totalCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'flex' : 'none';
  }
}
// Page load hote hi foran badge update karein
document.addEventListener('DOMContentLoaded', () => {
  updateCartHeaderBadge();
});

window.addEventListener('load', () => {
  updateCartHeaderBadge();
});

// ======================================================================
// 8. PRODUCT DETAIL PAGE INTERACTION HELPERS
// ======================================================================
// ======================================================================
// 8. PRODUCT DETAIL PAGE INTERACTION HELPERS
// ======================================================================
function switchDetailImage(imgUrl) {
  const mainImg = document.getElementById("detailMainImg");
  if (mainImg) mainImg.src = imgUrl;
}

function selectDetailSize(btn, sz) {
  // Global variable update karein taake add to bag ya buy now mein sahi size jaye
  currentSelectedSize = sz;
  
  // Sabhi size buttons se active styling hata dein
  document.querySelectorAll(".detail-size-btn").forEach(b => {
    b.style.borderColor = "var(--line)";
    b.style.background = "white";
    b.style.color = "var(--ink)";
  });
  
  // Click kiye gaye button par active (sage) styling apply karein
  btn.style.borderColor = "var(--sage)";
  btn.style.background = "var(--sage)";
  btn.style.color = "white";
  
  console.log("Selected Size Updated:", currentSelectedSize);
}



///quantity adjustment

function adjustDetailQty(delta) {
  currentQuantity += delta;
  if (currentQuantity < 1) currentQuantity = 1;
  const qtyEl = document.getElementById("detailQtyVal");
  if (qtyEl) qtyEl.textContent = currentQuantity;
}

function submitDetailAddBag(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (product) {
    addToCart({
      id: product.id,
      name: product.title,
      title: product.title,
      price: product.price,
      image: product.mainImage,
      size: currentSelectedSize // Ab yeh user ka select kiya hua size uthayega
    }, currentQuantity);
  }
}

function submitDetailBuyNow(productId) {
  submitDetailAddBag(productId);
  window.location.href = "/anahat-website/static/assets/pages/checkouts/checkout.html";
}

function openSizeGuideModal() {
  const modal = document.getElementById("sizeGuideModal");
  if (modal) modal.style.display = "flex";
}

function closeSizeGuideModal() {
  const modal = document.getElementById("sizeGuideModal");
  if (modal) modal.style.display = "none";
}



