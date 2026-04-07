const words = ["ENERGY", "ECONOMY", "TRADE"];
let foundWords = [];
let score = 0;

const GRID_SIZE = 10;
const container = document.getElementById("game-container");
const scoreEl = document.getElementById("score-value");
const wordsListEl = document.getElementById("words-to-find");
const messageEl = document.getElementById("message");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Wörterliste anzeigen
words.forEach(word => {
  const li = document.createElement("li");
  li.textContent = word;
  li.id = `word-${word}`;
  wordsListEl.appendChild(li);
});

// Grid erzeugen
let cells = [];
for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  cell.textContent = letters[Math.floor(Math.random() * letters.length)];
  container.appendChild(cell);
  cells.push(cell);
}




// Funktion: Wort horizontal oder vertikal platzieren
function placeWord(word) {
  const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
  if (direction === "horizontal") {
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * (GRID_SIZE - word.length));
    for (let i = 0; i < word.length; i++) {
      let index = row * GRID_SIZE + (col + i);
      cells[index].textContent = word[i];
      cells[index].dataset.word = word;
    }
  } else { // vertikal
    const row = Math.floor(Math.random() * (GRID_SIZE - word.length));
    const col = Math.floor(Math.random() * GRID_SIZE);
    for (let i = 0; i < word.length; i++) {
      let index = (row + i) * GRID_SIZE + col;
      cells[index].textContent = word[i];
      cells[index].dataset.word = word;
    }
  }
}

// Alle Wörter platzieren
words.forEach(word => placeWord(word));

// Auswahl-Logik
let selection = [];
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    cell.classList.toggle("selected");
    if (cell.classList.contains("selected")) {
      selection.push(cell);
    } else {
      selection = selection.filter(c => c !== cell);
    }

    // Prüfen, ob ein Wort komplett markiert ist
    words.forEach(word => {
      if (!foundWords.includes(word)) {
        const wordCells = cells.filter(c => c.dataset.word === word);
        if (wordCells.every(c => c.classList.contains("selected"))) {
          wordCells.forEach(c => c.classList.add("found"));
          wordCells.forEach(c => c.classList.remove("selected"));
          foundWords.push(word);
          score += word.length;
          scoreEl.textContent = score;
          document.getElementById(`word-${word}`).classList.add("found-word");
          messageEl.textContent = `Du hast das Wort "${word}" gefunden! 🎉`;
          setTimeout(() => { messageEl.textContent = ""; }, 2000);
        }
      }
    });
  });
});