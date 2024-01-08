fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>console.log(json))
            .then(createProductsCards())


async function createProductsCards() {
        
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    
    products.forEach(product => {
        const sourceProductCard = document.querySelector('.sourceProductCard')
        const newProductCard = sourceProductCard.cloneNode(true);
        const image = newProductCard.querySelector('.image');
        const name = newProductCard.querySelector('.name');
        const description = newProductCard.querySelector('.description');
        const price = newProductCard.querySelector('.price');
        const maxChars = 140;

        image.src = product.image;
        name.textContent = product.title;
        description.textContent = product.description.slice(0, maxChars) + "...";
        price.textContent = product.price;
    
        const productsContainer = document.getElementById('product-container');
        productsContainer.appendChild(newProductCard);

    });
}
