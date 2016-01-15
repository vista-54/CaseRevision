/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//var sectionModule = angular.module('SectionModule', []);

app.controller('sectionController', sectionController);
function sectionController($scope, $http, $rootScope, $location) {

    $scope.linkTree = $location.url();
    $scope.TopMenuClass = 'menuOn';
    console.log("sectionController");
    $scope.getComingSoon = function (com) {
        if (com === "1") {
            return "(coming soon)";
        }
    };
    var req = $http.get("http://caserevision.com/api/get-sections?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key);
    req.success(function (data, status, headers, config) {
        console.log(data);
        $scope.sections = data.sections;
        $rootScope.sections = $scope.sections;
    });

    req.error(function (data, status, headers, config) {
        console.log(data);
    });
}