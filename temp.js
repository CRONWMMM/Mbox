/*
	解angularjs 自定义下拉框统一时间无法维持一个下拉框的解决方案
*/

    // 模块选择指令
    app.register.directive('selectModules',['$document','$timeout',function($document,$timeout){
        return {
            restrict : "AE",
            replace: true,
            scope : {
                modules : "=",
                showLists : "=",
                moduleLists : "=",
                currentModule : "=",
                addModule : "&"
            },
            template : '<div class="selectModules">'+
                            '<input class="input" readonly="readonly" ng-model="currentModule" type="text">'+
                            '<span class="icon"></span>'+
                            '<ul class="lists" ng-show="showLists">'+
                                '<li ng-click="selectModule(module);addModule();" ng-repeat="module in modules">'+
                                    '<span class="check-icon" ng-class="{true:\'checkbox_true_full\',false:\'\'}[module.selected]"></span>'+'<span ng-bind="module.moduleName" ></span>'+
                                '</li>'+
                            '</ul>'+
                        '</div>',
            link : function(scope,element,attrs){
                scope.moduleLists = [];
                scope.moduleNames = [];
                scope.active = false;   // 当前指令是否被激活
                scope.selectModule = function(module){
                    if(module.selected){
                        angular.forEach(scope.moduleNames,function(data,index,arr){
                            if(data === module.moduleName){
                                scope.moduleLists.splice(index,1);
                                scope.moduleNames.splice(index,1);
                            }
                        });
                        scope.currentModule = scope.moduleNames.join(" , ");
                        module.selected = false;
                    }else{
                        scope.moduleLists.push(module.id);
                        scope.moduleNames.push(module.moduleName);
                        scope.currentModule = scope.moduleNames.join(" , ");
                        module.selected = true;
                    }
                };
                element.on('click',function(e){
                    scope.active = true;    // 激活开关，用于收展下拉框
                    scope.$apply(function(){
                        if(!scope.showLists)scope.showLists = true;
                    });
                });
                $document.on('click',function(){
                    if(scope.active){   // 如果指令为激活状态，就将它消活
                        scope.active = false;
                    }else{              // 当前指令未激活，就判断收起下拉框
                        scope.$apply(function(){
                            scope.showLists = false;
                            scope.active = false;
                        });
                    }
                });
            }
        };
    }]);