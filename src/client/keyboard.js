export default class Keyboard {
  constructor() {
    this.keys = {};

    this.registerListeners();
  }

  registerListeners() {
    window.addEventListener("keydown", this.onDown.bind(this), false);
    window.addEventListener("keyup", this.onUp.bind(this), false);
  }

  onDown(event) {
    event.stopPropagation();
    event.preventDefault();
    this.keys[event.key] = true;
  }

  onUp(event) {
    this.keys[event.key] = false;
  }

  isDown(key) {
    let value = this.keys[key];
    if(value === undefined || !value) {
      return false;
    }
    return true;
  }
}
