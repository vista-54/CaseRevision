angular.module('purchase', [])
    .factory('sendToServer', function ($http, $mdDialog) {
        return function (user_id, username, auth_key, section_id, price,id) {
            var link = 'http://www.caserevision.co.uk/api/get-subscription?';
            var data = {};

            $http.get(link + "user_id=" + user_id + "&auth_key=" + auth_key + "&section_id=" + section_id + "&price=" + price+"&service_id="+id)
                .then(function (response) {
                    if (response.data.success) {
                        data = {
                            "username": response.data.username,
                            "section": response.data.section
                        };
                        $mdDialog.show({
                            clickOutsideToClose: false,
                            template: "<div class='modal'><p class='little_text'>User " + data.username + " was subscribed to the section " + data.section + "</p><button class='btn' ng-click='close()'>Ok</button></div>",
                            controller: 'successCtrl'
                        });
                    }
                }, function (error) {
                });
        };
    })
    .factory('regInStore', function () {
        return function (res) {
            var alias = {};
            for (var j in res) {
                if (res[j].percent == undefined) {
                    store.register({
                        id: "co.uk.caserevision." + j + "_in",
                        alias: res[j].name,
                        type: store.PAID_SUBSCRIPTION
                    });
                    alias[res[j].name] = res[j].name;
                } else if (res[j].percent == 10) {
                    store.register({
                        id: "co.uk.caserevision." + j + "_id1",
                        alias: res[j].name + ' Discount 10%',
                        type: store.PAID_SUBSCRIPTION
                    });
                    alias[res[j].name] = res[j].name + ' Discount 10%';
                } else if (res[j].percent == 30) {
                    store.register({
                        id: "co.uk.caserevision." + j + "_id3",
                        alias: res[j].name + ' Discount 30%',
                        type: store.PAID_SUBSCRIPTION
                    });
                    alias[res[j].name] = res[j].name + ' Discount 30%';
                }
                store.when(res[j].name).approved(function (product) {
                    product.verify();
                });
                store.when(res[j].name).verified(function (product) {
                    product.finish();
                });
            }
            return alias;
        }
    })
    .factory('regInMarket', function () {
        return function (res) {
            var alias = {};
            for (var j in res) {
                console.info(j);
                if (res[j].percent == undefined) {
                    store.register({
                        id: "co.uk.caserevision." + j + "_n",
                        alias: res[j].name,
                        type: store.PAID_SUBSCRIPTION
                    });
                    alias[res[j].name] = res[j].name;
                } else if (res[j].percent == 10) {
                    store.register({
                        id: "co.uk.caserevision." + j + "_d1",
                        alias: res[j].name + ' Discount 10%',
                        type: store.PAID_SUBSCRIPTION
                    });
                    alias[res[j].name] = res[j].name + ' Discount 10%';
                } else if (res[j].percent == 30) {
                    store.register({
                        id: "co.uk.caserevision." + j + "_d3",
                        alias: res[j].name + ' Discount 30%',
                        type: store.PAID_SUBSCRIPTION
                    });
                    alias[res[j].name] = res[j].name + ' Discount 30%';
                }
                store.when(res[j].name).approved(function (product) {
                    product.verify();
                });
                store.when(res[j].name).verified(function (product) {
                    product.finish();
                });
            }
            return alias;
        }
    })
    .factory('sortSection', function ($http, inArray, regInStore, regInMarket) {
        var platform = device.platform;
        console.info(platform);
        return function (obj) {
            var res = obj.sections;

            for (var i in res) {
                if (inArray(res[i].id, obj.buyed)) {
                    delete res[i];
                }
            }
            if (res.length == 2)
                res.push(obj.annual);

            console.info(res);

            if (platform == 'iOS') {
                return regInStore(res);
            } else if (platform == 'Android') {
                return regInMarket(res);
            }
        }
    });