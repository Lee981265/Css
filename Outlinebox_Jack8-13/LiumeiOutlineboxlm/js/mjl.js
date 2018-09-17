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

	//点击span 进入列表页
	navlist.onclick = function(e){
		e = e || window.event;
		var target = e.target || e.srcElement;

		if(target.tagName.toLowerCase() === 'span'){
			location.href = 'html/list.html';
		}
	}
	
	var mcActive = document.querySelector('.mcActive');
	mcActive.onmouseover = function(){
		clearTimeout(mcActive.timer);
		navlist.style.display = 'block';
	}

	mcActive.onmouseout = function(){
		mcActive.timer = setTimeout(function(){
			navlist.style.display = 'none';
		},500)
	}

	navlist.onmouseover = function(){
		navDeatils.style.display = 'block';
		showNav.style.display = 'block';
	}


})




























