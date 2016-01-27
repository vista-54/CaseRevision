/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var topicModule = angular.module('topicModule', []);
app.controller('topicController', topicController);

function topicController($scope, $routeParams, $http, $rootScope, $location) {
//    $rootScope.Search.isSearch=true;
    window.scroll(0, 0);
    $rootScope.pages = {
        isSectionPage: true,
        isTopicPage: false,
        isVideoPage: false
    };
    $scope.isSectionPage = $rootScope.pages.isSectionPage;
    $scope.isTopicPage = $rootScope.pages.isTopicPage;
    $scope.isVideoPage = $rootScope.pages.isVideoPage;
    console.log("topicController");
    $scope.sectionId = $routeParams.sectionId;
    $scope.page = $location.url();

    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
        console.log(event);
        console.log(current);
        console.log(previous);

//        console.log(oldUrl);
    });
//    $scope.getSectionName = function () {
////          $scope.getSectionById();
//        
//        return $rootScope.sectionName;
//    };
    $scope.getSectionById = function (id) {
        for (var i in  $rootScope.sections) {
            var obj = $rootScope.sections[i];
            if (obj.id === id) {
                return i;
            }
        }
    };
    $scope.search = function () {
        
        var req = $http.get("http://caserevision.com/api/find?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&section_id=" + $scope.sectionId + "&query=" + $scope.term);
        req.success(function (data, status, headers, config) {
            for (var i in data.videos) {
                var obj = data.videos[i];
                console.log(obj.topic_id);
                console.log(obj.id);
                $rootScope.Search = {
                    sectionId: $scope.sectionId,
                    topic_id: obj.topic_id,
                    video_id: obj.id,
                    isSearch: true
                };

                window.location = "#/section/" + $rootScope.Search.sectionId + '/' + obj.topic_id;
                console.log("#/section/" + $scope.sectionId + '/' + obj.topic_id + '/' + obj.id);
            }


        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
        console.log($scope.term);

    };
    $rootScope.sectionName = $rootScope.sections[$scope.getSectionById($scope.sectionId)].name;
    $rootScope.sectionLink = '#' + $scope.page;
    $scope.sectionLink = $rootScope.sectionLink;
    $scope.sectionName = $rootScope.sectionName;
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