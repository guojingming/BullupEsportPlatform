var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/service".length).replace(/\\/g, "/"));

var logUtil = dependencyUtil.global.utils.logUtil;
var socketService = dependencyUtil.global.service.socketService;

var baseInfoDao = dependencyUtil.global.dao.baseInfoDao;
var wealthInfoDao = dependencyUtil.global.dao.wealthInfoDao;
var battleRecordDao = dependencyUtil.global.dao.battleRecordDao;
var administratorDao = dependencyUtil.global.dao.administratorDao;
var bullupWebDao = dependencyUtil.global.dao.bullupWebDao;

exports.init = function () {

}


exports.handleBoradcast = function(io, socket){
    socket.on("adminBroadcast", function(text){
        io.sockets.emit('adminBroadcast',{
            text: text
        });
    });
}

exports.handleCloseServer = function(io, socket){
    socket.on("adminCloseServer", function(text){
        io.sockets.emit('adminCloseServer',{});
    });
}

//----------------------------提现管理部分--------------------------------
/**
 * 查询全部提现信息
 * @param socket
*/
exports.handleWithdraw = function (socket) {
    socket.on('getWithdrawInfo', function () {
        // console.log('bankInfo:'+bank.firstname);
        // logUtil.listenerLog('changeInfo');
        wealthInfoDao.findAllWithdrawInfo(function(res){
            //console.log("resResult"+JSON.stringify(res));
            if (!res) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '查询失败，请稍后重试',
                    type: 'SEARCHWITHDRAWRESULT',
                    extension: null
                });
            } else {
                 socket.emit('feedback', {
                    errorCode: 0,
                    text: '查询成功',
                    type: 'SEARCHWITHDRAWRESULT',
                    extension: {
                        data:res
                    }
                });
            }
        });
    });
}

/**
 * 处理提现反馈-----同意
 * @param socket
*/
exports.handleWithdrawAgree = function (socket) {
    socket.on('agree', function (data) {
        console.log(':'+data.payId);
        // logUtil.listenerLog('changeInfo');
        wealthInfoDao.setStatusTrue(data,function(res){
            //console.log("resResult"+JSON.stringify(res));
            if (!res) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '操作失败，请稍后重试',
                    type: 'SETSTATUSTRUERESULT',
                    extension: null
                });
            } else {
                 socket.emit('feedback', {
                    errorCode: 0,
                    text: '操作成功,请刷新界面',
                    type: 'SETSTATUSTRUERESULT',
                    extension: null
                });
            }
        });
    });
}
/**
 * 处理提现反馈-----驳回
 * @param socket
*/
exports.handleWithdrawDisagree = function (socket) {
    socket.on('disagree', function (data) {
        // console.log('bankInfo:'+bank.firstname);
        // logUtil.listenerLog('changeInfo');
        wealthInfoDao.setStatusFalse(data,function(res){
            //console.log("resResult"+JSON.stringify(res));
            if (!res) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '操作失败，请稍后重试',
                    type: 'SETSTATUSFALSERESULT',
                    extension: null
                });
            } else {
                 socket.emit('feedback', {
                    errorCode: 0,
                    text: '操作成功，请刷新界面',
                    type: 'SETSTATUSFALSERESULT',
                    extension: null
                });
            }
        });
    });
}

