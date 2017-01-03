var AsaNewUsers = function(){
	
	this.id = UUID();
	
};
AsaNewUsers.prototype = {

	init : function(){
		
		window.breadcrumb.addItem("Users", 'sub-menu-items',"resources/images/users_ico_black.png");
		window.breadcrumb.addItem("New", 'sub-menu-items');
		this._initEvents();
		
	},
	_initEvents : function(){
		
		$('.sub-menu-item').on('click',function(){
			
			var actionType = $(this).attr('data-type');
			
			switch(actionType){
				case "ASA":
					$(document).trigger('move/sub/actions');
					var asaUser = new ASAUser("sub-menu-action");
					asaUser.init();
					break;
				case "MSL":
					$(document).trigger('move/sub/actions');
					var mslUser = new MSLUser("sub-menu-action");
					mslUser.init();
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
	
	var asaNewUsers = new AsaNewUsers();
	asaNewUsers.init();	
	
});