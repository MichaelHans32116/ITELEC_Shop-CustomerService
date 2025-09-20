const productList = document.getElementById("product-list");
if (productList) {
  fetch("https://fakestoreapi.com/products/category/women's clothing")
    .then(res => res.json())
    .then(data => {
      productList.innerHTML = "";
      data.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h4>${product.title}</h4>
          <p>$${product.price.toFixed(2)}</p>
          <button class="add-btn">Add to Cart</button>
        `;
        card.querySelector(".add-btn").addEventListener("click", () => addToCart(product));
        productList.appendChild(card);
      });
    });
}

const cartSidebar = document.getElementById("cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");

let cart = [];

function toggleCart() {
  if (cartSidebar) cartSidebar.classList.toggle("active");
}

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function updateCart() {
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<strong>${item.title}</strong><br>$${item.price.toFixed(2)}`;
    cartItemsContainer.appendChild(div);
  });
  if (cartCount) cartCount.textContent = cart.length;
}
