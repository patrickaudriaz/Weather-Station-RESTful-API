var stations = ["Posieux", "MolésonVillage", "Zermatt"];
var stationNbr = stations.length;
var stationsState = Array(stationNbr).fill(false);
var timers = Array(stationNbr).fill(null);

var allURL = "http://appint01.tic.heia-fr.ch/";

var delay = 2000;

$(document).ready(function() {
  console.log("Document is ready !");

  // call to start loop
  timer = setInterval(function() {
    console.log("tick");
  }, delay);

  // call to top loop
  clearInterval();
  timer = null;
});

getWeatherStationData();

function getWeatherStationData() {
  var requestURL = allURL;
  var stationsGET = [];

  $.ajax({
    method: "GET",
    url: requestURL,
    headers: {
      Accept: "application/json"
      //"Content-type" : "application/json"
    },

    success: function(data) {
      //console.log(JSON.stringify(data.stations));
      stationsGET = data;
      $.each(data.stationsGET, function(index, value) {
        console.log(
          "Datas from stations located at " +
            JSON.stringify(value.location) +
            " are ready !"
        );
        console.log(data.stationsGET[index]);
        console.log(data.stationsGET.length);
        updateDisplay(value);
      });
    },

    error: function(xhr, status, error) {
      alert("error");
      console.log("xhr: " + xhr);
      console.log("status: " + status);
      console.log("error: " + error);
    }
  });
}

function updateDisplay(name) {
  console.log(name);
  for (var i = 0; i < stationNbr; i++) {
    if (name === stations[i]) {
      if (stationsState[i] == false) {
        stationsState[i] = true;
        document
          .getElementById(stations[i])
          .classList.remove("carousel-item-name");
        document
          .getElementById("sta1")
          .classList.add("carousel-item-name-selected");
      } else {
        stations[i] = false;
        document
          .getElementById(stations[i])
          .classList.remove("carousel-item-name-selected");
        document
          .getElementById(stations[i])
          .classList.add("carousel-item-name");
      }
      console.log(stations[i] + stationsState[i]);
    }
  }
}

$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

window.onload = function() {
  var ctx = document.getElementById("line_chart_temp");
  var line_chart_temp = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        22.02,
        23.02,
        24.02,
        25.02,
        26.02,
        27.02,
        28.02,
        1.03,
        2.03,
        3.03
      ],
      datasets: [
        {
          label: "Temperature [˚C]",
          data: [-12, -13, -5, -5, 0, 7, -2, 3, 9, 12],
          borderColor: "#8BC6EC",
          fontColor: "#DEDEDE",
          fill: false
        }
      ]
    },

    options: {
      title: {
        display: false
      },

      legend: {
        labels: {
          fontColor: "#DEDEDE"
        }
      },

      scales: {
        scaleLabel: {
          fontColor: "#DEDEDE"
        },

        xAxes: [
          {
            gridLines: {
              display: false,
              color: "#DEDEDE",
              lineWidth: 2
            }
          }
        ],

        yAxes: [
          {
            gridLines: {
              display: false,
              color: "#DEDEDE",
              lineWidth: 2
            }
          }
        ]
      }
    }
  });

  var ctx2 = document.getElementById("line_chart_hum");
  var line_chart_hum = new Chart(ctx2, {
    type: "line",
    data: {
      labels: [
        22.02,
        23.02,
        24.02,
        25.02,
        26.02,
        27.02,
        28.02,
        1.03,
        2.03,
        3.03
      ],
      datasets: [
        {
          label: "Humidité [%]",
          data: [39, 42, 46, 45, 42, 43, 43, 41, 39, 43],
          borderColor: "#b68aec",
          fontColor: "#DEDEDE",
          fill: false
        }
      ]
    },

    options: {
      title: {
        display: false
      },

      legend: {
        labels: {
          fontColor: "#DEDEDE"
        }
      },

      scales: {
        scaleLabel: {
          fontColor: "#DEDEDE"
        },

        xAxes: [
          {
            gridLines: {
              display: false,
              color: "#DEDEDE",
              lineWidth: 2
            }
          }
        ],

        yAxes: [
          {
            gridLines: {
              display: false,
              color: "#DEDEDE",
              lineWidth: 2
            }
          }
        ]
      }
    }
  });

  var ctx3 = document.getElementById("line_chart_press");
  var line_chart_press = new Chart(ctx3, {
    type: "line",
    data: {
      labels: [
        22.02,
        23.02,
        24.02,
        25.02,
        26.02,
        27.02,
        28.02,
        1.03,
        2.03,
        3.03
      ],
      datasets: [
        {
          label: "Pression [hPa]",
          data: [
            1014,
            1012.8,
            1015,
            1014,
            1016,
            1015.4,
            1013.3,
            1018,
            1015.4,
            1013.3
          ],
          borderColor: "#ecb984",
          fontColor: "#DEDEDE",
          fill: false
        }
      ]
    },

    options: {
      title: {
        display: false
      },

      legend: {
        labels: {
          fontColor: "#DEDEDE"
        }
      },

      scales: {
        scaleLabel: {
          fontColor: "#DEDEDE"
        },

        xAxes: [
          {
            gridLines: {
              display: false,
              color: "#DEDEDE",
              lineWidth: 2
            }
          }
        ],

        yAxes: [
          {
            gridLines: {
              display: false,
              color: "#DEDEDE",
              lineWidth: 2
            }
          }
        ]
      }
    }
  });
};
