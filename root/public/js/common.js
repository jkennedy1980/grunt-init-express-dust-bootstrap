var {%= client_js_module_name %} = (function( app ){
    'use strict';

    app.common = app.common || {};

    app.common.init = function(){
        console.log( "Running common->init" );
    };

    return app;

})( {%= client_js_module_name %} || {} );