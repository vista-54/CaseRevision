/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//var loginModule = angular.module('loginModule', []);

app.controller('loginController', loginController);
function loginController($scope, $http, $rootScope) {
    $rootScope.isLogged = false;
    $scope.isLogged = $rootScope.isLogged;
    $scope.loginSuccess = false;
//    $scope.TopMenuClass = 'menuOff';
    $scope.login = function () {
        if (!$scope.loginForm.$valid) {
            console.log("Form Invalid");
            return false;
        }
        console.log("Login button click");

        var params = {};
        params.login = $scope.user.username;
        params.password = $scope.user.password;
        var req = $http.get("http://caserevision.com/api/login?login=" + params.login + "&password=" + params.password);
        req.success(function (data, status, headers, config) {
            console.log(status, data);
            if (data.success) {
                $rootScope.isLogged = true;
//                $scope.loginSuccess=false;
                $rootScope.auth_key = data.auth_key;
                $rootScope.username = data.username;
                window.location = "#/sections";
            }
            else {
                $scope.loginSuccess = true;
                window.location = "#/login";
            }
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    console.log("loginController");
}