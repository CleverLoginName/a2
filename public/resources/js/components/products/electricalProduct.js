var ElectricalProduct = function (containerId,initData) {

    this.initData = initData;
    this.container = $('#' + containerId);
    this.id = UUID();
    this.supplierList = initData['suppliers'];
    this.validator = null;
    this.category = initData['category'];
    this.symbols = initData['symbols'];

};
ElectricalProduct.prototype = {

    init: function () {

        this.container.empty();
        var template = '<section class="box new-item-wrapper">' +
            '<section class="box-header"></section>' +
            '<section class="box-body">';

        template += this._initUI();

        template += '</section>' +
        '</section>';

        $(template).appendTo(this.container);
        window.breadcrumb.addItem("Electrical", this.container.attr('id'));


        this._initEvents();

    },
    _initUI: function () {

        var uiTemplate = '<form class="row new-item-from-wrapper" role="form"  method="post" id="new-prod-form" enctype="multipart/form-data">' +
	        '<section class="row form-group">' +
	        '<section class="col-md-2"></section>' +
	        '<section class="col-md-2"><label>Manufacturing Product Code</label></section>' +
	        '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-code" name="prod-frm-code"/></section>' +
	        '<section class="col-md-2"></section>' +
	        '</section>' +
	        '<section class="row form-group">' +
	        '<section class="col-md-2"></section>' +
	        '<section class="col-md-2"><label>Builders Product Code</label></section>' +
	        '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-build-code" name="prod-frm-build-code"/></section>' +
	        '<section class="col-md-2"></section>' +
	        '</section>' +
	        '<section class="row form-group">' +
	        '<section class="col-md-2"></section>' +
	        '<section class="col-md-2"><label>Pronto Code</label></section>' +
	        '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-pronto-code" name="prod-frm-pronto-code"/></section>' +
	        '<section class="col-md-2"></section>' +
	        '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Name</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-name" name="prod-frm-name"/></section>' +
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
            '<section class="col-md-2"><label>Builders Price  (<i class="fa fa-dollar"></i>)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required amount" id="prod-frm-pp" name="prod-frm-pp"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Sales Price (<i class="fa fa-dollar"></i>)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required amount" id="prod-frm-sp" name="prod-frm-sp"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Discount  (%)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required discount" id="prod-frm-dc" name="prod-frm-dc"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Quantity</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required qty" id="prod-frm-qty" name="prod-frm-qty"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Energy Consumption (W)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required ec" id="prod-frm-ec" name="prod-frm-ec"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Product Image</label></section>' +
            '<section class="col-md-6"><input type="file" class="form-control required image" id="prod-frm-image" name="image" accept="image/jpg,image/jpeg,image/png"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Product 3D Image</label></section>' +
            '<section class="col-md-6"><input type="file" class="form-control required image3D" id="prod-frm-3d-image" name="image3D" accept=".obj"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Width</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-width" name="prod-frm-width" value="50"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Height</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-height" name="prod-frm-height" value="50"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Depth</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-depth" name="prod-frm-depth" value="50"/></section>' +
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
            '<section class="row box-footer"  id="form-footer">' +
            '<button id="' + this.id + '-new-product-btn" type="submit" class="btn add-item-btn">Add <img src="resources/images/spinning-circles.svg" class="loading-img-btn" style="display:none;" id="' + this.id + '-new-product-loading"/></button>' +
            '<button id="prod-frm-reset" class="btn add-item-btn" style="margin-right:10px;">Reset</button>' +
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

        this.validator = $("#new-prod-form").validate({ignore: []});

        $("#new-prod-form").submit(function (event) {

            if ($(this).find('input.error,select.error').length === 0) {

                var frmData = new FormData($(this)[0]);
                _this._submitData(frmData);

            }

            event.preventDefault();

        });

        $('#prod-frm-reset').on('click',function(e){

            _this._reset();
            _this.validator.resetForm();
            e.preventDefault();

        });
        
        $('#prod-frm-sub-cat').on('change', function () {
            var selectedSubCat = $(this).find(":selected").text();
            _this._setSubCategorySpecificFields(selectedSubCat);
            $('#prod-frm-elev').val(_this._calcElevationFromSubCat(selectedSubCat));
        });
        
        this._setSymbolField(null);

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
    _reset : function() {

    	$('#prod-frm-code').val('');
    	$('#prod-frm-build-code').val('');
    	$('#prod-frm-pronto-code').val('');
        $('#prod-frm-name').val('');
        $('#prod-frm-pp').val('');
        $('#prod-frm-sp').val('');
        $('#prod-frm-ec').val('');
        $('#prod-frm-qty').val('');
        $('#prod-frm-dc').val('');
        $('#prod-frm-sub-cat').val('default');
        $('#prod-frm-type').val('default');
        $('#prod-frm-sup').val('default');
        $('#prod-frm-image').val('');
        $('#prod-frm-3d-image').val('');
        $('#prod-frm-des').val('');
        $('#prod-frm-width').val('50');
        $('#prod-frm-height').val('50');
        $('#prod-frm-depth').val('50');
        $('#prod-frm-elev').val('50');
        this._resetSpecifics();
        this._setSymbolField(null);

    },
    _submitData : function(data){

        var _this = this;
        $('#' + this.id + '-new-product-loading').show();
        $('#' + this.id + '-new-product-btn').attr('disabled',true);
        $.ajax({
            type: 'POST',
            url: 'restAPI/product/electrical/save',
            data: data,
            processData: false,
            contentType: false,
            cache:false
        }).success(function (response) {
            if (response && response['type'] === 'SUCCESS') {
            	alertify.success(response['msg']);
                $('#' + _this.id + '-new-product-loading').hide();
                $('#' + _this.id + '-new-product-btn').attr('disabled',false);
                _this._reset();               
                           
            }else{
            	alertify.error(response['msg']);
            	$('#' + _this.id + '-new-product-loading').hide();
                $('#' + _this.id + '-new-product-btn').attr('disabled',false);
            } 

        }).fail(function (e) {
        	alertify.error("Failed to Save Product due to System Fault.");
            $('#' + _this.id + '-new-product-loading').hide();
            $('#' + _this.id + '-new-product-btn').attr('disabled',false);
        });


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
        
        if(selectedSubCatUpper.indexOf("LIGHTS") >= 0){

            this._setLightSpecificFields();

        }else if(selectedSubCatUpper.indexOf("SWITCHES") >= 0){

            this._setSwitchSpecificFields();

        }

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
    _setLightSpecificFields : function(){

        var lumsFieldTmpl = '<section class="row form-group light-specific">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>LUMS</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required lums" id="prod-frm-lums" name="prod-frm-lums"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' ;        
        
        $('#form-footer').before($(lumsFieldTmpl));
        
        var colorTmpFieldTmpl = '<section class="row form-group light-specific">' +
        '<section class="col-md-2"></section>' +
        '<section class="col-md-2"><label>Color Temperature</label></section>' +
        '<section class="col-md-6"><div class="btn-danger" style="padding: 10px;margin-bottom:15px;">Note : The Temperature value is not available, Please select the appropriate color from the color section Box and press "OK".</div>' + 
        '<input type="text" class="form-control" id="prod-frm-color-tmp" name="prod-frm-color-tmp"/></section>' +
        '<section class="col-md-2"></section>' +        
        '</section>' ;

        $('#form-footer').before($(colorTmpFieldTmpl));

        var colorFieldTmpl = '<section class="row form-group light-specific">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Light Color</label></section>' +
            '<section class="col-md-6"><input type="hidden" class="form-control required" id="prod-frm-color" name="prod-frm-color"/><div id="picker"></div></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' ;

        $('#form-footer').before($(colorFieldTmpl));

        var ratingsFieldTmpl = '<section class="row form-group light-specific">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Energy Ratings</label></section>' +
            '<section class="col-md-6"><input type="text" id="ratings" class="span2"><input type="text" class="form-control required" id="prod-frm-ratings" name="prod-frm-ratings" style="width: 50px;margin-top:-10px;float:right;" value= "0" readonly/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' ;

        $('#form-footer').before($(ratingsFieldTmpl));

        this._initLightSpecificEvents();

    },
    _setSwitchSpecificFields : function(){

        var btnFieldTmpl = '<section class="row form-group switch-specific">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>No of Buttons</label></section>' +
            '<section class="col-md-6">' +
            '<select class="form-control required notselected" id="prod-frm-buttons" name="prod-frm-buttons">' +
            '<option value="default">Select Button Count</option>' +
            '<option value="1">1</option>' +
            '<option value="2">2</option>' +
            '<option value="3">3</option>' +
            '<option value="4">4</option>' +
            '<option value="5">5</option>' +
            '</select>' +
            '</section>' +
            '<section class="col-md-2"></section>' +
            '</section>' ;


        $('#form-footer').before($(btnFieldTmpl));

    },
    _resetSpecifics : function(){

        $('.light-specific').remove();
        $('.switch-specific').remove();
        $('.symbol-section').remove();

    },
    _initLightSpecificEvents : function(){
    	
    	$('#prod-frm-color-tmp').TouchSpin({
    		min: 1000,
            max: 40000,
            step: 100,
            decimals: 0,
            boostat: 1000,
            maxboostedstep: 1000,
            verticalbuttons: true,
            verticalupclass: 'fa fa-angle-up',
            verticaldownclass: 'fa fa-angle-down'
        });
    	
    	$('#prod-frm-color-tmp').on('change', function () {
    		
    		var color = $('#prod-frm-color-tmp').val();
    		
    		if(color && parseInt(color) >= 1000){
    			var rgbColor = hexToRgb(getColor(color));
    			$('#picker').colpickSetColor({r: rgbColor.r ,g:  rgbColor.g , b: rgbColor.b});
    			$('#prod-frm-color').val(rgbColor.r + '-' + rgbColor.g + '-' + rgbColor.b);
    		}else{
    			$('#prod-frm-color-tmp').val(1000);
    			var rgbColor = hexToRgb(getColor(1000));
    			$('#picker').colpickSetColor({r: rgbColor.r ,g:  rgbColor.g , b: rgbColor.b});
    			$('#prod-frm-color').val(rgbColor.r + '-' + rgbColor.g + '-' + rgbColor.b);
    		}
    		
    	});
    	
    	var rgbColor = hexToRgb(getColor(1000));
    	$('#prod-frm-color').val(rgbColor.r + '-' + rgbColor.g + '-' + rgbColor.b);
    	
        $('#picker').colpick({
            flat:true,
            color:getColor(1000),
            submit:true,
            onChange : function(hsb,hex,rgb,el,bySetColor){ 
            	
                
            },
            onSubmit: function(hsb, hex, rgb, el) {
        		var colorTmp = $('#prod-frm-color-tmp').val();
        		
        		if(colorTmp && colorTmp !== ''){
        			
        			bootbox.dialog({
                        closeButton: false,
                        message: 'The color selected based on the color temperature . Are you sure you want to alter the color?',
                        className:"logout-dialog",
                        buttons: {
                            main:{
                                label: "Yes",
                                callback: function(){
                                	$('#prod-frm-color').val(rgb.r + '-' + rgb.g + '-' + rgb.b);
                                	$('#prod-frm-color-tmp').val('')
                                }
                            },
                            sucess:{
                                label: "No",
                                callback: function(){
                                	var color = $('#prod-frm-color-tmp').val();
                            		
                            		if(color){
                            			var rgbColor = hexToRgb(getColor(color));
                            			$('#picker').colpickSetColor({r: rgbColor.r ,g:  rgbColor.g , b: rgbColor.b});
                            		}
                                }
                            }
                        }       
                    });
        			
        		}else{
        			$('#prod-frm-color').val(rgb.r + '-' + rgb.g + '-' + rgb.b);
        		}
        	}

        });
        
        $("#ratings").slider({
        	min : 0,
        	max:10,
        	step:.5,
        	value : 0,
        	orientation : 'horizontal',
        	tooltip : 'hide',
        	handle : 'square'
        }).on('slide', function(ev){
        	$('#prod-frm-ratings').val(ev.value);
        });;
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
    	
    }

};
