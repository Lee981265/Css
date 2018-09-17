<?php
    // $password = isset($_GET['password']) ? $_GET['password'] : '';
    $mail = isset($_GET['mail']) ? $_GET['mail'] : '';
    // $username = 'laoxie';
    // $password = '23456';
    $mail_arr = ['zhangsan@qq.com', 'lisi@qq.com','wanglaowu@qq.com','laoxie@qq.com'];
    // $name_pas = ['123','234234xsa','5254aafd','23456'];
    // var_dump($name_arr);
    if(in_array($mail,$mail_arr)){
        echo 'yes';
    }else{
        echo 'no';
    }
    // var_dump($result);
    // if($result[0] === 'yes'){
    //     $keys = array_search($username,$name_arr);
    //     if($password == $name_pas[$keys]){
    //         $result[1] = ',yes';
    //     }else{
    //         $result[1] = ',no';
    //     }
    // }
    // echo($result[1]);


    
?>