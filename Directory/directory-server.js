var http = require("./servers/http"),
    ressources = require("./ressources/model");

http.listen(ressources.port, function() {
  console.log("Server started...");
  console.log("Running on port : " + ressources.port);
});