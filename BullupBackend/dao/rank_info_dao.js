var async = require('async');
var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/dao".length).replace(/\\/g, "/"));

var dbUtil = dependencyUtil.global.utils.databaseUtil;


exports.getStrengthScoreRank = function(userId, callback) {
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'select * from bullup_rank where user_id = ?', [userId], function(err, row) {
                    if (err){ 
                        throw err;
                    }
                    var data = {};
                    data.userRankInfo = row[0];
                    callback(null, data);
                });
            },
            function(data, callback){
                dbUtil.query(connection, 'select user_id, user_nickname, bullup_strength_score, bullup_strength_rank, user_icon_id from bullup_rank order by bullup_strength_score desc limit 100', [], function(err, row) {
                    if (err){ 
                        throw err;
                    }
                    data.rankList = row;
                    callback(null, data);
                });
            }
        ],function(err, res){
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}

exports.getWealthRank = function(userId, callback) {
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'select * from bullup_rank where user_id = ?', [userId], function(err, row) {
                    if (err){ 
                        throw err;
                    }
                    var data = {};
                    data.userRankInfo = row[0];
                    callback(null, data);
                });
            },
            function(data, callback){
                dbUtil.query(connection, 'select user_id, user_nickname, bullup_wealth_sum, bullup_wealth_rank, user_icon_id from bullup_rank order by bullup_wealth_sum desc limit 100', [], function(err, row) {
                    if (err){ 
                        throw err;
                    }
                    data.rankList = row;
                    callback(null, data);
                });
            }
        ],function(err, res){
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}

