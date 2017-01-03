var AddItemsToCategory = function (containerId, categoryData,returningId) {

    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = categoryData;
    this.subCategoryCount = 0;
    this.categoryTypeCount = 0;
    this.containerId = containerId;
    this.returningId = returningId;

};
AddItemsToCategory.prototype = {

    init: function () {


        this.container.empty();
        var template = '<section class="box new-item-wrapper">' +
            '<section class="box-header"></section>' +
            '<section class="box-body">' +
            '<section class="row category-section-2-box" id="' + this.id + '-category-section-2">';

        template += this._initSubCategoryUI();

        template += '</section>' +
        '</section>' +
        '<section class="row box-footer">' +
        '<button class="btn add-item-btn" id="add-items-to-category-back-btn"><i class="fa fa-mail-reply"></i> Back</button>' +
        '</section>' +
        '</section>';

        $(template).appendTo(this.container);

        this._initEvents();
        this._initData();


    },
    _initSubCategoryUI: function () {


        var uiTemplate = '<section class="row category-info" id="' + this.id + '-category-section-2-info">Add Sub Categories and Category Types for Category " ' + this.data['name'] + '" </section>' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-8">' +

            '<section class="row margin-bottom-20 category-title-wrapper"><span class="category-title">Sub Categories</span><button class="btn add-item-btn category-btn" id="' + this.id + '-sub-category-btn"><i class="fa fa-plus"></i></button></section>' +
            '<section class="row margin-bottom-20" id="' + this.id + '-sub-category-container"></section>' +
            '<section class="row margin-bottom-20 category-title-wrapper"><span class="category-title">Category Types</span><button class="btn add-item-btn category-btn" id="' + this.id + '-category-type-btn"><i class="fa fa-plus"></i></button></section>' +
            '<section class="row margin-bottom-20" id="' + this.id + '-category-types-container"></section>' +

            '</section>' +
            '<section class="col-md-2"></section>';

        return uiTemplate;

    }
    ,
    _initData: function () {

        for (var i = 0; i < this.data['subCategories'].length; i++) {

            this._initSubCategoryItem(this.data['subCategories'][i]['name']);

        }


        for (var i = 0; i < this.data['categoryTpes'].length; i++) {

            this._initCategoryTypeItem(this.data['categoryTpes'][i]['name']);

        }

    },
    _initSubCategoryItem: function (name) {

        var template = '<section class="row">' +
            '<section class="sub-category-item">' + name + '</section>' +
            '</section>';

        $(template).appendTo($('#' + this.id + '-sub-category-container'));

    },
    _initCategoryTypeItem: function (name) {

        var template = '<section class="row">' +
            '<section class="sub-category-item">' + name + '</section>' +
            '</section>';

        $(template).appendTo($('#' + this.id + '-category-types-container'));

    },
    _addSubCategoryItem: function () {

        var _this = this;
        var template = '<section class="row"><form class="row margin-bottom-10" role="form" method="post" id="' + this.id + '-sub-category-' + this.subCategoryCount + '" data-sub-category="' + this.subCategoryCount + '" >' +
            '<section class="row form-group">' +
            '<section class="col-md-10 padding-0"><input type="text" class="form-control required" id="' + this.id + '-sub-category-' + this.subCategoryCount + '-name" name="sub-category-frm-name"/></section>' +
            '<section class="col-md-2 plan-btn-wrapper">' +
            '<button type="submit" class="plan-btn btn-app" id="' + this.id + '-sub-category-' + this.subCategoryCount + '-save-action" data-toggle="tooltip" data-placement="top" title="Save">' +
            '<i class="fa fa-save"></i>' +
            '</button>' +

            '<button class="plan-btn btn-app" id="' + this.id + '-sub-category-' + this.subCategoryCount + '-cancel-action" data-sub-category="' + this.subCategoryCount + '"  data-toggle="tooltip" data-placement="top" title="Cancel">' +
            '<i class="fa fa-mail-reply"></i>' +
            '</button>' +
            '</section>' +
            '</section>' +
            '</form>' +
            '<section class="sub-category-item" id="' + this.id + '-sub-category-' + this.subCategoryCount + '-view" style="display:none;"></section>' +
            '</section>';

        $(template).appendTo($('#' + this.id + '-sub-category-container'));

        var subCat = this.subCategoryCount;

        $('#' + this.id + '-sub-category-' + this.subCategoryCount).submit(function(e) {
            e.preventDefault();
        }).validate({

            rules: {
                "sub-category-frm-name": {
                    required: true,
                    remote: {
                        url: "restAPI/category/ " + _this.data['id'] + "/sub/name/available",
                        type: "post",
                        username: function () {
                            return $('#' + _this.id + '-sub-category-' + subCat + '-name').val();
                        }
                    }
                }
            },
            messages: {
                "sub-category-frm-name": {"remote": "Sub  Category Name already exists."}
            },
            submitHandler: function(form) { 
            	var subCat = $(form).attr('data-sub-category');
                var data = new Object();
                data['name'] = $('#' + _this.id + '-sub-category-' + subCat + '-name').val();
                data['categoryId'] = _this.data['id'];
                _this._submitSubCategoryData(subCat, data);
                return false;  //This doesn't prevent the form from submitting.
            }

        });
        $('#' + this.id + '-sub-category-' + this.subCategoryCount + '-cancel-action').on('click', function (e) {

            $('#' + _this.id + '-sub-category-' + $(this).attr('data-sub-category')).remove();
            e.preventDefault();

        });

        $('[data-toggle="tooltip"]').tooltip();


    },
    _addCategoryTypeItem: function () {

        var _this = this;
        var template = '<section class="row"><form class="row margin-bottom-10" role="form" method="post" id="' + this.id + '-category-type-' + this.categoryTypeCount + '" data-category-type="' + this.categoryTypeCount + '">' +
            '<section class="row form-group">' +
            '<section class="col-md-10 padding-0"><input type="text" class="form-control required" id="' + this.id + '-category-type-' + this.categoryTypeCount + '-name" name="category-type-frm-name"/></section>' +
            '<section class="col-md-2 plan-btn-wrapper">' +
            '<button type="submit" class="plan-btn btn-app" id="' + this.id + '-category-type-' + this.categoryTypeCount + '-save-action" data-category-type="' + this.categoryTypeCount + '"  data-toggle="tooltip" data-placement="top" title="Save">' +
            '<i class="fa fa-save"></i>' +
            '</button>' +

            '<button class="plan-btn btn-app" id="' + this.id + '-category-type-' + this.categoryTypeCount + '-cancel-action" data-category-type="' + this.categoryTypeCount + '"  data-toggle="tooltip" data-placement="top" title="Cancel">' +
            '<i class="fa fa-mail-reply"></i>' +
            '</button>' +
            '</section>' +
            '</section>' +
            '</form>' +
            '<section class="sub-category-item" id="' + this.id + '-category-type-' + this.categoryTypeCount + '-view" style="display:none;"></section>' +
            '</section>';

        $(template).appendTo($('#' + this.id + '-category-types-container'));

        var catType = this.categoryTypeCount;

        $('#' + this.id + '-category-type-' + this.categoryTypeCount).submit(function(e) {
            e.preventDefault();
        }).validate({

            rules: {
                "category-type-frm-name": {
                    required: true,
                    remote: {
                        url: "restAPI/category/ " + _this.data['id'] + "/type/name/available",
                        type: "post",
                        username: function () {
                            return $('#' + _this.id + '-category-type-' + catType + '-name').val();
                        }
                    }
                }
            },
            messages: {
                "category-type-frm-name": {"remote": "Category Type Name already exists."}
            },
            submitHandler: function(form) { 
            	var catType = $(form).attr('data-category-type');
                var data = new Object();
                data['name'] = $('#' + _this.id + '-category-type-' + catType + '-name').val();
                data['categoryId'] = _this.data['id'];
                _this._submitCategoryTypeData(catType, data);
                return false;  //This doesn't prevent the form from submitting.
            }

        });

        $('#' + this.id + '-category-type-' + this.categoryTypeCount + '-cancel-action').on('click', function (e) {

            $('#' + _this.id + '-category-type-' + $(this).attr('data-category-type')).remove();
            e.preventDefault();

        });

        $('[data-toggle="tooltip"]').tooltip();


    },
    _initEvents: function () {

        var _this = this;

        $('#' + this.id + '-sub-category-btn').on('click', function (e) {

            _this._addSubCategoryItem();
            _this.subCategoryCount++;
            e.preventDefault();

        });

        $('#' + this.id + '-category-type-btn').on('click', function (e) {

            _this._addCategoryTypeItem();
            _this.categoryTypeCount++;
            e.preventDefault();

        });

        $('#add-items-to-category-back-btn').on('click',function(e){

            $('#' +  _this.containerId).hide();
            $('#' +  _this.returningId).show();

            e.preventDefault();

        });

    },
    _submitSubCategoryData: function (subCat, data) {

        var _this = this;
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/category/sub/save',
            data: JSON.stringify(data)
        }).success(function (response) {
           
        	if (response && response['type'] === 'SUCCESS') {
        		 alertify.success(response['msg']);
                 $('#' + _this.id + '-sub-category-' + subCat).hide();
                 $('#' + _this.id + '-sub-category-' + subCat + '-view').html(data['name']);
                 $('#' + _this.id + '-sub-category-' + subCat + '-view').show();                 
                           
            }else{
            	alertify.error(response['msg']);
            } 


        }).fail(function (e) {
        	alertify.error("Failed to save Sub Category due to System Fault.");
        });


    },
    _submitCategoryTypeData: function (catType, data) {

        console.log('in submit');
        var _this = this;
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/category/type/save',
            data: JSON.stringify(data)
        }).success(function (response) {
            if (response && response['type'] === 'SUCCESS') {
            	alertify.success(response['msg']);
                $('#' + _this.id + '-category-type-' + catType).hide();
                $('#' + _this.id + '-category-type-' + catType + '-view').html(data['name']);
                $('#' + _this.id + '-category-type-' + catType + '-view').show();
                          
                          
           }else{
           	alertify.error(response['msg']);
           } 

        }).fail(function (e) {
        	alertify.error("Failed to save Category Type due to System Fault.");
        });


    }


};