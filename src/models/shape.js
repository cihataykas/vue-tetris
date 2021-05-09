/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
// eslint-disable-next-line max-classes-per-file
export default class Shape {
  constructor(x = 0, y = 0, gameMap) {
    this.x = x;
    this.y = y;
    this.tiles = [];
    this.gameMap = gameMap;
    this.rotations = [];
    this.currentRotation = 0;
    this.render();
  }

  get height() {
    return this.tiles.length;
  }

  get width() {
    return this.tiles[0].length;
  }

  get mapWidth() {
    return this.gameMap.tiles[0].length;
  }

  get mapHeight() {
    return this.gameMap.tiles.length;
  }

  get bounds() {
    return {
      x1: this.x, y1: this.y, x2: this.x + this.height, y2: this.y + this.width,
    };
  }

  isHit(directionX = 0, directionY = 0) {
    for (let i = 0; i < this.tiles.length; i++) {
      const row = this.tiles[i];
      for (let j = 0; j < row.length; j++) {
        const tile = row[j];
        const nextRow = this.gameMap.tiles[this.x + i + directionX];

        if (!nextRow) {
          return true;
        }

        const tilePositionOnMap = nextRow[this.y + j + directionY];

        if (tile === 1 && (tilePositionOnMap === 1 || tilePositionOnMap === undefined)) {
          console.log(tile);
          console.log(tilePositionOnMap);
          return true;
        }
      }
    }

    return false;
  }

  moveDown() {
    if (!this.isHit(1, 0)) {
      this.x += 1;

      return true;
    }

    return false;
  }

  moveLeft() {
    if (!this.isHit(0, -1)) {
      this.y -= 1;

      return true;
    }

    return false;
  }

  moveRight() {
    if (!this.isHit(0, 1)) {
      this.y += 1;

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
