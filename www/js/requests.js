/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('requests', ['CaseRevisionApp'])
        .factory('Orders', function ($http) {
            return {
                login:function(login,password){
                    return true;
                }
                
                
            };
        });
