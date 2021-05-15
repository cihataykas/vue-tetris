export default class Tile {
  constructor(value, color, animationClass) {
    this.value = value;
    this.color = color;
    this.animationClass = animationClass;
    this.animationTimeout = null;
  }

  addAnimationClass(className) {
    this.animationClass = `animate__animated ${className}`;
  }
}
