const url = "https://fakestoreapi.com/products";
const products = document.getElementById("products");
const btns = document.querySelectorAll(".btn");
const totalPrice = document.querySelector(".totalprice");
const payNow = document.querySelector("#payNow");
const payPressed = document.querySelector(".section-price");

let productsData;
let buyArray = [];

function getData() {
  fetch(url)
    .then((resp) => {
      if (!resp.ok) throw new Error("Gick inte bra");
      return resp.json();
    })
    .then((data) => {
      editJson(data);
      displayButtons(data);
      console.log(data);
      productsData = data;
    })
    .catch(console.warn);
}

function editJson(data) {
  products.innerHTML = data
    .map(({ image, title, description, price, category }, index) => {
      return `
        <div class="card" data-category="${category}">
          <div class="card-top">
            <div class="cards">
              <img class="card-img" src="${image}" alt="" />
              <h2 class="card-title">${title}</h2>
              <p>${description}</p>
            </div>
            <div class="card-buy">
              <p><span>$</span> ${price}</p>
              <div class="card-add">
                <p id="quantity"> - <span class="numplus">0</span> +</p>
                <button class="buy" onclick="buyThis(${index})">Köp!</button>
              </div>
            </div>
          </div>
        </div>`;
    })
    .join("");
  // makeKopButtonsList(data);
}

function displayButtons(data) {
  const categories = [
    "Shoppa loss",
    ...new Set(data.map((item) => item.category)),
  ];
  const buttonContainer = document.querySelector(".btn-container");

  buttonContainer.innerHTML = categories
    .map((category) => {
      return `<a href="#" class="btn" data-filter="${category}">${category}</a>`;
    })
    .join("");

  const btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", handleFilter);
  });
}

function handleFilter(e) {
  const filter = e.target.dataset.filter;
  const storeProducts = document.querySelectorAll(".card");

  storeProducts.forEach((product) => {
    if (filter === "Shoppa loss" || product.dataset.category === filter) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });

  const current = document.querySelector(".btn.active");
  current.classList.remove("active");
  e.target.classList.add("active");
}

function buyThis(index) {
  // Fake lägger till en vid klick "köo"
  const cardTitle = event.target.closest(".card-top").querySelector(".numplus");
  if (cardTitle) {
    cardTitle.textContent = "1";
  }
  //sparar i lokal storage
  const selectedProduct = productsData[index];
  buyArray.push(selectedProduct);
  localStorage.setItem("order", JSON.stringify(buyArray));
  displayOrders();
  calcTotalOrder();
  console.log(selectedProduct);
}

function displayOrders() {
  let ordersContainer = document.querySelector(".price-container");
  ordersContainer.innerHTML = buyArray
    .map(({ image, title, price }) => {
      return `
        <div class="products-cart">
          <h3 id="bought-title">${title}</h3>
          <img class="" src="${image}" alt="${title}" width="100px" />
          <div class="product-price-nr">
          <h4 id="bought-number">1st</h4>
          <h4 id="price">${price} $</h4>
          </div>
        </div>`;
    })
    .join("");
}

function calcTotalOrder() {
  const total = buyArray
    .map(({ price }) => price)
    .reduce((acc, prod) => acc + prod, 0);

  if (+totalPrice.innerHTML === 0) {
    totalPrice.innerHTML = `${total.toFixed(2)}`;
  } else {
    const existingTotal = +totalPrice.innerHTML.slice(2);
    const newTotal = existingTotal + total;
    totalPrice.innerHTML = `${newTotal.toFixed(2)}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let storedOrder = localStorage.getItem("order");
  if (storedOrder) {
    buyArray = JSON.parse(storedOrder);
    displayOrders();
    calcTotalOrder();
  }
});

payNow.addEventListener("click", function (e) {
  e.preventDefault();
  payPressed.innerHTML = `<h2 class="thanks">Tack för din order!</h2>`;
});

getData();
calcTotalOrder();
