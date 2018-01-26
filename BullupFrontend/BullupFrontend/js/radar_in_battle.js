function getRadarData(team){
    var main = team;
    
    var k = [];
    var d = [];
    var a = [];
    var averageHeal = [];
    var averageDamage = [];
    var averageDamageTaken = [];
    for(key in main){
        k.push(main[key].strength.k);
        d.push(main[key].strength.d);
        a.push(main[key].strength.a);
        averageHeal.push(main[key].strength.averageHeal);
        averageDamage.push(main[key].strength.averageDamage);
        averageDamageTaken.push(main[key].strength.averageDamageTaken);
    }
    
    var $k = 0;
    var $d = 0;
    var $a = 0;
    var $averageHeal = 0;
    var $averageDamage = 0;
    var $averageDamageTaken = 0;
    var len = k.length;
    for(var i=0;i<len;i++){
        $k+=k[i];
        $d+=d[i];
        $a+=a[i];
        $averageHeal+=averageHeal[i];
        $averageDamage+=averageDamage[i];
        $averageDamageTaken+=averageDamageTaken[i];
    }
    
    var json = {
        name1:($k / len).toFixed(1),
        name2:($d / len).toFixed(1),
        name3:($a / len).toFixed(1),
        name4:($averageHeal / len).toFixed(1),
        name5:($averageDamage / len).toFixed(1),
        name6:($averageDamageTaken / len).toFixed(1)
    };
    var radarArr = [
        json.name1,
        json.name2,
        json.name3,
        json.name4,
        json.name5,
        json.name6
    ];
    //console.log(radarArr);
    return radarArr;
}