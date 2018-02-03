var stripe = require("stripe")( "sk_test_ud0FTgDIp5a5SLWZMMOGvVF9");

var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/service".length).replace(/\\/g, "/"));
var logUtil = dependencyUtil.global.utils.logUtil;
var socketService = dependencyUtil.global.service.socketService;


var wealthInfoDao = dependencyUtil.global.dao.wealthInfoDao;


exports.init = function () {
   
}
/**
 * 充值申请
 */
exports.handlePayment = function (socket) {
    socket.on('payment',function(data){
        var  token = data.token;
        var amount = data.money;
        logUtil.listenerLog('payment');
        console.log('日期：'+data.date);
        // console.log('------------------------------')
        stripe.charges.create({
            amount: amount,
            currency: "usd",
            description: "Example charge",
            source: "tok_mastercard",
        }, function(err, charge) {
            if (err) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '充值失败，请稍后重试',
                    type: 'RECHARGERESULT',
                    extension: null
                });
            } else {
                wealthInfoDao.userRecharge(data,function(err){
                    if (err) {
                        socket.emit('feedback', {
                            errorCode: 1,
                            text: '充值失败，请稍后重试',
                            type: 'RECHARGERESULT',
                            extension: null
                        });
                    } else {
                         socket.emit('feedback', {
                            errorCode: 0,
                            text: '充值成功！',
                            type: 'RECHARGERESULT',
                            extension: {
                                //userAccount: userInfo.userAccount,
                                //userNickname: userInfo.userNickname,
                                //userId: userAddRes.userId,
                                //userIconId: 1,
                            }
                        });
                    }
                });
            }
        });
    });
}
/**
 * 收集支付信息，提现申请入库
 * @param socket
*/
exports.handleBankInfo = function (socket) {
    socket.on('bankInfo', function (bank) {
        console.log('bankInfo:'+bank.firstname);
        logUtil.listenerLog('changeInfo');
        wealthInfoDao.insertBankInfo(bank,function(err){
            if (err) {
                socketService.stableSocketEmit(socket, 'feedback', {
                    errorCode: 1,
                    text: '申请失败，请稍后重试',
                    type: 'PAYMENTRESULT',
                    extension: null
                });
            } else {
                socketService.stableSocketEmit(socket, 'feedback', {
                    errorCode: 0,
                    text: '申请成功，请耐心等待处理',
                    type: 'PAYMENTRESULT',
                    extension: {
                        //userAccount: userInfo.userAccount,
                        //userNickname: userInfo.userNickname,
                        //userId: userAddRes.userId,
                        //userIconId: 1,
                    }
                });
            }
        });
    });
}


/**
 * 查询资金流动记录
 * @param socket
*/
exports.handleSearchCashFlow = function (socket) {
    socket.on('cashFlow', function (data) {
        logUtil.listenerLog('cashFlow');
        wealthInfoDao.searchCashFlow(data,function(res){
            //console.log("resResult"+JSON.stringify(res));
            if (!res) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '查询失败，请稍后重试',
                    type: 'CASHFLOWRESULT',
                    extension: null
                });
            } else {
                 socket.emit('feedback', {
                    errorCode: 0,
                    text: '查询成功',
                    type: 'CASHFLOWRESULT',
                    extension:{
                        data:res
                    }
                });
            }
        });
    });
}

//获取最新余额
exports.handleGetLastestWealth = function(socket){
    socket.on('getLastestWealth',function(data){
        wealthInfoDao.getBalance(data,function(res){
            console.log(res);
            if(res){
                socketService.stableSocketEmit(socket, 'feedback', {
                    errorCode: 1,
                    text: '获取成功',
                    type: 'GETLASTESTWEALTHRESULT',
                    extension: {
                        money: res.bullup_currency_amount
                    }
                });
            }
        });
    });
}