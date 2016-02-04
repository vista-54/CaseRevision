/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('contactController', ['$scope', '$http', function ($scope, $http) {
    $("iframe").css({'display':'none'});
    $scope.contact = {};
    $scope.isError = false;
    $scope.errorMessage = '';
    $scope.sendContact = function (contact) {
        if ($scope.contactUs.$invalid) {
            if ($scope.contactUs.$error.required) {
                $scope.errorMessage = "All fields are required";
            } else {
                $scope.errorMessage = "The field 'email' must be email";
            }
            $scope.isError = true;
            return false;
        }
        $http.get("http://caserevision.com/api/academic?email=" + contact.email + "&first_name=" + contact.first_name + "&last_name=" + contact.last_name + "&message=" + contact.message)
            .success(function (data, status) {
                if (status == 200)
                    $scope.notError = true;
                else{
                    $scope.notError = false;
                    $scope.errorMessage = "Server is not available!";
                    $scope.isError = true;
                }

                $scope.contact = {};
                $scope.isError = true;
                $scope.errorMessage = data.status;
                console.info('status: ' + data, status);
            })
            .error(function () {
                $scope.notError = false;
                $scope.isError = true;
                $scope.errorMessage = "Error connection to the Internet";
            });
    };
}]);