<?php 
	
	
	$file_url = 'data/user.json';
	$myfile = fopen($file_url, 'r') or die("打开文件失败");
	$content = fread($myfile, filesize($file_url));

	// 把读取到的内容转成数组
	$arr_data = json_decode($content);

	//接收前端数据
	$Email = isset($_GET['Email']) ? $_GET['Email'] : '';
	

	//遍历$arr_data
	foreach($arr_data as $idx => $value){

		if($value->email === $Email && $Email!==''){
			//邮箱相同则告诉前端该邮箱可以登录
			echo 'yes';
			return;
		}else{
			echo 'no';
			return;
		}
	}
 ?>