const express = require("express"),
  ressources = require("../resources/model"),
  //actuators = require("../routes/converter"),
  //sensors = require("../routes/sensors"),
  openweather = require("../plugins/openweather-forecast");

var app = express();

app.all("/", function(req, res, next) {
  res.status(403);
  req.result = "Not allowed on /";
  next();
});

app.get("/", function(req, res, next) {
  res.status(200);
  res.setHeader("Content-Type", "application/json", "Accept: application/json");
  req.result = ressources.sensors;
  console.log("--> GET request");
  next();
});

app.listen(ressources.port, function() {
  console.log("--> App listening on port : " + ressources.port);
});

openweather.start();
module.exports = app;
