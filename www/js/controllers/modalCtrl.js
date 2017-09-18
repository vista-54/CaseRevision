angular.module('CaseRevisionApp')
    .controller('modalCtrl', function ($scope, $rootScope, $http, $mdDialog) {
        $scope.email = $rootScope.email;
        $scope.close = function () {
            $mdDialog.hide();
        };
    })
    .controller('successCtrl', function ($scope, $mdDialog) {
        $scope.username = '';
        $scope.section = '';
        $scope.close = function () {
            $mdDialog.hide();
            window.location = "#/sections";
        };
    });
