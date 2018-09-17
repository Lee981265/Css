document.addEventListener('DOMContentLoaded',function(){
	var MyAccount = document.querySelector('.MyAccount');
	var MyLink = document.querySelector('.MyLink');
	var MyCart = document.querySelector('.MyCart');
	var change = document.querySelector('.change');

	var avtive = document.querySelector('.avtive');
	

	//头部js
	MyAccount.onmouseover = function(){
		//清除延时器
		clearTimeout(MyAccount.timer);

		MyLink.style.display = 'block';
		MyAccount.style.backgroundColor = '#fff';
		MyAccount.firstElementChild.style.color = 'red';
		avtive.src = 'img/001.jpg';
	}

	MyAccount.onmouseout = function(){
		MyAccount.timer = setTimeout(function(){
			MyLink.style.display = 'none';
			MyAccount.style.backgroundColor = '';
			avtive.src = 'img/(3).jpg';
			MyAccount.firstElementChild.style.color = '#fff';
		},500)
	}
	
	
	
	
	 var cookies = Cookie.get('cartlist');
	 //若cookie存在则写入cartList
	//不存在则赋值空数组
	var cartList = [];
	if(cookies.length>0){
		 cartList= JSON.parse(cookies);
	}
	

	//生成html
	var ul_list = document.createElement('ul');
	ul_list.className = 'MyGoods';

	var reTotal = 0;
	ul_list.innerHTML = cartList.map(function(item){
		reTotal += item.sale*item.qty;
		return`
			<li>
				<span class='PIC'><img src="${item.imgurl}" alt="" /></span>
				<span class='Mdetails'>
					<span class='goodsname'>${item.name};</span></br>
					<b class="price">${item.sale} &times; ${item.qty}</b>
				</span>
			</li>
		`
	}).join('');
	var LIBtn = document.createElement('li');
	LIBtn.innerHTML = `
		<div class='cartBtn'>
            <div class='mctotal'>Subtotal:<span class='price'>￥${reTotal}.00</span></div>
            <a href="html/cart.html"><button class='mcBtn'>Checkout</button></a>
        </div>
	`;
	ul_list.appendChild(LIBtn);

	//写入页面
	MyCart.appendChild(ul_list);

	var QTY = document.getElementsByClassName('QTY')[0];
	var SUM = document.getElementsByClassName('tr')[1];

	QTY.innerText = cartList.length;
	SUM.innerText = reTotal+'.00';
	
	var MyGoods = document.querySelector('.MyGoods');
	var change = document.querySelector('.change');
	MyCart.onmouseover = function(){
		//清除延时器
		clearTimeout(MyCart.timer);

		MyGoods.style.display = 'block';
		MyCart.style.backgroundColor = '#fff';
		MyCart.firstElementChild.style.color = 'red';
		change.src = 'img/001.jpg';
	}

	MyCart.onmouseout = function(){
		MyCart.timer = setTimeout(function(){
			MyGoods.style.display = 'none';
			MyCart.style.backgroundColor = '';
			change.src = 'img/(3).jpg';
			MyCart.firstElementChild.style.color = '#fff';
		},500)
	}

	//二级菜单js
	var nav_btn = document.querySelector('#nav_btn');
	var navlist = document.querySelector('#navlist');

	var goodlist = [
		{
			type:'Bags',
			goods:['Luggage','Boston','Myfair','Birkin','Monogram','Multicolore']
		},
		{
			type:'Bags',
			goods:['Luggage','Boston','Myfair','Birkin','Monogram','Multicolore']
		},
		{
			type:'Bags',
			goods:['Luggage','Boston','Myfair','Birkin','Monogram','Multicolore']
		},
		{
			type:'Bags',
			goods:['Luggage','Boston','Myfair','Birkin','Monogram','Multicolore']
		},
		{
			type:'Bags',
			goods:['Luggage','Boston','Myfair','Birkin','Monogram','Multicolore']
		},
		{
			type:'Bags',
			goods:['Luggage','Boston','Myfair','Birkin','Monogram','Multicolore']
		}
	]

	
	//生成菜单
	var res ='';
	goodlist.forEach(function(item){
		//生成具体商品
		var goods = item.goods.map(function(i){
			return `
				<span>${i}</span>
			`
		}).join('');
		res +='<li class="cos"><p class="type"><b>'+item.type+'</b></p>' +'<p class="details">'+goods+'</p></li>';
		
	});
	navlist.innerHTML += res;

	var detailslist = [
		{
			title:'NFL',
			alltype:[
						'Baltimore','BuFFalo Bills','Cincinnati Bengals',
						'Baltimore','BuFFalo Bills','Cincinnati Bengals',
						'Baltimore','BuFFalo Bills','Cincinnati Bengals',
						'Baltimore','BuFFalo Bills','Cincinnati Bengals',
						'Baltimore','BuFFalo Bills','Cincinnati Bengals',
						'Baltimore','BuFFalo Bills','Cincinnati Bengals',
						'Baltimore','BuFFalo Bills','Cincinnati Bengals',
						'Baltimore','BuFFalo Bills','Cincinnati Bengals',
						'Baltimore','BuFFalo Bills','Cincinnati Bengals',
						'Baltimore','BuFFalo Bills','Cincinnati Bengals',
						'Baltimore','BuFFalo Bills','Cincinnati Bengals',
					]
		},
		{
			title:'NBA',
			alltype:[
						'Eastern Conference','Western Conference','2012 USA Basketball'
					]
		},
		{
			title:'MLB',
			alltype:[
						'National league', 'Americal league'
					]

		},
		{
			title:'NHL',
			alltype:[
						'Eastern Conference', 'Western Conference'
					]
			
		}
	]
	//遍历数据
	 var result = '';
	detailslist.forEach(function(item){
		var alltype = item.alltype.map(function(i){
			return `
				<span>${i}</span>
			`
		}).join('');
		result += '<li class="col"><p class="title"><b>'+item.title+'</b></p>' +'<p class="detailslist">'+alltype+'</p></li>';
	}) 
	var navDeatils = document.querySelector('#navDeatils');
	//将数据写入页面
	navDeatils.innerHTML += result;//改

	var showNav = document.querySelector('#showNav');

	//开关操作
	var cos = document.getElementsByClassName('cos');
	for(var i=0; i<cos.length; i++){
		if(i%2!==0){
			cos[i].style.backgroundColor = '#f1f1f1';
		}
		cos[i].index = i;
		cos[i].onmouseenter = function(){
			var idx = this.index;
			navDeatils.style.top = 70*idx + 'px';
			showNav.style.top = 70*idx + 'px';

			//添加动画
			animate(navDeatils,{top:0});
			animate(showNav,{top:0});
		}
	}
	
	var mcActive = document.querySelector('.mcActive');

	navlist.onmouseover = function(){
		clearTimeout(navlist.timer);
		navDeatils.style.display = 'block';
		showNav.style.display = 'block';
	}
	navlist.onmouseout = function(){
		navlist.timer = setTimeout(function(){
			navDeatils.style.display = 'none';
			showNav.style.display = 'none';
		},500)
	}

	//点击span 进入列表页
	navlist.onclick = function(e){
		e = e || window.event;
		var target = e.target || e.srcElement;

		if(target.tagName.toLowerCase() === 'span'){
			location.href = 'html/list.html';
		}
	}

	//吸顶效果
	window.onscroll = function(){
		var scrollTop = window.scrollY;
		
		if(scrollTop>123){
			mcActive.classList.add('fixed');
		}else{mcActive.classList.remove('fixed')}
	}

	
        //轮播图js
            // 1---获取元素
            var banner=document.querySelector('#banner')
            var containerlm=document.querySelector('.containerlm')
            var imgContainerlm=document.querySelector('.img_containerlm')
            var bannerDot=document.querySelector('.banner_dot')
            var imgEle= imgContainerlm.children;
            var imgQty=imgEle.length;
            var imgWidth=containerlm.offsetWidth;
            var index=0;
            var lastIndex = 0;
            var arrlm=bannerDot.children;
            // 2---根据图片数量生成轮播点
            for(var i=0;i<imgQty;i++){
                var dot=document.createElement('span');
                dot.classList.add('dot'+i);
                bannerDot.appendChild(dot);
                imgContainerlm.children[i].classList.add('img'+i);
                if(i==index){
                    arrlm[index].classList.add('activelm');
                    banner.className='background'+index;
                }
            }
            // 4---图片淡入淡出
            // 高亮初始状态
            for(var i=0;i<imgQty;i++){
                if(i===index){
                    continue;
                }
                imgEle[i].style.opacity = 0;
            }
            var timer=setInterval(function(){
                playAuto(); 
            },2000)
            // 5---鼠标移入移出
            containerlm.onmouseenter=()=>{
                clearInterval(timer);
            }
            containerlm.onmouseleave=()=>{
                timer=setInterval(playAuto,2000)
            }
            // 6--鼠标点击圆点
            containerlm.onclick=(e)=>{
                var target = e.target;
                 if(target.parentNode.classList.contains('banner_dot')){
                    var num=target.className.substring(3);
                    index = num;
                    showPic();
                }
            }
            // 封装播放图片的函数
            function playAuto(){
                index++
                showPic()
            }
            function showPic(){
                // 分页高亮
                for(var k=0;k<arrlm.length;k++){
                    arrlm[k].classList.remove('activelm');
                }   
                if(index>=imgQty){
                    index=0;
                }
                arrlm[index].classList.add('activelm');
                banner.className='background'+index;
                animate(imgEle[index],{opacity:1});
                animate(imgEle[lastIndex],{opacity:0});  
                // 目标值
                lastIndex = index;
            }
       
       
    		//利用ajax从后台拿数据
    		var pageNo=1;
    		var qty = 16;
    		var xhr = new XMLHttpRequest();
    		var Mgoodlist = document.querySelector('.Mgoodlist');console.log(Mgoodlist);
    		//处理数据
    		xhr.onreadystatechange = function(){
    			if(xhr.readyState === 4 && (xhr.status==200 || xhr.status==304)){
    				var goods_arr = JSON.parse(xhr.responseText).data;console.log(goods_arr);

    				//生成页面结构
    				var mul = document.createElement('ul');
    				mul.innerHTML = goods_arr.map(function(item){
    					return `
							<li data-guid='${item.guid}'>
								<a href='html/xqy.html'><img  class='links' src='${item.imgurl}'/></a>
								<h4 class='title'>${item.name}</h4>
								<p class='price'>价格：￥<del>${item.price}.00</del></p>
								<p class='price'>优惠后：￥<span>${item.sale}.00</span></p>
								<p class='save'>节约：${item.price-item.sale}.00</p>
								<p class='detail'>${item.details}</p>
							</li>
    					`
    				}).join('');
    				Mgoodlist.appendChild(mul);

    			
	                //将商品展示的对象存入goods展示商品cookie
	                var arr_goods = [];
	                //事件委托 点击存入展示详情页的cookie
	                Mgoodlist.onclick = function(e){
	                    e = e || window.event;
	                    var target = e.target || e.srcElement;
	                    console.log(target);
	                    var currentLi = target.parentNode.parentNode;
	                    var guid = currentLi.getAttribute('data-guid');
	                    if(target.className == 'links'){
	                        var goods = {
	                        guid:guid,
	                        imgurl:currentLi.children[0].children[0].src,       
	                        name:currentLi.children[1].innerText,       
	                        price:currentLi.children[2].children[0].innerText,       
	                        sale:currentLi.children[3].children[0].innerText,
	                        details:currentLi.children[5].innerText,
	                        qty:1
	                    };
	                        arr_goods = [goods];
	                        console.log(arr_goods);
	                        document.cookie = 'goods=' + JSON.stringify(arr_goods) +'; path=/'; 
	                    }     
	                }
    			}
    		}

    		xhr.open('get','api/goodlist.php?pageNo='+pageNo + '&qty='+qty,true);

    		xhr.send(null);
})
