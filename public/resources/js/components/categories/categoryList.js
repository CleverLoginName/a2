var CategoryList = function (containerId,data) {

    this.containerId = containerId;
    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;
    this.categoryHeadings = ["ID", "Category Name", "Actions"];
    this.filedNames = ["id", "name","actions"];

};
CategoryList.prototype = {

    init: function () {

        this.container.empty();
        var wrapperTmpl = '<div><div class="row" id="cat-list-view"><div class="box">' +
            '<div class="box-header">' +
            '</div><div class="box-body table-responsive">';

        wrapperTmpl += this._getTableTmpl();

        wrapperTmpl += '</div></div></div><div class="row" id="cat-edit-item-view" style="display:none;"></div></div>';

        $(wrapperTmpl).appendTo(this.container);

        this._initTable();
        this._initEvent();

        window.breadcrumb.addItem("Edit", this.container.attr('id'));

    },
    _getTableTmpl: function () {

        var tableWrapper = '<table id="edit-category-table-view" class="table table-bordered table-striped table-view no-cursor ">';

        tableWrapper += this._getTableHeadingTmpl();

        tableWrapper += this._getTableBodyTmpl();

        tableWrapper += '</table>';

        return tableWrapper;

    },
    _getTableHeadingTmpl: function () {

        var tableHeadingTmpl = '<thead><tr>';

        for (var i = 0; i < this.categoryHeadings.length; i++) {

            tableHeadingTmpl += '<th>' + this.categoryHeadings[i] + '</th>';

        }

        tableHeadingTmpl += '</tr></thead>';

        return tableHeadingTmpl;

    },
    _getTableBodyTmpl: function () {

        var tableBodyTmpl = '<tbody>';

        for (var i = 0; i < this.data.length; i++) {

            tableBodyTmpl += '<tr data-category-id="' + this.data[i]['id'] + '">';

            for (var j = 0; j < this.filedNames.length; j++) {

                var filedName = this.filedNames[j];

                switch (filedName) {
                    case 'actions':
                        tableBodyTmpl += '<td data-id="' + this.data[i]['id'] + '-' + filedName + '">' +
                        '<a class="action-btn btn-app" id="' + this.data[i]['id'] +  '-edit-action" data-category-id="' + this.data[i]['id'] + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit Sub Categories and Types">' +
                        '<i class="fa fa-edit green-font"></i>' +
                        '</a>' +
                        '<a class="action-btn btn-app" id="' + this.data[i]['id'] +  '-add-to-cat-action" data-category-name="' + this.data[i]['name'] + '" data-category-id="' + this.data[i]['id'] + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="Add Sub Categories and Types">' +
                        '<i class="fa fa-plus green-font"></i>' +
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

        $('#edit-category-table-view').dataTable({
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

        $('#edit-category-table-view').on('click','[id$="-edit-action"]',function(){

            _this._editAction($(this).attr('data-category-id'));


        });

        $('#edit-category-table-view').on('click','[id$="-add-to-cat-action"]',function(){

            _this._addToCatAction($(this).attr('data-category-id'));


        });

        $(document).on('update/catTable',function(e,data){

        	data = JSON.parse(data);
            $('[data-id="' + data['id'] + '-name"]').text(data['name']);

        });


    },
    _formatProperty: function (property, value) {

        return value;

    },
    _editAction : function(id){

        var _this = this;
        $.ajax({
            url: "restAPI/category/" + id,
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	$('#cat-list-view').hide();
                var editCategory = new EditCategory('cat-edit-item-view',response['data'],'cat-list-view');
                editCategory.init();
                $('#cat-edit-item-view').show();               
                
                           
            }else{
            	alertify.error(response['msg']);
            } 

        }).fail(function () {
        	alertify.error("Failed to load Category due to System Fault.");
        });

    },
    _addToCatAction : function (id) {

        var _this = this;
        $.ajax({
            url: "restAPI/category/" + id,
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	$('#cat-list-view').hide();
                var addItemsToCategory = new AddItemsToCategory('cat-edit-item-view',response['data'],'cat-list-view');
                addItemsToCategory.init();
                $('#cat-edit-item-view').show();
                
                           
            }else{
            	alertify.error(response['msg']);
            } 

        }).fail(function () {
        	alertify.error("Failed to load Category due to System Fault.");
        });

    }

};
