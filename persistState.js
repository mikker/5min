function persistState(key) {
  const regex = RegExp(key + ":.+");

  return (state, emitter) => {
    state[key] = read(key);

    emitter.on("*", action => {
      if (action.match(regex)) {
        write(key, state[key]);
      }
    });
  };

  function read(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  }

  function write(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}

module.exports = persistState
