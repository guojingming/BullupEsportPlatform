var async = require('async');
var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/dao".length).replace(/\\/g, "/"));

var dbUtil = dependencyUtil.global.utils.databaseUtil;

exports.updateStrengthInfo = function(bindInfo, callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, "update bullup_strength set bullup_strength_score = ? where user_id = ?", [bindInfo.oriStrengthScore, bindInfo.userId], function(err, res){
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}

exports.findStrengthInfoByUserId = function(userId, callback) {
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select * from bullup_strength where user_id=?',  [userId], function(err, row) {
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(row[0]);
        });
    });
}

exports.updateKDA =  function(data){
    //console.log('this is pointData:',JSON.stringify(data));
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'update bullup_strength set bullup_strength_k=?,bullup_strength_d=?,bullup_strength_a=?,bullup_strength_minion=?,bullup_strength_gold=?,bullup_strength_tower=?,bullup_strength_damage=?,bullup_strength_damage_taken=?,bullup_strength_heal=?,bullup_strength_gold_perminiute=? where user_id=?',
            [
                data.stats.kill,
                data.stats.death,
                data.stats.assists,
                data.stats.minions,
                data.stats.goldEarned,
                data.stats.tower,
                data.stats.damage,
                data.stats.damageTaken,
                data.stats.heal,
                data.goldPerminiute,
                
                data.userId
            ],
            function(err,res){
                if (err) throw err;
                dbUtil.closeConnection(connection); 
        });
    });
}