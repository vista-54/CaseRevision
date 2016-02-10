/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('searchController', searchController);
function searchController($scope, $rootScope, $window) {
    window.scroll(0, 0);
//    window.addEventListener('native.keyboardhide', $rootScope.keyboardHideHandler);
//    window.addEventListener('native.keyboardshow', $rootScope.keyboardShowHandler);
//    $window.onfocus = function () {
////        $scope.inputIsActive = false;
//        console.log("focused");
//    };
    $scope.search = function () {
        $rootScope.isSearch = true;
        $rootScope.search($scope.term);
//        $scope.searchResult = $rootScope.searchResult;
    };
//    var scope = $rootScope;
//    
//    scope.$watch('$rootScope.videos.length', function () {
//        $scope.videos = $rootScope.videos;
//        console.log($rootScope.videos.length);
//    });
//    scope.$digest();
//    if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
//        $scope.$apply();
//    $scope.videos = $rootScope.videos;
//    $scope.SearchResult = $rootScope.videos.length > 0 ? true : false;
    console.log("searchPage");
}