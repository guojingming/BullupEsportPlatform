var fs = require('fs');
var child_process = require('child_process');


exports.autoCreateLOLRoom = function(roomName, password){
    var jsonObj = {};
    jsonObj.roomName = roomName;
    jsonObj.password = password;
    fs.writeFileSync("C:/Users/Public/Bullup/createRoom.txt", JSON.stringify(jsonObj), null);
    child_process.exec('node C:/Users/Public/Bullup/auto_program/auto_script.js', (err, stdout, stderr) => {
        console.log('err ' + err);
        console.log('stdout ' + stdout);
        console.log('stderr ' + stderr);
    });
}
