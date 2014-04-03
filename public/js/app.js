'use strict';

require(['config'], function() {
    require(['jquery', 'nougat'], function ($, nougat) {
        console.info('required jquery and nougat');
        var app = {
            initialize: function () {
                console.info('intialized view');
                nougat.setContext($(document.body).data());
                //Demonstrating specialization for
                //client side rendering.
                this.initializeView();

            },

            initializeView: function () {
                $('#more').click(function () {
                    console.info('clicked');
                    nougat.viewRenderer
                        .render('nested/yinyang', {message: 'More Info'})
                        .done(function (content) {
                            $('#moreInfo').html(content);
                        });
                });
            }
        };
        app.initialize();
    });
});



