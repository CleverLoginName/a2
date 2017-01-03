var ASANewSupplier = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();

};
ASANewSupplier.prototype = {

    init: function () {

        var _this = this;
        $.ajax({
            url: "restAPI/categories/list",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	$('#modal-loading').hide();
            	var catData = response['data'];
            	if( catData.length === 0){
            		alertify.error("Please Add Categories First");
            	}else{
                    _this.container.hide();
                    var newSupplier = new Supplier('asa-suppliers-components', response['data']);
                    newSupplier.init();
                    $('#asa-suppliers-components').show();    		
            	}         
            }else{
            	showAjaxError(response['msg']);
            	alertify.error(response['msg']);
            } 

        }).fail(function () {
        	showAjaxError("Failed to load Categories due to System Fault.");
        	alertify.error("Failed to load Categories due to System Fault.");
        });


    }
};

$(document).ready(function(){
	
	window.breadcrumb.addItem("Suppliers",'asa-suppliers-content',"resources/images/sup_ico_black.png");
    
	var suppliers = new ASANewSupplier('asa-suppliers-content');
	suppliers.init();  
	
});