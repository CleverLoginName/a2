var EditInteriorDesignProduct = function (containerId,data,returningId,initData) {

    this.initData = initData;
    this.containerId = containerId;
    this.returningId = returningId;
    this.container = $('#' + containerId);
    this.id = UUID();
    this.supplierList = initData['suppliers'];
    this.validator = null;
    this.category = initData['category'];
    this.symbols = initData['symbols'];
    this.data = data;
    this.properties = JSON.parse(this.data['properties']);

};
EditInteriorDesignProduct.prototype = {

    init: function () {

        this.container.empty();
        var template = '<section class="box new-item-wrapper">' +
            '<section class="box-header"></section>' +
            '<section class="box-body">';

        template += this._initUI();

        template += '</section>' +
        '</section>';

        $(template).appendTo(this.container);

        $('#prod-frm-sup').val(this.data['supplier']);

        $('#prod-frm-sub-cat').val(this.data['subCategory']);
        $('#prod-frm-type').val(this.data['categoryType']);
        $('#prod-frm-des').val(this.data['description']);
        $('#prod-frm-symbol').val(this.data['electricSymbol']);
        $('.symbol-item[data-src="' + this.data['electricSymbol'] + '"]').addClass('symbol-selected');


        this._initEvents();

    },
    _initUI: function () {

        var uiTemplate = '<form class="row new-item-from-wrapper" role="form"  method="post" id="edit-prod-form" enctype="multipart/form-data">' +
	        '<section class="row form-group">' +
	        '<section class="col-md-2"></section>' +
	        '<section class="col-md-2"><label>Manufacturing Product Code</label></section>' +
	        '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-code" name="prod-frm-code" value="' + this.data['code'] + '"/></section>' +
	        '<section class="col-md-2"></section>' +
	        '</section>' +
	        '<section class="row form-group">' +
	        '<section class="col-md-2"></section>' +
	        '<section class="col-md-2"><label>Builders Product Code</label></section>' +
	        '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-build-code" name="prod-frm-build-code" value="' + this.data['builderCode'] + '"/></section>' +
	        '<section class="col-md-2"></section>' +
	        '</section>' +
	        '<section class="row form-group">' +
	        '<section class="col-md-2"></section>' +
	        '<section class="col-md-2"><label>Pronto Code</label></section>' +
	        '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-pronto-code" name="prod-frm-pronto-code" value="' + this.data['prontoCode'] + '"/></section>' +
	        '<section class="col-md-2"></section>' +
	        '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Name</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-name" name="prod-frm-name"  value="' + this.data['name'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Description</label></section>' +
            '<section class="col-md-6"><textarea class="form-control description" id="prod-frm-des" name="prod-frm-des"></textarea></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Purchase Price  (<i class="fa fa-dollar"></i>)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required amount" id="prod-frm-pp" name="prod-frm-pp" value="' + this.data['purchasePrice'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Selling Price (<i class="fa fa-dollar"></i>)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required amount" id="prod-frm-sp" name="prod-frm-sp" value="' + this.data['sellingPrice'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Discount  (%)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required discount" id="prod-frm-dc" name="prod-frm-dc" value="' + this.data['discount'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Quantity</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required qty" id="prod-frm-qty" name="prod-frm-qty" value="' + this.data['qty'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Energy Consumption (W)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control ec" id="prod-frm-ec" name="prod-frm-ec"  value="' + ((this.properties['ENERGY_CONSUMPTION']) ? this.properties['ENERGY_CONSUMPTION'] : '') + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="row margin-bottom-10">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Product Image</label></section>' +
            '<section class="col-md-6 img-preview"><img class="border-img product-case-img" src="' + mapUrlAsExternalRes(this.data['image']) + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-6"><input type="file" class="form-control imageOpt" id="prod-frm-image" name="image" accept="image/jpg,image/jpeg,image/png"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="row margin-bottom-10">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Product 3D Image</label></section>' +
            '<section class="col-md-6"><a class="img-download" href="restAPI/product/' + this.data['id'] + '/image3d/base">Existing 3D Image File</a></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-6"><input type="file" class="form-control image3DOpt" id="prod-frm-3d-image" name="image3D" accept=".obj"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Width</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-width" name="prod-frm-width"  value="' + this.data['width'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Height</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-height" name="prod-frm-height" value="' + this.data['height'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Depth</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-depth" name="prod-frm-depth" value="' + this.data['depth'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Catalogue</label></section>' +
            '<section class="col-md-6">' +
            '<input type="text" class="form-control" id="prod-frm-cat-display" name="prod-frm-cat-display" value="' + this.category['name'] + '" readonly/>' +            
            '<input type="text" class="form-control required" id="prod-frm-cat" name="prod-frm-cat" value="' + this.category['id'] + '" style="display:none;"/>' +
            '</section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Category</label></section>' +
            '<section class="col-md-6">' +
            '<select class="form-control required notselected" id="prod-frm-sub-cat" name="prod-frm-sub-cat">' +
        
            this._setSubCategoryOpts() +
        
            '</select>' +
            '</section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Sub Category</label></section>' +
            '<section class="col-md-6">' +
            '<select class="form-control required notselected" id="prod-frm-type" name="prod-frm-type">' +

            this._setTypeOpts() +
            
            '</select>' +
            '</section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Elevation</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-elev" name="prod-frm-elev" value="203.2"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group" style="display:none;">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Owner</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-owner" name="prod-frm-owner" value="' + window.username + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Supplier</label></section>' +
            '<section class="col-md-6">' +
            '<select class="form-control required notselected" id="prod-frm-sup" name="prod-frm-sup">' +

            this._setSuppliersOpt() +

            '</select>' +
            '</section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group symbol-section">' +
	        '<section class="row margin-bottom-10">' +
	        '<section class="col-md-2"></section>' +
	        '<section class="col-md-2"><label>Electric Symbol</label></section>' +
	        '<section class="col-md-6"><div style="font-weight:bold;margin-bottom:5px;">(Current Symbol)</div><img class="border-img product-case-img" src="' + mapUrlAsExternalRes(this.data['electricSymbol']) + '"/></section>' +
	        '<section class="col-md-2"></section>' +
	        '</section>' +
	        '<section class="row">' +
	        '<section class="col-md-2"></section>' +
	        '<section class="col-md-2"></section>' +
	        '<section class="col-md-6"><div style="font-weight:bold;margin-bottom:5px;">(Select Symbol from below to change current)</div>' + 
	        '<section class="symbol-container">';
	    
	    if(this.data['subCategory']){
	    	
	    	var symbols = this._getSymbolsForCat(this._getSlectedSubCatName(this.data['subCategory']).toUpperCase());
	        for(var i = 0 ; i < symbols.length; i++){
	        	
	        	uiTemplate += '<img class="symbol-item" src="' + mapUrlAsExternalRes(symbols[i]['image']) + '" data-src="' + symbols[i]['image'] + '" data-toggle="tooltip" data-placement="top" title="' + symbols[i]['name'] + '"/>';
	        	
	        }
	        
	    }
	        
	    
	        
	        uiTemplate += '</section>' +
	    	'<input type="hidden" class="form-control symbol" id="prod-frm-symbol" name="prod-frm-symbol"/>' +
	    	'</section>' +
	        '<section class="col-md-2"></section>' +
	        '</section>' +
	        '</section>'+
            
            '<section class="row box-footer"  id="form-footer">' +
            '<button id="' + this.id + '-edit-product-btn" type="submit" class="btn add-item-btn">Update <img src="resources/images/spinning-circles.svg" class="loading-img-btn" style="display:none;" id="' + this.id + '-edit-product-loading"/></button>' +
	        '<button class="btn add-item-btn" id="prod-edit-back-btn" style="margin-right:10px;"><i class="fa fa-mail-reply"></i> Back</button>' +
            '</section>' +
            '</form>';

        return uiTemplate;

    },
    _initEvents : function(){

        var _this = this;

        $('#prod-frm-width,#prod-frm-height,#prod-frm-depth,#prod-frm-elev').TouchSpin({
            min: 0,
            max: 1000000000,
            step: 0.1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            verticalbuttons: true,
            verticalupclass: 'fa fa-angle-up',
            verticaldownclass: 'fa fa-angle-down'
        });

        this.validator = $("#edit-prod-form").validate({ignore: []});

        $("#edit-prod-form").submit(function (event) {

            if ($(this).find('input.error,select.error').length === 0) {

                var frmData = new FormData($(this)[0]);
                _this._submitData(frmData);

            }

            event.preventDefault();

        });

        $('#prod-edit-back-btn').on('click',function(e){

            $('#' +  _this.containerId).hide();
            $('#' +  _this.returningId).show();

            e.preventDefault();

        });
        
        $('#prod-frm-sub-cat').on('change', function () {
            var selectedSubCat = $(this).find(":selected").text();
            _this._setSubCategorySpecificFields(selectedSubCat);
            $('#prod-frm-elev').val(_this._calcElevationFromSubCat(selectedSubCat));
        });
        
        $('.symbol-item').on('click',function(){
        	
        	if($(this).hasClass('symbol-selected')){
        		$(this).removeClass('symbol-selected');
        		$('#prod-frm-symbol').val('');
        	}else{

            	$('.symbol-item.symbol-selected').removeClass('symbol-selected');
            	$(this).addClass('symbol-selected');
            	$('#prod-frm-symbol').val($(this).attr('data-src'));
            	$('#prod-frm-symbol').removeClass('error');
            	$('label[for="prod-frm-symbol"]').remove();
        	}
        });

    },
    _calcElevationFromSubCat : function(calcFactor) {   	
		
		var elev = 0;
		calcFactor = calcFactor.toLowerCase();
		
		if(calcFactor.indexOf("floor") > -1){
			elev = 0;
		} else if(calcFactor.indexOf("down") > -1){
			elev = 203.2;
		} else if(calcFactor.indexOf("wall") > -1){
			elev = 203.2/2;
		} else if(calcFactor.indexOf("table") > -1){
			elev = 203.2/8;
		} else if(calcFactor.indexOf("hanging") > -1){
			elev = 203.2;
		}else if(calcFactor.indexOf("switches")  > -1){
			elev = 203.2/4;
		}
		
		return elev;
    	
    },
    _submitData : function(data){

    	var _this = this;
        $('#' + this.id + '-edit-product-loading').show();
        $('#' + this.id + '-edit-product-btn').attr('disabled',true);

        $.ajax({
            type: 'POST',
            url: 'restAPI/product/id/' + _this.data['id'] + '/update',
            data: data,
            processData: false,
            contentType: false,
            cache:false
        }).success(function (response) {
            if (response && response['type'] === 'SUCCESS') {
            	alertify.success(response['msg']);
            	$('#' + _this.id + '-edit-product-loading').hide();
	            $('#' + _this.id + '-edit-product-btn').attr('disabled',false);
	            $('#' +  _this.containerId).hide();
	            $('#' +  _this.returningId).show();
	            _this._updateView();            
                           
            }else{
            	alertify.error(response['msg']);
            	$('#' + _this.id + '-edit-product-loading').hide();
	            $('#' + _this.id + '-edit-product-btn').attr('disabled',false);
            } 
        }).fail(function (e) {
        	alertify.error("Failed to Update Product due to System Fault.");
            $('#' + _this.id + '-edit-product-loading').hide();
            $('#' + _this.id + '-edit-product-btn').attr('disabled',false);
        });



    },
    _updateView : function() {
        $(document).trigger('update/editProductView',{"productId":this.data['id'],"value":$('#prod-frm-name').val(),"property":"name"});
        $(document).trigger('update/editProductView',{"productId":this.data['id'],"value":$('#prod-frm-code').val(),"property":"code"});
    },
    _setSuppliersOpt : function(){

        var optTmpl = '<option value="default">Select Supplier</option>';

        for(var i = 0 ; i < this.supplierList.length; i++){

            optTmpl+= '<option value="' + this.supplierList[i]['id']  + '">' + this.supplierList[i]['name']  + '</option>';

        }

        return optTmpl;

    },
    _setSubCategoryOpts : function(){

         var subCats = this.category['subCategories'];

            var optTmpl = '<option value="default">Select Sub Category</option>';
                for(var i = 0 ; i < subCats.length; i++){

                    optTmpl += '<option value="' + subCats[i]['id']  + '">' + subCats[i]['name']  + '</option>';

                }
                return optTmpl;

    },
    _setTypeOpts : function(selectedCat,catIndex){

        var catTypes = this.category['categoryTpes'];

            var optTmpl = '<option value="default">Select Category</option>';
                for(var i = 0 ; i < catTypes.length; i++){

                    optTmpl += '<option value="' + catTypes[i]['id']  + '">' + catTypes[i]['name']  + '</option>';

                }
                return optTmpl;
            

    },
    _setSubCategorySpecificFields : function(selectedSubCat){

    	var selectedSubCatUpper = selectedSubCat.toUpperCase();
    	this._resetSpecifics();
        this._setSymbolField(selectedSubCatUpper);

    },
    _setSymbolField : function(selectedCat){

        var symbolFieldTmpl = '<section class="row form-group symbol-section">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Electric Symbol</label></section>' +
            '<section class="col-md-6">' +
            '<section class="symbol-container">';
        
        var symbols = this._getSymbolsForCat(selectedCat);
        for(var i = 0 ; i < symbols.length; i++){
        	
        	symbolFieldTmpl += '<img class="symbol-item" src="' + mapUrlAsExternalRes(symbols[i]['image']) + '" data-src="' + symbols[i]['image'] + '" data-toggle="tooltip" data-placement="top" title="' + symbols[i]['name'] + '"/>';
        	
        }
        
        symbolFieldTmpl += '</section>' +
        	'<input type="hidden" class="form-control symbol" id="prod-frm-symbol" name="prod-frm-symbol"/>' +
            '</section>' +
            '<section class="col-md-2"></section>' +
            '</section>' ;        
        
        $('#form-footer').before($(symbolFieldTmpl));
        
        $('.symbol-item').on('click',function(){
        	
        	if($(this).hasClass('symbol-selected')){
        		$(this).removeClass('symbol-selected');
        		$('#prod-frm-symbol').val('');
        	}else{

            	$('.symbol-item.symbol-selected').removeClass('symbol-selected');
            	$(this).addClass('symbol-selected');
            	$('#prod-frm-symbol').val($(this).attr('data-src'));
            	$('#prod-frm-symbol').removeClass('error');
            	$('label[for="prod-frm-symbol"]').remove();
        	}
        });
        
        $('[data-toggle="tooltip"]').tooltip()
        
    },
    _resetSpecifics : function(){

        $('.symbol-section').remove();

    },
    _getSymbolsForCat : function(cat){
    	
    	var symbols = new Array();
    	
    	if(cat === null){
    		return this.symbols;
    	}
    	
    	for(var i = 0 ; i < this.symbols.length; i++){
        	
    		if(cat.toUpperCase().indexOf(this.symbols[i]['category']) > -1){
    			symbols.push(this.symbols[i]);
    		}
        	
        }
    	
    	if(symbols.length === 0){
    		symbols = this.symbols;
    	}
    	
    	return symbols;
    	
    },
    _getSlectedSubCatName : function(subCatId){
    	
    	var subCats = this.category['subCategories'],
    		subCatName = '';
    	
    	for(var i = 0 ; i < subCats.length; i++){
    		if(subCats[i]['id'] === subCatId){
    			subCatName = subCats[i]['name'];
    			break;
    		}
    	}
    	
    	return subCatName;
    	
    	
    }

};
