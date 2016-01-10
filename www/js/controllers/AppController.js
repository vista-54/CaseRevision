/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module('CaseRevisionApp', ['ngRoute', 'ngCordova']);
var username = '';
var auth_key = '';
document.addEventListener("deviceready", function () {
    console.log("Device Is ready!!!");
}, false);
app.config(['$routeProvider', function ($routeProvide) {

        $routeProvide
                .when('/', {
                    templateUrl: 'pages/homepage.html',
                    controller: 'AppController'
                })
                .when('/login', {
                    templateUrl: 'pages/login.html',
                    controller: 'loginController'
                })
                .when('/sections', {
                    templateUrl: 'pages/sections.html',
                    controller: 'sectionController'
                })
                .when('/section/:sectionId', {
                    templateUrl: 'pages/section-detail.html',
                    controller: 'sectionDetailController'
                })
                .when('/section/:sectionId/:topicId', {
                    templateUrl: 'pages/topic-detail.html',
                    controller: 'topicDetailController'
                })
                .when('/section/:sectionId/:topicId/:videoId', {
                    templateUrl: 'pages/video-detail.html',
                    controller: 'videoDetailController'
                })
                .otherwise({
                    redirectTo: '/'
                });
    }]);


app.controller('AppController', AppController);
app.controller('loginController', loginController);
app.controller('sectionController', sectionController);
app.controller('sectionDetailController', sectionDetailController);
app.controller('topicDetailController', topicDetailController);
app.controller('videoDetailController', videoDetailController);


function AppController($scope, $location) {

    window.location = "#/login";
    $scope.message = "HomeController";
    console.log($scope.message);

}

function loginController($scope, $http, $rootScope) {

    $scope.login = function () {
        if (!$scope.loginForm.$valid) {
            console.log("Form Invalid");
            return false;
        }
        console.log("Login button click");


        var params = {};
        params.login = $scope.user.username;
        params.password = $scope.user.password;
        var req = $http.get("http://caserevision.apes-at-work.com/api/login?login=" + params.login + "&password=" + params.password);
        req.success(function (data, status, headers, config) {
            console.log(status, data);
            if (data.success) {
                $rootScope.auth_key = data.auth_key;
                $rootScope.username = params.login;
                window.location = "#/sections";
            }
            else {
                window.location = "#/login";
            }
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    console.log("loginController");
}
function sectionController($scope, $http, $rootScope) {
    console.log("sectionController");
    var req = $http.get("http://caserevision.apes-at-work.com/api/get-sections?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key);
    req.success(function (data, status, headers, config) {
        console.log(data);
        $scope.sections = data.sections;
    });
    req.error(function (data, status, headers, config) {
        console.log(data);
    });
}
function sectionDetailController($scope, $routeParams, $http, $rootScope, $location) {
    console.log("sectionDetailController");
    $scope.sectionId = $routeParams.sectionId;
    $scope.page = $location.url();
    var req = $http.get("http://caserevision.apes-at-work.com/api/get-topics?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&section_id=" + $scope.sectionId);
    req.success(function (data, status, headers, config) {
        console.log(data);
        $scope.access = data.access;
        $scope.topics = data.topics;
    });
    req.error(function (data, status, headers, config) {
        console.log(data);
    });
}
function topicDetailController($scope, $routeParams, $http, $rootScope, $location) {
    console.log("topicDetailController");
    $scope.topicId = $routeParams.topicId;
    $scope.page = $location.url();


    var req = $http.get("http://caserevision.apes-at-work.com/api/get-videos?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&topic_id=" + $scope.topicId);

    req.success(function (data, status, headers, config) {
        console.log(data);
        $scope.videos = data.videos;
        $rootScope.videos = $scope.videos;
    });
    req.error(function (data, status, headers, config) {
        console.log(data);
    });
}
function videoDetailController($scope, $sce, $routeParams, $http, $rootScope) {
    var videoBlock = document.getElementById("video");
    videoBlock.onended = function () {
        console.log("Video END");
        $scope.getAnswers();
    };
    console.log("videoDetailController");
    $scope.videoId = $routeParams.videoId;
    $scope.getVideoById = function (id) {
        for (var i in  $scope.videos) {
            var obj = $scope.videos[i];
            if (obj.id === id) {
                return i;
            }
        }
    };
    $scope.video = $rootScope.videos[$scope.getVideoById($scope.videoId)];
    $scope.width = $(window).width();
    $scope.height = $(window).height();
    $scope.CurrentVideoLink = $scope.video.video1_part;
    $scope.getUrlVideo = function (name) {
        return $sce.trustAsResourceUrl(name);
    };
    $scope.videoPart1 = true;
    $scope.getAnswers = function () {
        var req = $http.get("http://caserevision.apes-at-work.com/api/get-answers?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&video_id=" + $scope.videoId);
        req.success(function (data, status, headers, config) {
            console.log(data);
            $scope.answers = data.videos;
            $scope.videoPart1 = false;
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    $scope.isCorrectAnswer = function (status) {
        if (parseInt(status) === 1) {
            console.log("Answer is correct");
            $scope.videoPart1 = true;
            $scope.CurrentVideoLink = $scope.video.video2_part;
        }
        else {
            console.log("Answer is INcorrect");
            $scope.videoPart1 = true;
            $scope.CurrentVideoLink = $scope.video.video1_part;
        }
    };
}