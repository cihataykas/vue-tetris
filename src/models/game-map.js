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
        map[i][j] = 0;
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

      if (row.every(tile => tile === -1)) {
        this.currentShape = null;
        this.landedTiles.splice(i, 1);
        this.landedTiles.unshift([...this.landedTiles[0]]);

        this.renderLandedTiles();
      }
    }
  }

  renderShape() {
    if (!this.currentShape) {
      return;
    }

    const shapeDatas = this.currentShape.render();

    for (const shapeData of shapeDatas) {
      const { value, x, y, landed } = shapeData;

      if (value) {
        this.tiles[x][y] = value;

        if (landed) {
          this.landedTiles[x][y] = value;
        }
      }
    }
  }

  update() {
    this.renderLandedTiles();
    this.renderShape();
    this.checkAndRemoveLines();
  }

  addShape(shape) {
    this.update();
    this.currentShape = shape;
    this.update();
  }
}
