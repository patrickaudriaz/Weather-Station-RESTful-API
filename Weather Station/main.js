//Station object
let Station = function() {
  this.id = 0;
  this.name = "";
  this.state = false;
  this.url = "";
  this.longitude = 0;
  this.latitude = 0;
  this.urlForObserver = "";
};

let IDindex = 0;
const stations = [];
let stationNbr;

//Main Url for the first request
//http://appint01.tic.heia-fr.ch
//http://localhost:8585
//http://appint01.tic.heia-fr.ch:8585
//const allURL = "http://localhost:8585";
const allURL = "http://localhost:8585";

const delay = 1000;
const displayNbr = 20;
var updateCount = 0;

// --------------------------------------------------------------------

// 2) Ecrire la fonction $(document).ready()
$(document).ready(function() {
  // call API
  getWeatherStationData();
  console.log("Document is ready !");
});
// --------------------------------------------------------------------

// 3) requête HTTP Ajax asynchrone (méthode : GET) afin d’obtenir l’état complet de toutes les stations météo.
function getWeatherStationData() {
  $.ajax({
    method: "GET",
    url: allURL,
    crossDomain: true,
    headers: {
      Accept: "application/json"
      //"Content-type" : "application/json"
    },

    //In case of succes
    success: function(data) {
      //Adding data from each station
      $.each(data.stations, function(index, value) {
        console.log(
          "Datas from stations located at " +
            JSON.stringify(value.location) +
            " are ready !"
        );
        console.log(data.stations[index]);
        const station = new Station();
        station.id = IDindex;
        station.url = value.url;
        station.urlForObserver = value.urlForObserver;
        station.latitude = value.latitude;
        station.longitude = value.longitude;
        station.name = value.location;
        stations.push(station);
        updateDisplay(station);
        IDindex++;
        //updateWeatherStationData(station);
      });
      stationNbr = data.stations.length;
      console.log("There is " + stationNbr + " stations");
      console.log("Show stations array :");
      console.log(stations);

      carouselIndicators();

      IDindex = 0;
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

//  4) fonction doit mettre à jour votre interface graphique pour chaque station météo existante et selon le design de votre application
// Generate the template for each station
function updateDisplay(data) {
  console.log("show interface");
  console.log(data);
  if (data.id === 0) {
    $(".carousel-inner").append(
      '<div class="carousel-item item' + data.id + ' active"></div>'
    );
  } else {
    $(".carousel-inner").append(
      '<div class="carousel-item item' + data.id + '"></div>'
    );
  }

  $(".item" + data.id).append(
    '<div class="carousel-item-container itemcontainer' + data.id + ' "></div>'
  );

  //Check if the state is true if so adding the grap
  if (data.state === false) {
    $(".itemcontainer" + data.id).append(
      '<div class="carousel-item-name" onclick="stationToggle(' +
        data.id +
        ')"  id=' +
        data.id +
        ' data-toggle="tooltip" data-placement="bottom" title="Démarrer ou arrêter la mesure">' +
        data.name +
        "</div>"
    );
  } else {
    $(".itemcontainer" + data.id).append(
      '<div class="carousel-item-name-selected" onclick="stationToggle(' +
        data.id +
        ')"  id=' +
        data.id +
        ' data-toggle="tooltip" data-placement="bottom" title="Démarrer ou arrêter la mesure">' +
        data.name +
        "</div>"
    );
  }
  $(".itemcontainer" + data.id).append(
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
              <iframe\
                width="400"\
                height="300"\
                frameborder="0"\
                scrolling="no"\
                marginheight="0"\
                marginwidth="0"\
                src="https://maps.google.com/maps?q=' +
      data.latitude +
      "," +
      data.longitude +
      '&hl=es;z=14&amp;output=embed"\
                >\
              </iframe>\
              </div>\
            </div>\
          </div>\
        <div class="chart">\
            <canvas id="line_chart_temp' +
      data.id +
      '"></canvas>\
          </div>\
          <div class="chart">\
            <canvas id="line_chart_hum' +
      data.id +
      '"></canvas>\
          </div>\
          <div class="chart">\
            <canvas id="line_chart_press' +
      data.id +
      '"></canvas>\
          </div>\
        </div>'
  );
  //}
}

// --------------------------------------------------------------------

// 5 ) Création d’une fonction permettant de mettre à jour les données d’une station météo

function observeStation(station) {
  const ctxTemp = document.getElementById("line_chart_temp" + station.id);
  const ctxHum = document.getElementById("line_chart_hum" + station.id);
  const ctxPress = document.getElementById("line_chart_press" + station.id);
  let line_chart_temp;
  let line_chart_hum;
  let line_chart_press;

  let requestUrl = station.urlForObserver;
  let sse = new EventSource(requestUrl);

  console.log(station);
  console.log("GET from " + station.name);

  const updatefct = function(data) {
    //In case of success generate the chart ctx from the data
    console.log(data);

    var date = new Date($.now());
    var label = date.getHours() + ":" + date.getMinutes();

    //Check if the chart already exist if so updating the datasets if not create a new one
    if (line_chart_temp == null) {
      updateCount = 0;
      line_chart_temp = new Chart(ctxTemp, {
        type: "line",
        data: {
          labels: [label],
          datasets: [
            {
              label:
                data.temperature.name + " in [" + data.temperature.unit + "]",
              data: [data.temperature.current_condition.value],
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
      station.temp = line_chart_temp;
    } else if (station.state === true) {
      addDataToChart(
        line_chart_temp,
        label,
        data.temperature.current_condition.value
      );
    } else {
      line_chart_temp = null;
    }

    if (line_chart_hum == null) {
      line_chart_hum = new Chart(ctxHum, {
        type: "line",
        data: {
          labels: [label],
          datasets: [
            {
              label: data.humidity.name + " in [" + data.humidity.unit + "]",
              data: [data.humidity.current_condition.value],
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
      station.hum = line_chart_hum;
    } else if (station.state == true) {
      addDataToChart(
        line_chart_hum,
        label,
        data.humidity.current_condition.value
      );
    } else {
      line_chart_hum = null;
    }

    if (line_chart_press == null) {
      line_chart_press = new Chart(ctxPress, {
        type: "line",
        data: {
          labels: [label],
          datasets: [
            {
              label: data.pressure.name + " in [" + data.pressure.unit + "]",
              data: [data.pressure.current_condition.value],
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
      station.press = line_chart_press;
    } else if (station.state == true) {
      addDataToChart(
        line_chart_press,
        label,
        data.pressure.current_condition.value
      );
    } else {
      line_chart_press = null;
    }
  };

  console.log(stations);
  console.log(station.state);

  if (station.state) {
    sse.onmessage = function(event) {
      //alert(event.data);
      console.log("new message");
      if (event.data == "") {
        console.log("No new data !");
      } else {
        console.log(station.name);
        console.log(event.data);
        var data = JSON.parse(event.data);
        console.log("jsonData is : ");
        updatefct(data);
      }
    };
  } else if (sse != null) {
    sse.close();
    sse = null;
    console.log("SSE STOPPED");
  }
}

//Manage how tu add new data on the chart
function addDataToChart(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach(dataset => {
    dataset.data.push(data);
  });

  //block the number of value displayed on screen
  if (updateCount > displayNbr) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  } else updateCount++;
  chart.update();
}

// --------------------------------------------------------------------

// Auto-generate carousel indicator html
function carouselIndicators() {
  const bootCarousel = $(".carousel");
  bootCarousel.append("<ol class='carousel-indicators'></ol>");
  const indicators = $(".carousel-indicators");
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

// 6 ) Création d’un appel temporisé pour la mise à jour des valeurs de la station météo
function stationToggle(name) {
  for (let i = 0; i < stationNbr; i++) {
    if (name === stations[i].id) {
      if (stations[i].state === false) {
        // start timer
        stations[i].state = true;
        switchWeatherStationState(stations[i].state, stations[i]);
        //observeStation(stations[i]);
        document
          .getElementById(stations[i].id)
          .classList.remove("carousel-item-name");
        document
          .getElementById(stations[i].id)
          .classList.add("carousel-item-name-selected");
        // call to start loop
      } else {
        // stop timer
        stations[i].state = false;
        switchWeatherStationState(stations[i].state, stations[i]);
        //observeStation(stations[i]);
        document
          .getElementById(stations[i].id)
          .classList.remove("carousel-item-name-selected");
        document
          .getElementById(stations[i].id)
          .classList.add("carousel-item-name");
      }
      console.log(stations[i].name + " : " + stations[i].state);
    }
  }
}
// --------------------------------------------------------------------

// 7) Création d’une fonction permettant de modifier l’état de la station météo
function switchWeatherStationState(state, station) {
  $.ajax({
    url: station.url + "/actuators/state",
    method: "PUT",
    accepts: "application/json",
    contentType: "application/json",
    data: JSON.stringify({
      name: "Station state",
      value: state
    }),
    success: function(data) {
      observeStation(station);
    },
    error: function(e) {
      $(".alert-text").html(
        "Erreur: impossible de changer le statut de la station "
      );
      $(".alert")
        .addClass("alert-danger")
        .removeClass("d-none");
      console.log(e);
    }
  });
}

// --------------------------------------------------------------------
