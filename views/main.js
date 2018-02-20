const html = require("choo/html");
const util = require("../util");
const { icon } = util;

const themes = {
  light: {
    main: "bg-white near-black",
    button: "silver hover-bg-light-gray",
    settings: {
      main: "bg-flambouyant white"
    }
  },
  dark: {
    main: "bg-near-black silver",
    button: "silver hover-bg-white-10",
    settings: {
      main: "bg-dark-gray near-white"
    }
  }
};

function mainView(state, emit) {
  const { clock, ui } = state;
  const theme = themes[ui.darkMode ? "dark" : "light"];
  const showSettings = () => {
    emit("ui:set", { showSettings: true });
  };
  const reset = () => {
    emit("clock:set", clock.secs);
  };
  const toggleSound = () => {
    emit("ui:set", { soundOn: !ui.soundOn });
  };
  const toggleDarkMode = () => {
    emit("ui:set", { darkMode: !ui.darkMode });
  };

  return html`
    <body class="sans-serif f4 f2-ns lh-copy">
      <main class="t-all vh-100 flex flex-column items-center justify-center ${
        theme.main
      }">
        ${clockElm(state)}

        <nav>
          <button class="btn ${theme.button}" onclick=${showSettings}>
            ${icon("clock")}
          </button>
          <button class="btn ${theme.button}" onclick=${reset}>
            ${icon("rotate-ccw")}
          </button>
          <button class="btn ${theme.button} ${
    ui.soundOn ? "red" : "silver"
  }" onclick=${toggleSound}>
            ${icon(ui.soundOn ? "bell" : "bell-off")}
          </button>
          <button class="btn ${theme.button}" onclick=${toggleDarkMode}>
            ${icon(ui.darkMode ? "sun" : "moon")}
          </button>
        </nav>
      </main>

      ${settingsElm(state, emit, theme)}
    </body>
  `;
}

function settingsElm(state, emit, theme) {
  const closeSettings = () => {
    emit("ui:set", { showSettings: false });
  };

  return html`
    <div class="${
      state.ui.showSettings ? "flex animated fade-in-like-a-pimp" : "dn"
    } fixed top-0 left-0 bottom-0 right-0 flex-column ${theme.settings.main}">
      <a class="absolute top-1 right-2 grow pointer" onclick=${closeSettings}>${icon(
    "x"
  )}</a>
      <nav class="flex-auto flex flex-column justify-center-ns f1-l">
        ${button(5, "Blødkogt – 5 min")}
        ${button(7, "Smilende – 7 min")}
        ${button(9, "Hårdkogt – 9 min")}
        ${button(15, "Power nap – 15 min")}
        <hr>
        <div class="flex items-center justify-center">
          ${button(25, "Pomodoro")}
          ${button(5, "pause", "f4")}
          ${button(10, "lang pause", "f4")}
        </div>
      </nav>
    </div>
  `;

  function setTimer(mins) {
    return event => {
      emit("ui:set", { showSettings: false });
      emit("clock:set", mins * 60);
      emit(state.events.REPLACESTATE, `/?m=${mins}`);
    };
  }

  function button(mins, text, classNames) {
    return html`
      <a class="btn justify-center pointer ${classNames}" onclick=${setTimer(
      mins
    )}>
        ${text}
      </a>
    `;
  }
}

function clockElm(state) {
  return html`
    <h1 class="f-headline f-enormous-m f-humongous-l fw9 mv0 lh-solid">
      ${state.clock.display}
    </h1>
  `;
}

module.exports = mainView
