var async = require('async');
var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/dao".length).replace(/\\/g, "/"));

var dbUtil = dependencyUtil.global.utils.databaseUtil;
var socketService = dependencyUtil.global.service.socketService;

exports.findUserByAccount = function(account, callback) {
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select * from `user_base` where user_account=?', [account], function (err, results){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(results[0]);
        });
    });
}


//新手指引
exports.checkLastLoginTime = function(userId,callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select last_login_time from user_info where user_id=?',[userId],function(err,res){
            if (err) throw err;
            //console.log(res);
            var time = res[0].last_login_time;
            dbUtil.closeConnection(connection);
            callback(time);
        });
    });
}

exports.insertLastLoginTime = function(data,callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'update user_info set last_login_time=? where user_id=?',[data.date,data.userId],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}


/**
 * 通过用户id获取用户的朋友列表
 */
exports.findFriendListByUserId = function(userId, callback) {
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select friend_user_id from bullup_friend where user_id=?', [userId], function(err, rows) {
            var friendList = {};
            var status;
            async.eachSeries(rows, function(row, errCb){
                exports.findUserById(row.friend_user_id, function(user) {
                    friendList[user.user_nickname] = {
                        name: user.user_nickname,
                        userId: user.user_id,
                        avatarId: user.icon_id,
                        online: 'false',
                        status: "idle"
                    };
                    errCb();
                })
            }, function(err) {
                if (err) console.log(err);
                dbUtil.closeConnection(connection);
                callback(friendList);
                
            });
        });
    });
}

//用户修改信息
exports.updateNickname= function(data,callback){
    dbUtil.createConnection(function(connection){
        async.parallel([
            function(done){
                dbUtil.query(connection, 'update user_base set user_nickname=? where user_id=?',[data.nickname,data.userId],function(err,res){
                    if (err) throw err;
                    done(null,res);
                });
            },function(done){
                dbUtil.query(connection, 'update bullup_rank set user_nickname=? where user_id=?',[data.nickname,data.userId],function(err,res){
                    if (err) throw err;
                    done(null,res);
                });
            }
        ],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}
exports.updatePhone = function(data,callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'update user_info set user_phone=? where user_id=?',[data.phone,data.userId],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}
exports.updatePassword = function(data,callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'update user_base set user_password=? where user_id=?',[data.password,data.userId],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}
//---------------------------------------添加好友关系-------------------------------------//
exports.addFriendRelationship = function(userId1, userId2){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'insert into `bullup_friend` values (?, ?)', [userId1, userId2], function (err, results){
            if (err) throw err;
            dbUtil.query(connection, 'insert into `bullup_friend` values (?, ?)', [userId2, userId1], function (err, results){
                if (err) throw err;
                dbUtil.closeConnection(connection);
            });
        });
    });
}

exports.findUserByNickname = function(nickname, callback) {
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select * from `user_base` where binary user_nickname = ?', [nickname], function (err, results){
            if (err) throw err;
            //console.log(results[0]);
            dbUtil.closeConnection(connection);
            callback(results[0]);
        });
    });
}

exports.findPhoneNumber = function(phone, callback) {
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select * from `user_info` where user_phone=?', [phone], function (err, results){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(results[0]);
        });
    });
}

exports.findUserByCode  = function(code, callback) {
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select count(*) as num from `user_info` where user_mail=?', [code], function (err, results){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(results[0]);
        });
    });
}

exports.updateUserIconIdByUserId = function(userId, iconId){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'update bullup_profile set icon_id = ? where user_id = ?', [iconId, userId], function(err, res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
        });
    });
}


