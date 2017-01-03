var MSLEditProjectsView = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();
    this.consultants = null;

};
MSLEditProjectsView.prototype = {

    init: function () {

    	var _this = this;
    	$.ajax({
        	url: "restAPI/projects/msl/" + window.username + "/all",
            context: document.body
        }).done(function (response) {

        	if (response && response['type'] === 'SUCCESS') {
        		_this._initUI(response['data']);
			}else{
				alertify.error(response['msg']);
				showAjaxError(response['msg']);
			} 

        }).fail(function () {
        	showAjaxError("Failed to load Projects due to System fault");
        	alertify.error("Failed to load Projects due to System fault");
        });

    },
    _initUI : function(projects){
        
    	this.container.empty();
    	this.container.hide();
        var editProjectView = new MSLEditProjectsList('msl-projects-components',projects);
        editProjectView.init();
        $('#msl-projects-components').show();    


    }
};

$(document).ready(function(){
	
	window.breadcrumb.addItem("Projects", 'msl-projects-content',"resources/images/project_ico_black.png");
	var projects = new MSLEditProjectsView('msl-projects-content');
	projects.init();
	
});
