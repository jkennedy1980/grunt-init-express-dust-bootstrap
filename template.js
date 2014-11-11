/*
 * grunt-init-express-socketio
 *
 * Copyright (c) 2014 Joshua Kennedy
 * Licensed under the MIT license.
 */

'use strict';

exports.description = 'Scaffold Node.JS, Express, Mocha, Eslint.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ shouldn\'t contain "node" or "js" and should ' +
	'be a unique ID not already in use at search.npmjs.org.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
	'install_. After that, you may execute project tasks with _grunt_. For ' +
	'more information about installing and configuring Grunt, please see ' +
	'the Getting Started guide:' +
	'\n\n' +
	'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function( grunt, init, done ){

	init.process( {type: 'node'}, [
		// Prompt for these values.
		init.prompt('name'),
		init.prompt('description'),
		init.prompt('version'),
		init.prompt('repository'),
		init.prompt('homepage'),
		init.prompt('bugs'),
		init.prompt('licenses'),
		init.prompt('author_name'),
		init.prompt('author_email'),
		init.prompt('author_url'),
		init.prompt('node_version', '>= 0.10.0'),
		init.prompt('js_module_name_space', 'MYAPP'),

	], function( err, props ){

		var files = init.filesToCopy( props );

		props.main = "app/app.js",

		props.scripts = {
			"start": "node app/app.js",
			"sup": "supervisor -e js,json,html app/app.js",
		};

		props.dependencies = {
			"express": "~4.10.2",
			"debug": "~2.1.0",
			"underscore": "~1.7.0",
			"request": "~2.47.0",
			"async": "~0.9.0",
			"moment": "~2.8.3",
			"connect-flash": "~0.1.1",
			"serve-favicon": "~2.1.6",
			"colors": "~1.0.3",
			"morgan": "~1.5.0",
			"cookie-parser": "~1.3.3",
			"body-parser": "~1.9.2",
			"express-session": "~1.9.1",
			"dustjs-linkedin": "~2.5.0",
			"dustjs-helpers": "~1.4.0",
			"adaro": "~0.1.5"
		};

		props.devDependencies = {
			"grunt": "~0.4.5",
			"load-grunt-tasks": "~1.0.0",
			"grunt-contrib-watch": "~0.6.1",
			"grunt-contrib-less": "~0.12.0",
			"grunt-contrib-uglify": "~0.6.0",
			"grunt-contrib-csslint": "~0.3.1",
			"grunt-contrib-cssmin": "~0.10.0",
			"grunt-eslint": "~2.0.0",
			"grunt-simple-mocha": "~0.4.0",
			"mocha": "~2.0.1",
			"grunt-open": "~0.2.3",
			"grunt-retire": "~0.3.1",
			"grunt-supervisor": "~0.2.4"
		};

		// Add properly-named license files.
		init.addLicenseFiles( files, props.licenses );

		// Actually copy (and process) files.
		init.copyAndProcess( files, props );

		// Generate package.json file.
		init.writePackageJSON( 'package.json', props );

		done();

	});

};
