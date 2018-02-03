var async = require('async');
var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/dao".length).replace(/\\/g, "/"));

var dbUtil = dependencyUtil.global.utils.databaseUtil;


//--------------查询全部提现信息------------------------
exports.findAllWithdrawInfo = function(callback) {
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select * from bullup_bankcard_info', [], function (err, results){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(results);
        });
    });
}
//--------------处理同意提现，将状态改为TRUE------------------------
exports.setStatusTrue = function(data,callback) {
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, "update bullup_bankcard_info set bullup_bank_state='已完成' where bullup_withdraw_id=?",[data.payId],function (err, results){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(results);
        });
    });
}
//--------------处理驳回提现，将状态改为FALSE------------------------
exports.setStatusFalse = function(data,callback) {
    dbUtil.createConnection(function(connection){
        async.parallel([
            function(done){
                dbUtil.query(connection, "update bullup_bankcard_info set bullup_bank_state='已驳回' where bullup_withdraw_id=?",[data.payId],function (err, results){
                    if (err) throw err;
                    done(null,results);
                });
            },
            function(done){
                dbUtil.query(connection, "update bullup_wealth set bullup_currency_amount=bullup_currency_amount+? where user_id=?",[data.money,data.userId],function (err, results){
                    if (err) throw err;
                    done(null,results);
                }); 
            }
        ],function(err,res){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}

exports.findUserWealthByUserId = function(userId, callback) {
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select bullup_currency_amount from bullup_wealth where user_id = ? and bullup_currency_type = ?',  [userId, 'score'], function(err, row) {
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(row[0]);
        });
    });
}


/**
 * 通过userId查询余额
 * @param userId 
 */
exports.getBalance = function(data,callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select bullup_currency_amount from bullup_wealth where user_id=?',[data.userId],function(err,result){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(result[0]);
        });
    });
}

/**
 * 通过userId查询资金流动记录
 * @param userId 
 */
exports.searchCashFlow = function(data,callback){
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                var tempInfo = {};
                dbUtil.query(connection, 'select * from bullup_payment_history where user_id=?',[data.userId],function(err,result){
                    if (err) throw err;
                    tempInfo.rechargeInfo = result;
                    callback(null,tempInfo);
                });
            },
            function(tempInfo,callback){
                //var tempInfo = {};
                dbUtil.query(connection, 'select bullup_bank_money,bullup_bank_cardnumber,bullup_withdraw_id,bullup_bank_wdtime,bullup_bank_state from bullup_bankcard_info where user_id=?',[data.userId],function(err,result){
                    if (err) throw err;
                    tempInfo.withdrawInfo = result;
                    callback(null,tempInfo);
                });
            },
            function(tempInfo,callback){
                //var tempInfo = {};
                dbUtil.query(connection, 'select bullup_battle_name,bullup_battle_bet,bullup_battle_time,bullup_battle_result,bullup_battle_participants_red,bullup_battle_participants_blue  from bullup_battle_record where bullup_battle_participants_red like ? or bullup_battle_participants_blue like ?',['%'+data.userNickname+'%','%'+data.userNickname+'%'],function(err,result){
                    if (err) throw err;
                    tempInfo.battleInfo = result;
                    callback(null,tempInfo);
                });
            },
            function(tempInfo,callback){
                //var tempInfo = {};
                dbUtil.query(connection, 'select * from pubg_battle_record where user_id=?',[data.userId],function(err,result){
                    if (err) throw err;
                    tempInfo.pubgBattleInfo = result;
                    callback(null,tempInfo);
                });
            }
        ],function(err,res){
            if(err) throw err;
            dbUtil.closeConnection(connection);
            callback(res);
        });
    });
}

/**
 * 将用户充值金额加入数据库,注意，这里只能增加
 * 这里要分别插入两个表
 * @param userId
 */
exports.userRecharge = function(data, callback) {
    dbUtil.createConnection(function(connection){
        async.parallel([
            function(done) {
                dbUtil.query(connection, 'update bullup_wealth set bullup_currency_amount=bullup_currency_amount+? where user_id=?', [data.money,data.userId], function (err, results){
                    if (err) throw err;
                    done(err,results);
                });
            },
            function(done){
                dbUtil.query(connection, 'insert into bullup_payment_history(user_id, bullup_payment_account_id, bullup_bill_value,bullup_bill_type,bullup_bill_state) values (?,?,?,?,?)', [data.userId, 0, data.money, data.currency,data.state], function (err, results){
                    if (err) throw err;
                    done(err,results);
                });
            }
        ],function(err,results){
            if(!err){
                dbUtil.closeConnection(connection);
                callback(results);
            }else{
                dbUtil.closeConnection(connection);
                callback(null);
            }
        });
    });
}


/**
 * 收集银行信息,提现申请入库
 * @param getBankInfo 收集信息
 */
exports.insertBankInfo = function(bankInfo, callback) {
    if(bankInfo.areacode == null || bankInfo.areacode == undefined){
        bankInfo.areacode = 0; 
    }
    if(bankInfo.cardnumber == null || bankInfo.cardnumber == undefined || bankInfo.cardnumber.length == 0){
        bankInfo.cardnumber = '未填写银行卡号'; 
    }
    dbUtil.createConnection(function(connection){
        async.parallel([
            function(done){
                dbUtil.query(connection, 'insert into bullup_bankcard_info(user_id,bullup_bank_cardnumber,bullup_bank_firstname,bullup_bank_lastname,bullup_bank_areacode,bullup_bank_phone,bullup_bank_money,bullup_bank_email,bullup_bank_streetaddress,bullup_bank_apt_suite_bldg,bullup_bank_zipcode) values (?,?,?,?,?,?,?,?,?,?,?)',
                [bankInfo.userId,bankInfo.cardnumber,bankInfo.firstname,bankInfo.lastname,bankInfo.areacode,bankInfo.phone,bankInfo.money,bankInfo.email,bankInfo.streetaddress,bankInfo.apt_suite_bldg,bankInfo.zipcode], function (err, results){
                if (err) throw err;                                                                                                                                                                                                                             
                done(err,results);
            });
            },
            function(done){
                dbUtil.query(connection, 'update bullup_wealth set bullup_currency_amount=bullup_currency_amount-? where user_id=?',[bankInfo.money,bankInfo.userId],function(err,results){
                    if (err) throw err;
                    done(err,results);
                });
            }
        ],function(err,res){
            if(!err){
                dbUtil.closeConnection(connection);
                callback(null,res);
            }else{
                dbUtil.closeConnection(connection);
                callback(err,null);
            }
        });
    });
}

//DNDJCB邀请码100人赠送20$
exports.chargeForInviteCode = function(userId,callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'update bullup_wealth set bullup_currency_amount = bullup_currency_amount+20 where user_id=?',[userId],function(err,result){
            if (err) throw err;
            dbUtil.closeConnection(connection);
            callback(result);
        });
    });
}