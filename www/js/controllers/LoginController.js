app.controller('loginController', loginController);
function loginController($scope, $http, $rootScope) {
    window.scroll(0, 0);
    $rootScope.username = false;
    $scope.user = {};
    var storage = window.localStorage;
    $scope.user.username = storage['login'];
    $scope.user.password = storage['password'];
    $scope.user.rememb = storage['rememb'];
    if (storage['rememb']) {
        $scope.user.remember = true;
    }
    $rootScope.isLogged = false;
    $scope.loginSuccess = false;
    $scope.login = function () {
        if (!$scope.loginForm.$valid) {
            $scope.loginSuccess = true;
            $scope.textError = 'Fields are not filled'; // Ошибка пустых полей
            return false;
        }
        if ($scope.user.remember) {
            storage['login'] = $scope.user.username;
            storage['password'] = $scope.user.password;
            storage['rememb'] = true;
        }
        else {
            delete(storage['login']);
            delete(storage['password']);
            delete(storage['rememb']);

        }
        var params = {};
        params.login = $scope.user.username;
        params.password = $scope.user.password;
        var req = $http.get("http://www.caserevision.co.uk/api/login?login=" + params.login + "&password=" + params.password);
        req.success(function (data, status, headers, config) {
            if (data.success) {
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
    };
}