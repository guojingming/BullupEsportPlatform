var async = require('async');
var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/dao".length).replace(/\\/g, "/"));

var dbUtil = dependencyUtil.global.utils.databaseUtil;

//检查该账号是否已被绑定
exports.checkBindRepeat = function(nickname, callback) {
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select * from `pubg_info` where pubg_nickname=?', [nickname], function (err, results){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(results);
        });
    });
}

//开始绑定
exports.executePUBGBind = function(data,callback){
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'insert into pubg_info (pubg_nickname) values (?)', [data.nickname], function (err, results){
                    if (err) throw err;
                    callback(null,results);
                });
            },
            function(res,callback){
                dbUtil.query(connection, 'select * from pubg_info where pubg_nickname=?', [data.nickname], function (err, results2){
                    if (err) throw err;
                    callback(null,results2);
                });
            },
            function(pubgInfo,callback){
                console.log(pubgInfo);
                dbUtil.query(connection, 'insert into pubg_bind (user_id,pubg_info_id) values (?,?)', [data.userId,pubgInfo[0].pubg_info_id], function (err, results3){
                    if (err) throw err;
                    callback(null,pubgInfo);
                });
            }
        ],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}

//根据userId查找用户
exports.findAccountByUserId = function(userId, callback) {
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'select pubg_info_id from `pubg_bind` where user_id=?', [userId], function (err, results){
                    if (err) throw err;
                    if(results.length == 0){
                        callback(null,null);
                    }else{
                        console.log(results); 
                        callback(null,results[0]);
                    }
                });
            },
            function(data,callback){
                if(data == null){
                    callback(null,null);
                }else{
                    dbUtil.query(connection, 'select pubg_nickname from `pubg_info` where pubg_info_id=?', [data.pubg_info_id], function (err, results2){
                        if (err) throw err;
                        console.log(results2);
                        callback(null,results2[0]);
                    });
                }
            }
        ],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}