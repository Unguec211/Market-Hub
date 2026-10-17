// Mobile navigation
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("nav");

menuButton?.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Shopping cart
let cart = [];

const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItem");
const checkoutButton = document.getElementById("checkoutButton");
const closeCart = document.getElementById("closeCart");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");

cartButton?.addEventListener("click", () => cartOverlay.classList.add("show"));
closeCart?.addEventListener("click", () => cartOverlay.classList.remove("show"));
cartOverlay?.addEventListener("click", (event) => {
    if (event.target === cartOverlay) cartOverlay.classList.remove("show");
});

function updateCart() {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    cartCount.textContent = itemCount;
    cartTotal.textContent = `${totalPrice.toLocaleString()} UGX`;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        return;
    }

    cartItems.innerHTML = cart.map((item) => `
        <div class="cart-item">
            <span>${item.name} × ${item.quantity}</span>
            <strong>${(item.price * item.quantity).toLocaleString()} UGX</strong>
        </div>
    `).join("");
}

document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const productName = button.dataset.name;
        const productPrice = Number(button.dataset.price);
        const existingProduct = cart.find((item) => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
        cartOverlay.classList.add("show");
    });
});

checkoutButton?.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    alert("Thanks for your order! Checkout is not connected yet.");
});

// Product search and category filters
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const productCards = [...document.querySelectorAll(".product-card")];
let activeCategory = "all";

function filterProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    productCards.forEach((card) => {
        const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
        const matchesSearch = card.textContent.toLowerCase().includes(searchTerm)
            || card.dataset.name.toLowerCase().includes(searchTerm);
        card.hidden = !(matchesCategory && matchesSearch);
    });
}

searchButton?.addEventListener("click", filterProducts);
searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") filterProducts();
});
document.querySelectorAll(".category-btn").forEach((button) => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.category;
        document.querySelector(".category-btn.active")?.classList.remove("active");
        button.classList.add("active");
        filterProducts();
    });
});

// Favourite buttons
document.querySelectorAll(".favourite-button").forEach((button) => {
    button.addEventListener("click", () => button.classList.toggle("liked"));
});
