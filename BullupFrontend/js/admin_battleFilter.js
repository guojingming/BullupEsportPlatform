//对战类型的筛选
$("#all_battle_type").click(
    function(){
        $("#tab .keyRow").show();
        $('#battleType').text('全部类型');
    }
);
$("#freedom_battle").click(
    function(){
        $("#tab .visible").hide().filter(":contains('battle')").show();
        $('#battleType').text('自主约战');
    }
);
$("#system_match").click(
    function(){
        $("#tab .visible").hide().filter(":contains('match')").show();
        $('#battleType').text('系统匹配');
    }
);
//对战地图筛选
$("#all_map_type").click(
    function(){
        $("#tab .keyRow").show();
        $('#mapType').text('全部类型');
    }
);
$("#summoner_valley").click(
    function(){
        $("#tab .visible").hide().filter(":contains('召唤师峡谷')").show();
        $('#mapType').text('召唤师峡谷');
    }
);
$("#crying_abyss").click(
    function(){
        $("#tab .visible").hide().filter(":contains('嚎哭深渊')").show();
        $('#mapType').text('嚎哭深渊');
    }
);
$("#distortion_forest").click(
    function(){
        $("#tab .visible").hide().filter(":contains('扭曲丛林')").show();
        $('#mapType').text('扭曲丛林');
    }
);
$("#crystal_marks").click(
    function(){
        $("#tab .visible").hide().filter(":contains('水晶之痕')").show();
        $('#mapType').text('水晶之痕');
    }
);
//对战地图筛选
$("#all_number_type").click(
    function(){
        $("#tab .keyRow").show();
        $('#numberType').text('全部类型');
    }
);
$("#two").click(
    function(){
        $("#tab .visible").hide().filter(":contains('1v1')").show();
        $('#numberType').text('1v1');
    }
);
$("#four").click(
    function(){
        $("#tab .visible").hide().filter(":contains('2v2')").show();
        $('#numberType').text('2v2');
    }
);
$("#six").click(
    function(){
        $("#tab .visible").hide().filter(":contains('3v3')").show();
        $('#numberType').text('3v3');
    }
);
$("#eight").click(
    function(){
        $("#tab .visible").hide().filter(":contains('4v4')").show();
        $('#numberType').text('4v4');
    }
);
$("#ten").click(
    function(){
        $("#tab .visible").hide().filter(":contains('5v5')").show();
        $('#numberType').text('5v5');
    }
);