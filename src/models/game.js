import GameMap from './game-map';
import createShape from './create-shape';

export default class Game {
  constructor() {
    this.gameMap = new GameMap();
    this.gameIntervalInstance = null;
    this.gameInterval = 500;
    this.createShape = createShape.bind(this);

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
      // this.addRandomShape();
      this.addShape(1);
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
