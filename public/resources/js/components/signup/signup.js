/**
 *
 */
var Signup = function(formId) {
    this.formId = formId;
    this.id = UUID();
    this.validator = null;
};
Signup.prototype = {

    init : function() {
        this._initEvents();
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

        data['name'] = $('#usr-frm-name').val();
        data['email'] = $('#usr-frm-email').val();
        data['contactNoHome'] = $('#usr-frm-tel-home-state').val() + "-" +  $('#usr-frm-tel-home-number').val();
        data['contactNoMobile'] = $('#usr-frm-tel-mobile').val();
        data['username'] = $('#usr-frm-username').val();
        data['password'] = $('#usr-frm-password').val();
        data['userRole'] = "CLIENT";
        data['enabled'] = true;
        data['subscribeForProduct'] = $('#usr-frm-subs-product').is(":checked");
        data['subscribeForProject'] = $('#usr-frm-subs-project').is(":checked");        
        
        return data;

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
        $('#usr-frm-subs-product').attr('checked',false);
        $('#usr-frm-subs-project').attr('checked',false);

    },
    _submitData : function(data){

        var _this = this;
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/user/signup',
            data: data
        }).success(function (response) {
        	bootbox.dialog({
                closeButton: false,
                message: 'Account Successfully Created. Click Login to get in.',
                className:"logout-dialog",
                buttons: {
                    sucess:{
                        label: "Login",
                        callback: function(){
                        	window.location = 'login';
                        }
                    }
                }       
            });
            _this._reset();
        }).fail(function (e) {
            alertify.error("Failed to create User");
        });


    }

};

$(document).ready(function(){

    var signup = new Signup("new-user-form");
    signup.init();

});