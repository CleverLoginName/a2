var ASAEditList = function (containerId,data) {

    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;
    this.userHeadings = ["ID", "Username","Name", "Actions"];
    this.filedNames = ["id", "username","name", "actions"];

};
ASAEditList.prototype = {

    init: function () {

        this.container.empty();
        var wrapperTmpl = '<div><div class="row" id="usr-list-view"><div class="box">' +
            '<div class="box-header">' +
            '</div><div class="box-body table-responsive">';

        wrapperTmpl += this._getTableTmpl();

        wrapperTmpl += '</div></div></div><div class="row" id="usr-item-view" style="display:none;"></div></div>';

        $(wrapperTmpl).appendTo(this.container);

        this._initTable();
        this._initEvent();

        window.breadcrumb.addItem("Adopto System Administrators", this.container.attr('id'));

    },
    _getTableTmpl: function () {

        var tableWrapper = '<table id="user-table-view" class="table table-bordered table-striped table-view no-cursor ">';

        tableWrapper += this._getTableHeadingTmpl();

        tableWrapper += this._getTableBodyTmpl();

        tableWrapper += '</table>';

        return tableWrapper;

    },
    _getTableHeadingTmpl: function () {

        var tableHeadingTmpl = '<thead><tr>';

        for (var i = 0; i < this.userHeadings.length; i++) {

            tableHeadingTmpl += '<th>' + this.userHeadings[i] + '</th>';

        }

        tableHeadingTmpl += '</tr></thead>';

        return tableHeadingTmpl;

    },
    _getTableBodyTmpl: function () {

        var tableBodyTmpl = '<tbody>';

        for (var i = 0; i < this.data.length; i++) {

            tableBodyTmpl += '<tr data-user-id="' + this.data[i]['id'] + '">';

            for (var j = 0; j < this.filedNames.length; j++) {

                var filedName = this.filedNames[j];

                switch (filedName) {
                    case 'actions':
                    	
                    	if(window.username !== this.data[i]['username']){
	                        
                    		tableBodyTmpl += '<td data-id="' + this.data[i]['id'] + '-' + filedName + '" id="' + this.data[i]['id'] + '-' + filedName + '">';
                    		
                    		if(this.data[i]['enabled']){
                    			tableBodyTmpl += this._createDisableBtn(this.data[i]['id'], this.data[i]['credentialId']);
                    		}else{
                    			tableBodyTmpl += this._createEnableBtn(this.data[i]['id'], this.data[i]['credentialId']);
                    		}
                    		
                    		
                    		tableBodyTmpl += '<a class="action-btn btn-app" id="' + this.data[i]['id'] +  '-reset-action" data-user-id="' + this.data[i]['id'] + '" data-credential-id="' + this.data[i]['credentialId'] + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="Reset Password">' +
	                        '<i class="fa fa-key green-font"></i>' +
	                        '</a>' +
	                        
	                        '<a class="action-btn btn-app" id="' + this.data[i]['id'] +  '-remove-action" data-user-id="' + this.data[i]['id'] + '" data-credential-id="' + this.data[i]['credentialId'] + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="Remove User">' +
	                        '<i class="fa fa-times green-font"></i>' +
	                        '</a>' +
	                        
	                        '</td>';
                    	}else{
                    		tableBodyTmpl += '<td data-id="' + this.data[i]['id'] + '-' + filedName + '"></td>';
                    	}
                        break;
                    default:
                        tableBodyTmpl += '<td data-id="' + this.data[i]['id'] + '-' + filedName + '">' + this.data[i][filedName] + '</td>';
                }

            }

            tableBodyTmpl += '</tr>';

        }

        tableBodyTmpl += '</tbody>';

        return tableBodyTmpl;

    },
    _initTable: function () {

        $('#user-table-view').dataTable({
            "bPaginate": true,
            "bLengthChange": true,
            "bFilter": true,
            "bSort": true,
            "bInfo": true,
            "bAutoWidth": false
        });

    },
    _initEvent : function(){

        var _this = this;
        $('[data-toggle="tooltip"]').tooltip();


        $('#user-table-view').on('click','[id$="-reset-action"]',function(){

            var userCId = $(this).attr('data-credential-id');
            bootbox.dialog({
                closeButton: false,
                message: 'Are you sure,Do you want to reset password for this user?',
                className:"logout-dialog",
                buttons: {
                    main:{
                        label: "Yes",
                        callback: function(){
                        	_this._resetAction(userCId);
                        }
                    },
                    sucess:{
                        label: "No",
                        callback: function(){
                        	
                        }
                    }
                }       
            });


        });
        
        $('#user-table-view').on('click','[id$="-remove-action"]',function(){

            var userId = $(this).attr('data-user-id');
            var userCId = $(this).attr('data-credential-id');
            bootbox.dialog({
                closeButton: false,
                message: 'Are you sure,Do you want to remove this user?',
                className:"logout-dialog",
                buttons: {
                    main:{
                        label: "Yes",
                        callback: function(){
                        	_this._removeAction(userId,userCId);
                        }
                    },
                    sucess:{
                        label: "No",
                        callback: function(){
                        	
                        }
                    }
                }       
            });


        });
        
        $('#user-table-view').on('click','[id$="-enable-action"]',function(){

            var userId = $(this).attr('data-user-id');
            var userCId = $(this).attr('data-credential-id');
            bootbox.dialog({
                closeButton: false,
                message: 'Are you sure,Do you want to Enable this Account with it\'s associate accounts?',
                className:"logout-dialog",
                buttons: {
                    main:{
                        label: "Yes",
                        callback: function(){
                        	_this._enableAction(userId,userCId);
                        }
                    },
                    sucess:{
                        label: "No",
                        callback: function(){
                        	
                        }
                    }
                }       
            });


        });
        
        $('#user-table-view').on('click','[id$="-disable-action"]',function(){

            var userId = $(this).attr('data-user-id');
            var userCId = $(this).attr('data-credential-id');
            bootbox.dialog({
                closeButton: false,
                message: 'Are you sure,Do you want to Disable this Account with it\'s associate accounts?',
                className:"logout-dialog",
                buttons: {
                    main:{
                        label: "Yes",
                        callback: function(){
                        	_this._disableAction(userId,userCId);
                        }
                    },
                    sucess:{
                        label: "No",
                        callback: function(){
                        	
                        }
                    }
                }       
            });


        });
        

    },
    _resetAction : function(cId){

        var _this = this;
        $.ajax({
            url: "restAPI/user/" + cId + "/reset/password",
            context: document.body
        }).done(function (response) {

        	if (response && response['type'] === 'SUCCESS') {
        		  
        		alertify.success(response['msg']);
                
			}else{
				alertify.error(response['msg']);
			} 

        }).fail(function () {
        	alertify.error("Failed to Reset password due to System Fault.");
        });

    },
    _removeAction : function(id,cid){

        var _this = this;
        $.ajax({
            url: "restAPI/user/asa/" + id + "/cid/" + cid + "/remove",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
      		  
            	var oTable = $('#user-table-view').dataTable();
                oTable.fnDeleteRow(oTable.fnGetPosition( $('tr[data-user-id="' + id + '"]')[0] ));
                alertify.success(response['msg']);
                
                
			}else{
				alertify.error(response['msg']);
			} 

        }).fail(function () {
        	alertify.error("Failed to Remove user due to System Fault.");
        });

    },
    _enableAction : function(id,cid){

    	var _this = this;
    	
    	$.ajax({
            url: "restAPI/user/asa/" + id + "/cid/" + cid + "/enable",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
      		  
            	$('#' + id + '-enable-action').remove();
            	$(_this._createDisableBtn(id, cid)).prependTo($('#' + id + '-actions'));
            	$('[data-toggle="tooltip"]').tooltip();
            	
                alertify.success(response['msg']);
                
                
			}else{
				alertify.error(response['msg']);
			} 

        }).fail(function () {
        	alertify.error("Failed to Enable this account with it's associate accounts due to System Fault.");
        });
    },
    _disableAction : function(id,cid){

    	var _this = this;
    	
    	$.ajax({
            url: "restAPI/user/asa/" + id + "/cid/" + cid + "/disable",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
      		  
            	$('#' + id + '-disable-action').remove();
            	$(_this._createEnableBtn(id, cid)).prependTo($('#' + id + '-actions'));
            	$('[data-toggle="tooltip"]').tooltip();
            	
            	
                alertify.success(response['msg']);
                
                
			}else{
				alertify.error(response['msg']);
			} 

        }).fail(function () {
        	alertify.error("Failed to Disable this account with it's associate accounts due to System Fault.");
        });

    },
    _createEnableBtn : function(id,cid){
    	return '<a class="action-btn btn-app" id="' + id +  '-enable-action" data-user-id="' + id + '" data-credential-id="' + cid + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="Enable Account">' +
        '<i class="fa fa-plus green-font"></i>' +
        '</a>';
    },
    _createDisableBtn : function(id,cid){
    	return '<a class="action-btn btn-app" id="' + id +  '-disable-action" data-user-id="' + id + '" data-credential-id="' + cid + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="Disable Account">' +
        '<i class="fa fa-minus green-font"></i>' +
        '</a>';
    }

};
