var process = require("child_process");
var log = require("./logutil.js")
var fs = require("fs");

exports.gameStartCount = 0;

exports.grabLOLData = function(type, socket){
    //杀掉所有BullupService进程
    process.execFile('killBS.bat',null,{cwd:'./js/auto_program/'},function(error, stdout, stderr){
        switch (type){
            case "login": {
                syncLogin(function(jsonStr){
                    socket.emit('lolLoginResult', jsonStr);
                });
                break;
            }
            case "room": {
                syncRoom(function(jsonStr){
                    socket.emit('lolRoomEstablished', jsonStr);
                });
                break;
            }
            case "result": {
                if(exports.gameStartCount == 0){
                    syncResult(function(jsonStr){
                        socket.emit('lolBattleResult', jsonStr);
                    });
                    exports.gameStartCount = 2;
                }
                break;
            }
            case 'killProcess':{
                killBullupService();
                break;
            }
        }
    });
}

function killBullupService(){
    process.execFile('killBS.bat',null,{cwd:'./js/auto_program/'},function(error, stdout, stderr){
        if(error){
            throw error;
        }
    });
}
 
function syncLogin(callback){
    process.exec('C:/Users/Public/Bullup/auto_program/node C:/Users/Public/Bullup/auto_program/sync_user.js', function(error, stdout, stderr){
        if(error){
            throw error;
        }
        callback(stdout);
    });
}

function syncRoom(callback){
    process.exec('C:/Users/Public/Bullup/auto_program/node C:/Users/Public/Bullup/auto_program/sync_room.js', function(error, stdout, stderr){
        if(error){
            throw error;
        }
        callback(stdout);
    });
}

function syncResult(callback){
    process.exec('C:/Users/Public/Bullup/auto_program/node C:/Users/Public/Bullup/auto_program/sync_result.js', function(error, stdout, stderr){
        if(error){
            throw error;
        }
        callback(stdout);
    });
}


function processLoginPacket(stdout){
    var loginPacket = {};
    var rankTierInfo = String(stdout.UserInfo.rankedTierInfo);
    var ranks = ['UNRANKED','BRONZE','SILVER','GOLD','PLATINUM','DIAMOND','MASTER','CHALLENGER'];
    loginPacket.currentRank = 'UNRANKED';
    for(var index in ranks){
        if(rankTierInfo.indexOf(ranks[index]) != -1){
            loginPacket.currentRank = ranks[index];
            break;
        }
    }
    loginPacket.head = "user";
    loginPacket.accountId = stdout.UserInfo.userId;
	loginPacket.nickname = stdout.UserInfo.displayName;
    loginPacket.lastRank = stdout.UserInfo.lastSeasonRank;
    loginPacket.serverName = stdout.UserInfo.serverName;
    //{head: "user", accountId: 2936285067, nickname: "Spa丶", lastRank: "UNRANKED", currenRank: "SILVER", serverName: "外服"}
    return loginPacket;
}

function processRoomPacket(stdout){
    var roomPacket = {};
    roomPacket.head = "room";
    // stdout = stdout.BattleInfo.gameData;
    // roomPacket.myTeam = stdout.teamOne;
    // roomPacket.theirTeam = stdout.teamTwo;
    roomPacket.myTeam = stdout.BattleInfo.gameData.teamOne;
    roomPacket.theirTeam = stdout.BattleInfo.gameData.teamTwo;
    return roomPacket;
}

function processResultPacket(stdout){
    var resultPacket = {};
    resultPacket.head = "result";
    resultPacket.accountId = stdout.accountId;
    resultPacket.gameMode = stdout.gameMode;
    resultPacket.gameType = stdout.gameType;
    if(stdout.teams[0].players[0].stats.WIN == 1){
        resultPacket.win = "yes";
    }else{
		resultPacket.win = "no";
    }
    resultPacket.participants = [];

    var team1 = stdout.teams[0].players;
    for(var playerIndex in team1){
        var player = {};
        player.accountId = team1[playerIndex].summonerId;
        player.stats = {};
        player.stats.kill = team1[playerIndex].stats.CHAMPIONS_KILLED;
        player.stats.damage = team1[playerIndex].stats.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS;
        player.stats.damageTaken = team1[playerIndex].stats.TOTAL_DAMAGE_TAKEN;
        player.stats.heal = team1[playerIndex].stats.TOTAL_HEAL;
        player.stats.goldEarned = team1[playerIndex].stats.GOLD_EARNED;
        player.stats.death = team1[playerIndex].stats.NUM_DEATHS;
        player.stats.assists= team1[playerIndex].stats.ASSISTS;
        resultPacket.participants.push(player);
    }

    var team2 = stdout.teams[1].players;
    for(var playerIndex in team2){
        var player = {};
        player.accountId = team2[playerIndex].summonerId;
        player.stats = {};
        player.stats.kill = team2[playerIndex].stats.CHAMPIONS_KILLED;
        player.stats.damage = team2[playerIndex].stats.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS;
        player.stats.damageTaken = team2[playerIndex].stats.TOTAL_DAMAGE_TAKEN;
        player.stats.heal = team2[playerIndex].stats.TOTAL_HEAL;
        player.stats.goldEarned = team2[playerIndex].stats.GOLD_EARNED;
        player.stats.death = team2[playerIndex].stats.NUM_DEATHS;
        player.stats.assists= team2[playerIndex].stats.ASSISTS;
        resultPacket.participants.push(player);
    }

    return resultPacket;
}

//exports.grabLOLData("login", null);
//exports.grabLOLData("room", null);
//exports.grabLOLData("result", null);