var AsaEditUsers = function(){
	
	this.id = UUID();
	
};
AsaEditUsers.prototype = {

	init : function(){
		
		window.breadcrumb.addItem("Users", 'sub-menu-items',"resources/images/users_ico_black.png");
		window.breadcrumb.addItem("Edit", 'sub-menu-items');
		this._initEvents();
		
	},
	_initEvents : function(){
		
		$('.sub-menu-item').on('click',function(){
			
			var actionType = $(this).attr('data-type');
			
			switch(actionType){
				case "ASA":
					
					
					$.ajax({
			            url: "restAPI/user/asa/all",
			            context: document.body
			        }).done(function (response) {

			        	if (response && response['type'] === 'SUCCESS') {
			        		$(document).trigger('move/sub/actions');
							var asaEditList = new ASAEditList("sub-menu-action",response['data']);
							asaEditList.init();
						}else{
							alertify.error(response['msg']);
							showAjaxError(response['msg']);
						}   

			        }).fail(function () {
			        	showAjaxError("Failed to load Adopto System Administrators due to System Fault.");
			        	alertify.error("Failed to load Adopto System Administrators due to System Fault.");
			        });
					
					break;
				case "MSL":
					$.ajax({
			            url: "restAPI/user/msl/all",
			            context: document.body
			        }).done(function (response) {

			        	if (response && response['type'] === 'SUCCESS') {
			        		$(document).trigger('move/sub/actions');
							var mslEditList = new MSLEditList("sub-menu-action",response['data']);
							mslEditList.init();
						}else{
							alertify.error(response['msg']);
							showAjaxError(response['msg']);
						}   

			        }).fail(function () {
			        	showAjaxError("Failed to load Master Software Licensees due to System Fault.");
			        	alertify.error("Failed to load Master Software Licensees due to System Fault.");
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
	
	var asaEditUsers = new AsaEditUsers();
	asaEditUsers.init();	
	
});