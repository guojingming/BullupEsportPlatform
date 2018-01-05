var async = require('async');
var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/dao".length).replace(/\\/g, "/"));

var dbUtil = dependencyUtil.global.utils.databaseUtil;


//-----------------------账户管理部分---------------------------------
exports.findAllAccount = function(callback){
    var userInfo = {};
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'select user_id from user_base', [], function(err,result){
                    if (err) throw err;
                    userInfo = result;
                    callback(null,userInfo);
                });
            },function(userInfo,callback){
                dbUtil.query(connection, 'select user_account from user_base', [], function(err,result2){
                    if (err) throw err;
                    for(var i = 0;i<result2.length;i++){
                        userInfo[i].account = result2[i].user_account;
                    }
                    callback(null,userInfo);
                });
            },function(userInfo,callback){
                dbUtil.query(connection, 'select * from lol_bind', [], function(err,result3){
                    if (err) throw err;
                    var arr = [];
                    for(var i=0;i<userInfo.length;i++){
                        for(var j=0;j<result3.length;j++){
                            arr[i] = function(num){
                                return i;
                            }(i)
                            if(userInfo[arr[i]].user_id==result3[j].user_id){
                                userInfo[arr[i]].lol_info_id = result3[j].lol_info_id;
                            }
                        }
                    }
                    callback(null,userInfo);
                });  
            },function(userInfo,callback){
                dbUtil.query(connection, 'select lol_info_id,user_lol_account from lol_info', [], function(err,result4){
                    if (err) throw err;
                    for(var i=0;i<userInfo.length;i++){
                        if(!userInfo[i].lol_info_id){
                            userInfo[i].user_lol_account = '未绑定';
                        }
                        for(var j=0;j<result4.length;j++){
                            if(userInfo[i].lol_info_id==result4[j].lol_info_id){
                                userInfo[i].user_lol_account = result4[j].user_lol_account;
                            }
                        }
                    }
                    callback(null,userInfo);
                });   
            },function(userInfo,callback){
                dbUtil.query(connection, 'select * from bullup_suspension_state', [], function(err,result5){
                    if (err) throw err;
                    var arr = [];
                    for(var i=0;i<userInfo.length;i++){
                        for(var j=0;j<result5.length;j++){
                            arr[i] = function(num){
                                return i;
                            }(i)
                            if(userInfo[arr[i]].user_id==result5[j].user_id){
                                userInfo[arr[i]].user_suspension_state = result5[j].user_suspension_state;
                            }
                        }
                    }
                    callback(null,userInfo);   
                });  
            }
        ],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}

//----------------封号-------------------------------
exports.suspendAccount = function(data,callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'insert into bullup_suspension_state (user_id)values(?)',[data.userId],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection();
            callback(res);
        });
    });
}
//----------------解封-------------------------------
exports.unblockAccount = function(data,callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'delete from bullup_suspension_state where user_id=?',[data.userId],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}

