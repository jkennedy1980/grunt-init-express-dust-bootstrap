( function(){
    'use strict';

    var config = require('pony-config');
    
    exports.localize = function( req, res, next ){

        if( req.flash !== undefined ){
            var flashErrors = req.flash('error');
            var flashInfos = req.flash('info');
            var flashSuccesses = req.flash('success');

            res.locals.flashMessagesPresent = function(){
                return (flashErrors && flashErrors.length > 0) || (flashInfos && flashInfos.length > 0) || (flashSuccesses && flashSuccesses.length > 0);
            };

            // Just moving the flash messages to the response locals so we can reference them in the views
            res.locals.flashErrors = flashErrors;
            res.locals.flashInfos = flashInfos;
            res.locals.flashSuccesses = flashSuccesses;
        }

        if( req.user ) res.locals.user = req.user;
        res.locals.currentUrl = req.originalUrl;
        res.locals.scriptsToMinify = config.get("scriptsToMinify");
        res.locals.useMinifiedJs = config.get("useMinifiedJs");

        next();
    };
    
    exports.fourOhFour = function( req, res, next ){
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    };

    exports.unhandledError = function( err, req, res, next ){
        console.log( "Unhandled error: ", err );

        var error = ( config.get("renderStackTraces") === true ) ? err : {};

        res.status( err.status || 500 );

        res.render( 'error', {
            message: err.message,
            error: error
        });
    };
    
})();