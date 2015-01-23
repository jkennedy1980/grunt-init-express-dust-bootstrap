( function(){
    'use strict';

	module.exports = function( app ){
		app.get( "/", getRoot );
        app.post( "/testPost", postTestPost );
    };

	function getRoot( req, res ){
		res.render('index');
	}
    
    function postTestPost( req, res ){
        var testInput = req.body.testInput;
        req.flash( 'success', 'Got Input: ' + testInput );
        res.redirect('/');
    }

})();