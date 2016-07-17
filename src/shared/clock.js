export default class Clock {
  /*constructor() {
    this.startTime = 0;
    this.lastTime = 0;
    this.elapsedTime = 0;
    this.running = false;
  }

  start() {
    this.startTime = (performance || Date).now();
    this.lastTime = this.startTime;
    this.running = true;
  }

  stop() {
    this.running = false;
  }

  reset() {
    this.stop();
    this.starTime = 0;
    this.lastTime = 0;
    this.elapsedTIme = 0;
  }

  getElapsedTime() {
    this.getDelta();
    return this.elapsedTime;
  }

  getDelta() {
    if(!this.running) { return 0; }
    let newTime = (performance || Date).now();

    let delta = (newTime - this.oldTime) / 1000;
    this.lastTime = newTime;

    this.elapsedTime += delta;
  }*/
}
