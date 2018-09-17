document.addEventListener('DOMContentLoaded',function(){
	var mail2 = document.querySelector('#mail2');
	var mail1 = document.querySelector('#mail1');
	var pas2 = document.querySelector('#pas2');
	var pas1 = document.querySelector('#pas1');
	var confirm = document.querySelector('#confirm');
	var vcode = document.querySelector('#vcode');
	var showv = document.querySelector('.showv');
	var reg_Btn = document.querySelector('#reg_Btn');
	var regd = document.querySelector('.regd');
	var mtips = document.querySelector('.mtips');
	var regin = true;
	var login = true;

	//注册
	mail2.onblur = function(){
		var email2 = mail2.value;

		//先判断输入的是否为邮箱正确的格式
		var reg = /^[\w\-\.]+@[\da-z\-]+(\.[a-z]{2,}){1,2}$/i;
		if(email2.trim() === ''){
        	regd.innerText = '请输入您的邮箱！'; 
        	regin = false;
        }else if(!reg.test(email2)){
        	regd.innerText = '邮箱不合法！'; 
        	regin = false;
        } 
        else{
        	regd.innerText = '';
        	regin = false;
        }
		//发起ajax请求查询邮箱是否被注册
		var xhr = new XMLHttpRequest();

		//拿到后台数据进行比较改邮箱是否已注册
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && (xhr.status == 200 || xhr.status == 304 )){
				var Email = xhr.responseText;
				mtips.style.display = 'block';
				mtips.innerHTML = Email;
			} 
		}

		xhr.open('post','./api/regin_sign.php',true);

		//设置请求头
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');

		xhr.send(`Email=${email2}`);
		
	}
	//密码
	pas2.onblur = function(){
		var passWord = document.querySelector('.passWord');
		var reg = /^\S{6,19}$/;  
		
		if(pas2.value.trim() === ''){
			passWord.innerHTML = '请输入密码！';
			regin = false;
		}else if(!reg.test(pas2.value)){
            passWord.innerHTML = '密码不合法！';
            regin = false;
        }else{
        	 passWord.innerHTML = '';
        	 regin = false;
        }   
	}

	//重新输入密码
	confirm.onblur = function(){
		
		var repassWord = document.querySelector('.repassWord');

		if(confirm.value !== pas2.value){
			repassWord.innerHTML = '两次密码不一致！';
			regin = false;
		}else{
			repassWord.innerHTML = '';
			regin = false;
		}

		vCode();
	}

	function vCode(){
		//验证码
		var str ='123456789abcdefghijklmnopqrstuvwxyz';
		//获取随机索引
		var mcode='';
		for(var i=0; i<4; i++){
			var idx = randomNumber(0,str.length-1);
			mcode += str[idx];
		}
		showv.innerText = mcode;
	}

	//验证码验证
	vcode.onblur = function(){
		
		var _vcode = vcode.value.toLowerCase();
		var code = showv.innerText;
		var result = document.querySelector('.result');

		if(_vcode === code && _vcode!==''){
			result.innerHTML = '√';
            result.style.background = 'green';
            regin = true;
		}
		if(_vcode !== code){
			result.innerHTML = 'X';
            result.style.background = 'red';
            //输入错误更新验证码
            vCode();
            regin = false;
		}
	}	

	//点击按钮注册数据写入数据库
	var reg_Btn = document.querySelector('.reg_Btn');
	reg_Btn.onclick = function(){
		var cuns = document.querySelector('.cuns');

		if(mail2.value.trim() === ''){
    		cuns.innerHTML = '邮箱不能为空！';
    		cuns.classList.add('False');
    		 regin = false;
    		return;
    	}
    	else if(pas2.value.trim() === ''){
    		cuns.innerHTML = '密码不能为空！';
    		cuns.classList.add('False');
    		 regin = false;
    		return;
    	}
    	else if(vcode.value.trim() === ''){
    		cuns.innerHTML = '验证码不能为空！';
    		cuns.classList.add('False');
    		 regin = false;
    		return;
    	}
		else if(regin===true){
			var email2 = mail2.value;
			var passWord = pas2.value;
			
			cuns.classList.remove('False');
			cuns.innerHTML = '恭喜你注册成功！'
				//发起ajax把账号密码存入数据库
				var user_xhr = new XMLHttpRequest();

				user_xhr.open('post','./api/regin_sign.php',true);

				user_xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');

				user_xhr.send(`newEmail=${email2}&Password=${passWord}`);			
		}
	}

	var tip1 = document.querySelector('.tip1')
	//登录
	mail1.onblur = function(){
		var _mail1= mail1.value;

		//先判断输入的是否为邮箱正确的格式
		var reg = /^[\w\-\.]+@[\da-z\-]+(\.[a-z]{2,}){1,2}$/i;
		if(_mail1.trim() === ''){
			tip1.classList.remove('success');
        	tip1.innerText = '请输入您的邮箱！'; 
        	tip1.classList.add('error');
        	login = false;
        }else if(!reg.test(_mail1)){
        	tip1.classList.remove('success');
        	tip1.innerText = '邮箱不合法！'; 
        	tip1.classList.add('error');
        	login = false;
        } 
        else{
        	regd.innerText = '';
        	login = false;
        }

        if(reg.test(_mail1)){
			//判断数据库中是否注册改用户 
			var login_xhr = new XMLHttpRequest();

			login_xhr.onreadystatechange = function(){
				if(login_xhr.readyState ===4 && (login_xhr.status ===200 || login_xhr.status === 304)){
					var res =login_xhr.responseText;
					//如果后台返回结果为no则提示该用户未注册
					if(res == 'no'){
						tip1.classList.remove('success');
						tip1.innerText = '该账户尚未注册，请输入正确的用户名！';
						tip1.classList.add('error');
						login = false;
					}else{
						tip1.classList.remove('error');
						tip1.innerText = '√';
						tip1.classList.add('success'); 
						regin = true;
					}
				}
			}


			login_xhr.open('get','./api/sign.php?Email='+_mail1,true);

			login_xhr.send(null);
        }
	}
	var tip2 = document.querySelector('.tip2');console.log(tip2)
    //密码判断
    pas1.onblur = function(){
    	var _mail1= mail1.value;
    	var passWord1 = pas1.value;
    	var reg = /^\S{6,19}$/;

		//先判断密码格式
		if(pas1.value.trim() === ''){
			tip2.classList.remove('success');
			tip2.innerHTML = '请输入密码！';
			tip2.classList.add('error');
			login = false;
		}else if(!reg.test(pas1.value)){
			tip2.classList.remove('success');
	        tip2.innerHTML = '密码不合法！';
	        tip2.classList.add('error');
	        login = false;
	    }else{
	        	 tip2.innerHTML = '';
	        	 login = false;
	    }

    	//前提用户名存在
    	 
    	if(tip1.classList.contains('success')){
	       if(reg.test(pas1.value)){

	    		//发起ajax请求
	    		var password_xhr = new XMLHttpRequest();

	    		password_xhr.onreadystatechange = function(){
	    			if(password_xhr.readyState === 4 && (password_xhr.status==200||password_xhr.status==304)){
	    				var res = password_xhr.responseText;console.log(res);

	    				if(res === 'no'){
	    					tip2.classList.remove('success');
	    					tip2.innerHTML = '请输入正确的密码！';
	    					tip2.classList.add('error');
							login = false;
	    				}else if(res === 'yes'){
	    					tip2.classList.remove('error');
	    					tip2.innerHTML = '√';
	    					tip2.classList.add('success');
							regin = true;
	    				}
	    				
	    			}
	    		}
	    		password_xhr.open('get','./api/password.php?Email='+_mail1 + '&Password='+passWord1,true);

	    		password_xhr.send(null);
	       }  
    	}
    }

    //点击按钮登录
    var sign_in = document.querySelector('.sign_in');
    var cun = document.querySelector('.cun');

    sign_in.onclick = function(){
    	if(mail1.value.trim() === ''){
    		cun.innerHTML = '邮箱不能为空！';
    		cun.classList.add('False');
    		login = false;
    		return;
    	}
    	else if(pas1.value.trim() === ''){
    		cun.innerHTML = '密码不能为空！';
    		cun.classList.add('False');
    		login = false;
    		return;
    	}
    	else if(tip1.classList.contains('success')&&tip2.classList.contains('success')){
    		cun.classList.remove('False');
    		cun.innerHTML = '欢迎登录Outlinebox.com！';
    		setTimeout(function(){
    			location.href = 'index.html';
    		},1000)
    		
    	}
    }
})