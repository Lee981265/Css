/* 
* @Author: Marte
* @Date:   2017-08-12 10:54:35
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-12 17:46:43
*/
var brend = document.querySelector('.sy_brend');
            var imgs = brend.querySelectorAll('img');
            var lis = brend.children;
            
            brend.onmouseover = function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                var li = target.parentNode;
                if(target.tagName.toLowerCase() == 'img'){
                    li.children[0].style.border = '1px solid #000';
                    animate(target,{opacity:1})
                    li.children[2].style.display = 'block';
                    animate(li.children[2],{height:50});
                    animate(li.children[1],{bottom:30});
                    // target.style.opacity = 1;
                    
                }
                if(target.className == 'p0'){
                    console.log(target);
                }

            }
            brend.onmouseout = function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                var li = target.parentNode;
                if(target.tagName.toLowerCase() == 'img'){
                    animate(target,{opacity:0.5})
                    li.children[0].style.border = 0;
                    animate(li.children[2],{height:0});
                    animate(li.children[1],{bottom:0});
                    
                }
                
            }
            for(var i=0; i<lis.length; i++){
                lis[i].children[1].className = 'ani1';
                lis[i].children[0].className = 'ani0';
                lis[i].children[2].className = 'p0';

            }
            var lt_box = document.querySelector('.lt_sybox');
            create(lt_box);
            var lt_left = document.querySelector('.lt_left');
            var lt_right = document.querySelector('.lt_right');
            var sy_slideul = document.querySelector('.sy_slideul');
            lrSlide(lt_left,lt_right,lt_box,sy_slideul);
            // 封装左右滑动的函数
            // pre:左边箭头上一张（元素）
            // next:右边箭头下一张（元素）
            // box:装着滑动的盒子（元素）
            // ul:滑动片(元素)
            function lrSlide(pre,next,box,ul){
                var idx = 0;
                var boxlen = parseInt(getCss(box,'width'));
                var ullen = parseInt(getCss(ul,'width'));
                var len = parseInt(ullen/boxlen);
                pre.onclick = function(){
                    idx++;
                    if(idx >= len){
                        idx = len;
                        console.log(len);
                    }
                    animate(ul,{left:-idx*boxlen});
                }
                next.onclick = function(){
                    idx--;
                    if(idx < 0){
                        idx = 0;
                    }
                    animate(ul,{left:-idx*boxlen});
                }
            }
