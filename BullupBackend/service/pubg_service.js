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

exports.handlePUBGResult = function(socket){
    socket.on('pubgResult',function(data){
        console.log('data',JSON.stringify(data));
        var realRate;
        if(data.target == '1' || data.target == '2'){
            realRate = data.rate.substring(3,5);
        }else if(data.target == '3'){
            realRate = data.rate.substring(3);
        }
        console.log(realRate);
        if(data.kill == data.target){
            data.bonus = Number(realRate);
            data.result = 'win';
            pubgDao.handleResult(data,function(res){
                if(res){
                    socketService.stableSocketEmit(socket,'feedback',{
                        errorCode: 0,
                        text: '恭喜完成击杀目标.',
                        type: 'PUBGBATTLERESULT',
                        extension: {
                            info: data
                        }
                    });
                }
            });
        }else{
            data.bonus = -(1+Number(realRate));
            console.log('data.bonus',data.bonus);
            data.result = 'lose';
            pubgDao.handleResult(data,function(res){
                if(res){
                    socketService.stableSocketEmit(socket,'feedback',{
                        errorCode: 0,
                        text: '您未完成击杀目标.',
                        type: 'PUBGBATTLERESULT',
                        extension: {
                            info: data
                        }
                    });
                }
            });
        }
    });
}