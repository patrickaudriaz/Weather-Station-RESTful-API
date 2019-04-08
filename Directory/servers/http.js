var express = require("express"),
  ressources = require("../ressources/model"),
  converter = require("../middleware/converter");
var app = express();

/*
app.all("/", function(req, res, next) {
  res.status(403);
  req.result = "Not allowed on /";
  next();
});
 */

app.get("/", function(req, res, next) {
  res.status(200);
  res.setHeader("Access-Control-Allow-Origin", "*");
  req.result = ressources.directory;
  console.log("--> GET request");
  next();
});

/*
app.listen(ressources.port, function() {
  console.log("--> App listening on port : " + ressources.port);
});
*/

app.use(converter());
module.exports = app;
