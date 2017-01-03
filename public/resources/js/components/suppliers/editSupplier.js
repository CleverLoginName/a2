var EditSupplier = function (containerId,data,returningId,catgories) {

    this.containerId = containerId;
    this.returningId = returningId;
    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;
    this.categories = catgories;

};
EditSupplier.prototype = {

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


        var uiTemplate = '<form class="row new-item-from-wrapper" role="form" method="post" id="edit-supplier-form">' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Name</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="sup-frm-name" name="sup-frm-name" value="' + this.data['name'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Email</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required email" id="sup-frm-email" name="sup-frm-email" value="' + this.data['email'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Contact Number (Work)</label></section>' +
            '<section class="col-md-2"><input type="text" class="form-control required state" id="sup-frm-tel-home-state" name="sup-frm-tel-home-state" value="' + extractFromTel("STATE",this.data['contactNoWork'])+ '"/></section>' +
            '<section class="col-md-4"><input type="text" class="form-control required telNumberPart" id="sup-frm-tel-home-number" name="sup-frm-tel-home-number" value="' + extractFromTel("NUMBER",this.data['contactNoWork'])+ '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Contact Number (Mobile)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control contactNo" id="sup-frm-tel-mobile" name="sup-frm-tel-mobile" value="' + this.data['contactNoMobile'] + '"/></section>' +
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
            '<button id="' + this.id + '-edit-supplier-btn" type="submit" class="btn add-item-btn">Update <img src="resources/images/spinning-circles.svg" class="loading-img-btn" style="display:none;" id="' + this.id + '-edit-supplier-loading"/></button>' +
            '<button class="btn add-item-btn" id="sup-edit-back-btn" style="margin-right:10px;"><i class="fa fa-mail-reply"></i> Back</button>' +
            '</section>' +
            '</form>';

        return uiTemplate;

    },
    _initData : function(){

        $('#sup-frm-cat').val(this.data['category']);

    },
    _initEvents : function(){

        var _this = this;
        $("#edit-supplier-form").validate();

        $("#edit-supplier-form").submit(function (event) {

            if ($(this).find('input.error,select.error').length === 0) {

                var frmData = _this._collectData();
                _this._submitData(JSON.stringify(frmData));

            }

            event.preventDefault();

        });

        $('#sup-edit-back-btn').on('click',function(e){

            $('#' +  _this.containerId).hide();
            $('#' +  _this.returningId).show();

            e.preventDefault();

        });

    },
    _collectData : function(){

        this.data['name'] = $('#sup-frm-name').val();
        this.data['email'] = $('#sup-frm-email').val();
        this.data['contactNoWork'] = $('#sup-frm-tel-home-state').val() + "-" +  $('#sup-frm-tel-home-number').val();
        this.data['contactNoMobile'] = $('#sup-frm-tel-mobile').val();
        this.data['category'] = $('#sup-frm-cat').val();

        return this.data;

    },
    _submitData : function(data){

        var _this = this;
        $('#' + this.id + '-edit-supplier-loading').show();
        $('#' + this.id + '-edit-supplier-btn').attr('disabled',true);
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/supplier/update',
            data: data
        }).success(function (response) {
            if (response && response['type'] === 'SUCCESS') {
            	alertify.success(response['msg']);
            	$('#' + _this.id + '-edit-supplier-loading').hide();
                $('#' + _this.id + '-edit-supplier-btn').attr('disabled',false);
                $('#' +  _this.containerId).hide();
                $('#' +  _this.returningId).show();
                _this._updateView();
                
            }else{
				alertify.error(response['msg']);
			} 
        }).fail(function (e) {
        	alertify.error("Failed to Update Supplier due to System fault.");
            $('#' + _this.id + '-edit-supplier-loading').hide();
            $('#' + _this.id + '-edit-supplier-btn').attr('disabled',false);
        });


    },
    _updateView : function() {
		$(document).trigger('update/editSupplierView',{"supplierId":this.data['id'],"value":this.data['name'],"property":"name"});
		$(document).trigger('update/editSupplierView',{"supplierId":this.data['id'],"value":$("#sup-frm-cat option:selected").text(),"property":"category"});
	}

};
