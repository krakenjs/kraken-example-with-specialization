# specialization-example

An example kraken 1.0 app demonstrating template specialziation.

To see it working:

```
Start the app:
$ node .

In your browser:

localhost:8000
```
To see client side template specialization, click on the 'Tell Me More' button.

###What does the sample app demonstrate ?

* [Adding rules into the app's config file](https://github.com/krakenjs/kraken-examples/blob/master/with.specialization/config/app.json#L24)

* [Setting the context from middleware](https://github.com/krakenjs/kraken-examples/blob/master/with.specialization/lib/specialization.js#L5)

* [Setting the context in the model passed to res.render in the controllers](https://github.com/krakenjs/kraken-examples/blob/master/with.specialization/controllers/index.js#L14)

* [Adding specialization map to data-attribute in the master.dust to enable client side specialization](https://github.com/krakenjs/kraken-examples/blob/master/with.specialization/public/templates/layouts/master.dust#L8)

* [Sample client code demonstrating client side template specialization](https://github.com/krakenjs/kraken-examples/blob/master/with.specialization/public/js/app.js#L19)

* [A sample dust for client side template specialization demonstrating custom load of css as well as nested specialized templates](https://github.com/krakenjs/kraken-examples/blob/master/with.specialization/public/templates/nested/yin.dust)
