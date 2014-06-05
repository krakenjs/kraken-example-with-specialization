'use strict';


var kraken = require('kraken-js'),
    app = require('express')(),
    port = process.env.PORT || 8000,
    options = {
        onconfig: function (config, next) {
            next(null, config);
        }
    };


app.use(kraken(options));

app.listen(port, function (err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});