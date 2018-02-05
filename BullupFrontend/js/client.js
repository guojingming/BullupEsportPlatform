var io = require('socket.io-client');
var socket = io.connect('http://bullesport.com:3000');
//var auto_script = require('./js/auto_program/lol_auto_script');
var lol_process = require('./js/auto_program/lol_process.js');
var pubg_crawler = require('./js/pubg_crawler.js');
var lolUtil = require('./js/util/lol_util.js');
var fs =require('fs');

//ling test

var userInfo = null;
var teamInfo = null;
var roomInfo = null;
var versusLobbyInfo = null;
var battleInfo = null;
var formedTeams = null;
var messageInfo = [];

var match_timer = null;

var pubgRoomInfo = [{
    'na':  [],
    'eu':  [],
    'as':  [],
    'oc':  [],
    'sa':  [],
    'sea': [],
    'krjp':[]
}];

// 记录本次客户端已登陆用户，以及房间、队伍所在状态
var prevInfo = [];

var lastSocketStatus = null;
var lastSocketId = null;
var new_friend_arr=[];


socket.on('success', function (data) {

    socket.emit('tokenData', data.token);

    logger.listenerLog('success'); 
    console.log(data);
});


socket.on('feedback', function (feedback) {

    socket.emit('tokenData', feedback.token);

    switch (feedback.type) {
        case 'LOGINRESULT':
            handleLoginResult(feedback);
            break;
        case 'REGISTERRESULT':
            //userInfo = handleRegistResult(feedback);
            handleRegistResult(feedback);
            break;

        case 'ESTABLISHROOMRESULT':
            handleRoomEstablishmentResult(feedback);
            break;
        
        case 'ESTABLISHTEAMMATCHRESULT':
            handleRoomEstablishmentMatchResult(feedback);
            break;

        case 'INVITERESULT':
            handleFeedback(feedback);
            break;

        case 'VERSUSLOBBYINFO':
            versusLobbyInfo = handleFeedback(feedback);
            break;

        case 'TEAMDETAILS':
            var teamDetails = handleFeedback(feedback);
            //console.log(JSON.stringify(teamDetails, null, '\t'));
            break;

        // case 'INVITEBATTLERESULT':
        //     // 这里应该有一个自己的处理函数但是目前处理方式相同所以暂时用这个
        //     handlePersonalCenterResult(feedback);
        //     break;

        case 'STRENGTHRANKRESULT':
            var rankList = handleFeedback(feedback);
            handleRankList(rankList);
            break;

        case 'LOLBINDRESULT':
            handleLOLBindResult(feedback);
            break;

        case 'ESTABLISHTEAMRESULT':
            handleTeamEstablishResult(feedback);
            break;
        
        case 'REFRESHFORMEDBATTLEROOMRESULT':
            handleRefreshFormedBattleRoomResult(feedback);
            break;
       case  'FEEDBACKMESSAGE':
            feedbackMessage(feedback);
            break;

        case 'PESONALCENTERRESULT':
            handlePersonalCenterResult(feedback);
            break;
         
        case 'PAYMENTRESULT' :
            handleBankInfo(feedback);
            break;
        //-------------------------------
        case 'RECHARGERESULT':
            handleRechargeResult(feedback);
            break;
        
        case 'WITHDRAWRESULT':
            handleWithdrawResult(feedback);
            break;
        case 'GETBALANCERESULT':
            handleGetBalanceResult(feedback);
            //handleGetBalanceResult2(feedback);
            break;
        //--------查询提现信息-------------
        case 'SEARCHWITHDRAWRESULT':
            handleSearchWithdrawResult(feedback);
            break;
        //--------------查看官网前端数据-----------
        case 'BULLUPWEBRESULT':
            handleBullupWebResult(feedback);
            break;
        //--------同意提现-----------------
        case 'SETSTATUSTRUERESULT':
            handleWithdrawAgreeResult(feedback);
            break;
        //--------驳回提现----------------
        case 'SETSTATUSFALSERESULT':
            handleWithdrawDisagreeResult(feedback);
            break;
        //--------记录------------
        case 'CASHFLOWRESULT':
            handleCashFlowSearchResult(feedback);
            break;
        //--------查询全部约战记录--------
        case 'SEARCHBATTLERECORDRESULT':
            handleSearchBattleRecordResult(feedback);
            break;
        //--------修改约战结果-----------
        case 'CHANGEBATTLERECORDRESULT':
            hanadleChangeBattleRecordResult(feedback);
            break;
        //--------查询全部用户信息--------------
        case 'SEARCHALLACCOUNTRESULT':
            handleSearchAllAccountResult(feedback);
            break;
        //--------封号结果-------------------
        case 'SUSPENDACCOUNTRESULT':
            handleSuspendAccountResult(feedback);
            break;
        //--------解封结果-----------------
        case 'UNBLOCKACCOUNTRESULT':
            handleUnblockAccountResult(feedback);
            break;
        //--------查询全部反馈信息-----------
        case 'SEARCHFEEDBACKRESULT':
            handleSearchFeedbackResult(feedback);
            break;
        //--------处理反馈------------------
        case 'HANDLEFEEDBACKRESULT':
            handleOverFeedbackResult(feedback);
            break;
        //--------充值管理结果----------------
        case 'SEARCHRECHARGEINFORESULT':
            handleSearchAllRechargeResult(feedback);
            break;
        //--------简单统计--------------
        case 'ANALYSISDATARESULT':
            handleAnalysisDataResult(feedback);
            break;
        //--------邀请码信息------------
        case 'INVITEDCODERESULT':
            handleInvitedCodeResult(feedback);
            break;
        //--------LOLAPIKey更新结果----------、
        case 'LOLUPDATERESULT':
            handleLOLApiUpdateResult(feedback);
            break;
        case 'LOLKEYREQUESTRESULT':
            handleLOLKeyRequestResult(feedback);
            break;
        case 'ADDFRIENDRESULT':
            handleAddFriendResult(feedback);
            break;
        case 'ICONUPDATERESULT':
            handleIconUpdateResult(feedback);
            break;  
        case 'UPDATEINFORESULT':
            handleUpdateInfoResult(feedback);
            break;
        //创建lol房间超时
        case 'BATTLEISTIMEOUT':
            handleBattleTimeoutResulr(feedback);
            break;
        //取消自由匹配
        case 'CANCELMATCHRESULT':
            handleCancelMatch(feedback);
            break;
        //同步倒计时
        case 'GETFLIPCLOCKRESULT':
            handleGetFlipClock(feedback);
            break;
        //好友状态
        case 'UPDATEFRIENDSTATUS':
            handleUpdateFriendStatus(feedback);
            break;
        //游戏开始后的倒计时
        case 'GETAFTERFLIPCLOCKRESULT':
            handleGetAfterFlipClock(feedback);
            break;
        //删除好友
        case'DELETEFRIENDS':
            deleteFriends(feedback)
            break;
            case "DELETETOFRIENDS":
            deleteTofriends(feedback);
            break;
        //绝地求生账号绑定
        case'PUBGBINDRESULT':
            handlePUBGBindResult(feedback);
            break;
        
        //绝地求生返回结果
        case 'PUBGBATTLERESULT':
            handlePUBGBattleResult(feedback);
            break;
        //用户点赞
        case 'DIANZANRESULT':
            handleDianZanResult(feedback);
            break;
        //更新KDA
        case 'GETNEWKDARESULT':
            handleGetNewKDA(feedback);
            break;
        //刷新余额
        case 'GETLASTESTWEALTHRESULT':
            handleGetLastestWealthResult(feedback);
            break; 
        }
});

//刷新余额
function handleGetLastestWealthResult(feedback){
    var newMoney = feedback.extension.money;
    userInfo.wealth = newMoney;
}

//更新KDA
function handleGetNewKDA(feedback){
    userInfo.strength = feedback.extension.strength;
    console.log('laalal:',JSON.stringify(userInfo));
}

//用户点赞
function handleDianZanResult(feedback){
    if(feedback.extension.mode == 'favor'){
        thumb_up('rotate(0deg)');
        $('#mo_fover').text(feedback.text);
        $('#mo_fover_box').css({"transform":"rotate(0deg)","top":"423px"});
    }else{
        thumb_up('rotate(180deg)');
        $('#mo_fover').text(feedback.text);
        $('#mo_fover_box').css({"transform":"rotate(180deg)","top":"335px"});
    }
}



