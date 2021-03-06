/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */


var express = require('express');
var debug = require('debug');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var requireMany = require('../lib/requireMany.js');
var flash = require('connect-flash');
var colors = require('colors');
var app = express();
var lusca = require('lusca');
var config = require('pony-config');
var middleware = require('../lib/app-middleware');
var dust = require('dustjs-linkedin');
require('dustjs-helpers');
var consolidate = require('consolidate');
require('../lib/dust-helpers.js')( dust );
var dbBootstrap = require('../lib/db-bootstrap');


// LOAD CONFIGURATION
config
    .setOptions( { debug: true } )
    .findEnvironment({ env: 'ENVIRONMENT', default:'dev' })
    .useObject( require('../config/common') )
    .when(['dev']).useObject( require('../config/development') )
    .when(['prod', 'production', 'stage']).useObject( require('../config/production') );

console.log( "Loaded Configuration: ", config.getEnvironment() );

// Must be after configuration is loaded
var db = dbBootstrap.connect();

app.set('views', path.join(__dirname, '../views'));
app.set('showStackError', true);

app.engine('dust', consolidate.dust );
app.set('view engine', 'dust');

app.disable( 'x-powered-by' );
app.use( express.static(path.join(__dirname, '../public')) );
app.use( favicon( path.join(__dirname, '../public/images/favicon.ico')) );
app.use( logger('dev') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( cookieParser() );
app.use( session( { secret: "topsecret", saveUninitialized: true, resave: true } ) );
app.use( dbBootstrap.mongoExpressSession() );

app.use( lusca({
    csrf: true,
    csp: {
        policy: {
            'default-src': '\'self\' *.googleapis.com',
            'img-src': '\'self\'',
            'script-src': '\'self\' \'unsafe-inline\' *.googleapis.com',
            'style-src': '\'self\' \'unsafe-inline\''
        }
    },
    xframe: 'SAMEORIGIN',
    p3p: false,
    hsts: { maxAge: 31536000, includeSubDomains: true },
    xssProtection: true
}));

app.use( flash() );
app.use( middleware.localize );


// LOAD THANGS FROM THE /routes DIRECTORY
var loadedRoutes = requireMany( '../routes' );
loadedRoutes.apply( app );

app.use( middleware.fourOhFour );       // Needs to be after all routes are loaded
app.use( middleware.unhandledError );   // Needs to be the last middleware on the stack


app.set( 'port', config.get("port") );

var server = app.listen( app.get('port'), function(){
    debug( 'Express server listening on port ' + server.address().port );
});