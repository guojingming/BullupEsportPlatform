if(bullup == null){
    var bullup = {};
}

bullup.alert = function(text, title = "提示") {
    $('#modalpopo .modal-content  h4').text(title);
    $('#modalpopo .ceneter_w').html(text);
    //$('#modalpopo').modal('open'); 
    bullup_modal('open');
    if(text=="登录失败!"){
        $('#modalpopo').css("z-index","1010");
    }
};
var overlay_index = 1011;
function bullup_modal(options){
    var $this = $(".bullup_modal");
    if(options=="open"){
        open();
    }else if(options=="close"){
        close();
    }
    function close(){
        $this.css({
             "display":"none",
             "opacity": 0,
             "transform": "scaleX(0.7)",
             "top": "4%",
            });
    }
    function open(){
        var bullup_modal = $('<div>');
        $(".modal11").show();
        $('body').append(bullup_modal);
        bullup_modal.addClass("bullup_overlay");
        $('.bullup_overlay')
        .css({"z-index": 1008,
              "display": "block",
              "opacity": 0.5,
              "position":"fixed",
              "top": "-25%",
              "left": 0,
              "bottom": 0,
              "right": 0,
              "height": "125%",
              "width": "100%",
              "background": "#000"
        });
        $('.bullup_overlay').click(function(event){
            if($("#modalpopo").find("p").text()=="该段时间内无游戏记录！"){
                $('#router_dataquery').click();
            }
            close();
            $(".bullup_overlay").remove();
        });
        $this.css({display:"block","z-index":overlay_index,"opacity":1,"transform":"scaleX(1)","top":"10%"});
    }
};