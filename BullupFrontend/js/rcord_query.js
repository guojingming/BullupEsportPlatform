$().ready(function(){
    if(userInfo==null){
      bullup.alert("您没有登录，请登录");
    }else if(userInfo.lolAccountInfo==null){
        bullup.alert("请绑定LOL账号");
    }else{
        var summonerName=userInfo.lolAccountInfo.user_lol_nickname;
        //var summonerName="Who is 55Kai";
      if(summonerName!=null && summonerName!=undefined){
            lolUtil.getMatchDetailsBySummonerName(summonerName,function(matchDetails){
              if(!matchDetails){
                 return;
              }
              var frame = bullup.loadSwigView("swig_queryres.html", {});
              if(matchDetails.matches){
                matchDetails.matches.reverse();
              }
              var leftTemplate = bullup.loadSwigView("swig_matches.html",matchDetails);
              globalMatchDetails = matchDetails;
              $('.asd').html(frame);
              $('#user-matches').html(leftTemplate);
              $('.k_matches').collapsible();
              $('.match-item').on('click', function(e){
                  var htmlId = $(this).attr('id');
                  var index = String(htmlId).substring(0, 1);
                  var rightTemplate = bullup.loadSwigView("swig_match_detail.html", {
                      match: matchDetails.matches[index - 1],
                  });
                  $('#match_wrapper').html(rightTemplate); 
                  
              });	
         });	
      }else{
          bullup.alert("登录");
      }
}
    //console.log(summonerName)
    //var summonerName="Who is 55Kai";
})
