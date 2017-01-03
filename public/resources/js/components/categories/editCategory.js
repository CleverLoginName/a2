var EditCategory = function (containerId, data, returningId) {

    this.containerId = containerId;
    this.returningId = returningId;
    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;
    this.validator = null;

};
EditCategory.prototype = {

    init: function () {

        this.container.empty();
        var template = '<section class="box new-item-wrapper">' +
            '<section class="box-header"></section>' +
            '<section class="row box-body">';

        template += this._initUI();

        template += '</section>' +
        '<section class="row box-footer">' +
        '<button class="btn add-item-btn" id="category-item-view-back-btn"><i class="fa fa-mail-reply"></i> Back</button>' +
        '</section>' +
        '</section>';

        $(template).appendTo(this.container);

        this._initEvents();
        this._initData();

    },
    _initUI: function () {


        var uiTemplate = '<section class="row">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-8">' +

            '<section class="row margin-bottom-20 category-title-wrapper"><span class="category-title">Category</span></section>' +
            '<section class="row margin-bottom-20" id="' + this.data['id'] + '-category">' +
            '<section class="col-md-10 sub-category-item" id="' + this.data['id'] + '-category-item-title">' + this.data['name'] + '</section>' +
            '<section class="col-md-2 plan-btn-wrapper"></section>' +
        '</section>' +       

        '<section class="row margin-bottom-20 category-title-wrapper"><span class="category-title">Sub Categories</span></section>' +
        '<section class="row margin-bottom-20" id="' + this.id + '-sub-category-container"></section>' +
        '<section class="row margin-bottom-20 category-title-wrapper"><span class="category-title">Category Types</span></section>' +
        '<section class="row margin-bottom-20" id="' + this.id + '-category-types-container"></section>' +


        '</section>' +

        '<section class="col-md-2"></section>' +

        '</section>';

        return uiTemplate;

    },
    _initData: function () {

        for (var i = 0; i < this.data['subCategories'].length; i++) {

            this._addSubCategoryItem(this.data['subCategories'][i]);

        }


        for (var i = 0; i < this.data['categoryTpes'].length; i++) {

            this._addCategoryTypeItem(this.data['categoryTpes'][i]);

        }

        $('[data-toggle="tooltip"]').tooltip();

    },
    _addSubCategoryItem: function (dataItem) {

        var template = '<section class="row" id="' + dataItem['id'] + '-sub-cat">' +

            '<section class="row" id="' + dataItem['id'] + '-sub-cat-view">' +
            '<section class="col-md-10 sub-category-item" id="' + dataItem['id'] + '-sub-category-item-title">' + dataItem['name'] + '</section>' +
            '<section class="col-md-2 plan-btn-wrapper">';

        if(!(this.data['name'].toUpperCase() === 'LIGHTS' && (dataItem['name'].toUpperCase() === "WALL LIGHTS" || dataItem['name'].toUpperCase() === "HANGING LIGHTS" || dataItem['name'].toUpperCase() === "TABLE LIGHTS"))){
            template += '<button class="plan-btn btn-app" id="' + dataItem['id'] + '-sub-cat-edit-action" data-sub-category-id="' + dataItem['id'] + '"  data-toggle="tooltip" data-placement="top" title="Edit Sub Category">' +
            '<i class="fa fa-edit"></i>' +
            '</button>' +

            '<button class="plan-btn btn-app" id="' + dataItem['id'] + '-sub-cat-remove-action" data-sub-category-id="' + dataItem['id'] + '" data-toggle="tooltip" data-placement="top" title="Remove Sub Category">' +
            '<i class="fa fa-times"></i>' +
            '</button>';
        }

        template += '</section>' +
        '</section>' +

        '<section class="row" style="display:none;" id="' + dataItem['id'] + '-sub-cat-edit-view">' +
        '<form class="row margin-bottom-10" role="form" method="post" id="' + dataItem['id'] + '-sub-cat-edit-from" data-sub-category-id="' + dataItem['id'] + '">' +
        '<section class="row form-group">' +
        '<section class="col-md-10 padding-0"><input type="text" class="form-control required" id="' + dataItem['id'] + '-sub-category-name" name="sub-category-frm-name" value="' + dataItem['name'] + '"/></section>' +
        '<section class="col-md-2 plan-btn-wrapper">' +
        '<button type="submit" class="plan-btn btn-app" id="' + dataItem['id'] + '-sub-cat-save-action" data-toggle="tooltip" data-placement="top" title="Save">' +
        '<i class="fa fa-save"></i>' +
        '</button>' +

        '<button class="plan-btn btn-app" id="' + dataItem['id'] + '-sub-cat-cancel-action" data-sub-category-id="' + dataItem['id'] + '"  data-toggle="tooltip" data-placement="top" title="Cancel">' +
        '<i class="fa fa-mail-reply"></i>' +
        '</button>' +
        '</section>' +
        '</section>' +
        '</form>' +
        '</section>' +


        '</section>';

        $(template).appendTo($('#' + this.id + '-sub-category-container'));


        var _this = this;
        $('#' + dataItem['id'] + '-sub-cat-remove-action').on('click',function(){

            var subCatId = $(this).attr('data-sub-category-id');

            bootbox.dialog({
                closeButton: false,
                message: 'Are you sure,Do you want to remove this Sub Category?',
                className:"logout-dialog",
                buttons: {
                    main:{
                        label: "Yes",
                        callback: function(){
                            _this._removeSubCatAction(subCatId);
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

        var validator = $('#' + dataItem['id'] + '-sub-cat-edit-from').submit(function(e) {
            e.preventDefault();
        }).validate({

            rules: {
                "sub-category-frm-name": {
                    required: true,
                    remote: {
                        url: "restAPI/category/ " + _this.data['id'] + "/sub/name/available",
                        type: "post",
                        data:{
                            "sub-category-frm-name" : function(){
                                var elemVal = $('#' + dataItem['id'] + '-sub-category-name').val();
                                if(elemVal === $('#' + dataItem['id'] + '-sub-category-item-title').text()){
                                    return "";
                                }
                                return elemVal;
                            }
                        }
                    }
                }
            },
            messages: {
                "sub-category-frm-name" : {"remote":"Sub  Category Name already exists."}
            },
            submitHandler: function(form) {
                var subCatObj = new Object();
                subCatObj['categoryId'] = dataItem['id'];
                subCatObj['name'] =  $('#' + dataItem['id'] + '-sub-category-name').val();
                _this._submitSubCatData(JSON.stringify(subCatObj),dataItem['id']);
                return false;  //This doesn't prevent the form from submitting.
            }

        });


        $('#' + dataItem['id'] + '-sub-cat-edit-action').on('click',function(e){

            var subCatId = $(this).attr('data-sub-category-id');

            $('#' + subCatId + '-sub-cat-view').hide();
            $('#' + subCatId + '-sub-cat-edit-view').show();
            e.preventDefault();

        });

        $('#' + dataItem['id'] + '-sub-cat-cancel-action').on('click',function(e){

            var subCatId = $(this).attr('data-sub-category-id');

            $('#' + subCatId + '-sub-cat-edit-view').hide();
            $('#' + subCatId + '-sub-cat-view').show();
            $('#' + subCatId + '-sub-category-name').val($('#' + dataItem['id'] + '-sub-category-item-title').text());
            validator.resetForm();

            e.preventDefault();

        });


    },
    _addCategoryTypeItem: function (dataItem) {

        var template = '<section class="row" id="' + dataItem['id'] + '-cat-type">' +

            '<section class="row" id="' + dataItem['id'] + '-cat-type-view">' +
            '<section class="col-md-10 sub-category-item" id="' + dataItem['id'] + '-cat-type-item-title">' + dataItem['name'] + '</section>' +
            '<section class="col-md-2 plan-btn-wrapper">' +
            '<button class="plan-btn btn-app" id="' + dataItem['id'] + '-cat-type-edit-action" data-category-type-id="' + dataItem['id'] + '"  data-toggle="tooltip" data-placement="top" title="Edit Category Type">' +
            '<i class="fa fa-edit"></i>' +
            '</button>' +

            '<button class="plan-btn btn-app" id="' + dataItem['id'] + '-cat-type-remove-action" data-category-type-id="' + dataItem['id'] + '" data-toggle="tooltip" data-placement="top" title="Remove Category Type">' +
            '<i class="fa fa-times"></i>' +
            '</button>' +
            '</section>' +
            '</section>' +

            '<section class="row" style="display:none;" id="' + dataItem['id'] + '-cat-type-edit-view">' +
            '<form class="row margin-bottom-10" role="form" method="post" id="' + dataItem['id'] + '-cat-type-edit-from" data-category-type-id="' + dataItem['id'] + '">' +
            '<section class="row form-group">' +
            '<section class="col-md-10 padding-0"><input type="text" class="form-control required" id="' + dataItem['id'] + '-category-type-name" name="category-type-frm-name" value="' + dataItem['name'] + '"/></section>' +
            '<section class="col-md-2 plan-btn-wrapper">' +
            '<button type="submit" class="plan-btn btn-app" id="' + dataItem['id'] + '-cat-type-save-action" data-toggle="tooltip" data-placement="top" title="Save">' +
            '<i class="fa fa-save"></i>' +
            '</button>' +

            '<button class="plan-btn btn-app" id="' + dataItem['id'] + '-cat-type-cancel-action" data-category-type-id="' + dataItem['id'] + '"  data-toggle="tooltip" data-placement="top" title="Cancel">' +
            '<i class="fa fa-mail-reply"></i>' +
            '</button>' +
            '</section>' +
            '</section>' +
            '</form>' +
            '</section>' +

            '</section>';

        $(template).appendTo($('#' + this.id + '-category-types-container'));

        var _this = this;
        $('#' + dataItem['id'] + '-cat-type-remove-action').on('click',function(){

            var catTypeId = $(this).attr('data-category-type-id');

            bootbox.dialog({
                closeButton: false,
                message: 'Are you sure,Do you want to remove this Category Type?',
                className:"logout-dialog",
                buttons: {
                    main:{
                        label: "Yes",
                        callback: function(){
                            _this._removeCatTypeAction(catTypeId);
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

        var validator = $('#' + dataItem['id'] + '-cat-type-edit-from').submit(function(e) {
            e.preventDefault();
        }).validate({

            rules: {
                "category-type-frm-name": {
                    required: true,
                    remote: {
                        url: "restAPI/category/ " + _this.data['id'] + "/type/name/available",
                        type: "post",
                        data:{
                            "category-type-frm-name" : function(){
                                var elemVal = $('#' + dataItem['id'] + '-category-type-name').val();
                                if(elemVal === $('#' + dataItem['id'] + '-cat-type-item-title').text()){
                                    return "";
                                }
                                return elemVal;
                            }
                        }
                    }
                }
            },
            messages: {
                "category-type-frm-name" : {"remote":"Category Type Name already exists."}
            },
            submitHandler: function(form) {
                var catTypeObj = new Object();
                catTypeObj['categoryId'] = dataItem['id'];
                catTypeObj['name'] =  $('#' + dataItem['id'] + '-category-type-name').val();
                _this._submitCatTypeData(JSON.stringify(catTypeObj),dataItem['id']);
                return false;  //This doesn't prevent the form from submitting.
            }

        });


        $('#' + dataItem['id'] + '-cat-type-edit-action').on('click',function(e){

            var catTypeId = $(this).attr('data-category-type-id');

            $('#' + catTypeId + '-cat-type-view').hide();
            $('#' + catTypeId + '-cat-type-edit-view').show();
            e.preventDefault();

        });

        $('#' + dataItem['id'] + '-cat-type-cancel-action').on('click',function(e){

            var catTypeId = $(this).attr('data-category-type-id');

            $('#' + catTypeId + '-cat-type-edit-view').hide();
            $('#' + catTypeId + '-cat-type-view').show();
            $('#' + catTypeId + '-category-type-name').val($('#' + dataItem['id'] + '-cat-type-item-title').text());
            validator.resetForm();
            e.preventDefault();

        });


    },
    _initEvents: function () {

        var _this = this;

        $('[data-toggle="tooltip"]').tooltip();       


        $('#category-item-view-back-btn').on('click', function (e) {

            $('#' + _this.containerId).hide();
            $('#' + _this.returningId).show();

            e.preventDefault();

        });

        
    },
    _removeSubCatAction : function(id){

        var _this = this;
        $.ajax({
            url: "restAPI/category/sub/" + id + "/remove",
            context: document.body
        }).done(function (response) {

            if (response && response['type'] === 'SUCCESS') {
       		 alertify.success(response['msg']);
       		 $('#' + id + '-sub-cat').remove();
              
                          
           }else{
           	alertify.error(response['msg']);
           } 

        }).fail(function () {
        	alertify.error("Failed to remove Sub Category due to System Fault.");
        });

    },
    _removeCatTypeAction : function(id){

        var _this = this;
        $.ajax({
            url: "restAPI/category/type/" + id + "/remove",
            context: document.body
        }).done(function (response) {

            
            if (response && response['type'] === 'SUCCESS') {
          		 alertify.success(response['msg']);
          		 $('#' + id + '-cat-type').remove();
                 
                             
              }else{
              	alertify.error(response['msg']);
              } 

        }).fail(function () {
        	alertify.error("Failed to remove Category Type due to System Fault.");
        });

    },
    _submitSubCatData : function(data,subCatId){

        var _this = this;
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/category/sub/update',
            data: data
        }).success(function (response) {
            if (response && response['type'] === 'SUCCESS') {
         		 alertify.success(response['msg']);
         		$('#' + subCatId + '-sub-cat-edit-view').hide();
                $('#' + subCatId + '-sub-cat-view').show();
                var newName = $('#' + subCatId + '-sub-category-name').val();
                $('#' + subCatId + '-sub-category-item-title').html(newName);  
                            
             }else{
             	alertify.error(response['msg']);
             } 
        }).fail(function (e) {
        	alertify.error("Failed to Update Category Type due to System Fault.");
        });

    },
    _submitCatTypeData : function(data,catTypeId){

        var _this = this;
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/category/type/update',
            data: data
        }).success(function (response) {
            if (response && response['type'] === 'SUCCESS') {
         		 alertify.success(response['msg']);
         		$('#' + catTypeId + '-cat-type-edit-view').hide();
                $('#' + catTypeId + '-cat-type-view').show();
                var newName = $('#' + catTypeId + '-category-type-name').val();
                $('#' + catTypeId + '-cat-type-item-title').html(newName);
                            
             }else{
             	alertify.error(response['msg']);
             } 
        }).fail(function (e) {
        	alertify.error("Failed to Update Category Type due to System Fault.");
        });

    }

};
