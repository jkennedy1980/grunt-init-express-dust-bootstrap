'use strict';

module.exports = function( grunt ){

	require('load-grunt-tasks')( grunt );

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		less: {
			src: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapFilename: 'public/css/main.css.map'
				},
				files: {
					'public/css/main.css': 'less/main.less'
				}
			}
		},

		csslint: {
			options: {
				csslintrc: 'less/.csslintrc'
			},
			src: [
				'public/css/main.css'
			]
		},

		cssmin: {
			options: {
				compatibility: 'ie8',
				keepSpecialComments: '*',
				noAdvanced: true
			},
			core: {
				files: {
					'public/css/main.min.css': 'public/css/main.css'
				}
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %>, <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				compress: {
					drop_console: false
				}
			},
			clientjs: {
				files: {
					'public/js/main.min.js': [
						'clientjs/bootstrap/transition.js',
						'clientjs/bootstrap/alert.js',
						'clientjs/bootstrap/button.js',
						'clientjs/bootstrap/carousel.js',
						'clientjs/bootstrap/collapse.js',
						'clientjs/bootstrap/dropdown.js',
						'clientjs/bootstrap/modal.js',
						'clientjs/bootstrap/tooltip.js',
						'clientjs/bootstrap/popover.js',
						'clientjs/bootstrap/scrollspy.js',
						'clientjs/bootstrap/tab.js',
						'clientjs/bootstrap/affix.js',
						'clientjs/main.js'
					]
				}
			}
		},

		eslint: {
			options: {},
			nodeFiles: {
				files: {
					src: ['routes/**/*.js', 'lib/**/*.js', 'apps/**/*.js']
				},
				options: {
					config: "config/eslint-node.json"
				}
			},
			browserFiles: {
				files: {
					src: ['clientjs/*.js'] // use ignores to skip bootstrap once grunt-eslint supports it
				},
				options: {
					config: "config/eslint-browser.json"
				}
			}
		},

		simplemocha: {
			all: { src: 'test/**/*-test.js' }
		},

		watch: {
			clientjs: {
				files: ['clientjs/*.js'],
				tasks: ['uglify'],
			},
			less: {
				files: 'less/**/*.less',
				tasks: ['less','cssmin'],
			}
		},

		supervisor: {
			sup: {
				script: "app/app.js",
				extensions: "js,html,json,ejs",
				debug: true
			}
		},

		open: {
			localServer: {
				path: 'http://localhost',
				app: 'Google Chrome'
			},
		},

		retire: {
			js: ['lib/**/*.js','app/**/*.js', 'routes/**/*.js'],
			node: ['node']
		}

	});


	grunt.registerTask( 'compileCss', ['less', 'cssmin']);
	grunt.registerTask( 'compileJs', ['uglify']);

	grunt.registerTask( 'lintCss', ['less', 'csslint']);
	grunt.registerTask( 'lintJs', ['eslint']);

	grunt.registerTask( 'default', ['lintJs', 'lintCss', 'compileJs', 'compileCss']);
	grunt.registerTask( 'test', ['simplemocha']);
	grunt.registerTask( 'start', ['compileCss', 'compileJs', 'supervisor', 'open']);

};