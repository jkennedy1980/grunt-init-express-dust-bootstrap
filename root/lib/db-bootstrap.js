( function(){
	'use strict';

	var requireMany = require('../lib/requireMany.js');
	var mongoose = require('mongoose');
	var config = require('pony-config');
	var session = require('express-session');

	var MongoStore = false;

	exports.connect = function( ){
		MongoStore = require('connect-mongo')( session );

		var connectionString = config.get("mongo.connectionString");
		
		exports.db = mongoose.connect( connectionString, function( error ){
			if( error ){
				console.error( 'Could not connect to MongoDB! ' + config.db, error );
			}
			console.log( "Connected to Mongo".green );
		});

		requireMany( '../models' );
		
		return exports.db;
	};
	
	exports.mongoExpressSession = function(){
		if( !exports.db ) throw new Error( "You must call connect() first to setup the mongo connection." );
		
		return session({
			saveUninitialized: true,
			resave: true,
			secret: config.get("sessionSecret"),
			store: new MongoStore({
				mongooseConnection: mongoose.connection
			})
		});
	};

})();