//pubg结果
function handlePUBGBattleResult(feedback){
    console.log(JSON.stringify(feedback.extension.info));
    var pubgResultHtml = bullup.loadSwigView('swig_pubg_result.html',{
        data: feedback.extension.info
    });
    clickPUBGCount = 1;
    $('#main-view').html(pubgResultHtml);
}

//pubg页面
function pubgRoomSurface(server){
   var PubgHtml = bullup.loadSwigView('swig_pubg.html',{
       data: pubgRoomInfo[0][server][pubgRoomInfo[0][server].length - 1]
   });
   $('#main-view').html(PubgHtml);
}

//刷新好友状态
function handleUpdateFriendStatus(feedback){
    var friendInfo = feedback;
    //alert(JSON.stringify(friendInfo));
    var tempList = userInfo.friendList;
    for(var key in tempList){
        if(tempList[key].name == feedback.name){
            tempList[key].online = feedback.online;
            tempList[key].status = feedback.status;
            break;
        }
    }
    //定义一个空数组，用来保存根据状态排序后的信息
    var arr = new Array();
    for(obj in tempList){
        arr.push(tempList[obj]);
    }
    arr.sort(function(x,y){
        return x.online < y.online ? 1 : -1;
    });
    //console.log('this is arr:',arr);

    userInfo.friendList = arr;
    //console.log(JSON.stringify(userInfo.friendList));

    var friendCount = 0;
    for(var index in arr){
        friendCount++
    }
    bullup.loadTemplateIntoTarget('swig_home_friendlist.html', {
        'userInfo': userInfo,
        'friendListLength': friendCount
    }, 'user-slide-out');
    $('.collapsible').collapsible();

    var friendListHeadHtml = bullup.loadSwigView('swig_friend_list_head.html', {
        user: userInfo
    });
    var friendListHtml = bullup.loadSwigView('swig_friend_list.html', {
        user: userInfo
    });
    $("#user_view").html(friendListHeadHtml);
    $('.friend-list').html(friendListHtml);
}

socket.on('message', function(message){
    socket.emit('tokenData', message.token);

    if(message.messageToken == undefined){
        var err;
        throw err;
    }else{
        for(messageIndex in messageInfo){
            if(message.messageToken == messageInfo[messageIndex].messageToken){
                return;
            }
        }
    }

    switch(message.messageType){
        case 'invitedFromFriend':
            handleInviteFromFriend(message); 
            break;
        case 'inviteBattle':
            handleBattleInviteRequest(message);
            break;
        case 'addFriend':
            handleAddFriendRequest(message);
            break;
    }

});


// 监听服务端队伍信息更新
socket.on('teamInfoUpdate', function (data) {

    socket.emit('tokenData', data.token);

    roomInfo = data;

    //userInfo.creatingRoom = true;
    //console.log(JSON.stringify(roomInfo));
    //处理空值
    for(var index in roomInfo.participants){
        if(roomInfo.participants[index] == null){
            delete roomInfo.participants[index];
            roomInfo.participants.length -= 1;
        }
    }
    //更新房间信息
    var roomInfoFrameHtml = bullup.loadSwigView('swig_myroom_frame.html', {});
    var roomInfoHtml = bullup.loadSwigView('swig_myroom_info.html', {
        room: roomInfo
    });
    $('.modal').modal('close');
    var teamates = roomInfo.participants;
    var teamatesHtml = bullup.loadSwigView('swig_myroom_teamate.html', {
        teamates : teamates
    });
    $('.content').html(roomInfoFrameHtml);
    $('#team_info').html(roomInfoHtml);
    $('#teamates_info').html(teamatesHtml);
    
    if(userInfo.name == roomInfo.participants[0].name){
        //房主更新friendList
        $.getScript('/js/invite_friend.js');
        $('#invite_friend_btn').sideNav({
            menuWidth: 400, // Default is 300
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true, // Choose whether you can drag to open on touch screens,
            onOpen: function(el) {},
            onClose: function(el) {}
        });

        $("#confirm_create_team_btn").click(function(){
            if(roomInfo.gameMode == 'match'){
                //bullup.alert("匹配中，请等待！");
                roomInfo.status = "MATCHING";
                teamInfo = roomInfo;
                bullup.loadTemplateIntoTarget('swig_fightfor.html', {
                    'participants': roomInfo.participants
                }, 'main-view');
                var data = getRadarData(roomInfo.participants);
                console.log(data);
                var labelArray = ['击杀', '死亡', '助攻','治疗', '造成伤害', '承受伤害'];
                var dataArray1 = data;
                bullup.generateRadar(dataArray1, null, labelArray, "我方战力", "team-detail-chart");
            }

            var teamStrengthScore = 0;
            var teamParticipantsNum = 0;
            for(var index in roomInfo.participants){
                teamStrengthScore += roomInfo.participants[index].strength.score;
                teamParticipantsNum++;
            }
            teamStrengthScore /= teamParticipantsNum;
            roomInfo.teamStrengthScore = teamStrengthScore;
            roomInfo.teamParticipantsNum = teamParticipantsNum;

            socket.emit('establishTeam', roomInfo);
        });
        $("#quit_room_btn").click(function(){
            console.log('wocaoda:',JSON.stringify(roomInfo));
            socket.emit('quitRoom',{
                userId: userInfo.userId,
                roomName: roomInfo.roomName
            });
            roomInfo = null;
            $('#router_starter').click();
        });
    }else{
        //普通对员只显示队伍信息，没有好友邀请栏
        $('#invite_friend_btn').css('display', 'none');
        $('#confirm_create_team_btn').css('display', 'none');
        $("#quit_room_btn").click(function(){
            console.log('wocaoda:',JSON.stringify(roomInfo));
            socket.emit('quitRoom',{
                userId: userInfo.userId,
                roomName: roomInfo.roomName
            });
            roomInfo = null;
            $('#router_starter').click();
        });
    }

    // 解决被邀请人同意后房主弹出消息中心
    // $('#message_center_nav').click();
    // {"roomName":"嵇昊雨1503584960077","captain":{"name":"嵇昊雨","userId":30,"avatarId":1},"participants":[{"name":"嵇昊雨","userId":30,"avatarId":1,"strength":{"kda":"0.0","averageGoldEarned":0,"averageTurretsKilled":0,"averageDamage":0,"averageDamageTaken":0,"averageHeal":0,"score":2000}},{"name":"嵇昊雨","userId":30,"avatarId":1,"strength":{"kda":"0.0","averageGoldEarned":0,"averageTurretsKilled":0,"averageDamage":0,"averageDamageTaken":0,"averageHeal":0,"score":2000}}],"status":"ESTABLISHING","gameMode":"battle","battleDesc":"不服来战","rewardType":"bullupScore","rewardAmount":"10","mapSelection":"map-selection-1","winningCondition":"push-crystal"}

    // {"name":"嵇昊雨","userId":30,"avatarId":1,"wealth":0,"online":true,"status":"IDLE","friendList":{"郭景明":{"name":"郭景明","userId":29,"avatarId":1,"online":"true","status":"idle"},"嵇昊雨":{"name":"嵇昊雨","userId":30,"avatarId":1,"online":"true","status":"idle"}},"relationMap":{"currentTeamId":null,"currentGameId":null},"strength":{"kda":"0.0","averageGoldEarned":0,"averageTurretsKilled":0,"averageDamage":0,"averageDamageTaken":0,"averageHeal":0,"score":2000}}

    //var temp = bullup.loadSwigView("./swig_menu.html", { logged_user: userInfo });
});


socket.on('battleInfo', function (battle) {

    socket.emit('tokenData', battle.token);
    console.log("TOKEN: " + battle.token);

    battleInfo = battle;
    //console.log(JSON.stringify(battleInfo));
    //console.log(lolRoom);
});


//加载比赛页面
function swig_fight(lolRoom){
    var battleRoomHtml = bullup.loadSwigView("./swig_fight.html", {
        blueSide: battleInfo.blueSide,
        redSide: battleInfo.redSide,
        lolRoom: lolRoom,
        userId:userInfo.userId,
    });
    $('#main-view').html(battleRoomHtml);
    $('#waiting-modal').css('display', 'none');    
    $('#team-detail-modal').css('display', 'none');    
    $('.modal-overlay').remove();
    if(match_timer != null){
        //清除自由匹配中的计时函数
        window.clearInterval(match_timer);
        match_timer = null;     
     }
}


