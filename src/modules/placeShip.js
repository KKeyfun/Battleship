import { highlight, clearBoard } from './placeShipStyling';

function placeShips(player) {
  const rotate = document.querySelector('.rotate');
  const message = document.querySelector('.message');
  (async function () {
    for (const ship in player.ships) {
      const shipObject = player.ships[ship];
      message.textContent = `Now placing: ${shipObject.name}`;
      rotate.addEventListener('click', rotateShip(shipObject));
      await addListeners(shipObject, player.gameBoard.board);
      rotate.removeEventListener('click', rotateShip(shipObject));
      console.log('this should not fire until ship is placed');
    }
  }());
}

const map = {}; // used to store curried function references
function addListeners(ship, board) {
  return new Promise((resolve) => {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        map[`${x},${y}`] = [];
        const tile = board[x][y].element;
        map[`${x},${y}`].push(highlight(x, y, ship, board));
        tile.addEventListener('mouseenter', map[`${x},${y}`][0]);
        map[`${x},${y}`].push(clearBoard(board));
        tile.addEventListener('mouseleave', map[`${x},${y}`][1]);
        map[`${x},${y}`].push(place(x, y, ship, board, resolve));
        tile.addEventListener('click', map[`${x},${y}`][2]);
      }
    }
  });
}

const removeListeners = (board) => {
  board.forEach((column, x) => {
    column.forEach((tile, y) => {
      tile.element.removeEventListener('mouseenter', map[`${x},${y}`][0]);
      tile.element.removeEventListener('mouseleave', map[`${x},${y}`][1]);
      tile.element.removeEventListener('click', map[`${x},${y}`][2]);
    });
  });
};

const rotateShip = (ship) => function () {
  ship.axis = (ship.axis === 'X') ? 'Y' : 'X';
};

const place = (x, y, ship, board, resolve) => function () {
  // event.target // get attributes x/y
  if (!checkCollisions(x, y, ship, board)) {
    if (ship.axis === 'X') {
      for (let i = 0; i < ship.size; i++) {
        ship.coordinates.push([x + i, y]);
        board[x + i][y].isOccupied = true;
      }
    } else {
      for (let i = 0; i < ship.size; i++) {
        ship.coordinates.push([x, y + i]);
        board[x][y + i].isOccupied = true;
      }
    }
    ship.coordinates.forEach((coordinate) => {
      board[coordinate[0]][coordinate[1]].element.classList.add('ship');
    });
    console.log(ship.coordinates);
    console.log(ship);
    removeListeners(board);
    return resolve();
  }
};

function checkCollisions(x, y, ship, board) {
  let collisions = false;
  if (ship.axis === 'X') {
    for (let i = 0; i < ship.size; i++) {
      if (board[x + i][y].isOccupied) collisions = true;
    }
  } else {
    for (let i = 0; i < ship.size; i++) {
      if (board[x][y + i].isOccupied) collisions = true;
    }
  }
  return collisions;
}

export default placeShips;
