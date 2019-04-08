var express = require("express"),
  router = express.Router({ mergeParams: true }),
  parseUri = require("./../utils/parseuri"),
  mapCoapCode = require("./../utils/coap-code-mapper"),
  coap = require("coap");

router.route("/*").get(function(req, res, next) {
  var coapUrl = "coap" + req.params[1];

  var uri = parseUri(coapUrl);

  var coapTiming = {
    ackTimeout: 0.5,
    ackRandomFactor: 1.0,
    maxRetransmit: 2,
    maxLatency: 3,
    piggybackReplyMs: 10
  };
  coap.updateTiming(coapTiming);

  var coapRequest = coap.request({
    host: uri.host,
    port: uri.port === "" ? 5683 : uri.port,
    pathname: uri.path,
    options: { Accept: "application/json" }
  });

  var coapResponse = "";
  coapRequest.on("response", function(coap_res) {
    coap_res.on("data", function(coap_data) {
      coapResponse += coap_data;
    });

    coap_res.on("end", function() {
      console.info("CoAP response code", coap_res.code);

      if (coap_res.code !== "2.05")
        console.log("Error while contacting CoAP service: %s", coap_res.code);

      var httpReturnCode = mapCoapCode(coap_res);

      res.writeHead(httpReturnCode, { "Content-Type": "application/json" });
      res.end(coapResponse);

      next();
    });
  });

  coapRequest.on("error", function(error) {
    console.info("got an error on coap request", error);
    next();
  });

  coapRequest.end();
});

router.route("/*").put(function(req, res, next) {
  if (req.is("application/json")) {
    console.log("got a put request on state, body is ", req.body);

    var coapUrl = "coap" + req.params[1];

    var uri = parseUri(coapUrl);

    var coapRequest = coap.request({
      method: "PUT",
      host: uri.host,
      port: uri.port === "" ? 5683 : uri.port,
      pathname: uri.path,
      options: { Accept: "application/json" }
    });

    var stringPayload = JSON.stringify(req.body);
    coapRequest.write(stringPayload);

    var coapResponse = "";
    coapRequest.on("response", function(coap_res) {
      coap_res.on("data", function(coap_data) {
        coapResponse += coap_data;
      });

      coap_res.on("end", function() {
        console.info("CoAP response code", coap_res.code);
        if (coap_res.code !== "2.05")
          console.log("Error while contacting CoAP service: %s", coap_res.code);

        var httpReturnCode = mapCoapCode(coap_res);

        res.writeHead(httpReturnCode, { "Content-Type": "application/json" });
        res.end(coapResponse);

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

module.exports = router;
