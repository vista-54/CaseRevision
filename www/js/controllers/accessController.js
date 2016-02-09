/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('accessController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    $scope.verif = $rootScope.verif;
    $scope.email = $rootScope.email;

    //console.log("no_access || user_name: " + $rootScope.username + " || auth_key: " + $rootScope.auth_key);
    if (!$rootScope.username || $rootScope.username == '' || $rootScope.username == 'undefined') {// проверка на то, авторизированый
        // пользоваьтель или нет. Если нет, то ему отображаются просто цены.
        $http.get("http://caserevision.com/api/joinus")
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
        $http.get("http://caserevision.com/api/joinus?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key)
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

    //$scope.SendPromo = function (promo) { // функция отправки промо-кода на сайт
    //    $http.get("http://caserevision.com/api/joinus?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&promo=" + promo)
    //        .then(function (response) {
    //                console.info(response);
    //                window.location = "#/"; // втулил для "перезагрузки" страници и отображения цен сразу с действием промокода
    //                window.location = "#/noaccess";
    //            }
    //        );
    //};

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

                //console.info( 'Высота с учетом прокрутки: ' + scrollHeight );

                $rootScope.timer = setInterval(function () { // После создания фрейма запускается циклическая функция на проверку
                    // iframe.contentWindow.location.href и закрывает фрейм, если мы попали на caserevision.com через 5,5 секунд
                    var iframe = document.getElementsByTagName('iframe')[0];
                    var res = iframe.contentWindow.location.href;
                    console.info(res);
                    if (res == 'http://caserevision.com/section/mobile?status=Y') {
                        setTimeout(function () {
                            window.location = "#/sections";
                        }, 5500);
                    }
                }, 1000);
            }
        }
    };

    //if() {
    //
    //}
    //$scope.data = {
    //    "testMode": "100",
    //    "instId": "1091282",
    //    "cartId": name.id,
    //    "amount": name.price,
    //    "currency": "GBP",
    //    "MC_customerId": $rootScope.user_id
    //};
    //var options = {
    //    location: 'yes',
    //    clearcache: 'no',
    //    toolbar: 'yes',
    //    closebuttoncaption: 'Done'
    //}
    //run: function (event) {
    //    var form = document.createElement("form");
    //    form.action = "https://secure-test.worldpay.com/wcc/purchase";
    //    form.method = "POST";
    //    form.target = "_system";
    //    for (var key in $scope.data) {
    //        var input = document.createElement("input");
    //        input.name = key;
    //        input.value = $scope.data[key];
    //        form.appendChild(input);
    //    }
    //    form.style.display = 'none';
    //    document.body.appendChild(form);
    //    form.submit();
    //}
    //};

    //$cordovaInAppBrowser.open('https://secure-test.worldpay.com/wcc/purchase', '_system', options);

    //$cordovaInAppBrowser.close();
    //window.open = $cordovaInAppBrowser.open;


    //var options = {
    //    location: 'yes',
    //    clearcache: 'no',
    //    toolbar: 'yes',
    //    closebuttoncaption: 'Done'
    //};
    //var form = document.createElement("form");
    //form.action = "https://secure-test.worldpay.com/wcc/purchase";
    //form.method = "POST";
    ////form.target = "_self";
    //for (var key in $scope.data) {
    //    var input = document.createElement("input");
    //    input.name = key;
    //    input.value = $scope.data[key];
    //    form.appendChild(input);
    //}
    //form.style.display = 'none';
    //document.body.appendChild(form);
    ////$cordovaInAppBrowser.open('', 'map', options);
    ////window.open('', 'map', 'location=yes,toolbar=yes,hardwareback=no');
    //form.submit();


    //console.info($scope.cartId,"    ",$scope.amount);
//        payment.onPayPalMobileInit();
//        setTimeout(function () {
//            $('#sbmbtn').click();
//        }, 300);


//    $scope.BuyLaw = function (arg) {
//        var params = {};
//        var outArr = [];
//        if (arg === 'contract') {
//
////                params.desc='contractlaw';
//            params.testMode = '100';
//            params.instId = '1091282';
//            params.cartId = 'contractlaw';
//            params.amount = '13.99';
//            params.currency = 'GBP';
////                params.name='CAPTURED';
//
//        }
//        for (var i in params) {
//            outArr.push(i + '=' + params[i]);
//
//        }
////        params = outArr.join('&');
//        params = 'testMode=100&instId=1091282&cartId=contractlaw&amount=13.99&currency=GBP';
//        console.log(arg);
//        var config={
//            'mail_send': true
//        };
//
//        var req = $http.post("https://secure-test.worldpay.com/wcc/purchase", params,config);
//        req.success(function (data, status, headers, config) {
//
//            console.log(data);
//
//
//        });
//        req.error(function (data, status, headers, config) {
//            console.log(data);
//        });
//    };
}]);