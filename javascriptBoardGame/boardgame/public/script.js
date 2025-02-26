const board = document.getElementById('board');
const token = document.getElementById('token');
const rollButton = document.getElementById('roll-button');
const messageDiv = document.getElementById('message');

const gridSize = 8; // Number of squares per row/column
const squareSize = 80; // Size of each square in pixels
let currentPosition = 1; // Start at square 1

// Function to create the board
function createBoard() {
  for (let i = 1; i <= gridSize * gridSize; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.id = i; // Store the square ID
    board.appendChild(square);
  }
}

// Function to update the token's position on the board
function updateTokenPosition() {
  const row = Math.ceil(currentPosition / gridSize);
  const col = (currentPosition - 1) % gridSize + 1;

  const x = (col - 1) * squareSize;
  const y = (row - 1) * squareSize;

  token.style.left = `${x}px`;
  token.style.top = `${y}px`;
}

// Function to fetch square information and display the message
async function displaySquareMessage(squareId) {
  try {
    const response = await fetch(`http://localhost:3000/square/${squareId}`);
    const data = await response.json();
    messageDiv.textContent = data.message;
  } catch (error) {
    console.error('Error fetching square information:', error);
    messageDiv.textContent = 'Error loading square information.';
  }
}

// Roll dice function
async function rollDice() {
  try {
    const response = await fetch('http://localhost:3000/roll');
    const data = await response.json();
    const roll = data.roll;
    console.log('Dice Roll:', roll);

    // Update the player's position
    currentPosition += roll;

    // Check if the player has gone past the end of the board
    if (currentPosition > gridSize * gridSize) {
      currentPosition = gridSize * gridSize; // Stop at the last square
    }

    updateTokenPosition();
    displaySquareMessage(currentPosition);

  } catch (error) {
    console.error('Error rolling dice:', error);
    messageDiv.textContent = 'Error rolling dice.';
  }
}

// Event listener for the roll button
rollButton.addEventListener('click', rollDice);

// Initialize the game
createBoard();
updateTokenPosition();
displaySquareMessage(currentPosition);
