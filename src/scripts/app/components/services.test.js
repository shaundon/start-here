'use strict';

describe('startHere.services module', function() {

    beforeEach(module('startHere.services'));

    describe('Utilities service', function() {

        var Utilities;

        it('should verify an object is empty', inject(function(Utilities) {
            expect(Utilities.objectIsEmpty({})).toBeTruthy();
        }));

        it('should verify an object is not empty', inject(function(Utilities) {
            expect(Utilities.objectIsEmpty({'a': 'b'})).toBeFalsy();
        }));
    });
});