import Shape from './shape';

// eslint-disable-next-line max-classes-per-file
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
