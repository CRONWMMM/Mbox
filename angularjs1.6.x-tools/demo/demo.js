

var app = angular.module('myApp',[]);



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
	}]).directive('mySelect',['$document','$timeout',function($document,$timeout){
		return {
			restrict : "AE",
			templateUrl : './template/select.html',
			scope : {
				list : '=list',
				active : '=active',
				value : '=init'
			},
			controller : ['$scope',function($scope){
				$scope.dropDown = {
					display : false
				};

				/**
				 * 选择option
				 * @param  {object} option 当前选中的option对象
				 */
				$scope.selectOpition = function(option){
					_changeValue(option);
					_changeActive($scope.list,option);
					_closeDropDown();
				};

				/**
				 * 点击input框执行
				 */
				$scope.selectInput = function($event){
					$event.stopPropagation();
					_toggleDropDown();
				}

				/**
				 * input失去焦点
				 * @param  {object} e 事件对象
				 */
				$scope.inputBlur = function(e){
					_closeDropDown();
				}

				/**
				 * privateFun
				 * 更改select的value
				 * @param  {object} option 当前选中的option对象
				 */
				function _changeValue(option){
					$scope.value = option.value;
				}


				/**
				 * privateFun
				 * 改变option的激活状态
				 * @param  {array} list  ng-repeat遍历的数组
				 * @param  {[type]} option 当前选中的option对象
				 */
				function _changeActive(list,option){
					angular.forEach(list,function(data,index){
						data.selected = false;
					});
					option.selected = true;
				}

				/**
				 * 打开下拉框
				 */
				function _toggleDropDown(){
					$scope.dropDown.display = !$scope.dropDown.display;
				}

				function _openDropDown(){
					$scope.dropDown.display = true;
				}

				/**
				 * 关闭下拉框
				 */
				function _closeDropDown(){
					$scope.dropDown.display = false;
				}

			}]
		};
	}]);


	/**
	 * 存在问题，在同一时刻只激活一个select时存在问题，如果点击箭头下拉，无法触发
	 */




app.controller('switchCtrl',['$scope',function($scope){
		$scope.title = 'Switch';
		$scope.switch1 = false;
		$scope.switch2 = false;
	}]).directive('mySwitch',[function(){
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


