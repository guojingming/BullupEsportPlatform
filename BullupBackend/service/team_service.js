var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/service".length).replace(/\\/g, "/"));
var logUtil = dependencyUtil.global.utils.logUtil;
var socketService = dependencyUtil.global.service.socketService;
var battleService = dependencyUtil.global.service.battleService;
var userService = dependencyUtil.global.service.userService;

exports.init = function() {
    // 已经创建完毕的队伍
    this.formedTeams = {};
    // 正在创建中的队伍列表
    this.unformedTeams = {};
    // 用来进行广播的队伍列表
    this.broadcastTeamInfos = {};
    
    // 创建匹配调度池
    this.matchPools = [];
    for(var i = 0;i<5;i++){
        var matchPool = {};
        for(var index = 0;index < 90;index++){
            matchPool[index * 50] = {};
            matchPool[index * 50].delay = 0;
            matchPool[index * 50].queue = [];
        }
        this.matchPools.push(matchPool);
    }
}

/**
 * 队伍创建监听
 * @param socket
 */
//建立房间
exports.handleRoomEstablish = function(socket) {
    socket.on('roomEstablish', function (room) {
        logUtil.listenerLog('roomEstablish');
        exports.unformedTeams[room.roomName] = room;
        //变化房间中所有user的satus
        for(var index in room.participants){
            var userId = room.participants[index].userId;
            userService.changeUserStatus(userId, 'inroom');
            userService.setEnvironment(userId, 'room', room);
            socketService.userJoin(userId, room.roomName);
            //更新好友状态
            userService.friendStatus(userId,'inroom','true');
        }

        //将该socket放入teamname命名的room中
        // 返回回馈信息
        socketService.stableSocketEmit(socket, 'feedback', {
            errorCode: 0,
            type: 'ESTABLISHROOMRESULT',
            text: '创建成功',
            extension: room
        });
    });
}


exports.handleRefreshFormedBattleRoom = function(socket){
    socket.on('refreshFormedBattleRoom', function(data){
        console.log('refresh command');
        var feedback = {
            errorCode: 0,
            type: 'REFRESHFORMEDBATTLEROOMRESULT',
            text: '刷新成功',
            extension: {
                formedTeams: exports.broadcastTeamInfos
            }
        }
        socketService.stableSocketEmit(socket, 'feedback', feedback);
        //socketService.stableEmit();
    });

}

/**
 * 通过队伍名获取未形成的队伍信息
 * @param teamName 队伍名
 */
exports.mapTeamNameToUnformedTeam = function (teamName) {
    return this.unformedTeams[teamName];
}

/**
 * 根据队伍获取已经形成的队伍信息
 * @param teamName 队伍名
 */
exports.mapTeamNameToFormedTeam = function (teamName) {
    return this.formedTeams[teamName];
}
/**
 * 向未形成的队伍列表中的某一个team添加参与者
 * @param teamName 队伍名
 * @param participant 参与者信息
 */
exports.addParticipantToTeam = function (teamName, participant) {
    this.unformedTeams[teamName].participants.push(participant);
}

/**
 * 处理用户确认创建队伍请求
 * @param io
 * @param socket
 */
