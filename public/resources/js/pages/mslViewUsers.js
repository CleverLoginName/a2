var MSLViewUsers = function(){
	
	this.id = UUID();
	
};
MSLViewUsers.prototype = {

	init : function(){
		
		window.breadcrumb.addItem("Users", 'sub-menu-items',"resources/images/users_ico_black.png");
		window.breadcrumb.addItem("View", 'sub-menu-items');
		this._initEvents();
		
	},
	_initEvents : function(){
		
		$('.sub-menu-item').on('click',function(){
			
			var actionType = $(this).attr('data-type');
			
			switch(actionType){
				case "LM":
					
					
					$.ajax({
			            url: "restAPI/user/lm/all/owner/" + window.username,
			            context: document.body
			        }).done(function (response) {

			        	if (response && response['type'] === 'SUCCESS') {
			        		$(document).trigger('move/sub/actions');
							var lmList = new LMList("sub-menu-action",response['data']);
							lmList.init();
						}else{
							alertify.error(response['msg']);
							showAjaxError(response['msg']);
						}   

			        }).fail(function () {
			        	alertify.error("Failed to load Merchantss due to System Fault.");
			        	showAjaxError("Failed to load Merchantss due to System Fault.");
			        });
					
					break;
				case "LEC":
					$.ajax({
			            url: "restAPI/user/lec/all/owner/" + window.username,
			            context: document.body
			        }).done(function (response) {

			        	if (response && response['type'] === 'SUCCESS') {
			        		$(document).trigger('move/sub/actions');
							var lecList = new LECList("sub-menu-action",response['data']);
							lecList.init();
						}else{
							alertify.error(response['msg']);
							showAjaxError(response['msg']);
						}   

			        }).fail(function () {
			        	alertify.error("Failed to load Customers due to System Fault.");
			        	showAjaxError("Failed to load Customers due to System Fault.");
			        });
					
					break;
			}
			
			
		});
		
		$(document).on('move/sub/items',function(){
			
			$('#sub-menu-action').hide();
			$('#sub-menu-items').show();
			
		});
		
		$(document).on('move/sub/actions',function(){
			
			$('#sub-menu-items').hide();
			$('#sub-menu-action').show();
			
		});
		
	}
		
};

$(document).ready(function(){	
	
	var mslViewUsers = new MSLViewUsers();
	mslViewUsers.init();	
	
});