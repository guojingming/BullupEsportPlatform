var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/service".length).replace(/\\/g, "/"));
var teamService = dependencyUtil.global.service.teamService;
var socketService = dependencyUtil.global.service.socketService;
var userService = dependencyUtil.global.service.userService;
var logUtil = dependencyUtil.global.utils.logUtil;

var battleRecordDao = dependencyUtil.global.dao.battleRecordDao;
var strengthInfoDao = dependencyUtil.global.dao.strengthInfoDao;

var matchLevel1MinCount = 2;
var matchLevel2MinCount = 2;
var matchLevel3MinCount = 2;
var matchLevel4MinCount = 2;


exports.init = function () {
    this.battles = {};
}

/**
 * 处理用户约战请求
 * @param socket
 */
exports.handleBattleInvite = function (socket) {
    socket.on('battleInvite', function (battelRequest) {
        console.log(teamService.formedTeams);
        //logUtil.logToFile("./logs/data/data.txt", "append", JSON.parse(teamService.formedTeams), "battleInviteResult teamService.formedTeams");

        var hostTeam = teamService.mapTeamNameToFormedTeam(battelRequest.hostTeamName);
        //写日志

        // 队伍不存在说明已经形成对局
        if (hostTeam && hostTeam.status == 'PUBLISHING') {
            var challengerTeam = teamService.mapTeamNameToFormedTeam(battelRequest.challengerTeamName);
            var captainId = hostTeam.captain.userId;
            //获取对战请求中host team的socket
            var dstSocket = socketService.mapUserIdToSocket(captainId);
            var message = {};
            message.messageType = 'inviteBattle';
            message.team = challengerTeam;
            message.hostTeam = hostTeam;
            message.messageText = '对战请求';
            message.name = challengerTeam.captain.name;
            //向host team发送挑战队伍信息
            message.messageToken = 'message' + message.name + (new Date()).getTime();

            socketService.stableSocketEmit(dstSocket, 'message', message);
            //socketService.stableEmit();
        } else {
            //失败向发出请求的用户返回失败信息
            socketService.stableSocketEmit(socket, 'feeback', {
                errorCode: 1,
                type: 'BATTLEINVITERESULT',
                text: '邀请对战失败, 请刷新对战大厅',
                extension: null
            })
        }
    });
}

exports.handleBattleInviteResult = function (io, socket) {
    socket.on('inviteBattleResult', function (feedback) {
        // 如果接受了邀
        logUtil.logToFile("./logs/data/data.txt", "append", "", "inviteBattleResult");

        if (feedback.errorCode == 0) {
            // 向两方队伍中的所有人进行广播
            var challengerTeam = teamService.mapTeamNameToFormedTeam(feedback.extension.challengerTeam.roomName);
            var hostTeam = teamService.mapTeamNameToFormedTeam(feedback.extension.hostTeam.roomName);

            logUtil.logToFile("./logs/data/data.txt", "append", JSON.stringify(challengerTeam), "inviteBattleResult challengeTeam");
            logUtil.logToFile("./logs/data/data.txt", "append", JSON.stringify(hostTeam), "inviteBattleResult hostTeam");

            var currentTime = require('moment')().format('YYYYMMDDHHmmss');
            // 更新队伍状态
            teamService.changeTeamStatus(challengerTeam.roomName, 'INBATTLE');
            teamService.changeTeamStatus(hostTeam.roomName, 'INBATTLE');
            // 状态改变的队伍不再需要在对战大厅中显示，所以不再广播类表中
            teamService.removeBroadcastTeam(challengerTeam.roomName);
            teamService.removeBroadcastTeam(hostTeam.roomName);
            var $battleName = challengerTeam.captain.name + hostTeam.captain.name + (new Date).valueOf();
            //为该次对战创建倒计时
            initFlipClocks($battleName);
            afterStartClocks({
                battleName:$battleName,
            });
            var lolRoom = {
                roomName: creatRoomName(),
                password: Math.floor(Math.random() * 1000), // 4位随机数
                creatorId: challengerTeam.captain.userId,
                time: flipClocks[$battleName].time,
                afterStartTime: battleFlipClocks[$battleName].time
            };
            var battle = {
                battleName: $battleName,
                blueSide: challengerTeam,
                redSide: hostTeam,
                status: 'unready',
                time: {
                    unready: currentTime,
                    ready: null,
                    start: null
                },
                lolRoom:lolRoom,
            };
            //console.log("battle:::",JSON.stringify(battle));
            //console.log(battle.battleInfo.blueSide.participants[0].lolAccountInfo.user_lol_nickname);
            exports.battles[battle.battleName] = battle;
            // 将挑战队伍的所有用户加入到新的socket room
            for (var i in challengerTeam.participants) {
                var userId = challengerTeam.participants[i].userId;
                socketService.userJoin(userId, battle.battleName);
                userService.changeUserStatus(userId, 'inbattle');
                userService.setEnvironment(userId, 'battle', battle);
                //更新好友状态
                userService.friendStatus(userId,'inbattle','true');
            }
            // 将受挑战队伍的所有用户加入到新的socket room
            for (var i in hostTeam.participants) {
                var userId = hostTeam.participants[i].userId;
                socketService.userJoin(userId, battle.battleName);
                userService.changeUserStatus(userId, 'inbattle');
                userService.setEnvironment(userId, 'battle', battle);
                //更新好友状态
                userService.friendStatus(userId,'inbattle','true');
            }
            //teamService.printfAllTeamsInfo();
            // 向该对局中所有的用户广播对局信息
            socketService.stableSocketsEmit(battle.battleName, 'battleInfo', battle);
            socketService.stableSocketsEmit(battle.battleName, 'lolRoomEstablish', lolRoom);
        } else if (feedback.errorCode == 1) {
            var dstSocket = socketService.mapUserIdToSocket(feedback.extension.userId);
            socketService.stableSocketEmit(dstSocket, 'feedback', feedback);
        }
    });
}

