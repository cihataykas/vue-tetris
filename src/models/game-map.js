export default class GameMap {
  constructor(width = 15, height = 20) {
    this.width = width;
    this.height = height;
    this.shapes = [];
    this.currentShape = null;
    this.tiles = this.build();
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

  update() {
    this.tiles = this.build();

    for (const shape of this.shapes) {
      const shapeDatas = shape.render();

      for (const shapeData of shapeDatas) {
        if (shapeData.value) {
          this.tiles[shapeData.x][shapeData.y] = shapeData.value;
        }
      }
    }
  }

  addShape(shape) {
    this.shapes.push(shape);
    this.currentShape = shape;

    this.update();
  }
}
