// import { userInfo } from "os";

$().ready(function(){
    
        $('.funding').on('click', function(e){
            e.preventDefault();
            var $userId = userInfo.userId;
            var $userNickname=userInfo.name;
            //alert($userId);
            socket.emit('cashFlow',{
                userId:$userId,
                userNickname:$userNickname
            });
            //bullup.loadTemplateIntoTarget('swig_basic_table.html', {}, 'main-view');       
        });
    
        $('.update_personal_info').on('click', function(e){
            e.preventDefault();
            bullup.loadTemplateIntoTarget('swig_form_component.html', {}, 'main-view');
            $.getScript('/js/updateInfo.js');
            $('.button-collapse').sideNav('hide');           
        });
    
        $('#personal_recharge_btn').on('click', function(e){
            window.location.href = "#recharge";
        });
        
    });
       
    
        
      
        
      