var roomCount = 0;
socket.on('lolRoomEstablish', function (lolRoom) {
    if(match_timer != null){
       //清除自由匹配中的计时函数
       window.clearInterval(match_timer);
       match_timer = null;       
    }
    socket.emit('tokenData', lolRoom.token);
    //userInfo.liseningResult = true; 
    if (userInfo.userId == lolRoom.creatorId) {
        //开始抓包
        //if( userInfo.creatingRoom){
        lolRoom.team = "blue";
        swig_fight(lolRoom);
        //userInfo.creatingRoom = false;
        //console.log('this is abcdf',roomCount);
        if(roomCount == 0){
            lol_process.grabLOLData('room', socket);
            roomCount = 2; 
        }
        // 如果用户是创建者，则创建房间
        bullup.alert('请 您 在规定时间内去 <b><span style="color:#0a0aa0;">创建</span></b> 房间，房间名: ' + lolRoom.roomName + ' 密码： ' + lolRoom.password + '<br> 请在LOL加入 <b style="color:#0a0aa0"> 蓝方 </b> 战队');
        var bluePts = battleInfo.blueSide.participants;
        var redPts = battleInfo.redSide.participants;
        var own;
        var enemy;
        for(key in bluePts){
            if(bluePts[key].name==userInfo.name){
                own = bluePts;
                enemy = redPts;
            }else{
                own = redPts;
                enemy = bluePts;
            }
        }
        var o = getRadarData(own);
        var e = getRadarData(enemy);
        
        var labelArray = ['击杀', '死亡', '助攻','治疗', '造成伤害', '承受伤害'];
        var dataArray1 = o;
        var dataArray2 = e;
        //-------------------我方---------敌方------
        bullup.generateRadar(dataArray1, dataArray2, labelArray, "战力对比", "teams-radar-chart");
        //handleTimeout(1000*60*3);
        handleTimeout(1000*60*5);
        var clock = $('.countdown-clock').FlipClock(lolRoom.time, {
            clockFace: 'MinuteCounter',
            countdown: true
        });
        $('#my_collapsible').collapsible('open', 0);
        $('#my_collapsible').collapsible('open', 1);
        $('#my_collapsible').collapsible('open', 2);
        $('#component_collapsible').collapsible('open', 0);
        $('#component_collapsible').collapsible('open', 1);
        $('#component_collapsible').collapsible('open', 2);
        $('#my_collapsible').collapsible('open', 3);
        $('#my_collapsible').collapsible('open', 4);
        $('#component_collapsible').collapsible('open', 3);
        $('#component_collapsible').collapsible('open', 4);
        //自动创建房间
        //auto_script.autoCreateLOLRoom(lolRoom.roomName, lolRoom.password);
        //}
    } else {
        // 如果不是创建者，则显示等待蓝方队长建立房间
        //bullup.alert('请等待');
        //if(userInfo.creatingRoom){
        //$("#router_test_page2").click();
        //console.log('this is abcdf',roomCount);
        if(roomCount == 0){
            lol_process.grabLOLData('room', socket);
            roomCount = 2; 
        }        
        
        var bluePts = battleInfo.blueSide.participants;
        var redPts = battleInfo.redSide.participants;
        var own;
        var enemy;

        for(key in redPts){
            if(redPts[key].name==userInfo.name){
                //判断是否是红队,提示进入红队
                lolRoom.createUser = false;
                lolRoom.team = "red";
                swig_fight(lolRoom);
                bullup.alert('请 您 在规定时间内 <b><span style="color:red"> 加入 </span></b> 房间，房间名： ' + lolRoom.roomName + '  密码： ' + lolRoom.password +'<br>请在LOL加入<b style="color:red"> 红方 </b>战队');
            }
        }
        for(key in bluePts){
            if(bluePts[key].name==userInfo.name){
                //判断用户是否是蓝队,提示进入蓝队
                lolRoom.createUser = false;
                lolRoom.team = "blue";
                swig_fight(lolRoom);
                bullup.alert('请 您 在规定时间内去 <b><span style="color:#0a0aa0">加入</span></b> 房间，房间名: ' + lolRoom.roomName + ' 密码： ' + lolRoom.password + '<br> 请在LOL加入<b style="color:#0a0aa0"> 蓝方 </b>战队');            
                own = bluePts;
                enemy = redPts;
            }else{
                own = redPts;
                enemy = bluePts;
            }
        }
        var o = getRadarData(own);
        var e = getRadarData(enemy);

        var labelArray = ['击杀', '死亡', '助攻','治疗', '造成伤害', '承受伤害'];
        var dataArray1 = o;
        var dataArray2 = e;
        
        bullup.generateRadar(dataArray1, dataArray2, labelArray, "战力对比", "teams-radar-chart");
        var clock = $('.countdown-clock').FlipClock(lolRoom.time, {
            clockFace: 'MinuteCounter',
            countdown: true
        });
        $('#my_collapsible').collapsible('open', 0);
        $('#my_collapsible').collapsible('open', 1);
        $('#my_collapsible').collapsible('open', 2);
        $('#component_collapsible').collapsible('open', 0);
        $('#component_collapsible').collapsible('open', 1);
        $('#component_collapsible').collapsible('open', 2);
        $('#my_collapsible').collapsible('open', 3);
        $('#my_collapsible').collapsible('open', 4);
        $('#component_collapsible').collapsible('open', 3);
        $('#component_collapsible').collapsible('open', 4);
        //}
    }
});

function handleGetFlipClock(feedback){
    var $time = feedback.extension.time;
    battleInfo.flipClock = $time; 
}

function thumb_up(deg){
    var index = '<iframe style="background:rgba(0,0,0,0)" frameborder="0" width="1280px" height="800px" src="./swig_mo_index.html" allowtransparency="true"></iframe>';
    $("#mo-view").show();
    $("#mo-view").append(index);
    $("#mo-view").css({'background':"rgba(0,0,0,0)",'transform':deg});
    setTimeout(function(){
    $("#mo-view").hide();
    },3000)
}


function handleGetAfterFlipClock(feedback){
    var $time = feedback.extension.time;
    battleInfo.afterFlipClock = $time;
    //console.log('this is afc:',JSON.stringify(battleInfo),battleInfo.afterFlipClock);
}

var timeControl;
function handleTimeout(num){
    var pointInfo = {
        battleInfo: battleInfo,
        battleName:battleInfo.battleName,
        blueRoomName:battleInfo.blueSide.roomName,
        redRoomName:battleInfo.redSide.roomName,
        type:'beforeStart'
    };
    timeControl = setTimeout(function(){
        socket.emit('isTimeout',pointInfo);
    },num);
}

function handleBattleTimeoutResulr(feedback){
    bullup.alert(feedback.text);
    $('#router_starter').click();
    formedTeams = feedback.extension.formedTeams;
    lol_process.grabLOLData('killProcess', null);
    roomInfo = null;
    teamInfo = null;
    battleInfo = null;
    roomCount = 0;
}

socket.on('lolRoomEstablished', function (data) {
    socket.emit('tokenData', data.token);    
    //游戏开始 刷新时钟 
    //if(userInfo.liseningResult == true ){
    //$("#router_test_page").click();
    lol_process.grabLOLData('result', socket);
    $("#show_game_start").css("display","inline-block");
    bullup.alert('游戏已开始');     
    clearTimeout(timeControl);
    if(userInfo.userId == battleInfo.blueSide.captain.userId){
        handleTimeout2(1000*60*90);
    }
    isGameStart();
    battleInfo.status = 'ready';
    roomCount = 0;       
    //userInfo.liseningResult = false;
    //}
    //userInfo.creatingRoom = false;
});

function isGameStart(){
    var clock = $('.countdown-clock').FlipClock(5400, {
        clockFace: 'MinuteCounter',
        countdown: true
    });
    if(userInfo.userId == battleInfo.blueSide.captain.userId){
        socket.emit('afterStartClock',{
            battleName:battleInfo.battleName,
            firstTime: true
        });
    }
}

function handleCancelMatch(feedback){
    $('#router_starter').click();
    bullup.alert(feedback.text);
    if(match_timer != null){
        window.clearInterval(match_timer);
        match_timer = null;
    }
    roomInfo = feedback.extension;
    teamInfo = null;
    battleInfo = null;
}

