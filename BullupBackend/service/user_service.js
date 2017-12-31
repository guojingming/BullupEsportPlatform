var async = require("async");
var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/service".length).replace(/\\/g, "/"));

var logUtil = dependencyUtil.global.utils.logUtil;
var socketService = dependencyUtil.global.service.socketService;
var teamService = dependencyUtil.global.service.teamService;
var battleService = dependencyUtil.global.service.battleService;
var userService = dependencyUtil.global.service.userService;

var baseInfoDao = dependencyUtil.global.dao.baseInfoDao;
var strengthInfoDao = dependencyUtil.global.dao.strengthInfoDao;
var wealthInfoDao = dependencyUtil.global.dao.wealthInfoDao;
var lolInfoDao = dependencyUtil.global.dao.lolInfoDao;
var battleRecordDao = dependencyUtil.global.dao.battleRecordDao;
var rankInfoDao = dependencyUtil.global.dao.rankInfoDao;

exports.init = function () {
    this.users = {};

    this.environment = {};
}

/**
 * 向数据结构中添加用户
 */
exports.addUser = function (user) {
    this.users[user.userId] = user;
    this.users[user.userId].environment = {};
    this.users[user.userId].status = "idle";

    if(this.environment[user.userId] != undefined){
        var environment = JSON.parse(JSON.stringify(this.environment[user.userId]));
        // if(battleService.battles[environment.battle.battleName] == undefined){
        //     return;
        // }
        var $temp = JSON.stringify(environment);
        if($temp == '{}'){
            return;
        }
        this.users[user.userId].environment = this.environment[user.userId];
        this.users[user.userId].status = "inbattle";
        //加入room
        socketService.userJoin(user.userId, environment.room.roomName);
        socketService.userJoin(user.userId, environment.battle.battleName);
        //获取socket
        var socket = socketService.mapUserIdToSocket(user.userId);
        //更新battle的status
        environment.battle.status = battleService.battles[environment.battle.battleName].status;
        //发送环境信息
        socketService.stableSocketEmit(socket, "EnvironmentRecover", environment);
        //删除服务器存留的环境信息
        delete this.environment[user.userId];
        exports.friendStatus(user.userId,'inbattle','true');
    }

}

/**
 * 处理用户连接
 * @param socket
 */
