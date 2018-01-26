$().ready(function () {
$('#查看赛事按钮').on('click',function () {
       socket.emit('checkMatch',{
            userId: userInfo.userId
       });
});
});