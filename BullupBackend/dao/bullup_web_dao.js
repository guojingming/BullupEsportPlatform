var async = require('async');
var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/dao".length).replace(/\\/g, "/"));

var dbUtil = dependencyUtil.global.utils.databaseUtil;
var socketService = dependencyUtil.global.service.socketService;


exports.addDate = function(userInfo, callback) {
    dbUtil.createConnection(function(connection){
        async.waterfall([
            function(callback){
                dbUtil.query(connection, 'select * from bullup_web where id = (select max(id) from bullup_web)', [], function (err, results){
                    if (err) throw err;
                    dbUtil.closeConnection(connection);
                    //console.log("---",results);
                    callback(null,results);
                });
            },
            function(data,callback){
               //console.log("user",userInfo);
               //console.log("data",data);
               var pv_count = data[0].pv_count;
               var uv_count = data[0].uv_count;
               var all_count = data[0].all_count;
               if(userInfo.bullup_day>data[0].bullup_day){
                   pv_count=0;
               }
               if(userInfo.increase_uv==1){
                if(userInfo.bullup_day>data[0].bullup_day){
                    uv_count=0;
                }
                uv_count++;
                all_count++;
               }               
               pv_count++;
               console.log(pv_count,uv_count,all_count);
               dbUtil.query(connection, 'insert into `bullup_web` (ip, country, province, city, time, bullup_day, pv_count, uv_count,all_count) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [userInfo.ip,userInfo.acountry ,userInfo.province,userInfo.city,userInfo.time,userInfo.bullup_day,pv_count,uv_count,all_count], function (err, rows) {
                    if (err) {
                        throw err;//connection.rollback();
                    }
                    if(rows.affectedRows > 0){
                        console.log("rows",rows);
                        callback(null, data);
                    }
                });
               //callback(null,data);
            }
        ],    
        function(err, result){
            if(err) console.log(err);
            dbUtil.closeConnection(connection);
            callback(result);
        });
    });
}
var ip = new Set();
exports.findBullupWeb = function(callback){
    dbUtil.createConnection(function(connection){
        dbUtil.query(connection, 'select pv_count,ip,bullup_day,uv_count from bullup_web', [], function (err, results){
            if (err) throw err;          
            dbUtil.closeConnection(connection);
            //console.log(results);
            var obj = {};
            for(var index in results){
                index_day = 17529;                
                ip.add(results[index].ip);
                //console.log("ip:",ip.size);
                if(results[index].bullup_day > index_day){
                   obj[results[index-1].bullup_day]={ip:ip.size,day:results[index-1].bullup_day-17528,pv_count:results[index-1].pv_count,uv_count:results[index-1].uv_count};
                   ip.clear();
                   index_day = results[index].bullup_day;           
                }else if(results.length-1 == index){
                   obj[results[index].bullup_day]={ip:ip.size,day:results[index].bullup_day-17528,pv_count:results[index].pv_count,uv_count:results[index].uv_count};
                   ip.clear();                  
                }
                // console.log(obj);
            }
            callback(obj);
        });
    });
}