/**
 * 处理lol房间创建完毕
 * @param io
 * @param socket
 */
exports.handleLOLRoomEstablished = function (io, socket) {
    socket.on('lolRoomEstablished', function (roomPacketStr) {
        
        if(roomPacketStr == undefined || roomPacketStr == null){
            console.log("客户将 BullupServiceNew.exe 关闭了  导致 roomObj 为 undefind");
            return;
         } 
        var roomObj = JSON.parse(roomPacketStr);

        if(roomObj.BattleInfo == undefined || roomObj.BattleInfo == null){
            console.log("客户将 BullupServiceNew.exe 关闭了  导致 roomObj.BattleInfo 为 undefind");
            return;
         } 
        var gameMode = roomObj.BattleInfo.gameData.queue.gameMode;
       
        var roomPacket = {};
        roomPacket.head = "room";
        roomPacket.myTeam = roomObj.BattleInfo.gameData.teamOne;
        roomPacket.theirTeam = roomObj.BattleInfo.gameData.teamTwo;

        //检查数据包中的人员是否能对应上
        logUtil.logToFile("./logs/data/data.txt", "append", JSON.stringify(roomPacket), "lolRoomEstablished roomPacket");
        logUtil.logToFile("./logs/data/data.txt", "append", JSON.stringify(exports.battles), "lolRoomEstablished battles");
        //通知客户端游戏已开始
        for(var battleIndex in  exports.battles){
            var battle = exports.battles[battleIndex];
            if(battle.status == 'unready'){
                var myTeam = roomPacket.myTeam;
                var theirTeam = roomPacket.theirTeam;
                var blueSide = battle.blueSide;
                var redSide = battle.redSide;
                var teamFlag = true;
                var orderedMap = battle.blueSide.mapSelection;
                if(orderedMap == 'map-selection-1'){
                    orderedMap = 'CLASSIC';
                }else if(orderedMap == 'map-selection-2'){
                    orderedMap = 'ARAM';
                }
                //if(myTeam[0].team == 1){
                //看蓝队人员配置是否合法
                for(var bullupPaticipantIndex in blueSide.participants){
                    var bullupPaticipant = blueSide.participants[bullupPaticipantIndex];
                    var memberExsistFlag = false;
                    var lolAccountId = bullupPaticipant.lolAccountInfo.user_lol_account;
                    for(var lolPaticipantIndex in myTeam){
                        var lolPaticipant = myTeam[lolPaticipantIndex];
                        if(lolPaticipant.summonerId == lolAccountId){
                            memberExsistFlag = true;
                            break;
                        }
                    }
                    if(!memberExsistFlag){
                        teamFlag = false;
                        break;
                    }
                }
                //看敌方 红队人员配置是否合法
                if(teamFlag){
                    for(var bullupPaticipantIndex in redSide.participants){
                        var bullupPaticipant = redSide.participants[bullupPaticipantIndex];
                        var memberExsistFlag = false;
                        var lolAccountId = bullupPaticipant.lolAccountInfo.user_lol_account;
                        for(var lolPaticipantIndex in theirTeam){
                            var lolPaticipant = theirTeam[lolPaticipantIndex];
                            if(lolPaticipant.summonerId == lolAccountId || lolPaticipant.summonerId=='0'){
                                memberExsistFlag = true;
                                break;
                            }
                        }
                        if(!memberExsistFlag){
                            teamFlag = false;
                            break;
                        }
                    }
                }

                //teamFlag = true;

                if(teamFlag && orderedMap == gameMode){
                    if(battle.status == 'unready'){
                        battle.status = 'ready';
                    }
                    socketService.stableSocketsEmit(battle.battleName, 'lolRoomEstablished', {});
                    break;
                }
            }
        }
    });
}

