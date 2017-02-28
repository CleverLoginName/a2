
var count = 1;

//var baseUrl ='http://test.adapto.com.au';
var baseUrl ='http://dev.adapto.com.au';
var planId = 0;
function addPackView(params,id_pack) {
    var canvas_offset = $(canvasOrig).offset();
    //$('#pack-view-container').offset({ top:300+canvas_offset.top, left: 600+ canvas_offset.left}).fadeIn(); 
    //$('#pack-view-container').offset({ top:-800, left: 1020}).fadeIn(); 
    $('#pack-view-container').show();
    $('#pack-expand-topic').show();
    $('#pack-view-container').addClass('animated bounceIn');
     count = count+1;
     addPackArray(params,id_pack);
     drawPacksInPopup();
    addDragable();
            $("#top-canvas").droppable({
                drop: dragDrop,
            });

             function dragDrop(e, ui) {

                var Offset = $("#top-canvas").offset();
                var offsetX = Offset.left;
                var offsetY = Offset.top;
                var dropPnt = canvasHelper.convertViewportXyToCanvasXy({x:e.clientX - offsetX, y:e.clientY - offsetY});
                var x = dropPnt.x;
                var y = dropPnt.y;
                var dragItem = ui.draggable[0];
                if ($(dragItem).hasClass('single-pack-view-item')) {
                    $(dragItem).attr( "data-planId", planId );
                    var drawing_obj = searchProduct(uniq_id);
                    drawing_obj.setCoordinates(x, y);
                    drawing_obj.setPlanID(planId);
                    pushElementToDrawElement(drawing_obj);
                     drawPacksInPopup();
                    //addProduct(x, y,prod_type,prod_id,product_name,builder_price,image_path,icon_path,product_watt,id_pack);
                    drawAllObjects();
                }

            }           
    if (!$('#pack-zip-topic').hasClass("minimized-pack")) {
        $('#pack-zip-topic').removeClass("bounceInUp").addClass('animated bounceOutDown');
        $('#pack-expand-topic').addClass('animated bounceInRight').removeClass("bounceOutRight");
        $('#pack-table-container').addClass('animated bounceInRight').removeClass("bounceOutRight");
        //   $('#pack-expand-topic').removeClass('minimized-pack');
        $('#pack-zip-topic').addClass('minimized-pack');
        $('#pack-view-container').height(300);
           $('#pack-view-container').width(260);
    }

    //    $('.pack-single-item-td').click(function(e) {
    //     $('#productIconModal').modal({
    //         show: true
    //     });
    // });

}

     $('#pack-expand-topic').click(function(e) {
          $('#pack-table-container').addClass('animated bounceOutRight').removeClass("bounceInRight");
          $('#pack-expand-topic').addClass('animated bounceOutRight');
          $('#pack-zip-topic').removeClass('minimized-pack');
          $('#pack-zip-topic').addClass('animated bounceInUp').removeClass("bounceOutDown");
          $('#pack-view-container').height(300);
          $('#pack-view-container').width(30);
         
        //  if( $("#pack-minimize-icon").hasClass("maximized")){
        //     //$('#pack-tablle').hide();watch 
        //     $('#pack-tablle').addClass('animated bounceOutRight').removeClass("bounceInRight");
        //     $("#pack-minimize-icon").attr("src","img/arrow_carrot-left_alt.png");
        //     $('.minimized-pack').show();
        //     $('.maximized-pack').hide();
        //     $("#pack-minimize-icon").removeClass("maximized").addClass("minimized");
        //  } else{
        //     $("#pack-minimize-icon").removeClass("minimized").addClass("maximized");
        //     $('#pack-tablle').addClass('animated bounceInRight').removeClass("bounceOutRight");
        //     $('#pack-tablle').show();
        //     $("#pack-minimize-icon").attr("src","img/arrow_carrot-right_alt.png");
        //     $('.minimized-pack').hide();
        //     $('.maximized-pack').show();
         //}
        
    }); 


     $('#pack-zip-topic').click(function(e) {
          $('#pack-zip-topic').removeClass("bounceInUp").addClass('animated bounceOutDown');
          $('#pack-expand-topic').addClass('animated bounceInRight').removeClass("bounceOutRight");
          $('#pack-table-container').addClass('animated bounceInRight').removeClass("bounceOutRight");
        //   $('#pack-expand-topic').removeClass('minimized-pack');
           $('#pack-zip-topic').addClass('minimized-pack');    
           $('#pack-view-container').height(300);
           $('#pack-view-container').width(260);
    });

  $('.pack-single-item-td').click(function(e) {
        $('#productIconModal').modal({
            show: true
        });
    });


// function hidePackItem(){
//     if($('#pack-tablle > tr > td').attr("data-planId") != 0 ){
//         this.hide();
//     }
    
