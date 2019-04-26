var express = require("express"),
  coapRoute = require("./../routes/coap"),
  parser = require("body-parser");

// const pathToRegexp = require('path-to-regexp');

// var regexp = pathToRegexp(':foo/coap');
var regexp = "([/ .-]*)*/?coap*$/";

console.log("REGEX : " + regexp);

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

app.use(parser.json());
app.use(regexp, coapRoute);

// Configure cors policy

module.exports = app;
