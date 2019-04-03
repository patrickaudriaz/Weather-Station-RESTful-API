const express = require("express"),
  ressources = require("../resources/model"),
  actuators = require("../routes/actuators"),
    sensors = require("../routes/sensors");

const app = express();

app.use('/actuators', actuators);
app.use('/sensors', sensors);

/*
app.all("/", function(req, res, next) {
  res.status(403);
  req.result = "Not allowed on /";
  next();
});
 */

app.get("/", function(req, res, next) {
  res.status(200);
  res.setHeader("Content-Type", "application/json", "Accept: application/json");
  req.result = ressources;
  console.log("--> GET request");
  next();
});


//openweather.start();
module.exports = app;
