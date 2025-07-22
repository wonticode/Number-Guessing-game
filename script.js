const inputHolder = document.getElementById("guessNum");
const checkBtn = document.getElementById("checkNum");
const resetBtn = document.getElementById("reset");
const textOutput = document.getElementById("resultDesc");
const attemptsText = document.getElementById("attempts");
const inputLabel = document.getElementById("inputLabel");
let randomNum = Math.floor(Math.random() * 100 + 1);

let attempts = 0;
let guess = inputHolder.value;

checkBtn.addEventListener("click", () => {
  guess = inputHolder.value;
  let diff = randomNum - guess;
  let isSlightlyHigher = diff < 0 && Math.abs(diff) <= 10;
  let isSlightlyLower = diff > 0 && Math.abs(diff) <= 10;
  console.log("your button is working.");
  if (guess > 100 || guess < 1) {
    textOutput.textContent = "Please enter a number between 1 to 100.";
  } else {
    attempts++;
    attemptsText.textContent = attempts;
    if (attempts > 5) {
      textOutput.textContent = "TOO MANY ATTEMPTS! Reset?";
      checkBtn.disabled = true;
      inputHolder.disabled = true;
      resetBtn.style.display = "inline-block";
    } else {
      if (guess == randomNum) {
        textOutput.textContent = "Your guess is Correct!";
        checkBtn.disabled = true;
        inputHolder.disabled = true;
      } else if (isSlightlyHigher) {
        textOutput.textContent = `The number is SLIGHTLY LOWER! 
        Try again!`;
      } else if (isSlightlyLower) {
        textOutput.textContent = `The number is SLIGHTLY HIGHER!
         Try again!`;
      } else if (guess > randomNum) {
        textOutput.textContent = `Your guess is TOO HIGH! 
        Try again!`;
      } else if (guess < randomNum) {
        textOutput.textContent = `Your guess is TOO LOW! 
        Try again!`;
      }
    }
  }
});

resetBtn.addEventListener("click", () => {
  randomNum = Math.floor(Math.random() * 100 + 1);
  attempts = 0;
  attemptsText.textContent = attempts;
  textOutput.textContent = "";
  checkBtn.disabled = false;
  inputHolder.disabled = false;
  resetBtn.style.display = "none";
});
