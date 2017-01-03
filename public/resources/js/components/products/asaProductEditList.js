var ASAProductEditList = function (containerId,data,catId,catType) {

    this.containerId = containerId;
    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;
    this.projectHeadings = ["ID","Product Code" , "Product Name", "Actions"];
    this.filedNames = ["id","code", "name", "actions"];
    this.catId = catId;
    this.catType = catType;
    this.productInitData = null;

};
ASAProductEditList.prototype = {

    init: function () {

        this.container.empty();
        var wrapperTmpl = '<div><div class="row" id="prod-list-view"><div class="box">' +
            '<div class="box-header">' +
            '</div><div class="box-body table-responsive">';

        wrapperTmpl += this._getTableTmpl();

        wrapperTmpl += '</div></div></div><div class="row" id="prod-edit-item-view" style="display:none;"></div></div>';

        $(wrapperTmpl).appendTo(this.container);

        this._initTable();
        this._initEvent();

        window.breadcrumb.addItem(replaceAll('_', ' ', this.catType), this.container.attr('id'));

    },
    _getTableTmpl: function () {

        var tableWrapper = '<table id="edit-product-table-view" class="table table-bordered table-striped table-view no-cursor ">';

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

            tableBodyTmpl += '<tr data-product-id="' + this.data[i]['id'] + '">';

            for (var j = 0; j < this.filedNames.length; j++) {

                var filedName = this.filedNames[j];

                switch (filedName) {
                    case 'actions':
                        tableBodyTmpl += '<td data-id="' + this.data[i]['id'] + '-' + filedName + '">' +
                        '<a class="action-btn btn-app" data-product-id="' + this.data[i]['id'] + '" id="' + this.data[i]['id'] +  '-edit-action" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit Product">' +
                        '<i class="fa fa-edit green-font"></i>' +
                        '</a>' +
                        '<a class="action-btn btn-app" data-product-id="' + this.data[i]['id'] + '" id="' + this.data[i]['id'] +  '-remove-action" data-toggle="tooltip" data-placement="top" title="" data-original-title="Remove Product">' +
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

        $('#edit-product-table-view').dataTable({
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

        $('#edit-product-table-view').on('click','[id$="-remove-action"]',function(){

            var productId = $(this).attr('data-product-id');
        	bootbox.dialog({
                closeButton: false,
                message: 'Are you sure,Do you want to remove this Product?',
                className:"logout-dialog",
                buttons: {
                    main:{
                        label: "Yes",
                        callback: function(){
                        	_this._removeAction(productId);
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

        $('#edit-product-table-view').on('click','[id$="-edit-action"]',function(){

            _this._editAction($(this).attr('data-product-id'));

        });
        
        $(document).on('update/editProductView',function(e,data){
        	
        	$('[data-id="' + data.productId + '-' + data.property + '"]').text(data.value);
        	
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
            url: "restAPI/product/" + id + "/remove",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
        		  
            	var oTable = $('#edit-product-table-view').dataTable();
                oTable.fnDeleteRow(oTable.fnGetPosition( $('tr[data-product-id="' + id + '"]')[0] ));
                alertify.success(response['msg']);
                
                
			}else{
				alertify.error(response['msg']);
			} 

        }).fail(function () {
        	alertify.error("Failed to Remove Poduct due to System Fault.");
        });

    },
    _editAction : function(id){

        var _this = this;
    	if(this.productInitData != null){
    		this._edit(id);
    	}else{
	        $.ajax({
	            url: "restAPI/category/" + this.catId + "/product/init",
	            context: document.body
	        }).done(function (response) {
	
	            if (response && response['type'] === 'SUCCESS') {
	            	_this.productInitData = response['data'];            	
	            	_this._edit(id);                           
	            }else{
	            	alertify.error(response['msg']);
	            } 
	
	        }).fail(function () {
	        	alertify.error("Failed to load Product Init Data due to System Fault.");
	        });
    	}
        

    },
    _edit : function(id) {
    	
    	var _this = this;
    	$.ajax({
            url: "restAPI/product/" + id + "/edit",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	$('#prod-list-view').hide();
            	
            	switch(_this.catType){
    			case "Electrical" :
    				var editElectricalProduct = new EditElectricalProduct('prod-edit-item-view',response['data'],'prod-list-view',_this.productInitData);
    				editElectricalProduct.init();
    				break;
    			case "Audio_Visual" :
    				var editAudioAndVisualProduct = new EditAudioAndVisualProduct('prod-edit-item-view',response['data'],'prod-list-view',_this.productInitData);
    				editAudioAndVisualProduct.init();
    				break;
    			case "Interior_Design" :
    				var editInteriorDesignProduct = new EditInteriorDesignProduct('prod-edit-item-view',response['data'],'prod-list-view',_this.productInitData);
    				editInteriorDesignProduct.init();
    				break;
    			case "Fittings_and_Fixtures" :
    				var editFittingsAndFixturesProduct = new EditFittingsAndFixturesProduct('prod-edit-item-view',response['data'],'prod-list-view',_this.productInitData);
    				editFittingsAndFixturesProduct.init();
    				break;
    		}
                $('#prod-edit-item-view').show();                
			}else{
				alertify.error(response['msg']);
			}  

        }).fail(function () {
        	alertify.error("Failed to load Product due to System Fault.");
        });
	}

};
