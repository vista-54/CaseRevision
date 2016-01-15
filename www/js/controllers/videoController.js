/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var videoModule = angular.module('videoModule', []);
app.controller('videoController', videoController);
function videoController($scope, $routeParams, $http, $location, $rootScope, $location) {
    console.log("videoController");
    $scope.topicId = $routeParams.topicId;
    $scope.page = $location.url();
    $scope.sectionName = $rootScope.sectionName;
    $scope.sectionLink = $rootScope.sectionLink;
    $scope.getTopicName = function () {
        $rootScope.topicName = $rootScope.topics[$scope.getTopicById($scope.topicId)].name;
        $rootScope.topicLink = '#' + $scope.page;
        return $rootScope.topicName;
    };
    $scope.getTopicById = function (id) {
        for (var i in  $rootScope.topics) {
            var obj = $rootScope.topics[i];
            if (obj.id === id) {
                return i;
            }
        }
    };
//    $rootScope.on('$locationChangeStart', function () {
//        console.log('$locationChangeStart');
//    })

    var req = $http.get("http://caserevision.com/api/get-videos?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&topic_id=" + $scope.topicId);

    req.success(function (data, status, headers, config) {
        console.log(data);
        $scope.videos = data.videos;
        $rootScope.videos = $scope.videos;
    });
    req.error(function (data, status, headers, config) {
        console.log(data);
    });
}