'use strict';
// controller for handling sign up flow
shiftIControlApp.controller('LogonController',['UserService','$scope','$http','$location','$localStorage','$cookies', function(UserService,$scope,$http,$location,$localStorage,$cookies){
    $scope.logon = function(){
        console.log('Logged in successfully'+$scope.user);
        console.log('get user name from local store'+$localStorage.myName);
        var userList = $localStorage.allowedUsers;
        var inputUserName = $scope.user.userName;
        var userFound = false;
        
        for (var i = 0, len = userList.length; i < len; i++) {
            if (userList[i].name === inputUserName) {
                console.log('Loop is going to break.'); 
                $cookies.put("userName",userList[i].userName);
                UserService.set(userList[i].userName);
                userFound=true;
                break;
            }
            console.log('Loop will continue.');
        }
        if(!userFound){
            $scope.messages = [{errorMessage : "User Does not exist in the system"}];
            $scope.loginForm.$setPristine();
        }else{
            $location.path('/success');
        }
        
        //var requestBody = JSON.stringify({ userName: $scope.user.userName, password: $scope.user.password });
        // Make backend call register user
/*        $http.post('/login',requestBody).then(function mySucces(response) {
            $location.path('/success');
        }, function myError(response) {
            if(response.data!=undefined)
            {
                $scope.messages = [response.data.errorMessage];
                $scope.loginForm.$setPristine();
            }
        });*/
    }

/*    $scope.signUp = function() {
        $scope.messages=undefined;
        // validate new password against password rule
        var result = PwsValidationService.validatePassword($scope.user.password);
        if(result.isSuccess==false){
            $scope.messages = result.messages;
            $scope.signUpForm.$setPristine();
            return;
        }
        // Create json string from registration from fields
        var requestBody = JSON.stringify({ email: $scope.user.email, password: $scope.user.password });
        // Make backend call register user
        $http.post('/register',requestBody).then(function mySucces(response) {
            $location.path('/success');
        }, function myError(response) {
            if(response.data!=undefined)
            {
                $scope.messages = [response.data.errorMessage];
                $scope.signUpForm.$setPristine();
            }
        });
    }*/
}]);