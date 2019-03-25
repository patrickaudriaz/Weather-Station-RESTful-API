
exports.randomInt = function(low, high) {
	var randomValue =  Math.random();
  return Math.floor(randomValue * (high - low) + low);
};

exports.randomFloat = function(low, high) {
  var randomValue =  Math.random();
  randomValue = randomValue * (high - low) + low;
  return Math.round(randomValue * 100) / 100;
};
