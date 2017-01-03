var ASAViewCategories = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();

};
ASAViewCategories.prototype = {
		
    init: function () {

    	var _this = this;
    	$('#' + this.id + '-view-categories-loading').show();
        $.ajax({
            url: "restAPI/categories/view/list",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	_this.container.hide();
            	$('#' + _this.id + '-view-categories-loading').hide();
                var categoryViewList = new CategoryViewList('asa-categories-components',response['data']);
                categoryViewList.init();
                $('#asa-categories-components').show();
                           
            }else{
            	alertify.error(response['msg']);
            	showAjaxError(response['msg']);
            } 

        }).fail(function () {
        	showAjaxError("Failed to load Categories due to System Fault.");
        	alertify.error("Failed to load Categories due to System Fault.");
        });

    }


};

$(document).ready(function(){
	
	window.breadcrumb.addItem("Categories", 'asa-categories-content',"resources/images/cat_ico_black.png");
	
	var categoriesView = new ASAViewCategories('asa-categories-content');
	categoriesView.init(); 
	
});