exports.handleTeamEstablish = function (io, socket) {
    socket.on('establishTeam', function (roomInfo) {
        logUtil.listenerLog('establishTeam');

        teamInfo = exports.mapTeamNameToUnformedTeam(roomInfo.roomName);
        teamInfo.teamStrengthScore = roomInfo.teamStrengthScore;
        teamInfo.teamParticipantsNum =  roomInfo.teamParticipantsNum;
        // 更新队伍信息状态
        teamInfo.status = 'PUBLISHING';
        // 将未形成队伍列表中的队伍放入已形成队伍列表中
        logUtil.logToFile("./logs/data/data.txt", "append", JSON.stringify(teamInfo), "establishTeam teamInfo");
        //更新队伍成员的状态和环境
        for(var index in teamInfo.participants){
            var userId = teamInfo.participants[index].userId;
            userService.changeUserStatus(userId, 'inteam');
            userService.setEnvironment(userId, 'team', teamInfo);
            //更新好友状态
            userService.friendStatus(userId,'inteam','true');
        }

        if(teamInfo.gameMode == 'battle'){
            //约战
            exports.formedTeams[teamInfo.roomName] = teamInfo;
            exports.broadcastTeamInfos[teamInfo.roomName] = teamInfo;
            // 将该队伍可以用来广播的内容加入到广播列表中
            //
            // exports.broadcastTeamInfos[teamInfo.roomName] = {
            //     teamName: teamInfo.roomName,
            //     status: teamInfo.status,
            //     type: teamInfo.gameMode,
            //     bet: teamInfo.rewardAmount,
            //     mapId: teamInfo.mapSelection,
            //     rule: teamInfo.winningCondition,
            //     participantsCount: teamInfo.participants.length
            // };
            delete exports.unformedTeams[teamInfo.roomName];
            logUtil.logToFile("./logs/data/data.txt", "append", JSON.stringify(exports.formedTeams), "establishTeam formedTeams");
            logUtil.logToFile("./logs/data/data.txt", "append", JSON.stringify(exports.unformedTeams), "establishTeam unformedTeams");

            var feedback = {
                errorCode: 0,
                type: 'ESTABLISHTEAMRESULT',
                text: '队伍创建成功',
                extension: {
                    teamInfo: teamInfo,
                    formedTeams: exports.broadcastTeamInfos
                }
            };
            // 告诉该队伍中的所有用户队伍已经形成
            socketService.stableSocketsEmit(teamInfo.roomName, 'feedback', feedback);
        }else if(teamInfo.gameMode == 'match'){
            var feedback = {
                errorCode: 0,
                type: 'ESTABLISHTEAMMATCHRESULT',
                text: '队伍创建成功',
                extension: {
                    teamInfo: teamInfo,
                }
            };
            socketService.stableSocketsEmit(teamInfo.roomName, 'feedback', feedback);            
            //匹配
            //把队伍加入调度池
            //计算队伍平均战力
            var sumScore = 0;
            for(var index in teamInfo.participants){
                var score = teamInfo.participants[index].strength.score;
                sumScore += score;
            }
            var level = String(parseInt(sumScore / teamInfo.participants.length / 50) * 50);
            if(parseInt(level) >= 4500){
                level = String(4450);
            }
            exports.matchPools[String(teamInfo.participants.length - 1)][level].queue.push(teamInfo);
            //console.log('this is matchPools',JSON.stringify(exports.matchPools));
            //测试调度算法
            //exports.match();
        }
    });
}

/**
 * 处理用户更新对战大厅房间请求
 * @param socket
 */
exports.handleVersusLobbyRefresh = function(socket) {
    socket.on('versusLobbyRefresh', function () {
        logUtil.listenerLog('versusLobbyRefresh');
        socketService.stableSocketEmit(socket, 'feedback', {
            errorCode: 0,
            type: 'VERSUSLOBBYINFO',
            text: '对战大厅更新数据',
            extension: exports.broadcastTeamInfos
        });
    });
}


/**
 * 处理用户查看详情
 * @param socket
 */
exports.handleTeamDetails = function (socket) {
    socket.on('teamDetails', function (teamInfo) {
        var team = exports.formedTeams[teamInfo.teamName];
        
        if (team && team.status == 'PUBLISHING') {
            socketService.stableSocketEmit(socket, 'feedback', {
                errorCode: 0,
                type: 'TEAMDETAILS',
                text: '队伍详情',
                extension: team,
            })
        } else {
            socketService.stableSocketEmit(socket, 'feedback', {
                errorCode: 1,
                type: 'TEAMDETAILS',
                text: '查看队伍详情失败, 请刷新对战大厅',
                extension: null
            })
        }
    })
}

/**
 * 改变队伍状态，只改变已形成的队伍，未形成的队伍的状态只有ESTABLISHING
 * @param teamName 需要改变状态的队伍名
 * @param status 新状态
 */
exports.changeTeamStatus = function (teamName, status) {
    this.formedTeams[teamName].status = status;
}

exports.removeBroadcastTeam = function (teamName) {
    delete this.broadcastTeamInfos[teamName];
}

exports.printfAllTeamsInfo = function(){
    console.log("Formed Team :");
    console.log(this.formedTeams);
    console.log("Unformed Team :");
    console.log(this.unformedTeams);
    console.log("Broadcast Team :");
    console.log(this.broadcastTeamInfos);
}

exports.match = function(){
    setInterval(()=>{
        for(var i = 0;i<5;i++){
            //console.log(exports.matchPools[String(i)]['2000'].queue.length);
            battleService.matchScheduling(exports.matchPools[String(i)]);
        }
    },1000);
}

exports.cancelMatch = function(io,socket){
    socket.on('cancelMatch',function(data){
        logUtil.listenerLog('battleIsTimeout');
        console.log('this is cancel room:',JSON.stringify(data));
        var roomInfo = data.$roomInfo;
        var sumScore = 0;
        for(var index in roomInfo.participants){
            var score = roomInfo.participants[index].strength.score;
            sumScore += score;
        }
        var level = String(parseInt(sumScore / roomInfo.participants.length / 50) * 50);
        if(parseInt(level) >= 4500){
            level = String(4450);
        }
        var tempQueue = exports.matchPools[String(roomInfo.teamParticipantsNum - 1)][level].queue;
        //console.log('this is tempQueue:',JSON.stringify(tempQueue));
        for(var key in tempQueue){
            if(tempQueue[key].roomName == roomInfo.roomName){
                delete exports.matchPools[String(roomInfo.teamParticipantsNum - 1)][level].queue[key];
                break;
            }
        }
        var feedback = {
            errorCode: 0,
            type: 'CANCELMATCHRESULT',
            text: '匹配已取消',
            extension: null
        };
        //重新加入unformed team
        //roomInfo.status = 'ESTABLISHING';
        //exports.unformedTeams[roomInfo.roomName] = roomInfo;
        for(var key in roomInfo.participants){
            var userId = roomInfo.participants[key].userId;
            //更新好友状态
            userService.friendStatus(userId,'true','true');
        }
        socketService.stableSocketsEmit(roomInfo.roomName, 'feedback', feedback);
    });
}

