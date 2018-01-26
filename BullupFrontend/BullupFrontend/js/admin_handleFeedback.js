$('.alreadyHandle').on('click', function(e){
    e.preventDefault();
    var getRow = $(this).closest('.keyRow');
    var $feedbackId = $(getRow).find('.feedbackId').text();
    //alert($feedbackId);
    var tempdate = new Date();
    var year = tempdate.getFullYear();
    var month = tempdate.getMonth()+1;
    var day = tempdate.getDate();
    var hour = tempdate.getHours();
    var min = tempdate.getMinutes();
    var $date = year+'-'+month+'-'+day+' '+hour+':'+min;
    //alert($date);
    socket.emit('handleFeedback',{
        feedbackId:$feedbackId,
        handleTime:$date
    });
});