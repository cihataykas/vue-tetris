import Shape from './shape';

// eslint-disable-next-line max-classes-per-file
export default class ShapeSquare extends Shape {
  constructor(x, y, map) {
    super(x, y, map);

    this.tiles = [
      [1, 1],
      [1, 1],
    ];
  }
}
