// eslint-disable-next-line max-classes-per-file
import Shape from './shape';

export default class ShapeZ extends Shape {
  constructor(x, y, map) {
    super(x, y, map);

    this.id = 4;

    this.rotations = [
      [
        [0, 0, 0],
        [0, 4, 4],
        [4, 4, 0],
      ],
      [
        [0, 4, 0],
        [0, 4, 4],
        [0, 0, 4],
      ],
      [
        [0, 0, 0],
        [0, 4, 4],
        [4, 4, 0],
      ],
      [
        [4, 0, 0],
        [4, 4, 0],
        [0, 4, 0],
      ],
    ];

    this.tiles = [
      [0, 4, 4, 0],
      [4, 4, 0, 0],
    ];
  }
}
