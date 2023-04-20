const ship = (name, size) => {
  let hitsTaken = 0;
  return {
    name,
    size,
    coordinates: [],
    axis: 'X',
    hit() {
      hitsTaken += 1;
    },
    isSunk() {
      return size === hitsTaken;
    },
  };
};

function createShips(ships) {
  const playerShips = {};
  ships.forEach((piece) => {
    playerShips[piece[0]] = ship(piece[0], piece[1]);
  });
  return playerShips;
}

export default createShips;
