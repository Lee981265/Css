/*
	封装注意事项
		* 避免报错
		* 兼容性
		* 单一性：功能单一化，一个函数只做一件事情
 */

/**
 * [获取一个范围内随机整数的方法]
 * @param  {Number} min [最小数]
 * @param  {Number} max [最大数]
 * @return {Number}     [返回的随机整数]
 */
function randomNumber(min,max){
	return parseInt(Math.random()*(max-min+1))+min;
}

/**
 * [随机颜色rgb]
 * @return {String} [返回rgb(255,0,0)格式的颜色]
 */
function randomColor(){
	// rgb(255,0,0)

	// var r = parseInt(Math.random()*256);
	// var g = parseInt(Math.random()*256);
	// var b = parseInt(Math.random()*256);

	// 利用封装好的函数
	var r = randomNumber(0,255);
	var g = randomNumber(0,255);
	var b = randomNumber(0,255);


	var res = 'rgb(' + r + ',' + g + ',' + b + ')';

	return res;
}

/**
 * [获取随机验证码]
 * @return {String} [返回随机验证码]
 */
function vCode(){
	var arr_char = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');

	var res = '';
	for(var i=0;i<4;i++){
		// 获取随机索引值
		var idx = parseInt(Math.random()*arr_char.length);

		// 根据索引值获取字符，并拼接
		res += arr_char[idx];
	}

	return res;
}

/**
 * [获取当前元素得前一个元素]
 * @param  {Element} ele [当前元素]
 * @return {Element}     [返回前一个元素]
 */
function getPreviousElement(ele){
	var res = ele.previousSibling;

	// 当前一个节点不是元素时
	if(res && res.nodeType != 1){
		res = res.previousSibling;
	}

	return res;
}

/**
 * [获取当前元素得下一个元素]
 * @param  {Element} ele [当前元素]
 * @return {Element}     [返回下一个元素]
 */
function getNextElement(ele){
	var res = ele.nextSibling;

	if(res && res.nodeType != 1){
		res = res.nextSibling;
	}

	return res;
}

/**
 * [获取子元素]
 * @param  {Element} ele [当前元素]
 * @return {Array} [返回元素节点]
 */
function getChildren(ele){
	var arr = ele.childNodes;

	// 过滤
	var res =  [];
	for(var i=0;i<arr.length;i++){
		if(arr[i].nodeType == 1){
			res.push(arr[i]);
		}
	}

	return res;
}

function getFirstElementChild(){

}
function getLastElementChild(){

}

/**
 * [通过类名获取元素]
 * @param  {String} className [类名]
 * @param  {[Element]} ele [获取这个元素下代className类名元素]
 * @return {[type]}           [description]
 */
function getElementsByClassName(className,ele){
	// 判断是否支持getElementsByClassName()
	var res;

	// 判断是否传入ele
	if(!ele){
		ele = document;
	}

	// 支持
	if(ele.getElementsByClassName){
		res = ele.getElementsByClassName(className)
		return res;
	}

	/*
		如果当前浏览器不支持getElementsByClassName
		思路：
			1、通过标签名获取所有元素
				getElementsByTagName()
			2、过滤不包含className的元素
	*/
	var arr = ele.getElementsByTagName('*');
	res = [];
	for(var i=0;i<arr.length;i++){
		// 判断当前元素是否包含className这个类名
		if(arr[i].className.indexOf(className) >= 0){
			res.push(arr[i]);
		}
	}

	return res;
}
//getElementsByClassName('box');
// getElementsByClassName('box',footer);

/**
 * [获取元素css样式，兼容ie8-]
 * @param  {Element} ele  [获取样式的元素]
 * @param  {String} attr [css属性名]
 * @return {String}      [css属性值]
 */
function getCss(ele,attr){
	// 判断浏览器是否支持getComputedStyle
	if(window.getComputedStyle){
		return getComputedStyle(ele)[attr];
	}

	// ie8-
	else if(ele.currentStyle){
		return ele.currentStyle[attr];
	}

	// 返回内联样式
	else{
		return ele.style[attr];
	}

}
// getCss(box,'font-size');//16px

