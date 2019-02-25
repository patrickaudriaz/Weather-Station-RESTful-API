var berras = false;
var farvagny = false;

function changeColor(name) {
  if (name === "berras") {
    if (berras == false) {
      berras = true;
      document.getElementById("berras").classList.remove("carousel-item-name");
      document
        .getElementById("berras")
        .classList.add("carousel-item-name-selected");
    } else {
      berras = false;
      document
        .getElementById("berras")
        .classList.remove("carousel-item-name-selected");
      document.getElementById("berras").classList.add("carousel-item-name");
    }
    console.log("berras : ", berras);
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
