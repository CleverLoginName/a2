$(document).ready(function(){
    $('.wr_left ').css('height', $(window).height());
	
	if ($(window).width() < 989) {
     	$('.wr_left ').css('height', 'auto');
	}
});
$(window).resize(function(){
    $('.wr_left ').css('height', $(window).height());
	if ($(window).width() < 989) {
     	$('.wr_left ').css('height', 'auto');
	}
});

