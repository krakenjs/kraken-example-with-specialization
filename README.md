# specialization-example

An example kraken 1.0 app demonstrating template specialziation.

To see it working:

#### To start the app:
* In you console
```
$ node .
```
* In your browser:
```
http://localhost:8000
```
#### To see specialization at work
* In you browser
```
http://localhost:8000/setSpcl/yin
(or)
http://localhost:8000/setSpcl/yang
(or)
http://localhost:8000/setSpcl/yinyang
```
You will see that the specialization rules will be set in the session and you will be redirected to the index page with the right specialization rules.

* To see client side template specialization, click on the 'Tell Me More' button. You will see that template/styles are different for different specializations.

###What does the sample app demonstrate ?

* [Adding rules into the app's config file](https://github.com/krakenjs/kraken-examples/blob/master/with.specialization/config/app.json#L24)

* [Setting the context from middleware](https://github.com/krakenjs/kraken-examples/blob/master/with.specialization/lib/specialization.js#L5)

* [Setting the context in the model passed to res.render in the controllers](https://github.com/krakenjs/kraken-examples/blob/master/with.specialization/controllers/index.js#L14)

* [Adding specialization map to data-attribute in the master.dust to enable client side specialization](https://github.com/krakenjs/kraken-examples/blob/master/with.specialization/public/templates/layouts/master.dust#L8)

* [Sample client code demonstrating client side template specialization](https://github.com/krakenjs/kraken-examples/blob/master/with.specialization/public/js/app.js#L19)

* [A sample dust for client side template specialization demonstrating custom load of css as well as nested specialized templates](https://github.com/krakenjs/kraken-examples/blob/master/with.specialization/public/templates/nested/yin.dust)


You can play with the specialization rules in the config + what you set in the context to see how dust partials gets specialized. Have Fun!!
