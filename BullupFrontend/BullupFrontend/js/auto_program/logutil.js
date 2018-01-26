var fs = require('fs');

exports.init = function(){
    this.errorCount = 0;
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
            (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

exports.listenerLog = function(listenerName) {
    console.log('In ' + listenerName + ' listener!');
}

/**
 * 格式化输出json子串信息
 * @param jsonInfo json串
 */
exports.jsonLog = function(jsonInfo) {
    console.log(JSON.stringify(jsonInfo, null , '\t'));
}

/**
 * 格式化输出多层字串
 * @param level 成熟
 * @param content 内容
 */
exports.levelMsgLog = function(level, content) {
    var prefix = '';
    for (var i = 0; i < level; ++i) {
        prefix += '\t';
    }
    console.log(prefix + content);
}

exports.methodLog = function(methodName) {
    console.log('In ' + methodName + ' method!');
}

//openMode:  read/write/append
exports.logToFile = function(filePath, openMode, logStr){
    if(openMode == 'append'){
        fs.writeFileSync(filePath, '[' + (new Date()).format("yyyy-MM-dd hh:mm:ss") + '] '+ logStr + '\r\n', {flag: 'a'});
    }else if(openMode == 'write'){
        fs.writeFileSync(filePath, '[' + (new Date()).format("yyyy-MM-dd hh:mm:ss") + '] '+ logStr + '\r\n', {flag: 'w'});
    }
}

exports.logErrToFile = function(filePath, openMode, err){
    var logStr = " ErrorName: " + err.name + "\r\n";
    logStr += " ErrorMessage: " + err.message + "\r\n";
    logStr += " ErrorStack:\r\n { \r\n" + err.stack + "\r\n\r\n";

    if(openMode == 'append'){
        fs.writeFileSync(filePath, '[' + (new Date()).format("yyyy-MM-dd hh:mm:ss") + '] '+ logStr + '\r\n', {flag: 'a'});
    }else if(openMode == 'write'){
        fs.writeFileSync(filePath, '[' + (new Date()).format("yyyy-MM-dd hh:mm:ss") + '] '+ logStr + '\r\n', {flag: 'w'});
    }

    exports.errorCount++;
}