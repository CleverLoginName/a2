var ASAEditSuppliersView = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();

};
ASAEditSuppliersView.prototype = {

    init: function () {

        var _this = this;
        $.ajax({
            url: "restAPI/suppliers/list",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	$('#modal-loading').hide();
            	var editSuppliersListView = new EditSuppliersListView('asa-suppliers-components', response['data']);
            	editSuppliersListView.init();
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
    
	var suppliers = new ASAEditSuppliersView('asa-suppliers-content');
	suppliers.init();  
	
});