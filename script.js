(() => {
  const inputHolder = document.getElementById("guessNum");
  const checkBtn = document.getElementById("checkNum");
  const resetBtn = document.getElementById("reset");
  const textOutput = document.getElementById("resultDesc");
  const attemptsText = document.getElementById("attempts");

  let attempts = 0;
  let randomNum = generateRandomNumber();
  let guessedNums = new Set(); // NEW

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100 + 1);
  }

  checkBtn.addEventListener("click", () => {
    const guess = Number(inputHolder.value);

    if (guess > 100 || guess < 1 || isNaN(guess)) {
      textOutput.textContent = "Please enter a number between 1 to 100.";
      return;
    }

    if (guessedNums.has(guess)) {
      textOutput.textContent = `You've already guessed ${guess}. Try a different number.`;
      return;
    }

    guessedNums.add(guess); // NEW

    attempts++;
    attemptsText.textContent = attempts;

    const diff = randomNum - guess;
    const isSlightlyHigher = diff < 0 && Math.abs(diff) <= 10;
    const isSlightlyLower = diff > 0 && Math.abs(diff) <= 10;

    if (guess === randomNum) {
      textOutput.textContent = "Your guess is Correct!";
      checkBtn.disabled = true;
      inputHolder.disabled = true;
    } else if (isSlightlyHigher) {
      textOutput.textContent = "Your guess is SLIGHTLY HIGHER! Try again!";
    } else if (isSlightlyLower) {
      textOutput.textContent = "Your guess is SLIGHTLY LOWER! Try again!";
    } else if (guess > randomNum) {
      textOutput.textContent = "Your guess is TOO HIGH! Try again!";
    } else {
      textOutput.textContent = "Your guess is TOO LOW! Try again!";
    }

    if (attempts >= 5 && guess !== randomNum) {
      textOutput.textContent = "TOO MANY ATTEMPTS! Reset?";
      checkBtn.disabled = true;
      inputHolder.disabled = true;
      resetBtn.style.display = "inline-block";
    }
  });

  resetBtn.addEventListener("click", () => {
    randomNum = generateRandomNumber();
    attempts = 0;
    guessedNums.clear(); // NEW: unlock all numbers
    inputHolder.value = "";
    attemptsText.textContent = attempts;
    textOutput.textContent = "";
    checkBtn.disabled = false;
    inputHolder.disabled = false;
    resetBtn.style.display = "none";
  });
})();
