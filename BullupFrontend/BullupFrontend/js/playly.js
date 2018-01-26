$().ready(function(){
    $('.play_href').on('click', function(e){
       
        e.preventDefault();
        bullup.loadTemplateIntoTarget('swig_team.html', {}, 'main-view');
		
        });
    });
   

    
  