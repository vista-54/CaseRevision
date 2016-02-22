
app.controller('accessController', function ($scope, $http, $rootScope, $mdDialog) {
    window.scroll(0, 0);
    $scope.email = $rootScope.email;

    if($rootScope.verif){
        $mdDialog.show({
            controller: 'modalCtrl',
            templateUrl: 'pages/VerifTmpl.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    }

    if (!$rootScope.username || $rootScope.username == '' || $rootScope.username == 'undefined') {// проверка на то, авторизированый
        // пользоваьтель или нет. Если нет, то ему отображаются просто цены.
        $http.get("http://caserevision.co.uk/api/joinus")
            .then(function (response) {
                $scope.response = response.data;

                $scope.contract = $scope.response.contract;
                $scope.criminal = $scope.response.criminal;
                $scope.annual = $scope.response.annual;
                $scope.buyed = 0;

            }, function (response) {
                console.info(response.status);
            });
    } else {
        $http.get("http://caserevision.co.uk/api/joinus?username=" + $rootScope.username + "&auth_key=" + $rootScope.auth_key)
            .then(function (response) {
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
    $scope.showModal = function (one,all) {
        $rootScope.section = {};
        $rootScope.section.id = parseInt(one.id);

        if (!$rootScope.username || $rootScope.username == '' || $rootScope.username == 'undefined') {
            $rootScope.oneSection = one;
            $rootScope.all = all;
            $mdDialog.show({
                controller: 'modalCtrl',
                templateUrl: 'pages/modal.html',
                parent: angular.element(document.body),
                preserveScope: true,
                clickOutsideToClose: true
            });
            window.location = "#/signUp"; // если пользователь не авторизирован, его перекидает на страницу авторизации
            return false;
        }
        if (($scope.buyed.length != 0) && ($scope.buyed.indexOf($scope.annual.id) == -1)) {
            $scope.buyed.push($scope.annual.id); // добавляет в массив купленых секций id секции Annual
        }
        if ($scope.buyed.indexOf($rootScope.section.id) == -1) { //если авторизирован, делается проверка, на купленную или
            // не купленную секцию он кликает

            $scope.url = 'http://caserevision.co.uk/providemethods?username=' + $rootScope.username + '&auth_key=' + $rootScope.auth_key + '&section_id=' + $rootScope.section.id;
            window.open($scope.url, '_system', 'location=yes');
        }
    };
});