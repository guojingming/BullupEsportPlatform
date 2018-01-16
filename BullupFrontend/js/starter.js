var superagent = require('superagent');
var cheerio = require('cheerio');
var process = require('child_process');
$(document).ready(function(){
    $('#starter-fight-btn').on('click', function(){

    });

    $('#starter-match-btn').on('click', function(){
        bullup.alert("程序猿玩命开发中ε=ε=ε=ε=ε=ε=┌(￣◇￣)┘");
    });

    $('#starter-rank-btn').on('click', function(e){
        e.preventDefault();
        socket.emit('rankRequest');
      // $.getScript('./js/request_rank_list.js');
    });

    $('#starter-chatroom-btn').on('click', function(e){
        console.log('聊天室');
        // e.preventDefault();
        bullup.loadTemplateIntoTarget('swig_chatroom.html', {}, 'main-view');
        $.getScript('./js/chat.js');
    });

    $('#return').on('click', function(e){
        e.preventDefault();
        bullup.loadTemplateIntoTarget('swig_index.html', {}, 'main-view');
        $.getScript('/js/zymly.js');
        $.getScript('/js/Withdraw.js');
    });

    //最小化窗口
    //加载本机UI库
    var gui = require('nw.gui');

    //获取当前窗口
    var win = gui.Window.get();;

    //聆听最小化事件的
    win.on('minimize', function() {
    //console.log('Window is minimized');
    });
    //最小化
    $('.zuix').click(function () {

        win.minimize();
    })
    //关闭窗口
    win.on('close', function() {
        lol_process.grabLOLData('killProcess', null);
        this.hide(); 
        console.log("We're closing...");
        this.close(true);
    });
    $('.g_bi').click(function () {
        socket.disconnect();
        win.close(); 
    });

    //系统设置提示音是否为静音
    audio_prompt = document.getElementsByClassName("bullup_background_music")[0];
    play = document.getElementsByClassName("headle_music")[0];
    play.onclick=function(event){          
        if(audio_prompt.muted){
        audio_prompt.muted = false;       
        play.innerHTML="<i class='fa fa-volume-up' aria-hidden='true'></i>";
        }else{          
        audio_prompt.muted = true;
        play.innerHTML='<i class="fa fa-volume-off" aria-hidden="true"></i>';
    }      
    }

    //点击加载视屏页
    $("#bullup_video").on("click",function(event){
        var myUrl = "http://ahuya.duowan.com/g/lol?tag=%E5%85%A8%E9%83%A8&order=hot&page=1";
        var data = {};
        superagent
        .get(myUrl)
        .end(function(err,res){
            if (err) throw err;
            var $1 = cheerio.load(res.text);
            //获取数据
            var two = $1('.vhy-video-list').html();
            //console.log(two);
            $1 = cheerio.load(two);
            //console.log($("li").length);
            for(var i = 0;i < 20;i++){
                var a = "a"+i
                data[a] = {};
                data[a].href = "http://ahuya.duowan.com"+$1("li").eq(i).find("a").attr("href");
                data[a].title = $1("li").eq(i).find("a").attr("title");
                data[a].img = $1("li").eq(i).find(".video-s img").attr("data-original");
            };
            //console.log("var data =",data);
            var swig_video = bullup.loadSwigView('./swig_video.html',{data:data});
            $("#main-view").html(swig_video);
            $(".video_href").on("click",function(event){
                var a = $(this).data();
                //console.log(a.href);
                process.exec("start "+a.href);                
            });
            $('#waiting-modal').css('display', 'none');    
            $('#team-detail-modal').css('display', 'none');    
            $('.modal-overlay').remove();
        });
    });
});


function addFireAnimation (id){
    var yzhou = document.getElementById(id);
    var img = yzhou.getElementsByTagName('img')[0];
    var chong = 0;
    var tm = null;
    tm = setInterval(function() {
        yzhou.scrollTop++;
        if (yzhou.scrollTop >= img.offsetHeight - yzhou.clientHeight) {
            yzhou.scrollTop = 0;
        }
    }, 20);
}

function autoplay() {
    clearTimeout(time);
    time = setTimeout(autoplay, 4500);
    //$('.carousel').carousel('next');
}


//给主页4个按钮增加火焰动效
addFireAnimation("starter_competition_div");
addFireAnimation("starter_battle_div");
addFireAnimation("starter_rank_div");
addFireAnimation("starter_chatroom_div");

//轮播栏动效
$('.carousel.carousel-slider').carousel({
    fullWidth: true
});
var time =null;
$("#starter-carousel").hover(function () {
    
    clearTimeout(time);
},function (){
    clearTimeout(time);
    time = setTimeout(autoplay, 2000);
});  
function autoplay() {
    clearTimeout(time);
    time = setTimeout(autoplay, 4500);
    $('#starter-carousel').carousel('next');
    // try{
    //     $('.carousel').carousel('next');
    // }catch(err){

    // }
    
}

//轮播左右焦点
$('.ctavi').click(function () {
    if($(this).hasClass("left-d")){
        $('#starter-carousel').carousel('prev');
    }else if($(this).hasClass("right-d")){
        $('#starter-carousel').carousel('next');
    }
});


// //阻止右键点击
// window.onload = function(){
//    document.oncontextmenu = function(e){
//        e.preventDefault();
//    };
// }
// //禁用F12调试工具
// document.onkeydown=function (e){
//    var currKey=0,evt=e||window.event;
//    currKey=evt.keyCode||evt.which||evt.charCode;
//    if (currKey == 123) {
//        window.event.cancelBubble = true;
//        window.event.returnValue = false;
//        console.log("donot open tiaoshiban");
//    }
// }

autoplay();
