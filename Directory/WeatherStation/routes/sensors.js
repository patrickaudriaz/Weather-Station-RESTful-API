var express = require("express"),
    router = express.Router(),
    ressources = require("../resources/model");

router.route('/').get(function (req, res, next) {
    req.result = ressources.sensors;
    next();
});

router.route('/temperature').get(function (req, res, next) {
    req.result = ressources.sensors.temperature;
    next();
});

router.route('/humidity').get(function (req, res, next) {
    req.result = ressources.sensors.humidity;
    next();
});

router.route('/pressure').get(function (req, res, next) {
    req.result = ressources.sensors.pressure;
    next();
});

module.exports = router;