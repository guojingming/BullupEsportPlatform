var async = require('async');
var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/dao".length).replace(/\\/g, "/"));

var dbUtil = dependencyUtil.global.utils.databaseUtil;


exports.findUserLOLAccountInfo = function(userId, callback) {
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select lol_info_id from lol_bind  where user_id = ?', [userId], function(err, rows){
            if(rows[0] != undefined){
                var lolInfoId = rows[0].lol_info_id;
                dbUtil.query(connection, 'select * from lol_info where lol_info_id = ?', [lolInfoId], function(err, rows){
                    dbUtil.closeConnection(connection);
                    callback(rows[0]);
                });
            }else{
                var blankObj;
                dbUtil.closeConnection(connection);
                callback(blankObj);
            }
        });
    });
}


exports.validateBindInfo = function(userId, lolAccount, lolArea, callback){
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'select * from lol_info where user_lol_area = ? and user_lol_account = ?', [lolArea, lolAccount], function(err, res){
                    //首先判断该账号在该区是否可以绑定
                    if(res[0] != undefined){
                        var bindValidityResult = {};
                        bindValidityResult.value = 'false';
                        bindValidityResult.errorCode = 1;
                        callback('finished', bindValidityResult);
                    }else{
                        var tempInfo = {};
                        tempInfo.userId = userId;
                        tempInfo.lolAccount = lolAccount;
                        tempInfo.lolArea = lolArea;
                        tempInfo.errorCode = 0;
                        tempInfo.value = 'true';
                        callback(null, tempInfo);
                    }
                });
            },
            function(tempInfo, callback){
                dbUtil.query(connection, 'select lol_info_id from lol_bind where user_id = ?', [tempInfo.userId], function(err, row) {
                    if (err){ 
                        throw err;
                    }
                    if(row[0] == undefined){
                        //如果没有搜到，说明用户还没绑账号 可以绑定
                        var bindValidityResult = {};
                        bindValidityResult.value = 'true';
                        bindValidityResult.errorCode = 0;
                        callback('finished', bindValidityResult);
                    }else{
                        var bindValidityResult = {};
                        bindValidityResult.value = 'false';
                        bindValidityResult.errorCode = 2;
                        callback('finished', bindValidityResult);

                        // //以下是同一斗牛电竞账号能绑定多个大区的LOL账号的扩展代码
                        // //如果用户已经绑定过账号了  则继续判断  该用户是否在该区绑定了账号
                        // tempInfo.lolInfoIds = row;
                        // callback(null, tempInfo);
                    }
                });
            },
            function(tempInfo, callback){
                var lolInfoIds = tempInfo.lolInfoIds;
                async.eachSeries(lolInfoIds, function(lolInfoId, errCb){
                    dbUtil.query(connection, 'select * from lol_info where lol_info_id = ?', [lolInfoId.lol_info_id], function(err, row) {
                        if (err){ 
                            throw err;
                        }
                        if(tempInfo.lolArea == row[0].user_lol_area){
                            //该区已绑定了其他账号
                            tempInfo.errorCode = 2;
                            tempInfo.value = 'false';
                        }
                        errCb();
                    });
                },function(errCb){
                    callback(null, tempInfo);
                });
            }
        ],
        function(err,result){
            dbUtil.closeConnection(connection);
            callback(result);
        });    
    });
}

exports.insertBindInfo = function(userId, lolAccount, lolNickname, lolArea, callback){
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                var tempInfo = {};
                tempInfo.userId = userId;
                tempInfo.lolAccount = lolAccount;
                tempInfo.lolArea = lolArea;
                tempInfo.lolNickname = lolNickname;
                dbUtil.query(connection, 'insert into lol_info (user_lol_account, user_lol_nickname, user_lol_area) values (?, ?, ?)', [lolAccount, lolNickname, lolArea], function(err, row){
                    callback(null, tempInfo);
                });
            },
            function(tempInfo, callback){
                dbUtil.query(connection, 'select lol_info_id from lol_info where user_lol_account = ? and user_lol_nickname = ? and user_lol_area = ?', [tempInfo.lolAccount, tempInfo.lolNickname, tempInfo.lolArea], function(err, row){
                    tempInfo.lolInfoId = row[0].lol_info_id;
                    callback(null, tempInfo);
                });
            }
        ], function(err,result){
            var lolInfoId = result.lolInfoId;
            dbUtil.query(connection, 'insert into lol_bind (user_id, lol_info_id) values (?, ?)', [result.userId, result.lolInfoId], function(err, res){                
                var result = {};
                if(res.affectedRows > 0){
                    result.errorCode = 0;
                    result.lolInfoId = lolInfoId;
                }else{
                    result.errorCode = 1;                    
                }
                dbUtil.closeConnection(connection);
                callback(result);
            });
        });
    });
}