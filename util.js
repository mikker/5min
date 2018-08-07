const feather = require("feather-icons");
const raw = require("choo/html/raw");

function secsToDisplay(seconds) {
  const m = Math.floor(seconds / 60);
  let s = `${seconds - m * 60}`;
  if (s.length === 1) {
    s = `0${s}`;
  }
  return `${m}:${s}`;
}

function icon(name) {
  return raw(feather.icons[name].toSvg({ class: "icon" }));
}

module.exports = {
  secsToDisplay,
  icon
};
