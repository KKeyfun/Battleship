import { highlight, clearBoard } from './placeShipStyling';

function placeShips(player) {
  const rotate = document.querySelector('.rotate');
  // eslint-disable-next-line prefer-destructuring
  // const ships = player.ships;
  (async function () {
    for (const ship of player.ships) {
      console.log(ship);
      // eslint-disable-next-line prefer-arrow-callback
      rotate.addEventListener('click', rotateShip(ship));
      await addListeners(ship, player.gameBoard.board);
      rotate.removeEventListener('click', rotateShip(ship));
      console.log('this should not fire until ship is placed');
    }
  }());
}
// addeventlistener ship.hit on coordinates on the click event

function addListeners(ship, board) {
  return new Promise((resolve) => {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const tile = board[x][y].element;
        tile.onmouseenter = highlight(x, y, ship, board);
        tile.onmouseleave = clearBoard(board);
        tile.onclick = place(board, x, y, ship);
        tile.addEventListener('click', function remove() {
          tile.onmouseenter = null;
          tile.onmouseleave = null;
          tile.onclick = null;
          tile.removeEventListener('click', remove);
          return resolve();
        });
      }
    }
  });
}

// const removeListeners = (board, resolve) => function () {
//   board.forEach((row) => {
//     row.forEach((tile) => {
//       tile.element.removeEventListener('mouseenter', highlight);
//       tile.element.removeEventListener('mouseleave', clearBoard);
//       tile.element.removeEventListener('click', place);
//     });
//   });
//   return resolve();
// };

const rotateShip = (ship) => function () {
  ship.axis = (ship.axis === 'X') ? 'Y' : 'X';
};

const place = (board, x, y, ship) => function () {
  if (ship.axis === 'X') {
    for (let i = 0; i < ship.size; i++) {
      ship.coordinates.push([x + i, y]);
    }
  } else {
    for (let i = 0; i < ship.size; i++) {
      ship.coordinates.push([x, y + i]);
    }
  }
  ship.coordinates.forEach((coordinate) => {
    board[coordinate[0]][coordinate[1]].element.classList.add('ship');
  });

  // TODO - update the tiles that ships sit on
};

export default placeShips;
