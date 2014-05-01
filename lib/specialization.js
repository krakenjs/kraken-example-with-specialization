'use strict';
module.exports = function () {
    return function (req, res, next) {
        //Sample of setting context in res.locals
        var energy;
        //sample of setting context in the model
        switch(req.session.type) {
        case 'yin':
            energy = 'female';
            break;

        case 'yang':
            energy = 'male';
            break;
        }

        res.locals.energy = {
            is: energy
        };
        next();
    };
};