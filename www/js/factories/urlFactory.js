angular.module('CaseRevisionApp')
    .factory('urls', function () {
        var link = 'http://www.caserevision.co.uk/';

        return {
            link: link,
            joinUs:link + 'api/joinus',
            login: link + 'api/login',
            isVerified: link + 'api/is-user-verified',
            contactUs: link + 'api/academic',
            getSections: link + 'api/get-sections',
            search: link + 'api/find',
            getTopics: link + 'api/get-topics',
            getAnswers: link + 'api/get-answers',
            getSecondLink: link + 'api/secure-s-link/',
            getFirstLink: link + 'api/secure-f-link/'
        }
    });