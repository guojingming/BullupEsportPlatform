var inviteSelectedFriendBtnEvent = false;

$("#invite_friend_btn").click(function(){
    var friendListHeadHtml = bullup.loadSwigView('swig_friend_list_head.html', {
        user: userInfo
    });
    var friendListHtml = bullup.loadSwigView('swig_friend_list.html', {
        user: userInfo
    });
    $("#user_view").html(friendListHeadHtml);
    $('.friend-list').html(friendListHtml);
    if(!inviteSelectedFriendBtnEvent){
        inviteSelectedFriendBtnEvent = true;
        $("#invite_selected_friend_btn").click(function(){
            // 创建房间已有用户list
            var roomFriendList = roomInfo.participants.map((e) => e.userId);
            var notInvitedList = [];
            var friendListSize = Number.parseInt($("#friend_list_size_hidden").val());
            for(var i = 0;i<friendListSize;i++){
                if($("#friend_" + (i+1) + "_check_box").prop("checked")){//选中
                   // alert($("#friend_" + (i+1) + "_check_box").val());//打印选中的值
                    //发送请求
                    //console.log("room : " + JSON.stringify(roomInfo));
                    var friend = userInfo.friendList[i];
                    // 检查被邀请用户是否已经在房间内
                    if (roomFriendList.indexOf(friend.userId) != -1) {
                        // 如在，则跳过本用户
                        notInvitedList[notInvitedList.length] = friend.name;
                        continue;
                    }

                    socket.emit('message', {
                        name: friend.name,
                        userId: friend.userId,
                        messageText: "邀请组队",
                        messageType: "invitedFromFriend",
                        host: {
                            name: userInfo.name,
                            userId: userInfo.userId,
                        },
                        team: {
                            name: roomInfo.roomName,
                            bet: roomInfo.rewardAmount, // 赌注
                            mapId: roomInfo.mapSelection,
                            rule: roomInfo.winningCondition                     
                        }
                    });
                }
            }
            // 检查是否有用户因为已在房间内未被邀请
            if (notInvitedList.length != 0) {
                tempStr = notInvitedList.reduce((accumulator, currentValue) => accumulator.concat("，").concat(currentValue));
                
                bullup.alert("用户".concat(tempStr).concat("已在房间内！"));
                return;
            }
        });
        $("#invite_all_friend_btn").click(function(){
            if($("#invite_all_friend_btn").text()=="全选"){
            for(var i = 0;i<$('.friend-li').length;i++){
                if($('.friend-li').eq(i).find('.color-dot').hasClass('color-dot-green')){
                    $('.friend-li').eq(i).find('input').attr('checked',"checked");                
                }
            }
            $("#invite_all_friend_btn").text("取消");            
            }else{
                $("#invite_all_friend_btn").text("全选");
                for(var i = 0;i<$('.friend-li').length;i++){
                if($('.friend-li').eq(i).find('.color-dot').hasClass('color-dot-green')){
                        $('.friend-li').eq(i).find('input')[0].removeAttribute('checked');
                    }  
                }
            } 
        });
    }
   
});
