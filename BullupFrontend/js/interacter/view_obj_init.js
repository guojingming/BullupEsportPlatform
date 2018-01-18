$().ready(function(){
	/* dropdown menu initialize */
	$(".dropdown-button").dropdown({
		constrainWidth: true,
		hover: true
	});

	$('select').material_select();
	
	/* modal initialize */
	$("#create_room_modall").modal();
	
	/* modal initialize */
	$("#create_pubg_modall").modal();

	/* modal initialize */
	$("#log_modal").modal();

	$("#sign_modal").modal();

	$("#message_sheet").modal();
	
	/* #pubg_waiting_modal */ 
	$("#pubg_waiting_modal").modal();

	//$("#link_modal").modal();

	/* modal initialize */
	$("#bind_pubg_modal").modal();

	$(".user-collapse").sideNav();
	
    $('ul.tabs').tabs();
	
	$('#message_collapsible').collapsible();
    // If waiting mode ends, close detail modal and open the created room modal

	$('.collapsible').collapsible();

	//$('#match-bet-modal').modal();

	$('#fight-bet-modal').modal();

});
