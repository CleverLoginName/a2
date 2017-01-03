/**
 *
 */
var LECEditProfile = function (containerId,data) {

    this.containerId = containerId;
    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;

};
LECEditProfile.prototype = {

    init: function () {

        this.container.empty();
        var template = '<section class="box new-item-wrapper">' +
            '<section class="box-header"></section>' +
            '<section class="box-body">';

        template += this._initUI();

        template += '</section>' +
        '</section>';

        $(template).appendTo(this.container);
        
        window.breadcrumb.addItem("Edit", this.container.attr('id'));

        this._initEvents();

    },
    _initUI: function () {


        var uiTemplate = '<form class="row new-item-from-wrapper" role="form" method="post" id="edit-user-form">' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Name</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="usr-frm-name" name="usr-frm-name" value="' + this.data['name'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Email</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required email" id="usr-frm-email" name="usr-frm-email" value="' + this.data['email'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Contact Number (Home)</label></section>' +
            '<section class="col-md-2"><input type="text" class="form-control required state" id="usr-frm-tel-home-state" name="usr-frm-tel-home-state" value="' + extractFromTel("STATE",this.data['contactNoHome'])+ '"/></section>' +
            '<section class="col-md-4"><input type="text" class="form-control required telNumberPart" id="usr-frm-tel-home-number" name="usr-frm-tel-home-number" value="' + extractFromTel("NUMBER",this.data['contactNoHome'])+ '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Contact Number (Mobile)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control contactNo" id="usr-frm-tel-mobile" name="usr-frm-tel-mobile" value="' + this.data['contactNoMobile'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="row margin-bottom-10">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Profile Picture (Current)</label></section>' +
            '<section class="col-md-6 img-preview"><img class="border-img product-case-img" src="' + this.data['userImageBase64'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row margin-top-20">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Profile Picture (New)</label></section>' +
            '<section class="col-md-6"><input type="file" class="form-control imageOpt" id="usr-frm-image" name="image" accept="image/jpg,image/jpeg,image/png"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '</section>' + 
            '<section class="row form-group" style="display:none;">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>User Role</label></section>' +
            '<section class="col-md-6">' +
            '<input type="text" class="form-control" id="usr-frm-role" name="usr-frm-role" value="' + this.data['userRole'] + '" readonly/>'+
            '</section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row box-footer">' +
	        '<button id="' + this.id + '-edit-user-btn" type="submit" class="btn add-item-btn" >Update <img src="resources/images/spinning-circles.svg" class="loading-img-btn" style="display:none;" id="' + this.id + '-edit-user-loading"/></button>' +
	        '</section>' +
	        '</form>';

        return uiTemplate;

    },
    _initEvents : function(){

        var _this = this;
        $("#edit-user-form").validate();

        $("#edit-user-form").submit(function (event) {

            if ($(this).find('input.error,select.error').length === 0) {

                var frmData = new FormData($(this)[0]);
                _this._submitData(frmData);

            }

            event.preventDefault();

        });

    },
    _submitData : function(data){

        var _this = this;
        $('#' + this.id + '-edit-user-loading').show();
        $('#' + this.id + '-edit-user-btn').attr('disabled',true);
        $.ajax({
            type: 'POST',
            url: 'restAPI/user/lec/' + _this.data['id'] + '/update',
            data: data,
            processData: false,
            contentType: false,
            cache:false
        }).success(function (response) {
            $('#' + _this.id + '-edit-user-loading').hide();
            $('#' + _this.id + '-edit-user-btn').attr('disabled',false);
            if (response && response['type'] === 'SUCCESS') {
        		alertify.success(response['msg']);
        		
        		setTimeout(function(){        			 
                    location.href = 'lec-view-profile';
        		}, 200);
        		
			}else{
				alertify.error(response['msg']);
			} 

        }).fail(function (e) {
        	alertify.error("Failed to Update Customer's profile due to System Fault.");
            $('#' + _this.id + '-edit-user-loading').hide();
            $('#' + _this.id + '-edit-user-btn').attr('disabled',false);
        });


    }

};
