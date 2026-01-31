const createCakeImage = (label, color) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="300" viewBox="0 0 420 300">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${color}" />
        <stop offset="100%" stop-color="#ffffff" />
      </linearGradient>
    </defs>
    <rect width="420" height="300" rx="28" fill="url(#g)" />
    <circle cx="330" cy="70" r="44" fill="#fff" opacity="0.6" />
    <rect x="70" y="130" width="280" height="90" rx="24" fill="#fff" opacity="0.85" />
    <text x="210" y="190" font-size="22" text-anchor="middle" fill="#7a3b4e" font-family="Inter, sans-serif">${label}</text>
    <text x="210" y="215" font-size="14" text-anchor="middle" fill="#9a6072" font-family="Inter, sans-serif">Bánh kem thủ công</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const products = [
  {
    id: 1,
    name: "Strawberry Cloud",
    category: "sinh-nhat",
    price: 390000,
    rating: 4.9,
    weight: "500g",
    serves: "6-8 người",
    image: "assets/strawberry.jpg",
  },
  {
    id: 2,
    name: "Chocolate Velvet",
    category: "sinh-nhat",
    price: 420000,
    rating: 4.8,
    weight: "700g",
    serves: "8-10 người",
    image: "assets/chocolate.jpg",
  },
  {
    id: 3,
    name: "Rose Wedding",
    category: "cuoi-hoi",
    price: 1200000,
    originalPrice: 1200000,
    discount: 15,
    rating: 5.0,
    weight: "2kg",
    serves: "20-24 người",
    image: "assets/wedding.jpg",
  },
  {
    id: 4,
    name: "Chocolate Garden",
    category: "banh-lanh",
    price: 320000,
    rating: 4.7,
    weight: "450g",
    serves: "5-6 người",
    image: "assets/matcha.jpg",
  },
  {
    id: 5,
    name: "Cupcake Party Box",
    category: "cupcake",
    price: 260000,
    rating: 4.6,
    weight: "12 chiếc",
    serves: "12 người",
    image: "assets/cupcake.jpg",
  },
  {
    id: 6,
    name: "Blueberry Mousse",
    category: "banh-lanh",
    price: 360000,
    rating: 4.8,
    weight: "500g",
    serves: "6-8 người",
    image: "assets/blueberry.jpg",
  },
  {
    id: 7,
    name: "Classic Opera",
    category: "sinh-nhat",
    price: 410000,
    rating: 4.7,
    weight: "650g",
    serves: "8-10 người",
    image: "assets/opera.jpg",
  },
  {
    id: 8,
    name: "Peach Blossom",
    category: "cuoi-hoi",
    price: 980000,
    rating: 4.9,
    weight: "1.5kg",
    serves: "16-18 người",
    image: "assets/peach.jpg",
  },
];

