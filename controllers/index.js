'use strict';


var IndexModel = require('../models/index');


module.exports = function (app) {

    var model = new IndexModel();

    app.get('/', function (req, res) {
        var orientation;
        //sample of setting context in the model
        switch(req.session.type) {
            case 'yin':
                orientation = 'moon';
                break;

            case 'yang':
                orientation = 'sun';
                break;
        }
        model.orientation = {
            is: orientation
        };
        res.render('index', model);
    });

    app.get('/setSpcl/:type', function(req, res) {
        req.session.type = req.params.type;
        res.redirect('/');
    });

};
