var ASAViewProfile = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();
    
};
ASAViewProfile.prototype = {

    init: function () {

    	this._viewProfileAction();
    	
    },
    _viewProfileAction : function(){

        var _this = this;
        $('#' + this.id + '-view-profile-loading').show();
        $.ajax({
            url: "restAPI/user/asa/" + window.username + "/profile",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	_this.container.hide();
                $('#' + _this.id + '-view-profile-loading').hide();
                var asaProfile = new ASAProfile('profile-components',response['data']);
                asaProfile.init();
                $('#profile-components').show();                
            }else{
            	alertify.error(response['msg']);
            	showAjaxError(response['msg']);
            } 


        }).fail(function () {
        	showAjaxError("Failed to load Adopoto System Administrator's profile due to System Fault.");
        	alertify.error("Failed to load Adopoto System Administrator's profile due to System Fault.");
        });

    }

};

$(document).ready(function(){
	
	window.breadcrumb.addItem("Profile", 'profile-content',"resources/images/prof_ico_black.png");
	
	var profile = new ASAViewProfile('profile-content');
	profile.init(); 
	
});