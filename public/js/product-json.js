$(document).ready(function () {

    var set_type;
    var item_container;
    var item_tooltip;

    $.ajax({
      url: "products1",
      method:'GET',
      success: function( resp ) {
          resp = jQuery.parseJSON( resp );
        $("#product-container").html("");

        $.each(resp, function(key,product_data) {
            
            var hidden_type = product_data.catalogue;
            var productName = product_data.name;
            productOrgName = productName;
            
            if(productName.length > 10) {
                productName = productName.substring(0, 10)+"...";
            }

            if(hidden_type == "Lights") {

                set_type = "LIGHT_BULB";
                item_container = "product-container";

                item_tooltip = product_data.path;

            } else if(hidden_type == "Switch") {

                set_type = "LIGHT_SWITCH";
                item_container = "product-container-switch";

                item_tooltip = product_data.path;

            } else if(hidden_type == "Prise") {
                set_type = "TV";
                 item_container = "product-container-Prise";
                 item_tooltip = product_data.path;
            }
 
            $("#"+item_container).append('<div class="single-item S" data-item-code="'+product_data.productCode+'" attr="'+set_type+'" data-angle="0" data-evel="2.54"'+
                                 'data-power="30" data-name="'+productOrgName+'" data-price="'+product_data.price+ '" data-path="'+product_data.path +  '" data-tooltip="' +item_tooltip+ '">'+
                    '<div>'+
                        '<img src="'+product_data.path+'">'+
                        '<div class="product-line1">'+
                            '<div class="set-red">Sale</div>'+
                            '<div>$'+product_data.price+'</div>'+
                            '<div>Save</div>'+
                            '<div>$0.00</div>'+
                        '</div>'+
                       ' <div class="product-line2">'+
                            '<div>'+productName+'</div>'+
                            '<div>LUMS : '+product_data.wattage+'</div>'+
                            '<div>Rating : 4.0</div>'+
                            '<div>Type : '+product_data.catalogue+'</div>'+
                        '</div>'+
                    '</div>'+
                '</div>');
        });

      }
    });

/*
    $(".btn-min-search").on("click", function() {
        var nameChar = null;
        try {
            nameChar = $(".search-input").val();
            console.log(nameChar);
        }
        catch(err) {
            nameChar = null;
        }

        $(".C").show();
        $(".S").show();

        if(nameChar != null || nameChar.trim() != '') {
            var OneChar = nameChar.substring(0,1).toUpperCase();
            $("."+OneChar).hide();  
        } else {
            $(".C").show();
            $(".S").show();
        }
    });*/
});