var MSLViewProducts = function(){
	
	this.id = UUID();
	
};
MSLViewProducts.prototype = {

	init : function(){
		
		window.breadcrumb.addItem("Product", 'sub-menu-items',"resources/images/products_ico_black.png");
		window.breadcrumb.addItem("View", 'sub-menu-items');
		this._initUI();
		
	},
	_initUI : function(){
		
		var _this = this;
		$.ajax({
            url: "restAPI/categories/list",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	$('#modal-loading').hide();
    			$('#sub-menu-items').show();
            	var data = response['data'];
            	for(var i = 0 ; i < data.length; i++){
            		
            		$('<div class="col-md-4 sub-menu-item" data-id="' + data[i]['id'] + '" data-type="' + replaceAll(' ','_',data[i]['name']) + '">' + data[i]['name'] + '</div>').appendTo($('#sub-menu-items'));
            		
            	}
            	
            	_this._initEvents();
                           
            }else{
            	showAjaxError(response['msg']);
            	alertify.error(response['msg']);
            } 

        }).fail(function () {
        	showAjaxError("Failed to load Categories due to System Fault.");
        	alertify.error("Failed to load Categories due to System Fault.");
        });
		
	},
	_initEvents : function(){
		
		var _this = this;
		$('.sub-menu-item').on('click',function(){
			
			var actionType = $(this).attr('data-type'),
				catId = $(this).attr('data-id');
			
			switch(actionType){
				case "Electrical":
					$(document).trigger('move/sub/actions');
					_this._productListUI("Electrical",catId);					
					break;
				case "Audio_Visual":
					$(document).trigger('move/sub/actions');
					_this._productListUI("Audio_Visual",catId);	
					break;
				case "Interior_Design":
					$(document).trigger('move/sub/actions');
					_this._productListUI("Interior_Design",catId);
					break;
				case "Fittings_and_Fixtures":
					$(document).trigger('move/sub/actions');
					_this._productListUI("Fittings_and_Fixtures",catId);
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
		
	},
	_productListUI : function(catType,catId) {
		
		$.ajax({
            url: "restAPI/category/" + catId + "/products/all",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	
            	var asaProductsList = new ASAProductsList("sub-menu-action",response['data'],catType);
            	asaProductsList.init();
            	
            }else{
            	alertify.error(response['msg']);
            	showAjaxError(response['msg']);
            } 

        }).fail(function () {
        	showAjaxError("Failed to get Products List due to System Fault.");
        	alertify.error("Failed to get Products List due to System Fault.");
        });
		
	}
		
};

$(document).ready(function(){	
	
	var mslViewProducts = new MSLViewProducts();
	mslViewProducts.init();	
	
});