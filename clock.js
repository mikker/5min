class Clock {
  static secs() {
    return Math.round(new Date().getTime() / 1000);
  }

  constructor(secs, opts) {
    this.left = secs;
    this._target = Clock.secs() + secs;
    this._tick();
    this._interval = setInterval(this._tick.bind(this), 1000 / 12);
  }

  stop() {
    clearInterval(this._interval);
  }

  done() {
    this.stop();
    if (this.onDone) {
      this.onDone(this);
    }
  }

  _tick() {
    const left = this._target - Clock.secs();
    const didChange = left !== this.left;
    this.left = left;

    if (this.onTick) {
      this.onTick(this);
    }

    if (this.onChange && didChange) {
      this.onChange(this);
    }

    if (this.left > 0) {
      return;
    }

    this.done();
  }
}

module.exports = Clock;
