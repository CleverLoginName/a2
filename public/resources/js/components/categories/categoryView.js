var CategoryView = function (containerId,data,returningId) {

    this.containerId = containerId;
    this.returningId = returningId;
    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;

};
CategoryView.prototype = {

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


        var uiTemplate = '<section class="col-md-2"></section>' +
            '<section class="col-md-8">' +
            
            '<section class="row margin-bottom-20 category-title-wrapper"><span class="category-title">Category</span></section>' +
            '<section class="row sub-category-item margin-bottom-20 ">' +
            this.data['name'] +         
            '</section>' +

            '<section class="row margin-bottom-20 category-title-wrapper"><span class="category-title">Sub Categories</span></section>' +
            '<section class="row margin-bottom-20" id="' + this.id + '-sub-category-container"></section>' +
            '<section class="row margin-bottom-20 category-title-wrapper"><span class="category-title">Category Types</span></section>' +
            '<section class="row margin-bottom-20" id="' + this.id + '-category-types-container"></section>' +

            '</section>' +
            '<section class="col-md-2"></section>'

        return uiTemplate;

    },
    _initData : function(){

        for(var i = 0 ; i < this.data['subCategories'].length; i++){

            this._addSubCategoryItem(this.data['subCategories'][i]['name']);

        }


        for(var i = 0 ; i < this.data['categoryTpes'].length; i++){

            this._addCategoryTypeItem(this.data['categoryTpes'][i]['name']);

        }

    },
    _addSubCategoryItem : function(name){

        var template = '<section class="row">'+
            '<section class="sub-category-item">' + name + '</section>' +
            '</section>';

        $(template).appendTo($('#' + this.id + '-sub-category-container'));

    },
    _addCategoryTypeItem : function(name){

        var template = '<section class="row">'+
            '<section class="sub-category-item">' + name + '</section>' +
            '</section>';

        $(template).appendTo($('#' + this.id + '-category-types-container'));

    },
    _initEvents : function(){

        var _this = this;

        $('#category-item-view-back-btn').on('click',function(e){

            $('#' +  _this.containerId).hide();
            $('#' +  _this.returningId).show();

            e.preventDefault();

        });

    }

};