exports.handleLogin = function (socket) {
    socket.on('login', function (data) {
        logUtil.listenerLog('login');

        baseInfoDao.findUserByAccount(data.userName, function (user) {            
            if (!user || user.user_password != data.password) {
                // 登录失败
                socketService.stableSocketEmit(socket, 'feedback', {
                    errorCode: 1,
                    text: '登录失败，请检验用户名密码！',
                    type: 'LOGINRESULT',
                    extension: null
                });
            } else {
                //判断账户是否登陆,
                for(var index in exports.users){
                    if(index == user.user_id){
                        if(socket.id != exports.users[index].socket_id){
                        socketService.stableSocketEmit(socket, 'feedback', {
                            user_id:index,
                            socket_id:socket.id,
                            old_socket_id:exports.users[index].socket_id,
                            errorCode: 2,
                            text: '用户已经登陆了！',
                            type: 'LOGINRESULT',
                            extension: null
                        });
                    }                                            
                    }
                }
                // 登陆成功
                socketService.add(user.user_id, socket);
                exports.friendStatus(user.user_id,'true','true');
                async.waterfall([
                    function(callback){
                        baseInfoDao.findUserIconById(user.user_id, function(iconId){
                            var userInfo = {};
                            userInfo.userId = user.user_id;
                            userInfo.userNickname = user.user_nickname;
                            userInfo.userIconId = iconId.icon_id;
                            callback(null, userInfo);
                        });
                    },
                    function(userInfo, callback){
                        baseInfoDao.findFriendListByUserId(userInfo.userId, function (res) {
                            if(res){
                                //判断用户是否在users
                                for(var key in res){
                                    if(exports.users[res[key].userId]!=undefined){
                                        if(exports.users[res[key].userId].status=='idle'){
                                            res[key].online = 'true';
                                        }else if(exports.users[res[key].userId].status=='inroom'){
                                             res[key].online = 'inroom';
                                        }else if(exports.users[res[key].userId].status=='inteam'){
                                            res[key].online = 'inteam';
                                        }else if(exports.users[res[key].userId].status=='inbattle'){
                                            res[key].online = 'inbattle';
                                        }
                                    }
                                }
                                //定义一个空数组，用来保存根据状态排序后的信息
                                var arr = new Array();
                                for(obj in res){
                                    arr.push(res[obj]);
                                }
                                arr.sort(function(x,y){
                                    return x.online < y.online ? 1 : -1;
                                });
                                userInfo.friendList = arr;
                                callback(null, userInfo);   
                            }
                        });
                    },
                    function(userInfo, callback){
                        strengthInfoDao.findStrengthInfoByUserId(userInfo.userId, function (strengthInfo) {
                            userInfo.strengthInfo = strengthInfo;
                            callback(null, userInfo);
                        });
                    },
                    function(userInfo, callback){
                        wealthInfoDao.findUserWealthByUserId(userInfo.userId, function (wealthInfo) {
                            userInfo.wealth = wealthInfo.bullup_currency_amount;
                            callback(null, userInfo);
                        });
                    },
                    function(userInfo, callback){
                        lolInfoDao.findUserLOLAccountInfo(userInfo.userId, function(lolAccountInfo){
                            userInfo.lolAccountInfo = lolAccountInfo;
                            callback(null, userInfo);
                        });
                    },
                    //检查是否是第一次登录
                    function(userInfo,callback){
                        baseInfoDao.checkLastLoginTime(userInfo.userId,function(lastLoginTime){
                            userInfo.lastLoginTime = lastLoginTime;
                            callback(null,userInfo);
                        });
                    },
                    //查找用户约战次数
                    function(userInfo,callback){
                        battleRecordDao.findUserBattleCount(userInfo.userId,function(count){
                            userInfo.battleCount = count[0].battleCount;
                            //console.log(userInfo.battleCount);
                            callback(null,userInfo);
                        });
                    }

                ], function(err, userInfo){
                    var userStrength = userInfo.strengthInfo;
                    var feedback = {
                        errorCode: 0,
                        type: 'LOGINRESULT',
                        text: "登录成功",
                        extension: {
                            socket_id: socket.id,
                            name: userInfo.userNickname,
                            userId: userInfo.userId,
                            //----------------------
                            userRole:user.user_role,
                            lastLoginTime:userInfo.lastLoginTime,
                            battleCount:userInfo.battleCount,
                            //----------------------
                            avatarId: userInfo.userIconId,
                            wealth: userInfo.wealth,
                            online: true,
                            status: 'IDLE',
                            friendList: userInfo.friendList,
                            lolAccountInfo: userInfo.lolAccountInfo,
                            relationMap: {
                                currentTeamId: null,
                                currentGameId: null
                            }
                        }
                    };
                    if(userStrength != undefined){
                        var kda = ((userStrength.bullup_strength_k + userStrength.bullup_strength_a) / (userStrength.bullup_strength_d + 1.2)).toFixed(1);
                        feedback.extension.strength = {
                            kda: kda,
                            k:userStrength.bullup_strength_k ,
                            d:userStrength.bullup_strength_d,
                            a:userStrength.bullup_strength_a,
                            averageGoldEarned: userStrength.bullup_strength_gold,
                            averageTurretsKilled: userStrength.bullup_strength_tower,
                            averageDamage: userStrength.bullup_strength_damage,
                            averageDamageTaken: userStrength.bullup_strength_damage_taken,
                            averageHeal: userStrength.bullup_strength_heal,
                            score: userStrength.bullup_strength_score
                        }
                    }else{
                        feedback.extension.strength = undefined;
                    }
                    exports.addUser(feedback.extension);

                    socketService.stableSocketEmit(socket, 'feedback', feedback);                    
                    //socketService.stableEmit();
                    //socket.emit('feedback', feedback);
                });
            }
        });
    });
}

/**
 * 处理用户注册
 * @param socket
 */
