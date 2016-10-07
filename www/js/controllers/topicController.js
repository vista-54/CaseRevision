app.controller('topicController', topicController);
function topicController($scope, $routeParams, urls, $http, $rootScope, $location) {
    window.scroll(0, 0);
    window.addEventListener('native.keyboardhide', $rootScope.keyboardHideHandler);
    window.addEventListener('native.keyboardshow', $rootScope.keyboardShowHandler);
    $rootScope.pages = {
        isSectionPage: true,
        isTopicPage: false,
        isVideoPage: false
    };
    $rootScope.circular = 'indeterminate';


    $scope.isSectionPage = $rootScope.pages.isSectionPage;
    $scope.isTopicPage = $rootScope.pages.isTopicPage;
    $scope.isVideoPage = $rootScope.pages.isVideoPage;
    $scope.sectionId = $routeParams.sectionId;
    $scope.page = $location.url();

    $scope.getSectionById = function (id) {
        return $rootScope.sections.filter(function (item) {
            return item.id == id;
        });
    };
    $rootScope.search = function (term) {
        $rootScope.circular = 'indeterminate';
        $http({
            method: 'GET',
            url: urls.search,
            params: {
                "username": $rootScope.username,
                "auth_key": $rootScope.auth_key,
                "section_id": $scope.sectionId,
                "query": term
            }
        }).success(function (data, status, headers, config) {
            $rootScope.circular = 0;
            $rootScope.videos = data.videos;
            $rootScope.searchResult = ($rootScope.videos.length);
            if ($rootScope.isSearch) {
                $rootScope.isSearch = false;
                $scope.$apply();
            } else {
                window.location = "#/search";
            }
        }).error(function () {
            $rootScope.circular = 0;
        });
    };
    $scope.search = function () {
        $rootScope.search($scope.term);
    };
    $rootScope.sectionName = $scope.getSectionById($scope.sectionId)[0].name;
    $rootScope.sectionLink = '#' + $scope.page;
    $scope.sectionLink = $rootScope.sectionLink;
    $scope.sectionName = $rootScope.sectionName;
    $http({
        method: 'GET',
        url: urls.getTopics,
        params: {"username": $rootScope.username, "auth_key": $rootScope.auth_key, "section_id": $scope.sectionId}
    }).success(function (data, status, headers, config) {
        $rootScope.circular = 0;
        $scope.access = data.access;
        $scope.topics = data.topics;
        $rootScope.topics = $scope.topics;
    }).error(function () {
        $rootScope.circular = 0;
    });

    $rootScope.goToSection = function () {
        location.href = $scope.sectionLink;
    };

    $scope.goToPage = function (page, id) {
        location.href = '#' + page + '/' + id;
    }
}