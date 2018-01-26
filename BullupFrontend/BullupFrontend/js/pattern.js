//排行榜样式优化
$('.ul_li li').on('click',function () {
    var i = $(this).index();
    $('.ul_li li').eq(i).addClass('pattern').siblings().removeClass("pattern");
  })