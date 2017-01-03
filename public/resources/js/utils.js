/**
 * Created by ams on 12/30/2014.
 */
var UUID = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();

function formatFileSize(bytes) {
    if (typeof bytes !== 'number') {
        return '';
    }

    if (bytes >= 1000000000) {
        return (bytes / 1000000000).toFixed(2) + ' GB';
    }

    if (bytes >= 1000000) {
        return (bytes / 1000000).toFixed(2) + ' MB';
    }

    return (bytes / 1000).toFixed(2) + ' KB';
}

function formatDate(type, stamp) {

    if(stamp == null || stamp.length === 0){

        return "";

    }

    var d = new Date(Number(stamp));
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours();
    var min = d.getMinutes();
    if (min === 0) {

        min = '00';

    }
    if (min < 10 && min !== '00') {

        min = '0' + min;

    }
    var hours = d.getHours();
    var year = d.getFullYear();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    month +="";
    if (month < 10 && !month.startsWith("0")) {

        month = '0' + month;

    }

    day +="";
    if (day < 10 && !day.startsWith("0")) {

        day = '0' + day;

    }

    return  (type === 'short')? (day + '/' + month + '/' + year) : (month + '/' + day + '/' + year + ' ' + hours + ':' + min + ' ' + ampm);
}

function toUnixStamp(str)
{
    var formattedDate = str;
    var s=str.split("/");
    if(s.length>1){

        formattedDate = getMonth(s[1]) + " " + s[0] + ", " + s[2];

    }

    return formattedDate;
}
function getMonth(monthIndigit){

    switch(monthIndigit){
        case '01':
            return "Jan";
        case '02':
            return "Feb";
        case '03':
            return "Mar";
        case '04':
            return "Apr";
        case '05':
            return "May";
        case '06':
            return "Jun";
        case '07':
            return "Jul";
        case '08':
            return "Aug";
        case '09':
            return "Sep";
        case '10':
            return "Oct";
        case '11':
            return "Nov";
        case '12':
            return "Dec";
    }

}
function extractFromTel(extractTerm,telNo){
    
    if(telNo.indexOf('-') > -1){
        
        var telParts = telNo.split('-');
        
        if(extractTerm === 'STATE'){
            return telParts[0];
        }else{
            return telParts[1];
        }
        
    }else{
        return telNo;
    }
    
}

function mapUrlAsExternalRes(resUrl){
	
	var resUrlParts = resUrl.split('apps/');
	
	if(resUrlParts.length === 2){
		var resPart = resUrlParts[1];
		return 'external_resources/' + replaceAll('/','-@-',resPart);
	}else{
		return resUrl;
	}
	
	
}

function replaceAll(find, replace, str) {
	  return str.replace(new RegExp(find, 'g'), replace);
}

function getColor(temperature){
	
	/*if(window.colorTmpObj && window.colorTmpObj[temperature]){
		return window.colorTmpObj[temperature];
	}
	
	return null;*/
	
	var temperature = temperature/100;
	var red;
	var green;
	var blue;
	
	if(temperature <= 66){
		red = 255;
	}else{
		
		red = temperature - 60;
		red = 329.698727446 * Math.pow(red, -0.1332047592);
		
		if(red < 0 ){
			red = 0 ;
		}
		
		if(red > 255){
			red = 255;
		}
		
	}
	
	if(temperature <= 66){
		
		green = temperature;
		green = 99.4708025861 * Math.log(green) - 161.1195681661;
		
		if(green < 0 ){
			green = 0 ;
		}
		
		if(green > 255){
			green = 255;
		}
		
	}else{
		
		green = temperature - 60;
		green = 288.1221695283 * Math.pow(green, -0.0755148492);
		
		if(green < 0 ){
			green = 0 ;
		}
		
		if(green > 255){
			green = 255;
		}
		
	}
	
	if(temperature >= 66){
		blue = 255;
	}else{
		
		if(temperature <= 19){
			blue = 0;
		}else{
			blue = temperature - 10;
			blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
			
			if(blue < 0 ){
				blue = 0 ;
			}
			
			if(blue > 255){
				blue = 255;
			}
		}
		
	}
	
	return {
        r: parseInt(red),
        g: parseInt(green),
        b: parseInt(blue)
    };
	
	
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    /*var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;*/
	
	return hex;
}

