module.exports = function(grunt) {

    // Locations of an external API.
    // Depending on the type of build created, one of these
    // will be inserted into the source code.
    var API_LOCATIONS = {
        DEV: 'http://localhost/',
        STAGE: 'http://some-stage-url.com',
        PROD: 'http://some.prod-url.com'
    };

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

        // Karma runner. Runs unit tests
        // for AngularJS based pages.
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        replace: {
            dev: {
                src: ['dist/scripts/main.min.js'],
                overwrite: true,
                replacements: [
                    {
                        from: 'API_LOCATION_INSERTED_IN_BUILD_PROCESS',
                        to: API_LOCATIONS.DEV
                    }
                ]
            },
            stage: {
                src: ['dist/scripts/main.min.js'],
                overwrite: true,
                replacements: [
                    {
                        from: 'API_LOCATION_INSERTED_IN_BUILD_PROCESS',
                        to: API_LOCATIONS.STAGE
                    }
                ]
            },
            prod: {
                src: ['dist/scripts/main.min.js'],
                overwrite: true,
                replacements: [
                    {
                        from: 'API_LOCATION_INSERTED_IN_BUILD_PROCESS',
                        to: API_LOCATIONS.PROD
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
            stage: {
                options: {
                    banner: "/*\nBuilt <%= grunt.template.today() %>.\nBuild version: STAGE.\n*/\n\n",
                    compress: true,
                    sourceMap: false,
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

    // Loading dependencies
    for (var key in grunt.file.readJSON('package.json').devDependencies) {
        if (key !== 'grunt' && key.indexOf('grunt') === 0) {
            grunt.loadNpmTasks(key);
        }
    }

    // Default task(s).
    grunt.registerTask('default', ['dev']);

    // Dev task includes source maps and code is not minified.
    grunt.registerTask('dev', ['build:dev', 'replace:dev', 'less:dev', 'test', 'e2e-tests']);

    // Stage task does not include source maps, and code is minified.
    grunt.registerTask('stage', ['build:stage', 'replace:stage', 'less:prod', 'test', 'e2e-tests']);

    // Same as 'stage' task, but API location replacement will change.
    grunt.registerTask('prod', ['build:prod', 'replace:prod', 'less:prod', 'test', 'e2e-tests']);

    // Run unit tests. Will not work without running build process first
    // as relies on the concatenated code.
    grunt.registerTask('test', ['karma']);

    // Run e2e tests. Will not work without running build process first
    // as relies on the concatenated code.
    grunt.registerTask('e2e-tests', ['connect:testing-server', 'protractor:run']);

    // Uglify in dev includes a source map and doesn't minify code.
    grunt.registerTask('build:dev', ['clean', 'mkdir', 'uglify:dev', 'copy']);

    // Uglify in stage doesn't include a source map and minifies code.
    grunt.registerTask('build:stage', ['clean', 'mkdir', 'uglify:stage', 'copy']);

    // Uglify in prod doesn't include a source map and minifies code.
    grunt.registerTask('build:prod', ['clean', 'mkdir', 'uglify:prod', 'copy']);
};
