'use strict';
// controller for handling Registration success flow
shiftIControlApp.controller('SuccessController', ['$scope','$http','ModalService', function($scope,$http,ModalService) {
  $scope.message = "You have received an e-mail to confirm your registration.";
 $http.get("http://127.0.0.1:50526/app/data/overview.json").then(function mySucces(response) {
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
    });
    
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