exports.handleBattleResult = function (io, socket){
    socket.on('lolBattleResult', function (lolResultPacketStr) {

        logUtil.logToFile("./logs/data/data.txt", "append", JSON.stringify(lolResultPacket), "lolBattleResult lolResultPacket");
        //console.log(io.sockets);
        //解析字符串
        if(lolResultPacketStr.charAt(0) != '{'){
            lolResultPacketStr = lolResultPacketStr.substr(1, lolResultPacketStr.length - 1);
        }
        var obj = JSON.parse(lolResultPacketStr);
        var lolResultPacket = {};
        lolResultPacket.summonerName = obj.GameData.summonerName;
        lolResultPacket.gameMode = obj.GameData.gameMode;
        lolResultPacket.gameType = obj.GameData.gameType;
        lolResultPacket.accountId = obj.GameData.accountId;
        var flag = false;
        var win = false;
        for(var i = 0;i<obj.GameData.teams[0].players.length;i++){
            if(obj.GameData.teams[0].players[i].summonerName == lolResultPacket.summonerName){
                win = obj.GameData.teams[0].isWinningTeam;
                flag = true;
                break;
            }
        }
        if(flag == false){
            win = !obj.GameData.teams[0].isWinningTeam;
        }
        if(win == true){
            lolResultPacket.win = 'yes';
        }else{
            lolResultPacket.win = 'no';
        }

        var tempResult = processResultPacket(obj.GameData);
        //console.log('this is tempResult:',JSON.stringify(tempResult));

        if(true){
        //if(lolResultPacket.head == 'result' && lolResultPacket.gameMode == 'CLASSIC' && lolResultPacket.gameType == 'CUSTOM_GAME'){
            if(lolResultPacket.win == 'yes'){
                //寻找该玩家所在的队伍
                var userLOLAccountId = lolResultPacket.accountId;
                var userId = socketService.mapSocketToUserId(socket.id);
                var winTeam = {};
                var loseTeam = {};
                var finishedBattle = null;
                var battles = exports.battles;
                var winTeamStrengthScore = 0;
                var loseTeamStrengthScore = 0;

                var blueWin = true;

                for(var battleIndex in battles){
                    var battle = battles[battleIndex];
                    var blueSide = battle.blueSide;
                    var blueSidePaticipants = blueSide.participants;
                    var redSide = battle.redSide;
                    var redSidePaticipants = redSide.participants;
                    for(var bluePaticipantIndex in blueSidePaticipants){
                        var bluePaticipant = blueSidePaticipants[bluePaticipantIndex];
                        if(bluePaticipant.userId == userId){
                            winTeam = blueSidePaticipants;
                            loseTeam = redSidePaticipants;
                            winTeamStrengthScore = blueSide.teamStrengthScore;
                            loseTeamStrengthScore = redSide.teamStrengthScore;

                            finishedBattle = battle;
                            delete teamService.formedTeams[blueSide.roomName];
                            delete teamService.formedTeams[redSide.roomName];
                            delete exports.battles[battleIndex];
                            break;
                        }
                    }
                    if(finishedBattle == null){
                        for(var redPaticipantIndex in redSidePaticipants){
                            var redPaticipant = redSidePaticipants[redPaticipantIndex];
                            if(redPaticipant.userId == userId){
                                winTeam = redSidePaticipants;
                                loseTeam = blueSidePaticipants;
                                winTeamStrengthScore = redSide.teamStrengthScore;
                                loseTeamStrengthScore = blueSide.teamStrengthScore;
                                blueWin = false;
                                finishedBattle = battle;
                                delete teamService.formedTeams[blueSide.roomName];
                                delete teamService.formedTeams[redSide.roomName];
                                delete exports.battles[battleIndex];
                                break;
                            }
                        }
                    }
                    if(winTeam[0] != undefined){
                        break;
                    }
                }
                //管理服务端的全局变量 队伍和对局
                //组织通知双方队伍胜负结果的数据包
                if(finishedBattle == null || finishedBattle.blueSide == undefined){
                    return;
                }
                finishedBattle.blueWin = blueWin;
                finishedBattle.redWin = !blueWin;

                var resultPacket = {};
                resultPacket.rewardType = finishedBattle.blueSide.rewardType;
                resultPacket.rewardAmount = finishedBattle.blueSide.rewardAmount;
                resultPacket.roomName = finishedBattle.blueSide.roomName;
                resultPacket.winTeam = winTeam;
                resultPacket.loseTeam = loseTeam;
                resultPacket.participants = tempResult.participants;
                resultPacket.gameLength = tempResult.gameLength;
                console.log('this is damn finishedBattle:',JSON.stringify(finishedBattle));
                
                //resultPacket.participants = lolResultPacket.participants;
                //算战力变化
                var newScore = exports.strengthScoreChangedCalculation(winTeamStrengthScore, loseTeamStrengthScore);
                var winScoreUpdateValue = newScore.newWinnerScore - winTeamStrengthScore;
                var loseScoreUpdateValue = newScore.newLoserScore - loseTeamStrengthScore;
                //扣钱
                for(var index in winTeam){
                    var player = winTeam[index];
                    battleRecordDao.updateStrengthAndWealth(player.userId, player.strength.score + winScoreUpdateValue, 0.8 * resultPacket.rewardAmount,1);
                }
                for(var index in loseTeam){
                    var player = loseTeam[index];
                    battleRecordDao.updateStrengthAndWealth(player.userId, player.strength.score + loseScoreUpdateValue, -1 * resultPacket.rewardAmount,0);
                }
                //写记录
                battleRecordDao.writeBattleRecord(finishedBattle);
                //改状态 删环境数据
                for(var index in winTeam){
                    var player = winTeam[index];
                    userService.changeUserStatus(player.userId, 'idle');
                    userService.deleteEnvironment(player.userId, 'room');
                    userService.deleteEnvironment(player.userId, 'team');
                    userService.deleteEnvironment(player.userId, 'battle');
                    //更新好友状态
                    userService.friendStatus(player.userId,'true','true');
                }
                for(var index in loseTeam){
                    var player = loseTeam[index];
                    userService.changeUserStatus(player.userId, 'idle');
                    userService.deleteEnvironment(player.userId, 'room');
                    userService.deleteEnvironment(player.userId, 'team');
                    userService.deleteEnvironment(player.userId, 'battle');
                    //更新好友状态
                    userService.friendStatus(player.userId,'true','true');
                }

                //广播结果数据包
                socketService.stableSocketsEmit(finishedBattle.battleName, 'battleResult', resultPacket);
                console.log(finishedBattle.battleName + "结束");
                //console.log('this is winner result:',JSON.stringify(resultPacket));
                //对局中所有的socket离开所有的socketRoom
                //io.sockets.in(finishedBattle.battleName).leaveAll();
            }else if(lolResultPacket.win == 'no'){
                var userLOLAccountId = lolResultPacket.accountId;
                var userId = socketService.mapSocketToUserId(socket.id);
                var winTeam = {};
                var loseTeam = {};
                var finishedBattle = null;
                var battles = exports.battles;
                var winTeamStrengthScore = 0;
                var loseTeamStrengthScore = 0;

                var blueWin = true;

                for(var battleIndex in battles){
                    var battle = battles[battleIndex];
                    var blueSide = battle.blueSide;
                    var blueSidePaticipants = blueSide.participants;
                    var redSide = battle.redSide;
                    var redSidePaticipants = redSide.participants;
                    for(var bluePaticipantIndex in blueSidePaticipants){
                        var bluePaticipant = blueSidePaticipants[bluePaticipantIndex];
                        if(bluePaticipant.userId == userId){
                            loseTeam = blueSidePaticipants;
                            winTeam = redSidePaticipants;
                            loseTeamStrengthScore = blueSide.teamStrengthScore;
                            winTeamStrengthScore = redSide.teamStrengthScore;
                            blueWin = false;
                            finishedBattle = battle;
                            delete teamService.formedTeams[blueSide.roomName];
                            delete teamService.formedTeams[redSide.roomName];
                            delete exports.battles[battleIndex];
                            break;
                        }
                    }
                    if(finishedBattle == null){
                        for(var redPaticipantIndex in redSidePaticipants){
                            var redPaticipant = redSidePaticipants[redPaticipantIndex];
                            if(redPaticipant.userId == userId){
                                loseTeam = redSidePaticipants;
                                winTeam = blueSidePaticipants;
                                loseTeamStrengthScore = redSide.teamStrengthScore;
                                winTeamStrengthScore = blueSide.teamStrengthScore;

                                finishedBattle = battle;
                                delete teamService.formedTeams[blueSide.roomName];
                                delete teamService.formedTeams[redSide.roomName];
                                delete exports.battles[battleIndex];
                                break;
                            }
                        }
                    }
                    if(winTeam[0] != undefined){
                        break;
                    }
                }
                //管理服务端的全局变量 队伍和对局
                //组织通知双方队伍胜负结果的数据包
                if(finishedBattle == null || finishedBattle.blueSide == undefined){
                    return;
                }
                finishedBattle.blueWin = blueWin;
                finishedBattle.redWin = !blueWin;

                var resultPacket = {};
                resultPacket.rewardType = finishedBattle.blueSide.rewardType;
                resultPacket.rewardAmount = finishedBattle.blueSide.rewardAmount;
                resultPacket.roomName = finishedBattle.blueSide.roomName;
                resultPacket.winTeam = winTeam;
                resultPacket.loseTeam = loseTeam;
                resultPacket.participants = tempResult.participants;
                resultPacket.gameLength = tempResult.gameLength;
                //resultPacket.participants = lolResultPacket.participants
                //算战力变化
                var newScore = exports.strengthScoreChangedCalculation(winTeamStrengthScore, loseTeamStrengthScore);
                var winScoreUpdateValue = newScore.newWinnerScore - winTeamStrengthScore;
                var loseScoreUpdateValue = newScore.newLoserScore - loseTeamStrengthScore;
                //扣钱
                for(var index in winTeam){
                    var player = winTeam[index];
                    battleRecordDao.updateStrengthAndWealth(player.userId, player.strength.score + winScoreUpdateValue, 0.8 * resultPacket.rewardAmount,1);
                }
                for(var index in loseTeam){
                    var player = loseTeam[index];
                    battleRecordDao.updateStrengthAndWealth(player.userId, player.strength.score + loseScoreUpdateValue, -1 * resultPacket.rewardAmount,0);
                }
                //写记录
                battleRecordDao.writeBattleRecord(finishedBattle);
                //改状态 删环境数据
                for(var index in winTeam){
                    var player = winTeam[index];
                    userService.changeUserStatus(player.userId, 'idle');
                    userService.deleteEnvironment(player.userId, 'room');
                    userService.deleteEnvironment(player.userId, 'team');
                    userService.deleteEnvironment(player.userId, 'battle');
                    //更新好友状态
                    userService.friendStatus(player.userId,'true','true');
                }
                for(var index in loseTeam){
                    var player = loseTeam[index];
                    userService.changeUserStatus(player.userId, 'idle');
                    userService.deleteEnvironment(player.userId, 'room');
                    userService.deleteEnvironment(player.userId, 'team');
                    userService.deleteEnvironment(player.userId, 'battle');
                    //更新好友状态
                    userService.friendStatus(player.userId,'true','true');
                }

                //广播结果数据包
                socketService.stableSocketsEmit(finishedBattle.battleName, 'battleResult', resultPacket);
                console.log(finishedBattle.battleName + "结束");
                //console.log('this is lose result:',JSON.stringify(resultPacket));
                //对局中所有的socket离开所有的socketRoom
                //io.sockets.in(finishedBattle.battleName).leaveAll();

            }
        }
    });
}

