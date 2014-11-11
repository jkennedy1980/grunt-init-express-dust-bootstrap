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
var dustjs = require('adaro');


var port = process.env.PORT || 3000;


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.engine('dust', dustjs.dust({ cache: false }));
app.set('view engine', 'dust');

app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon( path.join(__dirname, '../public/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// FLASH MESSAGES
app.use(cookieParser());
app.use(session( { secret: "topsecret", saveUninitialized: true, resave: true } ));
app.use(flash());

// LOAD ROUTES
var loadedRoutes = requireMany( '../routes' );
loadedRoutes.apply( app );


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



app.set( 'port', port );

var server = app.listen( app.get('port'), function(){
    debug('Express server listening on port ' + server.address().port);
});

module.exports = app;