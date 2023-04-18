const tile = (element) => ({
  ship: null,
  element,
  isOccupied: false,
  markHit() {
    this.element.classList.add('hit');
  },
  markMiss() {
    this.element.classList.add('miss');
  },
});
export default tile;