exports.matchScheduling = function(matchPool){
    //console.log("------------scheduling-------------");
    for(var index in matchPool){
        if(matchPool[index].queue.length == 0){
            matchPool[index].delay = 0;
            continue;
        }
        //临时方案  直接使用4级调度  全战力范围调度
        matchSchedulingLevel4(matchPool, index);

        // if(matchPool[index].delay < 10){
        //     //一级调度
        //     matchSchedulingLevel1(matchPool, index);
        // }else if(matchPool[index].delay >= 10 && matchPool[index].delay < 30){
        //     //二级调度
        //     matchSchedulingLevel2(matchPool, index);
        // }else{
        //     //三级调度
        //     matchSchedulingLevel3(matchPool, index);
        // }
        matchPool[index].delay++;
    }
}

function matchSchedulingLevel1(matchPool, poolIndex){
    
    if(matchPool[poolIndex].queue.length >= matchLevel1MinCount){
        console.log("lv1 match");
        var queues = [];
        var queuesIndex = [];
        queues.push(matchPool[poolIndex].queue);
        queuesIndex.push(poolIndex);
        var matchList = excuteMatch(queues);

        var queueNum1 = matchList.firstTeam.queueNum;
        var teamNum1 = matchList.firstTeam.teamNum;
        var firstTeam = matchPool[queuesIndex[queueNum1]].queue[teamNum1];

        var queueNum2 = matchList.secondTeam.queueNum;
        var teamNum2 = matchList.secondTeam.teamNum;
        var secondTeam = matchPool[queuesIndex[queueNum2]].queue[teamNum2];

        if(firstTeam == undefined || secondTeam == undefined){
            return;
        }

        if(queueNum1 == queueNum2){
            delete matchPool[queuesIndex[queueNum1]].queue[teamNum1];
            if(teamNum1 < teamNum2){
                delete matchPool[queuesIndex[queueNum1]].queue[teamNum2-1];
            }else{
                delete matchPool[queuesIndex[queueNum1]].queue[teamNum2];
            }
            matchPool[queuesIndex[queueNum1]].queue.length -= 2;
        }else{
            delete matchPool[queuesIndex[queueNum1]].queue[teamNum1];
            matchPool[queuesIndex[queueNum1]].queue.length -= 1;
            delete matchPool[queuesIndex[queueNum2]].queue[teamNum2];
            matchPool[queuesIndex[queueNum2]].queue.length -= 1;
        }

        broadCastMatchResult(firstTeam, secondTeam);
        matchPool[poolIndex].delay -= 2;
        if(matchPool[poolIndex].delay < 0){
            matchPool[poolIndex].delay = 0;
        }
    }
}

