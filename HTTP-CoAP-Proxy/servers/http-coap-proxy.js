var express = require("express"),
    coap = require("./../routes/coap")
    parser = require("body-parser");

var app = express();

app.use(parser.json());



module.exports = app;
