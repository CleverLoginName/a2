var SubscriptionView = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();
    
};
SubscriptionView.prototype = {

    init: function () {

    	this._viewSubscriptionAction();
    	
    },
    _viewSubscriptionAction : function(){

        var _this = this;
        $.ajax({
            url: "restAPI/subscriptions/" + window.userRole + "/" + window.username,
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	_this.container.hide();
            	var mySubscribes = new MySubscribes('profile-components',response['data'],window.userRole);
                mySubscribes.init();
                $('#profile-components').show();                
            }else{
            	alertify.error(response['msg']);
            	showAjaxError(response['msg']);
            } 


        }).fail(function () {
        	showAjaxError("Failed to load Subscribes due to System Fault.");
        	alertify.error("Failed to load Subscribes due to System Fault.");
        });

    }

};

$(document).ready(function(){
	
	window.breadcrumb.addItem("Subscriptions", 'profile-components',"resources/images/prof_ico_black.png");
	
	var subscriptionView = new SubscriptionView('profile-content');
	subscriptionView.init(); 
	
});