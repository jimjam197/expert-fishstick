const electronicsBtn = document.getElementById("electronics");
const jewelryBtn = document.getElementById("jewelry");
const mensClothingBtn = document.getElementById("mens-clothing");
const womensClothingBtn = document.getElementById("womens-clothing");
const displayDiv = document.getElementById("display");
const cartButton = document.getElementById("cart-button");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout");
const apiUrl = "https://fakestoreapi.com";

let cart = [];

const fakeStore = async (endpoint) => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`);
    const data = await response.json();
    displayCards(data);
  } catch (error) {
    console.log("Error:", error);
  }
};

window.onload = () => {
  fakeStore("/products");
};

electronicsBtn.addEventListener("click", () => {
  fakeStore("/products/category/electronics");
});

jewelryBtn.addEventListener("click", () => {
  fakeStore("/products/category/jewelry");
});

mensClothingBtn.addEventListener("click", () => {
  fakeStore("/products/category/men%27s%20clothing");
});

womensClothingBtn.addEventListener("click", () => {
  fakeStore("/products/category/women%27s%20clothing");
});

const displayCards = (data) => {
  displayDiv.innerHTML = "";

  const row1 = document.createElement("div");
  row1.classList.add("row");
  displayDiv.appendChild(row1);

  const row2 = document.createElement("div");
  row2.classList.add("row");
  displayDiv.appendChild(row2);

  let count = 0;

  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card", "col-md-3", "mb-3");

    const image = document.createElement("img");
    image.classList.add("card-img-top");
    image.src = item.image;
    card.appendChild(image);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = item.title;
    cardBody.appendChild(title);

    const descriptionBtn = createDropdownButton(
      "Description",
      `description-${count}`
    );
    cardBody.appendChild(descriptionBtn);

    const descriptionCollapse = createCollapseDiv(`description-${count}`);
    cardBody.appendChild(descriptionCollapse);

    const descriptionContent = createCardContentDiv(item.description);
    descriptionCollapse.appendChild(descriptionContent);

    const priceBtn = createDropdownButton("Price", `price-${count}`);
    cardBody.appendChild(priceBtn);

    const priceCollapse = createCollapseDiv(`price-${count}`);
    cardBody.appendChild(priceCollapse);

    const priceContent = createCardContentDiv(`$${item.price.toFixed(2)}`);
    priceCollapse.appendChild(priceContent);

    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add("btn", "btn-primary");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.addEventListener("click", () => {
      submitToCart(item);
    });
    cardBody.appendChild(addToCartBtn);

    if (count < 4) {
      row1.appendChild(card);
    } else {
      row2.appendChild(card);
    }

    count++;
  });
};

const createDropdownButton = (label, target) => {
  const btn = document.createElement("button");
  btn.classList.add("btn", "btn-link", "dropdown-toggle");
  btn.setAttribute("type", "button");
  btn.setAttribute("data-bs-toggle", "collapse");
  btn.setAttribute("data-bs-target", `#${target}`);
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", target);
  btn.textContent = label;
  return btn;
};

const createCollapseDiv = (id) => {
  const collapseDiv = document.createElement("div");
  collapseDiv.id = id;
  collapseDiv.classList.add("collapse");
  return collapseDiv;
};

const createCardContentDiv = (content) => {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("card-text");
  contentDiv.textContent = content;
  return contentDiv;
};

const submitToCart = (item) => {
  const existingCartItem = cart.find((cartItem) => cartItem.id === item.id);

  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    const { id, title, price } = item;
    const cartItem = { id, title, price, quantity: 1 };
    cart.push(cartItem);
  }
  console.log("Added to cart:", cart);
};

const displayCart = () => {
  const cartTable = document.getElementById("cart-table");
  cartTable.innerHTML = "";

  if (cart.length === 0) {
    const headerRow = cartTable.insertRow();
    headerRow.innerHTML =
      "<th>Item</th><th>Price</th><th>Quantity</th><th>Total</th>";
    const emptyRow = cartTable.insertRow();
    emptyRow.innerHTML = '<td colspan="4">Your cart is empty.</td>';
    return;
  }

  const headerRow = cartTable.insertRow();
  headerRow.innerHTML =
    "<th>Item</th><th>Price</th><th>Quantity</th><th>Total</th>";

  let subtotal = 0;

  cart.forEach((cartItem) => {
    const { title, price, quantity } = cartItem;
    const total = price * quantity;
    subtotal += total;

    const newRow = cartTable.insertRow();
    newRow.innerHTML = `<td>${title}</td><td>$${price.toFixed(
      2
    )}</td><td>${quantity}</td><td>$${total.toFixed(2)}</td>`;
  });

  const taxRate = 0.07;
  const tax = subtotal * taxRate;
  const shipping = subtotal * 0.1;
  const totalAmount = subtotal + tax + shipping;

  const totalRow = cartTable.insertRow();
  totalRow.innerHTML = `<td colspan="3">Subtotal:</td><td>$${subtotal.toFixed(
    2
  )}</td>`;

  const taxRow = cartTable.insertRow();
  taxRow.innerHTML = `<td colspan="3">Tax (7%):</td><td>$${tax.toFixed(
    2
  )}</td>`;

  const shippingRow = cartTable.insertRow();
  shippingRow.innerHTML = `<td colspan="3">Shipping:</td><td>$${shipping.toFixed(
    2
  )}</td>`;

  const totalAmountRow = cartTable.insertRow();
  totalAmountRow.innerHTML = `<td colspan="3"><strong>Total:</strong></td><td><strong>$${totalAmount.toFixed(
    2
  )}</strong></td>`;
};

const clearCart = () => {
  cart = [];
};

cartButton.addEventListener("click", () => {
  displayCart();
});

clearCartBtn.addEventListener("click", () => {
  clearCart();
  displayCart();
});

checkoutBtn.addEventListener("click", () => {
  alert("Thank you for your Purchase!");
  clearCart();
  displayCart();
});
