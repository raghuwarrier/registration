shiftIControlApp.factory('UserService', function() {
 var userName = {}
 function set(data) {
    userName = data;
 }
 function get() {
  return userName;
     
 }

 return {
  set: set,
  get: get
 }

});