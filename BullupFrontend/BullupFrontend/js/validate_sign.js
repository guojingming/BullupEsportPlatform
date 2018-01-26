$().ready(function(){
	$("#sign_form").validate({
		rules: {
			reg_name: {
				required: true,
				minlength: 3
			},
			reg_pwd:{
				required: true,
				minlength: 8
			},
			reg_repwd: {
				required: true,
				minlength:8,
				equalTo: "#reg_pwd"
			}
		},
		messages: {
			reg_name: {
				required: "请输入注册用户名",
				minlength: "用户名必须大于3位"
			},

			reg_pwd: {
				required: "请输入密码",
				minlength: "密码不能小于8位"
			},

			reg_repwd: {
				required: "请再次输入密码",
				minlength: "密码不能小于8位",
				equalTo: "与第一次输入不符"
			}
		}
	});

	$("#log_form").validate({
		rules: {
			log_name: {
				required: true,
				minlength: 3
			},
			log_pwd: {
				required: true,
				minlength: 8
			}
		},

		messages: {
			log_name: {
				required: "登录用户名不能为空",
				minlength: "用户名必须大于3位"
			},
			log_pwd: {
				required: "密码不能为空",
				minlength: "密码不能小于8位"
			}
		}
	});
});