//------------------------------邀请码信息------------------------------
exports.getInvitedInfo = function(callback){
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'select a.user_id,a.user_account,a.user_nickname,b.user_mail from user_base as a inner join user_info as b on a.user_id=b.user_id where user_mail<>"" order by user_mail;', [], function(err,res){
                    if (err) throw err;
                    callback(null,res);
                });
            },
            function(res,callback){
                var codeInfo = {};
                async.eachSeries(res, function(baseInfo, errCb){
                    //console.log(baseInfo.user_nickname);
                    dbUtil.query(connection, 'select sum(bullup_battle_bet)-sum(bullup_battle_bet)*2*0.1 as userGet,sum(bullup_battle_bet)*2*0.1 as companyGet from bullup_battle_record where bullup_battle_participants_red like ? and bullup_battle_result="红方赢" or bullup_battle_participants_blue like ? and bullup_battle_result="蓝方赢"',['%'+baseInfo.user_nickname+'%','%'+baseInfo.user_nickname+'%'],function(err, row) {
                        if (err) throw err;
                        (codeInfo[baseInfo.user_id]) = {};
                        (codeInfo[baseInfo.user_id]).user_id = baseInfo.user_id;
                        (codeInfo[baseInfo.user_id]).user_account = baseInfo.user_account;
                        (codeInfo[baseInfo.user_id]).user_nickname = baseInfo.user_nickname;
                        (codeInfo[baseInfo.user_id]).inviteCode = baseInfo.user_mail;
                        (codeInfo[baseInfo.user_id]).userGet = row[0].userGet;
                        (codeInfo[baseInfo.user_id]).companyGet = row[0].companyGet;
                        //console.log("resResult"+JSON.stringify(row));
                        errCb();
                    });
                },function(errCb){
                    callback(null, codeInfo);
                });
            }
        ],function(err,res){
            if (err) throw err;
            var codeArray = new Array();
            for(obj in res){
                codeArray.push(res[obj]);
            }
            codeArray.sort(function(x,y){
                return x.inviteCode < y.inviteCode ? 1 : -1;
            });
            dbUtil.closeConnection(connection);
            callback(codeArray);
        });
    });
}

//------------------------------公司收入------------------------------
exports.getCompanyIncome = function(callback){
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'select a.user_id,a.user_account,a.user_nickname,b.user_mail from user_base as a inner join user_info as b on a.user_id=b.user_id;', [], function(err,res){
                    if (err) throw err;
                    callback(null,res);
                });
            },
            function(res,callback){
                var codeInfo = {};
                async.eachSeries(res, function(baseInfo, errCb){
                    //console.log(baseInfo.user_nickname);
                    dbUtil.query(connection, 'select sum(bullup_battle_bet)-sum(bullup_battle_bet)*2*0.1 as userGet,sum(bullup_battle_bet)*2*0.1 as companyGet from bullup_battle_record where bullup_battle_participants_red like ? and bullup_battle_result="红方赢" or bullup_battle_participants_blue like ? and bullup_battle_result="蓝方赢"',['%'+baseInfo.user_nickname+'%','%'+baseInfo.user_nickname+'%'],function(err, row) {
                        if (err) throw err;
                        (codeInfo[baseInfo.user_id]) = {};
                        (codeInfo[baseInfo.user_id]).user_id = baseInfo.user_id;
                        (codeInfo[baseInfo.user_id]).user_account = baseInfo.user_account;
                        (codeInfo[baseInfo.user_id]).user_nickname = baseInfo.user_nickname;
                        (codeInfo[baseInfo.user_id]).inviteCode = baseInfo.user_mail;
                        (codeInfo[baseInfo.user_id]).userGet = row[0].userGet;
                        (codeInfo[baseInfo.user_id]).companyGet = row[0].companyGet;
                        //console.log("resResult"+JSON.stringify(row));
                        errCb();
                    });
                },function(errCb){
                    callback(null, codeInfo);
                });
            }
        ],function(err,res){
            if (err) throw err;
            var codeArray = new Array();
            for(obj in res){
                codeArray.push(res[obj]);
            }
            codeArray.sort(function(x,y){
                return x.inviteCode < y.inviteCode ? 1 : -1;
            });
            dbUtil.closeConnection(connection);
            //console.log('this is my:',codeArray);
            var companyIncome = 0;
            var usersIncome = 0;
            for(var key in codeArray){
                if(codeArray[key].userGet != null){
                    usersIncome += codeArray[key].userGet;
                    companyIncome += codeArray[key].companyGet;
                }
            }
            var pack = [companyIncome,usersIncome];
            //console.log('this is my:',companyIncome,usersIncome);
            callback(pack);
        });
    });
}