//---------------------约战管理部分--------------------------------
/**
 *查询全部约战记录
 * @param socket
*/
exports.handleSearchBattleRecord = function (socket) {
    socket.on('getBattleRecord', function () {
        // console.log('bankInfo:'+bank.firstname);
        // logUtil.listenerLog('changeInfo');
        battleRecordDao.findAllBattleRecord(function(res){
            //console.log("resResult"+JSON.stringify(res));
            //console.log(res);
            if (!res) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '查询失败，请稍后重试',
                    type: 'SEARCHBATTLERECORDRESULT',
                    extension: null
                });
            } else {
                 socket.emit('feedback', {
                    errorCode: 0,
                    text: '查询成功',
                    type: 'SEARCHBATTLERECORDRESULT',
                    extension: {
                        data:res
                    }
                });
            }
        });
    });
}
/**
 *修改约战结果
 * @param socket
*/
exports.handleChangeBattleResult = function (socket) {
    socket.on('changeResult', function (data) {
        //console.log(data.result);
        // logUtil.listenerLog('changeInfo');
        battleRecordDao.aboutBattleRecord(data,function(res){
            // console.log("resResult"+JSON.stringify(res));
            console.log(res);
            if (!res) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '操作失败，请稍后重试',
                    type: 'CHANGEBATTLERECORDRESULT',
                    extension: null
                });
            } else {
                 socket.emit('feedback', {
                    errorCode: 0,
                    text: '操作成功,请刷新页面后查看',
                    type: 'CHANGEBATTLERECORDRESULT',
                    extension: null
                });
            }
        });
    });
}

//--------------------------账户管理部分-----------------------------------
/**
 *查询全部账户信息
 * @param socket
*/
exports.handleAllAccount = function (socket) {
    socket.on('getAccountInfo', function () {
        // console.log('bankInfo:'+bank.firstname);
        // logUtil.listenerLog('changeInfo');
        administratorDao.findAllAccount(function(res){
            console.log("resResult"+JSON.stringify(res));
            //console.log(res);
            if (!res) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '查询失败，请稍后重试',
                    type: 'SEARCHALLACCOUNTRESULT',
                    extension: null
                });
            } else {
                 socket.emit('feedback', {
                    errorCode: 0,
                    text: '查询成功',
                    type: 'SEARCHALLACCOUNTRESULT',
                    extension: {
                        data:res
                    }
                });
            }
        });
    });
}

/**
 *根据userID封号
 * @param socket
*/
exports.handleSuspendAccount = function (socket) {
    socket.on('suspend', function (data) {
        // console.log('bankInfo:'+bank.firstname);
        // logUtil.listenerLog('changeInfo');
        administratorDao.suspendAccount(data,function(res){
            console.log("resResult"+JSON.stringify(res));
            //console.log(res);
            if (!res) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '封号失败，请稍后重试',
                    type: 'SUSPENDACCOUNTRESULT',
                    extension: null
                });
            } else {
                 socket.emit('feedback', {
                    errorCode: 0,
                    text: '封号成功，请刷新页面',
                    type: 'SUSPENDACCOUNTRESULT',
                    extension: null
                });
            }
        });
    });
}
/**
 *根据userID封号
 * @param socket
*/
exports.handleUnblockAccount = function (socket) {
    socket.on('unblock', function (data) {
        administratorDao.unblockAccount(data,function(res){
            //console.log("resResult"+JSON.stringify(res));
            if (!res) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '解封失败，请稍后重试',
                    type: 'UNBLOCKACCOUNTRESULT',
                    extension: null
                });
            } else {
                 socket.emit('feedback', {
                    errorCode: 0,
                    text: '解封成功,请刷新页面',
                    type: 'UNBLOCKACCOUNTRESULT',
                    extension: null
                });
            }
        });
    });
}

//------------------------------充值管理部分-----------------------------------
/**
 *查询全部充值记录
 * @param socket
*/
exports.searchAllRechargeInfo = function (socket) {
    socket.on('getRechargeInfo', function () {
        administratorDao.findAllRechargeInfo(function(res){
            console.log("resResult"+JSON.stringify(res));
            if (!res) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '查询失败，请稍后重试',
                    type: 'SEARCHRECHARGEINFORESULT',
                    extension: null
                });
            } else {
                 socket.emit('feedback', {
                    errorCode: 0,
                    text: '查询成功,请刷新页面',
                    type: 'SEARCHRECHARGEINFORESULT',
                    extension:{
                        data:res
                    }
                });
            }
        });
    });
}

