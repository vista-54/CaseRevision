'use strict';

angular.module('JwPlangular', [])

  .controller('JwPlangularCtrl',  ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state){
    $scope.setupVideo = function(id, options) {
      var playerId = id;
      if($('#' + playerId).length > 0) { 
        jwplayer(playerId).setup(options);
      }
    }
  }])

  .directive("jwPlangular", function() {
    return {
      restrict: 'EC'
      , scope: {
        watchMe: '='
        , playerId: '@'
        , options: '='
        , fetchedOptions: '&'
      }
      , transclude: true
      , template: "<div class='video-box' id='{{playerId}}'> loading player... </div>"
      , controller: 'JwPlangularCtrl'
      , link: function(scope, element, attrs) {
        scope.$watch('watchMe', function(newVal, oldVal){
          if(newVal) {
            if(scope.options) {
              scope.setupVideo(scope.playerId, scope.options);
            } else {
              scope.setupVideo(scope.playerId, scope.fetchedOptions());
            }
          }
        });
      }
    }
  })

// end of the file
;