const reviews = [
  {
    name: "Chị Hà",
    rating: 5,
    comment: "Bánh ít ngọt, trang trí đúng như mẫu, giao rất nhanh!",
  },
  {
    name: "Anh Long",
    rating: 5,
    comment: "Đặt bánh cưới, nhân viên tư vấn kỹ. Khách rất khen.",
  },
  {
    name: "Ngọc Trâm",
    rating: 4,
    comment: "Mousse ngon, hơi ngọt nhẹ. Sẽ ủng hộ lần sau.",
  },
];

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const productGrid = document.getElementById("productGrid");
const reviewGrid = document.getElementById("reviewGrid");
const cartCount = document.getElementById("cartCount");
const wishlistCount = document.getElementById("wishlistCount");
const cartItems = document.getElementById("cartItems");
const wishlistItems = document.getElementById("wishlistItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartShipping = document.getElementById("cartShipping");
const cartTotal = document.getElementById("cartTotal");

const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const sortSelect = document.getElementById("sortSelect");
const clearFilter = document.getElementById("clearFilter");

const cartPanel = document.getElementById("cartPanel");
const wishlistPanel = document.getElementById("wishlistPanel");
const overlay = document.getElementById("overlay");
const cartButton = document.getElementById("cartButton");
const wishlistButton = document.getElementById("wishlistButton");
const closeCart = document.getElementById("closeCart");
const closeWishlist = document.getElementById("closeWishlist");

const authButton = document.getElementById("authButton");
const authModal = document.getElementById("authModal");
const closeAuth = document.getElementById("closeAuth");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginFormEl = document.getElementById("loginFormEl");
const registerFormEl = document.getElementById("registerFormEl");
const switchToRegister = document.getElementById("switchToRegister");
const switchToLogin = document.getElementById("switchToLogin");
const authTitle = document.getElementById("authTitle");

const reviewModal = document.getElementById("reviewModal");
const openReviewForm = document.getElementById("openReviewForm");
const closeReview = document.getElementById("closeReview");
const reviewForm = document.getElementById("reviewForm");

const checkoutModal = document.getElementById("checkoutModal");
const checkoutButton = document.getElementById("checkoutButton");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");

const builderSummary = document.getElementById("builderSummary");
const builderPrice = document.getElementById("builderPrice");
const sizeOptions = document.getElementById("sizeOptions");
const flavorOptions = document.getElementById("flavorOptions");
const toppingOptions = document.getElementById("toppingOptions");
const addCustomCake = document.getElementById("addCustomCake");
const openBuilder = document.getElementById("openBuilder");
const heroImage = document.getElementById("heroImage");
const builderImage = document.getElementById("builderImage");

const slideContent = document.getElementById("slideContent");
const slideDots = document.getElementById("slideDots");
const slidePrev = document.getElementById("slidePrev");
const slideNext = document.getElementById("slideNext");

const promoGrid = document.getElementById("promoGrid");

let slideData = [];
let currentSlideIndex = 0;
let currentCategory = "all";

const formatPrice = (value) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const renderPromoProducts = () => {
  const promoItems = products.filter((p) => p.discount);
  if (promoItems.length === 0) {
    promoGrid.innerHTML = "";
    return;
  }

  promoGrid.innerHTML = promoItems
    .map((item) => {
      const finalPrice = item.price * (1 - item.discount / 100);
      return `
        <div class="promo-card">
          <div class="promo-badge">-${item.discount}%</div>
          <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 12px; margin-bottom: 10px;" />
          <h3>${item.name}</h3>
          <div class="meta">${item.weight} · ${item.serves}</div>
          <div class="promo-price">
            <span class="old">${formatPrice(item.price)}</span>
            <span class="new">${formatPrice(finalPrice)}</span>
          </div>
          <div class="card-actions">
            <button class="primary-btn" data-action="add" data-id="${item.id}">Thêm vào giỏ</button>
            <button class="ghost-btn" data-action="wish" data-id="${item.id}">Yêu thích</button>
          </div>
        </div>
      `;
    })
    .join("");

  // Add event listeners
  promoGrid.querySelectorAll('[data-action="add"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      addToCart(e.target.dataset.id);
    });
  });

  promoGrid.querySelectorAll('[data-action="wish"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      addToWishlist(e.target.dataset.id);
    });
  });
};

