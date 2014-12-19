module.exports = function(grunt) {

    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

    var target = grunt.option('target') || 'dev';
    var stringReplacementTarget = grunt.option('string-replacement-target') || target;

    // Locations of an external API.
    var EXTERNAL_API_LOCATION = grunt.file.readJSON('./config.json').stringReplacements.externalApiLocation[stringReplacementTarget];

    var jsFiles = require('wiredep')({
        includeSelf: true,
        exclude: [/\.test\.js/]
    }).js;

    grunt.initConfig({

        clean: ['dist'],

        mkdir: {
            all: {
                options: {
                    create: ['dist']
                }
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/styles', src: ['libs/**/*.css'], dest: 'dist/styles', flatten: true},
                    {expand: true, cwd: 'src', src: ['images/**'], dest: 'dist/'},
                    {expand: true, cwd: 'src', src: ['fonts/**'], dest: 'dist/'},
                    {expand: true, cwd: 'src', src: ['index.html'], dest: 'dist/'},
                    {expand: true, cwd: 'src', src: ['scripts/**/*.html', '!scripts/**/*.test.js'], dest: 'dist/'}
                ]
            }
        },

        // Karma runner. Runs unit tests.
        karma: {
            unit: {
                options: {
                    basePath: './',
                    files: [
                        'dist/scripts/main.min.js',
                        'src/scripts/lib/angular-mocks/angular-mocks.js',
                        'src/scripts/app/**/*.test.js'
                    ],
                    autoWatch: true,
                    singleRun: true,
                    frameworks: ['jasmine'],
                    browsers: ['PhantomJS'],
                    plugins: [
                        'karma-chrome-launcher',
                        'karma-phantomjs-launcher',
                        'karma-jasmine'
                    ]
                }
            }
        },

        replace: {
            task: {
                src: ['dist/scripts/main.min.js'],
                overwrite: true,
                replacements: [
                    {
                        from: 'API_LOCATION_INSERTED_IN_BUILD_PROCESS',
                        to: EXTERNAL_API_LOCATION
                    }
                ]
            }
        },

        less: {
            dev: {
                files: {
                    "dist/styles/main.css": "src/styles/src/main.less"
                },
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'dist/styles/main.css.map',
                    sourceMapURL: 'main.css.map',
                    sourceMapBasePath: '/',
                    sourceMapRootPath: '/'
                }
            },
            prod: {
                files: {
                    "dist/styles/main.css": "src/styles/src/main.less"
                },
                options: {
                    compress: true
                }
            }
        },

        uglify: {
            dev: {
                options: {
                    banner: "/*\nBuilt <%= grunt.template.today() %>.\nBuild version: DEV.\n*/\n\n",
                    beautify: true,
                    compress: false,
                    sourceMap: true,
                    mangle: false //mangling breaks angular stuff
                },
                files: {
                    'dist/scripts/main.min.js': jsFiles
                }
            },
            prod: {
                options: {
                    banner: "/*\nBuilt <%= grunt.template.today() %>.\nBuild version: PROD.\n*/\n\n",
                    compress: true,
                    sourceMap: false,
                    mangle: false //mangling breaks angular stuff
                },
                files: {
                    'dist/scripts/main.min.js': jsFiles
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 6288,
                    base: 'dist',
                    keepalive: true,
                    open: true,
                    onCreateServer: function() {
                        // Stuff to do once the server starts.
                    }
                }
            },

            // Used for protractor tests.
            'testing-server': {
                options: {
                    port: 6288,
                    base: 'dist',
                    onCreateServer: function() {
                        // Stuff to do once the server starts.
                    }
                }
            }
        },

        protractor: {
            options: {
                configFile: 'src/e2e-tests/protractor-conf.js',
                keepAlive: true
            },
            run: {}
        }

    });

    grunt.registerTask('default', ['build:' + target, 'replace', 'less:' + target, 'test', 'e2e-tests']);

    // Run unit tests. Will not work without running build process first
    // as relies on the concatenated code.
    grunt.registerTask('test', ['karma']);

    // Run e2e tests. Will not work without running build process first
    // as relies on the concatenated code.
    grunt.registerTask('e2e-tests', ['connect:testing-server', 'protractor:run']);

    // Uglify in dev includes a source map and doesn't minify code.
    grunt.registerTask('build:dev', ['clean', 'mkdir', 'uglify:dev', 'copy']);

    // Uglify in prod doesn't include a source map and minifies code.
    grunt.registerTask('build:prod', ['clean', 'mkdir', 'uglify:prod', 'copy']);
};
