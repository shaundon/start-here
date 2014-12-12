'use strict';

angular.module('startHere.directives', [])

    // Adds an asterisk after an element, to show it's
    // mandatory.
    .directive('mandatoryField', function() {
        return {
            restrict: 'A',
            compile: function(element, attributes) {
                element[0].innerHTML += '*';
            }
        };
    })
;