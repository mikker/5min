const honk = require("../util/honk")();
const raw = require("choo/html/raw");
const Clock = require("../clock");
const util = require("../util");
const { secsToDisplay } = util;

let instance = null;

function clock(state, emitter) {
  state.clock = {
    display: raw("&nbsp;"),
    secs: null
  };

  emitter.on("clock:set", secs => {
    if (instance) instance.stop();

    const clock = new Clock(secs);

    state.clock.secs = secs;
    state.clock.display = secsToDisplay(clock.left);
    emitter.emit("render");

    clock.onChange = clock => {
      const display = secsToDisplay(clock.left);
      state.clock.display = display;
      emitter.emit("DOMTitleChange", display);
      emitter.emit("render");
    };

    clock.onDone = () => {
      state.clock.display = "nul";
      emitter.emit("DOMTitleChange", "nul");
      emitter.emit("render");
      if (state.ui.soundOn) honk.play();
    };

    instance = clock;
  });

  const setFromQuery = () => {
    const mins = state.query.m ? parseInt(state.query.m, 10) : 0;
    const secs = state.query.s ? parseInt(state.query.s, 10) : 0;
    let totalSecs = mins * 60 + secs;
    if (totalSecs <= 0) totalSecs = 5 * 60;
    emitter.emit("clock:set", totalSecs);
  };

  emitter.on("DOMContentLoaded", setFromQuery);
  emitter.on("navigate", setFromQuery);
}

module.exports = clock;
