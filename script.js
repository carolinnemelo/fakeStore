const url = "https://fakestoreapi.com/products";
const products = document.getElementById("products");

function getData() {
  fetch(url)
    .then((resp) => {
      if (!resp.ok) throw new Error("Gick inte bra");
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      products.innerHTML = data
        .map(({ image, title, description }) => {
          return `
          <div class="card">
          <div class="cards">
            <img src="${image}" alt="" />
            <h2>${title}"</h2>
            <p>${description}</p>
            <button>köp</button>
          </div></div>`;
        })
        .join("");
    })
    .catch(console.warn);
}

getData();