socket.on('chatMsg', function(msg){
    if(userInfo == null){
        return;
    }
    if(userInfo.name == undefined || msg.chatName!=userInfo.name){
        var msgId = msg.chatName + String((new Date).valueOf());
        var msgHtml = '<ul id="messages" style="width: 100%;"><li class="friend-messages" style="float:right;"><img style="width:50px;height:50px;border-radius: 36px;float:left;margin-top:9px;" src="./media/user_icon/'+ msg.userIconId + '.png"><p id="' + msgId + '" style="white-space: normal;;background: #b3ade9;color: #fff;font-size: 18px;padding: 15px; margin: 5px 10px 0;border-radius: 10px;  float:left"></p> </li></ul>'
        $('#messages').append(msgHtml);
        $('#' + msgId + '').html(msg.chatName + ":" + msg.chatMsg);
    }else{
        var msgId = msg.chatName + String((new Date).valueOf());
        var msgHtml = '<ul id="messages" style="width: 100%;"><li class="friend-messages" style="float:left;"><img style="width:50px;height:50px;border-radius: 36px;float:left;margin-top:9px;" src="./media/user_icon/'+ msg.userIconId + '.png"><p id="' + msgId + '" style="white-space: normal;;background: #009fab;color: #fff;font-size: 18px;padding: 15px; margin: 5px 10px 0;border-radius: 10px; float:left;"></p> </li></ul>'
        $('#messages').append(msgHtml);
        $('#' + msgId + '').html(msg.chatName + ":" + msg.chatMsg);
    }
    if($('.vessel') != undefined && $('.vessel') != null && $('.vessel')[0] != undefined && $('.vessel')[0] != null){
        $('.vessel').scrollTop( $('.vessel')[0].scrollHeight );  
    }
    
});
    
var timeControl2;
function handleTimeout2(num){
    var pointInfo = {
        battleInfo: battleInfo,
        battleName:battleInfo.battleName,
        blueRoomName:battleInfo.blueSide.roomName,
        redRoomName:battleInfo.redSide.roomName,
        type:'afterStart'
    };
    timeControl2 = setTimeout(function(){
        socket.emit('isTimeout',pointInfo);
    },num);
}

socket.on('battleResult', function(resultPacket){
    socket.emit('tokenData', resultPacket.token);
    clearTimeout(timeControl2);
    //console.log('nmb',lol_process.gameStartCount);
    lol_process.gameStartCount = 0;
    //读取数据
    var winTeam = resultPacket.winTeam;
    var battleResultData = {};
    var flag = false;
    for(var paticipantIndex in winTeam){
        if(winTeam[paticipantIndex].userId == userInfo.userId){
            flag = true;
            break;
        }
    }
   
    if(flag){
        //赢了     
        for( key in resultPacket.winTeam ){
            for ( key1 in resultPacket.participants){
                if( resultPacket.winTeam[key].lolAccountInfo.user_lol_account==resultPacket.participants[key1].accountId ){
                  resultPacket.winTeam[key].stats = resultPacket.participants[key1].stats; 
                }
            }
        }
        for( key in resultPacket.loseTeam ){
            for ( key1 in resultPacket.participants){
                if( resultPacket.loseTeam[key].lolAccountInfo.user_lol_account==resultPacket.participants[key1].accountId){
                    resultPacket.loseTeam[key].stats = resultPacket.participants[key1].stats;
                }
            }
        }  
        battleResultData.own_team = resultPacket.winTeam;
        battleResultData.win = 1;
        battleResultData.gameLength = resultPacket.gameLength;
        battleResultData.rival_team = resultPacket.loseTeam;
        battleResultData.wealth_change = 0.8 * resultPacket.rewardAmount;        
       
    }else{
        //输了
        for( key in resultPacket.winTeam ){
            for ( key1 in resultPacket.participants){
                if(resultPacket.winTeam[key].lolAccountInfo.user_lol_account==resultPacket.participants[key1].accountId){
                    resultPacket.winTeam[key].stats = resultPacket.participants[key1].stats;    
                    }
                }
            }
        for( key in resultPacket.loseTeam){
            for ( key1 in resultPacket.participants){
                if(resultPacket.loseTeam[key].lolAccountInfo.user_lol_account==resultPacket.participants[key1].accountId ){
                  resultPacket.loseTeam[key].stats = resultPacket.participants[key1].stats;
                }
            }
        } 
        battleResultData.own_team = resultPacket.loseTeam;
        battleResultData.win = 0;
        battleResultData.gameLength = resultPacket.gameLength;
        battleResultData.rival_team = resultPacket.winTeam;
        battleResultData.wealth_change = resultPacket.rewardAmount;
        
    }
    // console.log(JSON.stringify(battleResultData));
    socket.emit('updateKDA',{
        userId:userInfo.userId,
        nickname:userInfo.name,
        result:battleResultData  
    });
    //获取最新余额
    socket.emit('getLastestWealth',{
        userId: userInfo.userId
    });
    getNewKDA();
    var battleResHtml = bullup.loadSwigView('./swig_battleres.html', {
        battle_res: battleResultData
    });
    //清空信息
    roomInfo = null;
    teamInfo = null;
    battleInfo = null;
    formedTeams = null;

    //页面跳转到结果详情页
    $('#main-view').html(battleResHtml);
    //添加确认按钮单击事件
    $('#confirm_battle_result').on('click', function(e){
        $('#router_starter').click();
    });
    //杀进程
    lol_process.grabLOLData('killProcess', null);
});

function getNewKDA(){
    setTimeout(function(){
        socket.emit('getNewKDA',{
            userId: userInfo.userId
        });
    },1000*5);
}

socket.on('rechargeResult', function(text){
    socket.emit('tokenData', text.token);  
    bullup.alert(text.text);//阻塞 弹出充值成功页面
    socket.emit('getLastestWealth',{
        userId: userInfo.userId
    });
    $('#router_starter').click();
});

socket.on('rechargeErrResult', function(err){
    socket.emit('tokenData', err.token);
    console.log(err.err.type);
    switch (err.err.type) {
        case 'StripeCardError':
            bullup.alert(err.err.message);
            break;
        case 'RateLimitError':
            bullup.alert(err.err.message);
            break;
        case 'StripeInvalidRequestError':
            bullup.alert(err.err.message);
            break;
        case 'StripeAPIError':
            bullup.alert(err.err.message);
            break;
        case 'StripeConnectionError':
            bullup.alert(err.err.message);
            break;
        case 'StripeAuthenticationError':
            bullup.alert(err.err.message);
            break;
        default:
            break;
        }  
  
    $('#router_starter').click();
});

socket.on('roomCanceled', function(data){
    socket.emit('tokenData', data.token);
    //房间信息置空
    roomInfo = null;
    //用户可以继续创建房间
    //userInfo.creatingRoom = false;
    //提示用户房间取消
    bullup.alert("房间已取消");
    //页面跳转到主页
    $('#router_starter').click();
});

