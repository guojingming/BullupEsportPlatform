$('#router_rank').on('click', function(e){
    e.preventDefault();
    socket.emit('rankRequest');
});

