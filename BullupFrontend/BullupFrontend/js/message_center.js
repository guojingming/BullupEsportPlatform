$(document).ready(function(){
    $("#message_center_nav").on('click', function(e){      
        if(!userInfo){
            bullup.alert('请登录后查看');
        }
        var messagesHtml = bullup.loadSwigView('./swig_messages.html',{
            messages: messageInfo
        });
        $("#message_center").html(messagesHtml);
        $.getScript('./js/message_operation.js');
    });    
});