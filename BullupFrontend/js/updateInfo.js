
$('#nickname_btn').on('click',function(){
    var $userId = userInfo.userId;
    var $nickname = $('#update_nickname').val();
	
	if($nickname!=""&&$nickname.length<=10){
		socket.emit('updateInfo',{
			userId:$userId,
			nickname:$nickname,
			type:"nickname"
		});
	}else{
		bullup.alert('请输入昵称且字数不能超过10位');
		$('#update_nickname').val('');
	}

});


$('#phone_btn').on('click',function(){
    var $userId = userInfo.userId;
	var $phone = $('#update_phone').val();
	
	function verifyHandset(str) {
		//中国手机号  
		var reg = /^(\+86)|(86)?1[3,5,7,8]{1}[0-9]{1}[0-9]{8}$/;  
		if( reg.test(str)) {  
			return true;  
		} else {  
			return false;  
		}
	}
				
	function telephoneCheck(str) {
		// 美国手机号
		var reg = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/g;
		return reg.test(str);
	}

	if(verifyHandset($phone)==true||telephoneCheck($phone)==true){
		socket.emit('updateInfo',{
			userId:$userId,
			phone:$phone,
			type:"phone"
		});
	}else{
		bullup.alert('请填写正确的手机号');
		$('#update_phone').val('');
	}

});

$('#pwd_btn').on('click',function(){
    var $userId = userInfo.userId;
	var $pwd1 = $('#update_pwd').val();
	var $pwd2 = $('#update_pwd2').val();
	function verifyPassword(str) {
		//密码  
		var reg = /^([0-9]|[a-zA-Z]){6,16}$/;  
		if( reg.test(str)) {  
			return true;  
		} else {  
			return false;  
		}
	} 

	if(verifyPassword($pwd1)==true){
		if($pwd1==$pwd2){
			socket.emit('updateInfo',{
				userId:$userId,
				password:$pwd1,
				type:"password"
			});
		}else{
			bullup.alert('两次输入的密码不同');
			$('#update_pwd').val('');
			$('#update_pwd2').val('');
		}
	}else{
		bullup.alert('请输入6到16位的字母或者数字的密码');
		$('#update_pwd').val('');
		$('#update_pwd2').val('');
	}
	

});