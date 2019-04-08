var express = require("express"),
    coapRoute = require("./../routes/coap"),
    parser = require("body-parser");

const pathToRegexp = require('path-to-regexp');
const regexp = pathToRegexp('http://:foo/coap://');
console.log("REGEX : " + regexp);

var app = express();

app.use(parser.json());

app.use(regexp, coapRoute)

module.exports = app;
