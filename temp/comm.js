//字符串占位符
String.prototype.format = function() {
	if(arguments.length == 0) return this;
	for(var s = this, i = 0; i < arguments.length; i++)
		s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
	return s;
};

//动态滑动
var pageTo = function(e, n) {
	var obj = e,
		otop = obj.scrollTop();
	var otimer = setInterval(function() {
		if(n >= obj.scrollTop()) {
			otop += 10;
			if(otop < n) {
				obj.scrollTop(otop);
			} else {
				clearInterval(otimer);
			}
		} else {
			otop -= 10;
			if(otop >= n) {
				obj.scrollTop(otop);
			} else {
				clearInterval(otimer);
			}
		}
	}, 10)
}

//图片加载失败
var imgError = function(e) {
	$(e).each(function() {
		$(this).error(function() {
			$(this).attr('src', 'images/thum.jpg');
		});
	});
}

//清除输入框
var inputing = function(e) {
	$(e).find('input').on('keyup', function() {
		$(this).parent().addClass('inputing');
		if($(this).val() == '') {
			$(e).find('i').click();
		}
	})
	$(e).find('i').on('click', function() {
		$(this).siblings('input').val('');
		$(this).parent().removeClass('inputing');
	})
}

//登录验证码
$('#IDENT').on('click', function() {
	var ths = $('#IDENT'),
		par = $(this).parent(),
		cls = 'counting',
		timer;
	if(!par.hasClass(cls)) {
		var count = 60;
		ths.attr('rel', ths.text());
		ths.text(count + 'S');
		par.addClass(cls);
		timer = setInterval(function() {
			count--;
			ths.text(count + 'S');
			if(count == 0) {
				ths.text(ths.attr('rel'));
				par.removeClass(cls);
				clearInterval(timer);
			}
		}, 1000)
	}
})

//提示
var toast = function(s, t) {
	var timer1,
		timer2,
		delay = t || 2000,
		ele;
	if(s && $('#TOAST').length <= 0) {
		$('body').append('<div class="toast" style="z-index: 999999" id="TOAST"><span>{0}</span></div>'.format(s));
		timer1 = setTimeout(function() {
			ele = $('#TOAST');
			ele.addClass('hide');
			timer2 = setTimeout(function() {
				ele.remove();
				clearTimeout(timer1);
				clearTimeout(timer2);
			}, 600)
		}, delay)
	}
}

//提示 载入中
var toastLoading = (function() {

	var show = function(t) {
		$('body').append('<div class="toast toast_loading" style="z-index: 999999"><span>' + t +'</span></div>');
	}
	var show2 = function(t) {

		$('body').append('<div class="toast toast2 toast_loading" style="z-index: 999999"><span>' + t +'</span></div>');

	}
	var hide = function() {
		ele = $('.toast_loading');
		ele.addClass('hide');
		timer2 = setTimeout(function() {
			ele.remove();
			clearTimeout(timer2);
		}, 600)
	}
	return {
		show: show,
		show2: show2,
		hide: hide
	}
})()

//切换
var tab = function(n, t, c) {
	var nav = $(n),
		target = $(t),
		cname = c || 'on',
		inx = nav.parent().find(cname).index(),
		max = nav.length - 1,
		doc = $(document);
	nav.on('click', function() {
		$(this).addClass(cname).siblings().removeClass(cname);
		target.removeClass(cname);
		target.eq(inx = $(this).index()).addClass(cname);
	})
	doc.on('swipeLeft', function() {
		nav.eq(inx = inx++ >= max ? max : inx).click();
	})
	doc.on('swipeRight', function() {
		nav.eq(inx = inx-- <= 0 ? 0 : inx).click();
	})
}

//弹窗
var pop = (function() {
	var dele = $('body'),
		sClass = 'FIXMODE',
		sTop;
	var ele;
	var show = function(e) {
		ele = $(e);
		$('.pop_bg').show();
		ele.show();
		sTop = dele.scrollTop();
		dele.addClass(sClass);
		dele.css('top', 0 - sTop);
	}
	var hide = function() {
		$('.pop_bg').hide();
		ele.hide();
		dele.removeClass(sClass);
		dele.scrollTop(sTop);
	}
	return {
		show: show,
		hide: hide
	}
})();


