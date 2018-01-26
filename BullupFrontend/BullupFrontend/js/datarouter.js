$('#xiug_wang').click(function (e) {
    alert(1)
   e.preventDefault();
   bullup.loadTemplateIntoTarget('swig_index.html', {}, 'container');
   
})