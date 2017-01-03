var LMEditProfileView = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();

};
LMEditProfileView.prototype = {
		
    init: function () {

    	this._editAction();

    },
    _editAction : function(id){

        var _this = this;
        $('#' + this.id + '-edit-profile-loading').show();
        $.ajax({
        	url: "restAPI/user/lm/" + window.username + "/profile",
            context: document.body
        }).done(function (response) {

        	if (response && response['type'] === 'SUCCESS') {
        		$('#' + _this.id + '-edit-profile-loading').hide();
            	_this.container.hide();
                var editProfile = new LMEditProfile('profile-components',response['data']);
                editProfile.init();
                $('#profile-components').show();                
            }else{
            	showAjaxError(response['msg']);
            	alertify.error(response['msg']);
            }

        }).fail(function () {
        	showAjaxError("Failed to load Merchant's profile due to System Fault.");
        	alertify.error("Failed to load Merchant's profile due to System Fault.");
        });

    }


};

$(document).ready(function(){
	
	window.breadcrumb.addItem("Profile", 'profile-content',"resources/images/prof_ico_black.png");
	
	var profile = new LMEditProfileView('profile-content');
	profile.init(); 
	
});