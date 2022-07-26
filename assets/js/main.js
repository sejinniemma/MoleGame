'use strict';
window.onload = loadPage;
const moles = document.querySelectorAll('.mole');
const start = document.getElementById('start');
const gameTable = document.getElementById('gameTable');
const gameTimer = document.querySelector('.gameTimer');
const gameDuration = 60;
let remainingTimeSec = gameDuration;
let score = 0;
let timer;
let gameStatus = false;

function loadPage() {
  if (localStorage.getItem('moleGame') !== null) {
    startGame();
    loadLocalStorage();
  }
}

function loadLocalStorage() {
  const GameS = JSON.parse(localStorage.getItem('moleGame'));
  if (GameS.status) {
    // update GameS info
    gameTable.innerHTML = '';
    remainingTimeSec = GameS.time;
    score = GameS.score;
    gameStatus = GameS.status;

    // show score and timer
    document.getElementById('score').innerHTML = 'Score: ' + score;
    updateTimerText(remainingTimeSec);

    for (let itemCol in GameS.gameTable) {
      let col = document.createElement('div');
      for (let div in GameS.gameTable[itemCol]) {
        let divs = document.createElement('div');

        divs.classList.add(GameS.gameTable[itemCol][div]);
        if (GameS.gameTable[itemCol][div] === 'house') {
          divs.innerText = 'X';
        }
        col.appendChild(divs);
      }
      gameTable.appendChild(col);
    }
  }
}

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

// make moles randomly
function createMoles() {
  if (!gameStatus) {
    return true;
  }
  let randomTime = getRandom(1000, 3000);
  let randomMoles = getRandom(1, 5);

  if (randomMoles >= gameTable.querySelectorAll('.house').length) {
    gameEnd();
    createRandomMoles(randomMoles);
    return false;
  }

  if (gameTable.querySelectorAll('.house').length > 0) {
    createRandomMoles(randomMoles);
    window.setTimeout(createMoles, randomTime);
  }
}

function createRandomMoles(randomMoles) {
  console.log(randomMoles);
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
  localStorage.removeItem('moleGame');
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
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0 || !gameStatus) {
      clearInterval(timer);
      showGameScore();
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

function showGameScore() {
  alert(`Your score is : ${score}`);
}

// Before unload, get the all div's class info and save them in localStorage with JSON
window.onbeforeunload = function () {
  if (gameStatus) {
    const gameTable = Array.from(
      document.getElementById('gameTable').childNodes
    );
    const divsGame = [];

    for (let num in gameTable) {
      const divClassName = [];
      const sons = Array.from(gameTable[num].childNodes);
      for (let value in sons) {
        divClassName.push(sons[value].className);
      }
      divsGame.push(divClassName);
    }

    let Game = {
      score: score,
      time: remainingTimeSec,
      gameTable: divsGame,
      status: gameStatus,
    };

    localStorage.setItem('moleGame', JSON.stringify(Game));
  }
};
