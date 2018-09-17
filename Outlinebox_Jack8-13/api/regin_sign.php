<?php 
	$file_url = 'data/user.json';
	$myfile = fopen($file_url, 'r') or die("打开文件失败");
	$content = fread($myfile, filesize($file_url));

	// 把读取到的内容转成数组
	$arr_data = json_decode($content);
	//print_r($arr_data);

	//获取前端数据
	$Email = isset($_POST['Email']) ? $_POST['Email'] : '';
	//echo $Email;
	//遍历$arr_data
	foreach($arr_data as $idx => $value){

		if($value->email === $Email){
			//邮箱相同则告诉前端该邮箱已被注册
			echo '该邮箱已被注册！';
		}
	}

	

	//获取前端数据
	$newEmail = isset($_POST['newEmail']) ? $_POST['newEmail'] : '';
	$Password = isset($_POST['Password']) ? $_POST['Password'] : '';

	if($newEmail!==''&& $Password){
		$user = array(
		"email" => $newEmail,
		"password" => $Password 
		);
		$arr_data[] = $user;
	}
	
	

	//再把文件转成json字符串写入数据库
	// 关闭之前打开的文件
	fclose($myfile);

	// 以写入模式打开文件
	$myfile = fopen($file_url, 'w');

	//重新写入文件
	fwrite($myfile, json_encode($arr_data,JSON_UNESCAPED_UNICODE));

	fclose($myfile);
 ?>