socket.on('updateRoomMember', function(updatedParticipants){
    socket.emit('tokenData', updatedParticipants.token);
    //更新房间成员信息
    roomInfo.participants = updatedParticipants.participants;
    //处理空值
    for(var index in roomInfo.participants){
        if(roomInfo.participants[index] == null){
            delete roomInfo.participants[index];
            roomInfo.participants.length -= 1;
        }
    }
    //更新房间信息
    var roomInfoFrameHtml = bullup.loadSwigView('swig_myroom_frame.html', {});
    var roomInfoHtml = bullup.loadSwigView('swig_myroom_info.html', {
        room: roomInfo
    });
    $('.modal').modal('close');
    var teamates = roomInfo.participants;
    var teamatesHtml = bullup.loadSwigView('swig_myroom_teamate.html', {
        teamates : teamates
    });
    $('.content').html(roomInfoFrameHtml);
    $('#team_info').html(roomInfoHtml);
    $('#teamates_info').html(teamatesHtml);
    if(userInfo.name == roomInfo.participants[0].name){
        //房主更新friendList
        $.getScript('/js/invite_friend.js');
        $('#invite_friend_btn').sideNav({
            menuWidth: 400, // Default is 300
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true, // Choose whether you can drag to open on touch screens,
            onOpen: function(el) {},
            onClose: function(el) {}
        });
        $("#confirm_create_team_btn").click(function(){
            //console.log(roomInfo);
            if(roomInfo.gameMode == 'match'){
                //bullup.alert("匹配中，请等待！");
                roomInfo.status = "MATCHING";                
                teamInfo = roomInfo;
                bullup.loadTemplateIntoTarget('swig_fightfor.html', {
                    'participants': roomInfo.participants
                }, 'main-view');
                var data = getRadarData(roomInfo.participants);
                console.log(data);
                var labelArray = ['击杀', '死亡', '助攻','治疗', '造成伤害', '承受伤害'];
                var dataArray1 = data;
                bullup.generateRadar(dataArray1, null, labelArray, "我方战力", "team-detail-chart");
            }
            var teamStrengthScore = 0;
            var teamParticipantsNum = 0;
            for(var index in roomInfo.participants){
                teamStrengthScore += roomInfo.participants[index].strength.score;
                teamParticipantsNum++;
            }
            teamStrengthScore /= teamParticipantsNum;
            roomInfo.teamStrengthScore = teamStrengthScore;
            roomInfo.teamParticipantsNum = teamParticipantsNum;
            socket.emit('establishTeam', roomInfo);
        });
        $("#quit_room_btn").click(function(){
            console.log('wocaoda:',JSON.stringify(roomInfo));
            socket.emit('quitRoom',{
                userId: userInfo.userId,
                roomName: roomInfo.roomName
            });
            roomInfo = null;
            $('#router_starter').click();
        });
    }else{
        //普通对员只显示队伍信息，没有好友邀请栏
        $('#invite_friend_btn').css('display', 'none');
        $('#confirm_create_team_btn').css('display', 'none');
        $("#quit_room_btn").click(function(){
            console.log('wocaoda:',JSON.stringify(roomInfo));
            socket.emit('quitRoom',{
                userId: userInfo.userId,
                roomName: roomInfo.roomName
            });
            roomInfo = null;
            $('#router_starter').click();
        });
    }
});

socket.on('updateTeamMember', function(updatedParticipants){
    socket.emit('tokenData', updatedParticipants.token);
    roomInfo.status = 'ESTABLISHING';
    teamInfo = null;
    
    roomInfo.participants = updatedParticipants.participants;
    //处理空值
    for(var index in roomInfo.participants){
        if(roomInfo.participants[index] == null){
            delete roomInfo.participants[index];
            roomInfo.participants.length -= 1;
        }
    }
    //更新房间信息
    var roomInfoFrameHtml = bullup.loadSwigView('swig_myroom_frame.html', {});
    var roomInfoHtml = bullup.loadSwigView('swig_myroom_info.html', {
        room: roomInfo
    });
    $('.modal').modal('close');
    var teamates = roomInfo.participants;
    var teamatesHtml = bullup.loadSwigView('swig_myroom_teamate.html', {
        teamates : teamates
    });
    $('.content').html(roomInfoFrameHtml);
    $('#team_info').html(roomInfoHtml);
    $('#teamates_info').html(teamatesHtml);
    if(userInfo.name == roomInfo.participants[0].name){
        //房主更新friendList
        $.getScript('/js/invite_friend.js');
        $('#invite_friend_btn').sideNav({
            menuWidth: 400, // Default is 300
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true, // Choose whether you can drag to open on touch screens,
            onOpen: function(el) {},
            onClose: function(el) {}
        });
        $("#confirm_create_team_btn").click(function(){
            //console.log(roomInfo);
            if(roomInfo.gameMode == 'match'){
                //bullup.alert("匹配中，请等待！");
                roomInfo.status = "MATCHING";                
                teamInfo = roomInfo;
                bullup.loadTemplateIntoTarget('swig_fightfor.html', {
                    'participants': roomInfo.participants
                }, 'main-view');
                var data = getRadarData(roomInfo.participants);
                console.log(data);
                var labelArray = ['击杀', '死亡', '助攻','治疗', '造成伤害', '承受伤害'];
                var dataArray1 = data;
                bullup.generateRadar(dataArray1, null, labelArray, "我方战力", "team-detail-chart");
            }
            var teamStrengthScore = 0;
            var teamParticipantsNum = 0;
            for(var index in roomInfo.participants){
                teamStrengthScore += roomInfo.participants[index].strength.score;
                teamParticipantsNum++;
            }
            teamStrengthScore /= teamParticipantsNum;
            roomInfo.teamStrengthScore = teamStrengthScore;
            roomInfo.teamParticipantsNum = teamParticipantsNum;
            socket.emit('establishTeam', roomInfo);
        });
        $("#quit_room_btn").click(function(){
            console.log('wocaoda:',JSON.stringify(roomInfo));
            socket.emit('quitRoom',{
                userId: userInfo.userId,
                roomName: roomInfo.roomName
            });
            roomInfo = null;
            $('#router_starter').click();
        });
    }else{
        //普通对员只显示队伍信息，没有好友邀请栏
        $('#invite_friend_btn').css('display', 'none');
        $('#confirm_create_team_btn').css('display', 'none');
        $("#quit_room_btn").click(function(){
            console.log('wocaoda:',JSON.stringify(roomInfo));
            socket.emit('quitRoom',{
                userId: userInfo.userId,
                roomName: roomInfo.roomName
            });
            roomInfo = null;
            $('#router_starter').click();
        });
    }
    bullup.alert('有玩家退出了队伍');

});

socket.on('teamCanceled', function(data){
    socket.emit('tokenData', data.token);
    //房间信息置空
    roomInfo = null;
    //队伍信息置空
    teamInfo = null;
    //用户可以继续创建房间
    //userInfo.creatingRoom = false;
    //提示用户房间取消
    bullup.alert("房间已取消");
    //页面跳转到主页
    $('#router_starter').click();
});

socket.on('EnvironmentRecover', function(environment){
    socket.emit('tokenData', environment.token);
    //房间信息
    roomInfo = environment.room;
    //队伍信息
    teamInfo = environment.team;
    //对战信息
    battleInfo = environment.battle;
    //开启抓包程序
    if(battleInfo.status == "unready"){
        //抓对局包
        lol_process.grabLOLData('room', socket);
    }else if(battleInfo.status == "ready"){
        //抓结果包
        lol_process.grabLOLData('result', socket);
    }
    if(userInfo != null){
        $("#turn_to_room_btn").click();
    }
});

socket.on('adminBroadcast', function(text){
    bullup.alert(text.text);
});

socket.on('adminCloseServer', function(){
    socket.disconnect();
    $(".g_bi").click();
});


/**
 * 处理用户登录
 * @param {*} feedback 
 */
function handleLoginResult(feedback) {
    if (feedback.errorCode == 0) {
        // 登录成功
        //bullup.alert(feedback.text);
        setTimeout(function(){
            bullup.alert("登录成功!");      
        },300);
        userInfo = feedback.extension;
        new_friend_arr=[];
        for(var i = 0;i<userInfo.friendList.length;i++){
           new_friend_arr.push(userInfo.friendList[i].name);
        }
        if (prevInfo[userInfo.userId] != undefined) {
            roomInfo = prevInfo[userInfo.userId][0];
            teamInfo = prevInfo[userInfo.userId][1];
        } else {
            roomInfo = null;
            teamInfo = null;
        }
        console.log(userInfo);
        //引导页控制
        // if(userInfo.lastLoginTime == null || userInfo.lastLoginTime.length == 0){
        //     $('body').pagewalkthrough('show');
        // }
        socket.emit('loginTime',{
			date: new Date(),
			userId: userInfo.userId
        });
        // console.log("User info");
        // console.log(userInfo);
        //bullup.alert(userInfo.userRole);
        //跳转
        var temp = bullup.loadSwigView("./swig_menu.html", { logged_user: userInfo });
        //var temp2 = bullup.loadSwigView("./swig_home.html", { logged_user: userInfo });
        // 关闭
        $("#log_modal").css("display", "none");
        $('#system_menu').html(temp);
        $('#log_modal').modal('close');
        $('.modal-overlay').remove();
        $("#log_out_button").on('click', function(e){
            lol_process.grabLOLData('killProcess', null);
            chrome.runtime.reload();
            // bullup.alert('登出成功!');
            // $('#log_modal').modal('close');
            // e.preventDefault();
            // prevInfo[userInfo.userId] = [roomInfo, teamInfo];
            // userInfo = null;
            
            // //socket.disconnect();
            // var temp = bullup.loadSwigView("./swig_menu.html", null);
            // // 打开
            // $("#log_modal").css("display", "block");
            // $('#system_menu').html(temp);

            // $('#router_starter').click();
        });
        //回到对局
        if(battleInfo != null){
            $("#turn_to_room_btn").click();
        }
    } else if (feedback.errorCode == 1) {
        // 登录失败
       // bullup.alert(feedback.text);
       bullup.alert("登录失败!");
    
    } else if (feedback.errorCode == 2){
        //账号同时登陆,前一个会被挤下线
        if( userInfo != null){
            if(userInfo.userId == feedback.user_id){
                bullup.alert('账号在其他地方登录!');
                $('#log_modal').modal('close');
                userInfo = null;
                var temp = bullup.loadSwigView("./swig_menu.html", null);
                $("#log_modal").css("display", "block");
                $('#system_menu').html(temp);
                $('#router_starter').click();
            }
        }
    }
}

