import createShips from './createShip';
import createBoard from './createBoard';

function createPlayer(gamePieces, user) {
  return {
    playerName: user,
    gameBoard: createBoard(user),
    ships: createShips(gamePieces),
  };
}

export default createPlayer;
