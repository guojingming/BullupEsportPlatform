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
        // superagent
        // .get(myUrl)
        // .end(function(err,res){
        //     if (err) throw err;
        //     var $1 = cheerio.load(res.text);
        //     //获取数据
        //     var two = $1('.vhy-video-list').html();
        //     $1 = cheerio.load(two);
        //     for(var i = 0;i < 20;i++){
        //         var a = "a"+i
        //         data[a] = {};
        //         data[a].href = "http://ahuya.duowan.com"+$1("li").eq(i).find("a").attr("href");
        //         data[a].title = $1("li").eq(i).find("a").attr("title");
        //         data[a].img = $1("li").eq(i).find(".video-s img").attr("data-original");
        //     };
       
        // });
        data = {"a0":{"href":"http://ahuya.duowan.com/play/24990667.html","title":"IGvsRNG_2018LPL_第一周DAY1","img":"http://v-huya-img.huya.com/1803/24990667/4-220x124.jpg"},"a1":{"href":"http://ahuya.duowan.com/play/24992755.html","title":"IGvsRNG_2_2018LPL_第一周DAY1","img":"http://v-huya-img.huya.com/1803/24992755/4-220x124.jpg"},"a2":{"href":"http://ahuya.duowan.com/play/24995393.html","title":"IGvsRNG_3_2018LPL_第一周DAY1","img":"http://v-huya-img.huya.com/1803/24995393/4-220x124.jpg"},"a3":{"href":"http://ahuya.duowan.com/play/21751474.html","title":"S7八强赛，uzi龙坑极限反杀，rng大虫子一口一个小朋友","img":"http://v-huya-img.huya.com/1742/21751474/99-220x124.jpg?v=9360f1643b688606f076e9aa5af0f1041508585093"},"a4":{"href":"http://ahuya.duowan.com/play/25051971.html","title":"EDGvsFPX_1_2018LPL_第一周DAY2","img":"http://v-huya-img.huya.com/1803/25051971/4-220x124.jpg"},"a5":{"href":"http://ahuya.duowan.com/play/25052377.html","title":"EDGvsFPX_2_2018LPL_第一周DAY2","img":"http://v-huya-img.huya.com/1803/25052377/4-220x124.jpg"},"a6":{"href":"http://ahuya.duowan.com/play/24807655.html","title":"无限火力九项之力武器大师","img":"http://v-huya-img.huya.com/1802/24807655/4-220x124.jpg"},"a7":{"href":"http://ahuya.duowan.com/play/24910295.html","title":"VN就是这么秀 高地疯狂追五杀","img":"http://v-huya-img.huya.com/1802/24910295/4-220x124.jpg"},"a8":{"href":"http://ahuya.duowan.com/play/20087270.html","title":"S7精彩：玄学2次偷龙大翻盘！武汉的龙都是condi的！","img":"http://v-huya-img.huya.com/1739/20087270/1-220x124.jpg"},"a9":{"href":"http://ahuya.duowan.com/play/25041461.html","title":"LCK 第一周DAY1 KZ vs KSV-2","img":"http://v-huya-img.huya.com/1803/25041461/4-220x124.jpg"},"a10":{"href":"http://ahuya.duowan.com/play/25056489.html","title":"LCK  第一周DAY1 KZ vs KSV-1","img":"http://v-huya-img.huya.com/1803/25056489/4-220x124.jpg"},"a11":{"href":"http://ahuya.duowan.com/play/25000013.html","title":"TOPvsSNG_1_2018LPL_第一周DAY1","img":"http://v-huya-img.huya.com/1803/25000013/4-220x124.jpg"},"a12":{"href":"http://ahuya.duowan.com/play/24907205.html","title":"卡一狙摇身一变突击手拿下五杀拯救世界","img":"http://v-huya-img.huya.com/1802/24907205/4-220x124.jpg"},"a13":{"href":"http://ahuya.duowan.com/play/24959397.html","title":"陆雪琪直播卸妆 观众表示没啥区别啊","img":"http://v-huya-img.huya.com/1802/24959397/4-220x124.jpg"},"a14":{"href":"http://ahuya.duowan.com/play/24910213.html","title":"大龙毁一生 EZ大龙坑完美四杀","img":"http://v-huya-img.huya.com/1802/24910213/4-220x124.jpg"},"a15":{"href":"http://ahuya.duowan.com/play/24959933.html","title":"致命节奏寒冰卡嘟嘟越泉五杀 都坐下不许刷6","img":"http://v-huya-img.huya.com/1802/24959933/4-220x124.jpg"},"a16":{"href":"http://ahuya.duowan.com/play/24960279.html","title":"兄弟你这样让我很没有面子啊","img":"http://v-huya-img.huya.com/1802/24960279/4-220x124.jpg"},"a17":{"href":"http://ahuya.duowan.com/play/24710057.html","title":"劫骚之走位把对面大虫子和泰坦秀晕了","img":"http://v-huya-img.huya.com/1802/24710057/4-220x124.jpg"},"a18":{"href":"http://ahuya.duowan.com/play/25039879.html","title":"BLGvsVG_1_2018LPL_第一周DAY1","img":"http://v-huya-img.huya.com/1803/25039879/4-220x124.jpg"},"a19":{"href":"http://ahuya.duowan.com/play/25006785.html","title":"TOPvsSNG_2_2018LPL_第一周DAY1","img":"http://v-huya-img.huya.com/1803/25006785/4-220x124.jpg"}};
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
        $("#back_click").on('click',function(){
            $('#router_starter').click();
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
