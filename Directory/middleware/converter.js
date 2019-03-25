// Require the json2html module
var json2html = require("node-json2html");

// In Express, a middleware is usually a function returning a function
module.exports = function() {
  return function(req, res, next) {
    console.info("Representation converter middleware called!");

    // Check if the previous middleware left a result for you in req.result
    if (req.result) {
      // Read the request header and check if the client requested HTML
      var check = req.accepts("text/html");

      if (req.accepts("json")) {
        console.info("JSON representation selected!");
        res.send(req.result);
        return;
      }

      // For all other formats, default to JSON
      console.info("Defaulting to JSON representation!");
      res.send(req.result); //#G
      return;
    } else {
      // If no result was present in req.result, there’s not much you can do, so call the next middleware
      next();
    }
  };
};