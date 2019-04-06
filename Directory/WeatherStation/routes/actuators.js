const express = require("express"),
    router = express.Router(),
    ressources = require("../resources/model"),
    openweather = require('../plugins/openweather-forecast');


router.route('/').get(function (req, res, next) {
    req.result = ressources.actuators;
    next();
});

router.route('/state').get(function (req, res, next) {
    req.result = ressources.actuators.state;
    next();
});

router.route('/state').put(function (req, res, next) {
    if(req.is('application/json')) {
        console.log('PUT request : ', req.body);

        const state = req.body.value;

        if(ressources.actuators.state.value !== state){
            if(state){
                openweather.start();
            } else {
                openweather.stop();
            }
            ressources.actuators.state.value = state;
        }
        req.result = ressources.actuators.state;
    }
    next();
});


module.exports = router;
