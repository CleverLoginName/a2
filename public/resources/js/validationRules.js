/*
     * 
     * 
     * 	Custom validation Rules
     * 
     * 
     * */

$(document).ready(function(){
	$.validator.addMethod("noSpace", function(value, element) { 
	  	  return value.indexOf(" ") < 0 && value != ""; 
	  	}, "Spaces are not allowed");    
	    
	    $.validator.addMethod("passwordStrength", function(value, element) { 
	    	  return value.length >= 6 && /[0-9]+/.test(value) && /[A-Z]+/.test(value) && /[a-z]+/.test(value); 
	    }, "Not a String Password");    
	    
	    $.validator.addMethod("state", function(value, element) { 
		  	  return value != "" && (/^\+\d+$/.test(value) || /^\d+$/.test(value)); 
		  	}, "Invalid state");  
	    $.validator.addMethod("telNumberPart", function(value, element) { 
		  	  return value != "" && (/^\d+$/.test(value)); 
		  	}, "Invalid Telephone Number");  
});    