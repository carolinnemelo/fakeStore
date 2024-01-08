const url = "https://fakestoreapi.com/products";
const products = document.getElementById("products");
const btns = document.querySelectorAll(".btn");

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
    })
    .catch(console.warn);
}

function editJson(data) {
  products.innerHTML = data
    .map(({ image, title, description, price, category }) => {
      return `
    <div class="card">
    <div class="cards">
      <img class="card-img" src="${image}" alt="" />
      <h2 class="card-title">${title}</h2>
      <p>${description}</p>
      <div class="card-buy">
      <p>${price}<span>Kr</span></p>
      <button class="kop">köp</button>
      </div>
    </div></div>`;
    })
    .join("");
    makeKopButtonsList(data);

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

getData();

{
  /* <div class="btn-container">
<a href="#" class="btn active" data-filter="Shoppa loss">Shoppas loss</a>
<a href="#" class="btn" data-filter="men's clothing"></a>>Mens clothings</button>
<a href="#" class="btn" data-filter="jewelery">Jewelery</a>
<a href="#" class="btn" data-filter="electronics">electronics</a>
<a href="#" class="btn"data-filter="women's clothing">Womens clothing</a>
</div> */
}
