var bindCheck = require('./js/pubg_crawler.js');

$().ready(function(){
    $('#bindBtn').on('click',function(e){
        var $nickname = $('#pubg_nickname').val();
        $("#pubg_waiting_modal").modal("open");
        bindCheck.pubgBindCheck($nickname,function(res){
            console.log(res);
            if(res == false){
                bullup.alert('未查询到该玩家，请确认输入的用户名有效');
            }else{
                socket.emit('pubgBind',{
                    userId: userInfo.userId,
                    nickname: $nickname
                });
            }
        });
    });
});