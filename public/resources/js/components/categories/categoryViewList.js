var CategoryViewList = function (containerId,data) {

    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;
    this.categoryHeadings = ["ID", "Category Name", "Actions"];
    this.filedNames = ["id", "name", "actions"];

};
CategoryViewList.prototype = {

    init: function () {

        this.container.empty();
        var wrapperTmpl = '<div><div class="row" id="cat-list-view"><div class="box">' +
            '<div class="box-header">' +
            '</div><div class="box-body table-responsive">';

        wrapperTmpl += this._getTableTmpl();

        wrapperTmpl += '</div></div></div><div class="row" id="cat-item-view" style="display:none;"></div></div>';

        $(wrapperTmpl).appendTo(this.container);

        this._initTable();
        this._initEvent();

        window.breadcrumb.addItem("View", this.container.attr('id'));

    },
    _getTableTmpl: function () {

        var tableWrapper = '<table id="category-table-view" class="table table-bordered table-striped table-view no-cursor ">';

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

                        '<a class="action-btn btn-app" id="' + this.data[i]['id'] +  '-expand-action" data-category-id="' + this.data[i]['id'] + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="Expand" data-collapsed="true">' +
                        '<i class="fa fa-expand green-font" id="' + this.data[i]['id'] + '-icon"></i>' +
                        '</a>' +

                        '<a class="action-btn btn-app" id="' + this.data[i]['id'] +  '-view-action" data-category-id="' + this.data[i]['id'] + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Category">' +
                        '<i class="fa fa-folder-open-o green-font"></i>' +
                        '</a>' +


                        '</td>';
                        break;
                    case 'name':
                        tableBodyTmpl += '<td data-id="' + this.data[i]['id'] + '-' + filedName + '">' + this._createCategoryCell(this.data[i]) + '</td>';
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

        $('#category-table-view').dataTable({
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


        $('#category-table-view').on('click','[id$="-view-action"]',function(){

            _this._editAction($(this).attr('data-category-id'));


        });

        $('#category-table-view').on('click','[id$="-expand-action"]',function(){

            var catId = $(this).attr('data-category-id'),
                isCollapsed = $(this).attr('data-collapsed');

            if(isCollapsed == "true"){
                $('#' + catId +'-expandable-view').show();
                $('#' + catId +'-icon').removeClass('fa-expand');
                $('#' + catId +'-icon').addClass('fa-compress');
                $(this).attr('data-original-title','Collapse');
                $(this).attr('data-collapsed',"false");
            }else{
                $('#' + catId +'-expandable-view').hide();
                $('#' + catId +'-icon').removeClass('fa-compress');
                $('#' + catId +'-icon').addClass('fa-expand');
                $(this).attr('data-original-title','Expand');
                $(this).attr('data-collapsed',"true");
            }


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
            url: "restAPI/category/" + id,
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
            	$('#cat-list-view').hide();
                var viewCategory = new CategoryView('cat-item-view',response['data'],'cat-list-view');
                viewCategory.init();
                $('#cat-item-view').show();
                
                           
            }else{
            	alertify.error(response['msg']);
            } 

        }).fail(function () {
        	alertify.error("Failed to load Category due to System Fault.");
        });

    },
    _createCategoryCell : function(data) {

        var template = '';

        template += '<div class="row cat-title">' + this._formatProperty('name', data['name']) + '</div>' +
        '<div class="row" style="display:none;" id="' + data['id'] + '-expandable-view" data-cat-id="' + data['id'] + '">';

        // adding sub categories

        template += '<h5 class="cat-sub-title">Sub Categories</h5>';

        if(data['subCategories'].length === 0){

            template += '<div class="row cat-empty-txt">No Sub Categories for "' + data['name'] + '" Category</div>';

        }else{

            template += '<div class="row"><div class="col-md-6 cat-inside-col cat-inside-heading">ID</div><div class="col-md-6 cat-inside-col cat-inside-heading">Name</div></div>';


            for(var i = 0 ; i < data['subCategories'].length; i++){

                template += '<div class="row"><div class="col-md-6 cat-inside-col">' + data['subCategories'][i]['id'] + '</div><div class="col-md-6 cat-inside-col">' + data['subCategories'][i]['name'] + '</div></div>';

            }

        }


        // adding category types

        template += '<h5 class="cat-sub-title margin-top-20">Category Types </h5>';

        if(data['categoryTpes'].length === 0){

            template += '<div class="row cat-empty-txt">No Category Types for "' + data['name'] + '" Category</div>';

        }else{

            template += '<div class="row"><div class="col-md-6 cat-inside-col cat-inside-heading">ID</div><div class="col-md-6 cat-inside-col cat-inside-heading">Name</div></div>';


            for(var i = 0 ; i < data['categoryTpes'].length; i++){

                template += '<div class="row"><div class="col-md-6 cat-inside-col">' + data['categoryTpes'][i]['id'] + '</div><div class="col-md-6 cat-inside-col">' + data['categoryTpes'][i]['name'] + '</div></div>';

            }

        }


        template += '</div>';

        return template;

    }

};
