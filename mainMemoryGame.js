let selected = [];
let hits = 0;
let moves = 0;
let blocked = false;
let timer;

// Function to generate random numbers from 1 to 8
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Generate arrangement with numbers from 1 to 8 in pairs
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const pairs = shuffle([...numbers, ...numbers]);

function reveal(id) {
  if (blocked) {
    return;
  }

  const button = document.getElementById(`button${id}`);
  const value = pairs[id];

  if (button.innerText !== "" || selected.length === 2) {
    return;
  }

  button.innerText = value;
  button.style.backgroundColor = "#fff";
  button.style.color = "#222";

  if (selected.length === 0) {
    selected.push(id);
  } else if (selected.length === 1) {
    moves++;
    document.getElementById("moves").innerText = `Moves: ${moves}`;
    selected.push(id);

    if (button.innerText === document.getElementById(`button${selected[0]}`).innerText) {
      hits++;

      if (hits === 8) {
        clearInterval(timer);
        setTimeout(() => {
          alert(`Congratulations, you've won!\nHits: ${hits}\nMoves: ${moves}`);
        }, 500);
      }

      document.getElementById("hits").innerText = `Hits: ${hits}`;
      selected = [];
    } else {
      blocked = true;

      setTimeout(() => {
        button.innerText = "";
        button.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        button.style.color = "#fff";
        document.getElementById(`button${selected[0]}`).innerText = "";
        document.getElementById(`button${selected[0]}`).style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        document.getElementById(`button${selected[0]}`).style.color = "#fff";
        selected = [];
        blocked = false;
      }, 1000);
    }
  }
}

function startTimer(duration, display) {
  let timeLeft = duration;
  timer = setInterval(() => {
    display.textContent = `Timer: ${timeLeft} sec`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      alert(`Game over. Try again!\nHits: ${hits}\nMoves: ${moves}`);
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  const duration = 30;
  const display = document.querySelector("#timer");

  startTimer(duration, display);
});
