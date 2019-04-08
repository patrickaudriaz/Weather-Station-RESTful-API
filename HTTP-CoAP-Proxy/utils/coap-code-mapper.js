function mapCoapCode(coapResponse) {
  switch (coapResponse.code) {
    // created
    case "2.01":
      // created
      return 201;

    // deleted
    case "2.02":
      // OK
      return 200;

    // valid
    case "2.03":
      // not modified
      return 304;

    // changed
    case "2.04":
      // ok
      return 200;

    // content
    case "2.05":
      // ok
      return 200;

    // bad request
    case "4.00":
      // bad request
      return 400;

    // unauthorized
    case "4.01":
      // forbidden
      return 403;

    // bad option
    case "4.02":
      // bad request
      return 400;

    // forbidden
    case "4.03":
      // forbidden
      return 403;

    // not found:
    case "4.04":
      // not Found
      return 404;

    // Method Not Allowed:
    case "4.05":
      // Bad Request
      return 400;

    // Not Acceptable
    case "4.06":
      // Not Acceptable
      return 406;

    // Precondition Failed
    case "4.12":
      // Precondition Failed
      return 412;

    // Request Ent. Too Large
    case "4.13":
      // Request Ent. Too Large
      return 413;

    // Unsupported Media Type
    case "4.15":
      // Unsupported Media Type
      return 415;

    // Internal Server Error
    case "5.00":
      // Internal Server Error
      return 500;

    // Not Implemented
    case "5.01":
      // Not Implemented
      return 501;

    // Bad Gateway
    case "5.02":
      return 502;

    // Service Unavailable
    case "5.03":
      // Service Unavailable
      return 503;

    // Gateway Timeout
    case "5.04":
      // Gateway Timeout
      return 504;

    // Proxying Not Supported
    case "5.05":
      // Proxying Not Supported
      return 505;

    default:
      console.log("unknown code: ", coapResponse.code);
      return 400;
  }
}

module.exports = mapCoapCode;
