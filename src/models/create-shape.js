import ShapeLine from './shape-line';
import ShapeSquare from './shape-square';
import ShapeL from './shape-l';
import ShapeT from './shape-t';
import ShapeZ from './shape-z';
import ShapeZReverse from './shape-z-reverse';

export default function createShape(type, x, y) {
  let shape;

  switch (type) {
    case 1:
      shape = new ShapeLine(x, y, this.gameMap);
      break;
    case 2:
      shape = new ShapeSquare(x, y, this.gameMap);
      break;
    case 3:
      shape = ShapeL(x, y, this.gameMap);
      break;
    case 4:
      shape = new ShapeZ(x, y, this.gameMap);
      break;
    case 5:
      shape = new ShapeZReverse(x, y, this.gameMap);
      break;
    case 6:
      shape = new ShapeT(x, y, this.gameMap);
      break;
    default:
      shape = new ShapeSquare(x, y, this.gameMap);
  }

  shape.buildTiles();

  for (const rotation of shape.rotations) {
    shape.buildTiles(rotation);
  }

  return shape;
}
