

function page(formedTeams,curPage){

	var teams = formedTeams;
	var new_teams = {};
	var teamArray = new Array();
	//根据金钱数,筛选队伍
	var reward_amount = $('#search_reward_amount').val() ? $('#search_reward_amount').val() : "reward_amount";
	if(reward_amount != "reward_amount"){       
		var str = reward_amount.slice(1);
		for(key in teams){
			if(str == teams[key].rewardAmount){
			   new_teams[key] = teams[key];
			}
		}
	}else{
       new_teams = teams;
	}
	
	//根据地图类型,刷选队伍
	var map_type = $('#bullup_seek_map').val() ? $('#bullup_seek_map').val() : "all_map";
	if(map_type != "all_map"){
        for(key in new_teams){
			if(map_type != new_teams[key].mapSelection){
				delete new_teams[key];
			}
		}		
	}
	//根据参战人数,筛选队伍
	var team_participants_num = $('#search_participants_num').val() ? $('#search_participants_num').val() : "team_participants_num";	
	if(team_participants_num != "team_participants_num"){
		var team_num = team_participants_num.slice(2);
		for(key in new_teams){
			if(team_num == new_teams[key].teamParticipantsNum){
				new_teams[key] = new_teams[key];
			}else{
				delete new_teams[key];                   
			}
		}
	}
	for(key in new_teams){
		teamArray.push(teams[key]);
	}
	//console.log('abcd:'+JSON.stringify(teamArray));
	var startIndex = curPage*9-9;
	var endIndex = curPage*9;
	
	//队伍根据时间进行排序
	var ascend_time = $('#search_time').val() ? $('#search_time').val() : 'ascend_time';	
	if(ascend_time == "ascend_time"){
    	var sliceArray = teamArray.reverse().slice(startIndex,endIndex);
	}else{
		var sliceArray = teamArray.slice(startIndex,endIndex);
	}
	//console.log(JSON.stringify(sliceArray));
	var battle_teams = bullup.loadSwigView('swig_battle.html', {
		teams: sliceArray,participant:team_participants_num,amount:reward_amount,sort:ascend_time,type:map_type
	});
	//页面跳转到对战大厅
	$('.content').html(battle_teams);
	$('#team-detail-modal').modal();
	$('#waiting-modal').modal();
    //保存被选中的值
	var participant_node = "[value='" + $('#search_participants_num').data("participant") + "']";
	$(participant_node).attr("selected","selected");
	var game_amount_node = "[value='" + $('#search_reward_amount').data("amount") + "']";
	$(game_amount_node).attr("selected","selected");
	var game_sort_node = "[value='" + $('#search_time').data('sort');
	$(game_sort_node).attr("selected","selected");
	var map_node = "[value='" + $('#bullup_seek_map').data("seek") + "']";
	$(map_node).attr("selected","selected");

	//根据时间,对比赛队伍的排序
	$("#search_time").change(function(){
		var game_sort_node = "[value='" + $('#search_time').data('sort');
		$(game_sort_node).attr("selected","selected");
		socket.emit('refreshFormedBattleRoom');
	});

	//根据地图,对队伍的筛选
	$("#bullup_seek_map").change(function(){
		var map_node = "[value='" + $('#bullup_seek_map').data('seek');
		$(map_node).attr("selected","selected");
		socket.emit('refreshFormedBattleRoom');
	});
	
	//根据比赛的人数，对队伍的筛选
	$('#search_participants_num').change(function(){
		var participant_node = "[value='" + $('#search_participants_num').data("participant") + "']";
		$(participant_node).attr("selected","selected");
		socket.emit('refreshFormedBattleRoom');
	});
	
	//根据比赛金钱数,对队伍的筛选
	$('#search_reward_amount').change(function(){
		var game_amount_node = "[value='" + $('#search_reward_amount').data("amount") + "']";
		$(game_amount_node).attr("selected","selected");
		socket.emit('refreshFormedBattleRoom');
	});
	
	$.getScript('./js/close_modal.js');
	$.getScript('./js/initial_pagination.js');
	$.getScript('./js/refresh_formed_room.js');
	$(".team_detail_btn").unbind();
	$(".team_detail_btn").click(function(){
		var btnId = $(this).attr('id');
		var roomName = btnId.substring(0, btnId.indexOf('_'));
		var room = null;
		for(var team in formedTeams){
			if(formedTeams[team].roomName == roomName){
				room = formedTeams[team];
				break;
			}
		}
		//room在队伍详情页
		var teamDetailsHtml = bullup.loadSwigView('swig_team_detail.html', {
			team: room
		});
		$('#team_detail_container').html(teamDetailsHtml);
		location.hash = "#team-detail-modal";
		///////////untest
		$('#invite-battle-btn').unbind();
		$('#invite-battle-btn').click(function(){
			if (roomInfo.captain.name == userInfo.name) {
				if (formedTeams[team].mapSelection == roomInfo.mapSelection) {
					if (formedTeams[team].teamParticipantsNum == roomInfo.teamParticipantsNum) {
						if (formedTeams[team].rewardAmount == roomInfo.rewardAmount) {
							if (formedTeams[team].captain.name != roomInfo.captain.name) {
									var battleInfo = {};
									battleInfo.hostTeamName = $('#team_details_team_name').html();
									battleInfo.challengerTeamName = teamInfo.roomName;
									battleInfo.userId = userInfo.userId;
									socket.emit('battleInvite', battleInfo);
								}else{
									$("#invite-battle-btn").attr('href', 'javascript:void(0)');
									bullup.alert("您不能邀请您自己的队伍");
								}
						} else {
							$("#invite-battle-btn").attr('href', 'javascript:void(0)');
							bullup.alert("您选择的队伍积分不符合");
						}
		
					} else {
						$("#invite-battle-btn").attr('href', 'javascript:void(0)');
						bullup.alert("您选择的队伍人数不符合");
					}
				} else {
					$("#invite-battle-btn").attr('href', 'javascript:void(0)');
					bullup.alert("您选择的队伍地图不符合");
				}

			}else{
				$("#invite-battle-btn").attr('href', 'javascript:void(0)');
				bullup.alert("您不是队长不能发起挑战");
			}
			
		});
		//////////
	});
	var $totalPage = Math.ceil(teamArray.length / 9);
	var $pageNumber = [];
	for(var i=1;i<=$totalPage;i++){
		$pageNumber.push(i);
	}
	var pages = {
		totalPage: $totalPage,
		pageNumbers: $pageNumber,
		currentPage: curPage
	};
	//console.log('hi there:'+JSON.stringify(pages));
	var pagination = bullup.loadSwigView('swig_pagination.html', pages);
	$('#pagination-holder').html(pagination);
}

$('.change_page_btn').on('click',function(){
	var pageId = $(this).attr('id');
	var $curPage = parseInt(pageId.substring(5));
	//alert(pageId+' '+$curPage+' '+typeof($curPage));
	//console.log(JSON.stringify(formedTeams));
	page(formedTeams,$curPage);
});