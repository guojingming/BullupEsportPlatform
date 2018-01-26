if(bullup == null){
	var bullup = {};
}

bullup.generateRadar = function(dataArray1, dataArray2, labelArray, title, canvasId){
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
	var config = {};
	config.type = 'radar';
	config.data = {};
	config.data.labels = labelArray;
	config.data.datasets = [];
	if(dataArray1 != null){
		config.data.datasets['0'] = {};
		config.data.datasets['0'].label = '我方';
		config.data.datasets['0'].backgroundColor = color(window.chartColors.red).alpha(0.2).rgbString();
		config.data.datasets['0'].borderColor = window.chartColors.blue;
		config.data.datasets['0'].pointBackgroundColor = window.chartColors.blue;
		config.data.datasets['0'].data = dataArray1;
		if(dataArray2 != null){
			config.data.datasets['1'] = {};
			config.data.datasets['1'].label = '敌方';
			config.data.datasets['1'].backgroundColor = color(window.chartColors.red).alpha(0.2).rgbString();
			config.data.datasets['1'].borderColor = window.chartColors.red;
			config.data.datasets['1'].pointBackgroundColor = window.chartColors.red;
			config.data.datasets['1'].data = dataArray2;
		}
	}else{
		if(dataArray2 != null){
			config.data.datasets['0'] = {};
			config.data.datasets['0'].label = '敌方';
			config.data.datasets['0'].backgroundColor = color(window.chartColors.red).alpha(0.2).rgbString();
			config.data.datasets['0'].borderColor = window.chartColors.red;
			config.data.datasets['0'].pointBackgroundColor = window.chartColors.red;
			config.data.datasets['0'].data = dataArray2;
		}
	}
	config.data.options = {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: title
		},
		scale: {
			ticks: {
				beginAtZero: true
			}
		}
	};
	window.myRadar = new Chart(document.getElementById(canvasId), config);
}