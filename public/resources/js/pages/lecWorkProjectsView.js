var LECWorkProjectsView = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();

};
LECWorkProjectsView.prototype = {

    init: function () {

    	var _this = this;
        
        $('#' + _this.id + '-work-on-loading').show();
        
        $.ajax({
            url: "restAPI/projects/work/lec/" +  window.username + "/all",
            context: document.body
        }).done(function (response) {
            
            if (response && response['type'] === 'SUCCESS') {
            	_this.container.hide();
                $('#' + _this.id + '-work-on-loading').hide();
                var workOnProjects = new WorkOnProjects('lec-projects-components',response['data']);
                workOnProjects.init();

                $('#lec-projects-components').show();
			}else{
				alertify.error(response['msg']);
				showAjaxError(response['msg']);
			}   

        }).fail(function () {
        	showAjaxError("Failed to load Customer's Projects due to System Fault.");
        	alertify.error("Failed to load Customer's Projects due to System Fault.");
        });
    }
};


$(document).ready(function(){
	
	window.breadcrumb.addItem("Projects", 'lec-projects-content',"resources/images/project_ico_black.png");
	
	var workProjectView = new LECWorkProjectsView('lec-projects-content');
	workProjectView.init();
	
	window.modelInit = false;
    
    $("#model-window").modal({
        "backdrop"  : "static",
        "keyboard"  : true,
        "show"      : false 
    });

    $(document).on('open/designView', function(e, data) {
       
       localStorage.setItem("ref", location.href);
       location.href = "design?project=" + data.projectId + "&plan=" + data.planId  + "&edited=" + data.isEdited + "&access=200";

    });
    
});