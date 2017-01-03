var ASANewProduct = function(){
	
	this.id = UUID();
	
};
ASANewProduct.prototype = {

	init : function(){
		
		window.breadcrumb.addItem("Product", 'sub-menu-items',"resources/images/products_ico_black.png");
		window.breadcrumb.addItem("New", 'sub-menu-items');
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
					_this._productUI("Electrical",catId);					
					break;
				case "Audio_Visual":
					$(document).trigger('move/sub/actions');
					_this._productUI("Audio_Visual",catId);
					break;
				case "Interior_Design":
					$(document).trigger('move/sub/actions');
					_this._productUI("Interior_Design",catId);
					break;
				case "Fittings_and_Fixtures":
					$(document).trigger('move/sub/actions');
					_this._productUI("Fittings_and_Fixtures",catId);
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
	_productUI : function(productType,catId) {
		
		$.ajax({
            url: "restAPI/category/" + catId + "/product/init",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	var initData = response['data'];
            	
            	if(!(initData['category'] && initData['category']['categoryTpes'] && initData['category']['subCategories'] && initData['suppliers'] && initData['symbols'])){
            		alertify.error("Failed to load Some Product Init Parameters due to System Fault.");
            	}else if(initData['category']['subCategories'].length === 0){
            		alertify.error("No Sub Category created for this Category. Please create Sub Categories first and try again later");
            	}else if(initData['category']['categoryTpes'].length === 0){
            		alertify.error("No Category Types created for this Category. Please create Category Types first and try again later");
            	}else if(initData['suppliers'].length === 0){
            		alertify.error("No Suppliers Found. Please create Product Suppliers first and try again later");
            	}else if(initData['symbols'].length === 0){
            		alertify.error("No Symbols Found. Please add Product Symbols first and try again later");
            	}else{
            		
            		switch(productType){
            			case "Electrical" :
            				var newProduct = new ElectricalProduct("sub-menu-action",initData);
                            newProduct.init();
            				break;
            			case "Audio_Visual" :
            				var newProduct = new AudioAndVisualProduct("sub-menu-action",initData);
                            newProduct.init();
            				break;
            			case "Interior_Design" :
            				var newProduct = new InteriorDesignProduct("sub-menu-action",initData);
                            newProduct.init();
            				break;
            			case "Fittings_and_Fixtures" :
            				var newProduct = new FittingsAndFixturesProduct("sub-menu-action",initData);
                            newProduct.init();
            				break;
            		}
            		
            		
            	}
                           
            }else{
            	alertify.error(response['msg']);
            } 

        }).fail(function () {
        	alertify.error("Failed to load Product Init Data due to System Fault.");
        });
		
	}
		
};

$(document).ready(function(){	
	
	var asaNewProduct = new ASANewProduct();
	asaNewProduct.init();	
	
});