import tile from './tile';

function createBoard(player) {
  const board = [...Array(10)].map(() => Array(10)); // set up 2D array representing the board
  for (let y = 0; y < 10; y++) {
    const currentRow = (player === 'p1') ? document.querySelectorAll(`.playerOne [data-y="${y}"]`) : document.querySelectorAll(`.playerTwo [data-y="${y}"]`);
    for (let x = 0; x < 10; x++) {
      board[x][y] = tile(currentRow[x]); // maybe also do a tile object representing hits
    }
  }
  return {
    board,
    hitCoordinates: [],
    receiveAttack(x, y) {
      const tileObj = this.board[x][y];
      if (tileObj.isOccupied) {
        tileObj.ship.hit();
        tileObj.markHit();
        this.hitCoordinates.push([x, y]);
        return 'hit';
      }
      tileObj.markMiss();
      return 'missed';
    },
  };
}

export default createBoard;
