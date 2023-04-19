import { highlight, clearBoard } from './placeShipStyling';

async function placeShips(player) {
  return new Promise((resolve) => {
    const rotate = document.querySelector('.rotate');
    const message = document.querySelector('.message');
    (async function () {
      for (const ship in player.ships) {
        const shipObject = player.ships[ship];
        message.textContent = `Now placing: ${shipObject.name}`;
        rotate.addEventListener('click', rotateShip(shipObject));
        await addListeners(shipObject, player.gameBoard.board);
        rotate.removeEventListener('click', rotateShip(shipObject));
        removeListeners(player.gameBoard.board);
        console.log('this should not fire until ship is placed');
      }
      return resolve();
    }());
  });
}

function placeShipsRobot(player) {
  const { board } = player.gameBoard;
  console.log(board);
  for (const ship in player.ships) {
    const shipObject = player.ships[ship];
    let x = generateRandomNumber();
    let y = generateRandomNumber();

    while (!checkFit(x, y, shipObject.size, shipObject.axis) || checkCollisions(x, y, shipObject, board)) {
      x = generateRandomNumber();
      y = generateRandomNumber();
    }

    if (shipObject.axis === 'X') {
      for (let i = 0; i < shipObject.size; i++) {
        shipObject.coordinates.push([x + i, y]);
        board[x + i][y].isOccupied = true;
        board[x + i][y].ship = shipObject;
      }
    } else {
      for (let i = 0; i < shipObject.size; i++) {
        shipObject.coordinates.push([x, y + i]);
        board[x][y + i].isOccupied = true;
        board[x][y + i].ship = shipObject;
      }
    }
    shipObject.coordinates.forEach((coordinate) => {
      board[coordinate[0]][coordinate[1]].element.classList.add('ship');
    });
    console.log(shipObject.coordinates);
    console.log(shipObject);
  }
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 9);
}

const map = {}; // used to store curried function references
function addListeners(ship, board) {
  return new Promise((resolve) => {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        map[`${x},${y}`] = [];
        const tile = board[x][y].element;
        map[`${x},${y}`].push(highlight(x, y, ship, board, checkFit));
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
        board[x + i][y].ship = ship;
      }
    } else {
      for (let i = 0; i < ship.size; i++) {
        ship.coordinates.push([x, y + i]);
        board[x][y + i].isOccupied = true;
        board[x][y + i].ship = ship;
      }
    }
    ship.coordinates.forEach((coordinate) => {
      board[coordinate[0]][coordinate[1]].element.classList.add('ship');
    });
    console.log(ship.coordinates);
    console.log(ship);
    return resolve();
  }
};

function checkFit(x, y, size, axis) {
  return (axis === 'X') ? (x + size - 1 <= 9) : (y + size - 1 <= 9);
}

function checkCollisions(x, y, ship, board) {
  const collisions = false;
  if (ship.axis === 'X') {
    for (let i = 0; i < ship.size; i++) {
      if (!board[x + i] || board[x + i][y].isOccupied) return true;
    }
  } else {
    for (let i = 0; i < ship.size; i++) {
      if (!board[x][y + i] || board[x][y + i].isOccupied) return true;
    }
  }
  return collisions;
}

export { placeShips, placeShipsRobot };
