'use strict';

app.controller('signUpCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
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
                $scope.message = '';
                $rootScope.email = newUser.email;
                $http.get("http://www.caserevision.co.uk/api/signup?User[username]=" + newUser.user_name + "&User[email]=" + newUser.email + "&User[first_name]=" + newUser.first_name + "&User[lastname]=" + newUser.last_name + "&User[university]=" + newUser.university + "&User[address1]=" + newUser.address1 + "&User[address2]=" + newUser.address2 + "&User[address3]=" + newUser.address3 + "&User[zip]=" + newUser.zip + "&User[country]=" + newUser.country + "&User[password]=" + newUser.password + "&User[code]=" + newUser.discount_code + "&User[sales]=" + newUser.friend_email)
                    .then(function (response) {
                        console.info(response);

                        //$scope.obj = JSON.parse(response.data);

                        $rootScope.responce.data.user_id = response.data.user_id;
                        console.info(response.data);
                        if (!response.data.success) {
                            $scope.message = response.data.errors;
                        } else if(response.data.success){

                            storage['login'] = newUser.user_name;
                            storage['password'] = newUser.password;
                            storage['rememb'] = true;

                            $http.get("http://www.caserevision.co.uk/api/login?login=" + newUser.user_name + "&password=" + newUser.password)
                                .then(function (data, status, headers, config) {
                                    console.info(data);
                                    if (data.success) {

                                        $rootScope.email = data.email;
                                        $rootScope.isLogged = true;
                                        $rootScope.auth_key = data.auth_key;
                                        $rootScope.username = data.username;
                                        $rootScope.user_id = data.id;
                                        window.location = "#/sections";
                                        $scope.loginSuccess = false;

                                    } else {
                                        //window.location = "#/login";
                                        //$scope.loginSuccess = true;
                                        $scope.message = data.errors;
                                    }
                                }, function (error) {
                                    console.info(error);
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
}]);