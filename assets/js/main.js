'use strict';

const moles = document.querySelectorAll('.mole');
const start = document.getElementById('start');
const gameTable = document.getElementById('gameTable');
const gameTimer = document.querySelector('.gameTimer');
const gameDuration = 60;
let timer;
var score = 0;
var gameStatus = false;

// start game!!
start.addEventListener('click', startGame);
function startGame() {
  gameStatus = true;
  changeAllMolesToHouse();
  createMoles();
  startgameTimer();
}

// when start game again all moles should be changed to house
function changeAllMolesToHouse() {
  for (var i = 0; i < moles.length; i++) {
    moles[i].classList.replace('mole', 'house');
    moles[i].innerText = 'X';
  }
}

// make moles ranmdomly
function createMoles() {
  let randomTime = getRandom(1000, 3000);
  let randomMoles = getRandom(1, 5);

  console.log('Mole ' + randomMoles);
  console.log('House ' + gameTable.querySelectorAll('.house').length);

  // if randomMoles count is bigger than house count, game will be finished and add moles to the rest of the house after game is over
  if (randomMoles > gameTable.querySelectorAll('.house').length) {
    randomMoles = gameTable.querySelectorAll('.house').length;
    createRandomMoles(randomMoles);
    gameEnd();
    return false;
  }

  if (gameTable.querySelectorAll('.house').length > 0) {
    createRandomMoles(randomMoles);
    window.setTimeout(createMoles, randomTime);
  }
}

function createRandomMoles(randomMoles) {
  for (var i = 0; i < randomMoles; i++) {
    const houses = gameTable.querySelectorAll('.house');
    const randomHouse = getRandom(0, houses.length - 1);

    houses[randomHouse].innerText = '';
    houses[randomHouse].classList.replace('house', 'mole');
  }
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function gameEnd() {
  gameStatus = false;
  alert('YOU LOST');
}

// when click mole, mole is removed
gameTable.addEventListener('click', (event) => {
  if (event.target.className == 'mole') {
    hitMole(event.target);
  }
});

function hitMole(element) {
  if (element.classList.contains('mole') && gameStatus) {
    element.classList.replace('mole', 'house');
    element.innerText = 'X';
    score++;
    document.getElementById('score').innerHTML = 'Score: ' + score;
  }
}

// make mole's house dynamically
printGameTable();
function printGameTable() {
  let counter = 2;
  let decrement = false;
  for (var i = 0; i < 6; i++) {
    let div = document.createElement('div');
    for (var j = 0; j < counter; j++) {
      let house = document.createElement('div');
      house.classList.add('house');
      house.innerText = 'X';
      div.appendChild(house);
    }
    if (counter >= 6) {
      if (counter === 6 && !decrement) {
        counter += 2;
      }
      decrement = true;
    }
    if (decrement) {
      counter -= 2;
    } else {
      counter += 2;
    }
    gameTable.appendChild(div);
  }
}

// Timer
function startgameTimer() {
  let remainingTimeSec = gameDuration;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerHTML = `${minutes} : ${seconds}`;
}

// when refresh
window.onbeforeunload = function (event) {
  event.preventDefalt();
  return false;
};
