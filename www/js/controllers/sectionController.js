/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//var sectionModule = angular.module('SectionModule', []);

app.controller('sectionController', sectionController);
function sectionController($scope, $http, $rootScope, $location) {
    $("#iframe").remove();
//    $scope.linkTree = $location.url();
    $scope.TopMenuClass = 'menuOn';
    console.log("sectionController");
//    $scope.$watch('section.coming_soon',function(){
//        console.log($scope.section.coming_soon);
//    });
    $scope.getComingSoon = function (com) {
        if (com === "1") {
            $scope.isCms="";
            return 'img/Coming-soon.png';
        }
        else{
            $scope.isCms="noCms";
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