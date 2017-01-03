$(document).ready(function(){
	
	
	var _this = this;
	window.breadcrumb.addItem("Home", "msl-dashboard-content","resources/images/home_ico_black.png");
    $.ajax({
        url: "restAPI/stats/msl/" + window.username,
        context: document.body
    }).done(function (response) {

    	if (response && response['type'] === 'SUCCESS') {
    		var dashboardWidgets = new DashboardWidgets('msl-dashboard-content',window.userRole,response['data']);
            dashboardWidgets.init(); 
                          
        }else{
        	alertify.error(response['msg']);
        	showAjaxError(response['msg']);
        } 

    }).fail(function () {
    	showAjaxError("Failed to load Master Software Licensee's statistics due to System Fault.");
    	alertify.error("Failed to load Master Software Licensee's statistics due to System Fault.");
    });
	
	
});