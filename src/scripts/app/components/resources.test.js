'use strict';

describe('startHere.resources module', function() {

    beforeEach(module('startHere.resources'));

    describe('SomeResource factory', function() {

        it('should get all of some resource', inject(function($httpBackend, SomeResource, API_LOCATION) {

            var apiResponse = [{id: 1},{id: 2},{id: 3}];

            $httpBackend.whenGET(API_LOCATION + '/some-resource').respond(apiResponse);

            var actualResponse = {};
            SomeResource.query(function(data) {
                actualResponse = data;
            });
            $httpBackend.flush();

            // Convert to JSON to strip out the properties Angular adds.
            expect(angular.toJson(actualResponse)).toEqual(angular.toJson(apiResponse));

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
        }));
    });
});