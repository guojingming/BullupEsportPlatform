$('.change_page_btn').on('click', function(e){
	e.preventDefault();

	var id = $(this).attr('id');

	//get page number from clicked link id
	var pageNum = id.slice(5);

	//reload page
	
	
});
