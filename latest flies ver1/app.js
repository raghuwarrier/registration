'use strict';
var shiftIControlApp = angular.module('shiftIControlApp',['ngRoute','ngStorage','angularModalService']);
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
   $localStorage.allowedUsers = [{name:"Raghu",userName:"admin"},{name:"Coen",userName:"user_type1_5894b6a76a"},{name:"Eddie",userName:"user_type1_61sa9cc943"}];
}]);

