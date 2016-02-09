'use strict';

app.controller('signUpCtrl', ['$scope', '$http','$rootScope', function ($scope, $http,$rootScope) {
    console.info('signUpCtrl');
    $scope.newUser = {};

    $scope.signUp = function (newUser) {
        console.info(newUser);
        if (newUser.check) {
            if ($scope.signUpForm.$error.required) {
                $scope.message = "Fields are not filled";
                return false;
            }
            if($scope.signUpForm.$error.pattern){
                $scope.message = "E-mail is not valid!";
                return false;
            }
            if(newUser.password!=newUser.confirm_password){
                $scope.message = "Passwords do not match";
                return false;
            }
            else{
                $rootScope.email = newUser.email;
                $http.get("http://caserevision.com/api/signup?User[username]=" + newUser.user_name + "&User[email]=" + newUser.email + "&User[first_name]=" + newUser.first_name + "&User[lastname]=" + newUser.last_name + "&User[university]=" + newUser.university + "&User[address1]=" + newUser.address1 + "&User[address2]=" + newUser.address2 + "&User[address3]=" + newUser.address3 + "&User[zip]=" + newUser.zip + "&User[country]=" + newUser.country + "&User[password]=" + newUser.password + "&User[code]=" + newUser.discount_code + "&User[sales]=" + newUser.friend_email)
                    .then(function (response) {
                        $scope.message = response.data.message;
                        window.location = "#/noaccess";
                        $rootScope.verif = true;
                    }, function (response) {
                        //console.info(response.status);
                    });
            }
            //console.info("http://caserevision.com/api/signup?User[username]=" + newUser.user_name + "&User[email]=" + newUser.email + "&User[first_name]=" + newUser.first_name + "&User[lastname]=" + newUser.last_name + "&User[university]=" + newUser.university + "&User[address1]=" + newUser.address1 + "&User[address2]=" + newUser.address2 + "&User[address3]=" + newUser.address3 + "&User[zip]=" + newUser.zip + "&User[country]=" + newUser.country + "&User[password]=" + newUser.password + "&User[code]=" + newUser.discount_code + "&User[sales]=" + newUser.friend_email);
        } else {
            $scope.message = 'You do not accept the license agreement';
            return false;
        }
    }
}]);
