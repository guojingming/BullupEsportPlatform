$(document).ready(function () {
    function replace_em(str){
        str = str.replace(/\</g,'&lt;');
        str = str.replace(/\>/g,'&gt;');
        str = str.replace(/\n/g,'<br/>');
        str = str.replace(/\[em_([0-9]*)\]/g,'<img src="media/arclist/$1.gif" border="0" />');
      
        return str;
    }
    $('.emotion').qqFace({
        id: 'facebox',
        assign: 'saytext',
        path: 'media/arclist/' //表情存放的路径

    });

    //发送消息
    function psMsg(){
        if(userInfo == null){
            bullup.alert("请先登录");
            return ;
        }
        var $Msg = document.getElementById('saytext').value;
      
        if($Msg == ""){
            setTimeout(function () {
                $('#saytext').val('');
            },1);
            return;
        }
        var $msg1 = replace_em($Msg);
        var $chatName=userInfo.name; 
        socket.emit('chatMsg', {	
            chatMsg:$msg1,
            chatName:$chatName,
            userIconId:userInfo.avatarId
        });
        setTimeout(function () {
            $('#saytext').val('');
        },1);
    }
    $("#saytext").keypress(function(event){
        if(event.which == 13) { 
           
            psMsg();
        }
    });

    $('#sub_btn').on('click', function () {		
        psMsg();
    });
});