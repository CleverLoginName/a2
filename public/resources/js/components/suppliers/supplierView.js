var SupplierView = function (containerId,data,returningId) {

    this.containerId = containerId;
    this.returningId = returningId;
    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;

};
SupplierView.prototype = {

    init: function () {

        this.container.empty();
        var template = '<section class="box new-item-wrapper">' +
            '<section class="box-header"></section>' +
            '<section class="box-body">';

        template += this._initUI();

        template += '</section>' +
        '</section>';

        $(template).appendTo(this.container);

        this._initEvents();

    },
    _initUI: function () {


        var uiTemplate = '<form class="row new-item-from-wrapper">' +
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
            '<section class="col-md-3"><label>Contact Number (Work)</label></section>' +
            '<section class="col-md-5"><label>' + this.data['contactNoWork'].replace('-','') + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Contact Number (Mobile)</label></section>' +
            '<section class="col-md-5"><label>' + this.data['contactNoMobile'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>';
        
        if((this.data['category'] !== null)){
        	
        	uiTemplate += '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Category</label></section>' +
            '<section class="col-md-5"><label>' + this.data['category'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="col-md-2"></section>' +
            '</section>';
        	
        }
            
            uiTemplate += '<section class="row box-footer">' +
            '<button class="btn add-item-btn" id="sup-edit-back-btn"><i class="fa fa-mail-reply"></i> Back</button>' +
            '</section>' +
            '</form>';

        return uiTemplate;

    },
    _initEvents : function(){

        var _this = this;

        $('#sup-edit-back-btn').on('click',function(e){

            $('#' +  _this.containerId).hide();
            $('#' +  _this.returningId).show();

            e.preventDefault();

        });

    }

};
