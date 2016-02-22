app.controller('sectionController', sectionController);
function sectionController($scope, $http, $rootScope) {
    $scope.TopMenuClass = 'menuOn';
    $scope.getComingSoon = function (com) {
        if (com === "1") {
            $scope.isCms="";
            return 'img/Coming-soon.png';
        }
        else{
            $scope.isCms="noCms";
        }
    };

    var req = $http.get("http://caserevision.co.uk/api/get-sections?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key);
    req.success(function (data, status, headers, config) {
        $scope.sections = data.sections;
        $rootScope.sections = $scope.sections;
    });

    req.error(function (data, status, headers, config) {

    });
}