'use strict';

const btnRollDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHoldScore = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

let activePlayer, currentScore, scores, isPlaying;

const initGame = () => {
  // Reset game params
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  isPlaying = true;

  // Reset display scores
  document
    .querySelectorAll('.score')
    .forEach((scoreEl, i) => (scoreEl.textContent = scores[i]));
  document
    .querySelectorAll('.current-score')
    .forEach((currentEl) => (currentEl.textContent = currentScore));

  // Reset player status
  document
    .querySelectorAll('.player')
    .forEach((playerEl) => playerEl.classList.remove('player--winner'));
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');

  diceEl.classList.add('hidden');
};
initGame();

const rollDice = () => {
  const diceRoll = Math.trunc(Math.random() * 6) + 1;
  diceEl.setAttribute('src', `images/dice-${diceRoll}.png`);
  return diceRoll;
};

const switchActivePlayer = () => {
  document
    .querySelectorAll('.player')
    .forEach((playerEl) => playerEl.classList.toggle('player--active'));
  activePlayer = activePlayer === 0 ? 1 : 0;
};

const addCurrentScoreInTotalScore = () => {
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
};

const updateCurrentScoreDisplay = () => {
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
};

btnRollDice.addEventListener('click', () => {
  if (isPlaying) {
    diceEl.classList.remove('hidden');
    const diceRoll = rollDice();

    if (diceRoll !== 1) {
      currentScore += diceRoll;
      updateCurrentScoreDisplay();
    } else {
      currentScore = 0;
      updateCurrentScoreDisplay();
      switchActivePlayer();
    }
  }
});

btnHoldScore.addEventListener('click', () => {
  addCurrentScoreInTotalScore();
  currentScore = 0;
  updateCurrentScoreDisplay();

  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    isPlaying = false;
  } else {
    switchActivePlayer();
  }
});

btnNewGame.addEventListener('click', initGame);
