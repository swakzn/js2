//DZ1
const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /[a-zA-Z0-9.]@gmail.com/

gmailButton.addEventListener('click', () => {
  if (regExp.test(gmailInput.value)){
    gmailResult.innerHTML = 'your gmail is valid'
    gmailResult.style.color = 'green'
  }else{
    gmailResult.innerHTML = 'your gmail is not valid'
    gmailResult.style.color = 'red'
  }
})

//DZ1-2


const childBlock = document.querySelector(".child_block");
let positionX = 0;
let positionY = 0;
const move = () => {
  if (positionX < 445 && positionY === 0) {
    positionX++
    childBlock.style.left = `${positionX}px`
    setTimeout(move, 5)
  } else if (positionX >= 445 && positionY < 445) {
    positionY++
    childBlock.style.top = `${positionY}px`
    setTimeout(move, 5)
  } else if (positionX > 0 && positionY >= 445) {
    positionX--
    childBlock.style.left = `${positionX}px`
    setTimeout(move, 5)
  } else if (positionX === 0 && positionY <= 445) {
    positionY--
    childBlock.style.top = `${positionY}px`
    setTimeout(move, 5)
  }
}

move();
//timer


const mlSeconds = document.querySelector('#ml-seconds')
const secondsTimer = document.querySelector('#seconds')
const minutes = document.querySelector('#minutes')
const start = document.querySelector('#start')
const stop = document.querySelector('#stop')
const reset = document.querySelector('#reset')

let mlSecond = 0
let second = 0
let minute = 0
let interval;

function incrementCounter() {
  second++;
  secondsTimer.textContent = second;
}

start.addEventListener('click', function() {
  clearInterval(interval);
  interval = setInterval(incrementCounter, 1000);
})

stop.addEventListener('click', function() {
  clearInterval(interval);
})

reset.addEventListener('click', function() {
  clearInterval(interval);
  second = 0
  secondsTimer.textContent = second;
})

//dz4
const people = new XMLHttpRequest();
people.open("GET", "../JSON/dz4.json");
people.setRequestHeader("Content-Type", "application/json");
people.send();
people.addEventListener('load', () => {
  const data = JSON.parse(people.response)
  data.forEach(people => {
    const peopleCard = document.createElement('div')
    peopleCard.setAttribute('class', 'peopleCard')
    peopleCard.innerHTML = `
        <div class="peoplePhoto">
            <img src="${people.photo}"/>
        </div>
        <span>${people.nickname} ${people.name}</span>
        <span>Age: ${people.age}</span>
        <span>Birthday: ${people.birthday}</span>
        `
    const cardContainer = document.querySelector('.cardContainer')
    cardContainer.append(peopleCard)
  });
});

