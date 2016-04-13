/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module('CaseRevisionApp', ['ngCookies', 'ngRoute', 'ngCordova', 'ngMaterial', 'purchase']);
var username = '';
var auth_key = '';


document.addEventListener("deviceready", function () {
    StatusBar.overlaysWebView(false);
    screen.lockOrientation('portrait');
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
            templateUrl: 'pages/topic.html',
            controller: 'topicController'
        })
        .when('/section/:sectionId/:topicId', {
            templateUrl: 'pages/videoList.html',
            controller: 'videoController'
        })
        .when('/section/:sectionId/:topicId/:videoId', {
            templateUrl: 'pages/video-detail.html',
            controller: 'videoDetailController'
        })
        .when('/noaccess', {
            templateUrl: 'pages/not_access.html',
            controller: 'accessController'
        })
        .when('/search', {
            templateUrl: 'pages/search.html',
            controller: 'searchController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('AppController', AppController);
app.directive("topMenu", topMenu);
app.directive("breadcrumbs", breadcrumbs);

function AppController($scope, $rootScope) {
    $scope.isLogged = $rootScope.isLogged;
    window.scroll(0, 0);
    $rootScope.isOpenMenu = false;
    $('.invisibleBlock').hide();
    $('.mobile-menu').slideUp();
    $rootScope.verif = false;
    console.info($rootScope.isOpenMenu);

    $rootScope.keyboardShowHandlerSign = function (e) {
        if (device.platform.indexOf("iOS") !== -1) {
            setTimeout(function () {
                $('header').css({'position': 'static'});
                $('footer').css({'position': 'static'});
            }, 100);
        }
    };
    $rootScope.keyboardHideHandlerSign = function (e) {
        if (device.platform.indexOf("iOS") !== -1) {
            $('footer').css({'position': 'fixed'});
            $('header').css({'position': 'fixed'});
            $('.topicContent').css({'padding-bottom': '70px'});
            $('.logotype').css({'margin-top': '44px'});
        }
    };

    $rootScope.keyboardShowHandler = function (e) {
        if (device.platform.indexOf("iOS") !== -1) {
            setTimeout(function () {
                $('header').css({'position': 'static'});
                $('footer').css({'position': 'static'});
                window.scroll(0, $('.view').height());
            }, 100);
        }
    };
    $rootScope.keyboardHideHandler = function (e) {
        if (device.platform.indexOf("iOS") !== -1) {
            $('footer').css({'position': 'fixed'});
            $('header').css({'position': 'fixed'});
            $('.topicContent').css({'padding-bottom': '70px'});
            $('.logotype').css({'margin-top': '44px'});
        }
    };

    window.location = "#/";
    $scope.message = "HomeController";
}

function topMenu($rootScope) {
    return {
        link: function ($scope, element, attrs) {
            $scope.menuOpen = function () {
                console.info($rootScope.isOpenMenu);
                $('.mobile-menu').slideToggle('.mobile-menu');

                if (!$rootScope.isOpenMenu) {
                    $rootScope.isOpenMenu = true;
                    $('.invisibleBlock').show();
                } else if ($rootScope.isOpenMenu) {
                    $rootScope.isOpenMenu = false;
                    $('.invisibleBlock').hide();
                }
                console.info($rootScope.isOpenMenu);
            };
            $scope.menuLinkClick = function () {
                $scope.menuOpen();
            };

            $scope.invisiBlockStatus = function () {
                $('.invisibleBlock').hide();
                $scope.menuOpen();
            };
        },
        templateUrl: 'templates/topMenu.html'
    };
}
function breadcrumbs() {
    return {
        link: function ($scope, element, attrs) {
            $scope.$watch('$location', function () {
            });
        },
        templateUrl: 'templates/breadcrumbs.html'
    };
}
