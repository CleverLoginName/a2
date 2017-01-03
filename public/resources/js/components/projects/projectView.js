var ProjectView = function (containerId,data,returningId) {

    this.containerId = containerId;
    this.returningId = returningId;
    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;

};
ProjectView.prototype = {

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
	        '<section class="col-md-3"><label class="consultant-project-lbl">Project Info</label></section>' +
	        '<section class="col-md-5"></section>' +
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
            '<section class="col-md-3"><label>Title</label></section>' +
            '<section class="col-md-5"><label>' + this.data['title'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Location</label></section>' +
            '<section class="col-md-5"><label>' + this.data['location'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +   
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Description</label></section>' +
            '<section class="col-md-5"><label>' + this.data['description'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +   
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Budget  (<i class="fa fa-dollar"></i>)</label></section>' +
            '<section class="col-md-5"><label>' + this.data['budget'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +   
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Energy Consumption (W)</label></section>' +
            '<section class="col-md-5"><label>' + this.data['energyConsumption'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +  
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Status</label></section>' +
            '<section class="col-md-5"><label>' + this.data['status'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Created On</label></section>' +
            '<section class="col-md-5"><label>' + formatDate('long',this.data['createdDate']) + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            
            '<section class="row form-group margin-top-30">' +
	        '<section class="col-md-2"></section>' +
	        '<section class="col-md-3"><label class="consultant-project-lbl">Client Info</label></section>' +
	        '<section class="col-md-5"></section>' +
	        '<section class="col-md-2"></section>' +
	        '</section>' +
	        '<section class="row form-group" style="margin-bottom:30px;">' +
	        '<section class="col-md-2"></section>' +
	        '<section class="col-md-8 img-preview"><img class="border-img product-case-img" src="' + this.data['projectOwner']['userImageBase64'] + '"/></section>' +
	        '<section class="col-md-2"></section>' +
	        '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>ID</label></section>' +
            '<section class="col-md-5"><label>' + this.data['projectOwner']['id'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Name</label></section>' +
            '<section class="col-md-5"><label>' + this.data['projectOwner']['name'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Email</label></section>' +
            '<section class="col-md-5"><label>' + this.data['projectOwner']['email'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Username</label></section>' +
            '<section class="col-md-5"><label>' + this.data['projectOwner']['username'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Contact Number Home</label></section>' +
            '<section class="col-md-5"><label>' + this.data['projectOwner']['contactNoHome'].replace('-','') + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Contact Number Mobile</label></section>' +
            '<section class="col-md-5"><label>' + this.data['projectOwner']['contactNoMobile'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>';
        
        if(this.data['consultant']){
        	
        	uiTemplate += '<section class="row form-group margin-top-30">' +
	        '<section class="col-md-2"></section>' +
	        '<section class="col-md-3"><label class="consultant-project-lbl">Consultant Info</label></section>' +
	        '<section class="col-md-5"></section>' +
	        '<section class="col-md-2"></section>' +
	        '</section>' +
	        '<section class="row form-group" style="margin-bottom:30px;">' +
	        '<section class="col-md-2"></section>' +
	        '<section class="col-md-8 img-preview"><img class="border-img product-case-img" src="' + this.data['consultant']['userImageBase64'] + '"/></section>' +
	        '<section class="col-md-2"></section>' +
	        '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>ID</label></section>' +
            '<section class="col-md-5"><label>' + this.data['consultant']['id'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Name</label></section>' +
            '<section class="col-md-5"><label>' + this.data['consultant']['name'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Email</label></section>' +
            '<section class="col-md-5"><label>' + this.data['consultant']['email'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Username</label></section>' +
            '<section class="col-md-5"><label>' + this.data['consultant']['username'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Contact Number Home</label></section>' +
            '<section class="col-md-5"><label>' + this.data['consultant']['contactNoHome'].replace('-','') + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Contact Number Mobile</label></section>' +
            '<section class="col-md-5"><label>' + this.data['consultant']['contactNoMobile'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>';
        	
        }
            
            uiTemplate += '<section class="row box-footer">' +
            '<button class="btn add-item-btn" id="proj-edit-back-btn"><i class="fa fa-mail-reply"></i> Back</button>' +
            '</section>' +
            '</form>';

        return uiTemplate;

    },
    _initEvents : function(){

        var _this = this;

        $('#proj-edit-back-btn').on('click',function(e){

            $('#' +  _this.containerId).hide();
            $('#' +  _this.returningId).show();

            e.preventDefault();

        });

    }

};
