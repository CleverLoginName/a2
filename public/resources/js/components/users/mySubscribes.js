var MySubscribes = function (containerId, data,userRole) {

    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = JSON.parse(data);
    this.userRole = userRole.toUpperCase();

};
MySubscribes.prototype = {

    init: function () {

        this.container.empty();
        var template = '<section class="box new-item-wrapper">' +
            '<section class="box-header"></section>' +
            '<section class="box-body">';

        template += this._initUI();

        template += '</section>' +
        '</section>';

        $(template).appendTo(this.container);       

        this._initData();
        this._initEvents();

    },
    _initUI: function () {

        var uiTemplate = '<form class="row new-item-from-wrapper" role="form" method="post" id="my-subscribe-change">' +
            '<section class="row form-group">' +
            '<section class="col-md-1"></section>' +
            '<section class="col-md-3"><label>Subscribes</label></section>' +
            '<section class="col-md-6">';
        
        if(this.userRole === 'MSL'){
        	 uiTemplate += '<label><input type="checkbox" id="my-subs-product">Products</label>';
        }else if(this.userRole === 'LEC'){
       	 	uiTemplate += '<label><input type="checkbox" id="my-subs-product">Products</label><label>';
        }else if(this.userRole === 'LM'){
       	 	uiTemplate += '<label><input type="checkbox" id="my-subs-product">Products</label><label><input type="checkbox" id="my-subs-projects">Projects</label>';
        }
        
            uiTemplate += '</section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row box-footer">' +
            '<button type="submit" class="btn add-item-btn">Update</button>' +
            '</section>' +
            '</form>';

        return uiTemplate;

    },
    _initData : function(){

        if(this.data['PRODUCTS']){
            $('#my-subs-product').attr('checked',true);
        }
        
        if(this.data['PROJECTS']){
            $('#my-subs-projects').attr('checked',true);
        }
    },
    _initEvents : function(){

        var _this = this;

        $("#my-subscribe-change").submit(function (event) {

            var frmData = _this._collectData();
                _this._submitData(JSON.stringify(frmData));

            event.preventDefault();

        });

    },
    _collectData : function(){

    
        if(this.userRole === 'MSL'){
        	this.data['PRODUCTS'] = $('#my-subs-product').is(":checked");
        }else if(this.userRole === 'LEC'){
        	this.data['PRODUCTS'] = $('#my-subs-product').is(":checked");
        }else if(this.userRole === 'LM'){
        	this.data['PRODUCTS'] = $('#my-subs-product').is(":checked");
        	this.data['PROJECTS'] = $('#my-subs-projects').is(":checked");
        }
        
        return this.data;

},
    _submitData : function(data){

        var _this = this;
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/subscriptions/' + window.userRole + '/' + window.username,
            data: data
        }).success(function (response) {
        	if (response && response['type'] === 'SUCCESS') {
        		alertify.success(response['msg']);
            }else{
            	alertify.error(response['msg']);
            } 
        }).fail(function (e) {
        	alertify.error("Failed to Update Subscribes due to System Fault.");
        });


    }

};
/**
 * 
 */