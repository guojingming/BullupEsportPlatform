var matcher = require("./picture_matcher.js");
var robot = require("./robot.js");
var async = require("async");
var cdr = require("child_process");
var fs = require("fs");



exports.autoCreateRoom = function(roomName, password, callback){
    var mouse = [];
    var matchTemplate = [
        "play.bmp",
        "create_custom_button.png",
        "map_choose_button.png",
        "room_name_label.png",
        "password_label.png",
        "confirm.png",
		"icon.png"
    ];
    var xOffset = [80, 270, 30, 220, 220, 10, 20];
    var yOffset = [30, 65, -100, -52, -78, -110, 20];
    var data = {};
    data.roomName = roomName;
    data.password = password;
    data.matchTemplate = matchTemplate;
    data.xOffset = xOffset;
    data.yOffset = yOffset;

    async.waterfall([
		// function(callback){
        //     matcher.findLOLPicture(data.matchTemplate[6], function(location){
        //         var moveX = location.window_x + location.template_x + data.xOffset[6];
        //         var moveY = location.window_y + location.template_y + data.yOffset[6];
        //         robot.moveMouseToLocationAndDClick(moveX, moveY);
        //         setTimeout(function() {  
        //             callback(null, data);
        //         }, 2000); 
        //     });
        // },
        function(callback){
            matcher.findLOLPicture(data.matchTemplate[0], function(location){
                var moveX = location.window_x + location.template_x + data.xOffset[0];
                var moveY = location.window_y + location.template_y + data.yOffset[0];
                robot.moveMouseToLocationAndDClick(moveX, moveY);
                setTimeout(function() {  
                    callback(null, data);
                }, 2000); 
            });
        },
        function(data, callback){
            matcher.findLOLPicture(data.matchTemplate[1], function(location){
                var moveX = location.window_x + location.template_x + data.xOffset[1];
                var moveY = location.window_y + location.template_y + data.yOffset[1];
                robot.moveMouseToLocationAndDClick(moveX, moveY);
                setTimeout(function() {  
                    callback(null, data);
                }, 500); 
            });
        },
        function(data, callback){
            matcher.findLOLPicture(data.matchTemplate[2], function(location){
                var moveX = location.window_x + location.template_x + data.xOffset[2];
                var moveY = location.window_y + location.template_y + data.yOffset[2];
                robot.moveMouseToLocationAndDClick(moveX, moveY);
                setTimeout(function() {  
                    callback(null, data);
                }, 500); 
            });
        },
        function(data, callback){
            matcher.findLOLPicture(data.matchTemplate[3], function(location){
                var moveX = location.window_x + location.template_x + data.xOffset[3];
                var moveY = location.window_y + location.template_y + data.yOffset[3];
                robot.moveMouseToLocationAndDClick(moveX, moveY);
                robot.keyPressed('backspace',20);           
                robot.inputText(roomName);
                robot.keyPressed('enter', 1);
                setTimeout(function() {  
                    callback(null, data);
                }, 500); 
            });
        },
        function(data, callback){
            matcher.findLOLPicture(data.matchTemplate[4], function(location){
                var moveX = location.window_x + location.template_x + data.xOffset[4];
                var moveY = location.window_y + location.template_y + data.yOffset[4];
                robot.moveMouseToLocationAndDClick(moveX, moveY);
                robot.keyPressed('backspace',20);           
                robot.inputText(data.password);
                robot.keyPressed('enter', 1);
                setTimeout(function() {  
                    callback(null, data);
                }, 500); 
            });
        },
        function(data, callback){
            matcher.findLOLPicture(data.matchTemplate[5], function(location){
                var moveX = location.window_x + location.template_x + data.xOffset[5];
                var moveY = location.window_y + location.template_y + data.yOffset[5];
                robot.moveMouseToLocationAndDClick(moveX, moveY);
                setTimeout(function() {  
                    callback(null, data);
                }, 800); 
            });
        }
    ],function(err, res){
        callback(res);
    });
}

// var jsonStr = fs.readFileSync("C:/Users/Public/Bullup/createRoom.txt");
// var jsonObj = JSON.parse(jsonStr);

// exports.autoCreateRoom(jsonObj.roomName, jsonObj.password, function(data){

// });