/**
 * [给元素添加事件的方法，支持事件捕获，兼容ie8-]
 * @param {Element} ele     [绑定事件的元素]
 * @param {String} type    [事件类型]
 * @param {Function} handler [事件处理函数]
 * @param {[Boolean]} capture [是否捕获]
 */
function addEvent(ele,type,handler,capture){
	// 判断当前浏览器是否支持addEventListener()
	if(ele.addEventListener){
		ele.addEventListener(type,handler,capture);
	}

	// ie8-
	else if(ele.attachEvent){
		ele.attachEvent('on' + type,handler);
	}

	// 其他浏览器
	else{
		ele['on' + type] = handler;
	}
}
// addEvent(box,'click',function(){},true);
// 给div添加一个点击事件


/*
	封装Cookie的增删查改
		* 添加 setCookie()
		* 删除 removeCookie()
		* 读取 getCookie()
		* 修改 利用setCookie()
	利用对象封装
		Cookie
			* set()
			* get()
			* remove()
 */

// 利用对象封装
var Cookie = {
	/**
	 * [设置cookie]
	 * @param {String} name    [cookie名]
	 * @param {String} val     [cookie值]
	 * @param {[Date]} expires [有效期]
	 * @param {[String]} path    [cookie路径]
	 */
	set:function(name,val,expires,path){
		// document.cookie = 'cartlist=1234;expires=' + now
		var cookieStr = name + '=' + val;

		// 有效期
		if(expires){
			cookieStr += ';expires=' + expires.toUTCString();
		}

		// 设置路径
		if(path){
			cookieStr += ';path=' + path;
		}

		// 写入
		document.cookie = cookieStr;
	},
	get:function(name){
		// 先获取所有cookie
		var cookie = document.cookie;
		if(cookie.length === 0){
			return '';
		}

		// 拆分成数组
		cookie = cookie.split('; ');

		// 遍历cookie，找到想要的cookie值
		var res = '';
		cookie.forEach(function(item){
			var arr = item.split('=');

			if(arr[0] === name){
				res = arr[1];
			}
		});

		return  res;
	},
	remove:function(name){
		// 利用设置过期时间达到删除的效果。
		var now = new Date();
		now.setDate(now.getDate()-100);

		// document.cookie = name +'=xxx;expires=' + now.toUTCString();
		Cookie.set(name,null,now);
	}
}

// 使用
// Cookie.set('cartlist','1234',now);
// Cookie.set('cartlist','1234');
// Cookie.get('cartlist');//1234
// Cookie.remove('cartlist');

/**
 * [动画函数]
 * @param  {Element} ele    [动画元素]
 * @param  {String} attr   [css属性]
 * @param  {Number} target [目标值]
 */
/*function animate(ele,attr,target){
	var timerName = attr + 'timer';
	clearInterval(ele[timerName]);
	ele[timerName] = setInterval(function(){
		// 获取当前值
		var current = getCss(ele,attr);//10px,0.5,20em,2.4rem,40deg

		// 提取单位
		var unit = current.match(/[a-z]+$/);
		unit = unit ? unit[0] : '';

		// 提取值
		current = parseFloat(current);


		// 计算速度（最小变化值：1/-1）
		// 避免速度变成0
		var speed = (target-current)/10;
		speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);

		// 到达目标值后清除动画定时器
		if(current === target || speed === 0){
			clearInterval(ele[timerName]);
		}

		ele.style[attr] = current + speed + unit;
	},30);
}*/
// animate(box,'left',800);//2s
// animate(box,'top',200);//5s

/**
 * [动画函数]
 * @param  {Element} ele    [动画元素]
 * @param  {Object} opt   [动画属性集合]
 * @param  {Function} callback   [回调函数]
 */