exports.findUserById = function(userId, callback) {
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'select * from `user_base` where user_id=?', [userId], function (err, results, fields) {
                    if (err) throw err;
                    callback(null, results[0]);
                });
            },
            function(userBaseInfo, callback){
                dbUtil.query(connection, 'select icon_id from `bullup_profile` where user_id=?', [userId], function (err, results, fields) {
                    if (err) throw err;
                    userBaseInfo.icon_id = results[0].icon_id;
                    callback(null, userBaseInfo);
                });
            }
        ],function(err,res){
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}

exports.addUser = function(userInfo, callback) {
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'insert into `user_base` (user_account, user_password, user_nickname, user_role) values (?, ?, ?, 0)', [userInfo.userAccount, userInfo.userPassword, userInfo.userNickname], function (err, rows) {
                    if (err) {
                        throw err;
                        //connection.rollback();
                    }
                    if(rows.affectedRows > 0){
                        callback(null, userInfo);
                    }
            });
            },
            function(userInfo, callback){
                dbUtil.query(connection, 'select user_id from `user_base` where user_account = ? and user_nickname = ?', [userInfo.userAccount, userInfo.userNickname], function(err, row){
                    if(err) console.log(err);
                    userInfo.userId = row[0].user_id;
                    callback(null, userInfo);
                });
            },
            function(userInfo, callback){
                dbUtil.query(connection, 'insert into `user_info` (user_id, user_phone, user_mail,user_country,user_province,user_city) values (?, ?, ?, ?, ?, ?)', [userInfo.userId, userInfo.userPhoneNumber,userInfo.userEmail,userInfo.userCountry,userInfo.userProvince,userInfo.userCity], function(err, row){
                    
                    if(err) console.log(err);
                    callback(null, userInfo);
                });
            },
            function(userInfo, callback){
                dbUtil.query(connection, 'insert into `bullup_profile` (user_id, icon_id) values (?, ?)', [userInfo.userId, 1], function(err, row){
                    callback(null, userInfo);
                });
            },
            function(userInfo, callback){
                dbUtil.query(connection, 'insert into `bullup_wealth` (user_id, bullup_currency_type, bullup_currency_amount) values (?, ?, ?)', [userInfo.userId, 'score', '0'], function(err, row){
                    userInfo.wealth = 10;
                    callback(null, userInfo);
                });
            },
            function(userInfo, callback){
                dbUtil.query(connection, "insert into bullup_strength values (?, 0, 0, 0, 0, 0, 0, 0, 0, 'unknown', 0, 0, 0, 0)", [userInfo.userId], function(err, res){
                    userInfo.strengthScore = 0;
                    callback(null, userInfo);
                });
            },
            function(userInfo, callback){
                dbUtil.query(connection, "select count(user_id) from bullup_rank", [], function(err, res){
                    dbUtil.query(connection, "insert into bullup_rank values (?, 0, ?, 0, ?, 0, ?, 1, ?)", [userInfo.userId, Number(res[0]['count(user_id)']) + 1, Number(res[0]['count(user_id)']) + 1, Number(res[0]['count(user_id)']) + 1, userInfo.userNickname], function(err, res){
                        callback(null, userInfo);
                    });
                });
                
            }
        ],    
        function(err, result){
            if(err) console.log(err);
            dbUtil.closeConnection(connection);
            callback(result);
        });
    });
}

exports.findUserIconById = function(userId, callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select icon_id from `bullup_profile` where user_id=?', [userId], function (err, results, fields) {
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(results[0]);
        });
    });
}


