import './styles.css';
import initializePlayer from './modules/initializePlayer';

const gamePieces = [
  ['Carrier', 5],
  ['Battleship', 4],
  ['Destroyer', 3],
  ['Submarine', 3],
  ['Patrol Boat', 2],
];

initializePlayer(gamePieces, 'p1');
initializePlayer(gamePieces, 'robot');
