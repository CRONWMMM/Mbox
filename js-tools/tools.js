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




// Url ===========================================================================================================================

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



// 倒计时函数==================================================================================================================
	
	/**
	 * 倒计时函数
	 * @param  {number}   seconds   总计时秒数
	 * @param  {number}   execution 倒计时运行过程中的执行逻辑 (选传)
	 * @param  {Function} callback  时间走完后的回调函数 (选传)
	 * @return {[type]}            [description]
	 */
	function countDown(){
		var seconds = arguments[0] || 0,	// 总计时（s）
			length = arguments.length,
			execution,						// 计时过程中的执行逻辑
			callback;						// 回调

		if(length>1){
			callback = arguments[length-1];
		}

		if(length > 2){
			execution = arguments[1];
		}

		if(seconds>0){
			if(execution && typeof execution === 'function')execution();
			setTimeout(function(){
				seconds--;
				countDown(seconds,execution,callback);
			},1000);
		}else{
			if(callback && typeof callback === 'function')callback();
			return ;
		}
	}



// 自定义事件===================================================================================================================
// 需要完善，用单例模式改写
	function EventTarget(){
		if(!this.handles) this.handles = {};
	}
	EventTarget.prototype = {
		constructor : EventTarget,
		// 注册事件
		addHandle : function(type,handler){
			var type = type.toString(),
				handlesArr = this.handles[type];
			if(typeof handlesArr === 'undefined')handlesArr = this.handles[type] = [];
			if(typeof handler === 'function')handlesArr.push(handler);
		},

		// 移除事件
		removeHandler : function(type,handler){
			var type = type.toString(),
				handlesArr = this.handles[type],i,len;
			if(typeof handler === 'undefined'){
				this.handles[type] = void(0);
				return ;
			}
			if(Array.isArray(handlesArr)){
				for(i=0,len=handlesArr.length;i<len;i++){
					if(handlesArr[i]===handler){
						handlesArr.splice(i,1);
						break;
					}
				}
			}
		},

		// 触发事件
		trigger : function(event){
			if(!event.target){
				event.target = this;
			}
			var type = event.type.toString(),
				handlesArr = this.handles[type],i,len;
			if(Array.isArray(handlesArr)){
				for(i=0,len=handlesArr.length;i<len;i++){
					handlesArr[i].call(event.target,event);
				}
			}
		}
	};





// 辅助绑定函数===================================================================================================================
function bind(fn,obj){
	return function(){
		return fn.apply(obj,arguments);
	}
}




// cavas图片压缩===================================================================================================================
function imgResize(file,callback){
	var fileReader = new FileReader();
	fileReader.onload = function(){
	    var IMG = new Image();
	    IMG.src = this.result;
	    IMG.onload = function(){
	      var w = this.naturalWidth, h = this.naturalHeight, resizeW = 0, resizeH = 0;
	      // maxSize 是压缩的设置，设置图片的最大宽度和最大高度，等比缩放，level是报错的质量，数值越小质量越低
	      var maxSize = {
	        width: 500,
	        height: 500,
	        level: 0.6
	      };
	      if(w > maxSize.width || h > maxSize.height){
	        var multiple = Math.max(w / maxSize.width, h / maxSize.height);
	        resizeW = w / multiple;
	        resizeH = h / multiple;
	      } else {
	        // 如果图片尺寸小于最大限制，则不压缩直接上传
	        return callback(IMG)
	      }
	      var canvas = document.createElement('canvas'),
	      ctx = canvas.getContext('2d');
	      if(window.navigator.userAgent.indexOf('iPhone') > 0){
	        canvas.width = resizeH;
	        canvas.height = resizeW;
	        ctx.rotate(90 * Math.PI / 180);
	        ctx.drawImage(IMG, 0, -resizeH, resizeW, resizeH);
	      }else{
	        canvas.width = resizeW;
	        canvas.height = resizeH;
	        ctx.drawImage(IMG, 0, 0, resizeW, resizeH);
	      }
	      var base64 = canvas.toDataURL('image/jpeg', maxSize.level);
	      convertBlob(window.atob(base64.split(',')[1]), callback);
	    }
	  };
	  fileReader.readAsDataURL(file);
}

// base64转换二进制
function convertBlob(base64, callback){
  var buffer = new ArrayBuffer(base64.length);
  var ubuffer = new Uint8Array(buffer);
  for (var i = 0; i < base64.length; i++) {
    ubuffer[i] = base64.charCodeAt(i)
  }
  var blob;
  // android设备不支持Blob构造函数，用try catch
  try {
    blob = new Blob([buffer], {type: 'image/jpg'});
  } catch (e) {
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
    if(e.name === 'TypeError' && window.BlobBuilder){
      var blobBuilder = new BlobBuilder();
      blobBuilder.append(buffer);
      blob = blobBuilder.getBlob('image/jpg');
    }
  }
  callback(blob);
}




// 判空函数==================================================================================================================
	
	/**
	 * 判空函数
	 * @param  {number}   seconds   总计时秒数
	 * @param  {number}   execution 倒计时运行过程中的执行逻辑 (选传)
	 * @param  {Function} callback  时间走完后的回调函数 (选传)
	 * @return {[type]}            [description]
	 */
function empty(obj){
	
}