// }


 function addDragable() {
        var $tools = $(".single-pack-view-item");

        $tools.draggable({
            helper: function () {
                // prod_id = this.getAttribute("data-item-id");
                // prod_type = this.getAttribute("data-item-type");
                // product_name = this.getAttribute("data-item-name");
                // builder_price = this.getAttribute("data-item-builder-price");
                // image_path = this.getAttribute("data-item-path");
                // icon_path = this.getAttribute('data-item-icon');
                // product_watt = parseInt(this.getAttribute("data-Watts")); 
                // $copy = $(this).clone();
                //console.log(icon_path);
                icon_path = this.getAttribute('data-item-simbleparth');
                uniq_id = this.getAttribute('data-item-uniqid');
                return '<img src="' + icon_path + '" />';
            }, drag: function () {

            },
            cursor: 'move',
            appendTo: 'body'
        });
    }

    function addPackArray(params,id_pack){
         $.each(params.data, function(i, product) {
             var singleItem = CreatProduct(product.type,product.id,product.name,product.builder_price,baseUrl+product.path,baseUrl+product.icon,product.Watts,id_pack)
             unassigned_packItemList.push(singleItem);
         });
    }

    function drawPacksInPopup(){
        $('#pack-tablle > tr').remove();
        for (var i = 0; i < unassigned_packItemList.length; i++) {            
            if($("#" + unassigned_packItemList[i].getParentPackID()).length == 0) {
                pack =  '<tr id ="'+unassigned_packItemList[i].getParentPackID()+'" class="row  single-pack-view" >'   
                     +'</tr>';          
                $('#pack-tablle').append(pack);
            }
        }
        for (var i = 0; i < unassigned_packItemList.length; i++) {
            item =  '<td style="width: 25px;background-color:#ffffff" class="pack-single-item-td">'
                    +'<img class="single-pack-view-item"  data-item-id="'+unassigned_packItemList[i].getUniqueItemID()+'"  data-item-uniqid="'+unassigned_packItemList[i].getUniqueItemID()+'" data-item-simbleparth="'+unassigned_packItemList[i].getSymbolPath()+'" src="'+unassigned_packItemList[i].getSymbolPath()+'">'
                +'</td>';
            $('#'+unassigned_packItemList[i].getParentPackID()).append(item);
        }
        addDragable();
        
    }

    function searchProduct(id){
        var item = 0;
        for (var i = 0; i < unassigned_packItemList.length; i++) {
            if(id == unassigned_packItemList[i].getUniqueItemID() ){
                item = unassigned_packItemList[i];
                unassigned_packItemList.splice(i, 1);
            }
        }
        return item;
    }



 

    //  function addProduct(x, y, type, id, name, price, imgPath, symbolPath, product_watt,id_pack) {
    //             var currentObj;
    //             var product_type;
    //             if (type !== undefined) {
    //                 product_type = type.toLowerCase();
    //             }

    //             switch (product_type) {
    //                 case "switches":
    //                     currentObj = new LightSwitch();
    //                     currentObj.setWatts(product_watt);
    //                     break;

    //                 case "lights":
    //                     currentObj = new LightBulb();
    //                     var lightBulbIndex = lightBulbArr.length + 1;
    //                     currentObj.setLabel(lightBulbIndex);
    //                     lightBulbArr.push(currentObj);
    //                     currentObj.setWatts(product_watt);
    //                     break;

    //                 default:
    //                     currentObj = new ProductItem();
    //                     currentObj.setWatts(product_watt);
    //                     break;
    //             }
    //             currentObj.setUniqueItemID(generateUID());
    //             currentObj.setCoordinates(x, y);
    //             currentObj.setProductID(id);
    //             currentObj.setName(name);
    //             currentObj.setPrice(price);
    //             currentObj.setImgPath(imgPath);
    //             currentObj.setSymbolPath(symbolPath);
    //             // currentObj.setPlanID(template_floor_catalog_design_id);
    //             currentObj.isInsidePack = true;
    //             currentObj.setParentPackID(id_pack);
    //             // pushElementToDrawElement(currentObj); 
    //         }

function CreatProduct(type, id, name, price, imgPath, symbolPath, product_watt,id_pack) {
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
                // currentObj.setCoordinates(x, y);
                currentObj.setProductID(id);
                currentObj.setName(name);
                currentObj.setPrice(price);
                currentObj.setImgPath(imgPath);
                currentObj.setSymbolPath(symbolPath);
                // currentObj.setPlanID(template_floor_catalog_design_id);
                currentObj.isInsidePack = true;
                currentObj.setParentPackID(id_pack);
                return currentObj;
                // pushElementToDrawElement(currentObj); 
            }