var superagent = require('superagent');
var cheerio = require('cheerio');

exports.executeCrawler = function(username,area,gameIndex,callback){
    //api
    const myUrl = 'https://pubg.op.gg/user/'+username+'?server='+area;
    console.log('url:',myUrl);
    //大区代号
    //const serverList = ['na', 'as', 'krjp', 'sea', 'oc', 'eu', 'sa']
    //处理空格
    function replaceText(text){
        return text.replace(/\n/g, "").replace(/\s/g, "");
    }
    //开始爬取
    superagent
        .get(myUrl)
        .set('user-agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36')
        .end(function(err,res){
            if (err) throw err;
            let $ = cheerio.load(res.text);
            let data = {};
            //获取数据
            let two = $('.container [data-selector="game-info"]').html();
            $ = cheerio.load(two);
            let nthChild = 1;//2,3,4,5,6.....
            let three = $('.user-content-layer__matches-content div:nth-child(1) [data-selector="total-played-game-list"] [data-selector="total-played-game-item"]:nth-child('+nthChild+')').html();
            
            //console.log(two);
            //判断用户在该区是否有游戏记录
            //let three = $('.content__inner .overview .overview__row [data-selector="game-info"] div:nth-child(2) [data-selector="total-played-game"]').children().length;
            //console.log(three);

            $ = cheerio.load(three);
            //用户名
            data.nickname = username;

            //游戏模式(单排Solo、双排Duo、四排Squad)
            data.gameMode = replaceText($('.matches-item__column--status div:nth-child(1) i').text());
            
            //队友
            // if(data.gameMode != 'Solo'){
            //     data.team = $('.played-game .played-game__summary .played-game__column--team .played-game__btn--members')
            // }

            //游戏开始时间
            data.startTime = $('.matches-item__column--status div:nth-child(2)').attr('data-ago-date');
            
            //游戏持续时间
            data.gameLength = $('.matches-item__column--status div:nth-child(3)').attr('data-game-length');
            
            //我在这场游戏中的排名
            data.rank = $('.matches-item__column--rank div .matches-item__ranking').text();//.substring(0,6);
            
            //击杀数目
            data.kill = $('.matches-item__column--kill div:nth-child(1)').text();
            
            //伤害
            data.damage = $('.matches-item__column--damage div:nth-child(1)').text();
            
            //移动距离
            data.distance = replaceText($('.matches-item__column--distance div:nth-child(1)').text());
            
            //治疗次数
            data.heal = replaceText($('[data-selector="detail-played-game"] [data-index="0"] .matches-detail__l-td--survival li:nth-child(1) .matches-detail__value').text().substring(0,1));
            
            //增强次数
            data.aid = replaceText($('[data-selector="detail-played-game"] [data-index="0"] .matches-detail__l-td--survival li:nth-child(1) .matches-detail__value').text().substring(3));
            
            //复活次数
            data.revival = replaceText($('[data-selector="detail-played-game"] [data-index="0"] .matches-detail__l-td--survival li:nth-child(2) .matches-detail__value').text());
            
            //助攻
            data.assist = replaceText($('[data-selector="detail-played-game"] [data-index="0"] .matches-detail__l-td--combat li:nth-child(3) .matches-detail__value').text());
            
            //击晕
            data.makeDizzy = replaceText($('[data-selector="detail-played-game"] [data-index="0"] .matches-detail__l-td--combat li:nth-child(4) .matches-detail__value').text());
            
            callback(data);
            //console.log(data);
            // var localDate = new Date();
            // console.log('my',localDate);
            // var remoteDate = new Date(data.startTime);
            // console.log('that',remoteDate);
            // console.log('res',localDate-remoteDate);
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