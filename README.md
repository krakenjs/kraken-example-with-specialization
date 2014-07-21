# Specialization-example

An example kraken 1.0 app demonstrating template specialization.

## What is Template Specialization ?
Template specialization is a way to dynamically switch partials in your views, to some other partial, based on some rules that you can specify in the form of a json config in your app.

## Why would you want to do this ?
This may become important and very handy when:
* you are writing apps that need to be supported for multiple locales and parts of it can look different in different countries/regions
* you want part of your views to look completely different across various devices (an alternate, more flexible solution to adaptive/responsive designs)
* you want to A/B test
..... Or any other creative way you'd like to use it.


## How to setup the app with i18n from scratch by using generator-kraken ?

### Create a simple scaffolded app using generator-kraken

* Install Generator
```
$ npm install -g generator-kraken

```

* Create an app using the generator

```
$ yo kraken

     ,'""`.
hh  / _  _ \
    |(@)(@)|   Release the Kraken!
    )  __  (
   /,'))((`.\
  (( ((  )) ))
   `\ `)(' /'

Tell me a bit about your application:

[?] Name: foo
[?] Description: bar
[?] Author: foobar
[?] Template library? Dust
[?] CSS preprocessor library? LESS
[?] JavaScript library? None

```

### Adding specialization rules to your app

The rules for specializing partials in your views can be written in the form of a json config using the module [karka](github.com/krakenjs/karka).
For the purposes of our demo:

* Add a `config/specialization.json` with the following content and copy the corresponding templates from this project in path `public/templates`

```
{
    "yinyang": [
        {
            "is": "yin",
            "when": {
                "energy.is": "female",
                "orientation.is": "moon"
            }
        },
        {
            "is": "yang",
            "when": {
                "energy.is": "male",
                "orientation.is": "sun"
            }
        }
    ],
    "nested/yinyang": [
        {
            "is": "nested/yin",
            "when": {
                "energy.is": "female",
                "orientation.is": "moon"
            }
        },
        {
            "is": "nested/yang",
            "when": {
                "energy.is": "male",
                "orientation.is": "sun"
            }
        }
    ],
    "nested/peace": [
        {
            "is": "nested/peace-yin",
            "when": {
                "energy.is": "female",
                "orientation.is": "moon"
            }
        },
        {
            "is": "nested/peace-yang",
            "when": {
                "energy.is": "male",
                "orientation.is": "sun"
            }
        }
    ]
}
```

What above config means is for eg: partial `yingyang` will be replaced with partial `yin` when the context satisfies the rules
```
{
    "energy.is": "female",
    "orientation.is": "moon"
}
```
Similar syntax applies to the rest of the config.
To learn more about semantics of the config and other options available, please be sure to read docs [here](http://github.com/krakenjs/karka).

* Modify `config/config.json` to load in these rules under the property `specialization`

```
"specialization": "import:./specialization.json"
```

### Including specialization into the render work flow
#### Modify `view engines` in `config/config.json`

```
"view engines": {
    "js": {
        "module": "engine-munger",
        "renderer": {
            "method": "js",
            "arguments": [
                { "cache": true },
                {
                    "views": "config:express.views",
                    "view engine": "config:express.view engine",
                    "specialization": "config:specialization",
                    "i18n": "config:i18n"
                }
            ]
        }
    }
}
```

#### Modify `view engines` in `config/development.json`
```
"view engines": {
    "dust": {
        "module": "engine-munger",
        "renderer": {
            "method": "dust",
            "arguments": [
                { "cache": false },
                {
                    "views": "config:express.views",
                    "view engine": "config:express.view engine",
                    "specialization": "config:specialization",
                    "i18n": "config:i18n"
                }
            ]
        }
    }
}
```
#### Set the context information before res.render

This can be done in two ways: Setting context info into res.locals (or) in the model passed to res.render(view, model)
We will demo both in our test.


* Add a separate route to set the context rules at run time, so to `routes.js` add the following

```
router.get('/setSpcl/:type', function(req, res) {
    req.session.type = req.params.type;
    res.redirect('/');
});
```

* Add `lib/specialization.js` and add the following snippet of code

```
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
```

* Add it to the middleware chain to your express app by inserting the following in `middleware` property in your `config/config.json`

```
"spclContext": {
    "enabled": true,
    "priority": 105,
    "module": {
        "name": "path:./lib/specialization"
    }
}
```

* Also in your `routes.js` modify the `/` route controller to do the following

```
router.get('/', function (req, res) {
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
});

```

#### To see specialization on server-side render

1. In your console `$ node .`
2. In your browser: `http://localhost:8000`
3. In your browser
```
http://localhost:8000/setSpcl/yin
(or)
http://localhost:8000/setSpcl/yang
(or)
http://localhost:8000/setSpcl/yinyang
```
You will see that the specialization rules will be set in the session and you will be redirected to the index page with the right specialization rules.

### To see specialization on client-side render

* Change public/app.js with following:

```
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
```

The above code:
1. Requires/loads the javascript necessary to perform a client side render.
2. Sets up a button listener to trigger the client side render.
The file `public/js/lib/nougat.js` is the client side render helper for dust.

* Set the templatePath according to locale so that you can find the compiled templates in the right path when required from the browser. In the demo case we hard code it to `US/en`. But this can be done in conjunction with i18n for right locale.
 In `config.json`
```
"templatePath": {
    "enabled":true,
    "priority": 96,
    "module": {
        "name": "path:./lib/templatePath"
    }
}
```
In `lib/templatePath`

```
'use strict';
module.exports = function () {
    return function (req, res, next) {
        //Sample of setting context in res.locals
        res.locals.templatePath = 'templates/US/en';
        next();
    };
};
```

* Modify `templates/layouts/master.dust` to include the specialization map and the templatePath in a data-attribute

```
<body data-specialization='{_specialization|js|s}' data-template-path="{templatePath}/%s.js">
```

* Add dependency files (copy from `public/js/lib` in this project) and add the file from `public/config.js` to your project as well.

Now repeat steps 1,2,3 from previous section and then click on the 'Tell Me More' button. You will see that templates/styles are different for different specializations.

You can play with the specialization rules in the config + what you set in the context to see how dust partials gets specialized.

Have Fun!!
