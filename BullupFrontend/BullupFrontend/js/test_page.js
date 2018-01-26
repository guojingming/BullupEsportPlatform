var lolProcess = require('./js/auto_program/lol_process.js');
var lolUtil = require('./js/util/lol_util.js');

var child_process = require("child_process");
var request = require("request");

$(document).ready(function(){

    $("#router_test_page").click(function(e){
        socket.emit("test");
        // child_process.exec('C:/Users/Public/Bullup/auto_program/node C:/Users/Public/Bullup/auto_program/sync_user.js', function(error, stdout, stderr){
        //     if(error){
        //         throw error;
        //     }
        //     callback(stdout);
        // });

        //lolProcess.grabLOLData("result", socket);
        // lolUtil.getMatchDetailsBySummonerName("Who is 55Kai", "2017/10/11", "2017/10/14", function(details){
        //     console.log(details);

        // });

        //lolProcess.grabLOLData("room", socket);
        
        
        // var dataStr = '{"roomName":"admin1507119264941","captain":{"name":"admin","userId":36,"avatarId":1},"participants":[{"name":"admin","userId":36,"avatarId":1,"strength":{"kda":"0.0","averageGoldEarned":0,"averageTurretsKilled":0,"averageDamage":0,"averageDamageTaken":0,"averageHeal":0,"score":0}}],"status":"ESTABLISHING","gameMode":"match","battleDesc":"","rewardType":"bullupScore","rewardAmount":"10","mapSelection":"map-selection-1","winningCondition":"push-crystal"}';
        // var data = JSON.parse(dataStr);

        // bullup.loadTemplateIntoTarget('swig_fightfor.html', {
        //     'participants': data.participants
        // }, 'main-view');
        // var labelArray = ['击杀', '死亡', '助攻','治疗', '造成伤害', '承受伤害'];
        // var dataArray1 = [50,50,50,50,50,50];
        // bullup.generateRadar(dataArray1, null, labelArray, "我方战力", "team-detail-chart");

        //lolProcess.grabLOLData('result', socket);
        // function processResultPacket(stdout){
        //     var resultPacket = {};
        //     resultPacket.head = "result";
        //     resultPacket.accountId = stdout.accountId;
        //     resultPacket.gameMode = stdout.gameMode;
        //     resultPacket.gameType = stdout.gameType;
        //     if(stdout.teams[0].players[0].stats.WIN == 1){
        //         resultPacket.win = "yes";
        //     }else{
        //         resultPacket.win = "no";
        //     }
        //     return resultPacket;
        // }
        
        
        // child_process.exec('node ./js/auto_program/sync_lol_result_process.js', function (error, stdout, stderr) {
        //     if (error) {
        //         console.log(error.stack);
        //         console.log('Error code: '+error.code);
        //         console.log('Signal received: '+error.signal);
        //     }
        //     if(stderr){
        //         console.log('sync_lol_process stderr: ' + stderr);
        //     }
        //     stdout = JSON.parse(stdout);
        //     var packet;
        //     if(stdout.UserInfo != undefined){
        //         packet = processLoginPacket(stdout);
        //         socket.emit('lolLoginResult', packet);
        //     }else if(stdout.actions != undefined){
        //         packet = processRoomPacket(stdout);
        //         socket.emit('lolRoomEstablished', packet);
        //     }else if(stdout.gameMode != undefined){
        //         packet = processResultPacket(stdout);
        //         socket.emit('lolBattleResult', packet);
        //     }
        //     //console.log(packet); 
        // });


        // var testDataString = '{"battleName":"嵇昊雨郭景明1504507131239","blueSide":{"roomName":"嵇昊雨1504507111851","captain":{"name":"嵇昊雨","userId":30,"avatarId":1},"participants":[{"name":"嵇昊雨","userId":30,"avatarId":1,"strength":{"kda":"0.0","averageGoldEarned":0,"averageTurretsKilled":0,"averageDamage":0,"averageDamageTaken":0,"averageHeal":0,"score":2000}}],"status":"PUBLISHING","gameMode":"battle","battleDesc":"","rewardType":"bullupScore","rewardAmount":"10","mapSelection":"map-selection-1","winningCondition":"push-crystal"},"redSide":{"roomName":"郭景明1504507072765","captain":{"name":"郭景明","userId":29,"avatarId":1},"participants":[{"name":"郭景明","userId":29,"avatarId":1,"strength":{"kda":"0.0","averageGoldEarned":0,"averageTurretsKilled":0,"averageDamage":0,"averageDamageTaken":0,"averageHeal":0,"score":2000}}],"status":"PUBLISHING","gameMode":"battle","battleDesc":"","rewardType":"bullupScore","rewardAmount":"10","mapSelection":"map-selection-1","winningCondition":"push-crystal"},"status":"unready","time":{"unready":"20170904143851","ready":null,"start":null}}';
        // var testData = JSON.parse(testDataString);
        // var battleRoomHtml = bullup.loadSwigView("./swig_fight.html", {
        //     blueSide: testData.blueSide,
        //     redSide: testData.redSide,
        // });
        // // //样式参考
        // // //var battleRoomHtml = bullup.loadSwigView("./spa_fight.html", {});
        // $('#main-view').html(battleRoomHtml);
        // var labelArray = ["综合", "KDA", "发育", "推进", "生存", "输出"];
        // var dataArray1 = [0, 10, 100, 50, 20, 30];
        // var dataArray2 = [30, 50, 30, 20, 10, 20];
        // var title = "战力对比";
        // var canvasId = "teams-radar-chart";
        // bullup.generateRadar(dataArray1, dataArray2, labelArray, "战力对比", "teams-radar-chart");
        
        
        // $('#waiting-modal').css('display', 'none');    
        // $('#team-detail-modal').css('display', 'none');    
        // $('.modal-overlay').remove();
    });
});