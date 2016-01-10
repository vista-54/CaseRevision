
$(document).ready(function () {
    console.log("ready!");
    getcode();
    $(window).resize(function () {
        getcode();
    });
});
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
//    console.log(navigator.contacts);

//    navigator.splashscreen.show();
//    setTimeout(function () {
//        navigator.splashscreen.hide();
//    }, 3000);
}
//splashscreen.show()
function getcode() {
//var url="http://www.toked.com/";
//$.get(url, function(data) {
//          console.log(data);
//      //дальше легко вытягиваем данные из $obj
//     }
//  );}
    var win_w = $(window).width();
    var win_h = $(window).height();
    $('#frame').css({'height': win_h});
    $('#frame').css({'width': win_w});
//    var bodyHeight = window.onload;
//    var bodyWidth = window.offsetWidth;
}
  