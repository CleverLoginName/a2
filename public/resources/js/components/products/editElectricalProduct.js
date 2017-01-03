var EditElectricalProduct = function (containerId,data,returningId,initData) {

	    this.initData = initData;
	    this.containerId = containerId;
	    this.returningId = returningId;
	    this.container = $('#' + containerId);
	    this.id = UUID();
	    this.data = data;
	    this.supplierList = initData['suppliers'];
	    this.category = initData['category'];
	    this.symbols = initData['symbols'];
	    this.properties = JSON.parse(this.data['properties']);


};
EditElectricalProduct.prototype = {

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


	        var uiTemplate = '<form class="row new-item-from-wrapper" role="form" method="post" id="edit-product-form">' +
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
	            '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-name" name="prod-frm-name" value="' + this.data['name'] + '"/></section>' +
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
	            '<section class="col-md-2"><label>Purchase Price (<i class="fa fa-dollar"></i>)</label></section>' +
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
	            '<section class="col-md-6"><input type="text" class="form-control required ec" id="prod-frm-ec" name="prod-frm-ec" value="' + this.properties['ENERGY_CONSUMPTION'] + '"/></section>' +
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
	            '<section class="col-md-6"><input type="text" class="form-control required" id="prod-frm-width" name="prod-frm-width" value="' + this.data['width'] + '"/></section>' +
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
	        '</section>';
	        
	        
	        if (this.properties['LUMS']){
	        	 uiTemplate +=  '<section class="row form-group light-specific">' +
		            '<section class="col-md-2"></section>' +
		            '<section class="col-md-2"><label>LUMS</label></section>' +
		            '<section class="col-md-6"><input type="text" class="form-control required lums" id="prod-frm-lums" name="prod-frm-lums" value="' + this.properties['LUMS'] + '"/></section>' +
		            '<section class="col-md-2"></section>' +
		            '</section>';	        	
	        }
	        
	        if (this.properties['COLOR']){
	        	uiTemplate += '<section class="row form-group light-specific">' +
	            '<section class="col-md-2"></section>' +
	            '<section class="col-md-2"><label>Color Temperature</label></section>' +
	            '<section class="col-md-6"><div class="btn-danger" style="padding: 10px;margin-bottom:15px;">Note : If you need to change current light color using temperature value, use this filed.</div>' + 
	            '<input type="text" class="form-control" id="prod-frm-color-tmp" name="prod-frm-color-tmp"/></section>' +
	            '<section class="col-md-2"></section>' +        
	            '</section>' +
	            '<section class="row form-group light-specific">' +
	            '<section class="col-md-2"></section>' +
	            '<section class="col-md-2"><label>Light Color</label></section>' +
	            '<section class="col-md-6"><input type="hidden" class="form-control required" id="prod-frm-color" name="prod-frm-color" value="' + this.properties['COLOR'] + '"/><div id="picker"></div></section>' +
	            '<section class="col-md-2"></section>' +
	            '</section>';

	        }
	        
	        if (this.properties['RATINGS']){
	          	 uiTemplate += '<section class="row form-group light-specific">' +
		            '<section class="col-md-2"></section>' +
		            '<section class="col-md-2"><label>Energy Ratings</label></section>' +
		            '<section class="col-md-6"><input type="text" id="ratings" class="span2"><input type="text" class="form-control required" id="prod-frm-ratings" name="prod-frm-ratings" style="width: 50px;margin-top:-10px;float:right;" value= "' + this.properties['RATINGS'] + '" readonly/></section>' +
		            '<section class="col-md-2"></section>' +
		            '</section>';
	        }
	        
	        if (this.properties['BUTTON_COUNT']){
	        	uiTemplate += '<section class="row form-group switch-specific">' +
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
	       }

	        uiTemplate += '<section class="row box-footer" id="form-footer">' +
	        '<button id="' + this.id + '-edit-product-btn" type="submit" class="btn add-item-btn">Update <img src="resources/images/spinning-circles.svg" class="loading-img-btn" style="display:none;" id="' + this.id + '-edit-product-loading"/></button>' +
	        '<button class="btn add-item-btn" id="prod-edit-back-btn" style="margin-right:10px;"><i class="fa fa-mail-reply"></i> Back</button>' +
	        '</section>' +
	        '</form>';

	        return uiTemplate;

	    },
	    _initEvents : function(){

	        var _this = this;

	        if (this.properties['COLOR']){
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
	        	
	        	if(this.properties['COLOR_TEMPERATURE']){
		        	$('#prod-frm-color-tmp').val(this.properties['COLOR_TEMPERATURE']);	        		
	        	}
	        	
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
	        	
	        	$('#picker').colpick({
	                flat:true,
	                color: this._convertToRGBOnj(this.properties['COLOR']),
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
	        	
	        	
	        	
	        	
	        }
	        
	        
	        if (this.properties['RATINGS']){
	        	$("#ratings").slider({
	                min : 0,
	                max:10,
	                step:.5,
	                value : this.properties['RATINGS'],
	                orientation : 'horizontal',
	                tooltip : 'hide',
	                handle : 'square'
	            }).on('slide', function(ev){
	                $('#prod-frm-ratings').val(ev.value);
	            });;
	        	
	        }
	        
	        if (this.properties['BUTTON_COUNT']){
	        	 $('#prod-frm-buttons').val(this.properties['BUTTON_COUNT']);
	        }


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


	        $("#edit-product-form").validate({ignore: []});

	        $("#edit-product-form").submit(function (event) {

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
	        
	        $('#prod-frm-elev').val(this.data['elevation']);
	        
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
	        
	        $('#prod-frm-des').val(this.data['description']);	        
	        $('#prod-frm-sub-cat').val(this.data['subCategory']);
	        $('#prod-frm-type').val(this.data['categoryType']);
	        $('#prod-frm-sup').val(this.data['supplier']);
	        $('#prod-frm-symbol').val(this.data['electricSymbol']);
	        $('.symbol-item[data-src="' + this.data['electricSymbol'] + '"]').addClass('symbol-selected');
	        $('[data-toggle="tooltip"]').tooltip()



	    },
	    _submitData : function(data){

	        var _this = this;
	        $('#' + this.id + '-edit-product-loading').show();
	        $('#' + this.id + '-edit-product-btn').attr('disabled',true);

	        $.ajax({
	            type: 'POST',
	            url: 'restAPI/product/electrical/' + _this.data['id'] + '/update',
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
	    _setSuppliersOpt : function(){

	    	var optTmpl = '<option value="default">Select Supplier</option>';

	        for(var i = 0 ; i < this.supplierList.length; i++){

	            optTmpl+= '<option value="' + this.supplierList[i]['id']  + '">' + this.supplierList[i]['name']  + '</option>';

	        }

	        return optTmpl;

	    },
	    _updateView : function() {
	        $(document).trigger('update/editProductView',{"productId":this.data['id'],"value":$('#prod-frm-name').val(),"property":"name"});
	        $(document).trigger('update/editProductView',{"productId":this.data['id'],"value":$('#prod-frm-code').val(),"property":"code"});
	    },
	    _setSubCategoryOpts : function(selectedCat,catIndex){

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
	    _setLightSpecificFields : function(){

	    	var filedTmpl = '<section class="row form-group light-specific">' +
	            '<section class="col-md-2"></section>' +
	            '<section class="col-md-2"><label>LUMS</label></section>' +
	            '<section class="col-md-6"><input type="text" class="form-control required lums" id="prod-frm-lums" name="prod-frm-lums"/></section>' +
	            '<section class="col-md-2"></section>' +
	            '</section>' ;

	        $('#form-footer').before($(filedTmpl));
	        
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
	    _convertToRGBOnj : function(colorString){

	        var colorParts = colorString.split('-');

	        return {'r' : colorParts[0],'g' : colorParts[1],'b' : colorParts[2]};

	    },
	    _initLightSpecificEvents : function(){

	    	var rating = 0 ;	    	

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

	        $('#prod-frm-ratings').val(rating);
	        
	        $("#ratings").slider({
	            min : 0,
	            max:10,
	            step:.5,
	            value : rating,
	            orientation : 'horizontal',
	            tooltip : 'show',
	            handle : 'square'
	        }).on('slide', function(ev){
	            $('#prod-frm-ratings').val(ev.value);
	        });;

	    },
	    _calcElevationFromSubCat : function(calcFactor,cat) {   	
			
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