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

#### Dev (non minified, with source maps).

    grunt dev
    
#### Stage (non minified, with source maps).

    grunt stage

#### Prod (minified, no source maps).

    grunt prod
    
In `Gruntfile.js`, you'll find a variable named `API_LOCATIONS`. During the build process, a constant inside `/scripts/app/components/constants.js` is replaced with this, dependent on whether you're building for dev, stage or prod.

### I've built it, what now?

All the compiled stuff is in `dist`.