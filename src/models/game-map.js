import Tile from './tile';

export default class GameMap {
  constructor(width = 15, height = 20) {
    this.width = width;
    this.height = height;
    this.currentShape = null;
    this.tiles = this.build();
    this.landedTiles = this.build();
  }

  build() {
    const map = [];
    for (let i = 0; i < this.height; i++) {
      map[i] = [];

      for (let j = 0; j < this.width; j++) {
        map[i][j] = new Tile(0, 'transparent');
      }
    }

    return map;
  }

  renderLandedTiles() {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        this.tiles[i].splice(j, 1, this.landedTiles[i][j]);
      }
    }
  }

  checkAndRemoveLines() {
    for (let i = 0; i < this.landedTiles.length; i++) {
      const row = this.landedTiles[i];

      if (row.every(tile => tile.value === -1)) {
        this.currentShape = null;
        this.landedTiles.splice(i, 1);
        this.landedTiles.unshift([...this.landedTiles[0]]);

        this.renderLandedTiles();
      }
    }
  }

  get isEnd() {
    const isLanded = this.currentShape && this.currentShape.landed;
    return isLanded && this.landedTiles[0].some(tile => tile.value !== 0);
  }

  renderShape() {
    if (!this.currentShape) {
      return;
    }

    const shapeDatas = this.currentShape.render();

    for (const shapeData of shapeDatas) {
      const { value, x, y, landed } = shapeData;

      if (value) {
        const newTile = new Tile(value, this.currentShape.color);
        this.tiles[x][y] = newTile;

        if (landed) {
          this.landedTiles[x][y] = newTile;
        }
      }
    }
  }

  update() {
    if (!this.isEnd) {
      this.renderLandedTiles();
      this.renderShape();
      this.checkAndRemoveLines();
    }
  }

  addShape(shape) {
    if (!this.isEnd) {
      this.update();
      this.currentShape = shape;
      this.update();
    }
  }
}