//测试
exports.exitRoom = function(userId, roomName){
    var room = exports.unformedTeams[roomName];
    if(room.captain.userId != userId){
        //不是队长 从队员列表删除 并且通知房间中其他人
        var participants = room.participants;
        for(var participantIndex in participants){
            if(participants[participantIndex].userId == userId){
                //更新好友状态
                userService.friendStatus(participants[participantIndex].userId,'false','false');
                delete participants[participantIndex];
                delete exports.unformedTeams[roomName].participants[participantIndex];
                exports.unformedTeams[roomName].participants.length -= 1;
                break;
            }
        }
        for(var participantIndex in participants){
            var participantUserId = participants[participantIndex].userId;
            var socket = socketService.mapUserIdToSocket(participantUserId);
            socketService.stableSocketEmit(socket, "updateRoomMember", room);
            //更新所有人的状态
            userService.setEnvironment(participantUserId, "room", room);
            //更新好友状态
            userService.friendStatus(participantUserId,'inroom','true');
            //更新socket room
        }
    }else{
        //是队长 房间删除  通知所有成员
        var participants = room.participants;
        for(var participantIndex in participants){
            if(participants[participantIndex].userId == userId){
                //更新好友状态
                userService.friendStatus(participants[participantIndex].userId,'false','false');
                delete participants[participantIndex];
                break;
            }
        }
        for(var participantIndex in participants){
            var participantUserId = participants[participantIndex].userId;
            var socket = socketService.mapUserIdToSocket(participantUserId);
            socketService.stableSocketEmit(socket, "roomCanceled", {});
            //更新所有人状态
            userService.changeUserStatus(participantUserId, "idle");
            //更新好友状态
            userService.friendStatus(participantUserId,'true','true');
            delete userService.users[participantUserId].environment.room;
            //更新socket room
        }
        //删除房间
        delete exports.unformedTeams[roomName];
    }
}

//测试
exports.exitTeam = function(userId, roomName){
    var room = exports.formedTeams[roomName];
    if(room.captain.userId != userId){
        //不是队长 从队员列表删除 并且通知房间中其他人
        var participants = room.participants;
        for(var participantIndex in participants){
            if(participants[participantIndex].userId == userId){
                //更新好友状态
                userService.friendStatus(participants[participantIndex].userId,'false','false');
                delete participants[participantIndex];
                room.participants.length -= 1;
                room.status = 'ESTABLISHING';
                break;
            }
        }
        for(var participantIndex in participants){
            var participantUserId = participants[participantIndex].userId;
            var socket = socketService.mapUserIdToSocket(participantUserId);
            socketService.stableSocketEmit(socket, "updateTeamMember", room);
            //更新每个人的状态
            userService.changeUserStatus(participantUserId, "inroom");
            //更新好友状态
            userService.friendStatus(participantUserId,'inroom','true');
            delete userService.users[participantUserId].environment.team;
            //更新socket room
        }
        //重新加入创建中的房间
        exports.unformedTeams[roomName] = room;
    }else{
        //是队长 房间删除  通知所有成员
        var participants = room.participants;
        for(var participantIndex in participants){
            if(participants[participantIndex].userId == userId){
                //更新好友状态
                userService.friendStatus(participants[participantIndex].userId,'false','false');
                delete participants[participantIndex];
                break;
            }
        }
        for(var participantIndex in participants){
            var participantUserId = participants[participantIndex].userId;
            var socket = socketService.mapUserIdToSocket(participantUserId);
            socketService.stableSocketEmit(socket, "teamCanceled", {});
            //更新每个人的状态
            userService.changeUserStatus(participantUserId, "idle");
            //更新好友状态
            userService.friendStatus(participantUserId,'true','true');
            delete userService.users[participantUserId].environment.room;
            delete userService.users[participantUserId].environment.team;
            //更新socket room
        }
    }
    delete exports.formedTeams[roomName];
    delete exports.broadcastTeamInfos[roomName];
}

