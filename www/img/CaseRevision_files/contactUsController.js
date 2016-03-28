/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('contactController', ['$scope', '$http','$rootScope', function ($scope, $http,$rootScope) {
    $scope.contact = {};
    $scope.isError = false;
    $scope.errorMessage = '';
    $scope.sendContact = function (contact) { //функция отправки данных контактной формы
        if ($scope.contactUs.$invalid) { // проверка на валидность полей
            if ($scope.contactUs.$error.required) {
                $scope.errorMessage = "All fields are required";
            } else {
                $scope.errorMessage = "The field 'email' must be email";
            }
            $scope.isError = true;
            return false;
        }
        $http.get("http://www.caserevision.co.uk/api/academic?email=" + contact.email + "&first_name=" + contact.first_name + "&last_name=" + contact.last_name + "&message=" + contact.message)
            .success(function (data, status) {
                if (status == 200)
                    $scope.notError = true;
                else{ // выведет ошибку в случае 500 ответа от сервера
                    $scope.notError = false;
                    $scope.errorMessage = "Server is not available!";
                    $scope.isError = true;
                }

                $scope.contact = {};
                $scope.isError = true;
                $scope.errorMessage = data.status;
            })
            .error(function () { // выведет ошибку интернет соединения
                $scope.notError = false;
                $scope.isError = true;
                $scope.errorMessage = "Error connection to the Internet";
            });
    };
}]);