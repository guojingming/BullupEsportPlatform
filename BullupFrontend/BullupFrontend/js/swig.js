if(bullup == null){
	var bullup = {};
}

bullup.loadSwigView = function (pageRef, data) {
	var	swig = require('swig');
	return swig.renderFile(pageRef, data || {});
};

bullup.loadTemplateIntoTarget = function(pageRef, data, target){ //main-view
	var template = bullup.loadSwigView(pageRef, data);
	$('#' + target).html(template);
}

