var ChangePasswordView = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();

};
ChangePasswordView.prototype = {

    init: function () {

    	this.container.hide();
        var changePassword = new ChangePassword('cpw-components');
        changePassword.init();
        $('#cpw-components').show();

    }

};

$(document).ready(function(){
	
	window.breadcrumb.addItem("Profile",'cpw-content',"resources/images/prof_ico_black.png");
	var cpwView = new ChangePasswordView('cpw-content');
	cpwView.init(); 
	
});