var ProductCase = function (containerId, data,categories) {

    this.id = UUID();
    this.container = $('#' + containerId);
    this.data = data;
    this.categories = categories;
    /*
     * 
     * 	This is temporary fix. Needs to populate from server
     * 
     * */
    this.filteredData = {};
    this.maxItemsPerPage = 8;
    this.itemsPerRow = 4;
    this.pageCount = 0;
    this.currentPage = 1;

};
ProductCase.prototype = {

    init: function () {

        this.container.empty();
        this._initUI();
        this._initEvents();        

    },
    _initUI: function () {

        var uiTpl = '<section>' +
            '<section class="product-case" id="' + this.id + '-product-case">' +
            '<section class="row product-case-header form-group">' +
            '<label class="product-case-header-label">Show : </label>' +
            '<select id="' + this.id + '-view-chage" class="form-control product-case-header-select input-sm">' +
            '<option value="All">All</option>' +
            this._initCategoryTmpl() +
            '</select>' +
            '</section>' +
            '<section class="row product-case-body">' +
            this._addBody(this.data, true)
            + '</section>' +
            '<section class="row product-case-footer paginate-footer"><ul class="pagination"></ul></section>' +
            '</section>' +
            '<section class="product-case" id="' + this.id + '-product-case-item-view" style="display:none;">' +
                /*'<section class="row product-case-header"></section>' +*/
            '<section class="row product-case-body" id="' + this.id + '-product-case-item-view-body"></section>' +
            '<section class="row product-case-footer product-case-back-to-products"><a class="btn product-case-view-more  product-case-back-btn" role="button" id="' + this.id + '-back-to-products">Back To Products</a></section>' +
            '</section>' +
            '</section>';

        $(uiTpl).appendTo(this.container);

    },
    _initCategoryTmpl : function(){

        var tmpl = '';
        for(var i = 0 ; i < this.categories.length; i++){

            var catName = this.categories[i]['name'];
            tmpl += '<option value="' + catName + '">' + catName + '</option>';
            this.filteredData[catName] = new Array();

        }

        return tmpl;

    },
    _addBody: function (data, filter) {

        var bodyTpl = '';

        for (var i = 0; i < data.length; i += this.maxItemsPerPage) {

            if (i === 0) {
                bodyTpl += '<section class="product-case-page" id="' + this.id + '-page-' + (this.pageCount + 1) + '">';
            } else {
                bodyTpl += '<section class="product-case-page" id="' + this.id + '-page-' + (this.pageCount + 1) + '"  style="display:none;">';
            }


            var productIndex = i + this.maxItemsPerPage;
            for (var j = i; j < productIndex; j += this.itemsPerRow) {

                if (j >= data.length) {
                    break;
                }
                bodyTpl += '<section class="row">';

                for (var k = 0; k < this.itemsPerRow; k++) {

                    if (k + j >= data.length || k + j >= productIndex) {
                        break;
                    }
                    bodyTpl += this._addProductCaseItem(data[k + j]);
                    (filter) ? ((this.filteredData[data[k + j]['category']])? this.filteredData[data[k + j]['category']].push(data[k + j]) : "") : "";

                }
                bodyTpl += '</section>';

            }

            bodyTpl += '</section>';

            this.pageCount++;

        }

        return bodyTpl;

    },
    _addProductCaseItem: function (product) {

        var itemTpl = '<section class="col-xs-12 col-sm-6 col-md-3 product-case-mobile row product-case-item-row">' +
            '<section class="thumbnail product-case-thumbnail">' +
            '<img src="' + mapUrlAsExternalRes(product['imageUrl']) + '" class="product-case-img"/>' +
            '<section class="caption product-case-item">' +
            '<h4 class="product-case-item-name">' + product['name'] + '</h4>' +
            '<section class="row product-case-item-row">' +
            '<section class="col-md-12 label-warning product-case-thumb-label-text">Price</section>' +
            '<section class="col-md-12 product-case-price"> <i class="fa fa-dollar"></i>' + product['sellingPrice'] + '</section>' +
            '<section class="col-md-12 label-danger product-case-discount-text product-case-thumb-label-text">Discount</section>' +
            '<section class="col-md-12 product-case-discount">' + product['discount'] + '%</section>' +
            '</section>' +
            '<a class="btn product-case-view-more" role="button" data-product-id="' + product['id'] + '" id="' + product['id'] + '-view-product">View Product</a>' +
            '</section>' +
            '</section>' +
            '</section>';

        return itemTpl;

    },
    _initEvents: function () {

        var _this = this;
        $('.paginate-footer').pagy({
            totalPages: this.pageCount,
            currentPage: this.currentPage,
            page: function (page) {
                $('#' + _this.id + '-page-' + _this.currentPage).hide();
                $('#' + _this.id + '-page-' + page).show();
                _this.currentPage = page;
                return true;
            }
        });

        $('#' + this.id + '-product-case').on('click', '[id$="-view-product"]', function () {

            var productId = $(this).attr('data-product-id');

            $.ajax({
    	        url: "restAPI/product/" + productId + "/case",
    	        context: document.body
    	    }).done(function (response) {
    	    	
    	    	
    	    	if (response && response['type'] === 'SUCCESS') {
                	
    	    		$('#' + _this.id + '-product-case-item-view-body').empty();
    	            $(_this._setProductMoreDetails(response['data'])).appendTo($('#' + _this.id + '-product-case-item-view-body'));

    	            $('#' + _this.id + '-product-case').hide();
    	            $('#' + _this.id + '-product-case-item-view').show();

    	            $(window).scrollTop(0);

                	
                	
                }else{
                	alertify.error(response['msg']);
                } 

    	    }).fail(function () {
    	    	alertify.error("Failed to load Product due to System Fault.");
    	    });
            
        });

        $('#' + this.id + '-back-to-products').on('click', function () {

            $('#' + _this.id + '-product-case-item-view').hide();
            $('#' + _this.id + '-product-case').show();
        });
       $('#' + this.id + '-view-chage').on('change', function () {

            _this._resetProductCase();
            _this._viewChangeAction($(this).val());

        });


    },
    _setProductMoreDetails: function (product) {

    	var properties = JSON.parse(product['properties']);
        var moreDetailTpl = '<section class="row product-case-more-details-wrapper">' +
            '<section class="row"><section class="col-md-4"><section class="product-case-more-details-img-wrapper"><img src="' + mapUrlAsExternalRes(product['imageUrl']) + '" class="product-case-img"/><div style="font-weight:bold;">Product Code : ' + product['code'] + '</div></section></section>' +
            '<section class="col-md-8">' +
            '<section class="col-md-12 product-case-more-details-cat"><h5 class="product-case-more-details-cat-text">' + ((product['category']) ? product['category'] + ' > ' : '') + ((product['subCategory']) ? product['subCategory'] + ' > ' : '') + ((product['categoryType']) ? product['categoryType'] : '') + '</h5> </section>' +
            '<section class="col-md-12 product-case-more-details-section"><h3 class="product-case-more-details-heading">' + product['name'] + '</h3>';

        if(properties['RATINGS']){
            moreDetailTpl += '<img class="img-responsive product-case-more-details-rating" src="resources/images/ratings/' + properties['RATINGS']  + '.png">';
        }

        moreDetailTpl += '</section>' +
        '<section class="row">';
        
        if (properties['ENERGY_CONSUMPTION']) {
            moreDetailTpl += '<section class="col-md-6  product-case-more-details-section"><section class="label-success product-case-more-details-label-text">Energy Consumption</section><section class="product-case-energy">' + properties['ENERGY_CONSUMPTION'] + ' W</section></section>';
        }
        if (properties['LUMS']) {
            moreDetailTpl += '<section class="col-md-6 product-case-more-details-section"><section class="label-info product-case-more-details-label-text">LUMS</section><section class="product-case-lums">' + properties['LUMS'] + '</Section></section>';
        }
        if (properties['BUTTON_COUNT']) {
            moreDetailTpl += '<section class="col-md-6 product-case-more-details-section"><section class="label-info product-case-more-details-label-text">No of Buttons</section><section class="product-case-lums">' + properties['BUTTON_COUNT'] + '</Section></section>';
        }

        moreDetailTpl += '</section>' +
        '<section class="col-md-6 product-case-more-details-section"><section class="label-warning product-case-more-details-label-text">Price</section><section class="product-case-price"><i class="fa fa-dollar"></i>' + product['sellingPrice'] + '</section></section>' +
        '<section class="col-md-6 product-case-more-details-section"><section class="label-danger product-case-more-details-label-text">Discount</section><section class="product-case-discount">' + product['discount'] + '%</section></section>' +
        '</section>' +
        '</section>' +
        '<section class="row product-case-description">' + ((product['description'])? product['description']: "") + '</section>' +
        '</section>';

        return moreDetailTpl;

    },
    _resetProductCase : function () {

        $('.product-case-body').empty();
        this.pageCount = 0;
        this.currentPage = 1;

    },
    _viewChangeAction : function(show) {

        if (show === 'All') {
            $('<section>' + this._addBody(this.data, false) + '</section>').appendTo($('.product-case-body'));
            $(".paginate-footer").show();
            $(".paginate-footer").pagy("page", this.currentPage, this.pageCount);
        } else {

            if (this.filteredData[show].length === 0) {
                $('<span class="label label-danger product-case-cat-empty">Sorry !.. There are no products for this category at this moment.</span>').appendTo($('.product-case-body'));
                $(".paginate-footer").hide();
            } else {
                $('<section>' + this._addBody(this.filteredData[show], false) + '</section>').appendTo($('.product-case-body'));
                $(".paginate-footer").show();
                $(".paginate-footer").pagy("page", this.currentPage, this.pageCount);

            }

        }

    }

};