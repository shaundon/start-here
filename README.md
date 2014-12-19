## Start Here

This is an AngularJS based front end application, with a pre-configured build process that does the following things:

* Cleans the `dist` directory, if it exists.
* Makes the `dist` directory, if it doesn't exist.
* Runs Uglify to concatenate all the library and app JS files into one superfile, called `main.min.js`. If running under `dev`, a source map is also created, and the file is not minified. Under `stage` and `prod`, there is no source map and the file is minified.
* Copies images, precompiled stylesheets, fonts, HTML templates and scripts into `dist`.
* Replaces placeholder strings in the JS.
* Compiles all the LESS files into `main.css`, with a source map in `dev`, otherwise no source map and compressed.
* Runs unit tests against the newly created `main.min.js`.
* Runs e2e tests with Protractor.

### How to run

First, ensure you have a `config.json` file. You can copy `config.example.json` to get started.

#### Dev (non minified, with source maps).

    grunt --target=dev
    
or just use `grunt`, and it will default to this.
    
#### Stage (non minified, with source maps).

    grunt --target=stage

#### Prod (minified, no source maps).

    grunt --target=prod
    
### String Replacements

Look in `config.example.json`. It contains three example API locations:

    {
        "stringReplacements": {
            "externalApiLocation": {
                "dev": "http://localhost:5555/app",
                "stage": "https://some-staging-url.com/app",
                "prod": "https://some-prod-url.com/app"
            }
        }
    }
    
During the build process, one of these strings is selected, and then placed into the compiled JS in the appropriate location.
This is determined by a command line flag passed to grunt, `--string-replacement-target=<target>`, for example
`--string-replacement-target=dev` to use `https://some-staging-url.com/app`. If this flag is omitted,
the `--target` flag will be used to determine this instead.

This allows you to do fun things like build for `prod`, while inserting the `stage` API location.
    
In `Gruntfile.js`, you'll find a variable named `API_LOCATIONS`. During the build process, a constant inside `/scripts/app/components/constants.js` is replaced with this, dependent on whether you're building for dev, stage or prod.

### I've built it, what now?

All the compiled stuff is in `dist`.