//----------------------------申诉管理部分-------------------------------
/**
 *查询全部申诉反馈
 * @param socket
*/
exports.handleSearchFeedback = function (socket) {
    socket.on('getFeedbackInfo',function () {
        // console.log('bankInfo:'+bank.firstname);
        // logUtil.listenerLog('changeInfo');
        administratorDao.findAllFeedback(function(res){
            console.log("resResult"+JSON.stringify(res));
            //console.log(res);
            if (!res) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '查询失败，请稍后重试',
                    type: 'SEARCHFEEDBACKRESULT',
                    extension: null
                });
            } else {
                 socket.emit('feedback', {
                    errorCode: 0,
                    text: '查询成功',
                    type: 'SEARCHFEEDBACKRESULT',
                    extension:{
                        data:res
                    }
                });
            }
        });
    });
}
/**
 *查询全部申诉反馈状态改为已处理
 * @param socket
*/
exports.handleFeedback = function (socket) {
    socket.on('handleFeedback',function (data) {
        // console.log('bankInfo:'+bank.firstname);
        // logUtil.listenerLog('changeInfo');
        administratorDao.handleFeedback(data,function(res){
            console.log("resResult"+JSON.stringify(res));
            //console.log(res);
            if (!res) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '操作失败，请稍后重试',
                    type: 'HANDLEFEEDBACKRESULT',
                    extension: null
                });
            } else {
                 socket.emit('feedback', {
                    errorCode: 0,
                    text: '操作成功,请刷新页面',
                    type: 'HANDLEFEEDBACKRESULT',
                    extension: null
                });
            }
        });
    });
}

//--------------------简单统计----------------------
/**
 *find what I need
 * @param socket
*/
exports.handleAnalysis = function (socket) {
    socket.on('getAnalysisData',function () {
        // console.log('bankInfo:'+bank.firstname);
        // logUtil.listenerLog('changeInfo');
        administratorDao.findAnalysisData(function(res){
            console.log("resResult"+JSON.stringify(res));
            //console.log(res);
            if (!res) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '查询失败，请稍后重试',
                    type: 'ANALYSISDATARESULT',
                    extension: null
                });
            } else {
                 socket.emit('feedback', {
                    errorCode: 0,
                    text: '查询成功,请刷新页面',
                    type: 'ANALYSISDATARESULT',
                    extension: {
                        data:res
                    }
                });
            }
        });
    });
}

//--------------------邀请码信息----------------------
/**
 * @param socket
*/
exports.handleInvitedCode = function (socket) {
    socket.on('getInvitedCodeData',function () {
        baseInfoDao.getInvitedInfo(function(res){
            console.log("resResult"+JSON.stringify(res));
            if (!res) {
                socketService.stableSocketEmit(socket,'feedback', {
                    errorCode: 1,
                    text: '查询失败，请稍后重试',
                    type: 'INVITEDCODERESULT',
                    extension: null
                });
            } else {
                socketService.stableSocketEmit(socket,'feedback', {
                    errorCode: 0,
                    text: '查询成功,请刷新页面',
                    type: 'INVITEDCODERESULT',
                    extension: {
                        data:res
                    }
                });
            }
        });
    });
}

//----------------------------查看官网统计--------------------------------
/**
 * 查询官网的pv,uv,ip
 * @param socket
*/
exports.bullupWeb = function (socket) {
    socket.on('getBullupWeb', function () {
        bullupWebDao.findBullupWeb(function(res){
            if (!res) {
                socket.emit('feedback', {
                    errorCode: 1,
                    text: '查询失败，请稍后重试',
                    type: 'BULLUPWEBRESULT',
                    extension: null
                });
            } else {
                 socket.emit('feedback', {
                    errorCode: 0,
                    text: '查询成功',
                    type: 'BULLUPWEBRESULT',
                    extension: {
                        data:res
                    }
                });
            }
        });
    });
}