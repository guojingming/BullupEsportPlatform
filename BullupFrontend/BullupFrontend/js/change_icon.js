$().ready(function(){
    $('.moda li').on('click', function () {
        var modai = $(this).index();
        var modimg = $('.moda img').eq(modai).attr('src'); 
        modimg = modimg.substr(modimg.lastIndexOf('/') + 1);
        var newIconId = parseInt(modimg.substr(0, modimg.lastIndexOf('.png')));
        userInfo.avatarId = newIconId;
        socket.emit('iconIdUpdate', {
            'userId': userInfo.userId,
            'newIconId': newIconId
        });
    });
})
