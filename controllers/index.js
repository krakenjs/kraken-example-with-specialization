'use strict';


var IndexModel = require('../models/index');


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
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

    router.get('/setSpcl/:type', function(req, res) {
        req.session.type = req.params.type;
        res.redirect('/');
    });

};
