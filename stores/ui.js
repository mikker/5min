function ui(state, emitter) {
  state.ui = Object.assign(
    // start with the defaults
    {
      showSettings: false,
      soundOn: true,
      darkMode: false,
      custom: { m: '', s: '' }
    },
    // then add whatever was persisted
    state.ui
  )

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
