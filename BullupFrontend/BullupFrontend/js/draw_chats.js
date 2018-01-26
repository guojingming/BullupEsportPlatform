 window.chartColors = {
     red: 'rgb(255, 99, 132)',
     orange: 'rgb(255, 159, 64)',
     yellow: 'rgb(255, 205, 86)',
     green: 'rgb(75, 192, 192)',
     blue: 'rgb(54, 162, 235)',
     purple: 'rgb(153, 102, 255)',
     grey: 'rgb(201, 203, 207)'
 };

 var config1 = {
     type: 'doughnut',
     data: {
         datasets: [{
             data: [
             10, 20, 30
           ],
             backgroundColor: [
             window.chartColors.blue,
             window.chartColors.red,
             window.chartColors.purple,
           ],
         }],
         labels: [
           "中单",
           "打野",
           "ADC",
         ]
     },
     options: {
         responsive: true,
         legend: {
             position: 'top',
         },
         title: {
             display: true,
             text: '常用位置'
         },
         animation: {
             animateScale: true,
             animateRotate: true
         }
     }
 };


 /* window.onload = function() {
  *   var ctx = document.getElementById("chart-area").getContext("2d");
  *   window.myDoughnut = new Chart(ctx, config);
  * };*/


 /* Polar area */
 var chartColors = window.chartColors;
 var color = Chart.helpers.color;
 var config2 = {
     data: {
         datasets: [{
             data: [
			 10, 20, 30
		   ],
             backgroundColor: [
			 color(chartColors.red).alpha(0.5).rgbString(),
			 color(chartColors.blue).alpha(0.5).rgbString(),
			 color(chartColors.green).alpha(0.5).rgbString(),
		   ],
             label: 'My dataset' // for legend
		 }],
         labels: [
		   "刺客",
		   "法师",
		   "肉盾",
		 ]
     },
     options: {
         responsive: true,
         title: {
             display: true,
             text: '常用英雄类型'
         },
         scale: {
             ticks: {
                 beginAtZero: true
             },
             reverse: false
         },
         animation: {
             animateRotate: false,
             animateScale: true
         }
     }
 };

 /* radar chart */
 var config3 = {
     type: 'radar',
     data: {
         labels: ['击杀', '生存', '助攻', '物理', '魔法', '防御', '金钱'],
         datasets: [{
             label: "能力雷达图",
             backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
             borderColor: window.chartColors.red,
             pointBackgroundColor: chartColors.red,
             data: [
			 87,
			 66,
			 25,
			 88,
			 99,
			 48,
			 78
		   ]
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




 window.onload = function () {
     var ctx1 = document.getElementById("chart-area");
     var ctx2 = document.getElementById("polar-area");
     var radar = document.getElementById("radar-area");
     window.myDoughnut = new Chart(ctx1, config1)
     window.myPolarArea = Chart.PolarArea(ctx2, config2);
     window.myRadar = new Chart(radar, config3);
 };
