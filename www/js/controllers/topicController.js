app.controller('topicController', topicController);
function topicController($scope, $routeParams, $window, $http, $rootScope, $location) {
    window.scroll(0, 0);
    window.addEventListener('native.keyboardhide', $rootScope.keyboardHideHandler);
    window.addEventListener('native.keyboardshow', $rootScope.keyboardShowHandler);
    $rootScope.pages = {
        isSectionPage: true,
        isTopicPage: false,
        isVideoPage: false
    };


    $scope.isSectionPage = $rootScope.pages.isSectionPage;
    $scope.isTopicPage = $rootScope.pages.isTopicPage;
    $scope.isVideoPage = $rootScope.pages.isVideoPage;
    $scope.sectionId = $routeParams.sectionId;
    $scope.page = $location.url();
    $scope.$on('$routeChangeSuccess', function (event, current, previous) {

    });

    $scope.getSectionById = function (id) {
        for (var i in  $rootScope.sections) {
            var obj = $rootScope.sections[i];
            if (obj.id === id) {
                return i;
            }
        }
    };
    $rootScope.search = function (term) {
        var req = $http.get("http://www.caserevision.co.uk/api/find?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&section_id=" + $scope.sectionId + "&query=" + term);
        req.success(function (data, status, headers, config) {
            $rootScope.videos = data.videos;
            $rootScope.searchResult = $rootScope.videos.length > 0 ? true : false;
            if ($rootScope.isSearch) {
                $rootScope.isSearch = false;
                $scope.$apply();
            }
            else {
                window.location = "#/search";
            }
        });
        req.error(function (data, status, headers, config) {
        });
    };
    $scope.search = function () {
        $rootScope.search($scope.term);
    };
    $rootScope.sectionName = $rootScope.sections[$scope.getSectionById($scope.sectionId)].name;
    $rootScope.sectionLink = '#' + $scope.page;
    $scope.sectionLink = $rootScope.sectionLink;
    $scope.sectionName = $rootScope.sectionName;
    var req = $http.get("http://www.caserevision.co.uk/api/get-topics?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&section_id=" + $scope.sectionId);
    req.success(function (data, status, headers, config) {

        $scope.access = data.access;
        $scope.topics = data.topics;
        $rootScope.topics = $scope.topics;
    });
    req.error(function (data, status, headers, config) {
    });
}