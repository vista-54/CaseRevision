'use strict';

app.controller('signUpCtrl', function ($scope, $http, $rootScope, url) {
    window.scroll(0, 0);
    window.addEventListener('native.keyboardhide', $rootScope.keyboardHideHandlerSign);
    window.addEventListener('native.keyboardshow', $rootScope.keyboardShowHandlerSign);
    $scope.newUser = {};
    $scope.message = '';
    $rootScope.responce = {
        'data': {}
    };
    var storage = window.localStorage;

    $scope.signUp = function (newUser) {
        if (newUser.check) {
            if ($scope.signUpForm.$error.required) {
                $scope.message = "Required fields are not filled";
                return false;
            }
            if ($scope.signUpForm.$error.minlength) {
                $scope.message = "The password should be at least 6 characters";
                return false;
            }
            if ($scope.signUpForm.$error.pattern) {
                $scope.message = "E-mail is not valid";
                return false;
            }
            if (newUser.password != newUser.confirm_password) {
                $scope.message = "Passwords do not match";
                return false;
            } else {
                for (var i in newUser) {
                    if (newUser[i] == undefined) {
                        newUser[i] = '';
                    }
                }
                $scope.message = '';
                $rootScope.email = newUser.email;
                $http.get(url(newUser))
                    .then(function (response) {

                        $rootScope.responce.data.user_id = response.data.user_id;
                        console.info(response.data);
                        if (!response.data.success) {
                            $scope.message = response.data.errors;
                        } else if (response.data.success) {

                            storage['login'] = newUser.user_name;
                            storage['password'] = newUser.password;
                            storage['rememb'] = true;

                            var req = $http.get("http://www.caserevision.co.uk/api/login?login=" + newUser.user_name + "&password=" + newUser.password);
                            req.success(function (data, status, headers, config) {
                                if (data.success) {
                                    //console.info(data);
                                    $rootScope.email = data.email;
                                    $rootScope.isLogged = true;
                                    $scope.loginSuccess = false;
                                    $rootScope.auth_key = data.auth_key;
                                    $rootScope.username = data.username;
                                    $rootScope.user_id = data.id;
                                    $rootScope.verify = data.verify;
                                    window.location = "#/sections";
                                } else {
                                    $scope.loginSuccess = true;
                                    $scope.textError = 'Invalid login or password';
                                    window.location = "#/login";
                                }
                            });
                            req.error(function (data, status, headers, config) {
                            });
                        }
                    }, function (error) {
                        console.info(error);
                    });
            }
        } else {
            $scope.message = 'You do not accept the license agreement';
            return false;
        }
    }
});