
async function makeKopButtonsList() {
    const kopButtons = document.querySelectorAll('.kop');
    
    kopButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cardTitle = button.closest('.cards').querySelector('.card-title').textContent;
          
            console.log("Dados do produto:", cardTitle);

        })
        
    });

}