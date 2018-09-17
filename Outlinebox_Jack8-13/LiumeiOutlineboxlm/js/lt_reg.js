    var showv = document.querySelector('.showv');
    var str = '1234567890abcdefghijklmnopqrstuvwxyz';
    var len = str.length;
    var res = '';
    var boo;
    console.log();
    for(var i=0; i<4; i++){
        res += str.charAt(parseInt(Math.random()*len));
    }
    showv.innerHTML = res;
    var vcode = document.querySelector('#vcode');
    var result = document.querySelector('.result');
    vcode.oninput = function(){
        clearTimeout(timer);
        var timer = setTimeout(function(){
            if(vcode.value === res){
                result.innerHTML = '√';
                result.style.background = 'green';
            }else{
                result.innerHTML = 'X';
                result.style.background = 'red';
                boo = false;
            }
        },1000);
    }
    var cun = document.querySelector('.cun');
    var sign_in = document.querySelector('.sign_in');
    var mail1 = document.querySelector('#mail1');
    var mail2 = document.querySelector('#mail2');
    var regd = document.querySelector('.regd');
    var xhr_reg = new XMLHttpRequest();
    xhr_reg.onload = function(){
        if(xhr_reg.status === 200 || xhr_reg.status === 304){
            var reg = xhr_reg.responseText;
            console.log(reg === 'yes',reg);
            if(reg === 'yes'){
                regd.innerHTML = '*该邮箱已经被注册了';
            }else if(reg === 'no'){
                regd.innerHTML = '';
            }
        }
    }
    var xhr_cun = new XMLHttpRequest();
    xhr_cun.onload = function(){
        if(xhr_cun.status === 200 || xhr_cun.status === 304){
            var regs = xhr_cun.responseText;
            console.log(xhr_cun.responseText);
            regs = regs.replace(/[\n]/ig,'');
            if(regs === 'no'){
                cun.innerHTML = '*该邮箱未注册';
            }else if(regs === 'pasyes'){
                alert('登录成功');
            }else if(regs === 'pasno' && pas1.value!= ''){
                alert('密码错误');
            }
        }
    }
    sign_in.onclick = function(){
        xhr_cun.open('get','../api/lt_pas.php?password='+pas1.value+'&mail='+mail1.value,true);
        xhr_cun.send();
        if(pas1.value == ''){
            cun.innerHTML = '*密码不能为空';
        }else if(mail1.value == ''){
            cun.innerHTML = '*邮箱不能为空';
        }
    }
    mail2.onchange = function(){
        xhr_reg.open('get','../api/lt_register.php?mail='+ mail2.value,true);
        xhr_reg.send();
    }
    mail2.oninput = function(){
        var r = /^[\w\-\.]+@[\da-z\-]{2,}(\.[a-z]{2,}){1,2}$/i;
        if(!r.test(mail2.value) && mail2.value != ''){
            regd.innerHTML = '*电子邮件不合法!';
        }
    }
    var pas1 = document.querySelector('#pas1');
    var pas2 = document.querySelector('#pas2');
    var comfirm = document.querySelector('#confirm');
    var lt_reg = document.querySelector('.lt_reg');
    var cuns = document.querySelector('.cuns');
    pas2.onchange = function(){
        console.log(comfirm.value,pas2.value);
        if(comfirm.value === pas2.value){
            cuns.innerHTML = '';
        }else if(comfirm.value != pas2.value && pas2.value != '' && comfirm.value != ''){
            boo = false;
            cuns.innerHTML = '*两次密码不一致';
        }
    }
    comfirm.onchange = function(){
        if(comfirm.value === pas2.value){
            cuns.innerHTML = '';
        }else if(comfirm.value != pas2.value && pas2.value != '' && comfirm.value != ''){
            boo = false;
            cuns.innerHTML = '*两次密码不一致';
        }
    }
    
    lt_reg.onclick = function(){
        if(mail2.value == ''){
            cuns.innerHTML = '*邮箱不能为空';
            boo = 'false';
        }else if(pas2.value == ''){
            cuns.innerHTML = '*密码不能为空';
            boo = 'false';
        }else if(confirm.value == ''){
            cuns.innerHTML = '*请确认密码';
            boo = 'false';
        }else if(vcode.value == ''){
            cuns.innerHTML = '*验证码不能为空';
            boo = 'false';
        }else{
            cuns.innerHTML = '';
        }
        // console.log(boo);
    }