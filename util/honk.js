function makeHonk() {
  const audioElm = document.createElement("audio");
  audioElm.src = "/assets/honk.mp3";
  audioElm.preload = "auto";
  return audioElm;
}

module.exports = makeHonk;
