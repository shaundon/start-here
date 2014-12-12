'use strict';

describe('startHere.directives module', function() {

    beforeEach(module('startHere.directives'));

    describe('mandatoryField directive', function() {

        it('should make a field mandatory', function() {
            inject(function($compile, $rootScope) {
                var element = $compile('<label mandatory-field>Ravenclaw</label>')($rootScope);
                expect(element.html()).toEqual('Ravenclaw*');
            });
        });
    });
});