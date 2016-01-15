/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var topicModule = angular.module('topicModule', []);
app.controller('topicController', topicController);

function topicController($scope, $routeParams, $http, $rootScope, $location) {
    console.log("topicController");
    $scope.sectionId = $routeParams.sectionId;
    $scope.page = $location.url();

    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
        console.log(event);
        console.log(current);
        console.log(previous);

//        console.log(oldUrl);
    });
    $scope.getSectionName = function () {
//          $scope.getSectionById();
        $rootScope.sectionName = $rootScope.sections[$scope.getSectionById($scope.sectionId)].name;
        $rootScope.sectionLink = '#' + $scope.page;
        return $rootScope.sectionName;
    };
    $scope.getSectionById = function (id) {
        for (var i in  $rootScope.sections) {
            var obj = $rootScope.sections[i];
            if (obj.id === id) {
                return i;
            }
        }
    };

    var req = $http.get("http://caserevision.com/api/get-topics?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&section_id=" + $scope.sectionId);
    req.success(function (data, status, headers, config) {
        console.log(data);
        $scope.access = data.access;
        $scope.topics = data.topics;
        $rootScope.topics = $scope.topics;
    });
    req.error(function (data, status, headers, config) {
        console.log(data);
    });
}