"use strict";



var customEvent = new EventTarget(),
	time = 10,
	timer = document.getElementById('time');




countDown(time,function(){
	timer.innerText = time--;
},function(){
	timer.innerText = 0;
	window.location.href = "http://www.milightblog.com";
})