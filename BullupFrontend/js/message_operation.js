$(".message_accept_btn").unbind();
$(".message_accept_btn").on('click', function(e){
    
    var messageAcceptBtnId = $(this).attr('id');
    var messageAcceptBtnIdString = String(messageAcceptBtnId);
    messageAcceptBtnIdString = messageAcceptBtnIdString.substring(messageAcceptBtnIdString.indexOf('_') + 1);
    var messageIndexString = messageAcceptBtnIdString.substring(0,messageAcceptBtnIdString.indexOf('_'));
    var message = messageInfo[Number.parseInt(messageIndexString)];
    if(message == undefined){
        return;
    }
   
    switch(message.messageType){
        case 'invitedFromFriend':{
            var bet = message.team.bet;
            if(userInfo.lolAccountInfo == undefined || userInfo.lolAccountInfo == null){
                //无法加入房间
                bullup.alert("您还没有绑定LOL账号！无法加入该房间！");
                var inviteResult = {
                    errorCode: 1,
                    type: 'INVITERESULT',
                    text: userInfo.name + '由于没有绑定LOL账号，无法加入房间！',
                    extension: {
                        hostName: message.host.name,
                        hostId: message.host.userId,
                        teamName: message.team.name,
                        userInfo: {
                            name: userInfo.name,
                            userId: userInfo.userId,
                            avatarId: userInfo.avatarId,
                            strength: userInfo.strength
                        }
                    }
                };
                socket.emit('inviteResult', inviteResult);
                //删除消息
                messageInfo.splice(Number.parseInt(messageIndexString), 1);
                $('#message_center_nav').click();
                break;;
            }
            if(userInfo.wealth < message.team.bet){
                //无法加入房间
                bullup.alert("您的余额已经不足！无法加入该房间！");
                var inviteResult = {
                    errorCode: 1,
                    type: 'INVITERESULT',
                    text: userInfo.name + '由于余额不足，无法加入房间！',
                    extension: {
                        hostName: message.host.name,
                        hostId: message.host.userId,
                        teamName: message.team.name,
                        userInfo: {
                            name: userInfo.name,
                            userId: userInfo.userId,
                            avatarId: userInfo.avatarId,
                            strength: userInfo.strength
                        }
                    }
                };
                socket.emit('inviteResult', inviteResult);
                //删除消息
                messageInfo.splice(Number.parseInt(messageIndexString), 1);
                $('#message_center_nav').click();
                break;;
            }

            var inviteResult = {
                errorCode: 0,
                type: 'INVITERESULT',
                text: userInfo.name + '加入游戏',
                extension: {
                    hostName: message.host.name,
                    hostId: message.host.userId,
                    teamName: message.team.name,
                    userInfo: {
                        name: userInfo.name,
                        userId: userInfo.userId,
                        avatarId: userInfo.avatarId,
                        strength: userInfo.strength,
                        lolAccountInfo: userInfo.lolAccountInfo
                    }
                }
            };
            socket.emit('inviteResult', inviteResult);
            //删除消息
            messageInfo.splice(Number.parseInt(messageIndexString), 1);
            //console.log(JSON.stringify(messageInfo[Number.parseInt(messageIndexString)]));
            $('#message_center_nav').click();          
            break;
        }

        case 'inviteBattle':{
            var inviteBattleResult = {
                errorCode: 0,
                type: 'INVITEBATTLERESULT',
                text: '',
                extension: {
                    hostTeam: message.hostTeam,
                    challengerTeam: message.team
                }
            }
            socket.emit('inviteBattleResult', inviteBattleResult);
            //删除消息
            messageInfo.splice(Number.parseInt(messageIndexString), 1);
            $('#message_center_nav').click();
                $('#message_sheet').modal("close");                     
            break;
        }

        case 'addFriend':{
            var addFriendResult = {
                errorCode: 0,
                type: 'ADDFRIENDRESULT',
                text: '添加好友成功',
                extension: {
                    'userInfo': message.userInfo,
                    'invitedUserInfo': message.invitedUserInfo
                }
            }
            socket.emit('addFriendResult', addFriendResult);

            messageInfo.splice(Number.parseInt(messageIndexString), 1);
            $('#message_center_nav').click();
            break;
        }
    }

});


$(".message_reject_btn").unbind();
$(".message_reject_btn").on('click', function(e){
    var messageRejectBtnId = $(this).attr('id');
    var messageRejectBtnIdString = String(messageRejectBtnId);
    messageRejectBtnIdString = messageRejectBtnIdString.substring(messageRejectBtnIdString.indexOf('_') + 1);
    var messageIndexString = messageRejectBtnIdString.substring(0,messageRejectBtnIdString.indexOf('_'));
    var message = messageInfo[Number.parseInt(messageIndexString)];
    if(message == undefined){
        return;
    }

    switch(message.messageType){
        case 'invitedFromFriend':{
            var inviteResult = {
                errorCode: 1,
                type: 'INVITERESULT',
                text: userInfo.name + '拒绝了您的邀请',
                extension: {
                    hostName: message.host.name,
                    hostId: message.host.userId,
                    teamName: message.team.name,
                    userInfo: {
                        name: userInfo.name,
                        userId: userInfo.userId,
                        avatarId: userInfo.avatarId,
                        strength: userInfo.strength
                    }
                }
            };
            socket.emit('inviteResult', inviteResult);
            //删除消息
            messageInfo.splice(Number.parseInt(messageIndexString), 1);
            //console.log(JSON.stringify(messageInfo[Number.parseInt(messageIndexString)]));
            $('#message_center_nav').click();
            if(messageInfo.lenght==0){
                $('.modal').modal('close');
            }
            break;
        }

        case 'addFriend':{
            var addFriendResult = {
                errorCode: 1,
                type: 'ADDFRIENDRESULT',
                text: '添加好友失败',
                extension: {
                    'userInfo': message.userInfo,
                    'invitedUserInfo': message.invitedUserInfo
                }
            }
            socket.emit('addFriendResult', addFriendResult);

            messageInfo.splice(Number.parseInt(messageIndexString), 1);
            $('#message_center_nav').click();
            break;
        }
         case 'inviteBattle':{
            var inviteBattleResult = {
                errorCode: 1,
                type: 'INVITEBATTLERESULT',
                text: userInfo.name + '拒绝了您的邀请',
                extension: {
                    userId:message.team.captain.userId
                }
            }
            socket.emit('inviteBattleResult', inviteBattleResult);
            //删除消息
            messageInfo.splice(Number.parseInt(messageIndexString), 1);
            $('#message_center_nav').click();
            break;
        }
    }
});
//新添加，点击删除可以删除消息系统中所有的消息
$("#message_center_btn").on('click',function(e){
    var messageDelBtnId = $(this).attr('id');
    var messageDelBtnIdString = String(messageDelBtnId);
    messageDelBtnIdString = messageDelBtnIdString.substring(messageDelBtnIdString.indexOf('_') + 1);
    var messageIndexString = messageDelBtnIdString.substring(0,messageDelBtnIdString.indexOf('_'));
    var message = messageInfo[Number.parseInt(messageIndexString)];
    messageInfo.splice(Number.parseInt(messageIndexString), 1);
        })  