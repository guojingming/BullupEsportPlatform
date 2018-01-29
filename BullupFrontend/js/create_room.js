$(document).ready(function(){

	$("#create_room").click(function(){
		$("#create_room_modall").css("display","block");

		var dateTime = new Date($.now());

		$("#create_date_time").text(dateTime);
	});

	$("#create_close").click(function(){
		$("#create_room_modall").css("display", "none");
	});


	$("#confirm_create_room_btn").click(function(){
		if(userInfo == null){
			bullup.alert('请您先登录');
			//return;
		}else if(roomInfo != null){
			bullup.alert("您已经加入了房间,无法创建新的房间！");
			//return ;
		}else{
			var room = {
			
				battleDesc : $("#battle_desc").val(),
				mapSelection :$('#map-selection option:selected').val(),
				winningCondition : "push-crystal",
				gameMode : $("#game_mode").val(),
				rewardType : $("#reward_type").val(),
				rewardAmount : $("#reward_amount").val()
			}
			if(userInfo.lolAccountInfo == undefined || userInfo.lolAccountInfo == null){
				bullup.alert("您还没有绑定LOL账号！");
				return;
			}
			if(userInfo.wealth < room.rewardAmount){
				bullup.alert("您的余额不足！请充值后再继续游戏！");
				return;
			}
			if(userInfo.suspension == 'TRUE'){
				bullup.alert("您的账号处于封号状态，不能进行约战");
				return;
			}
			
			socket.emit('roomEstablish', {
				roomName: userInfo.name + (new Date).valueOf(),
				captain: {
					name: userInfo                                                                                                                                                                       .name,
					userId: userInfo.userId,
					avatarId: userInfo.avatarId
				},
				participants: [
					{
						name: userInfo.name,
						userId: userInfo.userId,
						avatarId: userInfo.avatarId,
						strength: userInfo.strength,
						lolAccountInfo: userInfo.lolAccountInfo
					}
				],
				status: 'ESTABLISHING',
				gameMode: room.gameMode,
				battleDesc: room.battleDesc,
				rewardType : room.rewardType,
				rewardAmount: room.rewardAmount,
				mapSelection: room.mapSelection,
				winningCondition: room.winningCondition
			});
		}
		//console.log(room)
	});

});
