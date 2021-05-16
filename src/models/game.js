import GameMap from './game-map';
import createShape from './create-shape';

export default class Game {
  constructor(width = 16, height = 20) {
    this.gameMap = new GameMap(this, width, height);
    this.gameIntervalInstance = null;
    this.gameInterval = 500;
    this.createShape = createShape.bind(this);
    this.gameMap.onEnd = this.onEnd.bind(this);
    this.controlsActive = false;
    this.score = 0;

    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  activateControls() {
    this.controlsActive = true;
  }

  deactivateControls() {
    this.controlsActive = false;
  }

  onKeyDown(e) {
    if (!this.controlsActive) {
      return;
    }
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
    this.pause();
    const shape = this.createShape(type, 0, y);
    this.gameMap.addShape(shape);
    shape.addAnimationClass('animate__bounceInDown', 800, () => {
      this.resume();
    });
    this.gameMap.renderShape();
  }

  addRandomShape() {
    const randomShape = Math.round(Math.random() * 6);
    const randomY = Math.round(1 + Math.random() * (this.gameMap.width - 5));
    this.addShape(randomShape, randomY);
  }

  pause() {
    this.deactivateControls();
    this.stop();
  }

  resume() {
    this.activateControls();
    this.start();
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
    if (this.gameIntervalInstance) {
      this.stop();
    }

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
