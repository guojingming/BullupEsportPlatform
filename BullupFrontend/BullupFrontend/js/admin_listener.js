//提现管理
$('#admin_withdraw').on('click', function(e){
    e.preventDefault();
    bullup.loadTemplateIntoTarget('swig_admin_handleWithdraw.html',{}, 'main-view');
    socket.emit('getWithdrawInfo');
});
//约战管理
$('#admin_battle').on('click', function(e){
    e.preventDefault();
    bullup.loadTemplateIntoTarget('swig_admin_handleBattle.html',{}, 'main-view');
    socket.emit('getBattleRecord');
});
//账号管理
$('#admin_account').on('click', function(e){
    e.preventDefault();
    bullup.loadTemplateIntoTarget('swig_admin_handleAccount.html',{}, 'main-view');
    socket.emit('getAccountInfo');
});

//充值管理
$('#admin_recharge').on('click', function(e){
    e.preventDefault();
    bullup.loadTemplateIntoTarget('swig_admin_handleRecharge.html',{}, 'main-view');
    socket.emit('getRechargeInfo');
});
//申述和举报管理
$('#admin_feedback').on('click', function(e){
    e.preventDefault();
    bullup.loadTemplateIntoTarget('swig_admin_handleFeedback.html',{}, 'main-view');
    socket.emit('getFeedbackInfo');
});

//简单统计
$('#admin_analysis').on('click', function(e){
    e.preventDefault();
    bullup.loadTemplateIntoTarget('swig_admin_simpleAnalysis.html',{}, 'main-view');
    socket.emit('getAnalysisData');
});

//赛事管理

//lolApiKey更新
$('#admin_lolkey_update').on('click', function(e){
    e.preventDefault();
    socket.emit('lolKeyUpdate');
});

//邀请码信息
$('#admin_invitedCode').on('click', function(e){
    e.preventDefault();
    bullup.loadTemplateIntoTarget('swig_admin_invitedCode.html',{}, 'main-view');
    socket.emit('getInvitedCodeData');
});

//官网主页访问量统计
$('#admin_bullupWeb').on('click', function(e){
    e.preventDefault();
    bullup.loadTemplateIntoTarget('swig_admin_bullupWeb.html',{}, 'main-view');
    socket.emit('getBullupWeb');
});

//进入广播页
$('#admin_turn_boradcast').on('click', function(e){
    e.preventDefault();
    bullup.loadTemplateIntoTarget('swig_admin_broadcast.html',{}, 'main-view');
});

//进入广播页
$('#admin_turn_closeserver').on('click', function(e){
    e.preventDefault();
    bullup.loadTemplateIntoTarget('swig_admin_closeserver.html',{}, 'main-view');
});
