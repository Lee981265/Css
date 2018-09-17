window.onload = function(){
    
    
    var right_a = document.querySelector('.right_a');
    var pageNo=1;
    var qty = 16;

    var xhr = new XMLHttpRequest();
    //ajax请求数据
     
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status ==200 || xhr.status == 304){
                var res = JSON.parse(xhr.responseText);
                var arr1 = res.data;

                //生成分页 
                var total = res.total;
                //具体几页
                var length = Math.ceil(total/qty);

               
                right_a.innerHTML = '';
                for(var i=1; i<=length; i++){
                        var span = document.createElement('span');
                        span.innerText = i;
                        if(i==pageNo){
                            span.className = 'active';
                        }

                        right_a.appendChild(span);
                } 


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
               
                function create(arr1){
                    // var right = document.getElementsByClassName('right')[0];
                    var Mlist = document.querySelector('.Mlist');
                    var ul = document.createElement('ul');
                    ul.className = 'clear delul goodslist';
                    // console.log(arr1);
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
                    Mlist.innerHTML = '';
                    Mlist.appendChild(ul);
                }

                //点击按钮切换
                right_a.onclick = function(e){
                    e = e || window.event;
                    var target = e.target;
                    if(target.tagName.toLowerCase() === 'span'){
                        if(target.innerText == pageNo){
                                return 
                        }

                        //重新发送ajax请求
                        pageNo = Number(target.innerText);

                        xhr.open('get','api/goodlist.php?pageNo='+pageNo+'&qty='+qty,true);
                        xhr.send(null);
                    }
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
            }
        }
        xhr.open('get','api/goodlist.php?pageNo='+pageNo+'&qty='+qty,true);
        xhr.send(null);

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