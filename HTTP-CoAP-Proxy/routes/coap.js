var express = require("express"),
    router = express.Router({ mergeParams: true }), // mergeParams: true, Preserve the req.params values from the parent router.
    // If the parent and the child have conflicting param names, the child’s value take precedence.
    parseUri = require("./../utils/parseuri"),
    mapCoapCode = require("./../utils/coap-code-mapper"),
    coap = require("coap");

// prepare every the coap GET requests
router.route("/*").get(function(req, res, next) {
  var coapUrl = "coap" + req.params[3]; // finding the url in the req parameters

  // parsing the URI
  var uri = parseUri(coapUrl);

  var coapTiming = {
    ackTimeout: 0.5,
    ackRandomFactor: 1.0,
    maxRetransmit: 2,
    maxLatency: 3,
    piggybackReplyMs: 10
  };
  coap.updateTiming(coapTiming);

  // preparing the coap GET request
  var coapRequest = coap.request({
    host: uri.host, // taking the host for example appint03.tic.heia-fr.ch
    port: uri.port === "" ? 5683 : uri.port, // Give a default value (5683) for the uri.port in case nothing is defined
    pathname: uri.path,
    crossDomain: true,
    crossOrigin: true,
    options: { Accept: "application/json" }
  });

  var coapResponse = "";
  coapRequest.on("response", function(coap_res) {
    coap_res.on("data", function(coap_data) {
      coapResponse += coap_data; // storing the response by adding to the data
    });

    coap_res.on("end", function() {
      console.info("CoAP response code", coap_res.code);

      if (coap_res.code !== "2.05")
        console.log("Error while contacting CoAP service: %s", coap_res.code);

      // Mapping the coap codes number with http codes
      var httpReturnCode = mapCoapCode(coap_res);

      res.writeHead(httpReturnCode, { "Content-Type": "application/json" });
      res.end(coapResponse);// End of the request

      // Calling the upcomming middleware
      next();
    });
  });

  coapRequest.on("error", function(error) {
    console.info("got an error on coap request", error);
    next();
  });

  coapRequest.end();
});

// prepare every the coap PUT requests
router.route("/*").put(function(req, res, next) {
  if (req.is("application/json")) {
    console.log("got a put request on state, body is ", req.body);

    var coapUrl = "coap" + req.params[3]; // finding the url in the req parameters

    // parsing the URI
    var uri = parseUri(coapUrl);

    var coapRequest = coap.request({
      method: "PUT",
      host: uri.host, // taking the host for example appint03.tic.heia-fr.ch
      port: uri.port === "" ? 5683 : uri.port, // Give a default value (5683) for the uri.port in case nothing is defined
      pathname: uri.path,
      crossDomain: true,
      crossOrigin: true,
      options: { Accept: "application/json" }
    });

    var stringPayload = JSON.stringify(req.body);
    coapRequest.write(stringPayload);

    var coapResponse = "";
    coapRequest.on("response", function(coap_res) {
      coap_res.on("data", function(coap_data) {
        coapResponse += coap_data; // storing the response by adding to the data
      });

      coap_res.on("end", function() {
        console.info("CoAP response code", coap_res.code);
        if (coap_res.code !== "2.05")
          console.log("Error while contacting CoAP service: %s", coap_res.code);

        // Mapping the coap codes number with http codes
        var httpReturnCode = mapCoapCode(coap_res);

        res.writeHead(httpReturnCode, { "Content-Type": "application/json" });
        res.end(coapResponse);

        // Calling the upcomming middleware
        next();
      });
    });

    coapRequest.end();
  } else {
    res
        .status(406)
        .send(
            "Sorry, content type " +
            req.get("Content-Type") +
            " is not accepted for this request"
        );
  }
});

// Exportation of router, so it can be access from other file with require()
module.exports = router;