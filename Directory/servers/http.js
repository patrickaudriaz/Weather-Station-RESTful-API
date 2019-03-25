const express = require("express");
const app = express();
var converter = require("../middleware/converter");
const port = 3000;

app.all("/", function(req, res, next) {
  res.status(403);
  req.result = "Not allowed on /";
  next();
});

app.get("/", function(req, res, next) {
  res.send("Hello World!");
  res.status(200);
  req.result = ressources.directory;
  console.log("--> GET request");
  next();
});

app.post("/", function(req, res, next) {
  console.log("--> Got a POST request");
  next();
});

app.listen(port, function() {
  console.log("--> Example app listening on port : " + port);
});

app.use(converter());
module.exports = app;
