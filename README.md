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

* [Adding rules into the app's config file]

* [Setting the context from middleware]

* [Setting the context in the model passed to res.render in the controllers]

* [Adding specialization map to data-attribute in the master.dust to enable client side specialization]

* [Sample client code demonstrating client side template specialization]

* [Client side template specialization demonstrating custom load of css as well as nested specialized templates]