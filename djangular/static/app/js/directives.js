'use strict';


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }])
   .directive('focusOn', function() {
        return function(scope, elem, attr) {
            scope.$on(attr.focusOn, function(e) {
                setTimeout(function() {
                    elem[0].focus();
                }, 1);
            });
        };
   });

