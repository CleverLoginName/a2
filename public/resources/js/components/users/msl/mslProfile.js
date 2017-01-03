var MSLProfile = function(containerId,data){

    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;

};
MSLProfile.prototype = {

    init : function(){

        this.container.empty();
        var template = '<section class="box new-item-wrapper">' +
            '<section class="box-header"></section>' +
            '<section class="box-body">';

        template += this._initUI();

        template += '</section>' +
        '</section>';

        $(template).appendTo(this.container);
        window.breadcrumb.addItem("View", this.container.attr('id'));

    },
    _initUI : function(){

        var uiTemplate = '<form class="row new-item-from-wrapper" role="form">' +
	        '<section class="row form-group" style="margin-bottom:30px;">' +
	        '<section class="col-md-2"></section>' +
	        '<section class="col-md-8 img-preview"><img class="border-img product-case-img" src="' + this.data['userImageBase64'] + '"/></section>' +
	        '<section class="col-md-2"></section>' +
	        '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>ID</label></section>' +
            '<section class="col-md-5"><label>' + this.data['id'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Name</label></section>' +
            '<section class="col-md-5"><label>' + this.data['name'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Email</label></section>' +
            '<section class="col-md-5"><label>' + this.data['email'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Contact Number (Home)</label></section>' +
            '<section class="col-md-5"><label>' + this.data['contactNoHome'].replace('-','') + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Contact Number (Mobile)</label></section>' +
            '<section class="col-md-5"><label>' + this.data['contactNoMobile'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Username</label></section>' +
            '<section class="col-md-5"><label>' + this.data['username'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Account Status</label></section>' +
            '<section class="col-md-5"><label>' + ((this.data['enabled'])? 'Enabled' : 'Disabled') + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Subscribes</label></section>' +
            '<section class="col-md-5">';
        
        var subscribes = JSON.parse(this.data['subscribes']);
        
        if(subscribes && subscribes['PRODUCTS']){
        	uiTemplate += '<i class="fa fa-check-square margin-right-10"></i>';
        }else{
        	uiTemplate += '<i class="fa fa-square-o margin-right-10"></i>';
        }
            
            uiTemplate += '<label>Products</label>' +
            '</section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '</form>';

        return uiTemplate;

    }

};
