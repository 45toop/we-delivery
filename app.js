let cart = [];

/* =======================
DOM READY
======================= */

document.addEventListener("DOMContentLoaded", () => {

/* ===== FOOD & CART ELEMENTS ===== */
const foodsContainer = document.getElementById("foods");
const cartBar = document.getElementById("cart-bar");
const cartDrawer = document.getElementById("cart-drawer");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

/* ===== SUPPLIERS / RIDERS ELEMENTS ===== */
const suppliersCard = document.getElementById("suppliers-card");
const ridersCard = document.getElementById("riders-card");
const modal = document.getElementById("service-modal");
const title = document.getElementById("modal-title");
const desc = document.getElementById("modal-desc");
const closeBtn = document.getElementById("modal-close");

/* =======================
   CART LOGIC
======================= */

function toggleCart(food) {
  const index = cart.findIndex(item => item.id === food.id);

  if (index !== -1) {
    cart.splice(index, 1);
  } else {
    cart.push(food);
  }
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <span>${item.name}</span>
      <span>✖</span>
    `;

    row.onclick = () => toggleCart(item);
    cartItems.appendChild(row);
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}

/* =======================
   BIND HTML FOODS TO CART  ✅ HAPA
======================= */

document.querySelectorAll(".food-card").forEach(card => {
  card.onclick = () => {
    toggleCart({
      id: Number(card.dataset.id),
      name: card.dataset.name,
      price: Number(card.dataset.price)
    });
  };
});

/* =======================
   CART BAR
======================= */

if (cartBar) {
  cartBar.onclick = () => {
    cartDrawer.classList.toggle("open");
  };
}

/* =======================
   CONFIRM ORDER
======================= */

const confirmBtn = document.getElementById("confirm-order");

if (confirmBtn) {
  confirmBtn.onclick = () => {
    if (cart.length === 0) {
      alert("Cart iko tupu");
      return;
    }

    localStorage.setItem("we_order", JSON.stringify(cart));
    window.location.href = "suppliers.html";
  };
}

  /* =======================
     SUPPLIERS / RIDERS MODAL
  ======================= */

  function openModal(t, d) {
    title.textContent = t;
    desc.textContent = d;
    modal.classList.remove("hidden");
  }

  if (closeBtn) {
    closeBtn.onclick = () => modal.classList.add("hidden");
  }

  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    };
  }

  if (suppliersCard) {
    suppliersCard.onclick = () => {
      openModal(
        "Suppliers",
        "Maduka na wauzaji wa chakula wa karibu. Mfumo huu utaunganishwa moja kwa moja na backend ili kuona shops halisi, menu na mawasiliano."
      );
    };
  }

  if (ridersCard) {
    ridersCard.onclick = () => {
      openModal(
        "Riders",
        "Bodaboda na riders wa kuaminika kwa delivery ya haraka. Mfumo huu utakuunganisha na riders waliothibitishwa."
      );
    };
  }

});
