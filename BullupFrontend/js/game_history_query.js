var lolUtil = require('./js/util/lol_util.js');

$().ready(function () {
    $('#query_btn').on('click', function (e) {
        //e.preventDefault();
        var summonerName = $('#query_summoner_name').val();
        if(summonerName == ""){
            bullup.alert("请输入召唤师的名字");
            return;
        }
        var startDate = $('#query_start_data').val();
        if(startDate == ""){
            bullup.alert("请输入起始时间");
            return;
        }
        var endDate = $('#query_end_data').val();
        if(endDate == ""){
            bullup.alert("请输入终止时间");
            return;
        }
        bullup.alert("正在查询对战记录，请稍等");
        var strs = startDate.split(",");
        var year = strs[1];
        var day = strs[0].split(" ")[0];
        var month = strs[0].split(" ")[1];
        switch(month){
            case 'January': month="1"; break;
            case 'February': month="2"; break;
            case 'March': month="3"; break;
            case 'April': month="4"; break;
            case 'May': month="5"; break;
            case 'June': month="6"; break;
            case 'July': month="7"; break;
            case 'August': month="8"; break;
            case 'September': month="9"; break;
            case 'October': month="10"; break;
            case 'November': month="11"; break;
            case 'December': month="12"; break;
            default: month="1"; break;
        }
        startDate = year + "/" + month + "/" + day;
        startDate_calc = new Date(month + "/" + day + "/" + year);

        strs = endDate.split(",");
        year = strs[1];
        day = strs[0].split(" ")[0];
        month = strs[0].split(" ")[1];
        switch(month){
            case 'January': month="1"; break;
            case 'February': month="2"; break;
            case 'March': month="3"; break;
            case 'April': month="4"; break;
            case 'May': month="5"; break;
            case 'June': month="6"; break;
            case 'July': month="7"; break;
            case 'August': month="8"; break;
            case 'September': month="9"; break;
            case 'October': month="10"; break;
            case 'November': month="11"; break;
            case 'December': month="12"; break;
            default: month="1"; break;
        }
        endDate = year + "/" + month + "/" + day;
        endDate_calc = new Date(month + "/" + day + "/" + year);

        var now = new Date();
        if (now.getTime() - startDate_calc.getTime() < 0 || now.getTime() - endDate_calc.getTime() < 0) {
            bullup.alert(" 起始时间或结束时间晚于当前时间！ ");
            return;
        }

        var timeDiff = endDate_calc.getTime() - startDate_calc.getTime();
        if (timeDiff < 0) {
            bullup.alert(" 起始时间晚于结束时间！ ");
            return;
        } else if (Math.ceil(timeDiff / (24 * 3600 * 1000)) > 7) {
            bullup.alert(" 设置的时间段超过一周！ ")
            return;
        }
        
        startDate = startDate.replace(/\s+/g, '');
        endDate = endDate.replace(/\s+/g, '');
        lolUtil.getMatchDetailsBySummonerNameAndTime(summonerName, startDate, endDate, function(matchDetails){
            if(matchDetails == null || matchDetails == undefined){
                bullup.alert(" 召唤师不存在或设置的时间段超过一周！");
                return;
            }else if(matchDetails.errorTitle == 'no data'){
                bullup.alert("该段时间内无游戏记录！");
                return;
            }else{
                bullup.alert(" 查询成功! ");
                var frame = bullup.loadSwigView("swig_queryres.html", {});
                var leftTemplate = bullup.loadSwigView("swig_matches.html",matchDetails);
                globalMatchDetails = matchDetails;
                $('.content').html(frame);
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
            }
        });
    });
});
