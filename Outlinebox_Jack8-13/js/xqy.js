    //获取商品列表的cookie放入xqylist
    var car_list = [];
    var xqylist;
    var cookies = document.cookie;
    if(cookies.length > 0){
        cookies = cookies.split('; ');
        cookies.forEach(function(item){
            var arr = item.split('=');
            if(arr[0] == 'goods'){
                xqylist = JSON.parse(arr[1]);
            }
            if(arr[0] == 'cartlist'){
                car_list = JSON.parse(arr[1]);
                // console.log(car_list);
            }
        });
    }
    var lt_ul = document.createElement('ul');
    lt_ul.className = 'top_left';
    lt_ul.innerHTML = xqylist.map(function(item){
                    return '<li data-guid="'+item.guid+'">'
                            +'<a><img  class="links" src="'+item.imgurl+'" alt="" /></a>'
                            +'<h4 class="title">'+item.name+'</h4>'
                            +'<p class="price">价格：￥<del>'+item.price+'</del></p>'
                            +'<p class="sale">优惠后:<span>'+item.sale+'</span></p>'
                            // +'<p class="save">节约:'+(item.price-item.sale).toFixed(2)+'</p>'
                            +'<p class="detail">'+item.details+'</p>'
                            +'<button id="jia">∧</button>'
                            +'<span class="lt_qtyss">Quantity:</span>'
                            +'<span class="shopqty">'+item.qty+'</span>'
                            +'<button id="xia">∨</button>'
                            +'</li>'
                            +'<button class="shopcar">Add to Cart >></button>';
                }).join('');
    var lt_top = document.getElementsByClassName('lt_top')[0]
    lt_top.appendChild(lt_ul);
    //购物车的cookie存储的数组对象
    lt_ul.onclick = function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;
        var  currentLi = target.parentNode.children[0];
        var currentLi2 = target.parentNode;
        var guid = currentLi.getAttribute('data-guid');
        var guid2 = currentLi2.getAttribute('data-guid');
        if(target.id == 'xia'){
            for(var j=0;j<xqylist.length; j++){
                if(xqylist[j].guid == guid2 && xqylist[j].qty>1){
                    // console.log(xqylist[j].qty);
                    xqylist[j].qty -= 1;
                    currentLi2.children[7].innerText = xqylist[j].qty;
                    break;
                }
            }
        }
        if(target.id == 'jia'){
            for(var k=0;k<xqylist.length; k++){
                if(xqylist[k].guid == guid2 && xqylist[k].qty>=1){
                    xqylist[k].qty += 1;
                    currentLi2.children[7].innerText = xqylist[k].qty;
                    break;
                }
            }
        }
        if(target.className == 'shopcar'){
            for(var i=0; i<car_list.length; i++){
                if(car_list[i].guid == xqylist[0].guid){
                    // console.log(xqylist[0].qty);
                    car_list[i].qty = xqylist[0].qty; 
                    // console.log(i);
                    break;
                }
            }   
            if(i==car_list.length){
            // var carlist = {
            //     guid:guid,
            //     imgurl:currentLi.children[0].children[0].src,
            //     name:currentLi.children[1].innerText,       
            //     price:currentLi.children[2].children[0].innerText,       
            //     sale:currentLi.children[3].children[0].innerText,
            //     details:currentLi.children[5].innerText,
            //     qty:1
            // };
            car_list.push(xqylist[0]);
        }
            
        }
        document.cookie = 'cartlist=' + JSON.stringify(car_list) +';path=/';
        // console.log(car_list);


    }


        

        // 左边平均数据；
        var avarageStar=document.getElementsByClassName('avarageStar')[0];
        avarageStar.innerHTML=starBig();
        // 右边平均数据
        var everyRating=document.getElementsByClassName('everyRating')[0];
        var str=""
        for (i = 0; i<=4; i++) {
             str+='<li>'+i+'star：'+star()
                    +'<span class="ratioBox"><i class="ratio" ></i >'  
                    +'</li>'             
        };
        everyRating.innerHTML=str;
        console.log(everyRating)
        var liRating=everyRating.getElementsByTagName('li');
        for (i=0; i<5; i++) {
            var starQty=liRating[i].getElementsByTagName('i') ;
            // 设置星星样式
             for(j=0;j<5;j++){
                // console.log(currentP.children[i])
                if(j<=i){
                   starQty[j].className='iconfont icon-xing star star'+i+' yellowStar' ;
                } 
            }         
        }
        // 下面填写区
        var buyerComments=document.getElementsByClassName('buyerComments')[0];
        var starP=buyerComments.children[0];
        // console.log(starP)
        starP.innerHTML=starBig();
        // 绑定事件；
        
        var starIdx;
        starP.onclick=function(event){
           
            event=window.event;
            var  currentSpan=event.target;
            // console.log(currentSpan);
            var  currentP=currentSpan.parentNode;
            // console.log(currentP)
            // 清空星星样式；
            for(j=0;j<5;j++){
                currentP.children[j].className='iconfont icon-xing bigStar star'+j ;
            }
            // 设置星星样式
             for(i=0;i<5;i++){
                // console.log(currentP.children[i])
                
                currentP.children[i].className='iconfont icon-xing bigStar star'+i+' yellowStar' ;
                if(currentP.children[i].className==currentSpan.className){
                    // currentP.children[i].className='iconfont icon-xing bigStar star'+i+' yellowStar' ;
                    starIdx=i;
                    break;
                }    
            }
       
            // console.log(starIdx);
        }
        // 获取消费者填写的内容
        // 名字
        var yourName=document.getElementById('yourName');
        // console.log(yourName)
        // 内容
        var yourContent=document.getElementById('yourContent');
        // 验证码
        // console.log(yourContent) 
        // console.log(yourCaptcha)
            // 随机生成验证码盒子
        var captcha=document.getElementsByClassName('captcha')[0];  
            //生成随码并放入盒子内
        var numb=vCode();
        captcha.innerHTML=numb;
        captcha.onclick=function(){
            numb=vCode();
            captcha.innerHTML=numb;
        }
        var btnSubmit=document.getElementsByClassName('btnSubmit')[0];
        var yourCaptcha=document.getElementsByClassName('userCaptcha')[0];
                // console.log(yourCaptcha)        
        // 给评论区打框架
         // 绑定事件获取信息
        var arr=[];
        // arr=getCookie();
        // console.log(arr); 
        btnSubmit.onclick=function(){
              // 用户输入的验证码盒子
            var yourCaptcha=document.getElementsByClassName('userCaptcha')[0];
            var userCaptcha=yourCaptcha.value;
            var obj={} 
            // 判断验证码是否正确;
             if(userCaptcha!==numb){
                alert('你输入的验证码不正确');
            }else{
                var obj={
                    userName:yourName.value,
                    userContent:yourContent.value,
                    starIdx:starIdx,
                    time:new Date().toLocaleDateString()
                }
                arr.push(obj);
                // console.log(arr);
                var now = new Date()
                    now.setDate(now.getDate()+1000000);
                 // 存放cookie
                document.cookie='goodsComment='+JSON.stringify(arr),expires=now;
                 output();
                 // 清空所有数据
                yourName.value='';
                yourContent.value='';
                starP.innerHTML=starBig();
            }           
        }  
        output();



