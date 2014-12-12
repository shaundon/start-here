angular.module('startHere.resources', ['ngResource', 'startHere.constants'])

    .factory('SomeResource', ['$resource', 'API_LOCATION', function($resource, API_LOCATION) {
        return $resource(API_LOCATION + '/some-resource');
    }])
;