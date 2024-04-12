const words = ["hangman", "javascript", "programming", "computer", "internet"];
let chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = [];
let incorrectGuesses = 0;
let correctGuesses = 0;
let guessedLetters = [];

const hangmanParts = [
  `<line x1="0" y1="300" x2="250" y2="300" stroke="#000" stroke-width="8"/>
  <line x1="50" y1="300" x2="50" y2="50" stroke="#000" stroke-width="8"/>
  <line x1="180" y1="54" x2="50" y2="54" stroke="#000" stroke-width="8"/>`,
  `<circle cx="176" cy="120" r="20" fill="#fff" stroke="#000" stroke-width="8"/>`,
  `<line x1="176" y1="143" x2="176" y2="220" stroke="#000" stroke-width="8"/>`,
  `<line x1="176" y1="155" x2="141" y2="200" stroke="#000" stroke-width="8"/>`,
  `<line x1="176" y1="155" x2="210" y2="200" stroke="#000" stroke-width="8"/>`,
  `<line x1="176" y1="215" x2="140" y2="270" stroke="#000" stroke-width="8"/>`,
  `<line x1="176" y1="215" x2="212" y2="270" stroke="#000" stroke-width="8"/>`,
  `<line x1="176" y1="55" x2="176" y2="100" stroke="#000" stroke-width="8"/>`,
];

function displayHangmanParts() {
  const svg = document.querySelector("svg");
  for (let i = 0; i < incorrectGuesses; i++) {
    svg.innerHTML += hangmanParts[i];
  }
}

function displayGuessedWord() {
  const wordToGuessElement = document.getElementById("wordToGuess");
  wordToGuessElement.textContent = guessedWord.join(" ");
}

function displayGuessesLeft() {
  const guessesElement = document.getElementById("guesses");
  const guessesLeft = 8 - incorrectGuesses;
  guessesElement.textContent = `Guesses Left: ${guessesLeft}`;
}

function guess() {
  const guessInput = document.getElementById("guessInput");
  const letter = guessInput.value.toLowerCase();

  if (letter && /^[a-zA-Z]*$/.test(letter) && letter.length === 1) {
    if (guessedLetters.includes(letter)) {
      alert("You already guessed this letter. Try a different one.");
    } else {
      guessedLetters.push(letter);
      let foundLetter = false;
      for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letter) {
          guessedWord[i] = letter.toUpperCase();
          correctGuesses++;
          foundLetter = true;
        }
      }
      if (!foundLetter) {
        incorrectGuesses++;
      }

      guessInput.value = "";
      displayGuessedWord();
      displayHangmanParts();
      displayGuessesLeft();

      if (correctGuesses === chosenWord.length) {
        alert("Congratulations! You guessed the word!");
        guessInput.disabled = true;
        document.querySelector("button").disabled = true;
      } else if (incorrectGuesses === 8) {
        alert(`Game over! The word was: ${chosenWord}`);
      }
    }
  } else {
    alert("Please enter a valid single letter.");
  }
}

function setup() {
  for (let i = 0; i < chosenWord.length; i++) {
    guessedWord.push("_");
  }
  displayGuessedWord();
  displayGuessesLeft();
}

setup();
