/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('searchController', searchController);
function searchController($scope, $rootScope) {
    window.scroll(0, 0);
    $scope.search = function () {
        $rootScope.isSearch = true;
        $rootScope.search($scope.term);
    };
}