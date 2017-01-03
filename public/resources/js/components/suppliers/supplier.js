var Supplier = function(containerId,catgories){

    this.container = $('#' + containerId);
    this.id = UUID();
    this.validator = null;
    this.categories = catgories;

};
Supplier.prototype = {

    init : function(){

        this.container.empty();
        var template = '<section class="box new-item-wrapper">' +
            '<section class="box-header"></section>' +
            '<section class="box-body">';

        template += this._initUI();

        template += '</section>' +
        '</section>';

        $(template).appendTo(this.container);
        window.breadcrumb.addItem("New", this.container.attr('id'));

        this._initEvents();

    },
    _initUI : function(){


        var uiTemplate = '<form class="row new-item-from-wrapper" role="form" method="post" id="new-sup-form">' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Name</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="sup-frm-name" name="sup-frm-name"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Email</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required email" id="sup-frm-email" name="sup-frm-email"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Contact Number (Work)</label></section>' +
            '<section class="col-md-2"><input type="text" class="form-control required state" id="sup-frm-tel-home-state" name="sup-frm-tel-home-state"/></section>' +
            '<section class="col-md-4"><input type="text" class="form-control required telNumberPart" id="sup-frm-tel-home-number" name="sup-frm-tel-home-number"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Contact Number (Mobile)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control contactNo" id="sup-frm-tel-mobile" name="sup-frm-tel-mobile"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Category</label></section>' +
            '<section class="col-md-6">' +
            '<select class="form-control required notselected" id="sup-frm-cat" name="sup-frm-cat">' +
            '<option value="default">Select Category</option>';
        
        
            for(var i = 0 ; i < this.categories.length; i++){
                
                var catName = this.categories[i]['name'],
                catId = this.categories[i]['id'];
                uiTemplate += '<option value="' + catId + '">' + catName + '</option>';
                
            }
        
            uiTemplate += '</select>' +
            '</section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row box-footer">' +
            '<button id="' + this.id + '-new-supplier-btn" type="submit" class="btn add-item-btn">Add <img src="resources/images/spinning-circles.svg" class="loading-img-btn" style="display:none;" id="' + this.id + '-new-supplier-loading"/></button>' +
            '<button id="sup-frm-reset" class="btn add-item-btn" style="margin-right:10px;">Reset</button>' +
            '</section>' +
            '</form>';

        return uiTemplate;

    },
    _initEvents : function(){

        var _this = this;
        this.validator  = $("#new-sup-form").validate();

        $("#new-sup-form").submit(function (event) {

            if ($(this).find('input.error,select.error').length === 0) {

                var frmData = _this._collectData();
                _this._submitData(JSON.stringify(frmData));

            }

            event.preventDefault();

        });

        $('#sup-frm-reset').on('click',function(e){

            _this._reset();
            _this.validator.resetForm();
            e.preventDefault();

        });

    },
    _collectData : function(){

        var data = new Object();

        data['name'] = $('#sup-frm-name').val();
        data['email'] = $('#sup-frm-email').val();
        data['contactNoWork'] = $('#sup-frm-tel-home-state').val() + "-" +  $('#sup-frm-tel-home-number').val();
        data['contactNoMobile'] = $('#sup-frm-tel-mobile').val();
        data['category'] = $('#sup-frm-cat').val();

        return data;

    },
    _reset : function() {

        $('#sup-frm-name').val('');
        $('#sup-frm-email').val('');
        $('#sup-frm-tel').val('');
        $('#sup-frm-cat').val('default');
        $('#sup-frm-tel-home-state').val('');
        $('#sup-frm-tel-home-number').val('');
        $('#sup-frm-tel-mobile').val('');

    },
    _submitData : function(data){

        var _this = this;
        $('#' + this.id + '-new-supplier-loading').show();
        $('#' + this.id + '-new-supplier-btn').attr('disabled',true);
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/supplier/save',
            data: data
        }).success(function (response) {
            if (response && response['type'] === 'SUCCESS') {
            	alertify.success(response['msg']);
            	$('#' + _this.id + '-new-supplier-loading').hide();
                $('#' + _this.id + '-new-supplier-btn').attr('disabled',false);
                _this._reset();             
                           
            }else{
            	alertify.error(response['msg']);
            	$('#' + _this.id + '-new-supplier-loading').hide();
                $('#' + _this.id + '-new-supplier-btn').attr('disabled',false);
            } 
            
        }).fail(function (e) {
        	alertify.error("Failed to Save Supplier due to System Fault.");
            $('#' + _this.id + '-new-supplier-loading').hide();
            $('#' + _this.id + '-new-supplier-btn').attr('disabled',false);
        });


    }

};
