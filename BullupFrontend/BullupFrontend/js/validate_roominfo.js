$().ready(function(){
	$('#roominfo_form').validate({
		rules: {
			roominfo_name: {
				required: true
			},
			roominfo_desc: "required"
		},

		messages: {
			roominfo_name:{
				required: "房间名不能为空"
			},
			roominfo_desc:{
				required: "房间描述不能为空"
			}
		}
	});
});
