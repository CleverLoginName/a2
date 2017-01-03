/**
 *
 */
var WorkOnProjects = function (containerId, data) {

    this.containerId = containerId;
    this.container = $('#' + containerId);
    this.data = data;
    this.projectHeadings = ["ID", "Tile", "Location", "Status", "Budget ($)", "Actions"];
    this.filedNames = ["id", "title", "location", "status", "budget", "actions"];
    this.currentProjectId = null;

}
WorkOnProjects.prototype = {

    init: function () {

        this._dispatchEvents();
        this.container.empty();
        var wrapperTmpl = '<div class="box">' +
            '<div class="box-header">' +
            '</div><div class="box-body table-responsive">';

        wrapperTmpl += this._getTableTmpl();

        wrapperTmpl += '</div></div>';

        $('#' + this.container.attr('id') + '-loading').hide();
        $(wrapperTmpl).appendTo(this.container);

        this._initTable();
        this._initEvents();

        window.breadcrumb.addItem('Work', this.container.attr('id'));


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

            tableBodyTmpl += '<tr>';

            for (var j = 0; j < this.filedNames.length; j++) {

                var filedName = this.filedNames[j];

                switch (filedName) {
                    case 'actions':
                        tableBodyTmpl += '<td class="project-actions" data-id="' + this.data[i]['id'] + '-' + filedName + '">' + this._getActionsTmpl(this.data[i]['id'], this.data[i]['planCount']);
                        +'</td>';
                        break;
                    case 'startDate':
                        tableBodyTmpl += '<td data-id="' + this.data[i]['id'] + '-' + filedName + '">' + this._formatProperty(filedName, this.data[i][filedName]) + '</td>';
                        break;
                    case 'endDate':
                        tableBodyTmpl += '<td data-id="' + this.data[i]['id'] + '-' + filedName + '">' + this._formatProperty(filedName, this.data[i][filedName]) + '</td>';
                        break;
                    case 'lastUpdatedDate':
                        tableBodyTmpl += '<td data-id="' + this.data[i]['id'] + '-' + filedName + '">' + this._formatProperty(filedName, this.data[i][filedName]) + '</td>';
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
    _getActionsTmpl: function (id, sectionCount) {

        var actionsTmpl = '';

        if (sectionCount === 0) {

            actionsTmpl += '<a class="edit-btn btn-app" id="' + id + '-edit-action" data-project-id="' + id + '"  data-toggle="tooltip" data-placement="top" title="Add Floor Plans">' +
            '<i class="fa fa-edit"></i>' +
            '</a>';

        } else {

            actionsTmpl += '<a class="edit-btn btn-app" id="' + id + '-edit-action" data-project-id="' + id + '"  data-toggle="tooltip" data-placement="top" title="Add Floor Plans">' +
            '<i class="fa fa-edit"></i>' +
            '</a>' +
            '<a class="work-btn btn-app" id="' + id + '-work-on-action" data-project-id="' + id + '"  data-toggle="tooltip" data-placement="top" title="Work on Floor Plans">' +
            '<i class="fa fa-play"></i>' +
            '</a>';

        }

        return actionsTmpl;

    },
    _initTable: function () {

        $('#project-table-view').dataTable({
            "bPaginate": true,
            "bLengthChange": true,
            "bFilter": true,
            "bSort": true,
            "bInfo": true,
            "bAutoWidth": false,
            "columnDefs": [
                {"width": "35%", "targets": 2},
                {"width": "20%", "targets": 1}
            ]
        });

    },
    _initEvents: function () {

        var _this = this;

        $('[data-toggle="tooltip"]').tooltip();

        $('#project-table-view').on('click', '[id$="-work-on-action"]', function () {

            _this._workOnButtonAction(this);

        });

        $('#project-table-view').on('click', '[id$="-edit-action"]', function () {

            _this._editButtonAction(this);

        });


        $(document).on('update/projectDashboard', function (e, data) {

            $('[data-id = ' + data.projectId + '-' + data.property + ']').text(_this._formatProperty(data.property, data.value));
        });

        $(document).on('update/actions', function (e, data) {

            _this._reInitActions(data.projectId, data.plans);
        });

    },
    _dispatchEvents: function () {
        $(document).off('update/actions');
    },
    _editButtonAction: function (elem) {

        this.currentProjectId = $(elem).attr('data-project-id');

        this.container.hide();
        var importImages = new ImportImages(this.currentProjectId, this.containerId + '-2', this.containerId);
        importImages.init();
        $('#' + this.containerId + '-2').show();


    },
    _workOnButtonAction: function (elem) {

        var projectId = $(elem).attr('data-project-id');

        var _this = this;
        $.ajax({
            url: "restAPI/project/" + projectId + "/plans/base",
            context: document.body
        }).done(function (response) {

        	if (response && response['type'] === 'SUCCESS') {
        		_this.container.hide();
                var planViewer = new LECPlanViewer(projectId, _this.containerId + '-2', response['data']['plans']);
                planViewer.init();
                $('#' + _this.containerId + '-2').show();
        	}else{
        		alertify.error(response['msg']);
        	}            


        }).fail(function () {
            alertify.error("Failed to get all Plans for this Project due to System Fault.");
        });


    },
    _formatProperty: function (property, value) {

        var formattedValue = value;

        switch (property) {
            case 'startDate':
                formattedValue = formatDate('short', value);
                break;
            case 'endDate':
                formattedValue = formatDate('short', value);
                break;
            case 'lastUpdatedDate':
                formattedValue = formatDate('long', value);
                break;

        }

        return formattedValue;

    },
    _reInitActions: function (projectId, plans) {

        var actionElem = $('[data-id="' + projectId + '-actions"]'),
            _this = this;

        actionElem.empty();
        $(this._getActionsTmpl(projectId, plans)).appendTo(actionElem);

        $('#' + projectId + '-edit-action').tooltip();
        $('#' + projectId + '-work-on-action').tooltip();

    },
    _getSelectedProject : function(id){

        var selectedProject = null;

        for(var i = 0 ; i < this.data.length; i++){

            if(this.data[i] === id){
                selectedProject = this.data[i];
                break;
            }

        }

        return selectedProject;

    }

}
