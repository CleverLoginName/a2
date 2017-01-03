var ASAEditCategoriesView = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();

};
ASAEditCategoriesView.prototype = {
		
    init: function () {

    	var _this = this;
        $('#' + this.id + '-edit-categories-loading').show();
        $.ajax({
            url: "restAPI/categories/list",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	_this.container.hide();
                $('#' + _this.id + '-edit-categories-loading').hide();
                var categoryList = new CategoryList('asa-categories-components',response['data']);
                categoryList.init();
                $('#asa-categories-components').show();
                           
            }else{
            	alertify.error(response['msg']);
            	showAjaxError(response['msg']);
            } 

        }).fail(function () {
        	alertify.error("Failed to load Categories due to System Fault.");
        	showAjaxError("Failed to load Categories due to System Fault.");
        });

    }


};

$(document).ready(function(){
	
	window.breadcrumb.addItem("Categories", 'asa-categories-content',"resources/images/cat_ico_black.png");
	
	var categoriesView = new ASAEditCategoriesView('asa-categories-content');
	categoriesView.init(); 
	
});