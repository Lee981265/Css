    
    //获取商品列表的cookie放入xqylist
    var car_list = [];
    var xqylist;
    
    var savePrice=document.querySelector('.save_price');
    var settlement =  document.querySelector('.settlement');
    var ourPrice=document.querySelector('.our_price');
    var selfTitle=document.querySelector('.self_title');
    var listPrice=document.querySelector('.list_price');
    var selfImg=document.querySelector('.self_img');
    var twenty=document.querySelector('.twenty');
    var t_n=document.querySelector('.t_n');
    var f_n=document.querySelector('.f_n');
    var o_f=document.querySelector('.o_f');
    var shopqty=document.querySelector('.shopqty');
     var jiesuan=document.createElement('div');
    var needdata=reget();
    console.log(needdata);
   
    //购物车的cookie存储的数组对象
    settlement.onclick = function(e){
        settlement.children[3]='';
        e = e || window.event;
        var target = e.target || e.srcElement;

        if(target.id=="jia"){
            needdata.qty+=1;
            outputdata(needdata);    
        }
        if(target.id=="xia" &&needdata.qty>0){
            needdata.qty-=1;
            outputdata(needdata);      
        }
        if(target.parentNode.classList.contains("shopcar")){
            
            // 有此商品时；
            for(var i=0; i<car_list.length; i++){
                if(car_list[i].guid == needdata.guid){
                    // console.log(xqylist[0].qty);
                    car_list[i].qty += needdata.qty; 
                    // console.log(i);
                    break;
                }

            }

         // 没有此商品时；
                if(i==car_list.length){
                    console.log(needdata.qty)
                    car_list.push(needdata);console.log(car_list);
                }   
             document.cookie = 'cartlist=' + JSON.stringify(car_list) +';path=/';
              location.reload(true);

        }
    }
    // 右边
    var topstar=document.querySelector('.topstar');
    topstar.innerHTML=star();
// .............................
 function reget(){
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
        var needdata=xqylist[0];
         // console.log(needdata);
        outputdata(needdata);
        return needdata;
    }
function outputdata(needdata){
     o_f.innerHTML=Math.round(needdata.price*0.5);
 
    f_n.innerHTML=Math.round(needdata.price*0.45);
    
    t_n.innerHTML=Math.round(needdata.price*0.4);

    twenty.innerHTML=Math.round(needdata.price*0.35);


   
    selfImg.innerHTML='<a><img  class="links" src="'+  needdata.imgurl+'" alt="" width="400" /></a>';
   
    selfTitle.guid=needdata.guid;
    selfTitle.innerHTML='<h4>'+needdata.name+'</h4>'+'<p class="detail">'+needdata.details+'</p>';

    listPrice.innerHTML=needdata.price;
    if(needdata.qty<=4){
        salePrice=Math.round(needdata.price*0.5)
    }else if(needdata.qty<=9&&needdata.qty>=5){
        salePrice=Math.round(needdata.price*0.45)
    }else if(needdata.qty<=20&&needdata.qty>=10){
        salePrice=Math.round(needdata.price*0.4)
    }else if(needdata.qty>=10){
        salePrice=Math.round(needdata.price*0.35)
    }
    // 我们的售价

    ourPrice.innerHTML=salePrice;
    // 折上折后的价格
    
    savePrice.innerHTML=salePrice*0.5;
    // 数量
  
    shopqty.innerHTML=needdata.qty;
    // 
    
    
    
     jiesuan.innerHTML='<p >'+savePrice.innerText+'py6.&nbsp;&nbsp;<span style="color:#FF4500;"> &times; </span>&nbsp;&nbsp;' +needdata.qty+'=<span style="color:#FF4500;">'+savePrice.innerText*shopqty.innerText+'py6.</span>'
        +'</p><p class="pointqty">from this order you get  <span style="color:#5B8B22;">139 </span>Point </p> '; 
        settlement.appendChild(jiesuan)
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
                        +'<img src="img/3.jpg" alt="" width="60" height="60"/>'
                        +'<div class="thanks"><p><i class="iconfont icon-yishengtuandui"> </i>Thank You for rating</p></div>'
                commentRight.innerHTML=liContentLf;

    } 