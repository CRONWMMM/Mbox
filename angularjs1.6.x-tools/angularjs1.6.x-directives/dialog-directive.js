




/**
 * 弹出框指令
 */
var app = angular.module('myApp');

app.directive('myDialog',['$document',function($document){
	return {
		restrict : "AE",
		templateUrl : "./template/dialog.html",
		scope : {
			show : "=show"
		},
		transclude : true,
		controller : ['$scope',function($scope){
			$scope.closeDialog = function(){
				$scope.show = false;
			};
		}],
		link : function(scope,element,attr){
			var header = element.find('div').eq(1),
				startX,
				startY,
				x,
				y,
				clientStartX,
				clientStartY;
			header.on('mousedown',function($event){
				var posObj =  _getPosition(element[0]);
				startX = posObj.left;
				startY = posObj.top;
				clientStartX = $event.clientX;
				clientStartY = $event.clientY;
				$event.stopPropagation();
				$event.preventDefault();
				$document.on('mousemove',_mousemove);
				$document.on('mouseup',_mouseup);
			});

			function _mousemove($event){
				x = startX + $event.clientX - clientStartX;
				y = startY + $event.clientY - clientStartY;
				if(x<=0){
					x = 0;
				}
				if(y<=0){
					y = 0;
				}
				element.css({
					left : x + 'px',
					top : y + 'px',
					bottom: 'auto',
					right: 'auto',
					margin: 0
				});
			}

			function _mouseup(){
				$document.off('mousemove');
				$document.off('mouseup');
			}

			function _getPosition(obj){
				return {
					left : obj.offsetLeft,
					top : obj.offsetTop
				};
			}
		}
	};
}]);