//引导页展示
function  pageWalkThroughShow(){    
    if(localStorage.pageWalk == undefined){
        $('body').pagewalkthrough('show');
        localStorage.pageWalk = true;
    }    
};
setTimeout(()=>{
    pageWalkThroughShow();
},300);

function handleFeedback(feedback) {
    if (feedback.errorCode == 0) {
        if (feedback.text) 
            //bullup.alert(feedback.text);
            console.log(feedback.text);
        return feedback.extension;
    } else {
        $('.modal').modal('close');
        bullup.alert(feedback.text);
    }
}

function handleRankList(rankList){
    var strengthRankList = rankList.strengthRankList;
    var wealthRankList = rankList.wealthRankList;
    strengthRankList.rankList.sort(createCompareFunction("bullup_strength_score"));
    wealthRankList.rankList.sort(createCompareFunction("bullup_wealth_sum"));
    var rank_list = bullup.loadSwigView('swig_rank.html', {
        strengthRankList: strengthRankList.rankList,
        wealthRankList: wealthRankList.rankList,
        strengthUserInfo: strengthRankList.userRankInfo,
        wealthUserInfo: wealthRankList.userRankInfo,
    });
    $('.content').html(rank_list);
    $('ul.tabs').tabs();
}

function createCompareFunction(propertyName){
    return function(object1,object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if(value1>value2){
            return -1;
        } else if(value1<value2){
            return 1;
        }else{
            return 0;
        }
    }
}

function handleLOLBindResult(feedback){
    //
    if(feedback.errorCode == 0){
        userInfo.lolAccountInfo = feedback.extension;
        var score =feedback.extension.oriStrengthScore;
        userInfo.strength.score=score;
    }
    bullup.alert(feedback.extension.tips);
    $('.modal').modal('close');
}

//用户修改信息
function handleUpdateInfoResult(feedback){
    if(feedback.text=='密码修改成功'){
        bullup.alert('密码修改成功，请重新登录');
        userInfo = null;
        var temp = bullup.loadSwigView("./swig_menu.html", null);
        // 打开
        $("#log_modal").css("display", "block");
        $('#system_menu').html(temp);
        $('#router_starter').click();
    }else if(feedback.text=='昵称修改成功'){
        $('#menu_name').html(feedback.extension.name);
        console.log(userInfo);
        userInfo.name = feedback.extension.name;
        bullup.alert(feedback.text);
    }else{
        bullup.alert(feedback.text);
    }
}

//处理提现申请及信息入库
function handleBankInfo(feedback){
    bullup.alert(feedback.text);
}
//处理提现
function handleWithdrawResult(feedback){
    bullup.alert(feedback.text);
}
//处理充值
function handleRechargeResult(feedback){
    bullup.alert(feedback.text);
    $('#money').val(''); 
    //$('#cardnumber').val('');
}

//处理查询到的提现信息
function handleSearchWithdrawResult(feedback){
    //这个tempData就是刚才后台打印出的res
    //json格式
    var tempData = feedback.extension.data;
    //这样能取到第一条的某个值
    //bullup.alert(tempData[0].bullup_bank_cardnumber);
    //将tempData加载到网页中
    var handleWithHtml = bullup.loadSwigView('swig_admin_handleWithdraw.html',{
        dataSource:{data:tempData} 
        //dataSource: tempData,
    });
    $('#main-view').html(handleWithHtml);
}

//查看官网页面的pv,uv,ip
function handleBullupWebResult(feedback){
    var tempData = feedback.extension.data;
        var day = [];
        var ip = [];
        var pv = [];
        var uv = [];
        for(var index in tempData){
           day.push(tempData[index].day);
           ip.push(tempData[index].ip);
           pv.push(tempData[index].pv_count);
           uv.push(tempData[index].uv_count);
        }
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: day,
                datasets: [{
                    label: "ip",
                    backgroundColor: 'rgba(255,255,255,0)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: ip,
                },
                {
                    label: "pv",
                    backgroundColor: 'rgba(255,255,255,0)',
                    borderColor: 'rgb(25, 200, 132)',
                    data: pv,
                },
                {
                    label: "uv",
                    backgroundColor: 'rgba(255,255,255,0)',
                    borderColor: 'rgb(25, 100, 12)',
                    data: uv,
                }
            ]
            },
            options: {}
        });


}

//将提现信息改为TRUE
function handleWithdrawAgreeResult(feedback){
    bullup.alert(feedback.text);
}
//将提现信息改为FALSE
function handleWithdrawDisagreeResult(feedback){
    bullup.alert(feedback.text);
}

//处理查询到的余额
function handleGetBalanceResult(feedback){
    var tempBalance = feedback.extension;
    var temp2 = tempBalance.balance;
    //bullup.alert(temp2);
    var balanceHtml = bullup.loadSwigView('swig_index.html',{
            player:{balance:temp2},
        });
    $('#main-view').html(balanceHtml);
    $.getScript('/js/zymly.js');
    //$.getScript('/js/payment.js');
}

//处理查到的资金流动记录
function handleCashFlowSearchResult(feedback){
    var tempInfo = feedback.extension.data;
    //bullup.alert(tempInfo[0]);
    //bullup.alert(tempInfo.rechargeInfo[0].bullup_bill_time);
    var handleCashFlowHtml = bullup.loadSwigView('swig_basic_table.html',{
        dataSource:{data:tempInfo} 
        //dataSource: tempData,
    });
    $('#main-view').html(handleCashFlowHtml);
}


//处理查到的约战记录
function handleSearchBattleRecordResult(feedback){
    var tempData = feedback.extension.data;
    //bullup.alert(tempData);
    //bullup.alert(tempData[0].bullup_battle_paticipants);
    var handleBattleRecordHtml = bullup.loadSwigView('swig_admin_handleBattle.html',{
        dataSource:{data:tempData} 
        //dataSource: tempData,
    });
    $('#main-view').html(handleBattleRecordHtml);
}
//处理修改约战记录的结果
function hanadleChangeBattleRecordResult(feedback){
    bullup.alert(feedback.text);
}

//处理查到的账户信息
function handleSearchAllAccountResult(feedback){
    var tempData = feedback.extension.data;
    //bullup.alert(tempData[0].account);
    var handleAllAccountHtml = bullup.loadSwigView('swig_admin_handleAccount.html',{
        dataSource:{data:tempData} 
        //dataSource: tempData,
    });
    $('#main-view').html(handleAllAccountHtml);
}
//处理封号
function handleSuspendAccountResult(feedback){
    bullup.alert(feedback.text);
}
//处理解封
function handleUnblockAccountResult(feedback){
    bullup.alert(feedback.text);
}

//处理查到的用户反馈数据
function handleSearchFeedbackResult(feedback){
    var tempData = feedback.extension.data;
    //bullup.alert(tempData[0].user_account);
    var handleFeedbackHtml = bullup.loadSwigView('swig_admin_handleFeedback.html',{
        dataSource:{data:tempData} 
    });
    $('#main-view').html(handleFeedbackHtml);
}
//处理操作用户反馈
function handleOverFeedbackResult(feedback){
    bullup.alert(feedback.text);
}

//处理操作用户反馈
function handleIconUpdateResult(feedback){
    bullup.alert(feedback.text);
    var friendCount = 0;
    for(var index in userInfo.friendList){
        friendCount++
    }
    bullup.loadTemplateIntoTarget('swig_home_friendlist.html', {
        'userInfo': userInfo,
        'friendListLength': friendCount
    }, 'user-slide-out');
    $('.collapsible').collapsible();
}

