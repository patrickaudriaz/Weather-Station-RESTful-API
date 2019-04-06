var express = require("express"),
  ressources = require("../resources/model"),
  actuators = require("../routes/actuators"),
  sensors = require("../routes/sensors"),
  converter = require("../middleware/converter"),
  parser = require("body-parser");

var app = express();

app.use(parser.json());

app.use("/actuators", actuators);
app.use("/sensors", sensors);

app.get("/", function(req, res, next) {
  res.status(200);
  res.setHeader("Content-Type", "application/json", "Accept: application/json");
  req.result = ressources;
  console.log("--> GET request");
  next();
});

app.use(converter());
module.exports = app;
