/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




var app = angular.module('CaseRevisionApp', ['ngCookies', 'ngRoute', 'ngCordova', 'ngMap']);
var username = '';
var auth_key = '';

document.addEventListener("deviceready", function () {
    console.log("Device Is ready!!!");
    payment.initialize();
    StatusBar.overlaysWebView(false);

}, false);



app.config(['$routeProvider', '$httpProvider', function ($routeProvide, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;
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
    $rootScope.keyboardShowHandler = function (e) {
//     setTimeout(function(){
//       $('header').hide(); 
//    },400);
        if (device.platform.indexOf("iOS") !== -1) {
            $('body').css({'overflow': 'hidden', 'height': $(window).height()});
            console.log("focused");
//            $('header').css({'position': 'static'});
//            $('footer').css({'position': 'static'});
//            $('.topicContent').css({'padding-bottom': 0});
//            $('.logotype').css({'margin-top': 0});
//    window.scroll(0, $(window).height());
        }
    };
    $rootScope.keyboardHideHandler = function (e) {
//    var header=angular.element(document.querySelector('header'));
//    setTimeout(function(){
//       $('header').show(); 
//    },400);
        if (device.platform.indexOf("iOS") !== -1) {
            $('body').css({'overflow': 'visible', 'height': '100%'});
            console.log("blur");
//            $('footer').css({'position': 'fixed'});
//            $('header').css({'position': 'fixed'});
//            $('.topicContent').css({'padding-bottom': '70px'});
//            $('.logotype').css({'margin-top': '44px'});
        }
    };

//    $scope.inputIsActive = false;
//    $scope.inputIsActive = true;
    window.location = "#/";
    $scope.message = "HomeController";
    console.log($scope.message);

}

function topMenu() {

    return{
        link: function ($scope, element, attrs) {
            var count = 0;
            $scope.menuOpen = function () {
                console.log("menuClicked");


                $('.mobile-menu').slideToggle('.mobile-menu');
                if (count === 0) {
                    $scope.isOpenMenu = true;
                    count++;
                    console.log("menu open");
                }
                else {
                    $scope.isOpenMenu = false;
                    count = 0;
                    console.log("menu clothed");
                }


            };
            $scope.menuLinkClick = function () {
                $scope.menuOpen();
            };
            $scope.invisiBlockStatus = function () {
                console.log("block clicked");
                $scope.isOpenMenu = false;
                $scope.menuOpen();
            };
        },
        templateUrl: 'templates/topMenu.html'
    };
}
function breadcrumbs() {
    return{
        link: function ($scope, element, attrs) {
            $scope.$watch('$location', function () {
//                $scope.isLogged = $scope.isLogged;
                console.log('location changed');
            });
        },
        templateUrl: 'templates/breadcrumbs.html'
    };
}
