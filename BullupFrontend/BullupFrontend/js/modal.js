$(document).ready(function(){
	$("#log_btn").click(function(){
		$("#sign_modal").css('display', 'none');
		$("#log_modal").css("display","block");
	});

	$("#log_close").click(function(){
		$("#log_modal").css("display", "none");
	});

	$("#sign_btn").click(function(){
		$("#log_modal").css('display', 'none');
		$("#sign_modal").css('display', 'block');
	});

	$("#sign_close").click(function(){
		$("#sign_modal").css("display", "none");
	});


});
