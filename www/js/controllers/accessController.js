app.controller('accessController', function ($scope, $http, $rootScope, $mdDialog, sendToServer, sortSection) {
        window.scroll(0, 0);
        $scope.email = $rootScope.email;
        $scope.alias = '';

        if (!$rootScope.isLogged) {
            $http.get("http://www.caserevision.co.uk/api/joinus")
                .then(function success(response) {
                    $scope.response = response.data;
                    $scope.contract = $scope.response.contract;
                    $scope.criminal = $scope.response.criminal;
                    $scope.annual = $scope.response.annual;
                    $scope.buyed = 0;

                }, function error(error) {
                });
        } else {
            $http.get("http://www.caserevision.co.uk/api/joinus?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key)
                .then(function (response) {
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
                }, function (response) {
                });
        }
        $scope.changePurchase = function (one) {
            if ($rootScope.isLogged) {
                $http.get("http://www.caserevision.co.uk/api/is-user-verified?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key)
                    .then(function (response) {
                        if (response.data.verify) {
                            store.order($scope.alias[one.name]);
                            store.refresh();
                            store.when($scope.alias[one.name]).owned(function (product) {
                                sendToServer($rootScope.user_id, $rootScope.username, $rootScope.auth_key, one.id, product.price, product.id);
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
                $mdDialog.show({
                    clickOutsideToClose: false,
                    templateUrl: 'pages/infoTmpl.html',
                    controller: 'modalCtrl'
                });
            }
        };
    }
);