const updateBadge = () => {
  cartCount.textContent = cart.reduce((total, item) => total + item.qty, 0);
  wishlistCount.textContent = wishlist.length;
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

const renderProducts = (items) => {
  productGrid.innerHTML = items
    .map(
      (item) => {
        const finalPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price;
        return `
      <div class="product-card">
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <h3>${item.name}</h3>
          <div class="meta">${item.weight} · ${item.serves}</div>
        </div>
        <div class="price">
          ${item.discount ? `<span style="text-decoration: line-through; color: var(--muted); font-size: 0.9rem;">${formatPrice(item.price)}</span><br>` : ""}
          ${formatPrice(finalPrice)}
          ${item.discount ? `<span style="color: #ff4444; margin-left: 8px; font-weight: 700;">-${item.discount}%</span>` : ""}
        </div>
        <div class="meta">⭐ ${item.rating}</div>
        <div class="card-actions">
          <button class="primary-btn" data-action="add" data-id="${item.id}">Thêm vào giỏ</button>
          <button class="ghost-btn" data-action="wish" data-id="${item.id}">Yêu thích</button>
        </div>
      </div>
    `;
      }
    )
    .join("");
};

const renderReviews = () => {
  reviewGrid.innerHTML = reviews
    .map(
      (review) => `
      <div class="review-card">
        <strong>${review.name}</strong>
        <div>⭐ ${review.rating}</div>
        <p>${review.comment}</p>
      </div>
    `
    )
    .join("");
};

const findProduct = (id) => products.find((item) => item.id === Number(id));

const addToCart = (id, customLabel) => {
  const product = findProduct(id) || {
    id: Date.now(),
    name: customLabel,
    price: customCakeState.price,
    image: "assets/custom.jpg",
  };
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateBadge();
  renderCart();
  openPanel(cartPanel);
};

const addToWishlist = (id) => {
  const product = findProduct(id);
  if (!product) return;
  if (!wishlist.find((item) => item.id === product.id)) {
    wishlist.push(product);
  }
  updateBadge();
  renderWishlist();
  openPanel(wishlistPanel);
};

const renderCart = () => {
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Giỏ hàng đang trống.</p>";
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <strong>${item.name}</strong>
            <div class="meta">${formatPrice(item.price)}</div>
            <div class="qty-row">
              <button data-action="dec" data-id="${item.id}">-</button>
              <span>${item.qty}</span>
              <button data-action="inc" data-id="${item.id}">+</button>
              <button data-action="remove" data-id="${item.id}">Xoá</button>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
  const shipping = subtotal >= 600000 || subtotal === 0 ? 0 : 25000;
  cartSubtotal.textContent = formatPrice(subtotal);
  cartShipping.textContent = formatPrice(shipping);
  cartTotal.textContent = formatPrice(subtotal + shipping);
};

const renderWishlist = () => {
  wishlistItems.innerHTML = wishlist.length
    ? wishlist
        .map(
          (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <strong>${item.name}</strong>
            <div class="meta">${formatPrice(item.price)}</div>
            <div class="qty-row">
              <button data-action="add" data-id="${item.id}">Thêm vào giỏ</button>
              <button data-action="remove" data-id="${item.id}">Xoá</button>
            </div>
          </div>
        </div>
      `
        )
        .join("")
    : "<p>Chưa có sản phẩm yêu thích.</p>";
};

const openPanel = (panel) => {
  overlay.classList.add("active");
  panel.classList.add("active");
};

const closePanels = () => {
  overlay.classList.remove("active");
  cartPanel.classList.remove("active");
  wishlistPanel.classList.remove("active");
  reviewModal.classList.remove("active");
  checkoutModal.classList.remove("active");
  authModal.classList.remove("active");
};

const applyFilters = () => {
  const keyword = searchInput.value.toLowerCase();
  const category = categorySelect.value;
  const sort = sortSelect.value;

  let filtered = products.filter((item) => {
    const inCategory = category === "all" || item.category === category;
    const inSearch =
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword);
    return inCategory && inSearch;
  });

  if (sort === "priceAsc") {
    filtered = filtered.sort((a, b) => a.price - b.price);
  }
  if (sort === "priceDesc") {
    filtered = filtered.sort((a, b) => b.price - a.price);
  }
  if (sort === "rating") {
    filtered = filtered.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(filtered);
};

const builderOptions = {
  size: [
    { label: "Mini 12cm", price: 180000 },
    { label: "Tiêu chuẩn 16cm", price: 260000 },
    { label: "Lớn 20cm", price: 360000 },
  ],
  flavor: [
    { label: "Vani Madagascar", price: 0 },
    { label: "Socola Bỉ", price: 30000 },
    { label: "Matcha Nhật", price: 25000 },
  ],
  topping: [
    { label: "Dâu tươi", price: 35000 },
    { label: "Macaron", price: 45000 },
    { label: "Socola chip", price: 20000 },
  ],
};

const customCakeState = {
  size: builderOptions.size[0],
  flavor: builderOptions.flavor[0],
  topping: builderOptions.topping[0],
  get price() {
    return this.size.price + this.flavor.price + this.topping.price;
  },
};

const renderOptionButtons = (container, options, key) => {
  container.innerHTML = options
    .map(
      (option, index) => `
      <button class="option-btn ${index === 0 ? "active" : ""}" data-key="${key}" data-index="${index}">
        ${option.label} (${formatPrice(option.price)})
      </button>
    `
    )
    .join("");
};

const updateBuilderSummary = () => {
  builderSummary.innerHTML = `
    <li>Size: ${customCakeState.size.label}</li>
    <li>Vị kem: ${customCakeState.flavor.label}</li>
    <li>Lớp phủ: ${customCakeState.topping.label}</li>
  `;
  builderPrice.textContent = formatPrice(customCakeState.price);
};

renderProducts(products);
renderReviews();
renderCart();
renderWishlist();
updateBadge();
renderOptionButtons(sizeOptions, builderOptions.size, "size");
renderOptionButtons(flavorOptions, builderOptions.flavor, "flavor");
renderOptionButtons(toppingOptions, builderOptions.topping, "topping");
updateBuilderSummary();
renderPromoProducts();
heroImage.src = products[0].image;
builderImage.src = "assets/custom.jpg";

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const id = button.dataset.id;
  if (button.dataset.action === "add") {
    addToCart(id);
  }
  if (button.dataset.action === "wish") {
    addToWishlist(id);
  }
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const id = Number(button.dataset.id);
  const item = cart.find((entry) => entry.id === id);
  if (!item) return;
  if (button.dataset.action === "inc") item.qty += 1;
  if (button.dataset.action === "dec") item.qty = Math.max(1, item.qty - 1);
  if (button.dataset.action === "remove") {
    const index = cart.findIndex((entry) => entry.id === id);
    cart.splice(index, 1);
  }
  updateBadge();
  renderCart();
});

wishlistItems.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === "add") addToCart(id);
  if (button.dataset.action === "remove") {
    const index = wishlist.findIndex((entry) => entry.id === id);
    if (index >= 0) wishlist.splice(index, 1);
  }
  updateBadge();
  renderWishlist();
});

cartButton.addEventListener("click", () => openPanel(cartPanel));
wishlistButton.addEventListener("click", () => openPanel(wishlistPanel));
closeCart.addEventListener("click", closePanels);
closeWishlist.addEventListener("click", closePanels);
overlay.addEventListener("click", closePanels);

openReviewForm.addEventListener("click", () => reviewModal.classList.add("active"));
closeReview.addEventListener("click", closePanels);

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống.");
    return;
  }
  checkoutModal.classList.add("active");
});
closeCheckout.addEventListener("click", closePanels);

const paymentMethod = document.getElementById("paymentMethod");
const qrcodeContainer = document.getElementById("qrcodeContainer");
const qrcodeImage = document.getElementById("qrcodeImage");

paymentMethod.addEventListener("change", () => {
  if (paymentMethod.value === "bank" || paymentMethod.value === "momo") {
    qrcodeContainer.style.display = "block";
    qrcodeImage.src = "assets/bank.jpg";
  } else {
    qrcodeContainer.style.display = "none";
  }
});

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const [nameInput, ratingInput, commentInput] = reviewForm.elements;
  reviews.unshift({
    name: nameInput.value,
    rating: Number(ratingInput.value),
    comment: commentInput.value,
  });
  reviewForm.reset();
  renderReviews();
  closePanels();
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Đặt bánh thành công! Nhân viên sẽ liên hệ xác nhận.");
  cart.splice(0, cart.length);
  updateBadge();
  renderCart();
  closePanels();
});

[searchInput, categorySelect, sortSelect].forEach((input) =>
  input.addEventListener("input", applyFilters)
);

clearFilter.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "all";
  sortSelect.value = "popular";
  renderProducts(products);
});

[sizeOptions, flavorOptions, toppingOptions].forEach((container) => {
  container.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const key = button.dataset.key;
    const index = Number(button.dataset.index);
    customCakeState[key] = builderOptions[key][index];
    container.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    updateBuilderSummary();
  });
});

addCustomCake.addEventListener("click", () => {
  const label = `Bánh tuỳ chỉnh - ${customCakeState.size.label}, ${customCakeState.flavor.label}, ${customCakeState.topping.label}`;
  addToCart(null, label);
});

openBuilder.addEventListener("click", () => {
  document.getElementById("builder").scrollIntoView({ behavior: "smooth" });
});

const newsletterForm = document.getElementById("newsletterForm");
const contactForm = document.getElementById("contactForm");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Cảm ơn bạn đã đăng ký! Mã ưu đãi đã gửi qua email.");
  newsletterForm.reset();
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Yêu cầu của bạn đã được gửi. Chúng tôi sẽ phản hồi sớm nhất!");
  contactForm.reset();
});

// Slide logic
const updateSlide = () => {
  if (slideData.length === 0) {
    slideContent.innerHTML = "<p>Không có sản phẩm nào.</p>";
    slideDots.innerHTML = "";
    return;
  }

  const item = slideData[currentSlideIndex];
  const finalPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price;
  slideContent.innerHTML = `
    <img src="${item.image}" alt="${item.name}" />
    <div>
      <h2>${item.name}</h2>
      <p>${item.weight} · ${item.serves}</p>
      <p style="color: var(--muted); margin: 8px 0;">⭐ ${item.rating}</p>
      <div style="font-size: 1.5rem; color: var(--primary-dark); font-weight: 700; margin: 12px 0;">
        ${item.discount ? `<span style="text-decoration: line-through; color: var(--muted); font-size: 1rem; margin-right: 12px;">${formatPrice(item.price)}</span>` : ""}
        ${formatPrice(finalPrice)}
        ${item.discount ? `<span style="color: #ff4444; margin-left: 12px; font-weight: 700;">-${item.discount}%</span>` : ""}
      </div>
      <div style="display: flex; gap: 10px; justify-content: center; margin-top: 16px;">
        <button class="primary-btn" data-action="add" data-id="${item.id}" style="cursor: pointer;">Thêm vào giỏ</button>
        <button class="ghost-btn" data-action="wish" data-id="${item.id}" style="cursor: pointer;">Yêu thích</button>
      </div>
    </div>
  `;

  // Update dots
  slideDots.innerHTML = slideData
    .map(
      (_, i) => `
      <div class="dot ${i === currentSlideIndex ? "active" : ""}" data-index="${i}"></div>
    `
    )
    .join("");

  // Add button listeners
  const addBtns = slideContent.querySelectorAll('[data-action="add"]');
  const wishBtns = slideContent.querySelectorAll('[data-action="wish"]');
  addBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      addToCart(id);
    })
  );
  wishBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      addToWishlist(id);
    })
  );
};

const filterByCategory = (category) => {
  currentCategory = category;
  currentSlideIndex = 0;
  slideData =
    category === "all"
      ? [...products]
      : products.filter((p) => p.category === category);
  updateSlide();
};

slidePrev.addEventListener("click", () => {
  if (slideData.length === 0) return;
  currentSlideIndex =
    (currentSlideIndex - 1 + slideData.length) % slideData.length;
  updateSlide();
});

slideNext.addEventListener("click", () => {
  if (slideData.length === 0) return;
  currentSlideIndex = (currentSlideIndex + 1) % slideData.length;
  updateSlide();
});

slideDots.addEventListener("click", (e) => {
  const dot = e.target.closest(".dot");
  if (dot) {
    currentSlideIndex = Number(dot.dataset.index);
    updateSlide();
  }
});

// Tab buttons
const tabBtns = document.querySelectorAll(".tab-btn");
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterByCategory(btn.dataset.category);
  });
});

// Initialize slide with all products
filterByCategory("all");

// Auth logic
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const updateAuthButton = () => {
  if (currentUser) {
    authButton.textContent = `👤 ${currentUser.name}`;
    authButton.classList.remove("ghost-btn");
    authButton.classList.add("primary-btn");
  } else {
    authButton.textContent = "Đăng nhập";
    authButton.classList.add("ghost-btn");
    authButton.classList.remove("primary-btn");
  }
};

updateAuthButton();

authButton.addEventListener("click", () => {
  if (currentUser) {
    const logout = confirm(`Đăng xuất ${currentUser.name}?`);
    if (logout) {
      currentUser = null;
      localStorage.removeItem("currentUser");
      updateAuthButton();
    }
  } else {
    authModal.classList.add("active");
    overlay.classList.add("active");
  }
});

closeAuth.addEventListener("click", closePanels);

switchToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  authTitle.textContent = "Đăng ký";
});

switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.style.display = "none";
  loginForm.style.display = "block";
  authTitle.textContent = "Đăng nhập";
});

loginFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const [emailInput, passwordInput] = loginFormEl.elements;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (u) => u.email === emailInput.value && u.password === passwordInput.value
  );
  
  if (user) {
    currentUser = { name: user.name, email: user.email };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    updateAuthButton();
    loginFormEl.reset();
    closePanels();
    alert(`Chào ${currentUser.name}!`);
  } else {
    alert("Email hoặc mật khẩu không chính xác!");
  }
});

registerFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const [nameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput] = registerFormEl.elements;
  
  if (passwordInput.value !== confirmPasswordInput.value) {
    alert("Mật khẩu không khớp!");
    return;
  }
  
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find((u) => u.email === emailInput.value)) {
    alert("Email đã tồn tại!");
    return;
  }
  
  users.push({
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    password: passwordInput.value,
  });
  
  localStorage.setItem("users", JSON.stringify(users));
  alert("Đăng ký thành công! Vui lòng đăng nhập.");
  
  registerForm.style.display = "none";
  loginForm.style.display = "block";
  authTitle.textContent = "Đăng nhập";
  registerFormEl.reset();
});
