function print_report_price_vice() {

    var popup = window.open('price_vice_report.html', '_blank', 'width=1000,height=900');
    var product_array = new Array();
    for (var x = 0; x < drawElements.length; x++) { // format report data to array
        var tmpEle = drawElements[x];

        if (tmpEle.getType() == ObjectType.LIGHT_BULB || tmpEle.getType() == ObjectType.LIGHT_SWITCH) {
            var r = []; // created for raws
            r['product_code'] = drawElements[x].itemCode;
            r['obj'] = drawElements[x];
            r['qty'] = 1;

            var exist = false; // check product already added

            for (var y = 0; y < product_array.length; y++) {
                if (product_array[y]['product_code'] == drawElements[x].itemCode) {
                    console.log('index exist');
                    exist = true;
                    product_array[y]['qty']++;
                }
            }

            if (!exist)
                product_array.push(r);
        }
    }

    popup.onload = function () { // on load event report html page
        var table = popup.document.getElementById("tbl_price_vice");

        for (var x = 0; x < product_array.length; x++) {
            // create rows
            var row = table.insertRow(-1); // insert new row at the bottom

            var cell1 = row.insertCell(0); // add new columns
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);

            // Add some text to cells
            cell1.innerHTML = x + 1;
            cell1.style.textAlign = 'center';

            cell2.innerHTML = product_array[x]['product_code'];
            cell2.style.textAlign = 'center';

            cell3.innerHTML = product_array[x]['obj'].name;
            cell3.style.textAlign = 'center';

            cell4.innerHTML = product_array[x]['obj'].price;
            cell4.style.textAlign = 'center';

            cell5.innerHTML = product_array[x].qty;
            cell5.style.textAlign = 'center';

            cell6.innerHTML = product_array[x]['obj'].price * product_array[x].qty;
            cell6.style.textAlign = 'center';
        }

    }
}

// print report product vice
function print_report_product_vice() {
    var popup = window.open('product_vice_report.html', '_blank', 'width=1200,height=900');

    var product_array = new Array();
    for (var x = 0; x < drawElements.length; x++) { // format report data to array

        var tmpEle = drawElements[x];

        if (tmpEle.getType() == ObjectType.LIGHT_BULB || tmpEle.getType() == ObjectType.LIGHT_SWITCH) {
            var r = []; // created for raws
            r['product_code'] = drawElements[x].itemCode;
            r['obj'] = drawElements[x];
            r['qty'] = 1;

            var exist = false; // check product already added

            for (var y = 0; y < product_array.length; y++) {
                if (product_array[y]['product_code'] == drawElements[x].itemCode) {
                    exist = true;
                    product_array[y]['qty']++;
                }
            }

            if (!exist)
                product_array.push(r);
        }

    }

    popup.onload = function () { // on load event report html page
        console.log(drawElements);

        var iDiv = popup.document.getElementById("products");

        for (var x = 0; x < product_array.length; x++) {
            var proWrap = document.createElement('div'); // product div container
            proWrap.className = 'product-wrap';

            var proImg = document.createElement('img');
            proImg.src = product_array[x]['obj'].imgPath;
            proImg.className = 'product-img';
            proWrap.appendChild(proImg);

            var proDetailDiv = document.createElement('div');
            proDetailDiv.className = 'product-details';

            var proCode = document.createElement('p');
            proCode.innerHTML = product_array[x]['product_code'];
            proDetailDiv.appendChild(proCode);

            var proName = document.createElement('p');
            proName.innerHTML = product_array[x]['obj'].name;
            proDetailDiv.appendChild(proName);

            var proQty = document.createElement('p');
            proQty.innerHTML = 'Qty ' + product_array[x].qty;
            proDetailDiv.appendChild(proQty);

            proWrap.appendChild(proDetailDiv);
            iDiv.appendChild(proWrap);
        }

    }
}