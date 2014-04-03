/*
 * Nougat.js v0.1.0 - Application Dust view render helper
 *
 * @author Erik Toth <ertoth@paypal.com>
 */

/*global define:false, requirejs:true */
/*jslint plusplus:true, nomen:true */

define(['jquery', 'dust', 'dust-helpers'], function ($) {
    'use strict';

    var ViewRenderer = null,
        DustRenderer = null,
        Nougat = null;

    /**
     * Executes a provided function once per array element or object property.
     * Based on http://es5.github.com/#x15.4.4.18
     * @param {Object} obj the array or object to enumerate
     * @param {Function} fn the function to invoke on each element
     * @param {Object} [context] Object to use as this when executing callback.
     */
    function forEach(obj, fn, context) {
        if (obj instanceof Array && Array.prototype.forEach) {
            return obj.forEach(fn, context);
        }

        var object = Object(obj),
            prop = null,
            result = null;

        for (prop in object) {
            if (object.hasOwnProperty(prop)) {
                result = fn.call(context, object[prop], prop, object);
                // Provide the ability to short circuit and fail-fast
                if (result === false) {
                    break;
                }
            }
        }
    }

    /**
     * A basic object mixin implementation. Copies the properties from the source
     * object to the destination object.
     * @param {Object} src the object containing the properties to be copied
     * @param {Object} dest the object to which the properties should be copied
     */
    function mixin(src, dest) {
        var prop = null;
        for (prop in src) {
            if (src.hasOwnProperty(prop)) {
                dest[prop] = src[prop];
            }
        }
        return dest;
    }

    /**
     * A simple object extend implementation that copies properties from several
     * source objects into the destination object.
     * @param {Object} dest the object to which the properties should be copied
     * @param {Object...} sources the objects from which the properties should be copied
     */
    function extend(dest) {
        forEach(Array.prototype.slice.call(arguments, 1), function (src) {
            mixin(src, dest);
        });
        return dest;
    }


    /**
     * An abstract view renderer implementation that"s based on Promises
     * @constructor
     */
    ViewRenderer = function () {
        // Intentionally left blank
    };

    ViewRenderer.prototype = {

        /**
         * The main public API for rendering a template
         * @param template the name of the template to render
         * @param context the context to pass to the renderer
         * @returns a Promise
         */
        render: function (template, context) {
            var deferred = new $.Deferred();
            this._doRender(template, context, function (err, out) {
                if (err) { return deferred.reject(err); }
                deferred.resolve(out, template);
            });
            return deferred.promise();
        },

        /**
         * The method to override to provide the view rendering implementation
         * @private
         * @param template the name of the template to render
         * @param context the content to pass to the renderer
         * @param callback the callback invoked when rendering is complete
         */
        _doRender: function (template, context, callback) {
            // TODO: Implement
        }
    };



    /**
     * A Dust view rendering implementation
     * @constructor
     */
    DustRenderer = function (nougat) {
        var DEFAULT_PATH = '/templates/%s.js';

        dust.onLoad = function (name, callback) {

            var path = nougat.getContext().templatePath || DEFAULT_PATH,
                specialization = nougat.getContext().specialization,
                resolvedName = (specialization && specialization[name]) || name,
                template = path.replace('%s', resolvedName);

            require([template], function () {
                // Merely using requireJs to the load compiled template so undefining
                // it as soon as it's loaded so doesn't sit in the requireJs *and* dust.js
                // caches. Also, we know it's JS, thus doesn't need to be compiled so
                // callback has no arguments.
                requirejs.undef(template);

                //also fill this into the dust cache in case we resolved the template name to
                //something else for specialization
                if (name != resolvedName) {
                    dust.cache[name] = dust.cache[resolvedName];
                }
                console.info('finished updating dust cache');
                setTimeout(callback, 0);
            });
        };
    };

    DustRenderer.prototype = extend(ViewRenderer.prototype, {
        _doRender: function (template, context, callback) {
            var base = {};
            context = context || {};

            // Ugh.
            if (context.content) {
                base.cn = context.content;
                delete context.content;
            }

            context = dust.makeBase(base).push(context);
            dust.render(template, context, callback);
        }
    });



    Nougat = function () {
        this._context = {};
        this.viewRenderer = new DustRenderer(this);
    };

    Nougat.prototype = {

        /**
         *
         * @param context
         * @returns
         */
        setContext : function (context) {
            return mixin(context, this._context);
        },

        /**
         *
         * @returns the current context object
         */
        getContext : function () {
            return this._context;
        }

    };

    return new Nougat();

});
