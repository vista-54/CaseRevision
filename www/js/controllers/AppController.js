/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module('CaseRevisionApp', ['ngCookies', 'ngRoute', 'ngCordova', 'ngMaterial', 'purchase']);
var username = '';
var auth_key = '';

app.config(config);
app.controller('AppController', AppController);
app.directive("topMenu", topMenu);
app.directive("breadcrumbs", breadcrumbs);

function config($routeProvider, $mdThemingProvider, $mdIconProvider) {
    $mdIconProvider
        .icon('home', 'img/home.svg')
        .icon('search', 'img/search.svg')
        .icon('menu', 'img/menu.svg');

    $mdThemingProvider.definePalette(
        'myPalette',
        $mdThemingProvider.extendPalette('green', {
            500: '#dbe7ea',
            700: '#805CA5',
            900: '#70c17b',
            'contrastDefaultColor': 'light'
        })
    );
    $mdThemingProvider.theme('default')
        .warnPalette('myPalette', {
            'default': '500',
            'hue-1': '300',
            'hue-2': '800',
            'hue-3': 'A100'
        })
        .primaryPalette('myPalette', {
            'default': '700'
        })
        .accentPalette('myPalette', {
            'default': '900'
        });
    $routeProvider
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
}
function AppController($scope, $rootScope) {
    document.addEventListener("deviceready", function () {
        screen.lockOrientation('portrait');
        StatusBar.overlaysWebView(false);
    }, false);

    $rootScope.circular = 0;
    $scope.isLogged = $rootScope.isLogged;
    window.scroll(0, 0);
    if (!$rootScope.isOpenMenu) {
        $rootScope.isOpenMenu = false;
        $('.invisibleBlock').hide();
        $('.mobile-menu').slideUp();
    }

    $rootScope.verif = false;

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
                $('.mobile-menu').slideToggle('.mobile-menu');

                if (!$rootScope.isOpenMenu) {
                    $rootScope.isOpenMenu = true;
                    $('.invisibleBlock').show();
                } else if ($rootScope.isOpenMenu) {
                    $rootScope.isOpenMenu = false;
                    $('.invisibleBlock').hide();
                }
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