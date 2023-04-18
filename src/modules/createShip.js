const ship = (name, size) => {
  // eslint-disable-next-line prefer-const
  let _hit = 0;
  return {
    name,
    size,
    coordinates: [],
    axis: 'X',
    hit() {
      this._hit += 1;
    },
    isSunk() {
      return this.size === this.hit();
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
