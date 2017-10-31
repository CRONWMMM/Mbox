
/*!
 *
 * lazyload - jQuery plugins for lazy loading images
 * It was modified on the basis of the jQuery-lazyload
 * Modifier: CRONWMMM
 *
 */

;(function($,window,document,undefined){
	var $window = $(window);
	$.fn.lazyload = function(options){
		var $elements  = this,
			$container = null,
			delayTime  = 0,						// 滚动的延迟处理时间
			settings   = {
				threshold       : 0,			// 加载零界值
				event			: 'scroll',		// 加载触发事件
				effect			: 'fadeIn',		// 图片进入方式
				container		: window,		// 容器
				data_attribute  : "src",		// 属性标志
				placeholder		: "",			// 占位图片地址
				appear			: null,			// 触发appear事件的回调函数
				load			: null			// 触发load事件执行的回调函数
			};

		// 传递了参数对象就合并到settings上
		if(options && typeof options === 'object'){
			$.extend(settings,options);
		}

		$container = (settings.container === undefined ||
					  settings.container === window) ? $(window) : $(settings.container);

		if(settings.event === 'scroll'){
			$container.on('scroll',function(){
				clearTimeout(delayTime);
				delayTime = setTimeout(update,100);
			});
		}

		$elements.each(function(i){
			var self    = this,
				$self = $(this);
			self.loaded = false;
			$self.one("appear",function(){
				// 第一次加载情况下
				if(!this.loaded){
					// 如果有appear的回调函数
					if(settings.appear && typeof settings.appear === 'function'){
						settings.appear.call(this,$elements.length,settings);
					}
					// 如果用户传入klassName属性，则判断通过添加背景图样式类懒加载
					if(settings.klassName){
            /*针对添加背景图类来懒加载情况*/
            $self.addClass(settings.klassName);
          }else{
            $('<img>')
              .one('load',function(){
                var data_attribute = $self.data(settings.data_attribute);
                $self.hide();
                if($self.is('img')){
                  $self.attr('src',data_attribute);
                }else{
                  $self.css({
                    "background-image" : "url('"+ data_attribute +"')"
                  });
                }
                $self[settings.effect]();
              })
              .attr('src',$self.data(settings.data_attribute));
          }
				}
			});
		});

		$window.on("resize", function() {
            update();
        });

		function update(){
			$elements.each(function(i){
				var $this = $(this);
				// 当前元素位置位于或者过了可视区域上方
				if(abovethetop(this,settings)){
					// Nothing
				}else{
					$this.trigger("appear");
				}
			});
		}

		function abovethetop(element,settings){
			var fold;
			fold = $container.scrollTop() + $container.height();
			return (fold <= $(element).offset().top + settings.threshold);
		}
		return this;
	}
})(jQuery,window,document);
