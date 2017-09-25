
/**
 * switch开关指令
 */

var app = angular.module('myApp');

app.directive('mySwitch',[function(){
	return {
		restrict : "AE",
		templateUrl : './template/switch.html',
		scope : {
			switch : '='
		},
		controller : ['$scope',function($scope){
			$scope.switchCtrl = function(){
				$scope.switch = !$scope.switch
			}
		}]
	};
}]);