function animate(ele,opt,callback){
	//如何确定哪个属性是最后完成的动画

	// 动画数量
	var timerQty = 0;

	//遍历属性
	for(var attr in opt){
		createTimer(attr);
		timerQty++;
	}
	function createTimer(attr){
		// 根据属性定义定时器名字
		var timerName = attr + 'timer';
		// 获取目标值
		var target = opt[attr];
		clearInterval(ele[timerName]);
		ele[timerName] = setInterval(function(){
			// 获取当前值
			var current = getCss(ele,attr);//10px,0.5,20em,2.4rem,40deg
			// 提取单位
			var unit = current.match(/[a-z]+$/);
			unit = unit ? unit[0] : '';
			// 提取值
			current = parseFloat(current);
			// 计算速度（最小变化值：1/-1）
			// 避免速度变成0
			var speed = (target-current)/5;
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);

			// 针对opacity属性计算速度
			if(attr === 'opacity'){
				speed = speed>0 ? 0.01 : -0.01;
			}

			// 到达目标值后清除动画定时器
			if(current === target || speed === 0){
				clearInterval(ele[timerName]);

				// 重置目标值
				current = target - speed;

				// 动画完成数量减一
				timerQty--;


				// 执行回调函数
				if(timerQty===0 && typeof callback === 'function'){
					callback();
				}
			}

			ele.style[attr] = current + speed + unit;
		},30);
	}
}
function create(par){
    var ul = document.createElement('ul');
    ul.className = 'clear sy_slideul';
    ul.innerHTML = arr1.map(function(item){
        return '<li>'
                +'<img  class="links" src="./'+item.imgurl+'" alt="" />'
                +'<h4 class="title">'+item.name+'</h4>'
                +'<p class="price">价格：￥<del>'+item.price+'</del></p>'
                +'<p class="sale">优惠后:<span>'+item.sale+'</span></p>'
                +'<p class="save">节约:'+(item.price-item.sale).toFixed(2)+'</p>'
                +'</li>';
    }).join('');
    par.appendChild(ul);
}
var arr1 = [
        {
            guid:001,
            name:'iPad Pro 9.7寸',        
            price:3188, 
            sale:2199,      
            imgurl:'img/1.jpg',        
            details:'苹果公司于2015年9月11号凌晨的苹果发布会上正式发布。'
        },
        {   
            guid:002,
            name:'Win10平板电脑12英寸PC超极本轻薄',      
            price:1449, 
            sale:342,      
            imgurl:'img/2.jpg',        
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'   
        },
        {
            guid:003,
            name:  'iPad mini 4',      
            price:2368,  
            sale:2344,     
            imgurl: 'img/3.jpg',        
            details: '800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'  
        },
        {
            guid:004,
            name:'64GB Win10手写双系统办公平板电脑',      
            price:969,   
            sale:345,     
            imgurl:'img/4.jpg',        
            details:'苹果公司于2015年9月11号凌晨的苹果发布会上正式发布。'
         },
        {
            guid:005,
            name:'iPad mini 4',      
            price:2638,   
            sale:2345,    
            imgurl:'img/5.jpg',        
            details:'苹果公司于2015年9月11号凌晨的苹果发布会上正式发布。',
        },
        {
            guid:006,
            name:'Surface Book',     
            price:7788, 
            sale:3453,      
            imgurl:'img/6.jpg',        
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'
        },
        {
            guid:007,
            name:'iPad Pro 12.9寸',       
            price:4688,   
            sale:2345,    
            imgurl:'img/7.jpg',        
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'
        },
        {
            guid:008,
            name:'Microsoft/微软 Surface Pro 4 i5 WIFI 128GB 二合一平板电脑',     
            price:3988.01,  
            sale:3453,      
            imgurl:'img/8.jpg',        
            details:'苹果公司于2015年9月11号凌晨的苹果发布会上正式发布。'
        },
        {
            guid:009,
            name:'Canon/佳能入门级高清数码单反相机 EOS 1300D带WIFI',     
            price:1738,   
            sale:236,    
            imgurl:'img/a1.jpg',       
            details:'苹果公司于2015年9月11号凌晨的苹果发布会上正式发布。',
        },
        {
            guid:010,
            name:'国行 Canon/佳能m3 微单相机 EOS M3 15-45STM镜头',      
            price:2699,    
            sale:2348,   
            imgurl:'img/a2.jpg',       
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'
        }
    ];