var MSLEditUsers = function(){
	
	this.id = UUID();
	
};
MSLEditUsers.prototype = {

	init : function(){
		
		window.breadcrumb.addItem("Users", 'sub-menu-items',"resources/images/users_ico_black.png");
		window.breadcrumb.addItem("Edit", 'sub-menu-items');
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
							var lmEditList = new LMEditList("sub-menu-action",response['data']);
							lmEditList.init();
						}else{
							alertify.error(response['msg']);
							showAjaxError(response['msg']);
						}   

			        }).fail(function () {
			        	showAjaxError("Failed to load Merchants due to System Fault.");
			        	alertify.error("Failed to load Merchants due to System Fault.");
			        });
					
					break;
				case "LEC":
					$.ajax({
			            url: "restAPI/user/lec/all/owner/" + window.username,
			            context: document.body
			        }).done(function (response) {

			        	if (response && response['type'] === 'SUCCESS') {
			        		$(document).trigger('move/sub/actions');
							var lecEditList = new LECEditList("sub-menu-action",response['data']);
							lecEditList.init();
						}else{
							alertify.error(response['msg']);
							showAjaxError(response['msg']);
						}   

			        }).fail(function () {
			        	showAjaxError("Failed to load Customers due to System Fault.");
			        	alertify.error("Failed to load Customers due to System Fault.");
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
	
	var mslEditUsers = new MSLEditUsers();
	mslEditUsers.init();	
	
});