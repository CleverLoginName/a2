var ASASuppliersView = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();

};
ASASuppliersView.prototype = {

    init: function () {

        var _this = this;
        $.ajax({
            url: "restAPI/suppliers/list",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	$('#modal-loading').hide();
            	_this.container.hide();
            	var supplierListView = new SuppliersListView('asa-suppliers-components', response['data']);
                supplierListView.init();
                $('#asa-suppliers-components').show();    
            }else{
            	showAjaxError(response['msg']);
            	alertify.error(response['msg']);
            } 

        }).fail(function () {
        	showAjaxError("Failed to load Suppliers due to System Fault.");
        	alertify.error("Failed to load Suppliers due to System Fault.");
        });


    }
};

$(document).ready(function(){
	
	window.breadcrumb.addItem("Suppliers",'asa-suppliers-content',"resources/images/sup_ico_black.png");
    
	var suppliersView = new ASASuppliersView('asa-suppliers-content');
	suppliersView.init();  
	
});