var mysql = require('mysql');
var async = require('async');

var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/util".length).replace(/\\/g, "/"));


var logUtil = dependencyUtil.global.utils.logUtil;
var socketService = dependencyUtil.global.service.socketService;

// var mysqlServerConfig = {
//     host:'18.221.98.48',
//     user: 'root',
//     password: '1234',
//     database: 'bullup',
//     useConnectionPooling: true
// };

var pool = mysql.createPool({  
    host:'127.0.0.1',
    user: 'JiaxinYu',
    password: 'zxcjoqA139SJC@sjpwQ25W76EIMM,VSXJV33NAskfl%$awdpqi@QWIJD12',
    database: 'bullup',
    port: 6280  
});  
  

// var serverConnection = mysql.createConnection(mysqlServerConfig);
// serverConnection.connect(function(err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         throw err;
//     }
//     console.log('Mysql connected as id ' + serverConnection.threadId);
//     //callback(connection);
// }); 

exports.createConnection = function(callback){
    // var connection = mysql.createConnection(mysqlServerConfig);
    // connection.connect(function(err) {
    //     if (err) {
    //         console.error('error connecting: ' + err.stack);
    //         throw err;
    //     }
    //     //console.log('Mysql connected as id ' + connection.threadId);
    //     callback(connection);
    // }); 
    var blank = {};
    callback(blank);
}

exports.closeConnection = function(connection){
    //connection.end();
}

exports.query = function(connection, sql, values, callback){
    // serverConnection.query(sql, values, function(err, res){
    //     callback(err, res);
    // });

    pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null);  
        }else{  
            conn.query(sql, values,function(err,results){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(err,results);  
            });  
        }  
    });  
};