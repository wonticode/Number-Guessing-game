// if someone ever wants to fork this project, please add to the counter below
// total_time_wasted = 3 hours

import { GAME_CONFIG, UI_IDS, CSS_CLASSES } from './config.js';

(() => {
  const inputHolder = document.getElementById(UI_IDS.input);
  const checkBtn = document.getElementById(UI_IDS.checkBtn);
  const resetBtn = document.getElementById(UI_IDS.resetBtn);
  const textOutput = document.getElementById(UI_IDS.resultText);
  const attemptsText = document.getElementById(UI_IDS.attemptsText);

  let attempts = 0;
  let randomNum = generateRandomNumber();
  let guessedNums = new Set();

  function generateRandomNumber() {
    const { MIN_NUMBER, MAX_NUMBER } = GAME_CONFIG;
    return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
  }

  checkBtn.addEventListener("click", () => {
    const guess = Number(inputHolder.value);
    const { MIN_NUMBER, MAX_NUMBER, MAX_ATTEMPTS, SLIGHT_MARGIN } = GAME_CONFIG;

    if (guess < MIN_NUMBER || guess > MAX_NUMBER || isNaN(guess)) {
      textOutput.textContent = `Please enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`;
      return;
    }

    if (guessedNums.has(guess)) {
      textOutput.textContent = `You've already guessed ${guess}. Try a different number.`;
      return;
    }

    guessedNums.add(guess);
    attempts++;
    attemptsText.textContent = attempts;

    const diff = randomNum - guess;
    const isSlightlyHigher = diff < 0 && Math.abs(diff) <= SLIGHT_MARGIN;
    const isSlightlyLower = diff > 0 && Math.abs(diff) <= SLIGHT_MARGIN;

    if (guess === randomNum) {
      textOutput.textContent = "Your guess is Correct!";
      checkBtn.disabled = true;
      inputHolder.disabled = true;
    } else {
      if (isSlightlyHigher) {
        textOutput.textContent = "Your guess is SLIGHTLY HIGHER! Try again!";
      } else if (isSlightlyLower) {
        textOutput.textContent = "Your guess is SLIGHTLY LOWER! Try again!";
      } else if (guess > randomNum) {
        textOutput.textContent = "Your guess is TOO HIGH! Try again!";
      } else {
        textOutput.textContent = "Your guess is TOO LOW! Try again!";
      }

      textOutput.classList.add(CSS_CLASSES.shakeEffect);
      setTimeout(() => textOutput.classList.remove(CSS_CLASSES.shakeEffect), 400);
    }

    if (attempts >= MAX_ATTEMPTS && guess !== randomNum) {
      textOutput.textContent = "TOO MANY ATTEMPTS! Reset?";
      checkBtn.disabled = true;
      inputHolder.disabled = true;
      resetBtn.style.display = "inline-block";
    }
  });

  resetBtn.addEventListener("click", () => {
    randomNum = generateRandomNumber();
    attempts = 0;
    guessedNums.clear();
    inputHolder.value = "";
    attemptsText.textContent = attempts;
    textOutput.textContent = "";
    checkBtn.disabled = false;
    inputHolder.disabled = false;
    resetBtn.style.display = "none";
  });
})();

// light mode toggle
const toggleButton = document.getElementById(UI_IDS.toggleBtn);
let lightMode = false;

toggleButton.addEventListener("click", () => {
  document.documentElement.classList.toggle(CSS_CLASSES.lightMode);
  lightMode = !lightMode;
  toggleButton.textContent = lightMode ? "Toggle Dark Mode" : "Toggle Light Mode";
});
