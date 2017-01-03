$(document).ready(function() {

	$('#nav-back').attr('href',localStorage.getItem("ref"));
	
	var _this = this;
	$.ajax({
        url: "restAPI/project/" + window.project + "/info",
        context: document.body
    }).done(function (response) {

        if (response && response['type'] === 'SUCCESS') {
        	
        	var projectInfoTitle = '<div class="row">' +
        		'<div id="project-name" class="heading-title left">' +
	        	'<span style="font-weight:bold;color:#fff;">JOB #: </span>' +
	        	'<span style="font-weight:normal;color:#fff;">' + response['data']['location'] + '</span>' +
	        	'</div>' +
	        	'</div>';
        	$(projectInfoTitle).appendTo($('#page-title'));
                       
        }else{
        	alertify.error(response['msg']);
        	showAjaxError(response['msg']);
        } 

    }).fail(function () {
    	alertify.error("Failed to load Project Info due to System Fault.");
    	showAjaxError("Failed to load Project Info due to System Fault.");
    });

});
