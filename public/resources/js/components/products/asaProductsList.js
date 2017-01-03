var ASAProductsList = function (containerId,data,catType) {

    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;
    this.productHeadings = ["ID", "Product Code","Product Name", "Actions"];
    this.filedNames = ["id","code", "name","actions"];
    this.catType = catType;

};
ASAProductsList.prototype = {

    init: function () {

        this.container.empty();
        var wrapperTmpl = '<div><div class="row" id="prod-list-view"><div class="box">' +
            '<div class="box-header">' +
            '</div><div class="box-body table-responsive">';

        wrapperTmpl += this._getTableTmpl();

        wrapperTmpl += '</div></div></div><div class="row" id="prod-item-view" style="display:none;"></div></div>';

        $(wrapperTmpl).appendTo(this.container);

        this._initTable();
        this._initEvent();

        window.breadcrumb.addItem(replaceAll('_', ' ', this.catType), this.container.attr('id'));

    },
    _getTableTmpl: function () {

        var tableWrapper = '<table id="product-table-view" class="table table-bordered table-striped table-view no-cursor ">';

        tableWrapper += this._getTableHeadingTmpl();

        tableWrapper += this._getTableBodyTmpl();

        tableWrapper += '</table>';

        return tableWrapper;

    },
    _getTableHeadingTmpl: function () {

        var tableHeadingTmpl = '<thead><tr>';

        for (var i = 0; i < this.productHeadings.length; i++) {

            tableHeadingTmpl += '<th>' + this.productHeadings[i] + '</th>';

        }

        tableHeadingTmpl += '</tr></thead>';

        return tableHeadingTmpl;

    },
    _getTableBodyTmpl: function () {

        var tableBodyTmpl = '<tbody>';

        for (var i = 0; i < this.data.length; i++) {

            tableBodyTmpl += '<tr data-product-id="' + this.data[i]['id'] + '">';

            for (var j = 0; j < this.filedNames.length; j++) {

                var filedName = this.filedNames[j];

                switch (filedName) {
                    case 'actions':
                        tableBodyTmpl += '<td data-id="' + this.data[i]['id'] + '-' + filedName + '">' +
                        '<a class="action-btn btn-app" id="' + this.data[i]['id'] +  '-view-action" data-product-id="' + this.data[i]['id'] + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Product">' +
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

        $('#product-table-view').dataTable({
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
        $('#product-table-view').on('click','[id$="-view-action"]',function(){

            _this._viewAction($(this).attr('data-product-id'));


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
    _viewAction : function(id){

        var _this = this;
        $.ajax({
            url: "restAPI/product/" + id,
            context: document.body
        }).done(function (response) {
            
            if (response && response['type'] === 'SUCCESS') {
            	$('#prod-list-view').hide();
                var viewproduct = new ProductView('prod-item-view',response['data'],'prod-list-view');
                viewproduct.init();
                $('#prod-item-view').show();
			}else{
				alertify.error(response['msg']);
			}  

        }).fail(function () {
        	alertify.error("Failed to load Product due to System Fault.");
        });

    }

};
