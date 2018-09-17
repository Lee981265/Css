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