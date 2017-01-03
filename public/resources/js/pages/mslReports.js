var MSLReports = function(){
	
	this.id = UUID();
	
};
MSLReports.prototype = {

	init : function(){
		
		window.breadcrumb.addItem("Reports", 'sub-menu-items',"resources/images/report_ico_black.png");
		window.breadcrumb.addItem("View", 'sub-menu-items');
		this._initEvents();
		
	},
	_initEvents : function(){
		
		var _this = this;
		$('.sub-menu-item').on('click',function(){
			
			var actionType = $(this).attr('data-type');
			
			switch(actionType){
				case "PR":
					$(document).trigger('move/sub/actions');
					_this._showReport("Product Report","restAPI/reports/products/list");
					break;
			}
			
			
		});
		
		$(document).on('move/sub/items',function(){
			
			$('#sub-menu-action').empty();
			$('#sub-menu-action').hide();
			$('#sub-menu-items').show();
			
		});
		
		$(document).on('move/sub/actions',function(){
			
			$('#modal-loading').show();
			$('#sub-menu-items').hide();
			$('#sub-menu-action').show();
			
		});
		
	},
	_showReport : function(title,url){				
		
		$.ajax({
            url: url,
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	
            	var objHeight = $('.wrapper').height() *.8
            	$('<embed title="' + title + '" width="100%" height="' + objHeight + 'px" src="' + response['data'] + '">').appendTo($('#sub-menu-action'));
                           
            }else{
            	alertify.error(response['msg']);
            	showAjaxError(response['msg']);
            } 
            
            $('#modal-loading').hide();

        }).fail(function () {
        	alertify.error("Failed to prepare Report due to System Fault.");
        	showAjaxError("Failed to prepare Report due to System Fault.");
        });
		
		
	}
		
};

$(document).ready(function(){	
	
	var mslReports = new MSLReports();
	mslReports.init();	
	
});