
  const gmailInput = document.querySelector('#gmail_input');
  const gmailButton = document.querySelector('#gmail_button');
  const gmailResult = document.querySelector('#gmail_result');

  const checkGmail = () => {
  const regExp = /[a-zA-Z0-9.]+@gmail.com/;

  gmailButton.addEventListener('click', () => {
    const isValid = regExp.test(gmailInput.value);
    gmailResult.innerHTML = isValid ? 'Your Gmail is valid' : 'Your Gmail is not valid';
    gmailResult.style.color = isValid ? 'green' : 'red';
  });
};

checkGmail();
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


const startTimer= () => {
const incrementCounter = () => {
  second++;
  secondsTimer.textContent = second;
};

start.addEventListener('click', async () => {
  clearInterval(interval);
  interval = setInterval(incrementCounter, 1000);
});

stop.addEventListener('click', () => {
  clearInterval(interval);
});

reset.addEventListener('click', () => {
  clearInterval(interval);
  second = 0;
  secondsTimer.textContent = second;
});
};

startTimer();
//dz4
const fetchPeople = async () => {
  try {
    const response = await fetch("../JSON/dz4.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ERROR", error);
    return [];
  }
};

const peopleCards = async () => {
  const cardContainer = document.querySelector('.cardContainer');
  const peopleData = await fetchPeople();

  try {
    peopleData.forEach((people) => {
      const peopleCard = document.createElement('div');
      peopleCard.setAttribute('class', 'peopleCard');
      peopleCard.innerHTML = `
          <div class="peoplePhoto">
              <img src="${people.photo}"/>
          </div>
          <span>${people.nickname} ${people.name}</span>
          <span>Age: ${people.age}</span>
          <span>Birthday: ${people.birthday}</span>
          `;
      cardContainer.append(peopleCard);
    });
  } catch (error) {
    console.error('ERROR', error);
  }
};

peopleCards();