// eslint-disable-next-line max-classes-per-file
import Shape from './shape';

export default class ShapeZ extends Shape {
  constructor(x, y, map) {
    super(x, y, map);

    this.rotations = [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ];

    this.tiles = [
      [0, 1, 1, 0],
      [1, 1, 0, 0],
    ];
  }
}