/**个人中心数据处理 */
exports.getPersonalCenterInfoByUserId=function(userId, callback){
    console.log("id="+userId);
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                //个人信息
                var userPersonalInfo={};
                dbUtil.query(connection, 'select * from `user_base` where user_id=?', [userId], function (err, results, fields) {
                    if (err) throw err;
                    userPersonalInfo.userInfo=results;
                    userPersonalInfo.nickname=results[0].user_nickname;
                    callback(null, userPersonalInfo);
                });
                //消费记录
            },function(userPersonalInfo,callback){
                dbUtil.query(connection, 'select * from bullup_payment_history where user_id=?',[userId],function(err, results, fields){
                    //console.log("userId"+userPersonalInfo.userId);
                    if(err) throw err;
                    //payment_history.userId=results[0].user_id;
                    userPersonalInfo.paymentHistory = results;
                    //console.log(JSON.stringify(userPersonalInfo.paymentHistory));
                    callback(null,userPersonalInfo);
                });
                //个人能力数据
            },function(userPersonalInfo,callback){
                dbUtil.query(connection, 'select bullup_strength_wins,bullup_strength_k,bullup_strength_d,bullup_strength_a,bullup_strength_minion,bullup_strength_gold,bullup_strength_tower,bullup_strength_gold_perminiute,bullup_strength_damage,bullup_strength_damage_taken,bullup_strength_heal,bullup_strength_score from bullup_strength where user_id=?',[userId],function(err,results, fields){
                    if(err) throw err;
                    userPersonalInfo.lolInfo_wins=results[0].bullup_strength_wins;
                    userPersonalInfo.lolInfo_strength_k=results[0].bullup_strength_k;
                    userPersonalInfo.lolInfo_strength_d=results[0].bullup_strength_d;
                    userPersonalInfo.lolInfo_strength_a=results[0].bullup_strength_a;
                    userPersonalInfo.lolInfo_strength_minion=results[0].bullup_strength_minion;
                    userPersonalInfo.lolInfo_strength_gold=results[0].bullup_strength_gold;
                    userPersonalInfo.lolInfo_strength_tower=results[0].bullup_strength_tower;
                    userPersonalInfo.lolInfo_strength_damage=results[0].bullup_strength_damage;
                    userPersonalInfo.lolInfo_strength_damage_taken=results[0].bullup_strength_damage_taken;
                    userPersonalInfo.lolInfo_strength_score=results[0].bullup_strength_score;
                    userPersonalInfo.lolInfo_strength_gold_perminiute=results[0].bullup_strength_gold_perminiute;
                    userPersonalInfo.lolInfo_strength_heal=results[0].bullup_strength_heal;
                    callback(null,userPersonalInfo); 
                });
            }, function(userPersonalInfo,callback){
                dbUtil.query(connection, 'select count(*) as num  from bullup_battle_record where bullup_battle_participants_red like ? or bullup_battle_participants_blue like ?',["%"+userPersonalInfo.nickname+"%","%"+userPersonalInfo.nickname+"%"],function(err, results, fields){
                    if(err) throw err;
                    userPersonalInfo.bullup_competitionResult=results[0].num;
                    userPersonalInfo.bullup_competition_wins=userPersonalInfo.lolInfo_wins;
                    userPersonalInfo.competition_wins=((userPersonalInfo.bullup_competition_wins)/(userPersonalInfo.bullup_competitionResult))*100;
                    if(userPersonalInfo.competition_wins != 'NaN'){
                        userPersonalInfo.competition_wins = Number(userPersonalInfo.competition_wins).toFixed(2)+'%';
                    }else{
                        userPersonalInfo.competition_wins = '0.00%';
                    }
                    callback(null,userPersonalInfo);
                });
            }, function(userPersonalInfo,callback){
                var lolInfoId={};
                dbUtil.query(connection, 'select lol_info_id from lol_bind where user_id=?',[userId],function(err, results, fields){
                    if(err) throw err;
                    //console.log('id:'+userId);
                    userPersonalInfo.Id=results[0].lol_info_id;
                    //console.log('pid'+userPersonalInfo.Id);
                    callback(null,userPersonalInfo);
                });
            },function(userPersonalInfo,callback){       
                // var lolInfo={};
                dbUtil.query(connection, 'select * from lol_info where lol_info_id=?',[userPersonalInfo.Id],function(err, results, fields){
                    if(err) throw err;
                    userPersonalInfo.info=results;
                    console.log(JSON.stringify("lolInfo:"+userPersonalInfo));
                    callback(null,userPersonalInfo); 
                });
            },function(userPersonalInfo,callback){
                dbUtil.query(connection, 'select bullup_currency_amount from bullup_wealth where user_id=?',[userId],function(err,results,fields){
                    if(err) throw err;
                    userPersonalInfo.wealth=results[0].bullup_currency_amount;
                    callback(null,userPersonalInfo);
                });
            },function(userPersonalInfo,callback){
                dbUtil.query(connection, 'select bullup_strength_rank,bullup_wealth_rank,user_icon_id from bullup_rank where user_id = ?',[userId],function(err,results,fields){
                    if (err) throw err;
                    userPersonalInfo.strengthRank=results[0].bullup_strength_rank;
                    userPersonalInfo.wealthRank=results[0].bullup_wealth_rank;
                    callback(null,userPersonalInfo);
                });
            },function(userPersonalInfo,callback){
                dbUtil.query(connection, 'select icon_id from bullup_profile  where user_id=?',[userId],function(err,results,fields){
                    if (err) throw err;
                    userPersonalInfo.icon_id=results[0].icon_id;
                    callback(null,userPersonalInfo);
                });
            },function(userPersonalInfo,callback){
                dbUtil.query(connection, 'SELECT YEAR(bullup_battle_time) AS year , MONTH(bullup_battle_time) AS month ,DAY(bullup_battle_time) AS day, COUNT(*) AS count FROM `bullup_battle_record` WHERE bullup_battle_participants_red like ? or bullup_battle_participants_blue like ? GROUP BY YEAR (bullup_battle_time) DESC, MONTH(bullup_battle_time) DESC ,DAY(bullup_battle_time) DESC limit 10;',['%'+userPersonalInfo.nickname+'%','%'+userPersonalInfo.nickname+'%'],function(err,results,fields){
                    if (err) throw err;
                    console.log(results);
                    var arr = new Array(10);
                    for(var i = 0;i<arr.length;i++){
                        if(results[i]){
                            arr[i] = {
                                year: results[i].year,
                                month: results[i].month,
                                day: results[i].day,
                                count: results[i].count
                            };
                        }else{
                            arr[i] = {
                                year: '无记录',
                                month: '',
                                day: '',
                                count: ''
                            };
                        }
                    }
                    console.log(arr);
                    userPersonalInfo.raveLineData = arr;
                    callback(null,userPersonalInfo);
                });
            }
        ],function(err,res){
            dbUtil.closeConnection(connection);
            callback(res);
            console.log(res);
        });   
    });
}


