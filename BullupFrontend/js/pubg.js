$().ready(function(){
  //选择击杀人数，更改赔率
   $('.dropdown-content li').on("click",function(event){
       var odds = $('.odds_click .select-dropdown').val();
       if(odds == 1){
         $('.odds .select-dropdown').val("1:0.1");            
       }else if(odds == 2){
         $('.odds .select-dropdown').val("1:0.2");        
       }else if(odds == 3){
         $('.odds .select-dropdown').val("1:1");           
       }
   });
   $('#bind_pubg').on('click',function(event){
       event.preventDefault();
       if(userInfo == null){
         $('#create_pubg_modall').modal("close");
          bullup.alert("请先登录");
          return;  
      }
       $('#create_pubg_modall').modal("close");
       $("#bind_pubg_modal").modal("open");
   });
   
   //判断用户是否登陆 是否绑定  
   $(document).on("click",".starter-match-btn_no",function(event){
    $("#starter-match-btn_no").click();
    if(userInfo == null ){
        $('.login_pubg_btn').show();
        $('.bind_pubg_btn').hide();
        $('.create_pubg_btn').hide();
       }else{
        //userInfo.pubg = {a:"a"};
         //判断用户是否绑定
         if(userInfo.pubg == undefined || userInfo.pubg == null){
            $('.login_pubg_btn').hide();
            $('.bind_pubg_btn').show();
            $('.create_pubg_btn').hide();
         }else{
          $('.login_pubg_btn').hide();
          $('.bind_pubg_btn').hide();
          $('.create_pubg_btn').show();
         }
       }
   });
   //点击弹出登录框
   $('#login_pubg').on("click",(event)=>{
    $('#create_pubg_modall').modal("close");
    $('#log_modal').modal("open");
   });

   //点击进行游戏
   $('#confirm_create_pubg_room_btn').on('click',(event)=>{
      handlePubgResult();
      $('.modal').modal('close');
      $('.pubg_time_control').FlipClock(3600, {
        clockFace: 'MinuteCounter',
        countdown: true
      });
   });
  //  setTimeout(()=>{
  //     $('.modal').modal('close');
  //     $('.pubg_time_control').FlipClock(3600, {
  //       clockFace: 'MinuteCounter',
  //       countdown: true
  //     });
  //   },10000);
      
     $("#bind_pubg_account_btn").on("click",(event)=>{
       $("#pubg_waiting_modal").modal("open");
        setTimeout(()=>{
          $('.modal').modal('close');
          userInfo.pubg = {a:"a"};
          bullup.alert("绑定成功");
        },10000);
     });
  });