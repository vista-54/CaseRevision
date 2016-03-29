app.controller('accessController', function ($scope, $http, $rootScope, $mdDialog, sendToServer, regInStore) {
    window.scroll(0, 0);
    $scope.email = $rootScope.email;

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

                $scope.contract = $scope.response.contract;
                $scope.criminal = $scope.response.criminal;
                $scope.annual = $scope.response.annual;
                $scope.annual.id = parseInt($scope.annual.id);
                $scope.buyed = $scope.response.buyed;

            }, function (response) {
            });
    }
    $scope.changePurchase = function (one, all) {

        $rootScope.section = {
            "id": parseInt(one.id)
        };

        if ($rootScope.isLogged) {

            if ($rootScope.verify) {

                if (($scope.buyed.length != 0) && ($scope.buyed.indexOf($scope.annual.id) == -1)) {
                    $scope.buyed.push($scope.annual.id); // добавляет в массив купленых секций id секции Annual
                }
                if ($scope.buyed.indexOf($rootScope.section.id) == -1) { //если авторизирован, делается проверка, на купленную или не купленную секцию он кликает

                    regInStore(all);

                    store.when(one.name).approved(function (product) {
                        product.verify();
                    });

                    store.when(one.name).verified(function (product) {
                        product.finish();
                    });

                    store.when(one.name).owned(sendToServer($rootScope.username, $rootScope.auth_key, one.id));

                    $scope.order = store.order(one.name);

                    //$scope.url = 'http://www.caserevision.co.uk/providemethods?username=' + $rootScope.username + '&auth_key=' + $rootScope.auth_key + '&section_id=' + $rootScope.section.id;
                    //window.open($scope.url, '_system', 'location=yes');
                }
            } else {
                $mdDialog.show({
                    clickOutsideToClose: false,
                    templateUrl: 'pages/VerifTmpl.html',
                    controller: 'modalCtrl'
                });
            }
        } else {
            $rootScope.oneSection = one;
            $rootScope.all = all;
            window.location = "#/signUp"; // если пользователь не авторизирован, его перекидает на страницу авторизации

            $mdDialog.show({
                clickOutsideToClose: false,
                templateUrl: 'pages/infoTmpl.html',
                controller: 'modalCtrl'
            });

            return false;
        }


    };
});