var stations = [];
var stationNbr;
var stationsState = Array(stationNbr).fill(false);
var timers = Array(stationNbr).fill(null);

var allURL = "http://appint01.tic.heia-fr.ch/";

var delay = 2000;
// --------------------------------------------------------------------

// 2) Ecrire la fonction $(document).ready()
$(document).ready(function() {
  getWeatherStationData();

  console.log("Document is ready !");
});
// --------------------------------------------------------------------

// 5 ) Création d’une fonction permettant de mettre à jour les données d’une station météo
function updateWeatherStationData(data) {
  // TODO
}
// --------------------------------------------------------------------

// 7) Création d’une fonction permettant de modifier l’état de la station météo
function switchWeatherStationState(state, device) {
  // TODO
}
// --------------------------------------------------------------------

// 3) requête HTTP Ajax asynchrone (méthode : GET) afin d’obtenir l’état complet de toutes les stations météo.
function getWeatherStationData() {
  $.ajax({
    method: "GET",
    url: allURL,
    headers: {
      Accept: "application/json"
      //"Content-type" : "application/json"
    },

    success: function(data) {
      $.each(data.stations, function(index, value) {
        console.log(
          "Datas from stations located at " +
            JSON.stringify(value.location) +
            " are ready !"
        );
        console.log(data.stations[index]);
        stations.push(value.location);
      });
      stationNbr = data.stations.length;
      stationsState = Array(stationNbr).fill(false);
      timers = Array(stationNbr).fill(null);
      console.log("There is " + stationNbr + " stations");

      // en cas de succès, afficher chaque station météo en appelant la fonction updateDisplay()
      updateDisplay();
      carouselIndicators();
      showCharts();
    },

    error: function(xhr, status, error) {
      alert("error");
      console.log("xhr: " + xhr);
      console.log("status: " + status);
      console.log("error: " + error);
    }
  });
}
// --------------------------------------------------------------------

function updateDisplay(data) {
  //  4) fonction doit mettre à jour votre interface graphique pour chaque station météo existante et selon le design de votre application
  console.log("show interface");
  console.log(stations);
  for (var i = 0; i < stationNbr; i++) {
    if (i === 0) {
      $(".carousel-inner").append(
        '<div class="carousel-item item' + i + ' active"></div>'
      );
    } else {
      $(".carousel-inner").append(
        '<div class="carousel-item item' + i + '"></div>'
      );
    }

    $(".item" + i).append(
      '<div class="carousel-item-container itemcontainer' + i + ' "></div>'
    );

    if (stationsState[i] == false) {
      $(".itemcontainer" + i).append(
        '<div class="carousel-item-name" onclick="stationToggle(' +
          stations[i] +
          ')"  id=' +
          stations[i] +
          ' data-toggle="tooltip" data-placement="bottom" title="Démarrer ou arrêter la mesure">' +
          stations[i] +
          "</div>"
      );
    } else {
      $(".itemcontainer" + i).append(
        '<div class="carousel-item-name-selected" onclick="stationToggle(' +
          stations[i] +
          ')"  id=' +
          stations[i] +
          ' data-toggle="tooltip" data-placement="bottom" title="Démarrer ou arrêter la mesure">' +
          stations[i] +
          "</div>"
      );
    }
    $(".itemcontainer" + i).append(
      ' <div class="text-center">\
        <button\
          class="button"\
          type="button"\
          data-toggle="collapse"\
          data-target="#map"\
          aria-expanded="false"\
          aria-controls="map"\
        >\
          <img\
            data-toggle="tooltip"\
            data-placement="bottom"\
            title="Dévoiler ou cacher la carte"\
            class="arrow-down"\
            src="./assets/expand-button.png"\
            alt="Clic here to toggle the map"\
          />\
        </button>\
        <div class="collapse" id="map">\
          <div class="card card-body">\
          </div>\
        </div>\
      </div>\
    <div class="chart">\
        <canvas id="line_chart_temp"></canvas>\
      </div>\
      <div class="chart">\
        <canvas id="line_chart_hum"></canvas>\
      </div>\
      <div class="chart">\
        <canvas id="line_chart_press"></canvas>\
      </div>\
    </div>'
    );
  }
}
// --------------------------------------------------------------------

// 6 ) Création d’un appel temporisé pour la mise à jour des valeurs de la station météo
function stationToggle(name) {
  for (var i = 0; i < stationNbr; i++) {
    if (name.id == stations[i]) {
      if (stationsState[i] == false) {
        // start timer
        stationsState[i] = true;
        document
          .getElementById(stations[i])
          .classList.remove("carousel-item-name");
        document
          .getElementById(stations[i])
          .classList.add("carousel-item-name-selected");
        // call to start loop
        timers[i] = setInterval(function() {
          // TIMER STARTER, CALL UPDATE GRAPHS FUNCTION HERE
          console.log("tick");
        }, delay);
      } else {
        // stop timer
        stationsState[i] = false;
        document
          .getElementById(stations[i])
          .classList.remove("carousel-item-name-selected");
        document
          .getElementById(stations[i])
          .classList.add("carousel-item-name");
        // call to top loop
        clearInterval(timers[i]);
        timers[i] = null;
        // TIMER STOPPED
        console.log("STOP");
      }
      console.log(stations[i] + " : " + stationsState[i]);
    }
  }
}
// --------------------------------------------------------------------

// Auto-generate carousel indicator html
function carouselIndicators() {
  var bootCarousel = $(".carousel");
  bootCarousel.append("<ol class='carousel-indicators'></ol>");
  var indicators = $(".carousel-indicators");
  bootCarousel
    .find(".carousel-inner")
    .children(".carousel-item")
    .each(function(index) {
      index === 0
        ? indicators.append(
            "<li data-target='#carouselControls' data-slide-to='" +
              index +
              "' class='active'></li>"
          )
        : indicators.append(
            "<li data-target='#carouselControls' data-slide-to='" +
              index +
              "'></li>"
          );
    });
}
// --------------------------------------------------------------------

$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
// --------------------------------------------------------------------

function showCharts() {
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
}
// --------------------------------------------------------------------
