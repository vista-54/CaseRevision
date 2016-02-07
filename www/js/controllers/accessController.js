/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('accessController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    console.log("no_access || user_name: " + $rootScope.username + " || auth_key: " + $rootScope.auth_key);
    if (!$rootScope.username || $rootScope.username == '' || $rootScope.username == 'undefined') {
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

    $scope.SendPromo = function (promo) {
        $http.get("http://caserevision.com/api/joinus?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key + "&promo=" + promo)
            .then(function (response) {
                    console.info(response);
                    window.location = "#/";
                    window.location = "#/noaccess";
                }
            );
    };

    $scope.clickLaw = function (data) {
        if (!$rootScope.username || $rootScope.username == '' || $rootScope.username == 'undefined') {
            window.location = "#/login";
        } else {

            console.info(data.id);
            if (($scope.buyed.length != 0) && ($scope.buyed.indexOf($scope.annual.id) == -1)) {
                $scope.buyed.push($scope.annual.id);
            }
            $scope.id = parseInt(data.id);
            console.info($scope.buyed);
            if ($scope.buyed.indexOf($scope.id) == -1) {
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

                function createIframe() {
                    var el = document.createElement("iframe");
                    document.body.appendChild(el);
                    el.id = 'iframe';
                    el.src = 'pages/action.html';
                }

                createIframe();
                var timer = setInterval(function(){
                    var iframe = document.getElementsByTagName('iframe')[0];
                    var res = iframe.contentWindow.location.href;
                    console.info(res);
                    if(res=='http://caserevision.com/section/mobile?status=Y'){
                        setTimeout(function () {
                            $("#iframe").remove();
                            clearInterval(timer);
                        },5500);
                    }
                },1000);
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