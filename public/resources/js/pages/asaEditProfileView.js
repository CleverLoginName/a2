var ASAEditProfileView = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();

};
ASAEditProfileView.prototype = {
		
    init: function () {

    	this._editAction();

    },
    _editAction : function(id){

        var _this = this;
        $('#' + this.id + '-edit-profile-loading').show();
        $.ajax({
        	url: "restAPI/user/asa/" + window.username + "/profile",
            context: document.body
        }).done(function (response) {

        	if (response && response['type'] === 'SUCCESS') {
        		$('#' + _this.id + '-edit-profile-loading').hide();
            	_this.container.hide();
                var editProfile = new ASAEditProfile('profile-components',response['data']);
                editProfile.init();
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
	
	var profile = new ASAEditProfileView('profile-content');
	profile.init(); 
	
});