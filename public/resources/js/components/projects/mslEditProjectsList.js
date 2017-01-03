var MSLEditProjectsList = function (containerId,data) {

    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;
    this.projectHeadings = ["ID", "Title","Customer Name","Status","Created On", "Actions"];
    this.filedNames = ["id", "title","ownerName","status", "createdDate" , "actions"];
    this.projectInitData = null;

};
MSLEditProjectsList.prototype = {

    init: function () {

        this.container.empty();
        var wrapperTmpl = '<div><div class="row" id="proj-list-view"><div class="box">' +
            '<div class="box-header">' +
            '</div><div class="box-body table-responsive">';

        wrapperTmpl += this._getTableTmpl();

        wrapperTmpl += '</div></div></div><div class="row" id="proj-edit-item-view" style="display:none;"></div></div>';

        $(wrapperTmpl).appendTo(this.container);

        this._initTable();
        this._initEvent();

        window.breadcrumb.addItem("Edit", this.container.attr('id'));

    },
    _getTableTmpl: function () {

        var tableWrapper = '<table id="edit-project-table-view" class="table table-bordered table-striped table-view no-cursor ">';

        tableWrapper += this._getTableHeadingTmpl();

        tableWrapper += this._getTableBodyTmpl();

        tableWrapper += '</table>';

        return tableWrapper;

    },
    _getTableHeadingTmpl: function () {

        var tableHeadingTmpl = '<thead><tr>';

        for (var i = 0; i < this.projectHeadings.length; i++) {

            tableHeadingTmpl += '<th>' + this.projectHeadings[i] + '</th>';

        }

        tableHeadingTmpl += '</tr></thead>';

        return tableHeadingTmpl;

    },
    _getTableBodyTmpl: function () {

        var tableBodyTmpl = '<tbody>';

        for (var i = 0; i < this.data.length; i++) {

            tableBodyTmpl += '<tr data-project-id="' + this.data[i]['id'] + '">';

            for (var j = 0; j < this.filedNames.length; j++) {

                var filedName = this.filedNames[j];

                switch (filedName) {
                    case 'actions':
                        tableBodyTmpl += '<td data-id="' + this.data[i]['id'] + '-' + filedName + '">' +
                        '<a class="action-btn btn-app" data-project-id="' + this.data[i]['id'] + '" id="' + this.data[i]['id'] +  '-edit-action" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit Project">' +
                        '<i class="fa fa-edit green-font"></i>' +
                        '</a>' +
                        '<a class="action-btn btn-app" data-project-id="' + this.data[i]['id'] + '" id="' + this.data[i]['id'] +  '-remove-action" data-toggle="tooltip" data-placement="top" title="" data-original-title="Remove Project">' +
                        '<i class="fa fa-times red-font"></i>' +
                        '</a>' +
                        '</td>';
                        break;
                    default:
                        tableBodyTmpl += '<td data-id="' + this.data[i]['id'] + '-' + filedName + '">' + this._formatProperty(filedName, this.data[i][filedName]) + '</td>';
                }

            }

            tableBodyTmpl += '</tr>';

        }

        tableBodyTmpl += '</tbody>';

        return tableBodyTmpl;

    },
    _initTable: function () {

        $('#edit-project-table-view').dataTable({
            "bPaginate": true,
            "bLengthChange": true,
            "bFilter": true,
            "bSort": true,
            "bInfo": true,
            "bAutoWidth": false,
            "columnDefs": [
                           { "width": "40%", "targets": 1 }
                         ],
                         "order": [[ 4, "desc" ]]
        });

    },
    _initEvent : function(){

        var _this = this;
        $('[data-toggle="tooltip"]').tooltip();

        $('#edit-project-table-view').on('click','[id$="-remove-action"]',function(){

            var projectId = $(this).attr('data-project-id');
            bootbox.dialog({
                closeButton: false,
                message: '<span style="color:red;font-weight:bold;">If you remove this project corresponding Plans will be deleted. </span> Are you sure,Do you want to remove this Project?',
                className:"logout-dialog",
                buttons: {
                    main:{
                        label: "Yes",
                        callback: function(){
                            _this._removeAction(projectId);
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

        $('#edit-project-table-view').on('click','[id$="-edit-action"]',function(){

            _this._editAction($(this).attr('data-project-id'));


        });
        
        $(document).on('update/editProjectView',function(e,data){
        	
        	$('[data-id="' + data.projectId + '-' + data.property + '"]').text(data.value);
        	
        });

    },
    _formatProperty: function (property, value) {

        var formattedValue = value;

        switch (property) {
         case 'createdDate':
         formattedValue = formatDate('long', value);
         break;

         }
         
        return formattedValue;

    },
    _removeAction : function(id){

        var _this = this;
        $.ajax({
            url: "restAPI/project/" + id + "/remove",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	var oTable = $('#edit-project-table-view').dataTable();
                oTable.fnDeleteRow(oTable.fnGetPosition( $('tr[data-project-id="' + id + '"]')[0] ));
                alertify.success(response['msg']);                           
            }else{
				alertify.error(response['msg']);
			} 

        }).fail(function () {
            alertify.error("Failed to remove project");
        });

    },
    _editAction : function(id){

    	var _this = this;
    	if(this.projectInitData != null){
    		this._edit(id);
    	}else{
    		
    		var _this = this;
        	$.ajax({
                url: "restAPI/project/init/" + window.username,
                context: document.body
            }).done(function (response) {

            	if (response && response['type'] === 'SUCCESS') {
            		_this.projectInitData = response['data'];
            		_this._edit(id);
    			}else{
    				alertify.error(response['msg']);
    			}  

            }).fail(function () {
                alertify.error("Failed to load Project init data due to System fault");
            });
    		
    	}
        

    },
    _edit : function(id) {
    	var _this = this;
        $.ajax({
            url: "restAPI/project/" + id + "/edit",
            context: document.body
        }).done(function (response) {

        	if (response && response['type'] === 'SUCCESS') {        		 
                $('#proj-list-view').hide();
                var editProject = new EditProject('proj-edit-item-view',response['data'],'proj-list-view',_this.projectInitData);
                editProject.init();
                $('#proj-edit-item-view').show();
			}else{
				alertify.error(response['msg']);
			}

        }).fail(function () {
        	alertify.error("Failed to load Project due to System fault");
        });
	}

};
