angular.module('purchase', [])
    .factory('sendToServer', function ($http) {
        return function (username, auth_key, section_id) {
            //$http.get("http://www.caserevision.co.uk/api/joinus?username=" + username + "&auth_key=" + auth_key + "&section_id=" + section_id)
            //    .then(function success(response) {
            //        console.info(response);
            //             console.info(username, auth_key, section_id);
            //}, function error(error) {

            //});
        };
    })
    .factory('regInStore', function () {
        var keys = {
            "contract": false,
            "criminal": false,
            "annual": false
            //"tort": false,
            //"property": false,
            //"eu": false,
            //"private": false
        };
        return function (obj) {

            if(obj.buyed.length!=0){

                for (var i in obj.buyed) {
                    switch (obj.buyed[i]) {
                        case 1:
                            keys.contract = true;
                            keys.annual = true;
                            break;
                        case 2:
                            keys.criminal = true;
                            keys.annual = true;
                            break;
                        //case 3:
                        //    keys.tort = true;
                        //    keys.annual = true;
                        //    break;
                        //case 4:
                        //    keys.property = true;
                        //    keys.annual = true;
                        //    break;
                        //case 8:
                        //    keys.eu = true;
                        //    keys.annual = true;
                        //    break;
                        //case 9:
                        //    keys.private = true;
                        //    keys.annual = true;
                        //    break;
                    }
                }
                for (var j in keys) {
                    if (keys[j] == false) {
                        store.register({
                            id: "co.uk.caserevision." ,
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
            }else{
                delete keys.annual;
                for (var j in keys) {
                    store.register({
                        id: "co.uk.caserevision."+j,
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
    });