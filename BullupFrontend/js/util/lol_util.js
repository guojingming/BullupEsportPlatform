var request = require('request');
var async = require('async');
var lolcfg = require('./lol_cfg.js');
var logUtil = require('./log_util.js');
var fs = require('fs');


exports.apiKey = "RGAPI-010be30f-ea24-4132-949d-ee4fec7d4b04";

//var apiKey = fs.readFileSync("./others/dat").toString();

function getItemsStaticData(callback){
    var options = {
        url: 'https://na1.api.riotgames.com/lol/static-data/v3/items?locale=zh_CN',
        headers: {
            "Origin": "https://developer.riotgames.com",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": exports.apiKey,
            "Accept-Language": "zh-CN,zh;q=0.8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
        }
    };
    request(options, function(error, response, body){
        bodyObj = JSON.parse(body);
        var dataObj = bodyObj.data;
        callback(dataObj);
    });
}

function getChampionsStaticData(callback){
    var options = {
        url: 'https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=zh_CN&dataById=true',
        headers: {
            "Origin": "https://developer.riotgames.com",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": exports.apiKey,
            "Accept-Language": "zh-CN,zh;q=0.8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
        }
    };
    request(options, function(error, response, body){
        bodyObj = JSON.parse(body);
        var dataObj = bodyObj.data;
        callback(dataObj);
    });
}

function getSummonerByName(name, callback){
    var options = {
        url: 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+name,
        headers: {
            "Origin": "https://developer.riotgames.com",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": exports.apiKey,
            "Accept-Language": "zh-CN,zh;q=0.8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
        }
    };
   
    request(options, function(error, response, body){
        bodyObj = JSON.parse(body);
        callback(bodyObj);
    });
}

function getMatchesListByAccountId(accountId, callback){
    // var startTime = (new Date(startTimeStr)).getTime(); 
    // var endTime = (new Date(endTimeStr)).getTime();
    var options = {
        url: 'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + accountId + '/recent',
        headers: {
            "Origin": "https://developer.riotgames.com",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": exports.apiKey,
            "Accept-Language": "zh-CN,zh;q=0.8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
        }
    };
    request(options, function(error, response, body){
        bodyObj = JSON.parse(body);
        callback(bodyObj);
    });
}

function getMatchDetailsByGameId(gameId, callback){
    var options = {
        url: 'https://na1.api.riotgames.com/lol/match/v3/matches/' + gameId,
        headers: {
            "Origin": "https://developer.riotgames.com",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": exports.apiKey,
            "Accept-Language": "zh-CN,zh;q=0.8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
        }
    };
    request(options, function(error, response, body){
        bodyObj = JSON.parse(body);
        callback(bodyObj);
    });
}

