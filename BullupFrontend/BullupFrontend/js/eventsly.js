
$().ready(function(){
    $('.signup_hefr').on('click', function(e){
        e.preventDefault();
        bullup.loadTemplateIntoTarget('swig_signup.html', {}, 'main-view');
    });
});

    