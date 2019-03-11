var sta1 = false;
var sta2 = false;
var sta3 = false;

$(document).ready(function() {});

function changeColor(name) {
  if (name === "sta1") {
    if (sta1 == false) {
      sta1 = true;
      document.getElementById("sta1").classList.remove("carousel-item-name");
      document
        .getElementById("sta1")
        .classList.add("carousel-item-name-selected");
    } else {
      sta1 = false;
      document
        .getElementById("sta1")
        .classList.remove("carousel-item-name-selected");
      document.getElementById("sta1").classList.add("carousel-item-name");
    }
    console.log("sta1 : ", sta1);
  }
  if (name === "sta2") {
    if (sta2 == false) {
      sta2 = true;
      document.getElementById("sta2").classList.remove("carousel-item-name");
      document
        .getElementById("sta2")
        .classList.add("carousel-item-name-selected");
    } else {
      sta2 = false;
      document
        .getElementById("sta2")
        .classList.remove("carousel-item-name-selected");
      document.getElementById("sta2").classList.add("carousel-item-name");
    }
    console.log("sta2 : ", sta2);
  }

  if (name === "sta3") {
    if (sta3 == false) {
      sta3 = true;
      document.getElementById("sta3").classList.remove("carousel-item-name");
      document
        .getElementById("sta3")
        .classList.add("carousel-item-name-selected");
    } else {
      sta3 = false;
      document
        .getElementById("sta3")
        .classList.remove("carousel-item-name-selected");
      document.getElementById("sta3").classList.add("carousel-item-name");
    }
    console.log("sta3 : ", sta3);
  }
}

window.onload = function() {
  var ctx = document.getElementById("line_chart_temp_sta1");
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

  var ctx2 = document.getElementById("line_chart_hum_sta1");
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

  var ctx3 = document.getElementById("line_chart_press_sta1");
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

  var ctx = document.getElementById("line_chart_temp_sta2");
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
          data: [-10, -8, -3, 0, 0, 5, 7, 3, 10, 15],
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

  var ctx2 = document.getElementById("line_chart_hum_sta2");
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
          data: [37, 40, 44, 48, 39, 45, 43, 40, 36, 40],
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

  var ctx3 = document.getElementById("line_chart_press_sta2");
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
            1016,
            1018,
            1012,
            1013.4,
            1013.3,
            1016.2,
            1011.4,
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
