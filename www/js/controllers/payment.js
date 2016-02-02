/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var payment = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        payment.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        // start to initialize PayPalMobile library
        payment.initPaymentUI();
    },
    initPaymentUI: function () {
        var clientIDs = {
            "PayPalEnvironmentProduction": "1091282",
            "PayPalEnvironmentSandbox": "1091282"
        };
        PayPalMobile.init(clientIDs, payment.onPayPalMobileInit);

    },
    onSuccesfulPayment: function (payment) {
        console.log("payment success: " + JSON.stringify(payment, null, 4));
    },
    onAuthorizationCallback: function (authorization) {
        console.log("authorization: " + JSON.stringify(authorization, null, 4));
    },
    createPayment: function () {
        // for simplicity use predefined amount
        var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
        var payment = new PayPalPayment("50.00", "USD", "Awesome Sauce", "Sale",
                paymentDetails);
        return payment;
    },
    configuration: function () {
        // for more options see `paypal-mobile-js-helper.js`
        var config = new PayPalConfiguration({
            merchantName: "My test shop",
            merchantPrivacyPolicyURL: "https://secure-test.worldpay.com/wcc/purchase",
            merchantUserAgreementURL: "https://secure-test.worldpay.com/wcc/purchase"
        });
        return config;
    },
    onPrepareRender: function () {
        // buttons defined in index.html
        //  <button id="buyNowBtn"> Buy Now !</button>
        //  <button id="buyInFutureBtn"> Pay in Future !</button>
        //  <button id="profileSharingBtn"> ProfileSharing !</button>
//        var buyNowBtn = document.getElementById("buyNowBtn");
//    var buyInFutureBtn = document.getElementById("buyInFutureBtn");
//    var profileSharingBtn = document.getElementById("profileSharingBtn");

//    buyNowBtn.onclick = function(e) {
        // single payment
        PayPalMobile.renderSinglePaymentUI(payment.createPayment(), payment.onSuccesfulPayment,payment.onUserCanceled);
//    };

//    buyInFutureBtn.onclick = function(e) {
//      // future payment
//      PayPalMobile.renderFuturePaymentUI(app.onAuthorizationCallback, app
//        .onUserCanceled);
//    };
//
//    profileSharingBtn.onclick = function(e) {
//      // profile sharing
//      PayPalMobile.renderProfileSharingUI(["profile", "email", "phone",
//        "address", "futurepayments", "paypalattributes"
//      ], app.onAuthorizationCallback, app.onUserCanceled);
//    };
    },
    onPayPalMobileInit: function () {
        // must be called
        // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
        PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork", payment.configuration(),
                payment.onPrepareRender);
    },
    onUserCanceled: function (result) {
        console.log(result);
    }
};

payment.initialize();