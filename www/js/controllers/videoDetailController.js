app.controller('videoDetailController', videoDetailController);
function videoDetailController($scope, $sce, $routeParams, $cookies, $http, $rootScope, urls) {

    $scope.isAnswerGet = false;
    if (typeof ($rootScope.Search) !== 'undefined') {
        $rootScope.Search.isSearch = false;
    }
    screen.unlockOrientation();
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
        $scope.backPage = previous.scope.page;
        if (!$scope.backPage) {
            $scope.backPage = previous.scope.backPage;
        }
    });

    videoBlock.onended = function () {
        $scope.result = "";
        if (videoBlock.getAttribute("data-number-video") === "1") {
            $scope.getAnswers();

        } else {
            videoBlock.webkitExitFullScreen();
        }
    };
    videoBlock.onplay = function () {

    };
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
        $rootScope.circular = 'indeterminate';
        $http({
            method: 'GET',
            url: urls.getAnswers,
            params: {
                "username": $rootScope.username,
                "auth_key": $rootScope.auth_key,
                "video_id": $scope.videoId
            }
        }).success(function (data, status, headers, config) {
            $rootScope.circular = 0;
            $scope.answers = data.videos;
            $scope.videoPart1 = false;
            videoBlock.webkitExitFullScreen();
            audio.play();
        }).error(function () {
            $rootScope.circular = 'indeterminate';
        });
    };
    $scope.isCorrectAnswer = function (answer) {
        $scope.isAnswerGet = true;
        window.scroll(0, 0);
        if (parseInt(answer.status) === 1) {
            $scope.isCorrect = 'green';
            $scope.result = "You are correct";
            $scope.CurrentVideoLink = $scope.video.video2_part;
            $scope.CurrentVideoName = $scope.video.video2_name;
            $scope.numberVideo = 2;
            setTimeout(function () {
                $scope.isAnswerResult = true;
                $scope.videoPart1 = true;

                if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
                    $scope.$apply();
            }, 1500);
        } else {
            $scope.isCorrect = 'red';
            $scope.result = "You are incorrect";
            $scope.CurrentVideoLink = $scope.video.video1_part;
            $scope.numberVideo = 1;
            setTimeout(function () {
                $scope.isAnswerResult = false;
                $scope.videoPart1 = true;

                if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest')
                    $scope.$apply();
            }, 1500);
        }
    };
    $scope.getUrlVideo = function (name) {
        $cookies.put('username', $rootScope.username);
        $cookies.put('auth_key', $rootScope.auth_key);
        if ($scope.isAnswerGet) {
            if ($scope.isAnswerResult) {
                return $sce.trustAsResourceUrl(urls.getSecondLink + $scope.videoId + '?username=' + $rootScope.username + '&auth_key=' + $rootScope.auth_key);
            }
            else {
                return $sce.trustAsResourceUrl(urls.getFirstLink + $scope.videoId + '?username=' + $rootScope.username + '&auth_key=' + $rootScope.auth_key);
            }
        } else {
            return $sce.trustAsResourceUrl(urls.getFirstLink + $scope.videoId + '?username=' + $rootScope.username + '&auth_key=' + $rootScope.auth_key);
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
        return ($rootScope.videos[nextId]);
    };
    $scope.$on('$routeChangeStart', function (next, current) {
        screen.lockOrientation('portrait');
    });
}