exports.handleRegister = function (socket) {
    socket.on('register', function (userInfo) {
        logUtil.listenerLog('register');
        baseInfoDao.findUserByAccount(userInfo.userAccount, function (user) {
            if (user) {
                // 如果该用户存在
                socketService.stableSocketEmit(socket, 'feedback', {
                    errorCode: 1,
                    text: '该用户已经注册',
                    type: 'REGISTERRESULT',
                    extension: null
                });
            } else {
                baseInfoDao.findUserByPhone(userInfo.userPhoneNumber, function (user) {
                    if(user){
                        socketService.stableSocketEmit(socket, 'feedback', {
                            errorCode: 1,
                            text: '该手机号已被使用',
                            type: 'REGISTERRESULT',
                            extension: null
                        });
                    }else{
                        baseInfoDao.findUserByNickname(userInfo.userNickname, function (user) {
                            if(user){
                                socketService.stableSocketEmit(socket, 'feedback', {
                                    errorCode: 1,
                                    text: '该昵称已被使用',
                                    type: 'REGISTERRESULT',
                                    extension: null
                                });
                            }else{
                                //baseInfoDao.findUserByCode(userInfo.userEmail, function (user) {
                                    // if(user){
                                    //     socketService.stableSocketEmit(socket, 'feedback', {
                                    //         errorCode: 1,
                                    //         text: '该邀请码已被使用',
                                    //         type: 'REGISTERRESULT',
                                    //         extension: null
                                    //     });
                                    // }else{
                                        baseInfoDao.addUser(userInfo, function (userAddRes) {
                                            socketService.stableSocketEmit(socket, 'feedback', {
                                                errorCode: 0,
                                                text: '注册成功',
                                                type: 'REGISTERRESULT',
                                                extension: {
                                                    userAccount: userInfo.userAccount,
                                                    userNickname: userInfo.userNickname,
                                                    userId: userAddRes.userId,
                                                    userIconId: 1,
                                                }
                                            });
                                        });
                                    //}
                                //});
                                
                            }
                        });
                    }
                });
            }
        });
    });
}

/**
 * 处理用户邀请好友
 * @param socket
 */
exports.handleInviteFriend = function (socket) {
    socket.on('message', function (inviteMessage) {
        logUtil.listenerLog('message');
        if (socketService.isUserOnline(inviteMessage.userId)) {
            var dstSocket = socketService.mapUserIdToSocket(inviteMessage.userId);
            inviteMessage.messageToken = 'message' + inviteMessage.userId + (new Date()).getTime();

            socketService.stableSocketEmit(dstSocket, 'message', inviteMessage);
        } else {
            socketService.stableSocketEmit(socket, 'feedback', {
                errorCode: 1,
                type: 'INVITERESULT',
                text: '邀请失败,该用户已经下线'
            });
        }
    });
}

exports.handleIconIdUpdate = function (socket) {
    socket.on('iconIdUpdate', function (iconData) {
        baseInfoDao.updateUserIconIdByUserId(iconData.userId, iconData.newIconId);
        socketService.stableSocketEmit(socket, 'feedback', {
            'errorCode': 0,
            'type': 'ICONUPDATERESULT',
            'text': '头像更新成功',
            'extension': null
        });
    });
}

//查询账户余额
exports.handleGetBalance = function (socket){
    socket.on('getBalance', function(data){
        //console.log('2134');
        wealthInfoDao.getBalance(data,function(balance){
            var tempBalance = balance.bullup_currency_amount;
            socketService.stableSocketEmit(socket,'feedback', {
                errorCode: 0,
                text: '查询余额OK',
                type: 'GETBALANCERESULT',
                extension: {
                    "balance": tempBalance,
                }
            });
        });
     });
}

