'use strict';
var shiftIControlApp = angular.module('shiftIControlApp',['ngRoute','ngStorage','angularModalService','ngCookies']);
shiftIControlApp.config(['$routeProvider',function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LogonController'
    }).
    /*when('/register', {
      templateUrl: 'views/register.html',
      controller: 'SignUpController'
    }).*/
    when('/success', {
      templateUrl: 'views/success.html',
      controller: 'SuccessController'
    }).otherwise({
      redirectTo: '/login'
  });
}]);

shiftIControlApp.run(['$localStorage', function ($localStorage) {
    //Setting password length in root scope so that it can be accessed in services in this mpdule.
   $localStorage.allowedUsers = [{name:"customer",userName:"admin"},{name:"abnamro",userName:"user_type2_dd52c8553b"},{name:"constructor",userName:"user_type1_b2b04828f9"}];
}]);

