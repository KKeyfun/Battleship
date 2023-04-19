import './styles.css';
import createPlayer from './modules/createPlayer';
import { placeShips, placeShipsRobot } from './modules/placeShip';
import startGame from './gameController';

const gamePieces = [
  ['Carrier', 5],
  ['Battleship', 4],
  ['Destroyer', 3],
  ['Submarine', 3],
  ['Patrol Boat', 2],
];

async function setupGame() {
  const playerOne = createPlayer(gamePieces, 'p1');
  await placeShips(playerOne);
  document.querySelector('.rotate').style.display = 'none';
  console.log(playerOne.gameBoard.board);
  const playerRobot = createPlayer(gamePieces, 'robot');
  document.querySelector('.playerTwo').style.display = 'flex';
  placeShipsRobot(playerRobot);
  console.log(playerOne, playerRobot);
  startGame(playerOne, playerRobot);
}

setupGame();
