const gridSize = 4;
const gridContainer = document.querySelector('.grid');
let gameOver = false;

// Function to generate a random empty cell
function generateRandomEmptyCell() {
  const emptyCells = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = gridContainer.querySelector(`.grid-cell[data-row="<span class="math-inline">\{row\}"\]\[data\-col\="</span>{col}"]`);
      if (cell.textContent === '') {
        emptyCells.push({ row, col });
      }
    }
  }
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

// Function to create a new tile
function createNewTile() {
  const randomCell = generateRandomEmptyCell();
  if (!randomCell) {
    return; // No empty cells, game might be over
  }
  const newTile = document.createElement('div');
  newTile.classList.add('grid-cell');
  newTile.dataset.row = randomCell.row;
  newTile.dataset.col = randomCell.col;
  const value = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
  newTile.textContent = value;
  gridContainer.appendChild(newTile);
}

// Function to move tiles in a specific direction
function moveTiles(direction) {
  let moved = false;
  for (let row = 0; row < gridSize; row++) {
    const cells = [];
    for (let col = 0; col < gridSize; col++) {
      const cell = gridContainer.querySelector(`.grid-cell[data-row="<span class="math-inline">\{row\}"\]\[data\-col\="</span>{col}"]`);
      if (cell.textContent !== '') {
        cells.push(cell);
      }
    }

    switch (direction) {
      case 'up':
        cells.sort((a, b) => parseInt(a.dataset.row) - parseInt(b.dataset.row));
        break;
      case 'down':
        cells.sort((a, b) => parseInt(b.dataset.row) - parseInt(a.dataset.row));
        break;
      case 'left':
        cells.sort((a, b) => parseInt(a.dataset.col) - parseInt(b.dataset.col));
        break;
      case 'right':
        cells.sort((a, b) => parseInt(b.dataset.col) - parseInt(a.dataset.col));
        break;
    }

    let canMerge = true;
    for (let i = 0; i < cells.length - 1; i++) {
      const cell = cells[i];
      const nextCell = cells[i + 
