var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/service".length).replace(/\\/g, "/"));
var logUtil = dependencyUtil.global.utils.logUtil;
var userService = dependencyUtil.global.service.userService;

exports.init = function() {
    this.userSocketMap = {};
    this.socketUserMap = {};

    this.socketRoomMap = {};
    this.roomSocketMap = {};

    //用于设置最大重发次数的阈值
    this.maxResendTimes = 10;///////////////////////////

    //多少ms重发一次
    this.timeInterval = 200;

    //用于存储需要发送到客户端的消息
    this.socketEmitQueue = {};
    /* 
        socket.id:{
            socketObj: socket,
            dataQueue:[
                {
                    header: 'feedback',
                    data: feedback,
                    createTimeStamp:  15041042140,
                    sendTimes: 2,
                    status: unrecieved
                }
            ]
        }
    */
    //用于存储需要广播的消息
}

exports.add = function(userId, socket) {
    this.userSocketMap[userId] = socket;
    this.socketUserMap[socket.id] = userId;
}

exports.getMapInfo = function(){
    return this.userSocketMap;
}

exports.remove = function(socket) {
    this.userSocketMap[this.socketUserMap[socket.id].userId] = null;
    this.socketUserMap[socket.id] = null;
}

exports.isUserOnline = function(userId) {
    return userService.users[userId] != undefined? true: false;
}

exports.mapUserIdToSocket = function(userId) {
    return this.userSocketMap[userId];
}

exports.mapSocketToUserId = function(socketId) {
    return this.socketUserMap[socketId];
}

exports.userJoin = function (userId, roomName) {
    var socket = this.userSocketMap[userId];

    exports.joinRoom(socket, roomName);
}

exports.joinRoom = function (socket, roomName) {
    if(exports.socketRoomMap[socket.id] == undefined){
        exports.socketRoomMap[socket.id] = [];
        exports.socketRoomMap[socket.id].push(roomName);
    }else{
        var flag = false;
        for(var index in exports.socketRoomMap[socket.id]){
            if(exports.socketRoomMap[socket.id][index] == roomName){
                flag = true;
                break;
            }
        }
        if(!flag){
            exports.socketRoomMap[socket.id].push(roomName);
        }
    }
    if(exports.roomSocketMap[roomName] == undefined){
        exports.roomSocketMap[roomName] = [];
        exports.roomSocketMap[roomName].push(socket);
    }else{
        var flag = false;
        for(var index in exports.roomSocketMap[roomName]){
            if(exports.roomSocketMap[roomName][index].id == socket.id){
                flag = true;
                break;
            }
        }
        if(!flag){
            exports.roomSocketMap[roomName].push(socket);
        }
    }
    //socket.join(roomName);
}

//----------------------------------------------------------//
//将需要发送到客户端的消息放置到相应的消息队列里
exports.stableSocketEmit = function(socket, head, data){
    if(data.old_socket_id != undefined && data.old_socket_id != null){
       var index = data.old_socket_id;
    }else {
        var index = socket.id;
    }   
    var token = Math.random().toString(36).substring(7) + socket.id; 
    data.token = token;
    if(exports.socketEmitQueue[index] != undefined){
        exports.socketEmitQueue[index].dataQueue[String(token)] = {
            'header': head,
            'data': data,
            'createTimeStamp': 0,
            'sendTimes': 0,
            'status': 'unrecieved'
        };
    }else{
        exports.socketEmitQueue[index] = {};
        exports.socketEmitQueue[index].socketObj = socket;
        exports.socketEmitQueue[index].dataQueue = {};
        exports.socketEmitQueue[index].dataQueue[String(token)] = {
            'header': head,
            'data': data,
            'createTimeStamp': 0,
            'sendTimes': 0,
            'status': 'unrecieved'
        };
    }
}
    
exports.stableSocketsEmit = function(roomName, head, data){
    var sockets = exports.roomSocketMap[roomName];
    for(var socketIdIndex in sockets){
        var socket = sockets[socketIdIndex];
        var socketId = socket.id;
        var token = Math.random().toString(36).substring(7) + socketId; 
        var newData = {};
        newData = JSON.parse(JSON.stringify(data));
        newData.token = token;
        if(exports.socketEmitQueue[socketId] != undefined){
            exports.socketEmitQueue[socketId].dataQueue[String(token)] = {
                'header': head,
                'data': newData,
                'createTimeStamp': 0,
                'sendTimes': 0,
                'status': 'unrecieved'
            };
        }else{
            exports.socketEmitQueue[socketId] = {};
            //
            exports.socketEmitQueue[socketId].socketObj = socket;
            exports.socketEmitQueue[socketId].dataQueue = {};
            exports.socketEmitQueue[socketId].dataQueue[String(token)] = {
                'header': head,
                'data': newData,
                'createTimeStamp': 0,
                'sendTimes': 0,
                'status': 'unrecieved'
            };
        }
    }   
}

