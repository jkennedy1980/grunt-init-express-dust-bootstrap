var {%= client_js_module_name %} = (function( app ){
    'use strict';

    app.home = app.home || {};

    app.home.init = function(){
        console.log( "Running home->init" );
    };
    
    return app;

})( {%= client_js_module_name %} || {} );