function matchSchedulingLevel2(matchPool, poolIndex){
    var indexes = [];
    if(parseInt(poolIndex) >= 4300){
        //前找2个
        indexes.push(String(poolIndex));
        indexes.push(String(parseInt(poolIndex) - 50));
        indexes.push(String(parseInt(poolIndex) - 100));
    }else{
        //后找2个
        indexes.push(String(poolIndex));
        indexes.push(String(parseInt(poolIndex) + 50));
        indexes.push(String(parseInt(poolIndex) + 100));
    }

    var queues = [];
    var queuesIndex = [];
    var count = 0;
    for(var index in indexes){
        queues.push(matchPool[indexes[index]].queue);
        queuesIndex.push(indexes[index]);
        count += matchPool[indexes[index]].queue.length;
    }
    if(count >= matchLevel2MinCount){
        var matchList = excuteMatch(queues);
        var queueNum1 = matchList.firstTeam.queueNum;
        var teamNum1 = matchList.firstTeam.teamNum;
        var firstTeam = matchPool[queuesIndex[queueNum1]].queue[teamNum1];
        var queueNum2 = matchList.secondTeam.queueNum;
        var teamNum2 = matchList.secondTeam.teamNum;
        var secondTeam = matchPool[queuesIndex[queueNum2]].queue[teamNum2];

        if(firstTeam == undefined || secondTeam == undefined){
            return;
        }

        if(queueNum1 == queueNum2){
            delete matchPool[queuesIndex[queueNum1]].queue[teamNum1];
            if(teamNum1 < teamNum2){
                delete matchPool[queuesIndex[queueNum1]].queue[teamNum2-1];
            }else{
                delete matchPool[queuesIndex[queueNum1]].queue[teamNum2];
            }
            matchPool[queuesIndex[queueNum1]].queue.length -= 2;
        }else{
            delete matchPool[queuesIndex[queueNum1]].queue[teamNum1];
            matchPool[queuesIndex[queueNum1]].queue.length -= 1;
            delete matchPool[queuesIndex[queueNum2]].queue[teamNum2];
            matchPool[queuesIndex[queueNum2]].queue.length -= 1;
        }
        broadCastMatchResult(firstTeam, secondTeam);
        matchPool[poolIndex].delay -= 2;
        if(matchPool[poolIndex].delay < 0){
            matchPool[poolIndex].delay = 0;
        }
    }
}

function matchSchedulingLevel3(matchPool, poolIndex){
    var indexes = [];
    if(parseInt(poolIndex) >= 4100){
        //前找4个
        indexes.push(String(poolIndex));
        indexes.push(String(parseInt(poolIndex) - 50));
        indexes.push(String(parseInt(poolIndex) - 100));
        indexes.push(String(parseInt(poolIndex) - 150));
        indexes.push(String(parseInt(poolIndex) - 200));
    }else{
        //后找4个
        indexes.push(String(poolIndex));
        indexes.push(String(parseInt(poolIndex) + 50));
        indexes.push(String(parseInt(poolIndex) + 100));
        indexes.push(String(parseInt(poolIndex) + 150));
        indexes.push(String(parseInt(poolIndex) + 200));
    }

    var queues = [];
    var queuesIndex = [];
    var count = 0;
    for(var index in indexes){
        queues.push(matchPool[indexes[index]].queue);
        queuesIndex.push(indexes[index]);
        count += matchPool[indexes[index]].queue.length;
    }
    if(count >= matchLevel3MinCount){
        var matchList = excuteMatch(queues);
        var queueNum1 = matchList.firstTeam.queueNum;
        var teamNum1 = matchList.firstTeam.teamNum;
        var firstTeam = matchPool[queuesIndex[queueNum1]].queue[teamNum1];
        var queueNum2 = matchList.secondTeam.queueNum;
        var teamNum2 = matchList.secondTeam.teamNum;
        var secondTeam = matchPool[queuesIndex[queueNum2]].queue[teamNum2];

        if(firstTeam == undefined || secondTeam == undefined){
            return;
        }

        if(queueNum1 == queueNum2){
            delete matchPool[queuesIndex[queueNum1]].queue[teamNum1];
            if(teamNum1 < teamNum2){
                delete matchPool[queuesIndex[queueNum1]].queue[teamNum2-1];
            }else{
                delete matchPool[queuesIndex[queueNum1]].queue[teamNum2];
            }
            matchPool[queuesIndex[queueNum1]].queue.length -= 2;
        }else{
            delete matchPool[queuesIndex[queueNum1]].queue[teamNum1];
            matchPool[queuesIndex[queueNum1]].queue.length -= 1;
            delete matchPool[queuesIndex[queueNum2]].queue[teamNum2];
            matchPool[queuesIndex[queueNum2]].queue.length -= 1;
        }
        broadCastMatchResult(firstTeam, secondTeam);
        matchPool[poolIndex].delay -= 2;
        if(matchPool[poolIndex].delay < 0){
            matchPool[poolIndex].delay = 0;
        }
    }
}

