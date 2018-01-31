
    $().ready(function () {
		
		$("#withdraw_btn").on('click', function () {
				//余额
				var $balance = Number($('#balance').text());
				//alert(typeof($balance));
				var $bank_cardnumber = $('#bank_cardnumber').val();
				
				var $userId = userInfo.userId;
				var $battleCount = Number(userInfo.battleCount);
				//alert($battleCount);

				var $bank_country = $('#bank_country').val();
				var $bank_money = Number($('#bank_money').val());
				var $bank_firstname = userInfo.name;
				var $bank_lastname = $('#bank_lastname').val();
				var $name = $bank_firstname+$bank_lastname;
				var $bank_areacode = $('#bank_areacode').val();

				var $bank_phone = $('#bank_phone').val();
				var $bank_email = $('#bank_email').val();

				var $bank_streetaddress = $('#bank_streetaddress').val();
				var $bank_apt_suite_bldg = $('#bank_apt_suite_bldg').val();
				var $bank_zipcode = $('#bank_zipcode').val();

				function verifyCVC(str) {
					//CVC  
					var reg = /^([0-9]){3}$/;  
					if( reg.test(str)) {  
						return true;  
					} else {  
						return false;  
					}
				}
 
				function verifyName(str){  
					//姓名:要么是中文，要么是英文，不能混用 
					var reg =/^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/g;   
					if(reg.test(str)){  
						return true;  
					}else{  
						return false;  
					}  
				}
				
				 

				function verifyHandset(str) {
					//中国手机号  
					var reg = /^(\+86)|(86)?1[3,5,8]{1}[0-9]{1}[0-9]{8}$/;  
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
				// telephoneCheck("555-555-5555");
				//alert(telephoneCheck($bank_phone));
				function verifyemail(str){  
					var reg=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;  
					if( reg.test(str) ){  
						return true;  
					}else{  
						return false;  
					} 
				}
				//匹配Email邮
				function verifyEmail(){
					var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
					if(reg.test(str)){
						return true;
					}else{
						return false;
					}
				}
				
				if($battleCount>=10){
					if($bank_money!=null&&$bank_money!=0){
						if(verifyemail($bank_cardnumber)){
							if(verifyName($name)==true){
								if(telephoneCheck($bank_phone)==true||verifyHandset($bank_phone)==true){
									if(verifyemail($bank_email)){
										if($bank_money<=$balance){
											socket.emit('bankInfo', {
												userId : $userId,
												cardnumber:$bank_cardnumber,
												money:$bank_money,
												firstname  : $bank_firstname,
												lastname  : $bank_lastname,
												areacode  :$bank_areacode,
												phone  : $bank_phone,
												email  :$bank_email,
												streetaddress  : $bank_streetaddress,
												apt_suite_bldg  : $bank_apt_suite_bldg,
												zipcode  : $bank_zipcode,	
											});
											socket.emit('getBalance',{
												userId:$userId
											});						
											bullup.loadTemplateIntoTarget('swig_index.html', {}, 'main-view');
											$.getScript('/js/zymly.js');
											$.getScript('/js/Withdraw.js');	
										}else{
											bullup.alert('您的余额不足');
										}	
									}else{
										bullup.alert('请填写正确的邮箱格式');
									}
								}else{
									bullup.alert('请填写正确的手机号码');
								}
							}else{
								bullup.alert('请填写真实姓名');
								}
							}
						else{
							bullup.alert("请输入正确的PayPal号");
						}
					}else{
						bullup.alert('请填写提现金额');
					}
				}else{
					bullup.alert('您的对战次数不足10次,不能提现(′⌒`)');
				}		
			});
	});