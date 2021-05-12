import Shape from './shape';

export default class ShapeZReverse extends Shape {
  constructor(x, y, map) {
    super(x, y, map);

    this.id = 5;

    this.rotations = [
      [
        [0, 0, 0],
        [5, 5, 0],
        [0, 5, 5],
      ],
      [
        [0, 0, 5],
        [0, 5, 5],
        [0, 5, 0],
      ],
      [
        [0, 0, 0],
        [5, 5, 0],
        [0, 5, 5],
      ],
      [
        [0, 5, 0],
        [5, 5, 0],
        [5, 0, 0],
      ],
    ];

    this.tiles = [
      [5, 5, 0, 0],
      [0, 5, 5, 0],
    ];
  }
}
