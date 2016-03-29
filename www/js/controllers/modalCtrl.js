app.controller('modalCtrl', function ($scope, $rootScope, $http, $mdDialog) {
    $scope.email = $rootScope.email;
    $scope.close = function () {
        $mdDialog.hide();

        //$scope.url = 'http://www.caserevision.co.uk/paymentredirect?user_id='+$rootScope.responce.data.user_id+'&payment=1&section_id='+$rootScope.section.id;
        //window.open($scope.url, '_system', 'location=yes');
    };
});
