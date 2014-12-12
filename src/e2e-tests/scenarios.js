'use strict';

beforeEach(function () {
    browser.ignoreSynchronization = true;
});

describe('Start Here app', function() {

    it('should get the title', function() {
        browser.get('index.html');

        expect(browser.getTitle()).toEqual('Start Here');
    });
});