//用户更改信息
exports.handleUserUpdateInfo = function(socket){
    socket.on('updateInfo',function(data){
        console.log(data);
        switch(data.type){
            case "nickname":
                baseInfoDao.findUserByNickname(data.nickname, function (user) {
                    if(user){
                        socketService.stableSocketEmit(socket,'feedback', {
                            errorCode: 1,
                            text: '该昵称已被占用',
                            type: 'UPDATEINFORESULT',
                            extension: null
                        });
                    }else{
                        baseInfoDao.updateNickname(data,function(res){
                            if(!res){
                                socketService.stableSocketEmit(socket,'feedback', {
                                    errorCode: 1,
                                    text: '修改失败,请稍后重试',
                                    type: 'UPDATEINFORESULT',
                                    extension: null
                                });
                            }else{
                                socketService.stableSocketEmit(socket,'feedback', {
                                    errorCode: 0,
                                    text: '昵称修改成功',
                                    type: 'UPDATEINFORESULT',
                                    extension: null
                                });
                            } 
                        });
                    }
                });
                break;
            case "phone":
                baseInfoDao.findUserByPhone(data.phone, function (user) {
                    if(user){
                        socketService.stableSocketEmit(socket,'feedback', {
                            errorCode: 1,
                            text: '该手机号已被使用',
                            type: 'UPDATEINFORESULT',
                            extension: null
                        });
                    }else{
                        baseInfoDao.updatePhone(data,function(res){
                            if(!res){
                                socketService.stableSocketEmit(socket,'feedback', {
                                    errorCode: 1,
                                    text: '修改失败,请稍后重试',
                                    type: 'UPDATEINFORESULT',
                                    extension: null
                                });
                            }else{
                                socketService.stableSocketEmit(socket,'feedback', {
                                    errorCode: 0,
                                    text: '号码修改成功',
                                    type: 'UPDATEINFORESULT',
                                    extension: null
                                });
                            } 
                        });
                    }
                });
                break;
            case "password":
                baseInfoDao.updatePassword(data,function(res){
                    if(!res){
                        socketService.stableSocketEmit(socket,'feedback', {
                            errorCode: 1,
                            text: '修改失败,请稍后重试',
                            type: 'UPDATEINFORESULT',
                            extension: null
                        });
                    }else{
                        socketService.stableSocketEmit(socket,'feedback', {
                            errorCode: 0,
                            text: '密码修改成功',
                            type: 'UPDATEINFORESULT',
                            extension: null
                        });
                    } 
                });
                break;
        }
         
    });
}

//用户最近登陆时间
exports.handlelastLoginTime = function (socket){
    socket.on('loginTime', function(data){
        console.log(data);
        baseInfoDao.insertLastLoginTime(data,function(res){
            // var tempBalance = balance.bullup_currency_amount;
            // socket.emit('feedback', {
            //     errorCode: 0,
            //     text: '查询余额OK',
            //     type: 'GETBALANCERESULT',
            //     extension: {
            //         "balance": tempBalance,
            //     }
            // });
        });
     });
}

/**
 * 处理用户或拒绝对方用户的邀请
 * @param io 服务器io, 通过该io向某个房间的所有用户广播信息
 * @param socket 该用户的连接socket
 */
exports.handleUserInviteResult = function (io, socket) {
    socket.on('inviteResult', function (feedback) {
        logUtil.listenerLog('inviteResult');

        // 检查队伍是否存在
        if (teamService.mapTeamNameToUnformedTeam(feedback.extension.teamName)) {
            var teamName = feedback.extension.teamName;
            var participant = feedback.extension.userInfo;
            var room = teamService.mapTeamNameToUnformedTeam(teamName);
            var roomMember = room.participants.map((e) => e.userId); 
            //用户接受邀请
            if (feedback.errorCode == 0 && roomMember.indexOf(participant.userId) == -1) {
                //更新用户状态
                var userId = participant.userId;
                userService.changeUserStatus(userId, 'inroom');
                userService.setEnvironment(userId, 'room', room);
                exports.friendStatus(userId,'inroom','true');
                // 更新teamList中team信息, 添加该参与者
                teamService.addParticipantToTeam(teamName, participant);
                socketService.userJoin(userId, teamName);
                //    socket.emit('teamInfoUpdate', teamService.mapTeamNameToUnformedTeam(teamName));

                // 向房间内的所有用户广播当前队伍信息
                socketService.stableSocketsEmit(teamName, 'teamInfoUpdate', teamService.mapTeamNameToUnformedTeam(teamName));
            } else if (feedback.errorCode == 1 && roomMember.indexOf(participant.userId) == -1) {
                // 用户拒绝邀请
                var hostId = feedback.extension.hostId;

                // 向发起者发送拒绝信息
                var dstSocket = socketService.mapUserIdToSocket(hostId);
                socketService.stableSocketEmit(dstSocket, 'feedback', feedback);
            }
        }
    });
}

