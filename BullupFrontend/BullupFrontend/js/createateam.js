
$().ready(function(){
   //创建队伍路由
     $('.play_href').on('click', function(e){
        
         e.preventDefault();
        
         bullup.loadTemplateIntoTarget('swig_team.html', {}, 'main-view');
        
        
      });
      //等待比赛查看队员路由
      $('.check').on('click', function(e){
        
         e.preventDefault();
        
         bullup.loadTemplateIntoTarget('swig_checkthelist.html', {}, 'main-view');
      
    })
        
      });
      //结束查看排行路由
      $('.ranking').on('click', function(e){
        
         e.preventDefault();
        
         bullup.loadTemplateIntoTarget('swig_toprank.html', {}, 'main-view');
        
        
      });
      
    
     
  });
   

     