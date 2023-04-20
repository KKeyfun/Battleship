import addMessage from './messageBox';

// Used to track and handle current player, and return opponent
const players = {
  currentPlayer: null,
  playerOne: null,
  playerTwo: null,
  toggleTurn() {
    this.currentPlayer = this.getOtherPlayer();
    addMessage(`${this.currentPlayer.playerName}'s turn`);
  },
  getOtherPlayer() {
    return (this.playerOne === this.currentPlayer) ? this.playerTwo : this.playerOne;
  },
};

// Set up click listeners on AI's board
function startGame(playerOne, playerTwo) {
  players.currentPlayer = playerOne;
  players.playerOne = playerOne;
  players.playerTwo = playerTwo;

  const tiles = document.querySelectorAll('.playerTwo .tile');
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', attackOpponent);
  }
  addMessage('Game has begun! Player 1\'s turn!');
}

// For attacking AI
function attackOpponent() {
  const opponentBoard = players.getOtherPlayer().gameBoard;
  const x = this.getAttribute('data-x');
  const y = this.getAttribute('data-y');
  const result = opponentBoard.receiveAttack(x, y);

  handleHit(result);
  this.removeEventListener('click', attackOpponent);
  players.toggleTurn();
  attackPlayer();
}

// For attacking the player, randomly generates coordinates
function attackPlayer() {
  const opponentBoard = players.getOtherPlayer().gameBoard;

  let x = Math.floor(Math.random() * 9);
  let y = Math.floor(Math.random() * 9);

  while (checkDuplicates(opponentBoard.hitCoordinates, x, y)) {
    x = Math.floor(Math.random() * 9);
    y = Math.floor(Math.random() * 9);
  }

  const result = opponentBoard.receiveAttack(x, y);
  handleHit(result);

  players.toggleTurn();
}

// For AI, checks if tile has been attacked before
function checkDuplicates(arr, x, y) {
  let hasDuplicate = false;

  arr.forEach((coordinate) => {
    if (coordinate[0] === x && coordinate[1] === y) {
      hasDuplicate = true;
    }
  });

  return hasDuplicate;
}

// Adds new message to the message box on hit/miss and calls win function when no ships left
function handleHit(result) {
  if (typeof (result) === 'object') {
    addMessage(`${players.currentPlayer.playerName} fired and sunk the enemy ${result.name}!`);
    delete players.getOtherPlayer().ships[result.name];

    if (Object.keys(players.getOtherPlayer().ships).length < 1) {
      win(players.currentPlayer.playerName);
    }
  } else if (result) {
    addMessage(`${players.currentPlayer.playerName} fired and hit a ship!`);
  } else {
    addMessage(`${players.currentPlayer.playerName} fired and missed!`);
  }
}

// Displays modal with appropriate message and reset button
function win(player) {
  addMessage(`${player} wins!`);
  const tiles = document.querySelectorAll('.tile');
  for (let i = 0; i < tiles.length; i++) {
    if (i >= tiles.length / 2 && i <= tiles.length) {
      tiles[i].removeEventListener('click', attackOpponent);
    }
  }
  document.querySelector('.overlay').style.display = 'flex';
  document.querySelector('.modalText').textContent = `${player.charAt(0).toUpperCase() + player.slice(1)} wins!`;
}

export { startGame, checkDuplicates };