exports.getRecentMatchDetailsBySummonerName = function(name, callback){
    
    getSummonerByName(name, function(summonerInfo){
        var options = {
            url: 'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/'+ summonerInfo.accountId +'/recent',
            headers: {
                "Origin": "https://developer.riotgames.com",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Riot-Token": exports.apiKey,
                "Accept-Language": "zh-CN,zh;q=0.8",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36"
            }
        };
        request(options, function(error, response, body){
            bodyObj = JSON.parse(body);
            callback(bodyObj);
        }); 
    });
}
function getMatchesListByAccountIdAndTime(accountId, startTimeStr, endTimeStr, callback){
    var startTime = (new Date(startTimeStr)).getTime(); 
    var endTime = (new Date(endTimeStr)).getTime();
    var options = {
        url: 'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + accountId + '?beginTime=' + startTime + '&endTime=' + endTime,
        headers: {
            "Origin": "https://developer.riotgames.com",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": exports.apiKey,
            "Accept-Language": "zh-CN,zh;q=0.8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
        }
    };
    request(options, function(error, response, body){
        bodyObj = JSON.parse(body);
        callback(bodyObj);
    });
}
exports.getMatchDetailsBySummonerName = function(name,callback){
    console.log(name);
    async.waterfall([
        function(done){
            getSummonerByName(name, function(summoner){
                
                done(null, summoner);
            });
        },
        function(summoner, done){
            if(summoner.accountId == undefined){
                callback(null);
            }else{
                getMatchesListByAccountId(summoner.accountId,function(gameList){
                    if(gameList.matches == null){
                        done(gameList);
                    }
                    done(null, summoner, gameList);
                });
            }
        },
        function(summoner, gameList, done){
            var matchDetails = {};
            async.eachSeries(gameList.matches, function(match, errCb){
                getMatchDetailsByGameId(match.gameId, function(details){
                    matchDetails[match.gameId] = details;
                    errCb();
                });
            }, function(err) {
                if (err) console.log(err);
                matchDetails.summoner = summoner;
                done(null, matchDetails);
            });
        }
    ],function(err,matchDetails){
        if(err){
            var errorMsg = {
                errorTitle: "no data"
            };
            callback(errorMsg);

        }
        var count = 0;
        var result = {};
        result.matches =[];
       
        for(var gameId in matchDetails){
            if(gameId == 'summoner'){
                continue;
            }
            var match = matchDetails[gameId];
            var mainPlayerParticipantId;
            result.matches[count] = {};
            result.matches[count].name = matchDetails.summoner.name;
            result.matches[count].gameMode = match.gameMode;
            result.matches[count].gameType = match.gameType;
            var date = new Date(match.gameCreation);
            var Month = date.getMonth()+1;
            result.matches[count].time = date.getFullYear() + '/' + Month + '/' + date.getDate();
            result.matches[count].paticipants = [];

            var paticipantCount = 0;
            var paticipantIds = [];
            for(var index in match.participantIdentities){
                paticipantIds[paticipantCount] = match.participantIdentities[index].player.participantId;
                if(result.matches[count].name == match.participantIdentities[index].player.summonerName){
                    mainPlayerParticipantId = match.participantIdentities[index].participantId;
                }
                paticipantCount++;
            }

            paticipantCount = 0;
            for(var index in match.participants){
                if(match.participants[index].participantId == mainPlayerParticipantId){
                    result.matches[count].championId = match.participants[index].championId;
                    result.matches[count].championChineseName = lolcfg.getChampionChineseNameById(match.participants[index].championId);
                    result.matches[count].championEnglishName = lolcfg.getChampionEnglishNameById(match.participants[index].championId);
                    if(match.participants[index].stats.win){
                        result.matches[count].win = '胜利';
                    }else{
                        result.matches[count].win = '失败';
                    }
                    result.matches[count].kda = match.participants[index].stats.kills + '/' + match.participants[index].stats.deaths + '/' + match.participants[index].stats.assists;

                }
                result.matches[count].paticipants[paticipantCount] = {};
                result.matches[count].paticipants[paticipantCount].name = match.participantIdentities[match.participants[index].participantId - 1].player.summonerName;
                result.matches[count].paticipants[paticipantCount].kda = match.participants[index].stats.kills + '/' + match.participants[index].stats.deaths + '/' + match.participants[index].stats.assists;
                result.matches[count].paticipants[paticipantCount].kdaScore = ((match.participants[index].stats.kills + match.participants[index].stats.assists) / (match.participants[index].stats.deaths + 1.2)).toFixed(1);
                result.matches[count].paticipants[paticipantCount].damage = match.participants[index].stats.totalDamageDealtToChampions;
                result.matches[count].paticipants[paticipantCount].damageTaken = match.participants[index].stats.totalDamageTaken;
                result.matches[count].paticipants[paticipantCount].goldEarned = match.participants[index].stats.goldEarned;
                result.matches[count].paticipants[paticipantCount].championEnglishName = lolcfg.getChampionEnglishNameById(match.participants[index].championId);
                result.matches[count].paticipants[paticipantCount].items = {};
                result.matches[count].paticipants[paticipantCount].items['item0'] = match.participants[index].stats.item0;
                result.matches[count].paticipants[paticipantCount].items['item1'] = match.participants[index].stats.item1;
                result.matches[count].paticipants[paticipantCount].items['item2'] = match.participants[index].stats.item2;
                result.matches[count].paticipants[paticipantCount].items['item3'] = match.participants[index].stats.item3;
                result.matches[count].paticipants[paticipantCount].items['item4'] = match.participants[index].stats.item4;
                result.matches[count].paticipants[paticipantCount].items['item5'] = match.participants[index].stats.item5;
                result.matches[count].paticipants[paticipantCount].items['item6'] = match.participants[index].stats.item6;
                paticipantCount++;
            }
            count++;
        }
        //console.log(result);
        callback(result);
    });
};

