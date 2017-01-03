var LECEditProjectsList = function (containerId,data) {

    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;
    this.projectHeadings = ["ID", "Title","Status","Created On", "Actions"];
    this.filedNames = ["id", "title","status", "createdDate" , "actions"];

};
LECEditProjectsList.prototype = {

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
                         "order": [[ 3, "desc" ]]
        });

    },
    _initEvent : function(){

        var _this = this;
        $('[data-toggle="tooltip"]').tooltip();

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
    _editAction : function(id){

    	var _this = this;
        $.ajax({
            url: "restAPI/lec/project/" + id + "/edit",
            context: document.body
        }).done(function (response) {

        	if (response && response['type'] === 'SUCCESS') {        		 
                $('#proj-list-view').hide();
                var editProject = new LECEditProject('proj-edit-item-view',response['data'],'proj-list-view');
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
