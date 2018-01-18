var async = require("async");
var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/service".length).replace(/\\/g, "/"));
var pubgDao = dependencyUtil.global.dao.pubgDao;
var socketService = dependencyUtil.global.service.socketService;

exports.handlePUBGBind = function(socket){
    socket.on('pubgBind',function(data){
        console.log(data);
        pubgDao.checkBindRepeat(data.nickname,function(res){
            if(res.length != 0){
                socketService.stableSocketEmit(socket, 'feedback', {
                    errorCode: 1,
                    text: '该账户已被绑定',
                    type: 'PUBGBINDRESULT',
                    extension: null
                });
            }else{
                pubgDao.executePUBGBind(data,function(res2){
                    console.log(JSON.stringify(res2));
                    if(res2.length != 0 ){
                        socketService.stableSocketEmit(socket, 'feedback', {
                            errorCode: 0,
                            text: '绑定成功！祝您大吉大利,今晚吃鸡.',
                            type: 'PUBGBINDRESULT',
                            extension: {
                                data: res2[0].pubg_nickname
                            }
                        });
                    }
                });
            }
        });
    });
}