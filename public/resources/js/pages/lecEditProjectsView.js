var LECEditProjectsView = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();
    this.consultants = null;

};
LECEditProjectsView.prototype = {

    init: function () {

    	var _this = this;
    	$.ajax({
        	url: "restAPI/projects/lec/" + window.username + "/all",
            context: document.body
        }).done(function (response) {

        	if (response && response['type'] === 'SUCCESS') {
        		_this._initUI(response['data']);
			}else{
				alertify.error(response['msg']);
				showAjaxError(response['msg']);
			} 

        }).fail(function () {
        	alertify.error("Failed to load Projects due to System fault");
        	showAjaxError("Failed to load Projects due to System fault");
        });

    },
    _initUI : function(projects){
        
    	this.container.empty();
    	this.container.hide();
        var editProjectView = new LECEditProjectsList('lec-projects-components',projects);
        editProjectView.init();
        $('#lec-projects-components').show();    


    }
};

$(document).ready(function(){
	
	window.breadcrumb.addItem("Projects", 'lec-projects-content',"resources/images/project_ico_black.png");
	var projects = new LECEditProjectsView('lec-projects-content');
	projects.init();
	
});
