var LMProjectsList = function (containerId,data) {

    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;
    this.projectHeadings = ["ID", "Title","Customer Name","Status","Created On", "Actions"];
    this.filedNames = ["id", "title","ownerName","status", "createdDate" , "actions"];

};
LMProjectsList.prototype = {

    init: function () {

        this.container.empty();
        var wrapperTmpl = '<div><div class="row" id="proj-list-view"><div class="box">' +
            '<div class="box-header">' +
            '</div><div class="box-body table-responsive">';

        wrapperTmpl += this._getTableTmpl();

        wrapperTmpl += '</div></div></div><div class="row" id="proj-item-view" style="display:none;"></div></div>';

        $(wrapperTmpl).appendTo(this.container);

        this._initTable();
        this._initEvent();

        window.breadcrumb.addItem("View", this.container.attr('id'));

    },
    _getTableTmpl: function () {

        var tableWrapper = '<table id="project-table-view" class="table table-bordered table-striped table-view no-cursor ">';

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
                        '<a class="action-btn btn-app" id="' + this.data[i]['id'] +  '-view-action" data-project-id="' + this.data[i]['id'] + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Project">' +
                        '<i class="fa fa-folder-open-o green-font"></i>' +
                        '</a>' +
                        '<a class="action-btn btn-app" id="' + this.data[i]['id'] +  '-view-plans-action" data-product-id="' + this.data[i]['id'] + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Plans">' +
                        '<i class="fa fa-th-large green-font"></i>' +
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

        $('#project-table-view').dataTable({
            "bPaginate": true,
            "bLengthChange": true,
            "bFilter": true,
            "bSort": true,
            "bInfo": true,
            "bAutoWidth": false,
            "order": [[ 4, "desc" ]]
        });

    },
    _initEvent : function(){

        var _this = this;
        $('[data-toggle="tooltip"]').tooltip();

        $('#project-table-view').on('click','[id$="-view-action"]',function(){

            _this._viewAction($(this).attr('data-project-id'));


        });


        $('#project-table-view').on('click','[id$="-view-plans-action"]',function(){

            _this._viewPlansAction($(this).attr('data-product-id'));


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
    _viewAction : function(id){

        var _this = this;
        $.ajax({
            url: "restAPI/project/" + id,
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	$('#proj-list-view').hide();
                var viewProject = new ProjectView('proj-item-view',response['data'],'proj-list-view');
                viewProject.init();
                $('#proj-item-view').show();                
            }else{
				alertify.error(response['msg']);
			} 

        }).fail(function () {
        	alertify.error("Failed to Fetch Project due to System fault.");
        });

    },
    _viewPlansAction : function(id){

        var _this = this;
        $.ajax({
            url: "restAPI/project/" + id + "/plans/base",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	$('#proj-list-view').hide();
                var planViewer = new LMPlanViewer(id,'proj-item-view','proj-list-view',response['data']['plans']);
                planViewer.init();
                $('#proj-item-view').show();
                
            }else{
            	alertify.error(response['msg']);
            } 

        }).fail(function () {
            alertify.error("Failed to get all Plans for this Project due to System Fault.");
        });

    }

};
