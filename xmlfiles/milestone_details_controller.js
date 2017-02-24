shiftIControlApp.controller('MilestoneDetailsController',['$scope','title','milestoneDetails', function($scope, title,milestoneDetails) {
console.log('Modal in successfully'+milestoneDetails);
 $scope.title = title;
 $scope.milestoneDetails = milestoneDetails;   
 $scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 }}]);