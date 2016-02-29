'use strict';

app.controller('signUpCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    window.scroll(0, 0);
    window.addEventListener('native.keyboardhide', $rootScope.keyboardHideHandlerSign);
    window.addEventListener('native.keyboardshow', $rootScope.keyboardShowHandlerSign);
    $scope.newUser = {};
    $scope.message = '';
    $rootScope.responce = {
        'data':{}
    };

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
                $http.get("http://caserevision.co.uk/api/signup?User[username]=" + newUser.user_name + "&User[email]=" + newUser.email + "&User[first_name]=" + newUser.first_name + "&User[lastname]=" + newUser.last_name + "&User[university]=" + newUser.university + "&User[address1]=" + newUser.address1 + "&User[address2]=" + newUser.address2 + "&User[address3]=" + newUser.address3 + "&User[zip]=" + newUser.zip + "&User[country]=" + newUser.country + "&User[password]=" + newUser.password + "&User[code]=" + newUser.discount_code + "&User[sales]=" + newUser.friend_email)
                    .then(function (response) {
                        $rootScope.responce.data.user_id = response.data.user_id;
                        if (response.data['errors'] != undefined) {
                            if (response.data.errors.length == 1) {
                                $scope.message = response.data.errors[0];
                                return false;
                            } else {
                                for (var i in response.data.errors) {
                                    $scope.message += response.data.errors[i] + ' ';
                                }
                            }
                            return false;
                        }
                        $rootScope.verif = true;
                        window.location = "#/noaccess";

                    }, function (error) {
                    });
            }
        } else {
            $scope.message = 'You do not accept the license agreement';
            return false;
        }
    }
}]);
