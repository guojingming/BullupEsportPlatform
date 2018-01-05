var express = require('express');
var stripe = require('stripe')('sk_live_ab9ElRvzqrwSPDJV93LQky8E');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");

var dependencyUtil = require("../util/dependency_util.js");
dependencyUtil.init(__dirname.toString().substr(0, __dirname.length - "/service".length).replace(/\\/g, "/"));

var socketService = dependencyUtil.global.service.socketService;

var wealthInfoDao = dependencyUtil.global.dao.wealthInfoDao;

exports.recharge = function(){
    app.set('view engine','hbs');
    app.set('views',__dirname + '/views');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
    var path = 'C:/Users/Administrator/Desktop/zuixin/BullupEsportPlatform/BullupBackend/other/';    
    app.post('/',function(req,res){
        //var str = req.url.substr(req.url.indexOf('?'), req.url.indexOf('=') - req.url.indexOf('?'));
        var rechargeValue = req.body.rechargeAccount;
        var userId = req.body.userId;
        var data = fs.readFileSync(path + 'index.hbs').toString();
        data = data.replace("chargeAmountValue", String(Number.parseInt(rechargeValue) * 100));
        data = data.replace("chargeAmountValueHidden", String(Number.parseInt(rechargeValue) * 100));
        data = data.replace("userNameValue", String(userId));
        fs.writeFileSync(path + 'temp.hbs', data);
        //每次合并代码应将此路径改为自己的
        res.sendFile(path + 'temp.hbs');
        
    });
    
    
    app.post("/charge",function(req,res){
        var body = req.body;
        var token = req.body.stripeToken;
        var chargeAmount = req.body.chargeAmount;
        var userId = req.body.userName;
        
        console.log(token);
        
        var charge = stripe.charges.create({
            amount:chargeAmount,
            currency:'usd',
            source:token,
        }, function(err, charge) {
            // asynchronously called
            if(err){
                var socket = socketService.mapUserIdToSocket(userId);
                var data = {};
                data.userId = Number.parseInt(userId);
                data.money = 0;
                data.currency = 'dolla';
                data.state=err.message;
                wealthInfoDao.userRecharge(data, function(results){
                var socket = socketService.mapUserIdToSocket(data.userId);
                socketService.stableSocketEmit(socket, "rechargeErrResult", {'err': err});
                });
                res.sendFile(path + 'charge_failed.html');
            }else{
                var data = {};
                data.userId = Number.parseInt(userId);
                data.money = Number.parseInt(chargeAmount) / 100;
                data.currency = 'dolla';
                data.state='充值成功';
                wealthInfoDao.userRecharge(data, function(results){
                    var socket = socketService.mapUserIdToSocket(data.userId);
                    if(results != null){
                        socketService.stableSocketEmit(socket, "rechargeResult", {'text': '充值成功！'});
                    }else{
                        socketService.stableSocketEmit(socket, "rechargeResult", {'text': '充值失败！请联系客服！'});
                    }
                });
                res.sendFile(path + 'charge_success.html');
            }
        });
        
    });
    
    
    app.listen(3001,function(){
        console.log('stripe is running');
    });
}

