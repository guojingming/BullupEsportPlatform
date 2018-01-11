var superagent = require('superagent');
var cheerio = require('cheerio');

exports.executeCrawler = function(username,area){
    //api
    var myUrl = 'https://pubg.op.gg/user/'+username+'?server='+area;
    console.log(myUrl);
    //大区代号
    //const serverList = ['na', 'as', 'krjp', 'sea', 'oc', 'eu', 'sa']
    //处理空格
    function replaceText(text){
        return text.replace(/\n/g, "").replace(/\s/g, "");
    }
    //开始爬取
    superagent
        .get(myUrl)
        .end(function(err,res){
            if (err) throw err;
            var $ = cheerio.load(res.text);
            var data = {};
            //获取数据
            var two = $('.container div:nth-child(9)').html();
            $ = cheerio.load(two);
            var three = $('.content__inner .overview .overview__row [data-selector="game-info"] div:nth-child(2) [data-selector="total-played-game"] [data-selector="total-played-game-list"] li').first().html();
            //判断用户在该区是否有游戏记录
            //let three = $('.content__inner .overview .overview__row [data-selector="game-info"] div:nth-child(2) [data-selector="total-played-game"]').children().length;
            //console.log(three);
            $ = cheerio.load(three);
            //用户名
            data.nickname = username;
            //游戏模式(单排Solo、双排Duo、四排Squad)
            data.gameMode = replaceText($('.played-game .played-game__summary .played-game__column--status div:nth-child(1) i').text());
            //队友
            // if(data.gameMode != 'Solo'){
            //     data.team = $('.played-game .played-game__summary .played-game__column--team .played-game__btn--members')
            // }
            //游戏开始时间
            data.startTime = $('.played-game .played-game__summary .played-game__column--status div:nth-child(2)').attr('data-ago-date');
            //游戏持续时间
            data.gameLength = $('.played-game .played-game__summary .played-game__column--status div:nth-child(3)').attr('data-game-length');
            //我在这场游戏中的排名
            data.rank = $('.played-game .played-game__summary .played-game__column--rank div .played-game__ranking').text();//.substring(0,6);
            //击杀数目
            data.kill = $('.played-game .played-game__summary .played-game__column--kill div:nth-child(1)').html();
            //总伤害
            data.damage = $('.played-game .played-game__summary .played-game__column--damage div:nth-child(1)').html();
            //移动距离
            data.distance = replaceText($('.played-game .played-game__summary .played-game__column--distance div:nth-child(1)').html());
            //治疗次数
            data.heal = replaceText($('.played-game .played-game__detail div:nth-child(1) div .played-game-statistics__l-table div:nth-child(3) ul li:nth-child(1) .played-game-statistics__value').text().substring(0,1));
            //增强次数
            data.aid = replaceText($('.played-game .played-game__detail div:nth-child(1) div .played-game-statistics__l-table div:nth-child(3) ul li:nth-child(1) .played-game-statistics__value').text().substring(3));
            //复活次数
            data.revival = replaceText($('.played-game .played-game__detail div:nth-child(1) div .played-game-statistics__l-table div:nth-child(3) ul li:nth-child(2) .played-game-statistics__value').text());
            //助攻
            data.assist = replaceText($('.played-game .played-game__detail div:nth-child(1) div .played-game-statistics__l-table div:nth-child(1) ul li:nth-child(3) .played-game-statistics__value').text());
            //击晕
            data.makeDizzy = replaceText($('.played-game .played-game__detail div:nth-child(1) div .played-game-statistics__l-table div:nth-child(1) ul li:nth-child(4) .played-game-statistics__value').text());
            console.log(data);
        });
}

exports.pubgBindCheck = function(username,callback){
    //api
    var myUrl = 'https://pubg.op.gg/user/'+username;
    console.log(myUrl);
    //开始爬取
    superagent
        .get(myUrl)
        .end(function(err,res){
            if (err) throw err;
            var $ = cheerio.load(res.text);
            //获取数据
            var message = $('.container div:nth-child(1) .not-found__desc').text().substring(37);
            console.log('this is two',message);
            var status = false;
            if(message.length != 0){
                status = false;
            }else{
                status = true;
            }
            callback(status);
        });
}