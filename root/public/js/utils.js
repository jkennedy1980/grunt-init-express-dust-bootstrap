var {%= client_js_module_name %} = (function( app ){
    'use strict';

    app.utils = app.utils || {};

    app.utils.init = function(){
        var body = document.body,
            controller = body.getAttribute( "data-controller" ),
            action = body.getAttribute( "data-action" );

        {%= client_js_module_name %}.utils.exec( "common" );
        if( controller ) {%= client_js_module_name %}.utils.exec( controller, action );
    };
    
    app.utils.exec = function( controller, _action ){
        var action = ( typeof _action === 'undefined' ) ? "init" : _action;
        if( controller !== "" && {%= client_js_module_name %}[controller] && typeof {%= client_js_module_name %}[controller][action] === "function" ){
            {%= client_js_module_name %}[controller][action]();
        }
    };

    return app;
    
})( {%= client_js_module_name %} || {} );

$( function(){
    'use strict';
    {%= client_js_module_name %}.utils.init();
});
