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
                .otherwise({
                    redirectTo: '/'
                });
    }]);


app.controller('AppController', AppController);
app.directive("topMenu", topMenu);

function AppController($scope, $location) {
    window.location = "#/login";
    $scope.message = "HomeController";
    console.log($scope.message);

}
function topMenu() {
    return{
        link: function ($scope, element, attrs) {
            $scope.$watch('isLogged', function () {
                $scope.isLogged = $scope.isLogged;
            });
        },
        templateUrl: 'templates/topMenu.html'
    };
}

