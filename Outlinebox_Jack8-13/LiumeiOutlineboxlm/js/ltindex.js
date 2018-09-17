window.onload = function(){
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
            name:'CHUWI/驰为 Hi12 双系统 64GB Win10平板电脑12英寸PC超极本轻薄',      
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
            name:'现货速发CHUWI/驰为 Hi10 Pro 64GB Win10手写双系统办公平板电脑',      
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
            name:'【大象摄影】Canon/佳能入门级高清数码单反相机 EOS 1300D带WIFI',     
            price:1738,   
            sale:236,    
            imgurl:'img/a1.jpg',       
            details:'苹果公司于2015年9月11号凌晨的苹果发布会上正式发布。',
        },
        {
            guid:010,
            name:'【实在山东人】国行 Canon/佳能m3 微单相机 EOS M3 15-45STM镜头',      
            price:2699,    
            sale:2348,   
            imgurl:'img/a2.jpg',       
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'
        },
        {
            guid:011,
            name:'【大象摄影】国行尼康入门专业数码单反相机D5300 18-55带WiFi',     
            price:2770,   
            sale:678,    
            imgurl:'img/a3.jpg',       
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'
        },
        {
            guid:012,
            name:'Sony/索尼 ILCE-6000L',       
            price:3098,       
            sale:678,
            imgurl:'img/a4.jpg',       
            details:'苹果公司于2015年9月11号凌晨的苹果发布会上正式发布。'
        },
        {
            guid:013,
            name:'16年产 佳能 EF 24-70mm f/2.8L II USM 镜头 24-70 F2.8 二代',        
            price:9760,   
            sale:5647,    
            imgurl:'img/a5.jpg',       
            details:'苹果公司于2015年9月11号凌晨的苹果发布会上正式发布。'
        },
        {
            guid:014,
            name:'日本代购佳能 EOS 100D白色18-55单反相机kiss X7',        
            price:1998,   
            sale:345,    
            imgurl:'img/a6.jpg',       
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'
        },
        {
            guid:015,
            name:'Canon/佳能 EOS 6D 单机 6D机身 带WIFI GPS 全新正品 四码合一',      
            price:7100,    
            sale:4566,   
            imgurl:'img/a7.jpg',       
            details:'800 万像素摄像头能够拍摄绚丽的照片和 1080p HD 视频。'
        },
        {
            guid:016,
            name:'Nikon/尼康 D750 尼康 数码单反 d750 单反照相机 家用相机分期购',     
            price:9360,   
            sale:2434,    
            imgurl:'img/a8.jpg',       
            details:'苹果公司于2015年9月11号凌晨的苹果发布会上正式发布。',
        }];
            //传入一个数组对象
            //价格降序
            function priceDescend(arr){
                //冒泡排序
                for(var j=0; j<arr.length-1; j++){
                    for(var i=0; i<arr.length-j-1; i++){
                        if(arr[i].price>arr[i+1].price){
                            var temp;
                            temp = arr[i];
                            arr[i] = arr[i+1];
                            arr[i+1] = temp;
                        }
                    }
                }
                return arr;
            }
            //价格升序
            function priceAscend(arr){
                return priceDescend(arr).reverse();
            }
            var arreysort = document.getElementsByClassName('arreysort')[0];
            var degs = 0;
            var d = 0;
            //点击箭头 实现排序
            arreysort.onclick = function(){
                degs += 180;
                d++;
                arreysort.style.transform = 'rotateZ('+degs+'deg)';
                if(d%2 === 0){
                    var arrSorted = priceDescend(arr1);
                }else{
                    arrSorted =  priceDescend(arr1).reverse();
                }
                var ul = document.getElementsByClassName('delul')[0];
                ul.parentNode.removeChild(ul);
                create(arrSorted);
            }
            //吸顶菜单
            var header = document.getElementById('header');
            var toTop = document.getElementById('toTop');
            window.onscroll = function(){
                    var scrollTop = window.scrollY;
                    if(scrollTop > 200){
                        header.className = 'first fixed';
                    }else{
                        header.className = 'first';
                    }
                    if(scrollTop > 500){
                        toTop.style.display = 'block';
                    }else{
                        toTop.style.display = 'none';
                    }
                }
            // 回顶 
            toTop.onclick = function(){
                var timer = setInterval(function(){
                    var scrollTop = window.scrollY;
                    if(scrollTop<=0){
                        clearInterval(timer);
                    }
                        scrollBy(0,-100);
                },20);
            }
            function create(arr1){
                var right = document.getElementsByClassName('right')[0];
                var ul = document.createElement('ul');
                ul.className = 'clear delul goodslist';
                ul.innerHTML = arr1.map(function(item){
                    return '<li data-guid="'+item.guid+'">'
                            +'<a href="html/xqy.html"><img  class="links" src="'+item.imgurl+'" alt="" /></a>'
                            +'<h4 class="title">'+item.name+'</h4>'
                            +'<p class="price">价格：￥<del>'+item.price+'</del></p>'
                            +'<p class="sale">优惠后:<span>'+item.sale+'</span></p>'
                            +'<p class="save">节约:'+(item.price-item.sale).toFixed(2)+'</p>'
                            +'<p class="detail">'+item.details+'</p>'
                            +'</li>';
                }).join('');
                right.appendChild(ul);
            }
            
            create(arr1);
            var goodslist = document.getElementsByClassName('goodslist')[0];
            //将商品展示的对象存入goods展示商品cookie
            var arr_goods = [];
            //事件委托 点击存入展示详情页的cookie
            goodslist.onclick = function(e){
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
            var item=document.querySelector('.item');

        item.onclick=function(e){
            e=event||window.event;
            target=e.target||e.srcElement;
            // console.log(target)
            currentUl=target.parentNode.parentNode.parentNode
            if(currentUl.classList.contains('item')){

                var crurentLi=target.parentNode.parentNode;
                var boxP=crurentLi.children[1]
                var targetHeight=boxP.children.length*boxP.children[0].offsetHeight;
                // console.log(targetHeight);
                var currentContainer=crurentLi.children[1];
                 if(currentContainer.style.height!=="0px"){
                    animate(currentContainer,{height:0});
                }
                else{
                   animate(currentContainer,{height:targetHeight}); 
                }
                

            }
        }
            
           


    }