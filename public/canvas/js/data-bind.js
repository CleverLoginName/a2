  (function() {
    var catalog= '';
    var category = '';
    var subCategory= '';
    var products = '';
    var serch ='';
    var baseUrl ='';
    

        $.ajax({
            url: baseUrl+'/rest/api/products',
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                   $.each(data, function( index, value ) {
                    $('#'+index).text(value.catalog_name);
                    if($('#main-'+index).hasClass("hide-catelog")){
                       $('#main-'+index).removeClass("hide-catelog"); 
                    }
                    serch =   '<li>'
                                +'<div>'
                                    +'<div class="row">'
                                        +'<div class="col-md-1 col-lg-1 col-sm-1 col-xs-1 ">'
                                        +'<div class="fa fa-plus-square-o togel-button-background">'
                                        +'</div>'
                                        +'</div>'
                                        +'<div class="col-md-11 col-lg-11 col-sm-11 col-xs-11 inside-text" >'
                                            +' Search'
                                        +' </div>'
                                    +'</div>'
                                +'</div>'
                                +'<ul class="level-3" style="padding-left: 10px;-webkit-padding-start: 10px;-moz-padding-start: 10px" >'
                                    +' <div >'
                                        +'<div class="row">'
                                            +'<div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 ">'
                                                +'<input name="search_switch" type="text" class="search-input" id="search-inp-'+index+'" style="color: black">'
                                            +'</div>'
                                             +'<div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 ">'
                                                +'<button type="button" class="btn-min-search" style="float: left" id="search-btn-'+index+'">Go</button>'
                                            +'</div>'
                                        +'</div>'
                                        +'<div >'
                                            +'<li class="product-container" id="search-'+index+'">'
                                            + '</li>'
                                        +'</div>'
                                    +' </div>'
                                +'</ul>'
                            +'</li>';
                    $('#catlog-'+index).append(serch);
                    $(document).keypress(function(e) {
                        if(e.which == 13) {    
                        $('#search-'+index).html("");  
                        var isfound = false;         
                        var bla = $('#search-inp-'+index).val();
                        //alert($('#search-inp-'+index).val());
                        $.each(value.data, function(i1, v1) {
                           $.each(v1.data, function(i2, v2) {
                                $.each(v2.data, function(i3, v3) {
                                   if(v3.name.search(new RegExp(bla)) != -1){
                                    isfound = true;
                                    var productoo ='<div class="single-item S" attr="LIGHT_BULB" data-angle="0" data-evel="2.54" data-power="30" data-name="Down Light T1" data-tooltip="img/left-menu/ceilinglight.png" data-path1 ="'+baseUrl+v3.icon+'">'
                                                        +'<div>'
                                                        +'<div class="col-md-4 col-lg-4 col-sm-4 col-xs-4">'
                                                            +'<img src="'+baseUrl+v3.path+'" class="imege-props">'
                                                        +'</div>'
                                                        +'<div class="pro-detail-container col-md-4 col-lg-4 col-sm-4 col-xs-4">'
                                                                +'<span  class=" without-margin product-name">'+v3.name+'</span></br>'
                                                                +'<span  class="  without-margin product-normal">LUMS : '+v3.wattage+'</span></br>'
                                                                +'<span  class=" without-margin ">Rating: 4.0</span></br>'
                                                                +'<span  class=" without-margin ">Type : '+v3.productCode+'</span></br>'
                                                                +'<span  class=" without-margin ">Type : '+v3.productCode+'</span></br>'
                                                                +'<span  class=" without-margin "><span class="product-price">$'+v3.price+'</span><span class="product-gst">(in gst)</span></span></br>'
                                                            +'</div>'
                                                        +'</div>'
                                                    +'<div>'  
                                    $('#search-'+index).append(productoo);
                                   } 
                                });
                            });
                           return;
                        });
                            if(!isfound){
                              var item = '<div class="strokeme">No products found</div>';
                            $('#search-'+index).append(item); 
                           }
                    
                        }
                    });
                    $('#search-btn-'+index).click(function() {
                        $('#search-'+index).html("");  
                        var isfound = false;         
                        var bla = $('#search-inp-'+index).val();
                        //alert($('#search-inp-'+index).val());
                        $.each(value.data, function(i1, v1) {
                           $.each(v1.data, function(i2, v2) {
                                $.each(v2.data, function(i3, v3) {
                                   if(v3.name.search(new RegExp(bla)) != -1){
                                    isfound = true;
                                    var productoo ='<div class="single-item S" attr="LIGHT_BULB" data-angle="0" data-evel="2.54" data-power="30" data-name="Down Light T1" data-image_path="'+v3.path+'">'
                                                        +'<div>'
                                                        +'<div class="col-md-4 col-lg-4 col-sm-4 col-xs-4">'
                                                            +'<img src="'+baseUrl+v3.path+'" class="imege-props ">'
                                                        +'</div>'
                                                        +'<div class="pro-detail-container col-md-4 col-lg-4 col-sm-4 col-xs-4">'
                                                                +'<span  class=" without-margin product-name">'+v3.name+'</span></br>'
                                                                +'<span  class="  without-margin product-normal">LUMS : '+v3.wattage+'</span></br>'
                                                                +'<span  class=" without-margin product-normal">Rating: 4.0</span></br>'
                                                                +'<span  class=" without-margin product-normal">Type : '+v3.productCode+'</span></br>'
                                                                +'<span  class=" without-margin product-normal">Type : '+v3.productCode+'</span></br>'
                                                                +'<span  class=" without-margin "><span class="product-price">$'+v3.price+'</span><span class="product-gst">(in gst)</span></span></br>'
                                                            +'</div>'

                                        +'</div>'
                                                    +'<div>'  
                                    $('#search-'+index).append(productoo);
                                   } 
                                });
                            });
                           return;
                        });
                            if(!isfound){
                              var item = '<div class="strokeme">No products found</div>';
                            $('#search-'+index).append(item); 
                           }
                    });

                    $.each(value.data,function(index1,catValue){
                        category =   '<li>'
                                        +'<div>'
                                            +' <div class="row">'
                                                +'<div class="col-md-1 col-lg-1 col-sm-1 col-xs-1 ">'
                                                +'<div class=" togel-button-background fa fa-plus-square-o">'
                                                +'</div>'
                                                +'</div>'
                                                +'<div class="col-md-11 col-lg-11 col-sm-11 col-xs-11 inside-text" >'
                                                    + catValue.category_name
                                                +'</div>'
                                            +'</div>'
                                        +'</div>'
                                        + '<ul class="level-3"style="padding-left: 10px;-webkit-padding-start: 10px;-moz-padding-start: 10px" id ="catagory-'+index1+'">'
                                        +'</ul>'
                                    +'</li>';
                        $('#catlog-'+index).append(category);
                        $.each(catValue.data,function(index2,subValue){
                            var subCatName = subValue.sub_category_name.replace(/\s+/g, '');
                            subCategory =   '<li>'
                                        +'<div>'
                                            +' <div class="row">'
                                                +'<div class="col-md-1 col-lg-1 col-sm-1 col-xs-1 ">'
                                                 +'<div class="fa fa-plus-square-o togel-button-background">'
                                                +'</div>'
                                                +'</div>'
                                                +'<div class="col-md-11 col-lg-11 col-sm-11 col-xs-11 inside-text" >'
                                                    + subValue.sub_category_name
                                                +'</div>'
                                            +'</div>'
                                        +'</div>'
                                        + '<ul class="level-4" style="padding-left: 0px;-webkit-padding-start: 0px;-moz-padding-start: 0px" >'
                                            +'<li class="product-container"  id ="subCategory-'+index2+subCatName+'" >'
                                            +'</li>'
                                        +'</ul>'
                                    +'</li>';
                            $('#catagory-'+index1).append(subCategory);
                            $.each(subValue.data,function(index3,products){
                                products =  '<div class="single-item S" attr="LIGHT_BULB" data-angle="0" data-evel="2.54" data-power="30" data-prod_id='+products.id+'  data-prod_type='+products.type+' data-name="'+products.name+'" data-sale_price="'+products.sale_price+'" data-image_path="'+products.path+'" data-path1 ="'+baseUrl+products.icon+'" data-is_pack="'+subValue.is_pack+'" data-cat="'+subValue.sub_category_id+'" data-category-type="'+catValue.category_name+'">'
                                                +'<div class="clearfix">'
                                                    +'<div class="col-md-4 col-lg-4 col-sm-4 col-xs-4 wr_img">'
                                                        +'<img src="'+products.path+'" class="imege-props product-item">'
                                                    +'</div>'
                                                     +'<div class="pro-detail-container col-md-4 col-lg-4 col-sm-4 col-xs-4 wr_desc">'
                                                        +'<span  class=" without-margin product-name">'+products.name+'</span></br>'
                                                        +'<span  class="  without-margin product-normal">LUMS : '+products.wattage+'</span></br>'
                                                        +'<span  class=" without-margin product-normal">Rating: 4.0</span></br>'
                                                        +'<span  class=" without-margin product-normal">Type : '+products.productCode+'</span></br>'
                                                        +'<span  class=" without-margin product-normal">Type : '+products.productCode+'</span></br>'
                                                        +'<span  class=" without-margin "><span class="product-price">$'+products.price+'</span><span class="product-gst">(in gst)</span></span>'
                                                    +'</div>'
                                    //+'<span  class=" without-margin "><span class="product-price">$'+v3.price+'</span><span class="product-gst">(in gst)</span></span></br>'

                                    // +'<span  class=" without-margin product-name">'+v3.name+'</span></br>'
                                    // +'<span  class="  without-margin product-normal">LUMS : '+v3.wattage+'</span></br>'
                                    // +'<span  class=" without-margin ">Rating: 4.0</span></br>'
                                    // +'<span  class=" without-margin ">Type : '+v3.productCode+'</span></br>'
                                    // +'<span  class=" without-margin ">Type : '+v3.productCode+'</span></br>'

                                    +'</div>'
                                            +'<div>';

                            $('#subCategory-'+index2+subCatName).append(products);
                            });
                        });
                    });
                });
                   $("#main-pannel-body").append(catalog);
                   $('.level-2 > li > div').click(function() {
                        $(this).toggleClass('expanded');
                        $(this).parent().find('ul').toggle();
                        if($(this).hasClass('expanded')){
                            if($(this).find('div > div > div').hasClass('fa fa-plus-square-o')){
                                $(this).find('div > div > div').removeClass('fa fa-plus-square-o');
                                $(this).find('div > div > div').addClass('fa fa-minus-square-o');
                            }
                            
                        } else{
                            $(this).find('div > div > div').removeClass('fa fa-minus-square-o');
                             $(this).find('div > div > div').addClass('fa fa-plus-square-o');
                             
                        }
                    });

                    $('.level-3 > li > div').click(function() {
                        $(this).toggleClass('expanded');
                        $(this).parent().find('ul').toggle();
                        if($(this).hasClass('expanded')){
                            $(this).find('div > div >div').removeClass('fa fa-plus-square-o');
                            $(this).find('div > div > div').addClass('fa fa-minus-square-o');
                        } else{
                            $(this).find('div > div > div').removeClass('fa fa-minus-square-o');
                             $(this).find('div > div > div').addClass('fa fa-plus-square-o'); 
                        }
                    });

                    $('.level-4 > li > div').click(function() {
                        $(this).toggleClass('expanded');
                        $(this).parent().find('ul').toggle();
                    });

                    var angle, elev, power, type, b_tooltip, s_angle, s_elev, s_power, s_bname, s_type, s_tooltip;

                $(".product-container").on("click", ".single-item", function (e) {

                    var getItemType = $(this).attr("attr");

                    if (this.getAttribute("attr") == 'LIGHT_BULB') {
                        toolAction = ToolActionEnum.DRAW;
                        drawObjectType = ObjectType.LIGHT_BULB;

                        angle = this.getAttribute("data-angle");
                        elev = this.getAttribute("data-evel");
                        power = this.getAttribute("data-power");

                        bname = this.getAttribute("data-name");
                        type = this.getAttribute("attr");
                        b_tooltip = this.getAttribute("data-tooltip");
                        bulbPrice = this.getAttribute("data-price");
                        set_itemCode = this.getAttribute("data-item-code");
                        lightImagePath = this.getAttribute("data-path");
                        iconPath  = this.getAttribute("data-path1");

                    }

                });

//var single_item = document.getElementsByClassName('single-item');


/////////////////////////
                var canvas = document.getElementById("top-canvas");
                var ctx = canvas.getContext("2d");



                var  width, height;

              // select all .tool's

                var $sub_contener = $(".product-container");
                var $tools = $(".product-container > .single-item");

                // make all .tool's draggable
                $tools.draggable({
                    helper: function () {
                        is_pack = parseInt(this.getAttribute("data-is_pack"));
                        pack_id = parseInt(this.getAttribute("data-cat"));//sub catagory id
                        image_path = this.getAttribute("data-image_path");
                        prod_id = this.getAttribute("data-prod_id");
                        prod_type = this.getAttribute("data-prod_type");
                        sale_price = this.getAttribute("data-sale_price");
                        category_type = this.getAttribute("data-category-type");
                        $copy = $(this).clone();
                        if(is_pack ==1){ //TODO: check why if statement needed ??? 
                            prod_name = this.getAttribute("data-name");
                            iconPath = this.getAttribute("data-path1");
                        }else {
                            prod_name = this.getAttribute("data-name");
                            iconPath = this.getAttribute("data-path1");
                        }
                        return $copy;

                    },
                    appendTo: 'body'
                });


// assign each .tool its index in $tools
                $tools.each(function (index, element) {
                    $(this).data("toolsIndex", index);
                });



// make the canvas a dropzone
                $("#top-canvas").droppable({
                    drop: dragDrop,
                });

                // handle a drop into the canvas
                function dragDrop(e, ui) {

                    var $canvas = $("#top-canvas");
                    var Offset = $canvas.offset();
                    var offsetX = Offset.left;
                    var offsetY = Offset.top;

                   var x = e.clientX - offsetX;// parseInt(ui.offset.left - offsetX);
                   var y = e.clientY - offsetY;//parseInt(ui.offset.top - offsetY)+30;


                    var draggableName = ui.draggable.attr("data-name");
                    var draggableProductID = ui.draggable.attr("data-product-id");
                    // get the drop payload (here the payload is the $tools index)

                    if(is_pack == 1){
                        $.each(data, function( index, value ) {
                                $.each(value.data, function(i1, v1) {
                                    $.each(v1.data, function(i2, v2) {
                                        if(pack_id ==  parseInt(v2.sub_category_id)){
                                            addPack(x,y, v2);
                                            // $.each(v2.data, function(i3, prod) {
                                            //     drowbulb(x, y, prod.id, prod.name, prod.sale_price, selectedProduct, 
                                            //     lightBulbArr, prod.path, "http://45.79.179.53"+prod.icon, i3*40);
                                            // });
                                        }
                                });
                            });
                        });
                    } else {
                        addProduct(x, y, prod_type, prod_id, prod_name, sale_price, image_path, iconPath);
                        //drowbulb(x,y,prod_id,prod_name,sale_price,selectedProduct,lightBulbArr,image_path,bulb_icon,0);
                    }
                    // drawAllObjects();
                    $('#tool-items-ul li').removeClass('active');

                }

                function addPack(x,y,params){
                    var pack = new PackItem();
                    pack.setID(params.sub_category_id);
                    pack.setName(params.sub_category_name);
                    pack.setPrice(params.builder_price); //TODO which price (builder_price | supplier_price | contractor_price)
                    
                    $.each(params.data, function(i, product) {
                        var currentProduct = addProduct(x + i*40, y, product.type, product.id, product.name, product.sale_price, product.path, baseUrl+product.icon);
                        currentProduct.isInsidePack = true;
                        pack.pushProduct(currentProduct);
                    });
                    pushElementToDrawElement(pack);
                }

                function addProduct(x, y, type, id, name, price, imgPath, symbolPath){
                    var currentObj;
                    var product_type;
                    if (type !== undefined) {
                        product_type = type.toLowerCase();
                    }

                    switch (product_type) {
                        case "switches":
                            currentObj = new LightSwitch();
                            break;
                    
                        case "lights":
                            currentObj = new LightBulb();
                            var lightBulbIndex = lightBulbArr.length + 1;
                            currentObj.setLabel(lightBulbIndex);
                            lightBulbArr.push(currentObj);
                            break;
                    
                        default:
                            currentObj = new ProductItem();
                            break;
                    }
                    currentObj.setCoordinates(x, y);
                    currentObj.setID(id);
                    currentObj.setName(name);
                    currentObj.setPrice(price);
                    currentObj.setImgPath(imgPath);
                    currentObj.setSymbolPath(symbolPath);

                    pushElementToDrawElement(currentObj); //TODO check for pack 
                    return currentObj;
                }

                // function drowbulb(x,y,prod_id,prod_name,sale_price,selectedProduct,lightBulbArr,imgPath,iconPath,xOffSet) {
                //     var currentObj = new LightBulb();
                //     currentObj.setCoordinates(x+xOffSet, y);
                //     // currentObj.setProductInfo(selectedProduct);
                //     var lightBulbIndex = lightBulbArr.length + 1;
                //     currentObj.id = prod_id;
                //     currentObj.setLabel(lightBulbIndex);
                //     currentObj.setName(prod_name);
                //     currentObj.setPrice(sale_price);
                //     currentObj.setSymbolPath(iconPath);
                //     currentObj.setImgPath(imgPath);
                //     currentObj.setCatType(category_type);
                //     pushElementToDrawElement(currentObj);
                //     lightBulbArr.push(currentObj);
                //     populateLightBulbMenu();
                // }

            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });




  })();





