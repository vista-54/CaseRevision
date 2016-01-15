/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('videoDetailController', videoDetailController);
function videoDetailController($location, $scope, $sce, $routeParams, $http, $rootScope) {

    var videoBlock = document.getElementById("video");
    var audio = document.getElementsByTagName('audio')[0];
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
        var req = $http.get("http://caserevision.com/api/get-answers?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&video_id=" + $scope.videoId);
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