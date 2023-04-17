const tile = (element) => ({
  ship: null,
  element,
  markHit() {
    this.element.classList.add('hit');
  },
  markMiss() {
    this.element.classList.add('miss');
  },
});
export default tile;
