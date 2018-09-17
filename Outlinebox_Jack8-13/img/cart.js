document.addEventListener('DOMContentLoaded',function(){
	var McartList = document.getElementById('McartList');

	//获取cookie
	var cookies = Cookie.get('cartlist');

	//若cookie存在则写入cartList
	//不存在则赋值空数组
	var cartList = [];
	if(cookies.length>0){
		 cartList= JSON.parse(cookies);
	}
	

	var totalPrice = 0;
	var reSaving = 0;
	var resTotal = 0;
	var resSaving = 0;
	//生成html结构
	var ul = document.createElement('ul');
	ul.innerHTML = cartList.map(function(item){
		totalPrice = item.sale*item.qty;
		resTotal += item.sale*item.qty;
		resSaving += (item.price-item.sale)*item.qty;
		reSaving = (item.price-item.sale)*item.qty;

		return `
			<li data-guid="${item.guid}">
				
				<img src="${item.imgurl}" />
				<div class='Information'>
					<p>${item.name};${item.details}</p>
					<p>ID:#${item.guid}</p>
					<p>Size:defualt</p>
				</div>
				
				
				
				<div id='Mquality'>
					<div class='border'>
						<button id='reduce'>-</button><span>${item.qty}</span><button id='add'>+</button>	
					</div>	
				</div>

				<div class='Price'>
					<p>原价：<del>${item.price}.00</del></p>
					<p>现价：<span class="price">${item.sale}.00</span></p>
				</div>

				<div class='SUM'>
					<p class='totalPrace'>${totalPrice}.00</p>
					<p class='Savingword'>You save <span class='Saving'>${item.price-item.sale}.00</span></p>
				</div>
				
				<button class='btn-close'>&times;</button>
			</li>
		`
	}).join('');

	//把ul写入页面
	McartList.appendChild(ul);

	
	//点击按钮删除商品
	McartList.onclick = function(e){

		e = e || window.event;
		var target = e.target || e.srcElement;

		if(target.className==='btn-close'){
			var currentLi = target.parentNode;
			var currentguid = currentLi.getAttribute('data-guid');

			//先遍历数据找出对应Licookie
			cartList.forEach(function(item,idx){
				if(item.guid===currentguid){
					cartList.splice(idx,1);
				}
			})
			//重写cookie
			var now = new Date();
			now.setDate(now.getDate()+8);
			Cookie.set('cartlist',JSON.stringify(cartList),now,'/');

			//删除DOM节点
			currentLi.parentNode.removeChild(currentLi);
		}

		//点击加号
		if(target.id==='add'){
			var currentLi = target.parentNode.parentNode.parentNode;
			var currentguid = currentLi.getAttribute('data-guid');
			
			//遍历找出对应cookie
			cartList.forEach(function(item,idx){
				if(item.guid===currentguid){
					// if(item.qty>0){
						item.qty++;
					// }
					target.parentNode.children[1].innerHTML = item.qty;
					//更新cookie。totalPrice
					var now = new Date();
					now.setDate(now.getDate()+8);
					Cookie.set('cartlist',JSON.stringify(cartList),now,'/');
					currentLi.children[4].children[0].innerHTML = item.sale*item.qty + '.00';
					currentLi.children[4].children[1].children[0].innerHTML = (item.price-item.sale)*item.qty + '.00';
				}
			})
		}

		//点击减号
		if(target.id==='reduce'){
			var currentLi = target.parentNode.parentNode.parentNode;
			var currentguid = currentLi.getAttribute('data-guid');
			
			//遍历找出对应cookie
			cartList.forEach(function(item,idx){
				if(item.guid===currentguid){
					if(item.qty>0){
						item.qty--;
					}
					if(item.qty==0){
						currentLi.parentNode.removeChild(currentLi);
						//先遍历数据找出对应Licookie
						cartList.forEach(function(item,idx){
							if(item.guid===currentguid){
								cartList.splice(idx,1);
							}
						})
						//重写cookie
						var now = new Date();
						now.setDate(now.getDate()+8);
						Cookie.set('cartlist',JSON.stringify(cartList),now,'/');

								}
								target.parentNode.children[1].innerHTML = item.qty;
								var now = new Date();
								now.setDate(now.getDate()+8);
								Cookie.set('cartlist',JSON.stringify(cartList),now,'/');
								currentLi.children[4].children[0].innerHTML = item.sale*item.qty + '.00';
							}
						})
		}
		resTotal =0;
		resSaving =0;
		cartList.forEach(function(item){
			resTotal += item.sale*item.qty;
			resSaving += (item.price-item.sale)*item.qty;
		})
		 AllTotal.innerHTML = '￥' + resTotal+'.00';
	 	AllSaving.innerHTML = resSaving+'.00';
	}

	var AllTotal = document.getElementsByClassName('AllTotal')[0];
	var AllSaving = document.getElementsByClassName('AllSaving')[0];
	
	 AllTotal.innerHTML = '￥' + resTotal+'.00';
	 AllSaving.innerHTML = resSaving+'.00';

	 //热门商品
	var arr_hot = [
	 	{
	 		guid:017,
            name:'Nikon/尼康 D750 尼康 数码单反 d750 单反照相机 家用相机分期购',     
            price:9360,   
            sale:2434,    
            imgurl:'img/a8.jpg',       
            details:'苹果公司于2015年9月11号凌晨的苹果发布会上正式发布。'
	 	},
	 	{
	 		guid:018,
            name:'【实在山东人】国行 Canon/佳能m3 微单相机 EOS M3 15-45STM镜头',      
            price:2699,    
            sale:2348,   
            imgurl:'img/a2.jpg',       
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'
        },
	 	{
	 		guid:019,
            name:'Canon/佳能 EOS 6D 单机 6D机身 带WIFI GPS 全新正品 四码合一',      
            price:7100,    
            sale:4566,   
            imgurl:'img/a7.jpg',       
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'
	 	},
	 	{
	 		guid:020,
            name:'CHUWI/驰为 Hi12 双系统 64GB Win10平板电脑12英寸PC超极本轻薄',      
            price:1449, 
            sale:342,      
            imgurl:'img/2.jpg',        
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'   
	 	},
	 	{
	 		guid:021,
            name:'现货速发CHUWI/驰为 Hi10 Pro 64GB Win10手写双系统办公平板电脑',      
            price:969,   
            sale:345,     
            imgurl:'img/4.jpg',        
            details:'苹果公司于2015年9月11号凌晨的苹果发布会上正式发布。'
	 	},
	 	{
	 		guid:022,
            name:'【实在山东人】国行 Canon/佳能m3 微单相机 EOS M3 15-45STM镜头',      
            price:2699,    
            sale:2348,   
            imgurl:'img/a2.jpg',       
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'
	 	},
	 	{
	 		guid:023,
            name:'Nikon/尼康 D750 尼康 数码单反 d750 单反照相机 家用相机分期购',     
            price:9360,   
            sale:2434,    
            imgurl:'img/a8.jpg',       
            details:'苹果公司于2015年9月11号凌晨的苹果发布会上正式发布。'
	 	},
	 	{
	 		guid:024,
            name:'Canon/佳能 EOS 6D 单机 6D机身 带WIFI GPS 全新正品 四码合一',      
            price:7100,    
            sale:4566,   
            imgurl:'img/a7.jpg',       
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'
	 	},
	 	{
	 		guid:025,
            name:'日本代购佳能 EOS 100D白色18-55单反相机kiss X7',        
            price:1998,   
            sale:345,    
            imgurl:'img/a6.jpg',       
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'
	 	},
	 	{
	 		guid:026,
            name:'16年产 佳能 EF 24-70mm f/2.8L II USM 镜头 24-70 F2.8 二代',        
            price:9760,   
            sale:5647,    
            imgurl:'img/a5.jpg',       
            details:'苹果公司于2015年9月11号凌晨的苹果发布会上正式发布。'
	 	},
	 	{
	 		guid:027,
            name:'Sony/索尼 ILCE-6000L',       
            price:3098,       
            sale:678,
            imgurl:'img/a4.jpg',       
            details:'苹果公司于2015年9月11号凌晨的苹果发布会上正式发布。'
	 	},
	 	{
	 		guid:028,
            name:'【大象摄影】国行尼康入门专业数码单反相机D5300 18-55带WiFi',     
            price:2770,   
            sale:678,    
            imgurl:'img/a3.jpg',       
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'
	 	}
	];

	 var Hotitems = document.getElementsByClassName('Hotitems')[0];
	 var hotul = document.createElement('ul');
	 //遍历数据写入页面
	 hotul.innerHTML = arr_hot.map(function(item){
	 	return `
			<li data-guid="${item.guid}">
				<a><img src="${item.imgurl}" alt="" class="links"/></a>
				<p>${item.name}</p>
				<p>
					<del class='com'>${item.price}.00</del>
					<span class="price com">${item.sale}.00</span>
				</p>
				<div class='ADD'><a href="html/xqy.html">Add to <img src="img/Hotitems.jpg" alt="" /></a></div>
			</li>
	 	`
	 }).join('');

	 Hotitems.appendChild(hotul);

	
            //将商品展示的对象存入goods展示商品cookie
            var arr_goods = [];
            //事件委托 点击存入展示详情页的cookie
            Hotitems.onclick = function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                
               
                if(target.className === 'ADD'){
                	var currentLi = target.parentNode;
                	var guid = currentLi.getAttribute('data-guid');
                    var goods = {
	                    guid:guid,
	                    imgurl:currentLi.children[0].children[0].src,       
	                    name:currentLi.children[1].innerText,       
	                    price:currentLi.children[2].children[0].innerText,       
	                    sale:currentLi.children[2].children[1].innerText,
	                   	details:currentLi.children[1].innerText
	                };
                };
                    arr_goods = [goods];
                    document.cookie = 'goods=' + JSON.stringify(arr_goods) +'; path=/'; 
            }

            var prev = document.querySelector('.prev');
            var next = document.querySelector('.next');
            var hotitemsbg = document.querySelector('.hotitemsbg');
			
            hotitemsbg.onclick = function(e){
            	e = e || window.event;
            	var target = e.target|| e.srcElement;
            	if(target.className.toLowerCase() === 'prev'){
     				
     				if(hotul.style.left == '-600px'){
     					animate(hotul,{left:0});
     				}
     				else {
     					animate(hotul,{left:-600});
     				}
     				
            	}
            	if(target.className.toLowerCase() === 'next'){
     				
     				if(hotul.style.left == '-600px'){
     					animate(hotul,{left:-993});
     				}else if(hotul.style.left == '0px'){
     					animate(hotul,{left:-600});
     				}else if(hotul.style.left == '-993px'){
     					animate(hotul,{left:-600});
     				}	
            	}
    		}
    
})













































