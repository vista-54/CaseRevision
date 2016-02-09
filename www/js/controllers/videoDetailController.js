/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('videoDetailController', videoDetailController);
function videoDetailController($location, $scope, $sce, $routeParams, $cookies, $http, $rootScope) {

    $scope.isAnswerGet = false;
    if (typeof ($rootScope.Search) !== 'undefined') {
        $rootScope.Search.isSearch = false;
    }
//    screen.unlockOrientation();
    $rootScope.pages.isVideoPage = true;
    $scope.isSectionPage = $rootScope.pages.isSectionPage;
    $scope.isTopicPage = $rootScope.pages.isTopicPage;
    $scope.isVideoPage = $rootScope.pages.isVideoPage;
    var videoBlock = document.getElementById("video");
    var audio = document.getElementsByTagName('audio')[0];
    $scope.sectionName = $rootScope.sectionName;
    $scope.sectionLink = $rootScope.sectionLink;
    $scope.topicName = $rootScope.topicName;
    $scope.topicLink = $rootScope.topicLink;
    $scope.getVideoName = function () {
        $rootScope.videoName = $scope.video.name;
        return $scope.video.name;
    };
    $scope.$on('$routeChangeSuccess', function (event, current, previous) {
        console.log(event);
        console.log(current);
        console.log(previous);
        $scope.backPage = previous.scope.page;
        if (!$scope.backPage) {
            $scope.backPage = previous.scope.backPage;
        }
    });
    console.log(window.location);

    videoBlock.onended = function () {
        console.log("Video END");
        screen.lockOrientation('portrait');
        $scope.result = "";
        if (videoBlock.getAttribute("data-number-video") === "1") {
            $scope.getAnswers();

        } else {
            videoBlock.webkitExitFullScreen();
        }
    };
    videoBlock.onplay = function () {
        screen.unlockOrientation();
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
    if ($scope.CurrentVideoLink === "") {

        window.location = "#/noaccess";
        return false;
    }
    $scope.CurrentVideoName = $scope.video.video1_name;
    $scope.numberVideo = 1;
    $scope.isAnswerResult = false;
    $scope.videoPart1 = true;
    $scope.getAnswers = function () {
        console.info($rootScope.username + " " + $rootScope.auth_key + " " + $scope.videoId);
        var req = $http.get("http://caserevision.com/api/get-answers?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&video_id=" + $scope.videoId);
        req.success(function (data, status, headers, config) {
            console.log(data);
            $scope.answers = data.videos;
            console.info("answers " + $scope.answers);
            $scope.videoPart1 = false;
            videoBlock.webkitExitFullScreen();
            audio.play();
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    $scope.isCorrectAnswer = function (answer) {
        $scope.isAnswerGet = true;
        window.scroll(0, 0);
        if (parseInt(answer.status) === 1) {
            console.log("Answer is correct");
            $scope.isCorrect = 'green';
            $scope.result = "You are correct";
            $scope.CurrentVideoLink = $scope.video.video2_part;
            $scope.CurrentVideoName = $scope.video.video2_name;
            $scope.numberVideo = 2;
            $scope.isAnswerResult = true;
            setTimeout(function () {
                $scope.videoPart1 = true;

                if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
                    $scope.$apply();
            }, 1500);
        }
        else {
            console.log("Answer is INcorrect");
            $scope.isCorrect = 'red';
            $scope.result = "You are incorrect";
            $scope.CurrentVideoLink = $scope.video.video1_part;
            $scope.numberVideo = 1;
            $scope.isAnswerResult = false;
            setTimeout(function () {
                $scope.videoPart1 = true;

                if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
                    $scope.$apply();
            }, 1500);


        }
    };
    $scope.getUrlVideo = function (name) {
//        return $sce.trustAsResourceUrl(name);
        $cookies.put('username', $rootScope.username);
        $cookies.put('auth_key', $rootScope.auth_key);
        if ($scope.isAnswerGet) { // Если ответ плоучен
            if ($scope.isAnswerResult) { // и он правильный откроется второе видео
                return $sce.trustAsResourceUrl("http://caserevision.com/video/secure-s-link/" + $scope.videoId);
            }
            else { // ответ неправильный - первое видео
                return $sce.trustAsResourceUrl("http://caserevision.com/video/secure-f-link/" + $scope.videoId);
            }
        } else { // ответ не получен - первое видео
            return $sce.trustAsResourceUrl("http://caserevision.com/video/secure-f-link/" + $scope.videoId);
        }

    };

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