exports.changeUserStatus = function (userId, status) {
    if(this.users[userId] == undefined){
        return false;
    }else{
        this.users[userId].status = status;
        console.log("user: " + this.users[userId].name + " status: " + status);
        return true;
    }
}

exports.setEnvironment = function (userId, head, data) {
    this.users[userId].environment[head] = data;

    console.log("user: " + this.users[userId].name + " env_head: " + head);
}

exports.deleteEnvironment = function (userId, head) {
    delete this.users[userId].environment[head];
}


exports.handleRankRequest = function (socket){
    socket.on('rankRequest', function(request){
        var userId = socketService.mapSocketToUserId(socket.id);
        rankInfoDao.getStrengthScoreRank(userId,function(strengthRankList){
            rankInfoDao.getWealthRank(userId,function(wealthRankList){
                socketService.stableSocketEmit(socket, 'feedback', {
                    errorCode: 0,
                    text: '获取排名成功',
                    type: 'STRENGTHRANKRESULT',
                    extension: {
                        "strengthRankList": strengthRankList,
                        "wealthRankList": wealthRankList
                    }
                });
            });
        });
    });
}


exports.handleLOLBind = function(socket){
    socket.on('lolLoginResult',function(loginPacketStr){
        var stdout = JSON.parse(loginPacketStr);
        var loginPacket = {};
        var rankTierInfo = String(stdout.UserInfo.rankedTierInfo);
        var ranks = ['UNRANKED','BRONZE','SILVER','GOLD','PLATINUM','DIAMOND','MASTER','CHALLENGER'];
        loginPacket.currentRank = 'UNRANKED';
        for(var index in ranks){
            if(rankTierInfo.indexOf(ranks[index]) != -1){
                loginPacket.currentRank = ranks[index];
                break;
            }
        }
        loginPacket.head = "user";
        loginPacket.accountId = stdout.UserInfo.userId;
        loginPacket.nickname = stdout.UserInfo.displayName;
        loginPacket.lastRank = stdout.UserInfo.lastSeasonRank;
        loginPacket.serverName = stdout.UserInfo.serverName;




        var userId = socketService.socketUserMap[socket.id];
        var lolAccount = loginPacket.accountId;
        var lolNickname = loginPacket.nickname;
        var lolArea = loginPacket.serverName;
        var lastRank = loginPacket.lastRank;
        var currentRank = loginPacket.currentRank;
        var oriScore = exports.originStrengthScoreCalculation(lastRank, currentRank);

        async.waterfall([
            function(callback){
                lolInfoDao.validateBindInfo(userId, lolAccount, lolArea, function(bindValidityResult){
                    //如果该用户在该大区已绑定了账号  或者该大区的账号已被绑定  则拒绝绑定
                    var feedback = {};
                    if(bindValidityResult.value != 'true'){
                        feedback.text = '绑定失败';
                        feedback.type = 'LOLBINDRESULT';
                        switch(bindValidityResult.errorCode){
                            case 1:{
                                feedback.errorCode = 1;
                                feedback.extension = {};
                                feedback.extension.tips = '该英雄联盟账号已被绑定';
                                break;
                            }
                            case 2:{
                                feedback.errorCode = 2;
                                feedback.extension = {};
                                feedback.extension.tips = '您在该区已经绑定了英雄联盟账号';
                                break;
                            }
                        }
                        callback('error', feedback);
                    }else{
                        callback(null, null);
                    }
                });   
            },
            function(blankData, callback){
                lolInfoDao.insertBindInfo(userId, lolAccount, lolNickname, lolArea, function(bindResult){
                    if(bindResult.errorCode == 0){
                        var feedback = {
                            errorCode: 0,
                            type: 'LOLBINDRESULT',
                            text: '绑定成功',
                            extension: {
                                tips: '绑定成功',
                                userId: userId,
                                lolNickname: lolNickname,
                                lolArea : lolArea,
                                lolAccount: lolAccount
                            }
                        };
                        callback(null, feedback);
                    }else{
                        var feedback = {
                            errorCode: 3,
                            type: 'LOLBINDRESULT',
                            text: '绑定失败',
                            extension: {
                                tips: '服务器异常，请稍后再试' 
                            }
                        }
                        callback(null, feedback);
                    }
                });
            }
        ],function(err,feedback){
            if(feedback.errorCode == 0){
                //更新用户战力表
                var bindInfo = feedback.extension;
                bindInfo.oriStrengthScore = oriScore;
                strengthInfoDao.updateStrengthInfo(bindInfo, function(result){
                    console.log("result" + result);
                });
            }
            socketService.stableSocketEmit(socket, 'feedback', feedback);
        });
    });
}
/**个人中心 */
exports.handlePersonalCenterRequest = function(socket){
    socket.on('pesonalCenterRequest', function(request){
        console.log('result:'+JSON.stringify(request));
        //baseInfoDao.getPersonalCenterInfoByUserId();
        baseInfoDao.getPersonalCenterInfoByUserId(request.userId,function(queryResult){
            console.log("queryResult"+JSON.stringify(queryResult));
            var feedback = {};
            if(queryResult != null && queryResult != undefined){
                feedback.errorCode = 0,
                feedback.type = 'PESONALCENTERRESULT',
                feedback.text = '个人中心加载成功'
                var data = {};
                //填充data
                data.userId = queryResult.userInfo[0].user_id;
                console.log('id..'+queryResult.user_id);
                //data.XXX = queryResult.XXX;
                data.userAccount=queryResult.userInfo[0].user_account;
                data.name=queryResult.userInfo[0].user_nickname;
                data.payAccountId=queryResult.Id.bullup_payment_account_id;
                // data.paymentType=queryResult.paymentHistory.bullup_paymet_type;
                // data.paymentAccount=queryResult.paymentHistory.bullup_account;
                data.lolInfoId=queryResult.info[0].lol_info_id;
                data.UserlolAccount=queryResult.info[0].user_lol_account;
                data.UserlolNickname=queryResult.info[0].user_lol_nickname;
                data.UserlolArea=queryResult.info[0].user_lol_area;
                data.UserlolInfo_wins=queryResult.lolInfo_wins;
                data.UserlolInfo_k=queryResult.lolInfo_strength_k;
                data.UserlolInfo_d=queryResult.lolInfo_strength_d;
                data.UserlolInfo_a=queryResult.lolInfo_strength_a;
                data.UserlolInfo_minion=queryResult.lolInfo_strength_minion;
                data.UserlolInfo_gold=queryResult.lolInfo_strength_gold;
                data.UserlolInfo_tower=queryResult.lolInfo_strength_tower;
                data.UserlolInfo_damage=queryResult.lolInfo_strength_damage;
                data.UserInfo_damage_taken=queryResult.lolInfo_strength_damage_taken;
                data.UserInfo_gold_perminiute=queryResult.lolInfo_strength_gold_perminiute;
                data.UserInfo_heal=queryResult.lolInfo_strength_heal;
                data.UserStrengthRank=queryResult.strengthRank;
                data.UserWealthRank=queryResult.wealthRank;
                data.User_icon_id=queryResult.icon_id;
                data.UserWealth=queryResult.wealth;
                data.UserStrength=queryResult.lolInfo_strength_score;
                data.competition_wins=queryResult.competition_wins;
                feedback.extension = data;
              //  console.log('feedback:'+JSON.stringify(data));
            }else{
                feedback.errorCode = 1,
                feedback.type = 'PESONALCENTERRESULT',
                feedback.text = '个人中心加载失败',
                feedback.extension = null
            }
            socketService.stableSocketEmit(socket, 'feedback', feedback);
            console.log('feedback111:'+JSON.stringify(feedback));
        });
    });
}

