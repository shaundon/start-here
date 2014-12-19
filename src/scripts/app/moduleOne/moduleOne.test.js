'use strict';

describe('startHere.moduleOne module', function() {

    var scope;
    var controller;

    var mockLocationService = {
        url: jasmine.createSpy()
    };

    beforeEach(module('startHere.moduleOne'));

    beforeEach(inject(function($rootScope, $controller, $q) {

        scope = $rootScope.$new();
        controller = $controller('ModuleOneController as controller', {
            $scope: scope
        });
    }));

    describe('ModuleOneController', function() {

        it('should exist', function() {
            expect(controller).toBeDefined();
        });

        it('should check variables are set', function() {
            expect(controller.foo).toBeDefined();
        });
    });
});