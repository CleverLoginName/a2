/**
 *
 */
var LECUser = function (containerId) {

    this.container = $('#' + containerId);
    this.id = UUID();
    this.validator = null;

};
LECUser.prototype = {

    init: function () {

        this.container.empty();
        var template = '<section class="box new-item-wrapper">' +
            '<section class="box-header"></section>' +
            '<section class="box-body">';

        template += this._initUI();

        template += '</section>' +
        '</section>';

        $(template).appendTo(this.container);
        window.breadcrumb.addItem("Customer", this.container.attr('id'));

        this._initEvents();

    },
    _initUI: function () {


        var uiTemplate = '<form class="row new-item-from-wrapper" role="form" method="post" id="new-user-form">' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Name</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="usr-frm-name" name="usr-frm-name"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Email</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required email" id="usr-frm-email" name="usr-frm-email"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Contact Number (Home)</label></section>' +
            '<section class="col-md-2"><input type="text" class="form-control required state" id="usr-frm-tel-home-state" name="usr-frm-tel-home-state"/></section>' +
            '<section class="col-md-4"><input type="text" class="form-control required telNumberPart" id="usr-frm-tel-home-number" name="usr-frm-tel-home-number"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Contact Number (Mobile)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control contactNo" id="usr-frm-tel-mobile" name="usr-frm-tel-mobile"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Username</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required noWhiteSpacesUsername" id="usr-frm-username" name="usr-frm-username" data-toggle="popover" data-trigger="focus" title="" data-content="Spaces are not allowed."></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Password</label></section>' +
            '<section class="col-md-6"><input type="password" class="form-control required" id="usr-frm-password" name="usr-frm-password" data-toggle="popover" data-trigger="focus" title="" data-content="Password Must be contain at least 6 characters, including at least 1 number and include both lower and upper case letters"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Confirm Password</label></section>' +
            '<section class="col-md-6"><input type="password" class="form-control required" id="usr-frm-confirm-password" name="usr-frm-confirm-password"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Profile Picture</label></section>' +
            '<section class="col-md-6"><input type="file" class="form-control image" id="usr-frm-image" name="image" accept="image/jpg,image/jpeg,image/png"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' + 
            '<section class="row form-group" style="display:none;">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Owner</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control" id="usr-frm-owner" name="usr-frm-owner" value="' + window.username + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row box-footer">' +
            '<button id="' + this.id + '-new-user-btn" type="submit" class="btn add-item-btn">Add <img src="resources/images/spinning-circles.svg" class="loading-img-btn" style="display:none;" id="' + this.id + '-new-user-loading"/></button>' +
            '<button id="usr-frm-reset" class="btn add-item-btn" style="margin-right:10px;">Reset</button>' +
            '</section>' +
            '</form>';

        return uiTemplate;

    },
    _initEvents : function(){

        var _this = this;

        $('#usr-frm-username').popover({
            container: 'body'
        });

        $('#usr-frm-password').popover({
            container: 'body'
        });

        this.validator = $("#new-user-form").validate({

            rules: {
                "usr-frm-confirm-password":{
                    required :true,
                    equalTo: "#usr-frm-password"
                },
                "usr-frm-username": {
                    required: true,
                    noSpace : true,
                    remote: {
                        url: "restAPI/user/available",
                        type: "post",
                        username:function(){
                            return $('#usr-frm-username').val();
                        }
                    }
                },
                "usr-frm-password" : {
                    noSpace : true,
                    passwordStrength:true
                }
            },
            messages: {
                "usr-frm-confirm-password" :{"equalTo":"Password Mismatch."},
                "usr-frm-username" : {"remote":" Username already exists.","noSpace" : "Not a valid Username"},
                "usr-frm-password" :{"noSpace" : "Not a valid Password","passwordStrength" : "Not a valid Password"}
            }

        });

        $("#new-user-form").submit(function (event) {

            if ($(this).find('input.error,select.error').length === 0) {

                var frmData = new FormData($(this)[0]);
                _this._submitData(frmData);

            }

            event.preventDefault();

        });

        $('#usr-frm-reset').on('click',function(e){

            _this._reset();
            _this.validator.resetForm();
            e.preventDefault();

        });

    },
    _reset : function() {

        $('#usr-frm-name').val('');
        $('#usr-frm-email').val('');
        $('#usr-frm-tel-home-state').val('');
        $('#usr-frm-tel-home-number').val('');
        $('#usr-frm-tel-mobile').val('');
        $('#usr-frm-username').val('');
        $('#usr-frm-password').val('');
        $('#usr-frm-confirm-password').val('');
        $('#usr-frm-image').val('');

    },
    _submitData : function(data){

        var _this = this;
        $('#' + this.id + '-new-user-loading').show();
        $('#' + this.id + '-new-user-btn').attr('disabled',true);
        $.ajax({
            type: 'POST',
            url: 'restAPI/user/lec/save',
            data: data,
            processData: false,
            contentType: false,
            cache:false
        }).success(function (response) {
        	
        	if (response && response['type'] === 'SUCCESS') {
        		bootbox.dialog({
                    closeButton: false,
                    message: response['msg'] + ' Press "Create Project" to create a new project for the customer.',
                    className:"logout-dialog",
                    buttons: {
                        main:{
                            label: "Create Project",
                            callback: function(){
                            	window.location.href = "msl-new-project?customer=" + response['data'];
                            }
                        },
                        sucess:{
                            label: "Exit",
                            callback: function(){
                            	
                            }
                        }
                    }       
                });
			}else{
				alertify.error(response['msg']);
			}            
            $('#' + _this.id + '-new-user-loading').hide();
            $('#' + _this.id + '-new-user-btn').attr('disabled',false);
            _this._reset();
        }).fail(function (e) {
            alertify.error("Failed to create Customer due to System Fault.");
            $('#' + _this.id + '-new-user-loading').hide();
            $('#' + _this.id + '-new-user-btn').attr('disabled',false);
        });


    }

};
