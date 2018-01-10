$().ready(function(){
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
   $("#starter-match-btn_no").on("click",function(event){
    if(userInfo == null ){
        $('.login_pubg_btn').show();
        $('.bind_pubg_btn').hide();
        $('.create_pubg_btn').hide();
       }else{
         //userInfo.pubg = {a:"a"};
         if(userInfo.pubgAccount == undefined || userInfo.pubgAccount == null){
            $('.login_pubg_btn').hide();
            $('.bind_pubg_btn').show();
            $('.create_pubg_btn').hide();
         }else{
          $('.login_pubg_btn').hide();
          $('.bind_pubg_btn').hide();
          $('.create_pubg_btn').show();
          $('#pubgAccount').html(userInfo.pubgAccount);
         }
       }
   });
   $('#login_pubg').on("click",(event)=>{
    $('#create_pubg_modall').modal("close");
    $('#log_modal').modal("open");
   });
});