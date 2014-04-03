'use strict';


module.exports = function less(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-contrib-less');

	// Options
	return {
	    build: {
	        options: {
	            yuicompress: true,
	            paths: [ 'public/css' ]
	        },
	        files: {
	            '.build/css/app.css': 'public/css/app.less',
                '.build/css/yin.css': 'public/css/yin.less',
                '.build/css/yang.css': 'public/css/yang.less'
	        }
	    }
	};
};
