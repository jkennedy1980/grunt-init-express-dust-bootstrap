( function(){
    'use strict';
    
    var mongoose = require('mongoose');
    var Hello = mongoose.model('Hello');
    
	module.exports = function( app ){
		app.get( "/", getRoot );
        app.post( "/testPost", postTestPost );
    };

	function getRoot( req, res ){
		res.render('index');
	}
    
    function postTestPost( req, res ){
        var testInput = req.body.testInput;
        
        var hello = new Hello();
        hello.message = testInput;
        hello.save( function( error, hello ){
            if( error ){
                req.flash( 'error', 'Oops!' + (error.message || error) );
            }else{
                req.flash( 'success', 'Got Input: ' + testInput );
            }
            res.redirect('/');
        });
    }

})();