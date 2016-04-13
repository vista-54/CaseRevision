app.controller('searchController', searchController);
function searchController($scope, $rootScope) {
    window.scroll(0, 0);
    $scope.search = function () {
        $rootScope.isSearch = true;
        $rootScope.search($scope.term);
    };
}