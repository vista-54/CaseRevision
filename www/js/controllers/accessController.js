/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('accessController', accessController);
function accessController($scope, $http) {
    console.log("acces no");
    $scope.clickLaw = function (arg) {

        if (arg === 'contract') {
            $scope.cartId = 'Contract Law';
            $scope.amount = '13.99';
        } else if (arg === 'criminal') {
            $scope.cartId = 'Criminal Law';
            $scope.amount = '13.99';
        }
        else if (arg === 'Annual') {
            $scope.cartId = 'Annual';
            $scope.amount = '21.99';
        }
        console.log("law");
//        payment.onPayPalMobileInit();
        setTimeout(function () {
            $('#sbmbtn').click();
        }, 300);

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


}