$('.suspend').on('click', function(e){
    e.preventDefault();
    var getRow = $(this).closest('.keyRow');
    var $userId = $(getRow).find('.userId').text();
    //alert($userId);
    socket.emit('suspend',{
        userId:$userId
    });
});
$('.unblock').on('click', function(e){
    e.preventDefault();
    var getRow = $(this).closest('.keyRow');
    var $userId = $(getRow).find('.userId').text();
        
    socket.emit('unblock',{
        userId:$userId
    });
});