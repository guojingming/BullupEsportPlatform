window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

var chartColors = window.chartColors;
var color = Chart.helpers.color;
var arr;
function setData (data) {
    arr = data;
}
var $a =  $('#a1').val();

var info = $('#hidden').text();
var myObj = JSON.parse(info);
var main = myObj.participants;

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
}
setData([json.name1,json.name2,json.name3,json.name4,json.name5,json.name6]);
var config3 = {
        type: 'radar',
        data: {
            labels: ['击杀', '死亡', '助攻','治疗', '造成伤害', '承受伤害'],
            datasets: [{
                label: "能力雷达图",
                backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
                borderColor: window.chartColors.red,
                pointBackgroundColor: chartColors.red,
                data: arr
            }, ]
        },
        options: {
            title: {
                display: true,
                text: '能力'
            },
            scale: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    };

var radar = document.getElementById("team-detail-chart");
window.myRadar = new Chart(radar, config3);