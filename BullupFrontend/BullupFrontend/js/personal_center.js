$(document).ready(function(){
    //#id  换成实际的那个个人中心 a标签的ID
    $('#home').on('click',function(){
        //这里发送消息
        // userInfo 是客户端维护的全局变量  client.js中维护  当登录成功后userInfo里面有值 
        //var userInfo={};
        if(userInfo==null){
            bullup.alert("您没有登录，请登录!");
            //location.href = '#log_modal';
        }else if(userInfo.lolAccountInfo == undefined){
            bullup.alert("您没有绑定LOL账号，无法查看战力!");
        }else{
            socket.emit('pesonalCenterRequest',userInfo);
        }  
    });
});