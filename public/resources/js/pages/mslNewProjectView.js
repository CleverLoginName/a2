var MSLNewProjectView = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();

};
MSLNewProjectView.prototype = {

    init: function () {

    	
    	if(QueryString.customer){
    		this._handleNewProjectFromJustCreatedCustomer();
    	}else{
    		this._handleNewProjectFromCreatedCustomer();
    	}
    	 

    },
    _initUI : function(initData){ 
		
		if(initData['customers'] && initData['customers'].length > 0){
			this.container.empty();
			this.container.hide();
			var newProject = new NewProject('msl-projects-components',initData);
			newProject.init();
	        $('#msl-projects-components').show();
		}else{
			alertify.error("No  Customers for create a Project");
			showAjaxError("No  Customers for create a Project");
		}
        

    },
    _handleNewProjectFromJustCreatedCustomer : function(){
    	
    	var _this = this;
    	$.ajax({
            url: "restAPI/project/init/" + window.username + "/partial/" + QueryString.customer,
            context: document.body
        }).done(function (response) {

        	if (response && response['type'] === 'SUCCESS') {
        		_this._initUI(response['data']);
			}else{
				alertify.error(response['msg']);
				showAjaxError(response['msg']);
			}  

        }).fail(function () {
        	showAjaxError("Failed to load Project init data due to System fault");
            alertify.error("Failed to load Project init data due to System fault");
        });
    	
    },
    _handleNewProjectFromCreatedCustomer : function(){
    	
    	var _this = this;
    	$.ajax({
            url: "restAPI/project/init/" + window.username,
            context: document.body
        }).done(function (response) {

        	if (response && response['type'] === 'SUCCESS') {
        		_this._initUI(response['data']);
			}else{
				alertify.error(response['msg']);
				showAjaxError(response['msg']);
			}  

        }).fail(function () {
        	showAjaxError("Failed to load Project init data due to System fault");
            alertify.error("Failed to load Project init data due to System fault");
        });
    	
    }


};

$(document).ready(function(){
	
	window.breadcrumb.addItem("Projects", 'msl-projects-content',"resources/images/project_ico_black.png");
	var mslNewProjectView = new MSLNewProjectView('msl-projects-content');
	mslNewProjectView.init();
	
});
