$().ready(function () {
$("#create_match").on('click', function () {
      var $userId = userInfo.userId;
      var $name = $('#competition_name').val();
      var $status = $('#competition_status').val();
      var fee = $('#competition_fee option:selected');
      var $fee= fee.text();
      var $rule = $('#competition_rule').val();
      var $comment =$('#competition_comment').val();
      var $sign_start = $('#competition_sign_start').val();     
      var $sign_end = $('#competition_sign_end').val();   
      var $start =$('#competition_start').val();  
      var $end =$('#competition_end').val();
      var max_paticipant = $('#competition_max_paticipant option:selected');
      var $max_paticipant = max_paticipant.text();
      var lowest_score = $('#competition_lowest_score option:selected');
      var $lowest_score = lowest_score.text();
      var highest_score = $('#competition_highest_score option:selected');
      var $highest_score = highest_score.text();
      var date =  new Date();
      var createname =  userInfo.name;
      // var $createtime = $('#competition_createtime')
      // alert(createname);
      // alert(date);
      // alert( $sign_start);
      socket.emit('matchInfo',{
            createname:createname,
            userId : $userId,
            name : $name,
            status : $status,
            fee : $fee,
            rule : $rule,
            comment : $comment,
            sign_start_date :$sign_start,
            sign_end_date : $sign_end,
            start_date: $sign_start,
            end_date : $sign_end,
            max_paticipant :$max_paticipant,
            lowest_score : $lowest_score,
            highest_score : $highest_score,
            date:date
      });
      $('#create_koom_modal').modal('close');
    }); 

});
