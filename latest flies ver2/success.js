'use strict';
// controller for handling Registration success flow
shiftIControlApp.controller('SuccessController', ['UserService','$scope','$http','ModalService','$location','$cookies', function(UserService,$scope,$http,ModalService,$location,$cookies) {
  $scope.message = "You have received an e-mail to confirm your registration.";
/*    $http.get("http://127.0.0.1:50526/app/data/overview.json").then(function mySucces(response) {
        $scope.accountNumber = response.data.accountNumber;
       $scope.balance = response.data.balance;
       $scope.milestones =  response.data.milestones;
       console.log('get user name from local store'+$scope.milestones);
       console.log('get user name from local store'+$scope.balance);
    }, function myError(response) {
        if(response.data!=undefined)
        {
            $scope.messages = [response.data.errorMessage];
            //$scope.loginForm.$setPristine();
        }
    });*/
    console.log('username in sucess page'+ $cookies.get("userName"));
    var requestBody = JSON.stringify({user:$cookies.get("userName")})
    $http.post('http://95.129.84.229/icontrol/overview',requestBody).then(function mySucces(response) {
        console.log('result from post'+response.data);
        $scope.accountNumber = response.data.account;
       $scope.balance = response.data.balance;
       $scope.milestones =  response.data.milestones;
        //$location.path('/success');
    }, function myError(response) {
        if(response.data!=undefined)
        {
            $scope.messages = [response.data.errorMessage];
            $scope.loginForm.$setPristine();
        }
    });
    
    $scope.takeAction = function(id,actionName) {
        console.log(' data in take action '+id + actionName);
        if(actionName=='initiate'){
            $scope.nextStatus='in progress';
        }else if(actionName=='done'){
            $scope.nextStatus='done';
        }else if(actionName=='reject'){
            $scope.nextStatus='in_progress';
        }else if(actionName=='accept'){
            $scope.nextStatus='in_progress';
        }
        var requestBody = JSON.stringify({"user":$cookies.get("userName"),"id":id,"status":$scope.nextStatus})
        $http.post("http://95.129.84.229/icontrol/status",requestBody).then(function mySucces(response) {
            //var milestoneDetails =  response.data;
                var requestBody = JSON.stringify({user:$cookies.get("userName")})
                $http.post('http://95.129.84.229/icontrol/overview',requestBody).then(function mySucces(response) {
                    console.log('result from post'+response.data);
                    $scope.accountNumber = response.data.account;
                   $scope.balance = response.data.balance;
                   $scope.milestones =  response.data.milestones;
                    return;
                    //$location.path('/success');
                }, function myError(response) {
                    if(response.data!=undefined)
                    {
                        $scope.messages = [response.data.errorMessage];
                        $scope.loginForm.$setPristine();
                    }
                });           
        }, function myError(response) {
            if(response.data!=undefined)
            {
                $scope.messages = [response.data.errorMessage];
                return;
                //$scope.loginForm.$setPristine();
            }
        });
       // $location.path('/success');
      
    };
    
    $scope.show = function(id) {
        console.log('id id '+id); 
        $http.get("http://127.0.0.1:50526/app/data/milestone.json").then(function mySucces(response) {
            var milestoneDetails =  response.data.milestones;
            console.log('get user name from local store'+milestoneDetails);
            console.log('get user name from local store'+$scope.balance);
            ModalService.showModal({
                templateUrl: 'milestoneDetails.html',
                controller: "MilestoneDetailsController",
                inputs: {
                    title: "Milestone details",
                    milestoneDetails: milestoneDetails
                }
                }).then(function(modal) {
                    //modal.element.modal();
                    modal.close.then(function(result) {
                        $scope.message = "You said " + result;
                    });
                });
        }, function myError(response) {
            if(response.data!=undefined)
            {
                $scope.messages = [response.data.errorMessage];
                return;
                //$scope.loginForm.$setPristine();
            }
        });
    };
    
}]);