function matchSchedulingLevel4(matchPool, poolIndex){
    var indexes = [];
    for(var index = 0;index < 90;index++){
        indexes.push(String(index * 50));
    }
    var queues = [];
    var queuesIndex = [];
    var count = 0;
    for(var index in indexes){
        queues.push(matchPool[indexes[index]].queue);
        queuesIndex.push(indexes[index]);
        count += matchPool[indexes[index]].queue.length;
    }
    
    if(count >= matchLevel4MinCount){
        var matchList = excuteMatch(queues);
        var queueNum1 = matchList.firstTeam.queueNum;
        var teamNum1 = matchList.firstTeam.teamNum;
        var firstTeam = matchPool[queuesIndex[queueNum1]].queue[teamNum1];
        var queueNum2 = matchList.secondTeam.queueNum;
        var teamNum2 = matchList.secondTeam.teamNum;
        var secondTeam = matchPool[queuesIndex[queueNum2]].queue[teamNum2];

        if(firstTeam == undefined || secondTeam == undefined){
            return;
        }
        // console.log('firstTeam',firstTeam);
        // console.log('secondTeam',secondTeam);
        if(firstTeam.mapSelection != secondTeam.mapSelection || firstTeam.rewardAmount != secondTeam.rewardAmount || firstTeam.teamParticipantsNum != secondTeam.teamParticipantsNum){
            return;
        }
        if(queueNum1 == queueNum2){
            delete matchPool[queuesIndex[queueNum1]].queue[teamNum1];
            if(teamNum1 < teamNum2){
                delete matchPool[queuesIndex[queueNum1]].queue[teamNum2-1];
            }else{
                delete matchPool[queuesIndex[queueNum1]].queue[teamNum2];
            }
            matchPool[queuesIndex[queueNum1]].queue.length -= 2;
        }else{
            delete matchPool[queuesIndex[queueNum1]].queue[teamNum1];
            matchPool[queuesIndex[queueNum1]].queue.length -= 1;
            delete matchPool[queuesIndex[queueNum2]].queue[teamNum2];
            matchPool[queuesIndex[queueNum2]].queue.length -= 1;
        }
        broadCastMatchResult(firstTeam, secondTeam);
        matchPool[poolIndex].delay -= 2;
        if(matchPool[poolIndex].delay < 0){
            matchPool[poolIndex].delay = 0;
        }
    }
}


function excuteMatch(queues){

    var newQueues = [];
    var newQueueIndexes = [];
    for(var queueNum in queues){
        if(queues[queueNum].length != 0){
            newQueues.push(queues[queueNum]);
            newQueueIndexes.push(queueNum);
        }
    }

    var queueCount = newQueues.length;

    var queueNum1 = (parseInt(Math.random() * 100)) % queueCount;
    var queueNum2 = (parseInt(Math.random() * 100)) % queueCount;
    if(queueNum1 == queueNum2 && newQueues[queueNum2].length == 1){
        if(queueNum1 == 0){
            queueNum1 ++;
        }else{
            queueNum1 --;
        }
    }

        
    var teamNum1 = (parseInt(Math.random() * 10 * newQueues[queueNum1].length)) % newQueues[queueNum1].length;
    var teamNum2 = (parseInt(Math.random() * 10 * newQueues[queueNum2].length)) % newQueues[queueNum2].length;
    if(queueNum1 == queueNum2 && teamNum1 == teamNum2){
        //调度到了同一个队伍
        if(queueCount = 1){
            //只有一个队列   说明该队列人数大于等于最小限制值
            if(teamNum2 == 0){
                teamNum2++;
            }else{
                teamNum2--;
            }
        }else{
            if(queueNum2 == 0){
                queueNum2 = 1;
                teamNum2 = 0;
            }else{
                queueNum2--;
                teamNum2 = 0;
            }
        }
    }
    var matchList = {
        'firstTeam':{
            'queueNum': newQueueIndexes[queueNum1],
            'teamNum': teamNum1
        },
        'secondTeam':{
            'queueNum': newQueueIndexes[queueNum2],
            'teamNum': teamNum2
        }
    }
    return matchList;  
}

