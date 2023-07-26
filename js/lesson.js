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