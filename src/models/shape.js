import Tile from './tile';

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

  buildTiles(tiles) {
    tiles = tiles || this.tiles;

    for (const [rowIndex, row] of tiles.entries()) {
      for (const [tileIndex, tile] of row.entries()) {
        tiles[rowIndex][tileIndex] = new Tile(tile, this);
      }
    }
  }

  land() {
    this.tiles = this.tiles.map(row => row.map(tile => {
      tile.value = tile.value === this.id ? -1 : tile.value;

      return tile;
    }));

    this.landed = true;
    this.id = -1;
  }

  detectHit(direction = 'down') {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        const tile = this.tiles[i][j];

        if (tile.value === this.id) {
          const tileX = this.x + i;
          const tileY = this.y + j;

          if (direction === 'right') {
            const rightCol = this.gameMap.landedTiles[tileX][tileY + 1];
            const notSameId = rightCol !== this.id || rightCol === -1;
            const notEmpty = rightCol !== 0;

            if (notSameId && notEmpty) {
              return true;
            }
          }

          if (direction === 'left') {
            const leftCol = this.gameMap.landedTiles[tileX][tileY - 1];
            const notSameId = leftCol !== this.id || leftCol === -1;
            const notEmpty = leftCol !== 0;

            if (notSameId && notEmpty) {
              return true;
            }
          }

          if (direction === 'down') {
            const downRow = this.gameMap.landedTiles[tileX + 1];

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

    for (let i = 0; i < this.tiles.length; i++) {
      const tileRow = this.tiles[i];

      for (let j = 0; j < tileRow.length; j++) {
        const tile = tileRow[j];

        const xPos = this.x + i;
        const yPos = this.y + j;

        renderData.push({
          x: xPos, y: yPos, value: tile.value, landed: this.landed,
        });
      }
    }

    return renderData;
  }
}
