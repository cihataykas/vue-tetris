/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
// eslint-disable-next-line max-classes-per-file

import Shape from './shape';

export default class ShapeLine extends Shape {
  constructor(x, y, map) {
    super(x, y, map);

    this.id = 1;

    this.rotations = [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
    ];

    this.tiles = [
      [1, 1, 1, 1],
    ];
  }
}
