'use strict';


var IndexModel = require('../models/index');

exports.index = function (req, res) {
    var orientation;
    var model = new IndexModel();
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
};

exports.setSpcl = function(req, res) {
    req.session.type = req.params.type;
    res.redirect('/');
};
