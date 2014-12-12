'use strict';

angular.module('startHere', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'startHere.moduleOne',
    'startHere.resources',
    'startHere.constants',
    'startHere.services',
    'startHere.directives',
    'startHere.filters'
])

    // This limits Angular animations to elements that begin
    // with the classname 'ng-animate-'
    .config(['$animateProvider', function($animateProvider) {
        $animateProvider.classNameFilter(/ng-animate-/);
    }])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])

    .run([function() {
        // Whatever stuff you want to do when the app starts.
    }])
;