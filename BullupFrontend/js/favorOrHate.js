
$('#dianzan').on('click',function(e){
    var battleResHtml = bullup.loadSwigView('./swig_battlereTest.html', {
        battle_res: null
    });
    //页面跳转到结果详情页
    $('#main-view').html(battleResHtml);
});

$('.favor').on('click',function(e){
    var getRow = $(this).closest('li');
    var data = $(getRow).find('span').text();
    alert(data);
    socket.emit('dianzan',{
        type: 'favor',
        userId: userInfo.userId,
        myName: userInfo.name,
        theyName: data
    });
});

$('.hate').on('click',function(e){
    var getRow = $(this).closest('li');
    var data = $(getRow).find('span').text();
    alert(data);
    socket.emit('dianzan',{
        type: 'hate',
        userId: userInfo.userId,
        myName: userInfo.name,
        theyName: data
    });
});