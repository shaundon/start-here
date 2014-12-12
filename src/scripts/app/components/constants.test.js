'use strict';

describe('startHere.constants module', function() {

    beforeEach(module('startHere.constants'));

    describe('API_LOCATION', function() {
        it('Should check it exists', inject(function(API_LOCATION) {
            expect(API_LOCATION).toBeDefined();
            expect(API_LOCATION).not.toBeNull();
            expect(API_LOCATION).not.toBe('ATTRIBUTION_API_LOCATION_INSERTED_IN_BUILD_PROCESS');
        }));
    });
});