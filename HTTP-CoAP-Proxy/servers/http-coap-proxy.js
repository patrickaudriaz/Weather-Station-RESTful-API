var express = require("express"),
  coapRoute = require("./../routes/coap"),
  parser = require("body-parser");

// const pathToRegexp = require('path-to-regexp');

// var regexp = pathToRegexp(':foo/coap');
var regexp = "([/ .-]*)*/?coap*$/";

console.log("REGEX : " + regexp);

var app = express();

app.use(parser.json());
app.use(regexp, coapRoute);

module.exports = app;
