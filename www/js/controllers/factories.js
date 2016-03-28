angular.module('purchase', [])
    .factory('sendToServer', function ($http) {
        return function (username, auth_key, section_id) {
            //$http.get("http://www.caserevision.co.uk/api/joinus?username=" + username + "&auth_key=" + auth_key + "&section_id=" + section_id)
            //    .then(function success(response) {
            //        console.info(response);
            console.info(username, auth_key, section_id);
            //}, function error(error) {

            //});
        };
    })
    .factory('regInStore', function () {
        var keys = {};
        return function (obj) {
            for (var i in obj.buyed) {
                switch (obj.buyed[i]) {
                    case 1:
                        keys.contract = true;
                        keys.criminal = false;
                        keys.annual = true;
                        break;
                    case 2:
                        keys.contract = false;
                        keys.criminal = true;
                        keys.annual = true;
                        break;
                }
            }
            if (Object.keys(keys).length == 0) {

                store.register({
                    id: "co.uk.caserevision.contract",
                    alias: obj['contract'].name,
                    type: store.PAID_SUBSCRIPTION
                });
                store.register({
                    id: "co.uk.caserevision.contract" + "_d",
                    alias: obj['contract'].name + ' Discount',
                    type: store.PAID_SUBSCRIPTION
                });
                store.register({
                    id: "co.uk.caserevision.criminal",
                    alias: obj['criminal'].name,
                    type: store.PAID_SUBSCRIPTION
                });
                store.register({
                    id: "co.uk.caserevision.criminal" + "_d",
                    alias: obj['criminal'].name + ' Discount',
                    type: store.PAID_SUBSCRIPTION
                });
                store.register({
                    id: "co.uk.caserevision.annual",
                    alias: obj['annual'].name,
                    type: store.PAID_SUBSCRIPTION
                });
                store.register({
                    id: "co.uk.caserevision.annual" + "_d",
                    alias: obj['annual'].name + ' Discount',
                    type: store.PAID_SUBSCRIPTION
                });
            } else {
                for (var j in keys) {

                    if (keys[j] == false) {
                        store.register({
                            id: "co.uk.caserevision." + j,
                            alias: obj[j].name,
                            type: store.PAID_SUBSCRIPTION
                        });
                        store.register({
                            id: "co.uk.caserevision." + j + "_d",
                            alias: obj[j].name + ' Discount',
                            type: store.PAID_SUBSCRIPTION
                        });
                    }
                }
            }


        }
    });
//product types
//store.FREE_SUBSCRIPTION = "free subscription";
//store.PAID_SUBSCRIPTION = "paid subscription";
//store.NON_RENEWING_SUBSCRIPTION = "non renewing subscription";
//store.CONSUMABLE = "consumable";
//store.NON_CONSUMABLE = "non consumable";

//error codes
//store.ERR_SETUP = ERROR_CODES_BASE + 1; //
//store.ERR_LOAD = ERROR_CODES_BASE + 2; //
//store.ERR_PURCHASE = ERROR_CODES_BASE + 3; //
//store.ERR_LOAD_RECEIPTS = ERROR_CODES_BASE + 4;
//store.ERR_CLIENT_INVALID = ERROR_CODES_BASE + 5;
//store.ERR_PAYMENT_CANCELLED = ERROR_CODES_BASE + 6; // Purchase has been cancelled by user.
//store.ERR_PAYMENT_INVALID = ERROR_CODES_BASE + 7; // Something suspicious about a purchase.
//store.ERR_PAYMENT_NOT_ALLOWED = ERROR_CODES_BASE + 8;
//store.ERR_UNKNOWN = ERROR_CODES_BASE + 10; //
//store.ERR_REFRESH_RECEIPTS = ERROR_CODES_BASE + 11;
//store.ERR_INVALID_PRODUCT_ID = ERROR_CODES_BASE + 12; //
//store.ERR_FINISH = ERROR_CODES_BASE + 13;
//store.ERR_COMMUNICATION = ERROR_CODES_BASE + 14; // Error while communicating with the server.
//store.ERR_SUBSCRIPTIONS_NOT_AVAILABLE = ERROR_CODES_BASE + 15; // Subscriptions are not available.
//store.ERR_MISSING_TOKEN = ERROR_CODES_BASE + 16; // Purchase information is missing token.
//store.ERR_VERIFICATION_FAILED = ERROR_CODES_BASE + 17; // Verification of store data failed.
//store.ERR_BAD_RESPONSE = ERROR_CODES_BASE + 18; // Verification of store data failed.
//store.ERR_REFRESH = ERROR_CODES_BASE + 19; // Failed to refresh the store.
//store.ERR_PAYMENT_EXPIRED = ERROR_CODES_BASE + 20;
//store.ERR_DOWNLOAD = ERROR_CODES_BASE + 21;

//product states
//store.REGISTERED = 'registered';
//store.INVALID = 'invalid';
//store.VALID = 'valid';
//store.REQUESTED = 'requested';
//store.INITIATED = 'initiated';
//store.APPROVED = 'approved';
//store.FINISHED = 'finished';
//store.OWNED = 'owned';
//store.DOWNLOADING = 'downloading';
//store.DOWNLOADED = 'downloaded';

//logging levels
//store.QUIET = 0;
//store.ERROR = 1;
//store.WARNING = 2;
//store.INFO = 3;
//store.DEBUG = 4;

//validation error codes
//store.INVALID_PAYLOAD = 6778001;
//store.CONNECTION_FAILED = 6778002;
//store.PURCHASE_EXPIRED = 6778003;
