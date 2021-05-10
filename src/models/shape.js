/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
// eslint-disable-next-line max-classes-per-file
export default class Shape {
  constructor(x = 0, y = 0, gameMap) {
    this.id = 0;
    this.x = x;
    this.y = y;
    this.tiles = [];
    this.landed = false;
    this.gameMap = gameMap;
    this.rotations = [];
    this.currentRotation = 0;
    this.render();
  }

  land() {
    this.tiles = this.tiles.map(row => row.map(tile => (tile === this.id ? -1 : tile)));
    this.landed = true;
    this.id = -1;
  }

  detectHit(direction = 'down') {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        const tile = this.tiles[i][j];

        if (tile === this.id) {
          const tileX = this.x + i;
          const tileY = this.y + j;

          if (direction === 'right') {
            const rightCol = this.gameMap.tiles[tileX][tileY + 1];
            const notSameId = rightCol !== this.id;
            const notOccupied = rightCol !== 0;
            if (notSameId && notOccupied) {
              return true;
            }
          }

          if (direction === 'left') {
            const leftCol = this.gameMap.tiles[tileX][tileY - 1];
            const notSameId = leftCol !== this.id;
            const notOccupied = leftCol !== 0;

            if (notSameId && notOccupied) {
              return true;
            }
          }

          if (direction === 'down') {
            const downRow = this.gameMap.tiles[tileX + 1];

            if (downRow === undefined) {
              this.land();
              return true;
            }

            const downCol = downRow[tileY];

            if (downCol !== this.id && downCol !== 0 && downCol === -1) {
              this.land();
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  moveDown() {
    if (!this.detectHit() && !this.landed) {
      this.x += 1;
    }

    return !this.landed;
  }

  moveLeft() {
    if (!this.detectHit('left')) {
      this.y -= 1;

      this.detectHit();
      return true;
    }

    return false;
  }

  moveRight() {
    if (!this.detectHit('right')) {
      this.y += 1;

      this.detectHit();
      return true;
    }

    return false;
  }

  rotate() {
    this.currentRotation++;
    const next = this.currentRotation % this.rotations.length;
    this.tiles = this.rotations[next];
  }

  render() {
    const renderData = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.tiles.length; i++) {
      const tileRow = this.tiles[i];
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < tileRow.length; j++) {
        const tile = tileRow[j];

        const xPos = this.x + i;
        const yPos = this.y + j;

        renderData.push({ x: xPos, y: yPos, value: tile });
      }
    }

    return renderData;
  }
}
