/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('aboutUsController', aboutUsController);
function aboutUsController($rootScope) {
    $rootScope.delFrame();
    var first_video = document.getElementById("first_video");
    first_video.onplay = function () {
        screen.unlockOrientation();
    };
    first_video.onended = function () {
        screen.lockOrientation('portrait');
        first_video.webkitExitFullScreen();
    };
    var second_video = document.getElementById("second_video");
    second_video.onplay = function () {
        screen.unlockOrientation();
    };
    second_video.onended = function () {
        screen.lockOrientation('portrait');
        second_video.webkitExitFullScreen();
    };
    console.log("aboutUsController");
}