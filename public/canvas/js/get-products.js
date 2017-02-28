
function escapeHtml(unsafe) {
    return unsafe
        .replace(/\\n/g, "\\n")
        .replace(/\//g, "-")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");

}
var Data;
(function () {
    var catalog = '';
    var category = '';
    var subCategory = '';
    var products = '';
    var serch = '';

    var baseUrl = '';
    //var baseUrl ='http://97.107.130.164';


    $.ajax({
        url: baseUrl + '/rest/api/products',
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            $('#bom-area').removeClass("bom-hide");
            $.each(data, function (index, catelog_value) {
                Data = data;
                $('#' + index).text(catelog_value.catalog_name);
                if ($('#main-' + index).hasClass("hide-catelog")) {
                    $('#main-' + index).removeClass("hide-catelog");
                }
                serch = '<li>'
                    + '<div>'
                    + '<div class="row">'
                    + '<div class="col-md-1 col-lg-1 col-sm-1 col-xs-1 ">'
                    + '<div class="fa fa-plus-square-o togel-button-background">'
                    + '</div>'
                    + '</div>'
                    + '<div class="col-md-11 col-lg-11 col-sm-11 col-xs-11 inside-text" >'
                    + ' Search'
                    + ' </div>'
                    + '</div>'
                    + '</div>'
                    + '<ul class="level-3 list" style="padding-left: 10px;-webkit-padding-start: 10px;-moz-padding-start: 10px" >'
                    + ' <div >'
                    + '<div class="row">'
                    + '<div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 ">'
                    + '<input name="search_switch" type="text" class="search-input" id="search-inp-' + index + '" style="color: black">'
                    + '</div>'
                    + '<div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 ">'
                    + '<button type="button" class="btn-min-search" style="float: left" id="search-btn-' + index + '">Go</button>'
                    + '</div>'
                    + '</div>'
                    + '<div >'
                    + '<li class="product-container" id="search-' + index + '">'
                    + '</li>'
                    + '</div>'
                    + ' </div>'
                    + '</ul>'
                    + '</li>';
                $('#catlog-' + index).append(serch);
                $(document).keypress(function (e) {
                    if (e.which == 13) {
                        $('#search-' + index).html("");
                        var isfound = false;
                        var search_item = $('#search-inp-' + index).val();
                        //alert($('#search-inp-'+index).val());
                        $.each(catelog_value.data, function (category_index, catagory_value) {
                            $.each(catagory_value.data, function (sub_category_index, sub_category_value) {
                                $.each(sub_category_value.data, function (product_index, product_value) {
                                    if (product_value.name.search(new RegExp(search_item)) != -1) {
                                        isfound = true;
                                        product = addProductSection(sub_category_value,product_value,catagory_value);
                                        $('#search-' + index).append(product);
                                    }
                                });
                            });
                            return;
                        });
                        addDragable(this);
                        if (!isfound) {
                            var item = '<div class="strokeme">No products found</div>';
                            $('#search-' + index).append(item);
                        }

                    }
                });
                $('#search-btn-' + index).click(function () {
                    $('#search-' + index).html("");
                    var isfound = false;
                    var search_item = $('#search-inp-' + index).val();
                        //alert($('#search-inp-'+index).val());
                        $.each(catelog_value.data, function (category_index, catagory_value) {
                            $.each(catagory_value.data, function (sub_category_index, sub_category_value) {
                                $.each(sub_category_value.data, function (product_index, product_value) {
                                    if (product_value.name.search(new RegExp(search_item)) != -1) {
                                        isfound = true;
                                        product = addProductSection(sub_category_value,product_value,catagory_value);
                                    $('#search-' + index).append(product);
                                }
                            });
                        });
                        return;
                    });
                    addDragable(this);
                    if (!isfound) {
                        var item = '<div class="strokeme">No products found</div>';
                        $('#search-' + index).append(item);
                    }
                });

                $.each(catelog_value.data, function (index1, catValue) {
                    category = '<li>'
                        + '<div>'
                        + ' <div class="row">'
                        + '<div class="col-md-1 col-lg-1 col-sm-1 col-xs-1 ">'
                        + '<div class=" togel-button-background fa fa-plus-square-o">'
                        + '</div>'
                        + '</div>'
                        + '<div class="col-md-11 col-lg-11 col-sm-11 col-xs-11 inside-text" >'
                        + catValue.category_name
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '<ul class="level-3 list"style="padding-left: 10px;-webkit-padding-start: 10px;-moz-padding-start: 10px" id ="catagory-' + catValue.category_id + '">'
                        + '</ul>'
                        + '</li>';
                    $('#catlog-' + index).append(category);
                    $.each(catValue.data, function (index2, subValue) {
                        var subCatName = escapeHtml(subValue.sub_category_name.replace(/\s+/g, ''));
                        subCategory = '<li>'
                            + '<div data-sub_category_id ="' + subValue.sub_category_id + '" data-sub_position_id ="subCategory-' + index2 + subCatName + '">'
                            + ' <div class="row">'
                            + '<div class="col-md-1 col-lg-1 col-sm-1 col-xs-1 ">'
                            + '<div class="fa fa-plus-square-o togel-button-background">'
                            + '</div>'
                            + '</div>'
                            + '<div class="col-md-11 col-lg-11 col-sm-11 col-xs-11 inside-text" >'
                            + subValue.sub_category_name
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '<ul class="level-4 list" style="padding-left: 0px;-webkit-padding-start: 0px;-moz-padding-start: 0px" >'
                            + '<li class="product-container"  id ="subCategory-' + index2 + subCatName + '" >'
                            + '</li>'
                            + '</ul>'
                            + '</li>';
                        $('#catagory-' + catValue.category_id).append(subCategory);
                    });
                });
            });
            //$("#main-pannel-body").append(catalog);
            $('.level-2 > li > div').click(function () {
                $(this).toggleClass('expanded');
                $(this).parent().find('ul').toggle();
                if ($(this).hasClass('expanded')) {
                    if ($(this).find('div > div > div').hasClass('fa fa-plus-square-o')) {
                        $(this).find('div > div > div').removeClass('fa fa-plus-square-o');
                        $(this).find('div > div > div').addClass('fa fa-minus-square-o');
                    }

                } else {
                    $(this).find('div > div > div').removeClass('fa fa-minus-square-o');
                    $(this).find('div > div > div').addClass('fa fa-plus-square-o');

                }
            });

            $('.level-3 > li > div').click(function () {
                $(this).toggleClass('expanded');
                $(this).parent().find('ul').toggle();
                if ($(this).hasClass('expanded')) {
                    var sub_category_id = this.getAttribute("data-sub_category_id");
                    var selected_positon = this.getAttribute("data-sub_position_id");
                    loop1:
                    $.each(data, function (index, catalog) {
                        $.each(catalog.data, function (catalog_index, category) {
                            $.each(category.data, function (category_index, sub_category) {
                                if (sub_category.sub_category_id == sub_category_id && !$('#' + selected_positon).hasClass("expanded")) {
                                    $.each(sub_category.data, function (product_index, product) {
                                        products = addProductSection(sub_category,product,category);
                                        $('#' + selected_positon).append(products);
                                    });
                                    $('#' + selected_positon).addClass("expanded");
                                    return false;

                                }
                            });
                        });
                    });
                    addDragable(this);
                    $(this).find('div > div >div').removeClass('fa fa-plus-square-o');
                    $(this).find('div > div > div').addClass('fa fa-minus-square-o');
                } else {
                    $(this).find('div > div > div').removeClass('fa fa-minus-square-o');
                    $(this).find('div > div > div').addClass('fa fa-plus-square-o');
                }
            });

            $('.level-4 > li > div').click(function () {
                $(this).toggleClass('expanded');
                $(this).parent().find('ul').toggle();
            });

            var angle, elev, power, type, b_tooltip, s_angle, s_elev, s_power, s_bname, s_type, s_tooltip;
            $(".product-container").on("click", ".single-item", function (e) {
                document.getElementById('left_popup_productName').innerHTML = this.getAttribute("data-name");
                document.getElementById('left_popup_productDescription').innerHTML = this.getAttribute("data-pdescription");
                var supplier = this.getAttribute("data-productsupplier");
                if (supplier == null) {
                    supplier = 'NA';
                }
                document.getElementById('left_popup_suppName').innerHTML = supplier;
                document.getElementById('left_popup_productType').innerHTML = this.getAttribute("data-category-type");
                document.getElementById('left_popup_productWatt').innerHTML = this.getAttribute("data-productwatts");
                document.getElementById('left_popup_productStyle').innerHTML = this.getAttribute("data-productStyle");
                document.getElementById('left_popup_builderproductPrice').innerHTML ="$"+this.getAttribute("data-builder_price");
                document.getElementById('left_popup_wasprice').innerHTML = "N/A"
                document.getElementById('left_popup_saveprice').innerHTML = "N/A"
                var imgPath = this.getAttribute("data-image_path");
                document.getElementById("left_popup_imgProduct").src = imgPath;
                var modal = document.getElementById("myModal");
                $('#myModal').modal({
                    show: true
                });
                var span = document.getElementsByClassName("close")[0];
                span.onclick = function () {
                    modal.style.display = "none";
                };

                window.onclick = function (event) {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                };


            });

            // make the canvas a dropzone
           


          
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        }
    });

    function addProductSection(sub_category_value,product_value,catagory_value ) {
        product_section = '<div class="single-item S" attr="LIGHT_BULB" data-angle="0" data-evel="2.54" data-power="30" data-prod_id=' + product_value.id + '  data-prod_type=' + product_value.type + ' data-name="' + product_value.name + '" data-builder_price="' + product_value.builder_price + '" data-image_path="'+baseUrl + product_value.path + '" data-path1 ="' + baseUrl + product_value.icon + '" data-is_pack="' + sub_category_value.is_pack + '" data-cat="' + sub_category_value.sub_category_id + '" data-category-type="' + catagory_value.category_name + '" data-Watts="' + (product_value.Watts || '0') + '" data-product-price="' + product_value.builder_price + '">'
            + '<div class="clearfix">'
            + '<div class="col-md-4 col-lg-4 col-sm-4 col-xs-4 wr_img">'
            + '<img src="' + baseUrl + product_value.path + '" class="imege-props product-item">'
             + '<img src="' + baseUrl + product_value.icon + '" style="display:none">'
            + '</div>'
            + '<div class="pro-detail-container col-md-4 col-lg-4 col-sm-4 col-xs-4 wr_desc">'
            + '<span  class=" without-margin product-name">' + product_value.name + '</span></br>'
            + '<span  class="  without-margin product-normal">' + product_value.supplier + '</span></br>'
            + '<span  class=" without-margin product-normal">Colour : ' + (product_value.Colour || 'N/A') + '</span></br>'
            + '<span  class=" without-margin product-normal">Type : ' + product_value.type + '</span></br>'
            // +'<span  class=" without-margin product-normal">Rating: N/A</span></br>'
            + '<span  class=" without-margin product-normal">wattage : ' + (product_value.Watts || 'N/A') + '</span></br>'
            + '<span  class=" without-margin "><span class="product-price">$ ' + product_value.builder_price + '</span><span class="product-gst"> (ino gst)</span></span>'
            + '</div>'
            + '</div>'
            + '<div>';
        return product_section;
    }



            function addPack(x, y, params) {
                var pack = new PackItem();

                pack.setUniqueItemID(generateUID());
                pack.setPrice(params.builder_price);
                pack.setPackID(params.sub_category_id);
                pack.setName(params.sub_category_name);
                addPackView(params,pack.getUniqueItemID());
                pushElementToDrawElement(pack);
            }


              function addProduct(x, y, type, id, name, price, imgPath, symbolPath, product_watt) {
                var currentObj;
                var product_type;
                if (type !== undefined) {
                    product_type = type.toLowerCase();
                }

                switch (product_type) {
                    case "switches":
                        currentObj = new LightSwitch();
                        currentObj.setWatts(product_watt);
                        break;

                    case "lights":
                        currentObj = new LightBulb();
                        var lightBulbIndex = lightBulbArr.length + 1;
                        currentObj.setLabel(lightBulbIndex);
                        lightBulbArr.push(currentObj);
                        currentObj.setWatts(product_watt);
                        break;

                    default:
                        currentObj = new ProductItem();
                        currentObj.setWatts(product_watt);
                        break;
                }
                currentObj.setUniqueItemID(generateUID());
                currentObj.setCoordinates(x, y);
                currentObj.setProductID(id);
                currentObj.setName(name);
                currentObj.setPrice(price);
                currentObj.setImgPath(imgPath);
                currentObj.setSymbolPath(symbolPath);
                currentObj.setPlanID(planID);
                pushElementToDrawElement(currentObj); //TODO check for pack 
                return currentObj;
            }


     $("#top-canvas").droppable({
                drop: dragDrop,
            });

            // handle a drop into the canvas
            function dragDrop(e, ui) {

                var Offset = $("#top-canvas").offset();
                var offsetX = Offset.left;
                var offsetY = Offset.top;

                var dropPnt = canvasHelper.convertViewportXyToCanvasXy({x:e.clientX - offsetX, y:e.clientY - offsetY});
                var x = dropPnt.x;
                var y = dropPnt.y;


                var dragItem = ui.draggable[0];
                if ($(dragItem).hasClass('single-item')) {
                    var draggableName = $(dragItem).attr("data-name");
                    var draggableProductID = $(dragItem).attr("data-product-id");
                    if (is_pack == 1) {
                        $.each(Data, function (index, catelog_value) {
                            $.each(catelog_value.data, function (i1, v1) {
                                $.each(v1.data, function (i2, v2) {
                                    if (pack_id == parseInt(v2.sub_category_id)) {
                                        //addPackView(v2);
                                         addPack(x, y, v2);
                                    }
                                });
                            });
                        });
                    } else {
                        addProduct(x, y, prod_type, prod_id, prod_name, builder_price, image_path, iconPath, product_watt);
                    }
                    drawAllObjects();
                    //$('#tool-items-ul li').removeClass('active');
                }

            }


    function addDragable(element) {
        var $tools = $(".single-item");

        $tools.draggable({
            helper: function () {
                is_pack = parseInt(this.getAttribute("data-is_pack"));
                pack_id = parseInt(this.getAttribute("data-cat"));//sub catagory id
                product_watt = parseInt(this.getAttribute("data-Watts"));                       // image_path = '/'+this.getAttribute("data-image_path");
                image_path = this.getAttribute("data-image_path");
                prod_id = this.getAttribute("data-prod_id");
                prod_type = this.getAttribute("data-prod_type");
                builder_price = this.getAttribute("data-builder_price");
                category_type = this.getAttribute("data-category-type");
                $copy = $(this).clone();
                if (is_pack == 1) { //TODO: check why if statement needed ??? 
                    prod_name = this.getAttribute("data-name");
                    iconPath = this.getAttribute("data-path1");
                } else {
                    prod_name = this.getAttribute("data-name");
                    iconPath = this.getAttribute("data-path1");
                }
                $("#top-canvas").droppable({
                drop: dragDrop,
            });
                return '<img src="' + iconPath + '" />';
            },
            cursor: 'move',
            appendTo: 'body'
        });
    }


})();





