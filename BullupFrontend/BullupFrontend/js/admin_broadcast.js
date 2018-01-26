$(document).ready(function(){
    $('#admin_broadcast_btn').on('click', function(){
        var text = $('#admin_broadcast_text').val();
        socket.emit('adminBroadcast', text);
    });
});