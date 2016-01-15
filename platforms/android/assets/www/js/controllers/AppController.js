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
    StatusBar.overlaysWebView(false);
}, false);
app.config(['$routeProvider', function ($routeProvide) {

        $routeProvide
                .when('/', {
                    templateUrl: 'pages/homepage.html',
                    controller: 'AppController'
                })
                .when('/about_us', {
                    templateUrl: 'pages/aboutus.html',
                    controller: 'aboutUsController'
                })
                .when('/contact', {
                    templateUrl: 'pages/contact.html',
                    controller: 'contactController'
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
app.controller('aboutUsController', aboutUsController);
app.controller('menuController', menuController);
app.controller('contactController', contactController);


function AppController($scope, $location) {
     $scope.getUser=function(){
        return 'Login';
    };
    window.location = "#/login";
    $scope.message = "HomeController";
    console.log($scope.message);

}

function loginController($scope, $http, $rootScope) {
   $rootScope.isLogged=false;
    $scope.TopMenuClass = 'menuOff';
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
                $rootScope.isLogged=true;
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
function sectionController($scope, $http, $rootScope, $location) {
   
    $scope.linkTree = $location.url();
    $scope.TopMenuClass = 'menuOn';
    console.log("sectionController");
    $scope.getComingSoon = function (com) {
        if (com === "1") {
            return "(coming soon)";
        }
    };
    var req = $http.get("http://caserevision.apes-at-work.com/api/get-sections?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key);
    req.success(function (data, status, headers, config) {
        console.log(data);
        $scope.sections = data.sections;
        $rootScope.sections = $scope.sections;
    });

    req.error(function (data, status, headers, config) {
        console.log(data);
    });
}
function sectionDetailController($scope, $routeParams, $http, $rootScope, $location) {
    console.log("sectionDetailController");
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

    var req = $http.get("http://caserevision.apes-at-work.com/api/get-topics?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&section_id=" + $scope.sectionId);
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
function topicDetailController($scope, $routeParams, $http, $location, $rootScope, $location) {
    console.log("topicDetailController");
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
function videoDetailController($location, $scope, $sce, $routeParams, $http, $rootScope) {

    var videoBlock = document.getElementById("video");
    var audio=document.getElementsByTagName('audio')[0];
//    var vBlockCode=" <video  width='100%' id='video'  data-number-video=\"{{numberVideo}}\"  autoplay src=\"{{getUrlVideo(CurrentVideoLink)}}\" controls></video>";

//    console.log($location.url());
//    console.log($location.path());
//    console.log($location.search());
    $scope.sectionName = $rootScope.sectionName;
    $scope.sectionLink = $rootScope.sectionLink;
    $scope.topicName = $rootScope.topicName;
    $scope.topicLink = $rootScope.topicLink;
    $scope.getVideoName = function () {
//          $scope.getSectionById();
//        
        return $scope.video.name;
    };
    console.log($location);
    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
        console.log(event);
        console.log(current);
        console.log(previous);
        $scope.backPage = previous.scope.page;
        if (!$scope.backPage) {
            $scope.backPage = previous.scope.backPage;
        }
//        console.log(oldUrl);
    });
    console.log(window.location)

    videoBlock.onended = function () {
        console.log("Video END");
        $scope.result = "";
        if (videoBlock.getAttribute("data-number-video") === "1") {
//            videoBlock.webkitRequestFullscreen();
            $scope.getAnswers();

        } else {
            videoBlock.webkitExitFullScreen();
        }
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
    $scope.CurrentVideoLink = $scope.video.video1_part;
    $scope.CurrentVideoName = $scope.video.video1_name;
    $scope.numberVideo = 1;
    $scope.width = $(window).width();
    $scope.height = $(window).height();
    $scope.isAnswerResult = false;
    $scope.videoPart1 = true;
    $scope.getAnswers = function () {
        var req = $http.get("http://caserevision.apes-at-work.com/api/get-answers?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&video_id=" + $scope.videoId);
        req.success(function (data, status, headers, config) {
            console.log(data);
            $scope.answers = data.videos;
            $scope.videoPart1 = false;
            videoBlock.webkitExitFullScreen();
            audio.play();
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    $scope.isCorrectAnswer = function (ob) {
        if (parseInt(ob.answer.status) === 1) {
            console.log("Answer is correct");
            $scope.isCorrect = 'green';
            $scope.result = "You are correct";
//            $scope.videoPart1 = true;
            $scope.CurrentVideoLink = $scope.video.video2_part;
            $scope.CurrentVideoName = $scope.video.video2_name;
            $scope.numberVideo = 2;

            setTimeout(function () {
//                if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
                $scope.videoPart1 = true;
                $scope.isAnswerResult = true;
                if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
                    $scope.$apply();
                }

            }, 1500);



//            $scope.videoStart();
        }
        else {
            console.log("Answer is INcorrect");
            $scope.isCorrect = 'red';
            $scope.result = "You are incorrect";
            $scope.CurrentVideoLink = $scope.video.video1_part;
            $scope.numberVideo = 1;
            setTimeout(function () {
//                
                $scope.videoPart1 = true;
                $scope.isAnswerResult = false;
                if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
                    $scope.$apply();
                }
            }, 1500);

//         
//            return ;



//            $scope.videoStart();
        }
    };
    $scope.getUrlVideo = function (name) {

        return $sce.trustAsResourceUrl(name);

    };
//    $scope.getResult = function () {
//        var res = $scope.result === 1 ? resultIsCorrect() : resultIsInCorrect();
//        function resultIsCorrect() {
//            
//                
//           
//            return 
//        }
//        function resultIsInCorrect() {
//            
//                
//        }
//    };
    $scope.backBtn = function () {
        window.location = '#' + $scope.backPage;
    };
    $scope.continueBtn = function () {
        var Id = parseInt($scope.getVideoById($scope.video.id)) + 1;
        return window.location = '#' + $scope.backPage + "/" + $rootScope.videos[Id].id;

    };
    $scope.IsNextContinue = function (id) {
        var nextId = parseInt($scope.getVideoById(id)) + 1;
        if ($rootScope.videos[nextId]) {
            return true;
        }
        else {
            return false;
        }

    };
}
function aboutUsController() {
    console.log("aboutUsController");
}
function menuController($scope,$rootScope){
    console.log("$rootScope");
    $scope.getlogin=function(){
        if($rootScope.isLogged){
            return 'Logout';
        }
        else{
            return 'Login';
        }
    };
    $scope.getItemsSection=function(){
          if($rootScope.isLogged){
            return 'Sections';
        }
     
    };
}
function contactController(){
    console.log("contact page");
}