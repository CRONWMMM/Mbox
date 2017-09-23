/**

author: CRONWMMM
version: v0.0.1
date: 2017.9.22
*/



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

	/*对象拷贝*/