exports.handleAddFriendRequest = function(socket){
    socket.on('addFriendRequest', function(request){
        var userInfo = request.userInfo;
        var invitedUserNickname = request.invitedUserNickname;
        var flag = false;
        for(var index in exports.users){
            if(exports.users[index].name == invitedUserNickname){
                //发送请求
                var invitedUserInfo = exports.users[index];
                var tarSocket = socketService.mapUserIdToSocket(invitedUserInfo.userId);
                socketService.stableSocketEmit(tarSocket, 'message', {
                    'userInfo':  userInfo,
                    'invitedUserInfo': invitedUserInfo,
                    'messageType': 'addFriend',
                    'messageText': '添加好友',
                    'messageToken': 'message' + userInfo.name + (new Date()).getTime()
                });
                flag = true;
                break;
            }
        }
        if(!flag){
            socketService.stableSocketEmit(socket, 'feedback', {
                'errorCode': 1,
                'text': '好友添加失败，对方不在线',
                'type': 'ADDFRIENDRESULT',
                'extension': null
            })
        }
    });
}

exports.handleAddFriendResult = function(socket){
    socket.on('addFriendResult', function(result){
        var userInfo = result.extension.userInfo;
        var invitedUserInfo = result.extension.invitedUserInfo;
        var socket1 = socketService.mapUserIdToSocket(userInfo.userId);
        if(result.errorCode == 0){
            var socket2 = socketService.mapUserIdToSocket(invitedUserInfo.userId);
            socketService.stableSocketEmit(socket1, 'feedback', {
                'errorCode': 0,
                'type': "ADDFRIENDRESULT",
                'text': invitedUserInfo.name + "同意了您的好友添加请求",
                'extension': {
                    'newFriend':  invitedUserInfo
                }
            });

            socketService.stableSocketEmit(socket2, 'feedback', {
                'errorCode': 0,
                'type': "ADDFRIENDRESULT",
                'text': "成功将" + userInfo.name + "添加为好友",
                'extension': {
                    'newFriend':  userInfo
                }
            });

            baseInfoDao.addFriendRelationship(userInfo.userId, invitedUserInfo.userId);
            
        }else{
            socketService.stableSocketEmit(socket1, 'feedback', {
                'errorCode': 1,
                'type': "ADDFRIENDRESULT",
                'text': invitedUserInfo.name + "拒绝了您的好友添加请求",
                'extension': null
            });
        }
    });
}


