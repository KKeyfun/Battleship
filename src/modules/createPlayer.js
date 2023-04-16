import createShips from './createShip';
import createBoard from './createBoard';

function createPlayer(gamePieces, user) {
  return {
    gameBoard: createBoard(user),
    ships: createShips(gamePieces),
  };
}

export default createPlayer;
