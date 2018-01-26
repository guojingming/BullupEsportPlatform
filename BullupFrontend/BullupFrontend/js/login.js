// get username and user password
$().ready(function () {
	$('#login_btn').on('click', function (e) {
		e.preventDefault();
		// get user name and user password
		var $log_name = $('#login_username').val();
		var $log_password = $('#login_password').val();
		//communicate with the server
		socket.emit('login', {
			userName: $log_name,
			password: $log_password
		});
		// get the log in result and render the page
	});

    //按回车键登陆
	document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        //console.log(e.keyCode);
        if(e && e.keyCode==13){ 
				if($("#log_modal").hasClass("open")){
				var $log_name = $('#login_username').val();
				var $log_password = $('#login_password').val();
				 	//communicate with the server
					socket.emit('login', {
					    userName: $log_name,
						password: $log_password
					});
				}
			}
		if($("#modalpopo").css("display")=="block"){
				$('#modalpopo').modal('close');
				$(".bullup_overlay").remove();				
		}
    };


	$("#register_btn").on('click', function (e) {
		e.preventDefault();
		var $userAccount = $('#usr_name').val();
		var $userPassword = $('#usr_pwd').val();
		var $confirmedPwd = $('#usr_repwd').val();
		var $userNickname = $('#usr_nick').val();
		var $tel = $('#usr_tel').val();
		var $email = $('#usr_email').val();
		var agreeRules = $('#filled-in-box').is(':checked');
		//获取国家、省会、城市值
		var $country = $('#country').val();
		var $city =$('#city').val();
		var $province=$('#province').val();

		function verifyemail(str){  
			var reg=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;  
			if( reg.test(str) ){  
				return true;  
			}else{  
				return false;  
			} 
		}
		function verifyHandset(str) {
			//中国手机号  
			var reg = /^(\+86)|(86)?1[3,5,7,8]{1}[0-9]{1}[0-9]{8}$/;  
			if( reg.test(str)) {  
				return true;  
			} else {  
				return false;  
			}
		}
		
		function verifyPassword(str) {
			//密码  
			var reg = /^([0-9]|[a-zA-Z]){6,16}$/;  
			if( reg.test(str)) {  
				return true;  
			} else {  
				return false;  
			}
		} 
		//alert($email);

		function telephoneCheck(str) {
			// 美国手机号
			var reg = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/g;
			return reg.test(str);

		}
		// // telephoneCheck("555-555-5555");

		function specialCheck(str){
			var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
			return reg.test(str);
		}

		//alert(specialCheck("$zyz"));
		if(verifyemail($userAccount)==true){
			if(verifyHandset($tel)==true||telephoneCheck($tel)==true){
				if(verifyPassword($userPassword)==true){
					if ($userPassword == $confirmedPwd){
						if(agreeRules = true){
								if($userNickname!=''&&$userNickname.length<=15){
									//对选择国家的校验
									if($country != ""){
										//对选择城市的校验
										if($city != ""){
											//对选择省会的校验
											if($province != ""){
												if(specialCheck($userNickname)==true){
													socket.emit('register', {
														userAccount: $userAccount,
														userPassword: $userPassword,
														userNickname: $userNickname,
														userPhoneNumber: $tel,
														userEmail: $email,
														userCountry:$country,
														userCity:$city,
														userProvince:$province
													});
												}else{
													alert("昵称不允许包含特殊字符！");
												}
									}else{
										alert("请选择省会！");
									}	
								}else{
									alert("请选择城市！");
								}
							}else{
								alert("请选择国家！");
							}
						}else{
							alert("昵称不能为空且小于15字");
						}
					}else{
						alert("请仔细阅读并同意用户协议！");
					}
				} else {
					alert("两次密码输入不一致!");
				}
			}else{
				alert('请输入6到16位的字母或者数字的密码');
			}
		}else{
			alert('请输入正确的手机号码')
		}
	}else{
		alert('请输入正确的邮箱格式');
	}	
  });
});
