import './styles.css';
import createPlayer from './modules/createPlayer';
import { placeShips, placeShipsAuto } from './modules/placeShip';
import { startGame } from './modules/gameController';

const gamePieces = [
  ['Carrier', 5],
  ['Battleship', 4],
  ['Destroyer', 3],
  ['Submarine', 3],
  ['Patrol Boat', 2],
];

// Player places all ships, then game begins
async function setupGame() {
  const playerOne = createPlayer(gamePieces, 'p1');
  await placeShips(playerOne);
  // placeShipsAuto(playerOne); // debug
  document.querySelector('.rotate').style.display = 'none';
  const playerRobot = createPlayer(gamePieces, 'robot');
  document.querySelector('.playerTwo').style.display = 'flex';
  placeShipsAuto(playerRobot);
  startGame(playerOne, playerRobot);
}

// Clears all tile styling, empties message box, and begins setup
function resetGame() {
  document.querySelector('.rotate').style.display = 'block';
  const classes = ['ship', 'hit', 'miss'];
  document.querySelectorAll('.tile').forEach((tile) => {
    classes.forEach((e) => {
      tile.classList.remove(e);
    });
  });
  document.querySelector('.playerTwo').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
  const messageBox = document.querySelector('.messageContainer');
  while (messageBox.children.length > 0) {
    messageBox.removeChild(messageBox.firstElementChild);
  }
  setupGame();
}

document.querySelector('.reset').onclick = resetGame;
setupGame();
