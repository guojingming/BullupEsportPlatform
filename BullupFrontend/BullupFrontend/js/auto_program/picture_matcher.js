var cdr = require("child_process");
var robot = require("./robot");
var async = require("async");

var robotOri = require("robotjs");

var area = "china";
//var area = "america";

exports.findLOLPicture = function(templateName, callback){
    cdr.exec("C:/Users/Public/Bullup/auto_program/PictureMatcher.exe C:/Users/Public/Bullup/auto_program/resources/" + area +"/" + templateName, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        if (stderr){
            console.error(stderr);
            return;
        }
        var matchResult = JSON.parse(stdout.toString());
        callback(matchResult);
     });
}

exports.findPictureAndClick = function(windowName, templatePath, callback){
    cdr.exec("PictureMatcher.exe [" + windowName + "] [" + templatePath + "]", (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        if (stderr){
            console.error(stderr);
            return;
        }
        var matchResult = JSON.parse(stdout.toString());
        robot.moveMouseToLocationAndDClick(matchResult.window_x + matchResult.template_x + 5, matchResult.window_y + matchResult.template_y + 5);
        callback(matchResult);
    });
}

exports.findLOLPicture('play.bmp', function(matchResult){
    var match = matchResult;
    robotOri.moveMouse(matchResult.window_x + matchResult.template_x + 65 , matchResult.window_y + matchResult.template_y);
    console.log(match);
});