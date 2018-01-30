$(document).ready(function(){
    $('#charge_btn').click(function(){
        if(userInfo == null || userInfo == undefined){
            bullup.alert("请您先登录!");
            return;
        }
        var chargeValue = $('#money').val();
        var value = parseInt(chargeValue);
        if(value == NaN){
            bullup.alert("请输入合法的充值金额!");
        }else if(value < 1){
            bullup.alert("最低充值金额为$1");
        }else{
            request.post('http://bullesport.com:3001', {form:{rechargeAccount: value, userId: userInfo.userId}}, function(error, response, body){
                if(body == undefined){
                    bullup.alert('订单生产失败，请联系客服！');
                    return;
                }
                var fs = require('fs');
                fs.writeFileSync('C:/Users/Public/Bullup/temp.html', body);
               
                var htmlStr = '<iframe frameborder="0" width="800px" height="800px" src="C:/Users/Public/Bullup/temp.html"></iframe>';
                $('#main-view').html(htmlStr);
                $('#recharge').modal('close');
                fs.unlinkSync('C:/Users/Public/Bullup/temp.html');
            });
        }
    });    
});