exports.originStrengthScoreCalculation = function(lastSesonRank, currentSeasonRank){
	switch(lastSesonRank){
		case 'UNRANKED': lastSesonRank = 1200; break;
		case 'BRONZE': lastSesonRank = 1050; break;
		case 'SILVER': lastSesonRank = 1300; break;
		case 'GOLD': lastSesonRank = 1550; break;
		case 'PLATINUM': lastSesonRank = 1850; break;
		case 'DIAMOND': lastSesonRank = 2200; break;
		case 'MASTER': lastSesonRank = 2350; break;
		case 'CHALLENGER': lastSesonRank = 2350; break;
		default : lastSesonRank = 1200; break;
	}
	
	switch(currentSeasonRank){
		case 'UNRANKED': currentSeasonRank = 1200; break;
		case 'BRONZE': currentSeasonRank = 1050; break;
		case 'SILVER': currentSeasonRank = 1300; break;
		case 'GOLD': currentSeasonRank = 1550; break;
		case 'PLATINUM': currentSeasonRank = 1850; break;
		case 'DIAMOND': currentSeasonRank = 2200; break;
		case 'MASTER': currentSeasonRank = 2350; break;
		case 'CHALLENGER': currentSeasonRank = 2350; break;
		default : currentSeasonRank = 1200; break;
	}
	return lastSesonRank * 0.6 + currentSeasonRank * 0.4;
}



