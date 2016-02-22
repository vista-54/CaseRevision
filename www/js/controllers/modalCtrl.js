app.controller('modalCtrl', function ($scope, $rootScope, $http, $mdDialog) {
    $scope.email = $rootScope.email;
    $scope.close = function () {
        $mdDialog.hide();
    };
    $scope.Pay = function (paySystem) {
        $rootScope.paySystem = paySystem;
        $mdDialog.hide();
    };

});