exports.stableEmit = function(){
    if (exports.socketEmitQueue != undefined &&
        exports.maxResendTimes != undefined && 
        exports.timeInterval != undefined){
        for(socketId in exports.socketEmitQueue){          
            //log.logToFile("D://log.txt", "append", "Queue: " + JSON.stringify(exports.socketEmitQueue[socketId].dataQueue));
            var socketObj = exports.socketEmitQueue[socketId].socketObj;
            //如果客户端已经断开连接则不发送消息
            if(socketObj.connected == false){
                continue;
            }
            //console.log(socketId+ " connected:" + socketObj.connected);
            var dataQueue = exports.socketEmitQueue[socketId].dataQueue;
            var data = {'blank': true};         
            for(dataToken in dataQueue){
                if(dataQueue[dataToken] == undefined || dataQueue[dataToken].status == 'recieved'){
                    continue;
                }
                data = dataQueue[dataToken];
                data.sendTimes = data.sendTimes+1;
                if(data.sendTimes >= exports.maxResendTimes){
                    //重发次数达到或超过最大重发次数则删除该条消息
                    delete exports.socketEmitQueue[socketId].dataQueue[dataToken];
                }
                break;
            }
            if(data.blank != true){
                if(data.lastSendTime == 0 || data.lastSendTime == undefined){
                    data.lastSendTime = new Date().getTime();  
                }else{
                    if((new Date().getTime()) - data.lastSendTime <= exports.timeDelay){
                        continue;
                    }
                }
                
                socketObj.emit(data.header, data.data); 
                //console.log("tijiao");               
                delete data;
            }else{
                continue;
            }
        }
    }else{
        exports.init();
    }
}

exports.handleReceivedTokenData = function(socket){
    socket.on('tokenData', function(tokenData){
        //从未发送的消息队列中删除该项
        if(exports.socketEmitQueue[socket.id].dataQueue != undefined || exports.socketEmitQueue[socket.id].dataQueue != null ){
            delete exports.socketEmitQueue[socket.id].dataQueue[tokenData];
        }        
        //exports.socketEmitQueue[socket.id].dataQueue[tokenData].status = 'recieved';
    });
}

exports.handleReconnect = function(io, socket){
    socket.on('reconnected', function(reconnectPacket){
        //console.log("reconnect: " + JSON.stringify(reconnectPacket));
        //如果之前用户已经登录
        if(reconnectPacket.userInfo != null && reconnectPacket.userInfo != undefined){
            //更新socketMap
            if(reconnectPacket.lastSocketId == null || reconnectPacket.lastSocketId == undefined){
                if(exports.userSocketMap[reconnectPacket.userInfo.userId] != undefined){
                    reconnectPacket.lastSocketId = exports.userSocketMap[reconnectPacket.userInfo.userId].id;
                }
            }
            if(reconnectPacket.lastSocketId == null){
                throw new Error('lastSocketId is null! Socket recover failed!');
            }
            exports.userSocketMap[reconnectPacket.userInfo.userId] = socket;
            exports.socketUserMap[reconnectPacket.newSocketId] = reconnectPacket.userInfo.userId;
            delete exports.socketUserMap[reconnectPacket.lastSocketId];
        } else {
            //如果之前用户未登录
            if(reconnectPacket.lastSocketId == null || reconnectPacket.lastSocketId == undefined){
                //没有可恢复的内容
                return;
            }
        }
        //恢复消息队列中的socket信息
        //如果原socket的消息队列为空 则没必要恢复
        if(exports.socketEmitQueue[reconnectPacket.lastSocketId] == undefined){
            return;
        }
        //更新消息队列
        exports.socketEmitQueue[reconnectPacket.newSocketId] = exports.socketEmitQueue[reconnectPacket.lastSocketId];
        exports.socketEmitQueue[reconnectPacket.newSocketId].socketObj = socket;
        delete exports.socketEmitQueue[reconnectPacket.lastSocketId];
        //更新room信息
        //更新socketRoomMap
        exports.socketRoomMap[socket.id] = exports.socketRoomMap[reconnectPacket.lastSocketId];
        delete exports.socketRoomMap[reconnectPacket.lastSocketId];
        //更新roomSocketMap
        for(var index in exports.socketRoomMap[socket.id]){
            var roomName = exports.socketRoomMap[socket.id][index];
            for(var socketIndex in exports.roomSocketMap[roomName]){
                if(exports.roomSocketMap[roomName][socketIndex].id == reconnectPacket.lastSocketId){
                    delete exports.roomSocketMap[roomName][socketIndex];
                }
            }
            exports.roomSocketMap[roomName].push(socket);
            exports.joinRoom(socket, roomName);
        }
        //彻底断开原来的socket
        if(io.sockets.sockets[reconnectPacket.lastSocketId] != undefined){
            io.sockets.sockets[reconnectPacket.lastSocketId].disconnect(true);
        }
    });   
}

exports.startstableEmiter = function(){
    setInterval(exports.stableEmit, exports.timeInterval);
}


//----------------------------------------------------------//