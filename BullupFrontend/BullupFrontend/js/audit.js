$().ready(function () {
$('.consent').on('click', function (e) {
      var getmatchid= $(this).closest('.getauditId');
       var $matchid = $(getmatchid).find('.matchid').text();
       var getuserid= $(this).closest('.getauditId');
       var $userid = $(getuserid).find('.auditId').text();
       console.log("11-------"+ $matchid);
       console.log("22-------"+$userid);     
      socket.emit('agreeApply', {
            matchid:$matchid,
            signId:$userid
      });
});

$('.turndown').on('click', function (e) {
       var getmatchid= $(this).closest('.getauditId');
       var $matchid = $(getmatchid).find('.matchid').text();
       var getuserid= $(this).closest('.getauditId');
       var $userid = $(getuserid).find('.auditId').text();

 
      socket.emit('rejectApply', {
            matchid:$matchid,
            signId:$userid
      });
});

});
