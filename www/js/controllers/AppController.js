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
                .otherwise({
                    redirectTo: '/'
                });
    }]);


app.controller('AppController', AppController);
app.directive("topMenu", topMenu);
app.directive("breadcrumbs", breadcrumbs);

function AppController($scope) {
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
