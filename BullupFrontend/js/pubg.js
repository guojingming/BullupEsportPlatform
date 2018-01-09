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
       $('#create_pubg_modall').modal("close");
       $("#bind_pubg_modal").modal("open");
   });
   $("#create_pubg_modall").on("click",function(event){
       if(userInfo != null){
        $('.bind_pubg_btn').hide();
        $('.create_pubg_btn').show();
       }else{
        $('.bind_pubg_btn').show();
        $('.create_pubg_btn').hide();
       }
   });
});