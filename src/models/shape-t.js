import Shape from './shape';

export default class ShapeT extends Shape {
  constructor(x, y, map) {
    super(x, y, map);

    this.id = 6;

    this.rotations = [
      [
        [0, 0, 0],
        [6, 6, 6],
        [0, 6, 0],
      ],
      [
        [0, 6, 0],
        [6, 6, 0],
        [0, 6, 0],
      ],
      [
        [0, 0, 0],
        [0, 6, 0],
        [6, 6, 6],
      ],
      [
        [0, 6, 0],
        [0, 6, 6],
        [0, 6, 0],
      ],
    ];

    this.tiles = [
      [6, 6, 6, 0],
      [0, 6, 0, 0],
    ];
  }
}
