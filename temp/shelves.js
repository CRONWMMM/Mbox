/**
 * Created by CRONWMMM on 2017/12/6.
 */

;(function (global, $, doc) {


// 注册数据驱动 ==========================================================================================================================

    var CRONWMMM = (function ($) {

        // 模仿 Vue 进行数据绑定
        // 由于没有模板编译这环，所有数据格式必须写成 value 和 bind 包裹的对象
        // name 为唯一标识符
        // value 为值
        // bind 为绑定元素
        // wather 为监听对象，to : 要监听的数据， callback : 回调
        var data = {
            title: {
                name: 'title',
                value: '一层',
                bind: 'header h4 span'
            },
            sumPrice: {
                name: 'sumPrice',
                value: 0,
                bind: '#total-price'
            },
            sumNumber: {
                name: 'sumNumber',
                value: 0,
                bind: '#number',
                show: {
                    name: 'showSumNumber',
                    value: true,
                    bind: '#number',
                    watcher: {
                        to: 'sumNumber',
                        callback: function () {
                            console.log('hello ')
                        }
                    }
                }
            },
            layerList: [
                {
                    value: '一层',
                    bind: '.layer-wrap .layer'
                },
                {
                    value: '二层',
                    bind: '.layer-wrap .layer'
                },
                {
                    value: '三层',
                    bind: '.layer-wrap .layer'
                }
            ],
            goodsList: [
                {
                    goodsName: {
                        value: '辣条',
                        bind: '.goods .desc .name'
                    },
                    price: {
                        value: 29.9,
                        bind: '.goods .price span'
                    }
                },
                {
                    goodsName: {
                        value: '红烧鸡翅膀',
                        bind: '.goods .desc .name'
                    },
                    price: {
                        value: 29.9,
                        bind: '.goods .price span'
                    }
                },
                {
                    goodsName: {
                        value: 'durex',
                        bind: '.goods .desc .name'
                    },
                    price: {
                        value: 66.2,
                        bind: '.goods .price span'
                    }
                },
                {
                    goodsName: {
                        value: '星巴克咖啡',
                        bind: '.goods .desc .name'
                    },
                    price: {
                        value: 19.9,
                        bind: '.goods .price span'
                    }
                },
                {
                    goodsName: {
                        value: '红烧鸡翅膀',
                        bind: '.goods .desc .name'
                    },
                    price: {
                        value: 29.9,
                        bind: '.goods .price span'
                    }
                },
                {
                    goodsName: {
                        value: '红烧鸡翅膀',
                        bind: '.goods .desc .name'
                    },
                    price: {
                        value: 29.9,
                        bind: '.goods .price span'
                    }
                },
                {
                    goodsName: {
                        value: '红烧鸡翅膀',
                        bind: '.goods .desc .name'
                    },
                    price: {
                        value: 29.9,
                        bind: '.goods .price span'
                    }
                },
                {
                    goodsName: {
                        value: '红烧鸡翅膀',
                        bind: '.goods .desc .name'
                    },
                    price: {
                        value: 29.9,
                        bind: '.goods .price span'
                    }
                },
                {
                    goodsName: {
                        value: '红烧鸡翅膀',
                        bind: '.goods .desc .name'
                    },
                    price: {
                        value: 29.9,
                        bind: '.goods .price span'
                    }
                },
                {
                    goodsName: {
                        value: '红烧鸡翅膀',
                        bind: '.goods .desc .name'
                    },
                    price: {
                        value: 29.9,
                        bind: '.goods .price span'
                    }
                }
            ],
            shopList: [],
            mask: {
                name: 'mask',
                value: false,
                bind: '#mask'
            },
            popUp: {
                name: 'popup',
                value: false,
                bind: '#popup'
            }
            /*
                {
                    goodsName: {
                        value: '辣条',
                        bind: '#shopList .things .name'
                    },
                    price: {
                        value: 0.5,
                        bind: '#shopList .things .price span'
                    },
                    num: {
                        value: 10,
                        bind: '#shopList .things .num'
                    },
                    show: {
                        value: true,
                        bind: '#shopList .things'
                    }
                }
             */
        };

        (function (target, to, extend) {

            target.forEach(function (el, i) {
                var obj = extend(el, true);
                obj.goodsName.bind = '#shopList .things .name';
                obj.price.bind = '#shopList .things .price span';
                obj.num = {
                            value: 0,
                            bind: '#shopList .things .num'
                          };
                obj.show = {
                            value: false,
                            bind: '#shopList .things'
                           };
                to.push(obj);
            });

        })(data.goodsList, data.shopList, extend);

        var watcher = {
            pool: {},
            add: function (name, callback) {
                if (this.pool[name]) {
                    this.pool[name].push(callback);
                }else{
                    this.pool[name] = [callback];
                }
            },
            trigger: function (name) {
                var handlesList = this.pool[name];
                if (!handlesList) return;
                for (var i = 0, len = handlesList.length; i < len; i++) {
                    handlesList[i]();
                }
            }
        };

        // 注册 directive
        var directive = {
            changeValue: function ($bind, val) {        // 改变text
                $bind.attr('data', val);
                $bind.text(val);
            },
            toggleValue: function ($bind, val) {        // 切换显示隐藏
                $bind.attr('data', val);
                if (val) {
                    $bind.removeClass('hide');
                    // $bind.css('opacity',1);
                }else {
                    $bind.addClass('hide');
                    // $bind.css('opacity',0);
                }
            }
        };

        // 进行get/set映射
        scanObj(data, function (key, i) {
            var self = this,
                num = i,
                $bind = typeof i === 'number' ? $(self.bind).eq(num) : $(self.bind),
                key = key,
                value = self[key];
            Object.defineProperty(self, key, {
                get: function () {
                    return typeof $bind.text() !== 'undefined' ? $bind.text() : $bind.attr('data');
                },
                set: function (val) {

                    // 先遍历 watcher 的监听池，看有没有绑定事件需要执行
                    for (var i in watcher.pool) {
                        if (i === self.name) watcher.trigger(i)
                    }

                    // 再读取该对象内部的 watcher ， 看看有没有需要监听的对象
                    if (self.watcher) {
                        var evtName = self.watcher.to,
                            callback = self.watcher.callback;
                        watcher.add(evtName, callback)
                    }

                    // directive 执行具体操作
                    if (typeof val === 'boolean') {         // 如果检测到值是boolean类型，说明是显示隐藏
                        directive.toggleValue($bind, val);
                    }else{                                  // 否则为 text 变换
                        directive.changeValue($bind, val);
                    }
                }
            });
            self[key] = value;
        });

        // 对象扫描，灵魂函数 =。=
        function scanObj (obj, i, callBack) {

            var obj = obj,
                i = i,      // 这块可能会传入数组索引，要判断
                callback = arguments.length > 2 ? callBack : i;

            if (Array.isArray(obj)) {   // isArray --- 这块有个坑，typeof Array 也是 object， 所以数组判断要放第一个
                obj.forEach(function (item, index, arr) {
                    scanObj(item, index, callback)
                });
            }
            else if (typeof obj === 'object') {     // isObject
                for (var key in obj) {
                    var item = obj[key],
                        type = typeof item,
                        filters = 'string number boolean';
                    if (type === 'object') {
                        if (typeof i !== 'function') {
                            scanObj(item, i, callback)
                        }else{
                            scanObj(item, callback)
                        }
                    }
                    else if (filters.indexOf(type) > -1) {
                        if (key === 'value') {
                            if (typeof i !== 'function') {
                                callback.call(obj, key, i)
                            }else {
                                callback.call(obj, key)
                            }
                        }
                    }
                }
            }
        }

        return data;
    })($);





// 注册事件代理对象 =======================================================================================================================

    var EvtProxy =(function (global) {
        var EvtProxy = function () {
            // event map
            this.evtMap = {
                'click body': bodyClick,
                'scroll .wrap': wrapScroll
            };
            this.evtInit();
        };
        EvtProxy.prototype = {
            constructor: EvtProxy,
            evtInit: function () {
                this._evtInject(this.evtMap)
            },
            _evtInject: function (maps) {   // 遍历evtMaps映射，注入事件
                var slitter = /^(\S+)\s*(.*|#*)$/;
                for (var key in maps) {
                    if (maps.hasOwnProperty(key)) {
                        var matchs = key.match(slitter),
                            self = this,
                            func = maps[key];
                        $(matchs[2]).on(matchs[1], func);
                    }
                }
            }
        };
        global.EvtProxy = EvtProxy;
        return EvtProxy;
    })(global);





// 计算器 =======================================================================================================================

    var Calc = (function (CRONWMMM) {
        var Calc = function () {};
        Calc.prototype = {
            constructor: Calc,
            addSumNumber: function () {
                var sum = CRONWMMM.sumNumber.value - 0;
                CRONWMMM.sumNumber.value = sum + 1;
            }
        };
        return Calc;
    })(CRONWMMM);




// 飞球构造函数 =======================================================================================================================

    var FltyBalls = (function (calc) {

        var FltyBalls = function (e) {
            this.e = e;
            // 记录各个运动时间
            this.during = {
                beginDelay:  10,         // 添加小球运动动画类的延迟时间
                flyDelay: 800            // 小球运动的时长
            };
            this.flyBall(e);
        };

        FltyBalls.prototype = {
            constructor: FltyBalls,
            flyBall: function (e) {                    // 初始执行函数
                var self = this,
                    $ball = self._create(),           // 创建
                    position = self._position(e);     // 定位
                self._fly($ball,position);            // 动画
            },
            _shakeIcon: function () {                 // 晃动图标
                var $el = $('#shopcart-icon');
                $el.addClass('icon-shake-animation');
            },
            _create: function () {                    // 创建小球
                var self = this,
                    $ball = $('<span class="add">1</span>');
                $(document.body).append($ball);
                return $ball;
            },
            _clear: function ($el) {                  // 清除小球
                var self = this;
                $el.remove();
            },
            _position: function (e) {                 // 计算小球各个位置参数
                var self = this,
                    $el = $(e.toElement),
                    $endEl = $('#number').eq(0),
                    x = $el.offset().left,
                    y = $el.offset().top,
                    endX = $endEl.offset().left,
                    endY = $endEl.offset().top;
                return {
                    x: x,
                    y: y,
                    endX: endX,
                    endY: endY
                };
            },
            _fly: function ($el,pos) {               // 让小球运动
                var self = this,
                    x = pos.x,
                    y = pos.y,
                    endX = pos.endX,
                    endY = pos.endY,
                    endStyles = {
                        'left': endX,
                        'top': endY
                    };        // 结束样式
                $el.css({
                    'position': 'absolute',
                    'left': x,
                    'top': y,
                    'font-size': '0.2rem'
                });     // 初始样式
                $el.addClass('flyBall');                  // 添加动画className
                setTimeout(function () {                  // 进入运动状态
                    self._enterMove($el,endStyles);
                },self.during.beginDelay);
            },
            _enterMove: function ($el,endStyles) {        // 小球进入运动状态
                var self = this;
                $el.css(endStyles);
                setTimeout(function () {    // 小球到达后
                    self._shakeIcon();
                    self._clear($el);
                    calc.addSumNumber.call(self);
                }, self.during.flyDelay)
            }
        };

        return FltyBalls;
    })(new Calc());






// 事件处理函数 =======================================================================================================================
    /* 事件执行函数 */
    function bodyClick (e) {
        // console.log(e.toElement);
        var $currentEl = $(e.toElement);
        if ($currentEl.hasClass('layer')){      // 层级切换
            _changeLayer(e);
        }
        else if ($currentEl.hasClass('addthisNum')) {   // 在购物车中增加商品个数
            _addNumInCart(e);
        }
        else if ($currentEl.hasClass('min')) {  // 在购物车中减少商品个数
            _minNumInCart(e);
        }
        else if ($currentEl.hasClass('add')) {  // 添加商品
            _addGoods(e);
        }
        else if ($currentEl[0].id === 'checkout') { // 结算
            _checkout(e);
        }
        else if ($currentEl[0].id === 'clearShopCart') { // 清空购物车
            _clearShopCart(e);
        }
        else if ($currentEl[0].id === 'shopcart-icon' || $currentEl[0].id === 'mask') {  // 打开购物车
            _togglePopUp.call($('#popup'));
            _toggleMask.call($('#mask'));
        }
    }

    function wrapScroll (e) {}

    // 层级切换
    function _changeLayer (e) {
        var $self = $(e.toElement),
            name = $self.text(),
            $list = $('li.layer');

        CRONWMMM.title.value = name;    // 改字
        _active();                      // 样式激活

        function _active () {    // 激活
            $list.each(function (i, el) {
                $(el).removeClass('layer-active');
            });
            $self.addClass('layer-active');
        }
    }

    // 添加商品
    function _addGoods (e) {
        var $icon = $('#shopcart-icon'),
            $el = $(e.toElement),
            $list = $('.goods'),
            index = (function ($list) {
                var cur = e.toElement,
                    $list = $list.find('.add');
                for (var i = 0, len = $list.length; i < len; i++) {
                    if ($list[i] === cur) {
                        return i;
                    }
                }
            })($list),
            thisPrice = CRONWMMM.goodsList[index].price.value;

            // 计算总价
            _addSumPrice(thisPrice);

            CRONWMMM.shopList[index].show.value = true;
            CRONWMMM.shopList[index].num.value = CRONWMMM.shopList[index].num.value-0+1;

            // 清除icon抖动的动画样式
            $icon.removeClass('icon-shake-animation');

            // flyBalls
            new FltyBalls(e);  

    }

    // 在购物车中增加商品个数
    function _addNumInCart (e) {
        var $icon = $('#shopcart-icon'),
            $el = $(e.toElement),
            $list = $('#shopList .things'),
            shopList = CRONWMMM.shopList,
            index = (function ($list) {
                var cur = e.toElement,
                    $list = $list.find('.add');
                for (var i = 0, len = $list.length; i < len; i++) {
                    if ($list[i] === cur) {
                        return i;
                    }
                }
            })($list),
            thisPrice = shopList[index].price.value,
            thisNum = shopList[index].num.value;

            

            // 计算总价
            _addSumPrice(thisPrice);


            // 改变数量
            CRONWMMM.sumNumber.value = (CRONWMMM.sumNumber.value-0)+1;
            shopList[index].num.value = shopList[index].num.value-0+1;
    }

    // 在购物车中减少商品个数
    function _minNumInCart (e) {
        var $el = $(e.toElement),
            $list = $('#shopList .things'),
            shopList = CRONWMMM.shopList,
            sumNumber = CRONWMMM.sumNumber,
            sumPrice = CRONWMMM.sumPrice,
            index = (function ($list) {
                var cur = e.toElement,
                    $list = $list.find('.min');
                for (var i = 0, len = $list.length; i < len; i++) {
                    if ($list[i] === cur) {
                        return i;
                    }
                }
            })($list),
            thisPrice = shopList[index].price.value,
            thisNum = shopList[index].num.value;
            if (thisNum > 0){
                shopList[index].num.value -= 1;
                sumNumber.value -= 1;
                sumPrice.value = floatTool.subtract(sumPrice.value, thisPrice);
                if (shopList[index].num.value == 0)  shopList[index].show.value = false;
            }else{
                shopList[index].show.value = false;
            }
                
    }

    // 结算
    function _checkout (e) {}

    // 计算总价
    function _addSumPrice (price) {
        var sumPrice = CRONWMMM.sumPrice.value;
        CRONWMMM.sumPrice.value = floatTool.add(sumPrice, price);
    }

    // 清空购物车
    function _clearShopCart (e) {
        var list = CRONWMMM.shopList;
        list.forEach(function (el, i) {
            el.num.value = 0;
            el.show.value = false;
        });
        _clearSumNumber();
        _clearSumPrice();
    }

    // 清空sumNumber
    function _clearSumNumber () {
        CRONWMMM.sumNumber.value = 0;
    }

    // 清空总价
    function _clearSumPrice () {
        CRONWMMM.sumPrice.value = 0;
    }

    // 切换popup的显示和隐藏
    function _togglePopUp () {
        if (this.height()) {
            this.height(0);
            setTimeout(function () {
                CRONWMMM.popUp.value = false;
            },400)
        }else{
            CRONWMMM.popUp.value = true;
            this.height('4rem')
        }
    }

    // 切换mask的显示和隐藏
    function _toggleMask () {
        var opacity = this.css('opacity') - 0,
            self = this;
        if (opacity) {
            this.css('opacity', 0);
            setTimeout(function () {
                CRONWMMM.mask.value = false;
            },400);
        }else{
            CRONWMMM.mask.value = true;
            setTimeout(function () {
                self.css('opacity', 1);
            },1)
        }
    }


// 初始运行程序 ===========================================================================================================================

    $(function () {
        var evtProxy = new EvtProxy();
    });

})(this, this.$, document);
