const words = ["INFRASTRUKTUR", "DIGITAL", "API"];
let score = 0;

const container = document.getElementById("game-container");
const scoreEl = document.getElementById("score-value");

// Grid erzeugen (12x12)
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for(let i=0;i<144;i++){
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.textContent = letters[Math.floor(Math.random()*letters.length)];
  container.appendChild(cell);

  cell.addEventListener("click", ()=>{
    cell.classList.toggle("selected");
    // Später: prüfen, ob Wort gefunden
  });
}