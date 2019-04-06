var http = require("./servers/http"),
  openweather = require("./plugins/openweather-forecast.js");

var port = process.argv[2];
console.log("port : " + port);

var location = process.argv[3];
console.log("location : " + location);

http.listen(port, function() {
  console.log("Server started...");
  console.log("Running on port : " + port);
});

openweather.start({"frequency":10000, "location":location});

