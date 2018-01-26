 $("#create_team").click(function(){
	//拿到信息		 
		//游戏模式
		//战斗排序
		 //下注类型
		   //下注钱数
			  //地图选择
				//胜利条件
        socket.emit('teamEstablish', {
			teamName: userInfo.name + (new Date).valueOf(),
			captain: {
				name: userInfo.name,                                                                                                                                                                       .name,
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

			status: 'ESTABLITEAMSHING',
			gameMode: team.gameMode,  //游戏模式
			battleDesc: team.battleDesc,  //战斗排序
			rewardType : team.rewardType,    //下注类型
			rewardAmount: team.rewardAmount, //下注钱数
            mapSelection: team.mapSelection, //地图选择
			winningCondition: team.winningCondition //胜利条件
		});
	
});

