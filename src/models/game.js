import GameMap from './game-map';
import createShape from './create-shape';

export default class Game {
  constructor() {
    this.gameMap = new GameMap();
    this.gameIntervalInstance = null;
    this.gameInterval = 500;
    this.createShape = createShape.bind(this);

    document.addEventListener('keydown', this.onKeyDown.bind(this));
    this.gameMap.onEnd = this.onEnd.bind(this);
  }

  onKeyDown(e) {
    // Prevents unexpected key actions when currentShape landed
    if (!this.gameMap.currentShape) {
      return;
    }

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

  onEnd() {
    this.stop();
    document.removeEventListener('keydown', this.onKeyDown);
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

  moveDownCurrentShape() {
    let isMoveDown;

    if (this.gameMap.currentShape) {
      isMoveDown = this.gameMap.currentShape.moveDown();
    } else {
      this.addRandomShape();
    }

    if (isMoveDown === false) {
      this.addRandomShape();
    }
  }

  start() {
    this.gameIntervalInstance = setInterval(() => {
      this.loop();
    }, this.gameInterval);
  }

  stop() {
    clearInterval(this.gameIntervalInstance);
  }

  loop() {
    if (this.gameMap.isEnd) {
      this.stop();
    } else {
      this.moveDownCurrentShape();
      this.gameMap.update();
    }
  }

  destroy() {
    document.removeEventListener('keydown', this.onKeyDown);
  }
}
