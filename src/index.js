import './styles.css';
import createPlayer from './modules/createPlayer';
import placeShips from './modules/placeShip';

const gamePieces = [
  ['Carrier', 5],
  ['Battleship', 4],
  ['Destroyer', 3],
  ['Submarine', 3],
  ['Patrol Boat', 2],
];

const playerOne = createPlayer(gamePieces, 'p1');
placeShips(playerOne);
console.log(playerOne.gameBoard.board);
const playerRobot = createPlayer(gamePieces, 'robot');
