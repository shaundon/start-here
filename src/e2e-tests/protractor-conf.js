exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        '*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://0.0.0.0:6288',

    framework: 'jasmine',

    rootElement: 'body',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};