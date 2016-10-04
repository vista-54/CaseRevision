angular.module('CaseRevisionApp')
    .factory('urls', function () {
        var link = 'http://www.caserevision.co.uk/';

        return {
            link: link,
            joinUs:link + 'api/joinus',
            login: link + 'api/login',
            isVerified: link + 'api/is-user-verified'
        }
    });