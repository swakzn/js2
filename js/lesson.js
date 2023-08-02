const phoneInput = document.querySelector('#phone_input');
const phoneCheck = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}/

phoneCheck.addEventListener('click', () => {
    if(regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'Ok'
        phoneResult.style.color = `green`
    }else{
        phoneResult.innerHTML = 'Not ok'
        phoneResult.style.color = `red`
    }
})

//*TAB SLIDER

const tabContent = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
let indexCount;
let interval;

const hideTabContent = () => {
    tabContent.forEach(item => {
        item.style.display = 'none'
    })
    tabs.forEach(item => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContent[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
    indexCount = index
}

hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    const targetElement = event.target
    if(targetElement.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if(targetElement === tab) {
                hideTabContent()
                showTabContent(tabIndex)
                clearInterval(interval)
                interval = setInterval(autoSlider, 3000)
            }
        })
    }
}

const autoSlider = () => {
    indexCount++;
    if(indexCount > tabs.length -1) {
        indexCount = 0
    }
    hideTabContent()
    showTabContent(indexCount)
}
interval = setInterval(autoSlider, 3000)


const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const euro = document.querySelector('#euro');
let data;

const convert = (e) => {
    e.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../JSON/data.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
        request.onload = () => {
            data = JSON.parse(request.response);
            if (e === som) {
                usd.value = (som.value / data.usd).toFixed(2);
                euro.value = (som.value / data.euro).toFixed(2);
            } else if (e === usd) {
                som.value = (usd.value * data.usd).toFixed(2);
                euro.value = (usd.value * data.usd / data.euro).toFixed(2);
            } else {
                usd.value = (euro.value * data.euro / data.usd).toFixed(2);
                som.value = (euro.value * data.euro).toFixed(2);
            }

            if (e.value === '') {
                usd.value = '';
                euro.value = '';
                som.value = '';
            }
        };
    };
};

convert(som);
convert(euro);
convert(usd);

//card switcher

const card = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')
let count = 1;


const fetchCard = (count) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        .then(response => response.json())
        .then(data => {
            card.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>${data.id}</span>
            `;
        });
};

btnNext.onclick = () => {
    count++;
    if (count > 200) {
        count = 1;
    }
    fetchCard(count);
};

btnPrev.onclick = () => {
    count--;
    if (count === 0) {
        count = 200;
    }
    fetchCard(count);
};

fetchCard(count);

const cards = document.querySelector('.card1')
let cardsCount

// cards.onclick = () => {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//         .then (response => response.json())
//         .then(data =>{
//             cards.innerHTML = `
//           <p>${data.title}</p>
//           <p>${data.body}</p>
//           <span>${data.id}</span>
//         `
//         })
// }

const fetchCards = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log('Posts data', data);
    } catch (error) {
        console.error('ERROR', error);
    }
};


const cardsData = (data) => {
    cards.innerHTML = `
      <p>${data.title}</p>
      <p>${data.body}</p>
      <span>${data.id}</span>
    `
}


fetchCards();

const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const cityName = document.querySelector('.cityName')

const apiKey = 'e417df62e04d3b1b111abeab19cea714'
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

const citySearch = () => {
    cityName.oninput = (event) => {
        fetch(`${BASE_URL}?q=${event.target.value}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data =>{
                city.innerHTML = data?.name || 'Город не найден...'
                temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + '&deg;C' : '...'
            })
    }
}

citySearch()