// -----------------------封装函数-------------------------------------------------
        // 生成大星星函数
        function starBig(){
            var str=""
            for(var i=0;i<5;i++){
                str+='<i class="iconfont icon-xing bigStar star'+i+'"></i>'
            }
            return str;
        }
            // console.log(Bigstar());
             // 生成小星星函数
        function star(){
            var str=""
            for(var i=0;i<5;i++){
                str+='<i class="iconfont icon-xing star'+i+'"></i>'
            }
            return str;
        }
        function getCookie(){
            var cookies=document.cookie;
                var commentOnly=[];
                if(cookies.length>0){
                    // 将每个cookie分开
                    cookies=cookies.split('; ');
                    // 遍历每个数组
                    cookies.forEach(function(item){
                     var  cookie=item.split(';');
                    // 每个数组继续拆分成一个数组，此时第一个值为cookie的名称
                        cookie.forEach(function(ite){
                            var Marr=ite.split('=');
                                // console.log(arr[0])
                                // 当名称对上时将对应以前保存的数据取到;因为后期要此数据，因此将数组声明为全局变量
                                if(Marr[0]=='goodsComment'){
                                    // 转化json码
                                    commentOnly=JSON.parse(Marr[1]);  
                                }
                        })
                    })
                    console.log(commentOnly);
                     return commentOnly;
                }
        }

         function output(){
                // 拿数据； 
                var cookies=document.cookie;
                var commentOnly=[];
                if(cookies.length>0){
                    // 将每个cookie分开
                    cookies=cookies.split('; ');
                    // 遍历每个数组
                    cookies.forEach(function(item){
                     var  cookie=item.split(';');
                    // 每个数组继续拆分成一个数组，此时第一个值为cookie的名称
                        cookie.forEach(function(ite){
                            var arr=ite.split('=');
                                // console.log(arr[0])
                                // 当名称对上时将对应以前保存的数据取到;因为后期要此数据，因此将数组声明为全局变量
                                if(arr[0]=='goodsComment'){
                                    // 转化json码
                                    commentOnly=JSON.parse(arr[1]); 
                                }
                        })
                    })
                   
                }
                console.log(commentOnly);
                // 给评论区房框架及内容；
                var commentUl=document.getElementsByClassName('commentUl')[0];
                // 放li
                var commentLi=document.createElement('li');
                commentUl.appendChild(commentLi);
                    // li中左边盒子

                var commentLeft=document.createElement('div');
                commentLeft.className='commentLeft f_l';
                commentLi.appendChild(commentLeft);

                 var liContentLf= '<p>'+star()+'</p>'
                        +'<i class="time">'+commentOnly[0].time+'</i><br />'
                        +'<h6>Test</h6>'
                        +'<i class="iconfont icon-tubiaozhizuomoban"></i>(<span>1</span>) &nbsp;'
                        +'<i class="iconfont icon-down"></i>(<span>3</span>)';
                commentLeft.innerHTML=liContentLf;
                var nowP=commentLeft.getElementsByTagName('p')[0]; 
                console.log(nowP);
                 for(i=0;i<5;i++){
                       nowP.children[i].className='iconfont icon-xing star star'+i+' yellowStar' ;
                     if(i>=commentOnly[0].starIdx){   
                        break;
                    }
                }
                    // li中右边盒子
                var commentRight=document.createElement('div');
                commentRight.className='commentRight f_l';
                commentLi.appendChild(commentRight);
                var liContentLf='<p class="review">'+commentOnly[0].userContent+'</p>'
                        +'<img src="#11" alt="" />'
                        +'<div class="thanks"><p><i class="iconfont icon-yishengtuandui"> </i>Thank You for rating</p></div>'
                commentRight.innerHTML=liContentLf;

    } 