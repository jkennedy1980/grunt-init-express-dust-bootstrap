
var {%= js_module_name_space %} = {

	common: {
		init: function() {
			console.log( "STARTING common->init" );
		}
	},

	home:{
		init: function(){

			console.log( "STARTING home->init" );

		}
	}
};

UTIL = {
	exec: function( controller, _action ){
		var ns = {%= js_module_name_space %};
		var action = ( typeof(_action) === 'undefined' ) ? "init" : _action;

		if( controller !== "" && ns[controller] && typeof ns[controller][action] === "function" ){
			ns[controller][action]();
		}
	},

	init: function() {
		var body = document.body,
		controller = body.getAttribute( "data-controller" ),
		action = body.getAttribute( "data-action" );

		UTIL.exec( "common" );
		if( action !== 'init' ) UTIL.exec( controller );
		UTIL.exec( controller, action );
	}
};

$( UTIL.init );