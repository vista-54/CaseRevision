# jw-plangular

A simple Angular directive for JW-Player that works with dynamically loaded content (including ng-repeat).

## Dependencies
- required:   
  [angularjs](http://angularjs.org/)
- required: 
  [jwplayer](http//jwplayer.com)

## Install 
1. Copy or download the jw-plangular.min.js file to your project. 
2. Reference the file in your html 
3. Include the module in angular (i.e. in `app.js`) as `JwPlangular`

## Get Started 
Reference jw-plangular in your HTML after angular and before your project app.

### Note:  You must have jwplayer setup as well

```html

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular.js"></script>
<script type="text/javascript" src="jw-plangular.min.js"></script>
<script type="text/javascript" src="app.js"></script>

```

JwPlayer code goes in as normal

```html
<script type="text/javascript" src="/scripts/jwplayer.js" ></script>
<script type="text/javascript">jwplayer.key="YOUR_JW_PLAYER_KEY";</script>
```

Next, include the jw-plangular module in your angular as 'JwPlangular'.

```js

angular.module('myApp', [  
  "JwPlangular"
]);

```

## To use as static video player:

#### Initialize the player options in your angular controller 

The player options themselves are specific to jwplayer. See [jwplayer support](http://support.jwplayer.com) for more info

To keep the player from loadding prematurely in the Angular digest cycle (an issue with ng-repeat), JwPlangular waits to fire the player until the scope in the `watch-me` field changes. So for single page players with static options, we must also assign a $scope variagle for the `watch-me` to watch. 

```js 

angular.module('myApp')
  .controller('PlayerCtrl', ['$scope', function($scope) {

    // the player options are specific to jwplayer. 
    // see http://support.jwplayer.com for more info
    $scope.playerOptions = {
      file: "http://youtu.be/iF9XGbm42xo"
      , width: "100%"
      , stretching: "uniform"
    };

    // The directive waits to fire until the scope 
    // associated with 'watch-me' in the directive changes.
    // So we can set that here. 
    $scope.watchme = true;

  }])
;

```

#### Next, call the directive in your markup. 

Make sure you give the directive a `player-id=""`. 

```html 

<div ng-controller="PlayerCtrl">
  <div class="video-container">
    <jw-plangular watch-me="watchMe" player-id="playTest" options="playerOptions"></jw-plangular>
  </div>
</div>

``` 

## To use with dynamic content (including ng-repeat): 

With dynamic content, the `watch-me` field becomes the scope of the dynamic content, and we load the player options via a function in the controller. 

```js 

angular.module('myApp')
  .controller('PlayerCtrl', ['$scope', function($scope) {

    $scope.videoList = [
      { id: 1, url: "http://youtu.be/iF9XGbm42xo" }
      , { id: 2, url: "http://youtu.be/oMnQr4I0JIc" }
      , { id: 3, url: "http://youtu.be/vMrfmGaHqgk" }
    ]

    $scope.fetchOptions = function(video) {
      var playerOptions = { 
        file: video.url
        , width: "100%"
        , stretching: "uniform"
      };
    }

  }])
;

```

In the markup, `watch-me` becomes the scope of the content in question. Use `fetch-options` instead of `options` to load dynamically. Don't forget to assign a unique `player-id` -- recommended use is the id of the video object itself. 

```html 

<div ng-controller="PlayerCtrl">
  <div class="video-container" ng-repeat="video in videoList">
    <jw-plangular watch-me="video" player-id="play{{video.id}}" fetch-options="fetchOptions(video)"></jw-plangular>
  </div>
</div>

``` 





