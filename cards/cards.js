const innerCards = document.querySelector('.inner_cards');

const cards = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        const fragment = document.createDocumentFragment();

        data.forEach((info) => {
            const card = document.createElement('div');
            card.classList.add('randomCard');
            card.innerHTML = `
                <div class="dz-block">
                    <img src="https://picsum.photos/id/${count(1, 50)}/300/200" class="card-img-top"> 
                    <div class="card-text">
                        <h4>${info.title}</h4>
                        <p>${info.body}</p>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        });

        innerCards.appendChild(fragment);
    } catch (error) {
        console.error(error, 'ERROR');
    }
};
function count(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

cards();