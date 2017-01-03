/**
 *
 */
var ChangePassword = function(containerId){

    this.container = $('#' + containerId);
    this.id = UUID();
    this.validator = null;

};
ChangePassword.prototype = {

    init : function(){

        this.container.empty();
        var template = '<section class="box new-item-wrapper">' +
            '<section class="box-header"></section>' +
            '<section class="box-body">';

        template += this._initUI();

        template += '</section>' +        
        '</section>';

        $(template).appendTo(this.container);
        window.breadcrumb.addItem("Change Password", this.container.attr('id'));
        
        this._initEvents();

    },
    _initUI : function(){


        var uiTemplate = '<form class="row new-item-from-wrapper" role="form" method="post" id="passwd-change">' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3 form-label"><label>Current Password</label></section>' +
            '<section class="col-md-5"><input type="password" class="form-control required" id="crt-passwd" name="crt-passwd"></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3 form-label"><label>New Password</label></section>' +
            '<section class="col-md-5">' + 
            '<input type="password" class="form-control required" id="new-passwd" name="new-passwd" data-toggle="popover" data-trigger="focus" title="" data-content="Password Must be contain at least 6 characters, including at least 1 number and include both lower and upper case letters" /></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3 form-label"><label>Confirm Password</label></section>' +
            '<section class="col-md-5">' + 
            '<input type="password" class="form-control" class="form-control required" id="usr-frm-confirm-password" name="usr-frm-confirm-password"></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row box-footer">' +
            '<button type="submit" class="btn add-item-btn">Change</button>' +
            '<button id="usr-frm-reset" class="btn add-item-btn" style="margin-right:10px;">Reset</button>' +
            '</section>' +
            '</form>';

        return uiTemplate;

    },
    _initEvents : function(){

        var _this = this;
        
        $('#new-passwd').popover({
        	container: 'body'
        });
        
        this.validator = $("#passwd-change").validate({

            rules: {
                "usr-frm-confirm-password":{
                    required :true,
                    equalTo: "#new-passwd"
                },
                "new-passwd" : {
                	noSpace : true,
                	passwordStrength:true
                }
            },
            messages: {
                "usr-frm-confirm-password" :{"equalTo":"Password Mismatch."},
                "new-passwd" :{"noSpace" : "Not a valid Password","passwordStrength" : "Not a valid Password"}
            }

        });

        $("#passwd-change").submit(function (event) {

            if ($(this).find('input.error,select.error').length === 0) {

                var frmData = _this._collectData();
                _this._submitData(JSON.stringify(frmData));

            }

            event.preventDefault();

        });
        
        $('#usr-frm-reset').on('click',function(e){
        	
        	_this._reset();
        	_this.validator.resetForm();
        	e.preventDefault();
        	
        });

    },
    _collectData : function(){

        var data = new Object();

        data['password'] = $('#crt-passwd').val();
        data['newPassword'] = $('#new-passwd').val();
        data['username'] = window.username;

        return data;

    },
    _reset : function() {

    	$('#crt-passwd').val('');
    	$('#new-passwd').val('');
    	$('#usr-frm-confirm-password').val('');

    },
    _submitData : function(data){

    	var _this = this;
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/user/change/password',
            data: data
        }).success(function (response) {
            
        	if(response['type'] === "ERROR"){
        		alertify.error(response['msg']);
        	}else{
        		bootbox.dialog({
                    closeButton: false,
                    message: response['msg'],
                    className:"logout-dialog",
                    buttons: {
                        sucess:{
                            label: "Logout",
                            callback: function(){
                            	window.location = 'login?logout';
                            }
                        }
                    }       
                });
        	}
            _this._reset();
        }).fail(function (e) {
        	alertify.error("Failed to change password due to System Fault.");
        });



    }

};
