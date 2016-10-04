angular.module('CaseRevisionApp')
    .directive('crHeader', function () {
        return {
            restrict: "E",
            templateUrl: "pages/header.html",
            replace: true
        }
    });