//高危待测试
exports.updateRankList = function(){
    var index = 0;
    var index1 = 0;
    dbUtil.createConnection(function(connection1){
        async.waterfall([
            function(callback){
                dbUtil.query(connection1, 'select user_id,bullup_currency_amount from bullup_wealth order by bullup_currency_amount desc', [], function(err, row) {
                    if (err){ 
                        throw err;
                    }
                    callback(null, row);
                });
            },
            function(usersWealthInfo, callback){
                var usersInfo = {};
                async.eachSeries(usersWealthInfo, function(wealthInfo, errCb){
                    dbUtil.query(connection1, 'select user_nickname from user_base where user_id = ?', [wealthInfo.user_id], function(err, row) {
                        if (err){ 
                            throw err;
                        }
                        (usersInfo[wealthInfo.user_id]) = {};
                        (usersInfo[wealthInfo.user_id]).user_id = wealthInfo.user_id;
                        (usersInfo[wealthInfo.user_id]).user_nickname = row[0].user_nickname;
                        (usersInfo[wealthInfo.user_id]).user_wealth = wealthInfo.bullup_currency_amount;
                        errCb();
                    });
                },function(errCb){
                    callback(null, usersInfo);
                });
            }, function(usersWealthInfo, callback){
                var res = usersWealthInfo;
                async.eachSeries(usersWealthInfo, function(wealthInfo, errCb){
                    dbUtil.query(connection1, 'select icon_id from bullup_profile where user_id = ?', [wealthInfo.user_id], function(err, row) {
                        if (err){ 
                            throw err;
                        }
                        (res[wealthInfo.user_id]).icon_id = row[0].icon_id;
                        errCb();
                    });
                },function(errCb){
                    callback(null, res);
                });
            }
        ], function(err,wealthRankList){
            if (err) console.log(err);
            var wealthArray = new Array();
            for(obj in wealthRankList){
                wealthArray.push(wealthRankList[obj]);
            }
            wealthArray.sort(function(x,y){
                return x.user_wealth < y.user_wealth ? 1 : -1;
            });

            async.eachSeries(wealthArray, function(userRankInfo, errCb){
                dbUtil.query(connection1, 'update bullup_rank set bullup_wealth_sum=?,bullup_wealth_rank=?,user_icon_id=?,user_nickname=? where user_id=?', [userRankInfo.user_wealth, index++, userRankInfo.icon_id, userRankInfo.user_nickname, userRankInfo.user_id], function(err, res){
                    if(err){
                        throw err;
                    }
                    errCb();
                });
            },function(errCb){
                dbUtil.closeConnection(connection1);
            });
            index = 0;
        });
    });
        // for(var index = 0; index < wealthArray.length; index++){
        //     var userRankInfo = wealthArray[index];
        //     dbUtil.query(connection1, 'update bullup_rank set bullup_wealth_sum=?,bullup_wealth_rank=?,user_icon_id=?,user_nickname=? where user_id=?', [userRankInfo.user_wealth, index+1, userRankInfo.icon_id, userRankInfo.user_nickname, userRankInfo.user_id], function(err, res){
        //         if(err){
        //             throw err;
        //         }
        //     });
        // }
    
    dbUtil.createConnection(function(connection2){
        async.waterfall([
            function(callback){
                dbUtil.query(connection2, 'select user_id,bullup_strength_score from bullup_strength order by bullup_strength_score desc', [], function(err, row) {
                    if (err){ 
                        throw err;
                    }
                    callback(null, row);
                });
            },
            function(usersStrengthInfo, callback){
                var usersInfo = {};
                async.eachSeries(usersStrengthInfo, function(strengthInfo, errCb){
                    dbUtil.query(connection2, 'select user_nickname from user_base where user_id = ?', [strengthInfo.user_id], function(err, row) {
                        if (err){ 
                            throw err;
                        }
                        (usersInfo[strengthInfo.user_id]) = {};
                        (usersInfo[strengthInfo.user_id]).user_id = strengthInfo.user_id;
                        (usersInfo[strengthInfo.user_id]).user_nickname = row[0].user_nickname;
                        (usersInfo[strengthInfo.user_id]).user_strength = strengthInfo.bullup_strength_score;
                        errCb();
                    });
                },function(errCb){
                    callback(null, usersInfo);
                });
            }, function(usersStrengthInfo, callback){
                var res = usersStrengthInfo;
                async.eachSeries(usersStrengthInfo, function(strengthInfo, errCb){
                    dbUtil.query(connection2, 'select icon_id from bullup_profile where user_id = ?', [strengthInfo.user_id], function(err, row) {
                        if (err){ 
                            throw err;
                        }
                        (res[strengthInfo.user_id]).icon_id = row[0].icon_id;
                        errCb();
                    });
                },function(errCb){
                    callback(null, res);
                });
            }
        ], function(err,strengthRankList){
            if (err) console.log(err);
            var strengthArray = new Array();
            for(obj in strengthRankList){
                strengthArray.push(strengthRankList[obj]);
            }
            strengthArray.sort(function(x,y){
                return x.user_strength < y.user_strength ? 1 : -1;
            });


            async.eachSeries(strengthArray, function(userRankInfo, errCb){                
                dbUtil.query(connection2, 'update bullup_rank set bullup_strength_score=?,bullup_strength_rank=?,user_icon_id=?,user_nickname=? where user_id=?', [userRankInfo.user_strength, index1++, userRankInfo.icon_id, userRankInfo.user_nickname, userRankInfo.user_id], function(err, res){
                    if(err){
                        throw err;
                    }
                    errCb();
                });
            },function(errCb){
                dbUtil.closeConnection(connection2);
            });
            index1 = 0;
        });
    });
    // for(var index = 0; index < strengthArray.length; index++){
    //     var userRankInfo = strengthArray[index];
    //     dbUtil.query(connection, 'update bullup_rank set bullup_strength_score=?,bullup_strength_rank=?,user_icon_id=?,user_nickname=? where user_id=?', [userRankInfo.user_strength, index+1, userRankInfo.icon_id, userRankInfo.user_nickname, userRankInfo.user_id], function(err, res){
    //         if(err){
    //             throw err;
    //         }
    //     });
    // }
}


