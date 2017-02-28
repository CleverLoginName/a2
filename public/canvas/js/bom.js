function BomRow(){
    this.name="";
    this.unit_price="";
    this.qty="";
    this.tot_price="";
}

function addElemantToBom(element) {
    var bom_dict = getBomDictionary(element);
    var key = getElementKey(element);
    if (key != null) {
        if (bom_dict[key] == undefined){
            var bomRow = new BomRow();
            bomRow.name = element.name;
            bomRow.unit_price = element.price;
            bomRow.qty = 1;
            bomRow.tot_price = element.price;
            bom_dict[key] = bomRow;
        }
        else {
            bom_dict[key].qty += 1; 
            bom_dict[key].tot_price += element.price; 
        }        
        updateBomTable(bom_dict);
    }
}

function removeElemantFromBom(element) {
    var bom_dict = getBomDictionary(element);
    var key = getElementKey(element);
    if (key != null) {
        if (bom_dict[key] != undefined){
            bom_dict[key].qty -= 1; 
            bom_dict[key].tot_price -= element.price; 
            if(bom_dict[key].qty < 1){
                delete bom_dict[key];
            }
        }
        updateBomTable(bom_dict);
    } 
}

function getBomDictionary(element){
    // if(element.is_std_inclusion){
    //     return project_bom_dict_std_inc;
    // } else {
    //     return project_bom_dict;
    // }
    return project_bom_dict;
}

function getElementKey(element){
    var key = null;
    if(element instanceof ProductItem) {
        if (!element.isInsidePack) {
            key = element.id;
        }
    }
    else if (element instanceof PackItem) {
        key = element.id + 100000; //inorder to differentiate pack and product id
    }
    return key;  
}

// function getBomDictionary(element_array){
//     var totel_price = 0;
//     var total_watt = 0;
//     var bom_dictionary = {}
//     for (var i = 0; i < element_array.length; i++) {
//         item = element_array[i];
//         var key;
//         if(item instanceof ProductItem) {
//             var product = item;
//             total_watt += item.watts;
//             if (product.isInsidePack) {
//                 continue;
//             }
//             key = item.id;
//         }
//         else if (item instanceof PackItem) {
//             key = item.id + 100000; //inorder to differentiate pack and product id
//         }
//         else{
//             continue;
//         }
//         //for both product and pack

//         if (bom_dictionary[key] == undefined){
//             var bomRow = new BomRow();
//             bomRow.name = item.name;
//             bomRow.unit_price = item.price;
//             bomRow.qty = 1;
//             bomRow.tot_price = item.price;
//             bom_dictionary[key] = bomRow;
//             totel_price += item.price ;
//         }
//         else {
//             bom_dictionary[key].qty += 1; 
//             bom_dictionary[key].tot_price += item.price;
//             totel_price += item.price ;
//         }
//     }
//     upDateTotalPrice(totel_price);
//     upDateTotalWatt(total_watt);
//     return bom_dictionary;
// }

function upDateTotalPrice(total_value){
    $('#variation-cost').html('$ '+total_value);
}

function upDateTotalWatt(total_value){
    $('#design-energy').html(total_value+' watts');
}

function updateBomTable(element_array)
{
    var bom_dictionary = getBomDictionary(element_array)

    var table = document.getElementById("productInfo");
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }

    for(item in bom_dictionary){
        var row = table.insertRow(table.rows.length);
        row.insertCell(0).innerHTML= bom_dictionary[item].name;
        row.insertCell(1).innerHTML= bom_dictionary[item].unit_price;
        row.insertCell(2).innerHTML= bom_dictionary[item].qty;
        row.insertCell(3).innerHTML= bom_dictionary[item].tot_price;
    }
}
