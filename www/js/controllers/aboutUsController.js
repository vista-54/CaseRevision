/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('aboutUsController', aboutUsController);
function aboutUsController($rootScope) {
    $("#iframe").remove();
    clearInterval($rootScope.timer);
    console.log("aboutUsController");
}