function broadCastMatchResult(firstTeam, secondTeam){
    var challengerTeam = firstTeam;
    var hostTeam = secondTeam;
    var currentTime = require('moment')().format('YYYYMMDDHHmmss');
    var $battleName = challengerTeam.captain.name + hostTeam.captain.name + (new Date).valueOf();
    //为该次对战创建倒计时
    initFlipClocks($battleName);
    afterStartClocks({
        battleName:$battleName,
    });
    var lolRoom = {
        roomName: creatRoomName(),
        password: Math.floor(Math.random() * 1000), // 4位随机数
        creatorId: challengerTeam.captain.userId,
        time: flipClocks[$battleName].time,
        afterStartTime: battleFlipClocks[$battleName].time
    };
    var battle = {
        battleName: $battleName,
        blueSide: challengerTeam,
        redSide: hostTeam,
        status: 'unready',
        time: {
            unready: currentTime,
            ready: null,
            start: null
        },
        lolRoom:lolRoom,
    };
    exports.battles[battle.battleName] = battle;
    // 将挑战队伍的所有用户加入到新的socket room
    for (var i in challengerTeam.participants) {
        socketService.userJoin(challengerTeam.participants[i].userId, battle.battleName);
        userService.changeUserStatus(challengerTeam.participants[i].userId, 'inbattle');
        userService.setEnvironment(challengerTeam.participants[i].userId, 'battle', battle);
        //更新好友状态
        userService.friendStatus(challengerTeam.participants[i].userId,'inbattle','true');
    }
    // 将受挑战队伍的所有用户加入到新的socket room
    for (var i in hostTeam.participants) {
        socketService.userJoin(hostTeam.participants[i].userId, battle.battleName);
        userService.changeUserStatus(hostTeam.participants[i].userId, 'inbattle');
        userService.setEnvironment(hostTeam.participants[i].userId, 'battle', battle);
        //更新好友状态
        userService.friendStatus(hostTeam.participants[i].userId,'inbattle','true');
    }

    //console.log(JSON.stringify(userService.users));
    //teamService.printfAllTeamsInfo();
    // 向该对局中所有的用户广播对局信息
    socketService.stableSocketsEmit(battle.battleName, 'battleInfo', battle);
    socketService.stableSocketsEmit(battle.battleName, 'lolRoomEstablish',lolRoom);
}

exports.handleMatch = function(io){
    this.io = io;
}

exports.strengthScoreChangedCalculation = function(winnerScore, loserScore){
	var newScore = {};	
	var D = Math.abs(winnerScore - loserScore);
	var K = 10;
	var Sa = 1.0 / (1 + Math.pow(10, -1 * D / 400));
	var diff = 2;
	var losePunishment = 0;
	if(D >= 100){
		//There is big stength gap
		if(winnerScore > loserScore){
			diff = 1.6;
			diff = 1.6;
		}else{
			diff = 2.5;
			diff = 2.5;
			if(D >= 200){
				//If there is greate stength gap and the team which has higher strength score lose the game
				losePunishment = 0.6;
			}
		}
	}
	var newWinnerScore = Math.round(winnerScore + K * Sa * diff);
	var newLoserScore = Math.round(loserScore - K * (1 - Sa + losePunishment) * diff);
	newLoserScore = newLoserScore < 0 ? 0 : newLoserScore;	
	newScore.newWinnerScore = newWinnerScore;
	newScore.newLoserScore = newLoserScore;
	return newScore;
}

exports.handleBattleTimeout = function(io,socket){
    socket.on('isTimeout',function(data){
        logUtil.listenerLog('battleIsTimeout');
        if(data.battleInfo.status == 'ready'){
            return;
        }
        console.log('this is pointInfo:',JSON.stringify(data));
        delete exports.battles[data.battleName];
        delete teamService.formedTeams[data.blueRoomName];
        delete teamService.formedTeams[data.redRoomName];
        teamService.removeBroadcastTeam(data.blueRoomName);
        teamService.removeBroadcastTeam(data.redRoomName);
        var feedback = {};
        switch(data.type){
            case 'beforeStart':{
                feedback = {
                    errorCode:0,
                    type:'BATTLEISTIMEOUT',
                    text:'长时间未检测到游戏已开始,请重新创建对局',
                    extension:{
                        formedTeams:teamService.formedTeams
                    }
                };
                //console.log('这是1');
                break;
            }
            case 'afterStart':{
                feedback = {
                    errorCode:0,
                    type:'BATTLEISTIMEOUT',
                    text:'游戏时间过长，此次对战失效',
                    extension:{
                        formedTeams:teamService.formedTeams
                    }
                };
                //console.log('这是2');
                break;
            }
            
        }
        //console.log(feedback || JSON.stringify(feedback));
        var bluePts = data.battleInfo.blueSide.participants;
        var redPts = data.battleInfo.redSide.participants;
        //console.log(JSON.stringify(bluePts),JSON.stringify(redPts));
        for(var key in bluePts){
            var userId = bluePts[key].userId;
            //更新好友状态
            userService.friendStatus(userId,'true','true');
        }
        for(var key in redPts){
            var userId = redPts[key].userId;
            //更新好友状态
            userService.friendStatus(userId,'true','true');
        }
        socketService.stableSocketsEmit(data.battleName, 'feedback', feedback);
    });
}

function processResultPacket(stdout){
    var resultPacket = {};
    resultPacket.head = "result";
    resultPacket.accountId = stdout.accountId;
    resultPacket.gameMode = stdout.gameMode;
    resultPacket.gameType = stdout.gameType;
    resultPacket.gameLength = stdout.gameLength;
    if(stdout.teams[0].players[0].stats.WIN == 1){
        resultPacket.win = "yes";
    }else{
		resultPacket.win = "no";
    }
    resultPacket.participants = [];

    var team1 = stdout.teams[0].players;
    for(var playerIndex in team1){
        var player = {};
        player.accountId = team1[playerIndex].summonerId;
        player.stats = {};
        player.stats.kill = team1[playerIndex].stats.CHAMPIONS_KILLED;//击杀敌方英雄数 
        player.stats.damage = team1[playerIndex].stats.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS;//对英雄的总输出 
        player.stats.damageTaken = team1[playerIndex].stats.TOTAL_DAMAGE_TAKEN;//承受的总伤害量
        player.stats.heal = team1[playerIndex].stats.TOTAL_HEAL;//总治愈量
        player.stats.goldEarned = team1[playerIndex].stats.GOLD_EARNED;//刷金钱的总数
        player.stats.death = team1[playerIndex].stats.NUM_DEATHS;//死亡次数
        player.stats.assists = team1[playerIndex].stats.ASSISTS;//助攻次数 
        player.stats.minions = team1[playerIndex].stats.MINIONS_KILLED;//补兵数目
        player.stats.tower = team1[playerIndex].stats.TURRETS_KILLED;//推塔数目
        resultPacket.participants.push(player);
    }

    var team2 = stdout.teams[1].players;
    for(var playerIndex in team2){
        var player = {};
        player.accountId = team2[playerIndex].summonerId;
        player.stats = {};
        player.stats.kill = team2[playerIndex].stats.CHAMPIONS_KILLED;//击杀敌方英雄数 
        player.stats.damage = team2[playerIndex].stats.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS;//对英雄的总输出 
        player.stats.damageTaken = team2[playerIndex].stats.TOTAL_DAMAGE_TAKEN;//承受的总伤害量
        player.stats.heal = team2[playerIndex].stats.TOTAL_HEAL;//总治愈量
        player.stats.goldEarned = team2[playerIndex].stats.GOLD_EARNED;//刷金钱的总数
        player.stats.death = team2[playerIndex].stats.NUM_DEATHS;//死亡次数
        player.stats.assists = team2[playerIndex].stats.ASSISTS;//助攻次数 
        player.stats.minions = team2[playerIndex].stats.MINIONS_KILLED;//补兵数目
        player.stats.tower = team2[playerIndex].stats.TURRETS_KILLED;//推塔数目
        resultPacket.participants.push(player);
    }

    return resultPacket;
}

