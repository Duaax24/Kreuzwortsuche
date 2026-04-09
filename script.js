const words = ["DATA", "ECONOMY", "TRADE", "EFFICIENCY" , "ENERGY",];   // ["DATA", "ECONOMY", "TRADE", "EFFICIENCY, "ENERGY"]
let foundWords = [];
let score = 0;

const GRID_SIZE = 10;
const container = document.getElementById("game-container");
const scoreEl = document.getElementById("score-value");
const wordsListEl = document.getElementById("words-to-find");
const messageEl = document.getElementById("message");
const popup = document.getElementById("popup");

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

// Wort platzieren (horizontal oder vertikal, korrekt)
function placeWord(word) {
  let placed = false;
  let attempts = 0;

  while (!placed && attempts < 100) {
    attempts++;

    const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

    if (direction === "horizontal") {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * (GRID_SIZE - word.length + 1));

      let canPlace = true;

      for (let i = 0; i < word.length; i++) {
        const index = row * GRID_SIZE + (col + i);
        const existingLetter = cells[index].textContent;

        if (
          cells[index].dataset.word &&
          existingLetter !== word[i]
        ) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        for (let i = 0; i < word.length; i++) {
          const index = row * GRID_SIZE + (col + i);
          cells[index].textContent = word[i];
          cells[index].dataset.word = word;
        }
        placed = true;
      }

    } else {
      const row = Math.floor(Math.random() * (GRID_SIZE - word.length + 1));
      const col = Math.floor(Math.random() * GRID_SIZE);

      let canPlace = true;

      for (let i = 0; i < word.length; i++) {
        const index = (row + i) * GRID_SIZE + col;
        const existingLetter = cells[index].textContent;

        if (
          cells[index].dataset.word &&
          existingLetter !== word[i]
        ) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        for (let i = 0; i < word.length; i++) {
          const index = (row + i) * GRID_SIZE + col;
          cells[index].textContent = word[i];
          cells[index].dataset.word = word;
        }
        placed = true;
      }
    }
  }
}

// Wörter ins Grid setzen
words.forEach(word => placeWord(word));

// Auswahl-Logik
let selection = [];

cells.forEach(cell => {
  cell.addEventListener("click", () => {

    // Auswahl togglen
    cell.classList.toggle("selected");

    if (cell.classList.contains("selected")) {
      selection.push(cell);
    } else {
      selection = selection.filter(c => c !== cell);
    }

    // Prüfen ob Wort gefunden
    words.forEach(word => {
      if (!foundWords.includes(word)) {

        const wordCells = cells.filter(c => c.dataset.word === word);

        // NEUE stabile Prüfung
        if (
          wordCells.length === selection.length &&
          wordCells.every(c => selection.includes(c))
        ) {

          // Wort als gefunden markieren
          wordCells.forEach(c => {
            c.classList.add("found");
            c.classList.remove("selected");
          });

          foundWords.push(word);
          score += word.length;
          scoreEl.textContent = score;

          document.getElementById(`word-${word}`).classList.add("found-word");

          messageEl.textContent = `Du hast das Wort "${word}" gefunden! 🎉`;
          setTimeout(() => { messageEl.textContent = ""; }, 2000);

          // Auswahl zurücksetzen
          selection = [];

          // 🎉 Popup wenn alles gefunden
          if (foundWords.length === words.length) {
            console.log("ALLE WÖRTER GEFUNDEN!");
            setTimeout(() => {
              popup.style.display = "flex";
            }, 500);
          }
        }
      }
    });

  });
});

// Restart Funktion (WICHTIG: außerhalb!)
function restartGame() {
  location.reload();
}