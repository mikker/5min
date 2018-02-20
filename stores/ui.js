function ui(state, emitter) {
  state.ui = state.ui || {
    showSettings: false,
    soundOn: true,
    darkMode: false
  };

  emitter.on("ui:set", change => {
    Object.assign(state.ui, change);
    emitter.emit("render");
  });

  emitter.on("navigate", () => {
    state.ui.showSettings = false;
    emitter.emit("render");
  });
}

module.exports = ui;
