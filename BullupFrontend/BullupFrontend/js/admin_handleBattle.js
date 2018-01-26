$('.changeResult').on('click', function(e){
    e.preventDefault();
    var getRow = $(this).closest('.keyRow');
    var $battleId = $(getRow).find('.battleId').text();
    var tempBlue = $(getRow).find('.blueSide').text();
    var tempRed = $(getRow).find('.redSide').text();
    var $result = $(getRow).find('.result').text();
    var $bet = $(getRow).find('.bet').text();
    //alert(result);
    if($result=='红方赢'){
        $result = '蓝方赢';
    }else{
        $result = '红方赢';
    }
    //alert(result);
    socket.emit('changeResult',{
        battleId:$battleId,
        blueSide:tempBlue,
        redSide:tempRed,
        bet:$bet,
        result:$result
    });
});