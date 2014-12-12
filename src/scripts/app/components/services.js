angular.module('startHere.services', [])

    .service('Utilities', [function() {
        return {
            objectIsEmpty: function(obj) {
                return Object.keys(obj).length === 0;
            }
        };
    }])
;