exports.exitTeamAndMatch = function(userId, room){
    //刪除匹配池中的信息
    var roomInfo = room;
    var sumScore = 0;
    for(var index in roomInfo.participants){
        var score = roomInfo.participants[index].strength.score;
        sumScore += score;
    }
    var level = String(parseInt(sumScore / roomInfo.participants.length / 50) * 50);
    var tempQueue = exports.matchPools[String(roomInfo.teamParticipantsNum - 1)][level].queue;
    //console.log('this is tempQueue:',JSON.stringify(tempQueue));
    for(var key in tempQueue){
        if(tempQueue[key].roomName == roomInfo.roomName){
            delete exports.matchPools[String(roomInfo.teamParticipantsNum - 1)][level].queue[key];
            break;
        }
    }
    var feedback = {
        errorCode: 0,
        type: 'CANCELMATCHRESULT',
        text: '有队员退出了队伍',
        extension: roomInfo
    };
    socketService.stableSocketsEmit(roomInfo.roomName, 'feedback', feedback);


    if(room.captain.userId != userId){
        //不是队长 从队员列表删除 并且通知房间中其他人
        var participants = room.participants;
        for(var participantIndex in participants){
            if(participants[participantIndex].userId == userId){
                //更新好友状态
                userService.friendStatus(participants[participantIndex].userId,'false','false');
                delete participants[participantIndex];
                room.participants.length -= 1;
                room.status = 'ESTABLISHING';
                break;
            }
        }
        for(var participantIndex in participants){
            var participantUserId = participants[participantIndex].userId;
            var socket = socketService.mapUserIdToSocket(participantUserId);
            socketService.stableSocketEmit(socket, "updateTeamMember", room);
            //更新每个人的状态
            userService.changeUserStatus(participantUserId, "inroom");
            delete userService.users[participantUserId].environment.team;
            //更新socket room
        }
        //重新加入创建中的房间
        exports.unformedTeams[room.roomName] = room;
    }else{
        //是队长 房间删除  通知所有成员
        var participants = room.participants;
        for(var participantIndex in participants){
            if(participants[participantIndex].userId == userId){
                delete participants[participantIndex];
                break;
            }
        }
        for(var participantIndex in participants){
            var participantUserId = participants[participantIndex].userId;
            var socket = socketService.mapUserIdToSocket(participantUserId);
            socketService.stableSocketEmit(socket, "teamCanceled", {});
            //更新每个人的状态
            userService.changeUserStatus(participantUserId, "idle");
            //更新好友状态
            userService.friendStatus(participantUserId,'true','true');
            delete userService.users[participantUserId].environment.room;
            delete userService.users[participantUserId].environment.team;
            //更新socket room
        }
    }

}

exports.handleUserQuitRoom = function(userId, roomName){
    var room = exports.unformedTeams[roomName];
    if(room.captain.userId != userId){
        //不是队长 从队员列表删除 并且通知房间中其他人
        var participants = room.participants;
        for(var participantIndex in participants){
            if(participants[participantIndex].userId == userId){
                //更新好友状态
                userService.friendStatus(participants[participantIndex].userId,'true','true');
                userService.changeUserStatus(participants[participantIndex].userId, "idle");
                delete participants[participantIndex];               
                delete exports.unformedTeams[roomName].participants[participantIndex];
                var socketId = socketService.userSocketMap[userId].id;
                for(var i = 0;i<socketService.roomSocketMap[roomName].length;i++){
                     if(socketId == socketService.roomSocketMap[roomName][i].id){
                        delete socketService.roomSocketMap[roomName][i];
                        break;
                     }
                }
                exports.unformedTeams[roomName].participants.length -= 1;
                break;
            }
        }
        for(var participantIndex in participants){
            var participantUserId = participants[participantIndex].userId;
            var socket = socketService.mapUserIdToSocket(participantUserId);
            socketService.stableSocketEmit(socket, "updateRoomMember", room);
            //更新所有人的状态
            userService.setEnvironment(participantUserId, "room", room);
            //更新好友状态
            userService.friendStatus(participantUserId,'inroom','true');
            //更新socket room
        }
    }else{
        //是队长 房间删除  通知所有成员
        var participants = room.participants;
        for(var participantIndex in participants){
            if(participants[participantIndex].userId == userId){
                //更新好友状态
                userService.friendStatus(participants[participantIndex].userId,'true','true');
                userService.changeUserStatus(participants[participantIndex].userId, "idle");
                delete participants[participantIndex];
                break;
            }
        }
        for(var participantIndex in participants){
            var participantUserId = participants[participantIndex].userId;
            var socket = socketService.mapUserIdToSocket(participantUserId);
            socketService.stableSocketEmit(socket, "roomCanceled", {});
            //更新所有人状态
            userService.changeUserStatus(participantUserId, "idle");
            //更新好友状态
            userService.friendStatus(participantUserId,'true','true');
            delete userService.users[participantUserId].environment.room;
            //更新socket room
        }
        //删除房间
        delete exports.unformedTeams[roomName];
    }
}