exports.insertFeedback=function(result,callback){
   // console.log(userId);
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'insert into bullup_feedback (user_id,user_account,user_feedback_content,user_feedback_name,user_feedback_email) values (?,?,?,?,?)',[result.userId,result.account,result.textarea1,result.name,result.email],function(err,results){
                if (err) throw err;
                callback(null,results);      
                });
            }       
        ],function(err,res){
            dbUtil.closeConnection(connection);
            callback(res)
        });
    });
}
//反馈信息
exports.insertFeedback=function(result,callback){
    dbUtil.createConnection(function(connection){
        // console.log(userId);
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'insert into bullup_feedback (user_id,user_account,user_feedback_content,user_feedback_name,user_feedback_email) values (?,?,?,?,?)',[result.userId,result.account,result.textarea1,result.name,result.email],function(err,results){
                if (err) throw err;
                callback(null,results);      
                });
            }       
        ],function(err,res){
            dbUtil.closeConnection(connection);
            callback(res)
        });
    });
 }

 exports.findUserByPhone = function(userPhoneNumber, callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select * from `user_info` where user_phone=?', [userPhoneNumber], function (err, results, fields) {
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(results[0]);
        });
    });
}
//删除好友
exports.deletefriendsByUserIdAndFriendsId=function(ID,callback){
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                var msg={};
                dbUtil.query(connection,'delete from bullup_friend where user_id=? and friend_user_id=?',[ID.userId,ID.friend_userId],function(err,results,fields){
                    if (err) throw err;
                    msg.userid=ID.userId;
                    msg.fid=ID.friend_userId;
                    callback(null,msg);
                });
             },
            function(msg,callback){
                dbUtil.query(connection,'delete from bullup_friend where user_id=? and friend_user_id=?',[msg.fid,msg.userid],function(err,results,fields){
                    if (err) throw err;
                    callback(null,results);
                });
            }
        ],function(err,res){
            dbUtil.closeConnection(connection);
            callback(res)
        })
    
    });
}

//查询封号
exports.findUserSuspensionState = function(userId, callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select user_suspension_state from `bullup_suspension_state` where user_id=?', [userId], function (err, results) {
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(results[0]);
        });
    });
}