/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('accessController', ['$scope', '$http', '$rootScope', '$cordovaInAppBrowser', function ($scope, $http, $rootScope, $cordovaInAppBrowser) {
    console.log("acces no", $rootScope.username);
    $scope.sections_id = {};
    $http.get("http://caserevision.com/api/get-sections?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key)
        .then(
            function (response) {
                console.info(response.data.sections);
                $scope.sections = response.data.sections;
                for (var i in $scope.sections) {
                    $scope.sections_id[$scope.sections[i].name] = {
                        id: $scope.sections[i].id,
                        price: $scope.sections[i].price
                    };
                }
                console.info($scope.sections_id);
            });
    $scope.sections_id = {
        'Annual Subscription': {
            id: 5,
            price: 21.99
        }
    };


    $scope.clickLaw = function (name) {
        console.info($rootScope.username);
        if (!$rootScope.username) {
            window.location = "#/login";
            return false;
        }else{
            $scope.data = {
                "testMode": "100",
                "instId": "1091282",
                "cartId": name.id,
                "amount": name.price,
                "currency": "GBP",
                "MC_customerId": $rootScope.user_id
            };

            global_data = $scope.data;

            function createIframe() {
                var el = document.createElement("iframe");
                document.body.appendChild(el);
                el.id = 'iframe';
                el.src = 'pages/action.html';
            }

            createIframe();
        }
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

    };
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