'use strict';


var IndexModel = require('../models/index');


module.exports = function (app) {

    var model = new IndexModel();

    app.get('/', function (req, res) {

        //sample of setting context in the model
        model.orientation = {
            is: 'moon'
        };
        res.render('index', model);
    });

};