exports.getMatchDetailsBySummonerNameAndTime = function(name,startTime,endTime,callback){
    async.waterfall([
        function(done){
            getSummonerByName(name, function(summoner){
                
                done(null, summoner);
            });
        },
        function(summoner, done){
            if(summoner.accountId == undefined){
                callback(null);
            }else{
                getMatchesListByAccountIdAndTime(summoner.accountId, startTime, endTime, function(gameList){
                    if(gameList.matches == null){
                        done(gameList);
                    }
                    done(null, summoner, gameList);
                });
            }
        },
        function(summoner, gameList, done){
            var matchDetails = {};
            async.eachSeries(gameList.matches, function(match, errCb){
                getMatchDetailsByGameId(match.gameId, function(details){
                    matchDetails[match.gameId] = details;
                    errCb();
                });
            }, function(err) {
                if (err) console.log(err);
                matchDetails.summoner = summoner;
                done(null, matchDetails);
            });
        }
    ],function(err,matchDetails){
        if(err){
            var errorMsg = {
                errorTitle: "no data"
            };
            callback(errorMsg);

        }
        var count = 0;
        var result = {};
        result.matches =[];
       
        for(var gameId in matchDetails){
            if(gameId == 'summoner'){
                continue;
            }
            var match = matchDetails[gameId];
            var mainPlayerParticipantId;
            result.matches[count] = {};
            result.matches[count].name = matchDetails.summoner.name;
            result.matches[count].gameMode = match.gameMode;
            result.matches[count].gameType = match.gameType;
            var date = new Date(match.gameCreation);
            var Month = date.getMonth()+1;
            result.matches[count].time = date.getFullYear() + '/' + Month + '/' + date.getDate();
            result.matches[count].paticipants = [];

            var paticipantCount = 0;
            var paticipantIds = [];
            for(var index in match.participantIdentities){
                paticipantIds[paticipantCount] = match.participantIdentities[index].player.participantId;
                if(result.matches[count].name == match.participantIdentities[index].player.summonerName){
                    mainPlayerParticipantId = match.participantIdentities[index].participantId;
                }
                paticipantCount++;
            }

            paticipantCount = 0;
            for(var index in match.participants){
                if(match.participants[index].participantId == mainPlayerParticipantId){
                    result.matches[count].championId = match.participants[index].championId;
                    result.matches[count].championChineseName = lolcfg.getChampionChineseNameById(match.participants[index].championId);
                    result.matches[count].championEnglishName = lolcfg.getChampionEnglishNameById(match.participants[index].championId);
                    if(match.participants[index].stats.win){
                        result.matches[count].win = '胜利';
                    }else{
                        result.matches[count].win = '失败';
                    }
                    result.matches[count].kda = match.participants[index].stats.kills + '/' + match.participants[index].stats.deaths + '/' + match.participants[index].stats.assists;

                }
                result.matches[count].paticipants[paticipantCount] = {};
                result.matches[count].paticipants[paticipantCount].name = match.participantIdentities[match.participants[index].participantId - 1].player.summonerName;
                result.matches[count].paticipants[paticipantCount].kda = match.participants[index].stats.kills + '/' + match.participants[index].stats.deaths + '/' + match.participants[index].stats.assists;
                result.matches[count].paticipants[paticipantCount].kdaScore = ((match.participants[index].stats.kills + match.participants[index].stats.assists) / (match.participants[index].stats.deaths + 1.2)).toFixed(1);
                result.matches[count].paticipants[paticipantCount].damage = match.participants[index].stats.totalDamageDealtToChampions;
                result.matches[count].paticipants[paticipantCount].damageTaken = match.participants[index].stats.totalDamageTaken;
                result.matches[count].paticipants[paticipantCount].goldEarned = match.participants[index].stats.goldEarned;
                result.matches[count].paticipants[paticipantCount].championEnglishName = lolcfg.getChampionEnglishNameById(match.participants[index].championId);
                result.matches[count].paticipants[paticipantCount].items = {};
                result.matches[count].paticipants[paticipantCount].items['item0'] = match.participants[index].stats.item0;
                result.matches[count].paticipants[paticipantCount].items['item1'] = match.participants[index].stats.item1;
                result.matches[count].paticipants[paticipantCount].items['item2'] = match.participants[index].stats.item2;
                result.matches[count].paticipants[paticipantCount].items['item3'] = match.participants[index].stats.item3;
                result.matches[count].paticipants[paticipantCount].items['item4'] = match.participants[index].stats.item4;
                result.matches[count].paticipants[paticipantCount].items['item5'] = match.participants[index].stats.item5;
                result.matches[count].paticipants[paticipantCount].items['item6'] = match.participants[index].stats.item6;
                paticipantCount++;
            }
            count++;
        }
        //console.log(result);
        callback(result);
    });
};



        /*
    //-------------------------------result-data-example----------------------------------/
        {
            "matches" : [
                {
                    "name" : "Who is 55Kai",
                    "championId" : "1",
                    "championChineseName" : "黑暗之女",
                    "championEnglishName" : "Annie",
                    "gameMode" : "CLASSIC",
                    "gameType" : "MATCHED_GAME",
                    "time" : "2017-05-09 15:34:03",
                    "kda" : "13/0/9",
                    "win" : true,
                    "paticipants" : [
                        {
                            "name" : "Who is 55Kai",
                            "kda" : "13/0/9",
                            "kdaScore" : "13.5",
                            "damage" : "20000",
                            "damageTaken": "15000",
                            "goldEarned" : "12000",
                            "items" : {
                                "item0" : 1,
                                "item1" : 1,
                                "item2" : 1,
                                "item3" : 1,
                                "item4" : 1,
                                "item5" : 1,
                                "item6" : 1
                            }
                        }
                        ...
                    ]

                }
                ...
            ]
        }
    */

//--------------------------------------test--------------------------------------------/

// exports.getMatchDetailsBySummonerName('Who is 55Kai', '2017/11/29', '2017/11/30', function(matchDetails){
//     console.log(matchDetails)
// });


// getSummonerByName("JMGuo", function(info){
//     console.log("JMGuo's info : " + JSON.stringify(info));
// });

// getChampionsStaticData(function(obj){
//     var count = 0;
//     for(var index in obj){
//         count++;
//         console.log("id:" + obj[index].id + " name:" + obj[index].name);
//     }
//     console.log(count);
// });

// getItemsStaticData(function(obj){
//     for(var index in obj){
//         console.log("id:" + obj[index].id + " name:" + obj[index].name);
//     }
// });

// getRecentMatchesListByAccountId(220718535, function(matches){
//     console.log(matches.matches[0].champion);
//     console.log(matches.matches[0].gameId);
// });

// getMatchDetailsByGameId(2564449052, function(gameInfo){
//     console.log(JSON.stringify(gameInfo));
// });


