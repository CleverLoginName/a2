var MSLProducts = function(){
	
	this.id = UUID();
	
};
MSLProducts.prototype = {

	init : function(){
		
		window.breadcrumb.addItem("Products", 'msl-products-content','resources/images/products_ico_black.png');
		this._initEvents();
		
	},
	_initEvents : function(){
		
		var _this = this;
		$.ajax({
            url: "restAPI/categories/list",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	
            	var categories = response['data'];
            	
            	if(categories.length === 0){
            		$('#msl-products-content').empty();
            		$('<span class="label label-danger product-case-empty">Sorry !.. There are no product Catelogues found at this moment.</span>').appendTo($('#msl-products-content'));                	
            	}else{
            		_this._loadProducts(categories);
            	}
            	
            	
            }else{
            	$('#msl-products-content').empty();
        		$('<span class="label label-danger product-case-empty">' + response['msg'] + '</span>').appendTo($('#msl-products-content'));
            	alertify.error(response['msg']);
            } 

        }).fail(function () {
        	$('#msl-products-content').empty();
    		$('<span class="label label-danger product-case-empty">Failed to load Categories due to System Fault</span>').appendTo($('#msl-products-content'));        	
        	alertify.error("Failed to load Categories due to System Fault.");
        });

	},
	_loadProducts : function(categories){
		
		$.ajax({
	        url: "restAPI/products/case/all",
	        context: document.body
	    }).done(function (response) {
	    	
	    	
	    	if (response && response['type'] === 'SUCCESS') {
            	
	    		if(response['data'].length === 0){
		    		$('#msl-products-content').empty();
		    		$('<span class="label label-danger product-case-empty">Sorry !.. There are no products at this moment.</span>').appendTo($('#msl-products-content'));
		    	}else{       	
		        	
		        	var productCase = new ProductCase('msl-products-content',response['data'],categories);
		            productCase.init(); 
		        	
		    	}
            	
            	
            }else{
            	$('#msl-products-content').empty();
        		$('<span class="label label-danger product-case-empty">' + response['msg'] + '</span>').appendTo($('#msl-products-content'));
            	alertify.error(response['msg']);
            } 

	    }).fail(function () {
	    	$('#msl-products-content').empty();
    		$('<span class="label label-danger product-case-empty">Failed to load Products due to System Fault</span>').appendTo($('#msl-products-content'));        	
        	alertify.error("Failed to load Products due to System Fault.");
	    });
		
	}
		
};

$(document).ready(function(){	
	
	var mslProducts = new MSLProducts();
	mslProducts.init();	
	
});