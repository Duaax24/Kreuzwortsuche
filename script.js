const words = ["ENERGY", "ECONOMY", "TRADE"];
let foundWords = [];
let score = 0;

const container = document.getElementById("game-container");
const scoreEl = document.getElementById("score-value");
const wordsListEl = document.getElementById("words-to-find");
const messageEl = document.getElementById("message");

// Grid Größe
const GRID_SIZE = 14;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Anzeige der Wörter
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

// Funktion: Wort in Grid platzieren (horizontal)
function placeWord(word) {
  let startRow = Math.floor(Math.random() * GRID_SIZE);
  let startCol = Math.floor(Math.random() * (GRID_SIZE - word.length));
  for (let i = 0; i < word.length; i++) {
    let index = startRow * GRID_SIZE + (startCol + i);
    cells[index].textContent = word[i];
    cells[index].dataset.word = word;
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