$('.agree').on('click', function(e){
    e.preventDefault();
    var getRow = $(this).closest('.keyRow');
    var data = $(getRow).find('.keyColumn').text();
    var $state = $(getRow).find('.state').text();
    if($state == '未处理'){
        socket.emit('agree',{
            payId:data
        });
        var $state = $(getRow).find('.state').text('已完成');
    }else{
        bullup.alert('已处理，请不要重复操作');
    }
    
});

$('.disagree').on('click', function(e){
    e.preventDefault();
    var getRow = $(this).closest('.keyRow');
    var $data = $(getRow).find('.keyColumn').text();
    var $money = $(getRow).find('.money').text();
    var $userId = $(getRow).find('.userId').text();
    var $state = $(getRow).find('.state').text();
    
     //alert($data+' '+$money+' '+$userId);
    if($state == '未处理'){
        socket.emit('disagree',{
            payId:$data,
            money:$money,
            userId:$userId
        });
        var $state = $(getRow).find('.state').text('已驳回');
    }else{
        bullup.alert('已处理，请不要重复操作');
    }
   
    
});