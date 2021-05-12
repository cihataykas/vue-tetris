import Shape from './shape';

export default class ShapeSquare extends Shape {
  constructor(x, y, map) {
    super(x, y, map);

    this.id = 2;

    this.tiles = [
      [2, 2],
      [2, 2],
    ];
  }
}
