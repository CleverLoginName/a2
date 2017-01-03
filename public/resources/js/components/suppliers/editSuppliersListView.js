var EditSuppliersListView = function (containerId,data) {

    this.containerId = containerId;
    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;
    this.supplierHeadings = ["ID", "Name","Category", "Actions"];
    this.filedNames = ["id", "name","category", "actions"];
    this.categories = null;

};
EditSuppliersListView.prototype = {

    init: function () {

        this.container.empty();
        var wrapperTmpl = '<div><div class="row" id="sup-list-view"><div class="box">' +
            '<div class="box-header">' +
            '</div><div class="box-body table-responsive">';

        wrapperTmpl += this._getTableTmpl();

        wrapperTmpl += '</div></div></div><div class="row" id="sup-edit-item-view" style="display:none;"></div></div>';

        $(wrapperTmpl).appendTo(this.container);

        this._initTable();
        this._initEvent();

        window.breadcrumb.addItem("Edit", this.container.attr('id'));

    },
    _getTableTmpl: function () {

        var tableWrapper = '<table id="edit-supplier-table-view" class="table table-bordered table-striped table-view no-cursor ">';

        tableWrapper += this._getTableHeadingTmpl();

        tableWrapper += this._getTableBodyTmpl();

        tableWrapper += '</table>';

        return tableWrapper;

    },
    _getTableHeadingTmpl: function () {

        var tableHeadingTmpl = '<thead><tr>';

        for (var i = 0; i < this.supplierHeadings.length; i++) {

            tableHeadingTmpl += '<th>' + this.supplierHeadings[i] + '</th>';

        }

        tableHeadingTmpl += '</tr></thead>';

        return tableHeadingTmpl;

    },
    _getTableBodyTmpl: function () {

        var tableBodyTmpl = '<tbody>';

        for (var i = 0; i < this.data.length; i++) {

            tableBodyTmpl += '<tr data-supplier-id="' + this.data[i]['id'] + '">';

            for (var j = 0; j < this.filedNames.length; j++) {

                var filedName = this.filedNames[j];

                switch (filedName) {
                    case 'actions':
                        tableBodyTmpl += '<td data-id="' + this.data[i]['id'] + '-' + filedName + '">' +
                        '<a class="action-btn btn-app" id="' + this.data[i]['id'] +  '-edit-action" data-supplier-id="' + this.data[i]['id'] + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit Supplier">' +
                        '<i class="fa fa-edit green-font"></i>' +
                        '</a>' +
                        '<a class="action-btn btn-app" id="' + this.data[i]['id'] +  '-remove-action" data-supplier-id="' + this.data[i]['id'] + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="Remove Supplier">' +
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

        $('#edit-supplier-table-view').dataTable({
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

        $('#edit-supplier-table-view').on('click','[id$="-remove-action"]',function(){

                        
            var supplierId = $(this).attr('data-supplier-id');
        	bootbox.dialog({
                closeButton: false,
                message: 'Are you sure,Do you want to remove this Supplier?',
                className:"logout-dialog",
                buttons: {
                    main:{
                        label: "Yes",
                        callback: function(){
                        	_this._removeAction(supplierId);
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

        $('#edit-supplier-table-view').on('click','[id$="-edit-action"]',function(){

            _this._editAction($(this).attr('data-supplier-id'));


        });
        
        $(document).on('update/editSupplierView',function(e,data){
        	
        	$('[data-id="' + data.supplierId + '-' + data.property + '"]').text(data.value);
        	
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
    _removeAction : function(id){

        var _this = this;
        $.ajax({
            url: "restAPI/supplier/" + id + "/remove",
            context: document.body
        }).done(function (response) {

           if (response && response['type'] === 'SUCCESS') {
        	   
               alertify.success(response['msg']);
        	   var oTable = $('#edit-supplier-table-view').dataTable();
               oTable.fnDeleteRow(oTable.fnGetPosition( $('tr[data-supplier-id="' + id + '"]')[0] ));               
                
			}else{
				alertify.error(response['msg']);
			} 

        }).fail(function () {
        	alertify.error("Failed to remove Supplier due to System Fault.");
        });

    },
    _editAction : function(id){

    	
    	var _this = this;
    	if(this.categories != null){
    		this._edit(id);
    	}else{
    		
    		var _this = this;
        	$.ajax({
                url: "restAPI/categories/list",
                context: document.body
            }).done(function (response) {

            	if (response && response['type'] === 'SUCCESS') {
            		_this.categories = response['data'];
            		_this._edit(id);
    			}else{
    				alertify.error(response['msg']);
    			}  

            }).fail(function () {
                alertify.error("Failed to load Categories due to System fault");
            });
    		
    	}

    },
    _edit : function(id) {
    	
    	var _this = this;
        $.ajax({
            url: "restAPI/supplier/" + id + "/edit",
            context: document.body
        }).done(function (response) {

        	if (response && response['type'] === 'SUCCESS') {        		 
        		$('#sup-list-view').hide();
                var editsupplier = new EditSupplier('sup-edit-item-view',response['data'],'sup-list-view',_this.categories);
                editsupplier.init();
                $('#sup-edit-item-view').show();
			}else{
				alertify.error(response['msg']);
			}

        }).fail(function () {
        	alertify.error("Failed to load Project due to System fault");
        });
	}

};
