'use strict';

angular.module('startHere.moduleOne', [
    'ngRoute'
])

    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'scripts/app/moduleOne/module-one.html',
            controller: 'ModuleOneController'
        });
    }])

    .controller('ModuleOneController', ['$scope', function($scope) {
        $scope.foo = 'bar';
    }])
;