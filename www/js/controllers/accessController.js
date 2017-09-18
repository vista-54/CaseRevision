app.controller('accessController', function ($scope, $http, $rootScope, $mdDialog, sendToServer, sortSection, urls) {
        window.scroll(0, 0);
        $scope.email = $rootScope.email;
        $scope.alias = '';
        $rootScope.circular = 'indeterminate';

        if (!$rootScope.isLogged) {
            $http.get(urls.joinUs)
                .then(function success(response) {

                    $rootScope.circular = 0;
                    $scope.response = response.data;
                    $scope.contract = $scope.response.contract;
                    $scope.criminal = $scope.response.criminal;
                    $scope.annual = $scope.response.annual;
                    $scope.buyed = 0;

                }, function error(error) {
                });
        } else {
            $http({
                method: 'GET',
                url: urls.joinUs,
                params: {
                    username: $rootScope.username,
                    auth_key: $rootScope.auth_key
                }
            })
                .then(function (response) {
                    $rootScope.circular = 0;
                    $scope.response = response.data;
                    $scope.contract = $scope.response.sections.contract;
                    $scope.criminal = $scope.response.sections.criminal;
                    $scope.annual = $scope.response.sections.annual;
                    $scope.annual.id = parseInt($scope.annual.id);
                    $scope.buyed = $scope.response.buyed;
                    if ($scope.buyed.length != 0) {
                        $scope.buyed.push($scope.annual.id);
                    }
                    $scope.alias = sortSection(response.data, $rootScope.username, $rootScope.auth_key);
                }, function () {
                });
        }
        $scope.changePurchase = function (one) {
            $rootScope.circular = 'indeterminate';
            if ($rootScope.isLogged) {
                $http({
                    method: 'GET',
                    url: urls.isVerified,
                    params: {username: $rootScope.username, auth_key: $rootScope.auth_key}
                }).then(function (response) {
                    $rootScope.circular = 0;
                    if (response.data.verify) {
                        store.order($scope.alias[one.name]);
                        store.refresh();
                        store.when($scope.alias[one.name]).updated(function (product) {
                            if (product.owned) {
                                sendToServer(
                                    $rootScope.user_id,
                                    $rootScope.username,
                                    $rootScope.auth_key,
                                    one.id, product.price,
                                    product.id);
                            }
                        });
                    } else {
                        $mdDialog.show({
                            clickOutsideToClose: false,
                            templateUrl: 'pages/VerifTmpl.html',
                            controller: 'modalCtrl'
                        });
                    }
                });
            } else {
                $rootScope.circular = 0;
                $mdDialog.show({
                    clickOutsideToClose: false,
                    templateUrl: 'pages/infoTmpl.html',
                    controller: 'modalCtrl'
                });
            }
        };
    }
);