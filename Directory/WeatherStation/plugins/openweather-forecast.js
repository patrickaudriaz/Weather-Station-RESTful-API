var resources = require("./../resources/model"),
    utils = require("./../utils/utils");

var localParams = {frequency: 5000, location: "Paris"};

var http = require("http");
var timeOutVar;

exports.start = function(params) {
  console.log("starting openweather-forecast plugin");
  if (params !== undefined) {
    console.log(
      "params are: frequency " +
        params.frequency +
        " , location " +
        params.location
    );
    localParams = params;
  }

  var httpRequest = {
    read: function() {
      var str = "";
      var options = {
        host: "api.openweathermap.org",
        path:
          "/data/2.5/forecast?q=" +
          localParams.location +
          "&units=metric&APPID=1f203b6344024e20a16bb3e051a44f13"
      };

      var callback = function(response) {
        // another chunk of data has been received, so append it to `str`
        response.on("data", function(chunk) {
          str += chunk;
        });

        // the whole response has been received, so we just print it out here
        response.on("end", function() {
          console.log(
            "request to ",
            options.host,
            "for location ",
            localParams.location,
            " was successful"
          );
          var jsonContent = JSON.parse(str);

          // update the time accordingly
          if (
            typeof jsonContent != "undefined" &&
            typeof jsonContent.list != "undefined"
          ) {
            // for simplicity, we always use the local time of the server
            // and not the jsonContent.list[0].dt which is not really coherent
            // so the code below is commented
            //if (lastDT === jsonContent.list[0].dt) {
            //    // time unchanged
            //    dt = lastDT + nbrOfCallsSinceLastDTUpdate * (localParams.frequency / 1000);
            //}
            //else {
            //    // time has changed
            //    dt = jsonContent.list[0].dt;
            //
            //    lastDT = dt;
            //
            //    // reset counter
            //    nbrOfCallsSinceLastDTUpdate = 0;
            //}
            // nbrOfCallsSinceLastDTUpdate++;

            // parse time of latest data
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 since the argument is in milliseconds, not seconds
            /// var date = new Date(dt * 1000);
            let date = new Date();
            // Hours part from the timestamp
            // dt is expressed in GMT, we are GMT+2
            let hours = (date.getHours() + 22) % 24;
            // Minutes part from the timestamp
            let minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            let seconds = "0" + date.getSeconds();

            // Will display date in DD.MM.YYYY format and time in 10:30:23 format
            let formattedDate =
              date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
            let formattedTime =
              hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

            let offset = utils.randomFloat(-1, 1);
            resources.sensors.temperature.current_condition.value =
              jsonContent.list[0].main.temp + offset;
            resources.sensors.temperature.current_condition.date = formattedDate;
            resources.sensors.temperature.current_condition.time = formattedTime;
            offset = offset = utils.randomFloat(-1, 1);
            resources.sensors.humidity.current_condition.value =
              jsonContent.list[0].main.humidity + offset;
            resources.sensors.humidity.current_condition.date = formattedDate;
            resources.sensors.humidity.current_condition.time = formattedTime;
            offset = offset = utils.randomFloat(-1, 1);
            resources.sensors.pressure.current_condition.value =
              jsonContent.list[0].main.pressure + offset;
            resources.sensors.pressure.current_condition.date = formattedDate;
            resources.sensors.pressure.current_condition.time = formattedTime;

            console.log("for date:", formattedDate, "at time: ", formattedTime);
            console.log(
              " temperature is ",
              resources.sensors.temperature.current_condition.value
            );
            console.log(
              " humidity is ",
              resources.sensors.humidity.current_condition.value
            );
            console.log(
              " pressure is ",
              resources.sensors.pressure.current_condition.value
            );
            timeOutVar = setTimeout(function() {
              httpRequest.read();
            }, localParams.frequency);
          } else {
            console.log(jsonContent);

            // parse time of latest data
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 since the argument is in milliseconds, not seconds
            let date = new Date();
            // Hours part from the timestamp
            // dt is expressed in GMT, we are GMT+2
            let hours = (date.getHours() + 22) % 24;
            // Minutes part from the timestamp
            let minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            let seconds = "0" + date.getSeconds();

            // Will display date in DD.MM.YYYY format and time in 10:30:23 format
            let formattedDate =
              date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
            let formattedTime =
              hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

            let offset = utils.randomFloat(-1, 1);
            resources.sensors.temperature.current_condition.value = 20 + offset;
            resources.sensors.temperature.current_condition.date = formattedDate;
            resources.sensors.temperature.current_condition.time = formattedTime;
            offset = offset = utils.randomFloat(-1, 1);
            resources.sensors.humidity.current_condition.value = 60 + offset;
            resources.sensors.humidity.current_condition.date = formattedDate;
            resources.sensors.humidity.current_condition.time = formattedTime;
            offset = offset = utils.randomFloat(-1, 1);
            resources.sensors.pressure.current_condition.value = 980 + offset;
            resources.sensors.pressure.current_condition.date = formattedDate;
            resources.sensors.pressure.current_condition.time = formattedTime;

            console.log("for date:", formattedDate, "at time: ", formattedTime);
            console.log(
              " temperature is ",
              resources.sensors.temperature.current_condition.value
            );
            console.log(
              " humidity is ",
              resources.sensors.humidity.current_condition.value
            );
            console.log(
              " pressure is ",
              resources.sensors.pressure.current_condition.value
            );

            timeOutVar = setTimeout(function() {
              httpRequest.read();
            }, localParams.frequency * 2);
          }
        });
      };

      var req = http.request(options, callback);

      req.on("error", function(e) {
        console.log("problem with http read request", e.message);
        // setting up a new request
        timeOutVar = setTimeout(function() {
          httpRequest.read();
        }, localParams.frequency);
      });

      req.end();
    }
  };
  httpRequest.read();
};

exports.stop = function() {
  console.log("stopping openweather-forecast plugin");
  clearTimeout(timeOutVar);
};