function getSubSection(){
	
	var currentLocation = location.href,
		afterHash = currentLocation.split("#");
	
	if(afterHash.length === 2){
		return afterHash[1];
	}
	
	return null;
	
	
}

function showAjaxError(msg){
	$('#modal-loading').hide();
	$('#page-error').show();
	$('#page-error').html('<span class="label label-danger product-case-cat-empty">' + msg + '</span>');
}

var QueryString = function () {
	  // This function is anonymous, is executed immediately and 
	  // the return value is assigned to QueryString!
	  var query_string = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	        // If first entry with this name
	    if (typeof query_string[pair[0]] === "undefined") {
	      query_string[pair[0]] = pair[1];
	        // If second entry with this name
	    } else if (typeof query_string[pair[0]] === "string") {
	      var arr = [ query_string[pair[0]], pair[1] ];
	      query_string[pair[0]] = arr;
	        // If third or later entry with this name
	    } else {
	      query_string[pair[0]].push(pair[1]);
	    }
	  } 
	    return query_string;
	} ();

$(document).ready(function(){
	
	var colorTmpObj = new Object();
	
	colorTmpObj[1000] = "#ff3800";
	colorTmpObj[1100] = "#ff4700";
	colorTmpObj[1200] = "#ff5300";
	colorTmpObj[1300] = "#ff5d00";
	colorTmpObj[1400] = "#ff6600";
	colorTmpObj[1500] = "#ff6d00";
	colorTmpObj[1600] = "#ff7300";
	colorTmpObj[1700] = "#ff7900";
	colorTmpObj[1800] = "#ff7e00";
	colorTmpObj[1900] = "#ff8300";
	colorTmpObj[2000] = "#ff8912";
	colorTmpObj[2100] = "#ff8e21";
	colorTmpObj[2200] = "#ff932c";
	colorTmpObj[2300] = "#ff9836";
	colorTmpObj[2400] = "#ff9d3f";
	colorTmpObj[2500] = "#ffa148";
	colorTmpObj[2600] = "#ffa54f";
	colorTmpObj[2700] = "#ffa957";
	colorTmpObj[2800] = "#ffad5e";
	colorTmpObj[2900] = "#ffb165";
	colorTmpObj[3000] = "#ffb46b";
	colorTmpObj[3100] = "#ffb872";
	colorTmpObj[3200] = "#ffbb78";
	colorTmpObj[3300] = "#ffbe7e";
	colorTmpObj[3400] = "#ffc184";
	colorTmpObj[3500] = "#ffc489";
	colorTmpObj[3600] = "#ffc78f";
	colorTmpObj[3700] = "#ffc994";
	colorTmpObj[3800] = "#ffcc99";
	colorTmpObj[3900] = "#ffce9f";
	colorTmpObj[4000] = "#ffd1a3";
	colorTmpObj[4100] = "#ffd3a8";
	colorTmpObj[4200] = "#ffd5ad";
	colorTmpObj[4300] = "#ffd7b1";
	colorTmpObj[4400] = "#ffd9b6";
	colorTmpObj[4500] = "#ffdbba";
	colorTmpObj[4600] = "#ffddbe";
	colorTmpObj[4700] = "#ffdfc2";
	colorTmpObj[4800] = "#ffe1c6";
	colorTmpObj[4900] = "#ffe3ca";
	colorTmpObj[5000] = "#ffe4ce";
	colorTmpObj[5100] = "#ffe6d2";
	colorTmpObj[5200] = "#ffe8d5";
	colorTmpObj[5300] = "#ffe9d9";
	colorTmpObj[5400] = "#ffebdc";
	colorTmpObj[5500] = "#ffece0";
	colorTmpObj[5600] = "#ffeee3";
	colorTmpObj[5700] = "#ffefe6";
	colorTmpObj[5800] = "#fff0e9";
	colorTmpObj[5900] = "#fff2ec";
	colorTmpObj[6000] = "#fff3ef";
	colorTmpObj[6100] = "#fff4f2";
	colorTmpObj[6200] = "#fff5f5";
	colorTmpObj[6300] = "#fff6f8";
	colorTmpObj[6400] = "#fff8fb";
	colorTmpObj[6500] = "#fff9fd";
	colorTmpObj[6600] = "#fef9ff";
	colorTmpObj[6700] = "#fcf7ff";
	colorTmpObj[6800] = "#f9f6ff";
	colorTmpObj[6900] = "#f7f5ff";
	colorTmpObj[7000] = "#f5f3ff";
	colorTmpObj[7100] = "#f3f2ff";
	colorTmpObj[7200] = "#f0f1ff";
	colorTmpObj[7300] = "#eff0ff";
	colorTmpObj[7400] = "#edefff";
	colorTmpObj[7500] = "#ebeeff";
	colorTmpObj[7600] = "#e9edff";
	colorTmpObj[7700] = "#e7ecff";
	colorTmpObj[7800] = "#e6ebff";
	colorTmpObj[7900] = "#e4eaff";
	colorTmpObj[8000] = "#e3e9ff";
	colorTmpObj[8100] = "#e1e8ff";
	colorTmpObj[8200] = "#e0e7ff";
	colorTmpObj[8300] = "#dee6ff";
	colorTmpObj[8400] = "#dde6ff";
	colorTmpObj[8500] = "#dce5ff";
	colorTmpObj[8600] = "#dae4ff";
	colorTmpObj[8700] = "#d9e3ff";
	colorTmpObj[8800] = "#d8e3ff";
	colorTmpObj[8900] = "#d7e2ff";
	colorTmpObj[9000] = "#d6e1ff";
	colorTmpObj[9100] = "#d4e1ff";
	colorTmpObj[9200] = "#d3e0ff";
	colorTmpObj[9300] = "#d2dfff";
	colorTmpObj[9400] = "#d1dfff";
	colorTmpObj[9500] = "#d0deff";
	colorTmpObj[9600] = "#cfddff";
	colorTmpObj[9700] = "#cfddff";
	colorTmpObj[9800] = "#cedcff";
	colorTmpObj[9900] = "#cddcff";
	
	colorTmpObj[10000] = "#ccdbff";
	colorTmpObj[10100] = "#cbdbff";
	colorTmpObj[10200] = "#cadaff";
	colorTmpObj[10300] = "#c9daff";
	colorTmpObj[10400] = "#c9d9ff";
	colorTmpObj[10500] = "#c8d9ff";
	colorTmpObj[10600] = "#c7d8ff";
	colorTmpObj[10700] = "#c7d8ff";
	colorTmpObj[10800] = "#c6d8ff";
	colorTmpObj[10900] = "#c5d7ff";
	colorTmpObj[11000] = "#c4d7ff";
	colorTmpObj[11100] = "#c4d6ff";
	colorTmpObj[11200] = "#c3d6ff";
	colorTmpObj[11300] = "#c3d6ff";
	colorTmpObj[11400] = "#c2d5ff";
	colorTmpObj[11500] = "#c1d5ff";
	colorTmpObj[11600] = "#c1d4ff";
	colorTmpObj[11700] = "#c0d4ff";
	colorTmpObj[11800] = "#c0d4ff";
	colorTmpObj[11900] = "#bfd3ff";
	colorTmpObj[12000] = "#bfd3ff";
	colorTmpObj[12100] = "#bed3ff";
	colorTmpObj[12200] = "#bed2ff";
	colorTmpObj[12300] = "#bdd2ff";
	colorTmpObj[12400] = "#bdd2ff";
	colorTmpObj[12500] = "#bcd2ff";
	colorTmpObj[12600] = "#bcd1ff";
	colorTmpObj[12700] = "#bbd1ff";
	colorTmpObj[12800] = "#bbd1ff";
	colorTmpObj[12900] = "#bad0ff";
	colorTmpObj[13000] = "#bad0ff";
	colorTmpObj[13100] = "#b9d0ff";
	colorTmpObj[13200] = "#b9d0ff";
	colorTmpObj[13300] = "#b9cfff";
	colorTmpObj[13400] = "#b8cfff";
	colorTmpObj[13500] = "#b8cfff";
	colorTmpObj[13600] = "#b7cfff";
	colorTmpObj[13700] = "#b7ceff";
	colorTmpObj[13800] = "#b7ceff";
	colorTmpObj[13900] = "#b6ceff";
	colorTmpObj[14000] = "#b6ceff";
	colorTmpObj[14100] = "#b6cdff";
	colorTmpObj[14200] = "#b5cdff";
	colorTmpObj[14300] = "#b5cdff";
	colorTmpObj[14400] = "#b5cdff";
	colorTmpObj[14500] = "#b4cdff";
	colorTmpObj[14600] = "#b4ccff";
	colorTmpObj[14700] = "#b4ccff";
	colorTmpObj[14800] = "#b3ccff";
	colorTmpObj[14900] = "#b3ccff";
	colorTmpObj[15000] = "#b3ccff";
	colorTmpObj[15100] = "#b2cbff";
	colorTmpObj[15200] = "#b2cbff";
	colorTmpObj[15300] = "#b2cbff";
	colorTmpObj[15400] = "#b2cbff";
	colorTmpObj[15500] = "#b1cbff";
	colorTmpObj[15600] = "#b1caff";
	colorTmpObj[15700] = "#b1caff";
	colorTmpObj[15800] = "#b1caff";
	colorTmpObj[15900] = "#b0caff";
	colorTmpObj[16000] = "#b0caff";
	colorTmpObj[16100] = "#b0caff";
	colorTmpObj[16200] = "#afc9ff";
	colorTmpObj[16300] = "#afc9ff";
	colorTmpObj[16400] = "#afc9ff";
	colorTmpObj[16500] = "#afc9ff";
	colorTmpObj[16600] = "#afc9ff";
	colorTmpObj[16700] = "#aec9ff";
	colorTmpObj[16800] = "#aec9ff";
	colorTmpObj[16900] = "#aec8ff";
	colorTmpObj[17000] = "#aec8ff";
	colorTmpObj[17100] = "#adc8ff";
	colorTmpObj[17200] = "#adc8ff";
	colorTmpObj[17300] = "#adc8ff";
	colorTmpObj[17400] = "#adc8ff";
	colorTmpObj[17500] = "#adc8ff";
	colorTmpObj[17600] = "#acc7ff";
	colorTmpObj[17700] = "#acc7ff";
	colorTmpObj[17800] = "#acc7ff";
	colorTmpObj[17900] = "#acc7ff";
	colorTmpObj[18000] = "#acc7ff";
	colorTmpObj[18100] = "#abc7ff";
	colorTmpObj[18200] = "#abc7ff";
	colorTmpObj[18300] = "#abc7ff";
	colorTmpObj[18400] = "#abc6ff";
	colorTmpObj[18500] = "#abc6ff";
	colorTmpObj[18600] = "#aac6ff";
	colorTmpObj[18700] = "#aac6ff";
	colorTmpObj[18800] = "#aac6ff";
	colorTmpObj[18900] = "#aac6ff";
	colorTmpObj[19000] = "#aac6ff";
	colorTmpObj[19100] = "#aac6ff";
	colorTmpObj[19200] = "#a9c6ff";
	colorTmpObj[19300] = "#a9c5ff";
	colorTmpObj[19400] = "#a9c5ff";
	colorTmpObj[19500] = "#a9c5ff";
	colorTmpObj[19600] = "#a9c5ff";
	colorTmpObj[19700] = "#a9c5ff";
	colorTmpObj[19800] = "#a9c5ff";
	colorTmpObj[19900] = "#a8c5ff";
	
	colorTmpObj[20000] = "#a8c5ff";
	colorTmpObj[20100] = "#a8c5ff";
	colorTmpObj[20200] = "#a8c5ff";
	colorTmpObj[20300] = "#a8c4ff";
	colorTmpObj[20400] = "#a8c4ff";
	colorTmpObj[20500] = "#a8c4ff";
	colorTmpObj[20600] = "#a7c4ff";
	colorTmpObj[20700] = "#a7c4ff";
	colorTmpObj[20800] = "#a7c4ff";
	colorTmpObj[20900] = "#a7c4ff";
	colorTmpObj[21000] = "#a7c4ff";
	colorTmpObj[21100] = "#a7c4ff";
	colorTmpObj[21200] = "#a7c4ff";
	colorTmpObj[21300] = "#a6c4ff";
	colorTmpObj[21400] = "#a6c3ff";
	colorTmpObj[21500] = "#a6c3ff";
	colorTmpObj[21600] = "#a6c3ff";
	colorTmpObj[21700] = "#a6c3ff";
	colorTmpObj[21800] = "#a6c3ff";
	colorTmpObj[21900] = "#a6c3ff";
	colorTmpObj[22000] = "#a6c3ff";
	colorTmpObj[22100] = "#a5c3ff";
	colorTmpObj[22200] = "#a5c3ff";
	colorTmpObj[22300] = "#a5c3ff";
	colorTmpObj[22400] = "#a5c3ff";
	colorTmpObj[22500] = "#a5c3ff";
	colorTmpObj[22600] = "#a5c3ff";
	colorTmpObj[22700] = "#a5c2ff";
	colorTmpObj[22800] = "#a5c2ff";
	colorTmpObj[22900] = "#a5c2ff";
	colorTmpObj[23000] = "#a4c2ff";
	colorTmpObj[23100] = "#a4c2ff";
	colorTmpObj[23200] = "#a4c2ff";
	colorTmpObj[23300] = "#a4c2ff";
	colorTmpObj[23400] = "#a4c2ff";
	colorTmpObj[23500] = "#a4c2ff";
	colorTmpObj[23600] = "#a4c2ff";
	colorTmpObj[23700] = "#a4c2ff";
	colorTmpObj[23800] = "#a4c2ff";
	colorTmpObj[23900] = "#a4c2ff";
	colorTmpObj[24000] = "#a3c2ff";
	colorTmpObj[24100] = "#a3c2ff";
	colorTmpObj[24200] = "#a3c1ff";
	colorTmpObj[24300] = "#a3c1ff";
	colorTmpObj[24400] = "#a3c1ff";
	colorTmpObj[24500] = "#a3c1ff";
	colorTmpObj[24600] = "#a3c1ff";
	colorTmpObj[24700] = "#a3c1ff";
	colorTmpObj[24800] = "#a3c1ff";
	colorTmpObj[24900] = "#a3c1ff";
	colorTmpObj[25000] = "#a3c1ff";
	colorTmpObj[25100] = "#a2c1ff";
	colorTmpObj[25200] = "#a2c1ff";
	colorTmpObj[25300] = "#a2c1ff";
	colorTmpObj[25400] = "#a2c1ff";
	colorTmpObj[25500] = "#a2c1ff";
	colorTmpObj[25600] = "#a2c1ff";
	colorTmpObj[25700] = "#a2c1ff";
	colorTmpObj[25800] = "#a2c1ff";
	colorTmpObj[25900] = "#a2c0ff";
	colorTmpObj[26000] = "#a2c0ff";
	colorTmpObj[26100] = "#a2c0ff";
	colorTmpObj[26200] = "#a2c0ff";
	colorTmpObj[26300] = "#a2c0ff";
	colorTmpObj[26400] = "#a1c0ff";
	colorTmpObj[26500] = "#a1c0ff";
	colorTmpObj[26600] = "#a1c0ff";
	colorTmpObj[26700] = "#a1c0ff";
	colorTmpObj[26800] = "#a1c0ff";
	colorTmpObj[26900] = "#a1c0ff";
	colorTmpObj[27000] = "#a1c0ff";
	colorTmpObj[27100] = "#a1c0ff";
	colorTmpObj[27200] = "#a1c0ff";
	colorTmpObj[27300] = "#a1c0ff";
	colorTmpObj[27400] = "#a1c0ff";
	colorTmpObj[27500] = "#a1c0ff";
	colorTmpObj[27600] = "#a1c0ff";
	colorTmpObj[27700] = "#a1c0ff";
	colorTmpObj[27800] = "#a0c0ff";
	colorTmpObj[27900] = "#a0c0ff";
	colorTmpObj[28000] = "#a0bfff";
	colorTmpObj[28100] = "#a0bfff";
	colorTmpObj[28200] = "#a0bfff";
	colorTmpObj[28300] = "#a0bfff";
	colorTmpObj[28400] = "#a0bfff";
	colorTmpObj[28500] = "#a0bfff";
	colorTmpObj[28600] = "#a0bfff";
	colorTmpObj[28700] = "#a0bfff";
	colorTmpObj[28800] = "#a0bfff";
	colorTmpObj[28900] = "#a0bfff";
	colorTmpObj[29000] = "#a0bfff";
	colorTmpObj[29100] = "#a0bfff";
	colorTmpObj[29200] = "#a0bfff";
	colorTmpObj[29300] = "#9fbfff";
	colorTmpObj[29400] = "#9fbfff";
	colorTmpObj[29500] = "#9fbfff";
	colorTmpObj[29600] = "#9fbfff";
	colorTmpObj[29700] = "#9fbfff";
	colorTmpObj[29800] = "#9fbfff";
	colorTmpObj[29900] = "#9fbfff";
	
	colorTmpObj[30000] = "#9fbfff";
	colorTmpObj[30100] = "#9fbfff";
	colorTmpObj[30200] = "#9fbfff";
	colorTmpObj[30300] = "#9fbfff";
	colorTmpObj[30400] = "#9fbeff";
	colorTmpObj[30500] = "#9fbeff";
	colorTmpObj[30600] = "#9fbeff";
	colorTmpObj[30700] = "#9fbeff";
	colorTmpObj[30800] = "#9fbeff";
	colorTmpObj[30900] = "#9fbeff";
	colorTmpObj[31000] = "#9fbeff";
	colorTmpObj[31100] = "#9ebeff";
	colorTmpObj[31200] = "#9ebeff";
	colorTmpObj[31300] = "#9ebeff";
	colorTmpObj[31400] = "#9ebeff";
	colorTmpObj[31500] = "#9ebeff";
	colorTmpObj[31600] = "#9ebeff";
	colorTmpObj[31700] = "#9ebeff";
	colorTmpObj[31800] = "#9ebeff";
	colorTmpObj[31900] = "#9ebeff";
	colorTmpObj[32000] = "#9ebeff";
	colorTmpObj[32100] = "#9ebeff";
	colorTmpObj[32200] = "#9ebeff";
	colorTmpObj[32300] = "#9ebeff";
	colorTmpObj[32400] = "#9ebeff";
	colorTmpObj[32500] = "#9ebeff";
	colorTmpObj[32600] = "#9ebeff";
	colorTmpObj[32700] = "#9ebeff";
	colorTmpObj[32800] = "#9ebeff";
	colorTmpObj[32900] = "#9ebeff";
	colorTmpObj[33000] = "#9ebeff";
	colorTmpObj[33100] = "#9ebeff";
	colorTmpObj[33200] = "#9dbeff";
	colorTmpObj[33300] = "#9dbeff";
	colorTmpObj[33400] = "#9dbdff";
	colorTmpObj[33500] = "#9dbdff";
	colorTmpObj[33600] = "#9dbdff";
	colorTmpObj[33700] = "#9dbdff";
	colorTmpObj[33800] = "#9dbdff";
	colorTmpObj[33900] = "#9dbdff";
	colorTmpObj[34000] = "#9dbdff";
	colorTmpObj[34100] = "#9dbdff";
	colorTmpObj[34200] = "#9dbdff";
	colorTmpObj[34300] = "#9dbdff";
	colorTmpObj[34400] = "#9dbdff";
	colorTmpObj[34500] = "#9dbdff";
	colorTmpObj[34600] = "#9dbdff";
	colorTmpObj[34700] = "#9dbdff";
	colorTmpObj[34800] = "#9dbdff";
	colorTmpObj[34900] = "#9dbdff";
	colorTmpObj[35000] = "#9dbdff";
	colorTmpObj[35100] = "#9dbdff";
	colorTmpObj[35200] = "#9dbdff";
	colorTmpObj[35300] = "#9dbdff";
	colorTmpObj[35400] = "#9dbdff";
	colorTmpObj[35500] = "#9dbdff";
	colorTmpObj[35600] = "#9cbdff";
	colorTmpObj[35700] = "#9cbdff";
	colorTmpObj[35800] = "#9cbdff";
	colorTmpObj[35900] = "#9cbdff";
	colorTmpObj[36000] = "#9cbdff";
	colorTmpObj[36100] = "#9cbdff";
	colorTmpObj[36200] = "#9cbdff";
	colorTmpObj[36300] = "#9cbdff";
	colorTmpObj[36400] = "#9cbdff";
	colorTmpObj[36500] = "#9cbdff";
	colorTmpObj[36600] = "#9cbdff";
	colorTmpObj[36700] = "#9cbdff";
	colorTmpObj[36800] = "#9cbdff";
	colorTmpObj[36900] = "#9cbdff";
	colorTmpObj[37000] = "#9cbdff";
	colorTmpObj[37100] = "#9cbdff";
	colorTmpObj[37200] = "#9cbcff";
	colorTmpObj[37300] = "#9cbcff";
	colorTmpObj[37400] = "#9cbcff";
	colorTmpObj[37500] = "#9cbcff";
	colorTmpObj[37600] = "#9cbcff";
	colorTmpObj[37700] = "#9cbcff";
	colorTmpObj[37800] = "#9cbcff";
	colorTmpObj[37900] = "#9cbcff";
	colorTmpObj[38000] = "#9cbcff";
	colorTmpObj[38100] = "#9cbcff";
	colorTmpObj[38200] = "#9cbcff";
	colorTmpObj[38300] = "#9cbcff";
	colorTmpObj[38400] = "#9bbcff";
	colorTmpObj[38500] = "#9bbcff";
	colorTmpObj[38600] = "#9bbcff";
	colorTmpObj[38700] = "#9bbcff";
	colorTmpObj[38800] = "#9bbcff";
	colorTmpObj[38900] = "#9bbcff";
	colorTmpObj[39000] = "#9bbcff";
	colorTmpObj[39100] = "#9bbcff";
	colorTmpObj[39200] = "#9bbcff";
	colorTmpObj[39300] = "#9bbcff";
	colorTmpObj[39400] = "#9bbcff";
	colorTmpObj[39500] = "#9bbcff";
	colorTmpObj[39600] = "#9bbcff";
	colorTmpObj[39700] = "#9bbcff";
	colorTmpObj[39800] = "#9bbcff";
	colorTmpObj[39900] = "#9bbcff";
	colorTmpObj[40000] = "#9bbcff";
	
	
	window.colorTmpObj = colorTmpObj;
	
});

