module.exports = function(config) {
    config.set({
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
    });
};