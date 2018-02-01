$().ready(function(){
  //选择击杀人数，更改赔率
  $('.dropdown-content li').on("click",function(event){
    var odds = $('.odds_click .select-dropdown').val();
    if(odds == 1){
      $('.odds .select-dropdown').val("1:0.1");            
    }else if(odds == 2){
      $('.odds .select-dropdown').val("1:0.2");        
    }else if(odds == 3){
      $('.odds .select-dropdown').val("1:1");           
    }
  });
  $('#bind_pubg').on('click',function(event){
    event.preventDefault();
    if(userInfo == null){
      $('#create_pubg_modall').modal("close");
      bullup.alert("请先登录");
      return;  
    }
    $('#create_pubg_modall').modal("close");
    $("#bind_pubg_modal").modal("open");
  });
  //点击进行游戏
  if(window.clickPUBGCount == undefined){
    clickPUBGCount = 1;
  }
  //判断用户是否登陆 是否绑定  
  $(document).on("click","#starter-match-btn_no",function(event){
    // if(clickPUBGCount == 1){
    //   $("#starter-match-btn_no").click();
    //   if(userInfo == null ){
    //     $('.login_pubg_btn').show();
    //     $('.bind_pubg_btn').hide();
    //     $('.create_pubg_btn').hide();
    //   }else{
    //     //userInfo.pubg = {a:"a"};
    //     if(userInfo.pubgAccount == undefined || userInfo.pubgAccount == null){
    //       $('.login_pubg_btn').hide();
    //       $('.bind_pubg_btn').show();
    //       $('.create_pubg_btn').hide();
    //     }else{
    //       $('.login_pubg_btn').hide();
    //       $('.bind_pubg_btn').hide();
    //       $('.create_pubg_btn').show();
    //       $('#pubgAccount').html(userInfo.pubgAccount);
    //     }
    //   }
    // }else{
    //   bullup.alert('上局游戏未出结果，请耐心等待,不要关闭客户端');
    // }
    event.preventDefault();
    bullup.alert('玩命开发中，敬请期待ε≡٩(๑>₃<)۶ ');
  });
  //点击弹出登录框
  $('#login_pubg').on("click",(event)=>{
    $('#create_pubg_modall').modal("close");
    $('#log_modal').modal("open");
  });
  //游戏结束按钮
  // $('#end_game_btn').on("click",(event)=>{   
  //   $('.tooltipped').tooltip('remove');
  //   $('#router_starter').click();
  //   clickPUBGCount++;
  // });
  $('#confirm_create_pubg_room_btn').on("click" ,addGameInfo);
  function addGameInfo(event){
    clickPUBGCount++;
    $('#confirm_create_pubg_room_btn').unbind("click",addGameInfo);
    $('.modal').modal('close');
    var	$battleDesc = $("#pubg_desc").val();
    var	tmpGameMode = $('#pubg-map-selection option:selected').val();
    var $gameMode;
    if(tmpGameMode == 'pubg-map-selection-1'){
      $gameMode = 'Solo';
    }
    var	$betAmount = $("#pubg_bet_amount option:selected").val();
    var tmpServer = $("#serverList option:selected").val();
    var $server;
    switch(tmpServer){
      case 'server_1':
        $server = 'na';
        break;
      case 'server_2':
        $server = 'eu';
        break;
      case 'server_3':
        $server = 'as';
        break;
      case 'server_4':
        $server = 'sa';
        break;
      case 'server_5':
        $server = 'krjp';
        break;
      case 'server_6':
        $server = 'oc';
        break;
      case 'server_7':
        $server = 'sea';
        break;
    }
    var $target = $("#killNum option:selected").text();
    var $rate = $('.odds .select-dropdown').val();
    var tmpIndex = pubgRoomInfo[0][$server].length + 1;
    var room = {
      account: userInfo.pubgAccount,
      symbol: $server+'-game-' + tmpIndex,
      desc: $battleDesc,
      gameMode: $gameMode,
      server: $server,
      bet: $betAmount,
      target: $target,
      rate: $rate,
      createTime: new Date(),
      avatarId: userInfo.avatarId
    }
    pubgRoomInfo[0][$server].push(room);
    //console.log('fuck',clickPUBGCount,JSON.stringify(pubgRoomInfo));
    cycleSearch(clickPUBGCount,$server);
    pubgRoomSurface($server);
    $('.pubg_time_control').FlipClock(3600, {
      clockFace: 'MinuteCounter',
      countdown: true
    });
    //$('#confirm_create_pubg_room_btn').unbind();
  }   
});