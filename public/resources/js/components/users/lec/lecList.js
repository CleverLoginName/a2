var LECList = function (containerId,data) {

    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;
    this.userHeadings = ["ID", "Username","Name", "Actions"];
    this.filedNames = ["id", "username","name", "actions"];

};
LECList.prototype = {

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

        window.breadcrumb.addItem("Customers", this.container.attr('id'));

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
                        tableBodyTmpl += '<td data-id="' + this.data[i]['id'] + '-' + filedName + '">' +
                        '<a class="action-btn btn-app" id="' + this.data[i]['id'] +  '-view-action" data-user-id="' + this.data[i]['id'] + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="View User">' +
                        '<i class="fa fa-folder-open-o green-font"></i>' +
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


        $('#user-table-view').on('click','[id$="-view-action"]',function(){

            _this._editAction($(this).attr('data-user-id'));


        });

    },
    _formatProperty: function (property, value) {

        var formattedValue = value;

        /*switch (property) {
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
         */
        return formattedValue;

    },
    _editAction : function(id){

        var _this = this;
        $.ajax({
            url: "restAPI/user/lec/" + id,
            context: document.body
        }).done(function (response) {

        	if (response && response['type'] === 'SUCCESS' && response['data']) {
        		  
                $('#usr-list-view').hide();
                var lecUser = new LECView('usr-item-view',response['data'],'usr-list-view');
                lecUser.init();
                $('#usr-item-view').show();
                
			}else{
				alertify.error(response['msg']);
			} 

        }).fail(function () {
        	alertify.error("Failed to load Customer due to System Fault.");
        });

    }

};
