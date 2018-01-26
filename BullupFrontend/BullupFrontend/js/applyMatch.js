$().ready(function () {
    $('#apply').on('click', function () {
    // var getsign = $(this).closest('#getsign-up');
    var data = $('#sign-up').text();
    var userId =userInfo.userId;
    socket.emit('signup',  {
        userId : userId,
        matchId:data
        })
    });
    });
