




/**
 * 数字过滤器
 * 校验数字输入，支持小数
 */
app.register.filter('checkNumInput',function(){
    // input -- 待过滤字符
    // fractionNum -- 保留的小数位数
    return function(input,fractionNum){
        var input = input.split('') || [],
            fractionNum = !isNaN(fractionNum-0) ? fractionNum : 0,    // 小数位数
            pointFlag = true,       // 是否能够输入小数点
            pointIndex,             // 小数点位置
            output = [];            // 输出数组
        angular.forEach(input,function(value,key){
            if(!isNaN(value-0)){    // 输入的为数字
                if(fractionNum){   // 允许小数情况
                    if(pointFlag){  // 能够输入小数
                        output.push(value);
                    }else{     // 已经输入过，不能再输入小数
                        if(key<=fractionNum+pointIndex){
                            output.push(value);
                        }
                    }
                }else{  // 不允许小数
                    if(key == 0 && value==0){

                    }else{
                        output.push(value);
                    }
                }
            }else if(value === '.'){    // 输入为'.'
                if(pointFlag && fractionNum){
                    if(key === 0){
                        output.push('0','.');
                    }else if(key > 0){
                        output.push('.');
                    }
                    pointIndex = key;
                    pointFlag = false;
                }
            }
        });
        output = output.join('');
        return output;
    }
});