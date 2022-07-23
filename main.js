'use strict';

const gameTimer = document.querySelector('.timer');
const gameScore = document.querySelector('.score');
const startBtn = document.querySelector('.startBtn');
const gameDuration = 60;
let started = false;
let score = 0;
let timer;

startBtn.addEventListener('click', () => {
  startgameTimer();
});

// create Table
printGameTable();
function printGameTable() {
  let gameTable = document.getElementById('gameTable');
  let counter = 2;
  let decrement = false;

  for (var i = 0; i < 6; i++) {
    let div = document.createElement('div');
    for (var j = 0; j < counter; j++) {
      let span = document.createElement('span');
      span.innerText = 'X';
      div.appendChild(span);
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
function startgameTimer(event) {
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

//  updateScoreBoard(score) {
//    gameScore.textContent = score;
//  }

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