//充值管理
function handleSearchAllRechargeResult(feedback){
    var tempData = feedback.extension.data;
    //bullup.alert(feedback.text);
    //bullup.alert(tempData[0].user_account);
    var handleRechargeHtml = bullup.loadSwigView('swig_admin_handleRecharge.html',{
        dataSource:{data:tempData} 
    });
    $('#main-view').html(handleRechargeHtml);
}

//简单统计
function handleAnalysisDataResult(feedback){
    var tempData = feedback.extension.data;
    //bullup.alert(tempData.countAllTeam);
    var p = tempData.eachTeamWinSum;
    p.sort(function(a,b){ 
        return parseInt(a['winSum']) < parseInt(b["winSum"]) ? 1 : parseInt(a["winSum"]) == parseInt(b["winSum"]) ? 0 : -1;
    });
    var q = tempData.eachTeamBattleSum;
    q.sort(function(a,b){ 
        return parseInt(a['battleSum']) < parseInt(b["battleSum"]) ? 1 : parseInt(a["battleSum"]) == parseInt(b["battleSum"]) ? 0 : -1;
    });
    //console.log(p);
    tempData.eachTeamWinSum = p;
    var analysisDataHtml = bullup.loadSwigView('swig_admin_simpleAnalysis.html',{
        dataSource:{data:tempData} 
    });
    $('#main-view').html(analysisDataHtml);
}
 
//邀请码信息
function handleInvitedCodeResult(feedback){
    var tempData = feedback.extension.data;
    console.log(tempData);
    //alert(tempData[0]);
    var handleInvitedCodeHtml = bullup.loadSwigView('swig_admin_invitedCode.html',{
        dataSource:{data:tempData} 
    });
    $('#main-view').html(handleInvitedCodeHtml);
}

function handleRegistResult(feedback){
    bullup.alert(feedback.text);
    $('#sign_modal').modal('close');
    $('.modal-overlay').remove();
    return feedback.extension;
}

function handleRoomEstablishmentMatchResult(feedback){
            //bullup.alert("匹配中，请等待！");
        roomInfo.status = "MATCHING";
        teamInfo = roomInfo;
        bullup.loadTemplateIntoTarget('swig_fightfor.html', {
            'participants': roomInfo.participants
        }, 'main-view');
        console.log(roomInfo);
        var data = getRadarData(roomInfo.participants);
        console.log(data);
        var labelArray = ['击杀', '死亡', '助攻','治疗', '造成伤害', '承受伤害'];
        var dataArray1 = data;
        bullup.generateRadar(dataArray1, null, labelArray, "我方战力", "team-detail-chart");
}
function handleRoomEstablishmentResult(feedback){
    if(feedback.errorCode == 0){
        bullup.alert(feedback.text);
    }else{
        bullup.alert("服务器错误，创建失败");
        return;
    }

    //userInfo.creatingRoom = true;
    //socket.emit('tokenData', feedback.token);
    roomInfo = feedback.extension;
    //处理空值
    for(var index in roomInfo.participants){
        if(roomInfo.participants[index] == null){
            delete roomInfo.participants[index];
            roomInfo.participants.length -= 1;
        }
    }
    var roomInfoFrameHtml = bullup.loadSwigView('swig_myroom_frame.html', {});
    var roomInfoHtml = bullup.loadSwigView('swig_myroom_info.html', {
        room: roomInfo
    });
    $('.modal').modal('close');
    var teamates = [];
    var captain = roomInfo.captain;
    teamates.push(captain);
    var teamatesHtml = bullup.loadSwigView('swig_myroom_teamate.html', {
        teamates : teamates
    });
    $('.content').html(roomInfoFrameHtml);
    $('#team_info').html(roomInfoHtml);
    $('#teamates_info').html(teamatesHtml);
    $('#create_room_modall').modal('close');
    $.getScript('/js/invite_friend.js');

    $('#invite_friend_btn').sideNav({
        menuWidth: 400, // Default is 300
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
        onOpen: function(el) {},
        onClose: function(el) {}
    });

    $("#confirm_create_team_btn").click(function(){
        //console.log(roomInfo);
        if(roomInfo.gameMode == 'match'){
            //bullup.alert("匹配中，请等待！");\
            roomInfo.status = "MATCHING";            
            teamInfo = roomInfo;
            bullup.loadTemplateIntoTarget('swig_fightfor.html', {
                'participants': roomInfo.participants
            }, 'main-view');
            console.log('go to the hell:',JSON.stringify(roomInfo.participants));
            var data = getRadarData(roomInfo.participants);
            console.log(data);
            var labelArray = ['击杀', '死亡', '助攻','治疗', '造成伤害', '承受伤害'];
            var dataArray1 = data;
            bullup.generateRadar(dataArray1, null, labelArray, "我方战力", "team-detail-chart");
        }
        
        var teamStrengthScore = 0;
        var teamParticipantsNum = 0;
        for(var index in roomInfo.participants){
            teamStrengthScore += roomInfo.participants[index].strength.score;
            teamParticipantsNum++;
        }
        teamStrengthScore /= teamParticipantsNum;
        roomInfo.teamStrengthScore = teamStrengthScore;
        roomInfo.teamParticipantsNum = teamParticipantsNum;

        socket.emit('establishTeam', roomInfo);
    });
    $("#quit_room_btn").click(function(){
        console.log('wocaoda:',JSON.stringify(roomInfo));
        socket.emit('quitRoom',{
            userId: userInfo.userId,
            roomName: roomInfo.roomName
        });
        roomInfo = null;
        $('#router_starter').click();
    });

}

function handleTeamEstablishResult(feedback){
    socket.emit('tokenData', feedback.token);
    if(feedback.errorCode == 0){
        bullup.alert(feedback.text);
        roomInfo.status = "PUBLISHING"; // 更改本地房间状态
        teamInfo = feedback.extension.teamInfo;
        formedTeams = feedback.extension.formedTeams;
        delete formedTeams[teamInfo.roomName];
        console.log(JSON.stringify(formedTeams[teamInfo.roomName]));        
        page(formedTeams,1);//此函数在initial_pagination.js
    }else{
        bullup.alert(feedback.text);
    }
}

function handleRefreshFormedBattleRoomResult(feedback){
    if(feedback.errorCode == 0){
        formedTeams = feedback.extension.formedTeams;
        delete formedTeams[teamInfo.roomName];                
        page(formedTeams,1);//此函数在initial_pagination.js
    }else{
        bullup.alert(feedback.text);
    }   
}

function handleInviteFromFriend(message){
    //把收到的邀请添加到消息队列
    messageInfo.push(message);
    //弹出消息中心
    $("#message_center_nav").click();
    //console.log("messageInfo:  " + JSON.stringify(messageInfo));
} 

function handlePersonalCenterResult(feedback){
    //判断是否成功
    if(feedback.errorCode == 0){
        var data = feedback.extension;
        //console.log('data='+JSON.stringify(data));
        //radar.setData(data);
        var personalCenterHtml = bullup.loadSwigView('./swig_personal_basic.html',{
            player:{
               name:data.UserlolNickname,
               server:data.UserlolArea,
               wins:data.UserlolInfo_wins,
               k:data.UserlolInfo_k,
               d:data.UserlolInfo_d,
               a:data.UserlolInfo_a,
               minion:data.UserlolInfo_minion,
               golds:data.UserInfo_gold_perminiute,
               gold:data.UserlolInfo_gold,
               heal:data.UserInfo_heal,
               tower:data.UserlolInfo_tower,
               damage:data.UserlolInfo_damage,
               taken:data.UserInfo_damage_taken,
               cap:data.UserStrengthRank,
               wealthRank:data.UserWealthRank,
               wealth:data.UserWealth,
               strength:data.UserStrength,
               winning_rate:data.competition_wins,
               avatarId:data.User_icon_id,
               raveLine:data.raveLineData
            }
        });
        $('#main-view').html(personalCenterHtml);
    }else{
        bullup.alert("页面加载失败!");
    }
}

function handleBattleInviteRequest(message){
    messageInfo.push(message);
    //弹出消息中心
    $("#message_center_nav").click();
}

function handleAddFriendRequest(message){
    messageInfo.push(message);
    //弹出消息中心
    $("#message_center_nav").click();
}



function handleLOLApiUpdateResult(feedback){
    bullup.alert(feedback.text);
}

function handleLOLKeyRequestResult(feedback){
    lolUtil.apiKey = feedback.extension.key;
    //fs.writeFileSync('./others/dat', );
    var dataquery = bullup.loadSwigView('swig_dataquery.html', {});
    $('.content').html(dataquery);
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: true // Close upon selecting a date,
    });
    $.getScript('./js/game_history_query.js');
}

