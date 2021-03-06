/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('contactController', function ($scope, $http, $rootScope, urls) {
    window.scroll(0, 0);
    $scope.contact = {};
    $scope.isError = false;
    $scope.errorMessage = '';
    $scope.sendContact = function (contact) {
        $rootScope.circular = 'indeterminate';
        if ($scope.contactUs.$invalid) {
            if ($scope.contactUs.$error.required) {
                $scope.errorMessage = "All fields are required";
            } else {
                $scope.errorMessage = "Please enter a valid email address.";
            }
            $scope.isError = true;
            return false;
        }
        $http({
            method: 'GET',
            url: urls.contactUs,
            params: {
                "email": contact.email,
                "first_name": contact.first_name,
                "last_name": contact.last_name,
                "message": contact.message
            }
        }).success(function (data, status) {
            $rootScope.circular = 0;
            if (status == 200)
                $scope.notError = true;
            else { // выведет ошибку в случае 500 ответа от сервера
                $scope.notError = false;
                $scope.errorMessage = "Server is not available!";
                $scope.isError = true;
            }

            $scope.contact = {};
            $scope.isError = true;
            $scope.errorMessage = data.status;
        }).error(function () { // выведет ошибку интернет соединения
            $rootScope.circular = 0;
            $scope.notError = false;
            $scope.isError = true;
            $scope.errorMessage = "Error connection to the Internet";
        });
    };
});