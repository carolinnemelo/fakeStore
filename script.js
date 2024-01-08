const url = "https://fakestoreapi.com/products";
const products = document.getElementById("products");

function getData() {
  fetch(url)
    .then((resp) => {
      if (!resp.ok) throw new Error("Gick inte bra");
      return resp.json();
    })
    .then(editJson)

    .catch(console.warn);
}

getData();

function editJson(data) {
  products.innerHTML = data
    .map(({ image, title, description, price }) => {
      return `
    <div class="card">
    <div class="cards">
      <img class="card-img" src="${image}" alt="" />
      <h2 class="card-title">${title}"</h2>
      <p>${description}</p>
      <div class="card-buy">
      <p>${price}<span>Kr</span></p>
      <button>köp</button>
      </div>
    </div></div>`;
    })
    .join("");
}
