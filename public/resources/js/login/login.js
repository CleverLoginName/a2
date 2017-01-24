/**
 * 
 */
$(document).ready(function(){
	$('#slides').superslides({play:10000,animation:'fade',pagination:false});
	$('#myModal').modal({
		backdrop: 'static',
		keyboard: false,
		show:true
	});
});