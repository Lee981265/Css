<?php
    $mail = isset($_GET['mail']) ? $_GET['mail'] : '';
    $password = isset($_GET['password']) ? $_GET['password'] : '';
    $mail_arr = ['zhangsan@qq.com', 'lisi@qq.com','wanglaowu@qq.com','laoxie@qq.com'];
    $pas_arr = ['123','234234xsa','5254aafd','23456'];
    if(in_array($mail,$mail_arr)){
        $keys = array_search($mail,$mail_arr);
        if($password === $pas_arr[$keys]){
            echo 'pasyes';
        }else{
            echo 'pasno';
        }
    }else{
        echo 'no';
    }
?>



