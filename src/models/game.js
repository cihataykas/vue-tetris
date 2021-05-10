import GameMap from './game-map';
import ShapeLine from './shape-line';
import ShapeSquare from './shape-square';
import ShapeL from './shape-l';
import ShapeT from './shape-t';
import ShapeZ from './shape-z';
import ShapeZReverse from './shape-z-reverse';

export default class Game {
  constructor() {
    this.gameMap = new GameMap();
    this.gameIntervalInstance = null;
    this.gameInterval = 500;

    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      this.gameMap.currentShape.moveLeft();
    } else if (e.key === 'ArrowRight') {
      this.gameMap.currentShape.moveRight();
    } else if (e.key === 'ArrowDown') {
      this.gameMap.currentShape.moveDown();
    } else if (e.key === 'ArrowUp') {
      this.gameMap.currentShape.rotate();
    }

    this.gameMap.update();
  }

  createShape(type, x, y) {
    switch (type) {
      case 1:
        return new ShapeLine(x, y, this.gameMap);
      case 2:
        return new ShapeSquare(x, y, this.gameMap);
      case 3:
        return new ShapeL(x, y, this.gameMap);
      case 4:
        return new ShapeZ(x, y, this.gameMap);
      case 5:
        return new ShapeZReverse(x, y, this.gameMap);
      case 6:
        return new ShapeT(x, y, this.gameMap);
      default:
        return new ShapeSquare(x, y, this.gameMap);
    }
  }

  addShape(type = 1, y = 6) {
    const shape = this.createShape(type, 0, y);

    this.gameMap.addShape(shape);
  }

  addRandomShape() {
    const randomShape = Math.round(Math.random() * 6);
    const randomY = Math.round(1 + Math.random() * (this.gameMap.width - 5));
    this.addShape(randomShape, randomY);
  }

  moveDownShapes() {
    const isMoveDown = this.gameMap.currentShape.moveDown();

    if (!isMoveDown) {
      this.addRandomShape();
    }

    this.gameMap.update();
  }

  start() {
    this.gameIntervalInstance = setTimeout(() => {
      if (this.gameIntervalInstance) {
        this.loop();
        this.start();
      }
    }, this.gameInterval);
  }

  stop() {
    clearInterval(this.gameIntervalInstance);
  }

  loop() {
    this.moveDownShapes();
  }

  destroy() {
    document.removeEventListener('keydown', this.onKeyDown);
  }
}
