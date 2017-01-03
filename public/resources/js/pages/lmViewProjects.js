var LMViewProjects = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();

};
LMViewProjects.prototype = {

    init: function () {

    	this.container.empty();
		this._getAllProjectsForView();
    	
    },
    _getAllProjectsForView: function(){

        var _this = this;
        $('#' + this.id + '-view-projects-loading').show();
        $.ajax({
            url: "restAPI/projects/lm/" + window.username + "/all",
            context: document.body
        }).done(function (response) {

             if (response && response['type'] === 'SUCCESS') {
            	 _this.container.hide();
                 $('#' + _this.id + '-view-projects-loading').hide();
                 var projectsList = new LMProjectsList('lm-projects-components',response['data']);
                 projectsList.init();
                 $('#lm-projects-components').show();             
			}else{
				alertify.error(response['msg']);
				showAjaxError(response['msg']);
			}   

        }).fail(function () {
        	showAjaxError("Failed to load Projects due to System Fault.");
        	alertify.error("Failed to load Projects due to System Fault.");
        });

    }

};

$(document).ready(function(){

	window.breadcrumb.addItem("Projects", 'lm-projects-content',"resources/images/project_ico_black.png");
	var projects = new LMViewProjects('lm-projects-content');
	projects.init(); 
	
	$(document).on('open/designView', function(e, data) {
	       
	       localStorage.setItem("ref", location.href);
	       location.href = "design?project=" + data.projectId + "&plan=" + data.planId  + "&edited=" + data.isEdited + "&access=400";

	});
	
});
