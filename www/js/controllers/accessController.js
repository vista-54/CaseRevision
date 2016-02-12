/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('accessController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    window.scroll(0, 0);
    $scope.verif = $rootScope.verif;
    $scope.email = $rootScope.email;
    //console.log("no_access || user_name: " + $rootScope.username + " || auth_key: " + $rootScope.auth_key);
    if (!$rootScope.username || $rootScope.username == '' || $rootScope.username == 'undefined') {// проверка на то, авторизированый
        // пользоваьтель или нет. Если нет, то ему отображаются просто цены.
        $http.get("http://caserevision.co.uk/api/joinus")
            .then(function (response) {
                $scope.response = response.data;
                console.info($scope.response);

                $scope.contract = $scope.response.contract;
                $scope.criminal = $scope.response.criminal;
                $scope.annual = $scope.response.annual;
                $scope.buyed = 0;

            }, function (response) {
                console.info(response.status);
            });
    } else {
        // если авторизирован, ему отображается поле для промокода и показано какие секции куплены, а какие нет
        $http.get("http://caserevision.co.uk/api/joinus?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key)
            .then(function (response) {
                console.info(response);
                $scope.response = response.data;

                $scope.contract = $scope.response.contract;
                $scope.criminal = $scope.response.criminal;
                $scope.annual = $scope.response.annual;
                $scope.annual.id = parseInt($scope.annual.id);
                $scope.buyed = $scope.response.buyed;
                $scope.payment_settings = $scope.response.payment_settings;

            }, function (response) {
                console.info(response.status);
            });
    }

    $scope.clickLaw = function (data) {
        if (!$rootScope.username || $rootScope.username == '' || $rootScope.username == 'undefined') {
            window.location = "#/login"; // если пользователь не авторизирован, его перекидает на страницу авторизации
        } else {
            //console.info(data.id);
            if (($scope.buyed.length != 0) && ($scope.buyed.indexOf($scope.annual.id) == -1)) {
                $scope.buyed.push($scope.annual.id);// добавляет в массив купленых секций id секции Annual
            }
            $scope.id = parseInt(data.id);
            console.info($scope.buyed);
            if ($scope.buyed.indexOf($scope.id) == -1) {//если авторизирован, делается проверка, на купленную или
                // не купленную секцию он кликает
                $scope.obj = {
                    "testMode": $scope.payment_settings.environment,
                    "instId": $scope.payment_settings.inst_id,
                    "cartId": data.id,
                    "amount": data.price,
                    "currency": "GBP",
                    "MC_customerId": $rootScope.user_id,
                    "MC_mobile": true
                };
                console.info($scope.obj);

                global_data = $scope.obj;

                $scope.scrollHeight = Math.max(
                    document.body.scrollHeight, document.documentElement.scrollHeight,
                    document.body.offsetHeight, document.documentElement.offsetHeight,
                    document.body.clientHeight, document.documentElement.clientHeight
                );

                function createIframe() { // объявление функции создание фрейма
                    var el = document.createElement("iframe");
                    var place = document.getElementById('access');
                    place.appendChild(el);
                    el.id = 'iframe';
                    el.src = 'pages/action.html';
                    el.height = $scope.scrollHeight;
                }

                createIframe(); // создание фрейма

                $rootScope.timer = setInterval(function () { // После создания фрейма запускается циклическая функция на проверку
                    // iframe.contentWindow.location.href и закрывает фрейм, если мы попали на caserevision.co.uk через 5,5 секунд
                    var iframe = document.getElementsByTagName('iframe')[0];
                    var res = iframe.contentWindow.location.href;
                    console.info(res);
                    if (res == 'http://caserevision.co.uk/section/mobile?status=Y') {
                        setTimeout(function () {
                            window.location = "#/sections";
                        }, 5500);
                    }
                }, 1000);
            }
        }
    };
}]);