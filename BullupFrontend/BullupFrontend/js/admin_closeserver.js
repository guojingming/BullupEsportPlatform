$(document).ready(function(){
    $('#admin_closesever_btn').on('click', function(){
        socket.emit('adminCloseServer', null);
    });
});