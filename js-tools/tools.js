/**

author: CRONWMMM
version: v0.0.1
date: 2017.9.22
*/


'use strict';

// cookies =======================================================================================================================
	
	/**
	 * 设置cookie/清除cookie
	 * @param name {string}	设置的cookie名
	 * @param value {string} 设置的cookie值
	 * @param myDay {number} cookie存在的天数（设置为负值可清除cookie）
	 */
	function setCookie(name,value,myDay){
	  var oDate=new Date();
	  oDate.setDate(oDate.getDate()+myDay);
	  document.cookie=name+'='+value+'; expires='+oDate;
	}



	/**
	 * 获取cookie
	 * @param name {string} 要获取的cookie名
	 * @returns {string} 返回的cookie值
	 */
	function getCookie(name){
	  //document.cookie获取当前网站的所有cookie
	  var arr=document.cookie.split('; ');
	  for(var i=0;i<arr.length;i++){
	    var arr1=arr[i].split('=');
	    if(arr1[0]==name){
	      return arr1[1];
	    }
	  }
	  return '';
	};




// Url =======================================================================================================================

	/**
	 * 获取网页地址栏url的参数
	 * @param name {string} url的key
	 * @returns {string}
	 */
	function getUrlParam(name){
	  var name = encodeURIComponent(name);
	      arr = new RegExp("(^|&)" + name + "=([^&]*)(&|$)").exec(window.location.search.substr(1));
	  if(arr){
	    return RegExp.$2;
	  }else{
	    return '';
	  }
	}




// copy==========================================================================================================================

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

		if(typeof target === 'object'){			// 对象拷贝
			copy = {};
			for(i in target){					// 这块需要做尾调用优化
				if(deep){
					copy[i] = extend(target[i],deep);
				}else{
					copy[i] = target[i];
				}
			}
		}else if(typeof target === 'array'){	// 数组拷贝
			copy = [];
			for(i=0,len=target.length;i<len;i++){
				if(deep){
					copy[i] = extend(target[i],deep);
				}else{
					copy[i] = target[i];
				}
			}
		}else{
			copy = target;						// 这边函数就没判断，默认引用原有函数
		}
		return copy;
	}



// 倒计时函数============================================================================================
	
	/**
	 * 倒计时函数
	 * @param  {number}   seconds  总计时秒数
	 * @param  {Function} callback 时间走完后的回调函数
	 * @return {[type]}            [description]
	 */
	function countDown(seconds,callback){
		if(seconds>0){
			console.log(seconds);
			setTimeout(function(){
				seconds--;
				// 这块还少一步发射事件
				countDown(seconds,callback);
			},1000);
		}else{
			// 这块也少一个发射事件
			if(callback && typeof callback === 'function')callback();
			return ;
		}
	}







