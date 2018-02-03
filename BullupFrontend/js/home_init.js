$().ready(function () {
    var temp = bullup.loadSwigView("./swig_menu.html", null);
    $('#system_menu').html(temp);
    $('.modal').modal();
    $('input#input_text, textarea#textarea1').characterCounter();
    //地图替换
    $('.dropdown-content li').on("click",function () {
    //$('.map-selection-item').on("click",function () {
        var map = $(this).index();
        var html=$(this).html();
        if(html.indexOf('召唤师峡谷')!= -1){
            $('.room_map').attr('src','./media/imgs/rift_map.jpg');
        }else if(html.indexOf('嚎哭深渊')!= -1){
            $('.room_map').attr('src','./media/imgs/hhsy_map.jpg');
        }
    });
});

// 有效期时间组件
$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
});
// 价格$
$('.credit').click(function () {
    var iox = $(this).index();
    var clasvlue = $('.credit').eq(iox).text();
    $("#money").val(clasvlue);
    $('.ois').addClass('active');
    $('.credit').eq(iox).addClass("selected").siblings().removeClass('selected');
})
//弹出popo
$('.waves-light').click(function () {
    $('#modalpopo').css("display","none");
    $('#modalpopo').modal('close');
    $(".bullup_overlay").remove();
    if($("#modalpopo").find("p").text()=="该段时间内无游戏记录！"){
        $('#router_dataquery').click();
    }
});
$(function () {
    $('#beginTime').date();
    $('#endTime').date({ theme: "datetime" });
    $('#endTime2').date({ theme: "datetime" });
});