/**
 * floatTool 包含加减乘除四个方法，能确保浮点数运算不丢失精度
 *
 * 我们知道计算机编程语言里浮点数计算会存在精度丢失问题（或称舍入误差），其根本原因是二进制和实现位数限制有些数无法有限表示
 * 以下是十进制小数对应的二进制表示
 *      0.1 >> 0.0001 1001 1001 1001…（1001无限循环）
 *      0.2 >> 0.0011 0011 0011 0011…（0011无限循环）
 * 计算机里每种数据类型的存储是一个有限宽度，比如 JavaScript 使用 64 位存储数字类型，因此超出的会舍去。舍去的部分就是精度丢失的部分。
 *
 * ** method **
 *  add / subtract / multiply /divide
 *
 * ** explame **
 *  0.1 + 0.2 == 0.30000000000000004 （多了 0.00000000000004）
 *  0.2 + 0.4 == 0.6000000000000001  （多了 0.0000000000001）
 *  19.9 * 100 == 1989.9999999999998 （少了 0.0000000000002）
 *
 * floatObj.add(0.1, 0.2) >> 0.3
 * floatObj.multiply(19.9, 100) >> 1990
 *
 */
var floatTool = function() {

	/*
	 * 判断obj是否为一个整数
	 */
    function isInteger(obj) {
        return Math.floor(obj) === obj
    }

	/*
	 * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
	 * @param floatNum {number} 小数
	 * @return {object}
	 *   {times:100, num: 314}
	 */
    function toInteger(floatNum) {
        var ret = {times: 1, num: 0}
        if (isInteger(floatNum)) {
            ret.num = floatNum
            return ret
        }
        var strfi  = floatNum + ''
        var dotPos = strfi.indexOf('.')
        var len    = strfi.substr(dotPos+1).length
        var times  = Math.pow(10, len)
        var intNum = parseInt(floatNum * times + 0.5, 10)
        ret.times  = times
        ret.num    = intNum
        return ret
    }

	/*
	 * 核心方法，实现加减乘除运算，确保不丢失精度
	 * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
	 *
	 * @param a {number} 运算数1
	 * @param b {number} 运算数2
	 * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
	 * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
	 *
	 */
    function operation(a, b, op) {
        var o1 = toInteger(a)
        var o2 = toInteger(b)
        var n1 = o1.num
        var n2 = o2.num
        var t1 = o1.times
        var t2 = o2.times
        var max = t1 > t2 ? t1 : t2
        var result = null
        switch (op) {
            case 'add':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 + n2
                } else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2)
                } else { // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2
                }
                return result / max
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2)
                } else {
                    result = n1 * (t2 / t1) - n2
                }
                return result / max
            case 'multiply':
                result = (n1 * n2) / (t1 * t2)
                return result
            case 'divide':
                return result = function() {
                    var r1 = n1 / n2
                    var r2 = t2 / t1
                    return operation(r1, r2, 'multiply')
                }()
        }
    }

    // 加减乘除的四个接口
    function add(a, b) {
        return operation(a, b, 'add')
    }
    function subtract(a, b) {
        return operation(a, b, 'subtract')
    }
    function multiply(a, b) {
        return operation(a, b, 'multiply')
    }
    function divide(a, b) {
        return operation(a, b, 'divide')
    }

    // exports
    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    }
}();



/**
 * 拷贝函数
 * @param target {object} 需要拷贝的目标对象
 * @param deep {boolean} 是否执行深拷贝
 * @returns {object} 拷贝完成的对象
 */
function extend(target,deep){
	var argslength,target,copy,deep,i,len;

	argslength = arguments.length;

	target = argslength===0 ? {} : target;

	// 不传deep默认false，执行浅拷贝
	deep = argslength>1 ? deep : false;
	deep = typeof deep === "boolean" ? deep : false;

	if(Array.isArray(target)){						// 数组拷贝
		copy = [];
		for(i=0,len=target.length;i<len;i++){
			if(deep){
				copy[i] = extend(target[i],deep);
			}else{
				copy[i] = target[i];
			}
		}
	}else if(typeof target === 'object'){			// 对象拷贝
		copy = {};
		for(i in target){							// 这块需要做尾调用优化
			if(deep){
				copy[i] = extend(target[i],deep);
			}else{
				copy[i] = target[i];
			}
		}
	}else{
		copy = target;								// 这边函数就没判断，默认引用原有函数
	}
	return copy;
}


//REM自适应
function AutoPage() {
	console.log(document.documentElement.clientWidth)
    document.documentElement.style.fontSize = document.documentElement.clientWidth * 100 / 640 + 'px';
};
AutoPage();
window.addEventListener('resize', AutoPage, false);