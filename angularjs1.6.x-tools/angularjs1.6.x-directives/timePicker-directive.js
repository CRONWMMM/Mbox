


/**
 * 时间选择器
 */
var app = angular.module('myApp');

app.directive('myTimePicker',['$document','$timeout',function($document,$timeout){
	return {
		restrict : "AE",
		templateUrl : "./template/timePicker.html",
		scope : {

		},
		link : function(){},
		controller : ['$scope',function($scope){
			
		}]
	};
}]);






