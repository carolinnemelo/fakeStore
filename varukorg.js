const varukorg = [];
async function makeKopButtonsList(data) {
    const kopButtons = document.querySelectorAll('.kop');
    
    kopButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cardTitle = button.closest('.cards').querySelector('.card-title').textContent;
            // console.log("Product title:", cardTitle);
            
            addProductToVarukorg(data, cardTitle);

        })
        
    });
}

function addProductToVarukorg(data, cardTitle) {
    const productData = data.find(product => product.title.includes(cardTitle));
    if (productData) {
        varukorg.push(productData)
    } else {
        return "Not found";
    }
    // console.log(varukorg);
}

document.addEventListener('click', () => {
    const varukorgButton = document.querySelector('#checkout');
    
})