//-----------------------------申述反馈管理部分--------------------------
//查找全部申诉反馈信息
exports.findAllFeedback = function(callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select * from bullup_feedback', [], function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}
//将反馈状态改为'已处理'
exports.handleFeedback = function(data,callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'update bullup_feedback set user_feedback_state="已处理",user_feedback_handle_time=? where user_feedback_id=?',[data.handleTime,data.feedbackId],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}



//----------------------------充值管理部分---------------------------------
/**
 * 查询全部充值记录
 * @param userId 
 */
exports.findAllRechargeInfo = function(callback){
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                //var tempInfo = {};
                dbUtil.query(connection, 'select * from bullup_payment_history', [], function(err,result){
                    if (err) throw err;
                    //tempInfo.rechargeInfo = result;
                    callback(null,result);
                });
            },
            // function(tempInfo,callback){
            //     //var tempInfo = {};
            //     dbUtil.createConnection(function(connection){
            //     dbUtil.query(connection, connection, 'select user_id,bullup_withdraw_id,bullup_bank_money,bullup_bank_cardnumber,bullup_payment_account_id,bullup_bank_wdtime,bullup_bank_state from bullup_bankcard_info where user_id=?',[data.userId],function(err,result){
            //         if (err) throw err;
            //         tempInfo.withdrawInfo = result;
            //
            //         callback(null,tempInfo);
            //     });
            // },
        ],function(err,res){
            if(err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}

//---------------------简单统计----------------------------------------
exports.findAnalysisData = function(callback){
    var tempArr = [];
    var analysisData = {};
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){//总共多少只队伍
                dbUtil.query(connection, 'select distinct bullup_battle_participants_red from bullup_battle_record;', [], function(err,res1){
                    dbUtil.query(connection, 'select distinct bullup_battle_participants_blue from bullup_battle_record;', [], function(err,res2){
                        if (err) throw err;
                        for(var i=0;i<res1.length;i++){
                            tempArr.push(res1[i].bullup_battle_participants_red);
                        }
                        for(var k=0;k<res2.length;k++){
                            tempArr.push(res2[k].bullup_battle_participants_blue);
                        }
                        function unique(arr){
                            var newArr = [];
                            for(var i in arr) {
                                if(newArr.indexOf(arr[i]) == -1) {
                                    newArr.push(arr[i])
                                }
                            }
                            return newArr;
                        }
                        tempArr2 = unique(tempArr);
                        analysisData.countAllTeam = tempArr2.length;
                        callback(null,analysisData);
                    });
                });
            },function(analysisData,callback){//每支队伍赢了几场，胜场数
                dbUtil.query(connection, 'select bullup_battle_participants_red,count(*) as winSum from bullup_battle_record where bullup_battle_result="红方赢" group by bullup_battle_participants_red;', [], function(err,res3){
                    dbUtil.query(connection, 'select bullup_battle_participants_blue,count(*) as winSum from bullup_battle_record where bullup_battle_result="蓝方赢" group by bullup_battle_participants_blue;', [], function(err,res4){
                        if (err) throw err;
                        var a = [];
                        for(var i in res3){
                            a.push({'team':res3[i].bullup_battle_participants_red,'winSum':res3[i].winSum});
                        }
                        var b = [];
                        for(var k in res4){
                            b.push({'team':res4[k].bullup_battle_participants_blue,'winSum':res4[k].winSum});
                        }
                        a = a.concat(b);
                        var audit = {};
                        for(var i =0;i<a.length;i++){
                            if(audit[a[i].team] !== undefined){
                                audit[a[i].team].winSum = parseFloat(audit[a[i].team].winSum) + parseFloat(a[i].winSum);
                            }else{
                                audit[a[i].team] = a[i];
                            }
                        }
                        //console.log(audit);
                        var result = [];
                        for(var prop in audit){
                            result.push(audit[prop]);
                        }
                        //console.log(result);
                        analysisData.eachTeamWinSum = result;
                        callback(null,analysisData);
                    });
                });
            },function(analysisData,callback){//每支队伍的参赛次数，总场数
                dbUtil.query(connection, 'select bullup_battle_participants_blue,count(*) as battleSum from bullup_battle_record group by bullup_battle_participants_blue;',function(err,res5){
                    dbUtil.query(connection, 'select bullup_battle_participants_red,count(*) as battleSum from bullup_battle_record group by bullup_battle_participants_red;',function(err,res6){
                        if (err) throw err;
                        var a = [];
                        for(var i in res5){
                            a.push({'team':res5[i].bullup_battle_participants_blue,'battleSum':res5[i].battleSum});
                        }
                        var b = [];
                        for(var k in res6){
                            b.push({'team':res6[k].bullup_battle_participants_red,'battleSum':res6[k].battleSum});
                        }

                        a = a.concat(b);
                        var audit = {};
                        for(var i =0;i<a.length;i++){
                            if(audit[a[i].team] !== undefined){
                                audit[a[i].team].battleSum = parseFloat(audit[a[i].team].battleSum) + parseFloat(a[i].battleSum);
                            }else{
                                audit[a[i].team] = a[i];
                            }
                        }
                        //console.log(audit);
                        var result = [];
                        for(var prop in audit){
                            result.push(audit[prop]);
                        }
                        //console.log(result);
                        //console.log("resResult"+JSON.stringify(a));
                        analysisData.eachTeamBattleSum = result;
                        callback(null,analysisData);
                    });
                });
            },function(analysisData,callback){//全平台对战次数
                dbUtil.query(connection, 'select count(*) as x from bullup_battle_record', [], function(err,res7){
                    if (err) throw err;
                    analysisData.countAllBattle = res7[0].x;
                    callback(null,analysisData);
                });
            }
        ],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}