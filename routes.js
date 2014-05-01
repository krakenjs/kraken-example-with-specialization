var controllers = require('./controllers');

module.exports = function (router) {
    router.get('/', controllers.index);
    router.get('/setSpcl/:type', controllers.setSpcl);
};