exports.insertFeedbackMessage=function(socket){
    socket.on('feedbackMessage',function(result){
        console.log('result:'+JSON.stringify(result)); 
        logUtil.listenerLog('feedbackMessage');
        baseInfoDao.insertFeedback(result,function(res){
            if(!res){
                socketService.stableSocketEmit(socket, 'feedback',{
                //console.log('result:'+JSON.stringify(result)); 
                //logUtil.listenerLog('feedbackMessage');
                    errorCode:1,
                    text:'反馈失败,请稍后重试',
                    type:'FEEDBACKMESSAGE',
                    extension:null
                });
            }else{
                socketService.stableSocketEmit(socket, 'feedback',{
                    errorCode:0,
                    text:'反馈成功，请耐心等待处理',
                    type:'FEEDBACKMESSAGE',
                    extension:null
                });
            }
        });
    })
}

exports.insertFeedbackMessage=function(socket){
    socket.on('feedbackMessage',function(result){
        console.log('result:'+JSON.stringify(result)); 
        logUtil.listenerLog('feedbackMessage');
        baseInfoDao.insertFeedback(result,function(res){
            if(!res){
                socketService.stableSocketEmit(socket, 'feedback',{
                //console.log('result:'+JSON.stringify(result)); 
                //logUtil.listenerLog('feedbackMessage');
                    errorCode:1,
                    text:'反馈失败,请稍后重试',
                    type:'FEEDBACKMESSAGE',
                    extension:null
                });
            }else{
                socketService.stableSocketEmit(socket, 'feedback',{
                    errorCode:0,
                    text:'反馈成功，请耐心等待处理',
                    type:'FEEDBACKMESSAGE',
                    extension:null
                });
            }
        });
    });
}

exports.handleDisconnect = function(socket){
    var socketId = socket.id;
    socket.on('disconnect', function (socket) {
        var userId = socketService.mapSocketToUserId(socketId);
        if(userId == undefined){
            //该用户没有登录，什么都不需要做
        }else{
            if(exports.users[userId]==undefined){
                console.log("这里出错了 exports.users[userId] 是 undefond");
                return;
            }
            var userStatus = exports.users[userId].status;
            var userEnvironment = exports.users[userId].environment;
            if(userStatus == "idle"){
                //暂时 什么都不用做
                //删除用户登录信息
                delete exports.users[userId];
                exports.friendStatus(userId,'false','false');
            }else{
                if(userStatus == "inroom"){
                    //在房间里
                    //退出房间  通知房内其他人
                    var environment = exports.users[userId].environment;
                    var roomName = environment.room.roomName;
                    teamService.exitRoom(userId, roomName);
                    //删除用户登录信息
                    delete exports.users[userId];
                    exports.friendStatus(userId,'false','false');
                }else if(userStatus == "inteam"){
                    //在队伍里
                    //退出队伍  通知其他队友
                    var environment = exports.users[userId].environment;
                    var roomName = environment.room.roomName;
                    if(environment.room.gameMode == 'battle'){
                        teamService.exitTeam(userId, roomName);
                        //删除用户登录信息
                    }else{
                        teamService.exitTeamAndMatch(userId, environment.room);
                    }
                    delete exports.users[userId];
                    exports.friendStatus(userId,'false','false');
                }else if(userStatus == "inbattle"){
                    //在对战中
                    //保存环境信息
                    exports.environment[userId] = exports.users[userId].environment;
                    exports.friendStatus(userId,'false','false');
                }
            }
        
        }
        //logUtil.levelMsgLog(0, 'User ' + socket.id + ' disconnected!');
        //socketService.remove(socket);
    });
}

exports.friendStatus = function(userId,online,status){
    var baseData;
    baseInfoDao.findUserById(userId,function(res){
        baseData = res;
    });
    baseInfoDao.findFriendListByUserId(userId,function(res){
        if(!res){
            console.log('查找出错或好友为空!');
        }else{
            //找出目前在线的好友
            for(var key in res){
                if(exports.users[res[key].userId]!=undefined){
                    var socket = socketService.mapUserIdToSocket(res[key].userId);
                    var package = {
                        "type": "UPDATEFRIENDSTATUS",
                        "name": baseData.user_nickname,
                        "userId": userId,
                        "avatarId": baseData.icon_id,
                        "online": online,
                        "status": status
                    }
                    socketService.stableSocketEmit(socket,'feedback',package);
                }
            }
            // console.log(JSON.stringify(arr));
        }
    });
}