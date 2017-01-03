var MSLNewUsers = function(){
	
	this.id = UUID();
	
};
MSLNewUsers.prototype = {

	init : function(){
		
		window.breadcrumb.addItem("Users", 'sub-menu-items',"resources/images/users_ico_black.png");
		window.breadcrumb.addItem("New", 'sub-menu-items');
		this._initEvents();
		
	},
	_initEvents : function(){
		
		$('.sub-menu-item').on('click',function(){
			
			var actionType = $(this).attr('data-type');
			
			switch(actionType){
				case "LM":
					$(document).trigger('move/sub/actions');
					var lmUser = new LMUser("sub-menu-action");
					lmUser.init();
					break;
				case "LEC":
					$(document).trigger('move/sub/actions');
					var lecUser = new LECUser("sub-menu-action");
					lecUser.init();
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
	
	var mslNewUsers = new MSLNewUsers();
	mslNewUsers.init();	
	
});