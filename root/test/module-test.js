/*
 * Sample test suite for the sample-{%= name %} module (sample-{%= name %}-module.js).
 * Mocha assertions reference: http://visionmedia.github.io/mocha/#assertions
 */
 
var assert = require("assert");

describe( 'aModule', function(){

	describe( 'aFuncton()', function(){

		it( 'should be fabulous', function(){
			var someValue = 'fabulous';
			assert.equal( 'fabulous', someValue );
		});

	});

});