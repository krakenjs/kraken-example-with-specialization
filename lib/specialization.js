'use strict';
module.exports = function () {
    return function (req, res, next) {
        //Sample of setting context in res.locals
        res.locals({
            energy: {
                is: 'female'
            }
        });
        next();
    };
};