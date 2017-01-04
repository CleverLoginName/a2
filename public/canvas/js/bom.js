function BomRow(){
    this.name="";
    this.unit_price="";
    this.qty="";
    this.tot_price="";
}

function getBomDictionary(element_array){
    var bom_dictionary = {}
    for (var i = 0; i < element_array.length; i++) {
        item = element_array[i];
        var key;
        if(item instanceof ProductItem) {
            var product = item;
            if (product.isInsidePack) {
                continue;
            }
            key = item.id;
        }
        else if (item instanceof PackItem) {
            key = item.id + 100000; //inorder to differentiate pack and product id
        }
        else{
            continue;
        }
        //for both product and pack

        if (bom_dictionary[key] == undefined){
            var bomRow = new BomRow();
            bomRow.name = item.name;
            bomRow.unit_price = item.price;
            bomRow.qty = 1;
            bomRow.tot_price = item.price;
            bom_dictionary[key] = bomRow;
        }
        else {
            bom_dictionary[key].qty += 1; 
            bom_dictionary[key].tot_price += item.price; 
        }
    }
    return bom_dictionary;
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

//TODO remove OLD data
// old data -start
function addRow(name,price,discount,energy,visible) {
    var table = document.getElementById("productInfo");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var checkedStatus = visible ? "checked" :  "";
    console.log("checkedStatus: "+checkedStatus+" vibL: "+visible);
    row.insertCell(0).innerHTML= productName;
    row.insertCell(1).innerHTML= price;
    row.insertCell(2).innerHTML= discount;
    row.insertCell(3).innerHTML= energy;
    //row.insertCell(4).innerHTML= '<input type="checkbox" '+checkedStatus+' name="'+name+'" value = "Delete" onClick="Javacsript:setBulbStatus(this)">';
 }

function addToTable(bulb){
	//alert(bulb.visibility);
	addRow(bulb.name,'$200','4%','100',bulb.visibility);
}

function addToSwitchTable(bulb){
	//alert(bulb.visibility);
	addRow(bulb.name,'$200','4%','100',bulb.s_visibility);
}

function setBulbStatus(inputElement){
	drawElements.find(function(bulb){
		if (bulb.getType() == ObjectType.LIGHT_BULB && inputElement.name == bulb.getName()){
			//alert('call for Lights');
			bulb.setVisibility(inputElement.checked);
			drawAllObjects();
			return true;
		}
		
		if (bulb.getType() == ObjectType.LIGHT_SWITCH && inputElement.name == bulb.getName()){
			alert('call for switches');
			bulb.setVisibility(inputElement.checked);
			drawAllObjects();
			return true;
		}
	});
}
// old data -end