function handleAddFriendResult(feedback){
    if(feedback.errorCode == 0){
        //更新本地好友列表
        var newFriendDetails = feedback.extension.newFriend;        
        var newFriend = {};
        newFriend.userId = newFriendDetails.userId;
        newFriend.avatarId = newFriendDetails.avatarId;
        newFriend.online = 'true';
        newFriend.status = 'idle';
        newFriend.name = newFriendDetails.name;
        if(new_friend_arr.length == 0){
            new_friend_arr.push(newFriend.name);
            userInfo.friendList.push(newFriend);
        }else{
            for(var i = 0;i<new_friend_arr.length;i++){
                if(new_friend_arr[i] == newFriend.name){
                    break;
                }
                if( i == new_friend_arr.length-1){
                    new_friend_arr.push(newFriend.name);
                    userInfo.friendList.push(newFriend);
                } 
            }
        }
        var newArr = userInfo.friendList;
        newArr.sort(function(x,y){
            return x.online < y.online ? 1 : -1;
        });
        userInfo.friendList =  newArr;        
        var friendCount = 0;
        for(var index in userInfo.friendList){
            friendCount++
        }
        bullup.loadTemplateIntoTarget('swig_home_friendlist.html', {
            'userInfo': userInfo,
            'friendListLength': friendCount
        }, 'user-slide-out');
        $('.collapsible').collapsible();
    }
    bullup.alert(feedback.text);
    if(messageInfo.length == 0){
        $('#message_sheet').modal('close');
    }    
}

//反馈结果
function feedbackMessage(feedback){
    bullup.alert(feedback.text);
}


setInterval(()=>{
    if(socket != undefined){
        //console.log("ID: " + socket.id + " connected: " + socket.connected);
        if(lastSocketStatus == true && socket.connected == true){
            lastSocketId = socket.id;
            //console.log("lasetid: " + lastSocketId);
        }
        if(lastSocketStatus == false && socket.connected == true){
            socket.emit('reconnected', {
                'userInfo': userInfo,
                'newSocketId': socket.id,
                'lastSocketId': lastSocketId
            });
            //console.log("请求重连");
            //console.log("当前id" + socket.id);
        }
        lastSocketStatus = socket.connected;
    }
},1000);

process.on('uncaughtException', function(err) {
    //alert("召唤师不存在或设置的时间段过长！");
    console.log(String(err));
});

function deleteFriends(feedback){
    bullup.alert(feedback.text);
    var temp = feedback.extension.data;
    new_friend_arr = [];
    for(var i = 0;i< temp.length ;i++){
         new_friend_arr.push(temp[i].name);
    }
    userInfo.friendList=temp;
    var friendCount = 0; 
    for(var index in  userInfo.friendList){
        friendCount++
    }
    bullup.loadTemplateIntoTarget('swig_home_friendlist.html', {
        'userInfo': userInfo,
        'friendListLength': friendCount
    },'user-slide-out');
    $('.collapsible').collapsible();
    var fid=feedback.extension.Fid;
    socket.emit("two_waydeleteFriend",fid);
    
}

function deleteTofriends(feedback){
    var temp = feedback.extension.data;
    userInfo.friendList=temp;
    new_friend_arr = [];
    for(var i = 0;i< temp.length ;i++){
         new_friend_arr.push(temp[i].name);
    }
    var friendCount = 0; 
    for(var index in  userInfo.friendList){
        friendCount++
    }
    bullup.loadTemplateIntoTarget('swig_home_friendlist.html', {
        'userInfo': userInfo,
        'friendListLength': friendCount
    },'user-slide-out');
    $('.collapsible').collapsible();
}




function handlePUBGBindResult(feedback){
    if(feedback.errorCode == 1){
        bullup.alert(feedback.text);
        $("#pubg_waiting_modal").modal("close");
    }else{
        userInfo.pubgAccount = feedback.extension.data;
        bullup.alert('绑定成功！祝您大吉大利，今晚吃鸡');
        $("#pubg_waiting_modal").modal("close");
        $("#bind_pubg_modal").modal("close");
        $('#create_pubg_modall').modal("close");
    }
}

var pubgObj={};
function cycleSearch(num,ser){
    var gameNum = num;
    function core(){
        var crawCount = 0;
        pubgObj['game'+gameNum] = setInterval(()=>{
            // var user = pubgRoomInfo.nickname;
            // var area = pubgRoomInfo.area;
            //找出这是第几局游戏，爬取对应的数据
            var gameIndex;
            var gameArrLength = pubgRoomInfo[0][ser].length;
            var pointIndex;
            var account;
            var server;
            var createRoomTime;
            var thisRoomInfo;
            for(var key in pubgRoomInfo[0]){
                if(key == ser){
                    for(var index in pubgRoomInfo[0][key]){
                        var tmpSerLength = ser.length;
                        if(tmpSerLength == 2){
                            gameIndex = pubgRoomInfo[0][key][index].symbol.substring(8);
                        }else if(tmpSerLength == 3){
                            gameIndex = pubgRoomInfo[0][key][index].symbol.substring(9);
                        }else if(tmpSerLength == 4){
                            gameIndex = pubgRoomInfo[0][key][index].symbol.substring(10);
                        }
                        if(gameArrLength == gameIndex){
                            pointIndex = gameArrLength - index;
                            thisRoomInfo = pubgRoomInfo[0][key][index];
                            account = pubgRoomInfo[0][key][index].account;
                            server = pubgRoomInfo[0][key][index].server;
                            createRoomTime = pubgRoomInfo[0][key][index].createTime;
                            console.log('这是第几次游戏',gameNum,'这是房间的标识',pubgRoomInfo[0][key][index].symbol,gameIndex,'这是该局游戏在pubgRoomInfo',ser,'的位置',index,'这是要爬取第几个li的数值',pointIndex);
                            break;
                        }
                    }
                }
            }
            crawCount++;
            //60分钟/轮询间隔时间=次数 60/3 = 20
            if(crawCount <= 20){
                pubg_crawler.executeCrawler(account,server,pointIndex,function(res){
                    res.symbol = server + '-game-' + gameNum + '_craw-' + crawCount;
                    var tmpSymbol = server.length;
                    var resSymbol;
                    if(tmpSymbol == 2){
                        resSymbol = res.symbol.substring(8,9);
                    }else if(tmpSymbol == 3){
                        resSymbol = res.symbol.substring(9,10);
                    }else if(tmpSymbol == 4){
                        resSymbol = res.symbol.substring(10,11);
                    }
                    if(resSymbol == gameNum){
                        console.log('房间信息',JSON.stringify(thisRoomInfo));
                        console.log('爬取结果',JSON.stringify(res));
                        //数据对比
                        var nowTime = new Date();//当前时间
                        var gameStartTime = new Date(res.startTime);//游戏开始时间
                        var opggAgoTime = Math.round((nowTime - gameStartTime) / 60000,2);
                        console.log('游戏开始于',opggAgoTime,'分钟前');
                        var localAgoTime = Math.round((nowTime - createRoomTime) / 60000,2);
                        console.log('创建房间到现在有',localAgoTime,'分钟前');
                        var gapTime = Math.abs(opggAgoTime - localAgoTime);
                        console.log('gapTime',gapTime);
                        //创建房间和游戏开始时间间隔不能超过3分钟
                        if(gapTime < 3){
                            console.log('成功啦！！！');
                            if(thisRoomInfo.gameMode == res.gameMode){
                                console.log('thisRoomInfo:',JSON.stringify(thisRoomInfo));
                                 var pubgResult = {
                                     userId: userInfo.userId,
                                     account: thisRoomInfo.account,
                                     server: thisRoomInfo.server,
                                     target: thisRoomInfo.target,
                                     kill: res.kill,
                                     bet: thisRoomInfo.bet,
                                     rate: thisRoomInfo.rate,
                                     start: res.startTime,
                                     avatarId: thisRoomInfo.avatarId
                                 }
                                 socket.emit('pubgResult',pubgResult);
                                 console.log('game'+gameNum);
                                 window.clearInterval(pubgObj['game'+gameNum]);
                            }
                        }
                    }
                });
            }else{
                bullup.alert('对战超时');
                delete pubgObj[gameNum];
            } 
        },1000*60*3);
    }
    core();
}
