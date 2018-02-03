$().ready(function () {
    $('#feedbackInput').on('click', function (e) {
          e.preventDefault();
          if(userInfo == undefined || userInfo ==null){
              bullup.alert("未登录不能提交报告");
              return;
          }
          var $name = $('#last_named').val();
          var $email=$('#emails').val();
          var $textarea1=$('#textarea1').val();
          var $radioReason = $('input:radio:checked').val();
          var $account = userInfo.name;
          var $userId = userInfo.userId;
          //alert($account);
  
          function verifyemail(str){  
              var reg=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;  
              if( reg.test(str) ){  
                  return true;  
              }else{  
                  return false;  
              } 
          }
  
          if(verifyemail($email)==true){
              if($name.length<=15&&$name!=""){
                  if($textarea1.length<=140 && $textarea1!=""){
                      socket.emit('feedbackMessage',{
                          name:$name,
                          email:$email,
                          textarea1:$radioReason+',其他:'+$textarea1,
                          userId:$userId,
                          account:$account
                      });
                      $('#fankui').modal('close');
                  }else{
                    bullup.alert('请填写信息且字数小于140字');
                  }
              }else{
                bullup.alert('请填写正确的姓名');
              } 
          }else{
              bullup.alert('请填写正确的邮箱');
          }
      });
      $('#feedback').on('click', function () {
        $("#fankui").css("display", "none");
      });
    });
