<?php 
	$file_url = 'data/user.json';
	$myfile = fopen($file_url, 'r') or die("打开文件失败");
	$content = fread($myfile, filesize($file_url));

	// 把读取到的内容转成数组
	$arr_data = json_decode($content);

	//接收前端数据
	$Email = isset($_GET['Email']) ? $_GET['Email'] : '1';
	$Password = isset($_GET['Password']) ? $_GET['Password'] : '2';
	
	
	//遍历$arr_data
	foreach($arr_data as $idx => $value){
		//先找出相同的邮箱所在数据
		if($value->email ===$Email && $Email!==''){
			$keys = $arr_data[$idx]->password;

			  
			//密码核对
			if($Password === $keys){
				echo 'yes';
				
			}else{
				echo 'no';
				
			}
		}
	}
 ?>