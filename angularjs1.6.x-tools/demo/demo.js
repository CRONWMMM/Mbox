'use strict';

var app = angular.module('myApp',[]);



/**
 * 下拉列表控制器
 */
app.controller('selectCtrl',['$scope',function($scope){
	$scope.title = 'Select';
	$scope.initValue1 = '--菜谱--';
	$scope.list1 = [{
						id : 0,
						selected : false,
						value : '香菇炖鸡'
				   },{
				   		id : 1,
				   		selected : false,
						value : '红烧肉'
				   },{
				   		id : 2,
				   		selected : true,
						value : '土豆丝'
				   },{
				   		id : 3,
				   		selected : false,
						value : '地三鲜'
				   },{
				   		id : 4,
				   		selected : false,
						value : '青椒肉丝'
				   },{
				   		id : 5,
				   		selected : false,
						value : '番茄炒蛋'
				   },{
				   		id : 6,
				   		selected : false,
						value : '红烧猪蹄胖'
				   },{
				   		id : 7,
				   		selected : false,
				   		value : '宫保鸡丁'
				   }];
	$scope.initValue2 = '--IT--';
	$scope.list2 = [{
						id : 0,
						selected : false,
						value : 'WEB前端'
				   },{
				   		id : 1,
				   		selected : false,
						value : 'Java'
				   },{
				   		id : 2,
				   		selected : true,
						value : '数据分析工程师'
				   },{
				   		id : 3,
				   		selected : false,
						value : '架构师'
				   },{
				   		id : 4,
				   		selected : false,
						value : 'Nodejs工程师'
				   },{
				   		id : 5,
				   		selected : false,
						value : '数据可视化工程师'
				   },{
				   		id : 6,
				   		selected : false,
						value : 'PHP工程师'
				   },{
				   		id : 7,
				   		selected : false,
				   		value : 'IOS开发'
				   }];
}]);




/**
 * 开关控制器
 */
app.controller('switchCtrl',['$scope',function($scope){
	$scope.title = 'Switch';
	$scope.switch1 = false;
	$scope.switch2 = false;
}]);



/**
 * 弹出框控制器
 */
app.controller('dragCtrl',['$scope',function($scope){
	$scope.title = "Draggable-Dialog";
	$scope.dialog = {
		show : true,
		showDialog : function(){
			$scope.dialog.show = true;
		}
	};
}]);




