var async = require('async');
var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/dao".length).replace(/\\/g, "/"));

var dbUtil = dependencyUtil.global.utils.databaseUtil;


//--------------查询全部约战记录-----------------------------
exports.findAllBattleRecord = function(callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select * from bullup_battle_record', [], function (err, results){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(results);
        });
    });
}

//---------------修改约战记录相关的数据----------------------
exports.aboutBattleRecord = function(data,callback){
    var blueUserArr = (data.blueSide).split(',');
    var redUserArr = (data.redSide).split(',');
    var tempInfo = new Array();
    tempInfo[0] = new Array();//蓝方队员userId
    tempInfo[1] = new Array();//红方队员userId
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'update bullup_battle_record set bullup_battle_result=? where bullup_battle_id=?',[data.result,data.battleId],function(err,res){
                    if (err) throw err;
                    callback(null,tempInfo);
                });
            },
            function(tempInfo,callback){//---------------获取user_id
                dbUtil.query(connection, 'select user_id,user_nickname from user_base', [], function(err,res2){
                    if (err) throw err;
                    for(var i=0;i<res2.length;i++){
                        for(var j=0;j<blueUserArr.length;j++){
                            if(blueUserArr[j]==res2[i].user_nickname){
                                tempInfo[0].push(res2[i].user_id); 
                            }
                        }
                        for(var k=0;k<redUserArr.length;k++){
                            if(redUserArr[k]==res2[i].user_nickname){
                                tempInfo[1].push(res2[i].user_id);
                            }
                        }
                    }
                    callback(null,tempInfo);
                });
            },function(tempInfo,callback){//--------------更改财富表的金额
                if(data.result=='蓝方赢'){
                    for(var x=0;x<tempInfo[0].length;x++){
                        dbUtil.query(connection, 'update bullup_wealth set bullup_currency_amount=bullup_currency_amount+? where user_id=?',[(data.bet)*2*0.9,tempInfo[0][x]],function(err,res3){
                            if (err) throw err;
                        });
                    }
                    for(var y=0;y<tempInfo[1].length;y++){
                        dbUtil.query(connection, 'update bullup_wealth set bullup_currency_amount=bullup_currency_amount-? where user_id=?',[(data.bet)*2*0.9,tempInfo[1][y]],function(err,res4){
                            if (err) throw err;
                        });
                    }
                }else{
                    for(var x=0;x<tempInfo[1].length;x++){
                        dbUtil.query(connection, 'update bullup_wealth set bullup_currency_amount=bullup_currency_amount+? where user_id=?',[(data.bet)*2*0.9,tempInfo[1][x]],function(err,res3){
                            if (err) throw err;
                        });
                    }
                    for(var y=0;y<tempInfo[0].length;y++){
                        dbUtil.query(connection, 'update bullup_wealth set bullup_currency_amount=bullup_currency_amount-? where user_id=?',[(data.bet)*2*0.9,tempInfo[0][y]],function(err,res4){
                            if (err) throw err;
                        });
                    }
                }
                callback(null,tempInfo);
            },function(tempInfo,callback){//--------------更改战力表的胜场数
                if(data.result=='蓝方赢'){
                    for(var x=0;x<tempInfo[0].length;x++){
                        dbUtil.query(connection, 'update bullup_strength set bullup_strength_wins=bullup_strength_wins+1 where user_id=?',[tempInfo[0][x]],function(err,res5){
                            if (err) throw err;
                        });
                    }
                    for(var y=0;y<tempInfo[1].length;y++){
                        dbUtil.query(connection, 'update bullup_strength set bullup_strength_wins=bullup_strength_wins-1 where user_id=?',[tempInfo[1][y]],function(err,res6){
                            if (err) throw err;
                        });
                    }
                }else{
                    for(var x=0;x<tempInfo[1].length;x++){
                        dbUtil.query(connection, 'update bullup_strength set bullup_strength_wins=bullup_strength_wins+1 where user_id=?',[tempInfo[1][x]],function(err,res7){
                            if (err) throw err;
                        });
                    }
                    for(var y=0;y<tempInfo[0].length;y++){
                        dbUtil.query(connection, 'update bullup_strength set bullup_strength_wins=bullup_strength_wins-1 where user_id=?',[tempInfo[0][y]],function(err,res8){
                            if (err) throw err;
                        });
                    }
                }
                callback(null,tempInfo);
            }
        ],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}


//用户约战次数
exports.findUserBattleCount = function(userId,callback){
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'select user_nickname from user_base where user_id=?',[userId],function(err,res1){
                    if (err) throw err;
                    //console.log(res1);
                    callback(null,res1);
                });
            },function(res1,callback){
                dbUtil.query(connection, 'select count(*) as battleCount from bullup_battle_record where bullup_battle_participants_red like ? or bullup_battle_participants_blue like ?',['%'+res1[0].user_nickname+'%','%'+res1[0].user_nickname+'%'],function(err,res2){
                    if (err) throw err;
                    //console.log(res2);
                    callback(null,res2);
                });
            }
        ],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}




exports.writeBattleRecord = function(battle){
    
    var competitionType = battle.blueSide.gameMode;
    var competitionId = 0;
    var battleName = battle.battleName;
    var battleMap = battle.blueSide.mapSelection;
    var battleBet = battle.blueSide.rewardAmount;    
    var teamNum = battle.blueSide.participants.length;
    var redNames = "";
    var blueNames = "";
    var time = new Date().format("yyyy-MM-dd hh:mm:ss"); 
    var duration = 0;
    var result = "";
    if(battle.blueWin){
        result = "蓝方赢";
    }else{
        result = "红方赢";
    }
    for(var index in battle.blueSide.participants){
        blueNames += ",";
        blueNames += battle.blueSide.participants[index].name;
    }
    blueNames = blueNames.substr(1);

    for(var index in battle.redSide.participants){
        redNames += ",";
        redNames += battle.redSide.participants[index].name;
    }
    redNames = redNames.substr(1);
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'insert into bullup_battle_record (bullup_battle_compitetion_type, bullup_compitetion_id, bullup_battle_name, bullup_battle_map_type, bullup_battle_bet, bullup_battle_teamnumber, bullup_battle_participants_red, bullup_battle_participants_blue, bullup_battle_time, bullup_battle_duration, bullup_battle_result) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [competitionType, competitionId, battleName, battleMap, battleBet, teamNum, redNames, blueNames, time, duration, result],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
        });
    });
}

exports.updateStrengthAndWealth = function(userId, newStrengthScore, wealthChangedValue,resCode){
    if(newStrengthScore < 0){
        newStrengthScore = 0;
    }
    dbUtil.createConnection(function(connection1){
        dbUtil.query(connection1, 'select bullup_currency_amount from bullup_wealth where user_id = ?', [userId], (err, res) => {
            if(err)throw err;
            dbUtil.query(connection1, 'update bullup_wealth set bullup_currency_amount = ? where user_id = ?', [parseFloat(res[0].bullup_currency_amount) + parseFloat(wealthChangedValue), userId], (err, res)=>{
                if(err)throw err;
                dbUtil.closeConnection(connection1);
            });
        });
    });
    dbUtil.createConnection(function(connection2){
        dbUtil.query(connection2, 'update bullup_strength set bullup_strength_score = ?,bullup_strength_wins=bullup_strength_wins+? where user_id = ?', [newStrengthScore, resCode ,userId], (err, res) => {
            if(err)throw err;
            dbUtil.closeConnection(connection2);
        });
    });
}