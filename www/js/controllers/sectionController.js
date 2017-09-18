app.controller('sectionController', sectionController);
function sectionController($scope, $http, $rootScope, urls) {
    window.scroll(0, 0);
    $rootScope.circular = 'indeterminate';
    $scope.TopMenuClass = 'menuOn';
    $scope.getComingSoon = function (com) {
        if (com === "1") {
            $scope.isCms = "";
            return 'img/Coming-soon.png';
        }
        else {
            $scope.isCms = "noCms";
        }
    };

    $http({
        method: 'GET',
        url: urls.getSections,
        params: {
            "username": $rootScope.username,
            "auth_key": $rootScope.auth_key
        }
    }).success(function (data, status, headers, config) {
        $rootScope.circular = 0;
        $scope.sections = data.sections;
        console.info($scope.sections);
        $rootScope.sections = $scope.sections;
    }).error(function (data, status, headers, config) {
        $rootScope.circular = 0;
    });
}