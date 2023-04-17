const highlight = (x, y, ship, board) => function () {
  if (checkFit(x, y, ship.size, ship.axis)) {
    if (ship.axis === 'X') {
      for (let i = 0; i < ship.size; i++) {
        board[x + i][y].element.classList.add('highlight');
      }
    } else {
      for (let i = 0; i < ship.size; i++) {
        board[x][y + i].element.classList.add('highlight');
      }
    }
  } else {
    board[x][y].element.classList.add('invalid');
  }
};

const clearBoard = (board) => function () {
  board.forEach((row) => {
    row.forEach((tile) => {
      tile.element.classList.remove('highlight');
      tile.element.classList.remove('invalid');
    });
  });
};

function checkFit(x, y, size, axis) {
  return (axis === 'X') ? (x + size - 1 <= 9) : (y + size - 1 <= 9);
}

export {
  highlight, clearBoard,
};
