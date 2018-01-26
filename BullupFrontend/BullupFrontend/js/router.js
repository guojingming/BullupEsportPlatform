var lolUtil = require('./js/util/lol_util.js');
$().ready(function(){
	loadStarter();

	$("#router_personal").click(function () {
		$.getScript('/js/leidt.js');
	});

	$('#router_starter').on('click', function(e){
		//e.preventDefault()
		loadStarter();
	});

	$('#router_dataquery').on('click', function(e){
		
		// alert(111);
		//var user_lol_nickname=userInfo.lolAccountInfo.user_lol_nickname;
		//alert(JSON.stringify(lolAccount))
		socket.emit("LOLKeyRequest");

		
	});

	$('#router_tournament').on('click', function(e){
		bullup.alert("程序猿正在玩命开发中ε=ε=ε=ε=ε=ε=┌(￣◇￣)┘");
	});

	$('#router_personal_center').on('click', function(e){
        e.preventDefault();
        if(userInfo == null){
            bullup.alert('请先登录！');
        }else{
            var $role = userInfo.userRole;
            //alert($role);
            if($role==1){
                bullup.loadTemplateIntoTarget('swig_admin.html', {}, 'main-view');
                $.getScript('/js/zymly.js');
                
            }else{
                bullup.loadTemplateIntoTarget('swig_index.html', {}, 'main-view');
                $.getScript('/js/zymly.js');
                var $userId = userInfo.userId;
                socket.emit('getBalance',{
                    userId:$userId
                });            
            }
        }
	});

	$('#router_chat').on('click', function(e){
        e.preventDefault();
        if(!userInfo){
                bullup.alert('请登录后查看');
        }else{
                bullup.loadTemplateIntoTarget('swig_chatroom.html', {}, 'main-view');
                $.getScript('./js/chat.js');
        }   
	});
   
	$('#return').on('click', function(e){
		e.preventDefault();
		bullup.loadTemplateIntoTarget('swig_index.html', {}, 'main-view');
		$.getScript('/js/zymly.js');
		$.getScript('/js/Withdraw.js');
	});  

   
});

function loadStarter(){
	var starter_data = {
		tournaments:[
			{
				name:'S7 Championship',
				description: 'Starting at October'
			},
			{
				name:'MSI Championship',
				description: 'Starting at May'
			}
			
		],
		news:[
			{
				title: 'New champion coming soon'
			},
			{
				title: 'Arcade 2017 Overview'
			}
		]
	};
	//加载html
	var starterHtml = bullup.loadSwigView('swig_starter.html', starter_data);
	$('#main-view').html(starterHtml);
	var starterShufflingViewHtml = bullup.loadSwigView('swig_starter_shuffling_view.html', null);
	$('#starter_shuffling_view').html(starterShufflingViewHtml);

	//加载主页的动效js
	$.getScript('./js/starter.js');
}




