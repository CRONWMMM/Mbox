
/**
 * 存在问题，在同一时刻只激活一个select时存在问题，如果点击箭头下拉，无法触发
 */

var app = angular.module('myApp');

app.directive('mySelect',['$document','$timeout',function($document,$timeout){
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