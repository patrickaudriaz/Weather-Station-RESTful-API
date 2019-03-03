var berra = false;
var farvagny = false;

function changeColor(name) {
  if (name === "berra") {
    if (berra == false) {
      berra = true;
      document.getElementById("berra").classList.remove("carousel-item-name");
      document
        .getElementById("berra")
        .classList.add("carousel-item-name-selected");
    } else {
      berra = false;
      document
        .getElementById("berra")
        .classList.remove("carousel-item-name-selected");
      document.getElementById("berra").classList.add("carousel-item-name");
    }
    console.log("berra : ", berra);
  } else {
    if (farvagny == false) {
      farvagny = true;
      document
        .getElementById("farvagny")
        .classList.remove("carousel-item-name");
      document
        .getElementById("farvagny")
        .classList.add("carousel-item-name-selected");
    } else {
      farvagny = false;
      document
        .getElementById("farvagny")
        .classList.remove("carousel-item-name-selected");
      document.getElementById("farvagny").classList.add("carousel-item-name");
    }
    console.log("farvagny : ", farvagny);
  }
}

$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
