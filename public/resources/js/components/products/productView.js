var ProductView = function (containerId, data, returningId) {

    this.containerId = containerId;
    this.returningId = returningId;
    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;    
    this.properties = JSON.parse(this.data['properties']);

};
ProductView.prototype = {

    init: function () {

        this.container.empty();
        var template = '<section class="box new-item-wrapper">' +
            '<section class="box-header"></section>' +
            '<section class="box-body">';

        template += this._initUI();

        template += '</section>' +
        '</section>';

        $(template).appendTo(this.container);

        this._initEvents();

    },
    _initUI: function () {


        var uiTemplate = '<form class="row new-item-from-wrapper">' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>ID</label></section>' +
            '<section class="col-md-5"><label>' + this.data['id'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Manufacturing Product Code</label></section>' +
            '<section class="col-md-5"><label>' + this.data['code'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Builders Product Code</label></section>' +
            '<section class="col-md-5"><label>' + this.data['builderCode'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Pronto Code</label></section>' +
            '<section class="col-md-5"><label>' + this.data['prontoCode'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Name</label></section>' +
            '<section class="col-md-5"><label>' + this.data['name'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Description</label></section>' +
            '<section class="col-md-5"><label class="description-preview">' + ((this.data['description']) ? this.data['description'] : "No Description") + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>';

        if (this.data['category'] !== null) {
            uiTemplate += '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Catalogue</label></section>' +
            '<section class="col-md-5"><label>' + this.data['category'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>';
        }

        if (this.data['subCategory'] !== null) {
            uiTemplate += '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Category</label></section>' +
            '<section class="col-md-5"><label>' + this.data['subCategory'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>';
        }

        if (this.data['categoryType'] !== null) {
            uiTemplate += '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Sub Category</label></section>' +
            '<section class="col-md-5"><label>' + this.data['categoryType'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>';
        }


        uiTemplate += '<section class="row form-group">' +
        '<section class="col-md-2"></section>' +
        '<section class="col-md-3"><label>Builders Price  (<i class="fa fa-dollar"></i>)</label></section>' +
        '<section class="col-md-5"><label>' + this.data['purchasePrice'] + '</label></section>' +
        '<section class="col-md-2"></section>' +
        '</section>' +
        '<section class="row form-group">' +
        '<section class="col-md-2"></section>' +
        '<section class="col-md-3"><label>Sales Price (<i class="fa fa-dollar"></i>)</label></section>' +
        '<section class="col-md-5"><label>' + this.data['sellingPrice'] + '</label></section>' +
        '<section class="col-md-2"></section>' +
        '</section>' +
        '<section class="row form-group">' +
        '<section class="col-md-2"></section>' +
        '<section class="col-md-3"><label>Discount  (%)</label></section>' +
        '<section class="col-md-5"><label>' + this.data['discount'] + '</label></section>' +
        '<section class="col-md-2"></section>' +
        '</section>' +
        '<section class="row form-group">' +
        '<section class="col-md-2"></section>' +
        '<section class="col-md-3"><label>Quantity</label></section>' +
        '<section class="col-md-5"><label>' + this.data['qty'] + '</label></section>' +
        '<section class="col-md-2"></section>' +
        '</section>';
        
        if (this.properties['ENERGY_CONSUMPTION']){
        	uiTemplate += '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Energy Consumption (W)</label></section>' +
            '<section class="col-md-5"><label>' + this.properties['ENERGY_CONSUMPTION'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>';
        }
        
        if (this.properties['LUMS']){
        	uiTemplate += '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>LUMS</label></section>' +
            '<section class="col-md-5"><label>' + this.properties['LUMS'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>';
        }
        
        if (this.properties['COLOR_TEMPERATURE']){
        	uiTemplate += '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>Color Temperature(K)</label></section>' +
            '<section class="col-md-5"><label>' + this.properties['COLOR_TEMPERATURE'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>';
        }
        
        if (this.properties['COLOR']){
        	 uiTemplate += '<section class="row form-group">' +
             '<section class="col-md-2"></section>' +
             '<section class="col-md-3"><label>Light Color</label></section>' +
             '<section class="col-md-5"><label style="background-color:rgb(' + this.properties['COLOR'].replace(/\-/g, ',') + ');width:100px;height:30px;"></label></section>' +
             '<section class="col-md-2"></section>' +
             '</section>';
        }
        
        if (this.properties['RATINGS']){
       	 uiTemplate += '<section class="row form-group">' +
         '<section class="col-md-2"></section>' +
         '<section class="col-md-3"><label>Energy Rating</label></section>' +
         '<section class="col-md-5"><img class="img-responsive" src="resources/images/ratings/' + this.properties['RATINGS']  + '.png" style="width:30%"></section>' +
         '<section class="col-md-2"></section>' +
         '</section>';
       }
        
        if (this.properties['BUTTON_COUNT']){
        	uiTemplate += '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-3"><label>No of Buttons</label></section>' +
            '<section class="col-md-5"><label>' + this.properties['BUTTON_COUNT'] + '</label></section>' +
            '<section class="col-md-2"></section>' +
            '</section>';
       }
        uiTemplate += '<section class="row form-group">' +
        '<section class="col-md-2"></section>' +
        '<section class="col-md-3"><label>Supplier Name</label></section>' +
        '<section class="col-md-5"><label>' + this.data['supplier'] + '</label></section>' +
        '<section class="col-md-2"></section>' +
        '</section>' +
        '<section class="row form-group">' +
        '<section class="col-md-2"></section>' +
        '<section class="col-md-3"><label>Product Image</label></section>' +
        '<section class="col-md-5 img-preview"><img class="border-img product-case-img" src="' + mapUrlAsExternalRes(this.data['image']) + '"/></section>' +
        '<section class="col-md-2"></section>' +
        '</section>' +
        '<section class="row form-group">' +
        '<section class="col-md-2"></section>' +
        '<section class="col-md-3"><label>Product 3D Image</label></section>' +
        '<section class="col-md-5"><a class="img-download" href="restAPI/product/' + this.data['id'] + '/image3d/base">Download 3D Image File</a></section>' +
        '<section class="col-md-2"></section>' +
        '</section>' +
        '<section class="row form-group">' +
        '<section class="col-md-2"></section>' +
        '<section class="col-md-3"><label>Electric Symbol</label></section>' +
        '<section class="col-md-5 img-preview"><img class="border-img product-case-img" src="' + mapUrlAsExternalRes(this.data['electricSymbol']) + '"/></section>' +
        '<section class="col-md-2"></section>' +
        '</section>' +
        '<section class="row form-group">' +
        '<section class="col-md-2"></section>' +
        '<section class="col-md-3"><label>Width</label></section>' +
        '<section class="col-md-5"><label>' + this.data['width'] + '</label></section>' +
        '<section class="col-md-2"></section>' +
        '</section>' +
        '<section class="row form-group">' +
        '<section class="col-md-2"></section>' +
        '<section class="col-md-3"><label>Height</label></section>' +
        '<section class="col-md-5"><label>' + this.data['height'] + '</label></section>' +
        '<section class="col-md-2"></section>' +
        '</section>' +
        '<section class="row form-group">' +
        '<section class="col-md-2"></section>' +
        '<section class="col-md-3"><label>Depth</label></section>' +
        '<section class="col-md-5"><label>' + this.data['depth'] + '</label></section>' +
        '<section class="col-md-2"></section>' +
        '</section>' +
        '<section class="row form-group">' +
        '<section class="col-md-2"></section>' +
        '<section class="col-md-3"><label>Elevation</label></section>' +
        '<section class="col-md-5"><label>' + this.data['elevation'] + '</label></section>' +
        '<section class="col-md-2"></section>' +
        '</section>' +
        '<section class="row box-footer">' +
        '<button class="btn add-item-btn" id="prod-edit-back-btn"><i class="fa fa-mail-reply"></i> Back</button>' +
        '</section>' +
        '</form>';

        return uiTemplate;

    },
    _initEvents: function () {

        var _this = this;

        $('#prod-edit-back-btn').on('click', function (e) {

            $('#' + _this.containerId).hide();
            $('#' + _this.returningId).show();

            e.preventDefault();

        });

    }

};
