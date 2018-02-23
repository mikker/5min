const css = require("sheetify");
const choo = require("choo");
const honk = require("./util/honk.js");

css("./btn.css");
css("./style.css");
css("tachyons");

const app = choo();

if (process.env.NODE_ENV !== "production") {
  app.use(require("choo-devtools")());
} else {
  app.use(require("choo-service-worker")());
}

app.use(require("./persistState")("ui"));
app.use(require("./stores/clock"));
app.use(require("./stores/ui"));
app.route("/", require("./views/main"));
app.mount("body");

if (!module.parent) app.mount("body");
else module.exports = app;
