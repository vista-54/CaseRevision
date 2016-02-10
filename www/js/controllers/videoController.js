/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var videoModule = angular.module('videoModule', []);
app.controller('videoController', videoController);
function videoController($scope, $routeParams, $http,$cookies, $location, $rootScope) {
    window.scroll(0, 0);
    $rootScope.pages.isTopicPage = true;
    $rootScope.pages.isVideoPage = false;
    $scope.isSectionPage = $rootScope.pages.isSectionPage;
    $scope.isTopicPage = $rootScope.pages.isTopicPage;
    $scope.isVideoPage = $rootScope.pages.isVideoPage;
    console.log("videoController");
    $scope.topicId = $routeParams.topicId;
    $scope.page = $location.url();
    $scope.sectionName = $rootScope.sectionName;
    $scope.sectionLink = $rootScope.sectionLink;
    $scope.getTopicName = function () {

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
    $rootScope.topicName = $rootScope.topics[$scope.getTopicById($scope.topicId)].name;
    $rootScope.topicLink = '#' + $scope.page;
    $scope.topicName = $rootScope.topicName;
    $scope.topicLink = $rootScope.topicLink;
    $cookies.put('username', $rootScope.username);
    $cookies.put('auth_key', $rootScope.auth_key);
//    $http.default.headers["RefererFullUrl"]="http://caserevision.com/topic/"+$scope.topicId;
    var req = $http.get("http://caserevision.com/api/get-videos?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&topic_id=" + $scope.topicId);
    req.success(function (data, status, headers, config) {
        console.log(data);
        $scope.videos = data.videos;
        $rootScope.videos = $scope.videos;
        if ($rootScope.Search.isSearch) {
            window.location = "#/section/" + $rootScope.Search.sectionId + '/' + $rootScope.Search.topic_id + '/' + $rootScope.Search.video_id;
        }
    });
    req.error(function (data, status, headers, config) {
        console.log(data);
    });

}