( function(){

	module.exports = function( app ){
		app.get( "/", getRoot );
	};

	function getRoot( req, res ){
		res.render('index');
	}

})();