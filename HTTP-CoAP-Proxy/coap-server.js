var httpCoap = require("./servers/http-coap-proxy");

var port = process.argv[2];
console.log("port : " + port);

httpCoap.listen(port, function() {
    console.log("Coap server started...");
    console.log("Running on port : " + port);
});
