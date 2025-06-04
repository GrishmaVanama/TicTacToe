const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const winnerMessage = document.getElementById('winnerMessage');

let currentPlayer = 'x';
let isGameOver = false;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function startGame() {
  currentPlayer = 'x';
  isGameOver = false;
  winnerMessage.innerText = '';
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.innerText = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  if (isGameOver) return;
  const cell = e.target;
  cell.classList.add(currentPlayer);
  cell.innerText = currentPlayer.toUpperCase();

  if (checkWin(currentPlayer)) {
    isGameOver = true;
    winnerMessage.innerText = `Player ${currentPlayer.toUpperCase()} Wins!`;
  } else if (isDraw()) {
    isGameOver = true;
    winnerMessage.innerText = "It's a Draw!";
  } else {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  }
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(player);
    });
  });
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('x') || cell.classList.contains('o')
  );
}

restartButton.addEventListener('click', startGame);

startGame(); // Start the game initially