exports.updateKDA = function(socket){
    socket.on('updateKDA',function(data){
        var ownTeam = data.result.own_team;
        var pointData;
        for(var key in ownTeam){
            if(data.userId==ownTeam[key].userId){
                pointData = ownTeam[key];
                break;
            }
        }
        var $gameLength = data.result.gameLength;
        var $goldPerminiute = Math.ceil(pointData.stats.goldEarned / $gameLength);
        pointData.goldPerminiute = $goldPerminiute;
        strengthInfoDao.updateKDA(pointData);
    });
}

//游戏开始前
var flipClocks = {};
function initFlipClocks(data){
    if(!flipClocks[data]){
        var obj = {
            curTime:new Date(),
            time:300
        };
        flipClocks[data] = obj;
        console.log('this is 1:',JSON.stringify(flipClocks));
    }else{
        var t1 = flipClocks[data].curTime;
        var ti = t1.getTime();
        var t2 = new Date();
        var ti2 = t2.getTime();
        var point = ti2-ti;
        var res = Math.round(point / 1000);
        var $time = flipClocks[data].time - res;
        if($time<0){
            $time=0;
        }
        var obj = {
            curTime:t2,
            time:$time
        };
        flipClocks[data] = obj;
        console.log('this is 2:',JSON.stringify(flipClocks));
    }
}

exports.getFlipClock = function(socket){
    socket.on('getFlipClock',function(data){
        var battleName = data.battleName;
        initFlipClocks(battleName);
        socketService.stableSocketEmit(socket,'feedback', {
            errorCode: 0,
            text: '获取倒计时成功',
            type: 'GETFLIPCLOCKRESULT',
            extension: {
                time:flipClocks[battleName].time
            }
        });
    });
}

//游戏开始后
var battleFlipClocks = {};
function afterStartClocks(data){
    var battleName = data.battleName;
    if(!battleFlipClocks[battleName]){
        var obj = {
            curTime:new Date(),
            time:5400
        };
        battleFlipClocks[battleName] = obj;
        console.log('this is 3:',JSON.stringify(battleFlipClocks));
    }else{
        if(data.firstTime == null && data.firstTime == undefined){
            var t1 = battleFlipClocks[battleName].curTime;
            var ti = t1.getTime();
            var t2 = new Date();
            var ti2 = t2.getTime();
            var point = ti2-ti;
            var res = Math.round(point / 1000);
            var $time = battleFlipClocks[battleName].time - res;
            if($time<0){
                $time=0;
            }
            var obj = {
                curTime:t2,
                time:$time
            };
            battleFlipClocks[battleName] = obj;
        }else{
            var obj = {
                curTime:new Date(),
                time:5400
            };
            battleFlipClocks[battleName] = obj;
        }
        //console.log('this is 4:',JSON.stringify(battleFlipClocks));
    }
}

/*
*随机生成房间名
*/
function creatRoomName(){
    var punctuation = ".-/\\";
    var letter = ['abcdefghigklnmopqrstuvwsyz','ABCDEFGHIJKLNMOPQRETUVWSYZ','0123456789'];
    var num = Math.floor((Math.random()*3));
    var pun_length = punctuation.length;
    var str = 'BULLUP-';
    if(num == 0){
        var pun = punctuation[Math.floor((Math.random()*pun_length))];
        for(var i = 0;i<8;i++){
            str += letter[0][Math.floor((Math.random()*26))] + pun;
        }
        str += letter[0][Math.floor((Math.random()*26))];
    }else if(num == 1){
        var pun = punctuation[Math.floor((Math.random()*pun_length))];
        for(var i = 0;i<8;i++){
            str += letter[1][Math.floor((Math.random()*26))] + pun;
        }
    }else{
        var pun = punctuation[Math.floor((Math.random()*pun_length))];
        for(var i = 0;i<8;i++){
            str += letter[2][Math.floor((Math.random()*10))] + pun;
        }
    }  
    return str;
}

exports.getAfterStartClock = function(socket){
    socket.on('afterStartClock',function(data){
        var battleName = data.battleName;
        afterStartClocks(data);
        socketService.stableSocketEmit(socket,'feedback', {
            errorCode: 0,
            text: '获取倒计时成功',
            type: 'GETAFTERFLIPCLOCKRESULT',
            extension: {
                time:battleFlipClocks[battleName].time
            }
        });
    });
}