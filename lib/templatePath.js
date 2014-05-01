'use strict';
module.exports = function () {
    return function (req, res, next) {
        //Sample of setting context in res.locals
        res.locals.templatePath = 'templates/US/en';
        next();
    };
};