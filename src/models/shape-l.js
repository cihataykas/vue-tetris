// eslint-disable-next-line max-classes-per-file
import Shape from './shape';

export default class ShapeL extends Shape {
  constructor(x, y, map) {
    super(x, y, map);

    this.id = 3;

    this.rotations = [
      [
        [0, 0, 0],
        [3, 3, 3],
        [3, 0, 0],
      ],
      [
        [3, 3, 0],
        [0, 3, 0],
        [0, 3, 0],
      ],
      [
        [0, 0, 0],
        [0, 0, 3],
        [3, 3, 3],
      ],
      [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ],
    ];

    this.tiles = [
      [3, 3, 3, 0],
      [3, 0, 0, 0],
    ];
  }
}
