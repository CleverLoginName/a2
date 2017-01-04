$(document).ready(function() {

	$("#menu-site-bar").draggable();
	$("#menu-site-bar").draggable("disable");

	$(".main-lab").mouseup(function() {
		$("#menu-site-bar").draggable("disable");
	});

	$("#minimize-btn").on("click", function() {
		$("#menu-detail-col").slideToggle();
	});

	$(".main-lab").mousedown("click", function() {
		$("#menu-site-bar").draggable("enable");
	});

	$("#e-btn").on("click", function() {
		$("#e-item-div").slideToggle();

		var btn_e = $(this);
		var itemheading = btn_e.parent();

		if($("#e-btn").text() == "+") 
		{
			$("#e-btn").html("-");
			itemheading.removeClass("close").addClass("open");
		} else 
		{
			$("#e-btn").html("+");
			itemheading.removeClass("open").addClass("close");
		}
	});


	$("#btn-drw-switch").on("click", function() {
		$("#switch-item-div").slideToggle();

		var btn_e = $(this);
		var itemheading = btn_e.parent();

		if($("#btn-drw-switch").text() == "+") 
		{
			$("#btn-drw-switch").html("-");
			itemheading.removeClass("close").addClass("open");
		} else 
		{
			$("#btn-drw-switch").html("+");
			itemheading.removeClass("open").addClass("close");
		}
	});


	$("#btn-drw-prise").on("click", function() {
		$("#prise-item-div").slideToggle();

		var btn_e = $(this);
		var itemheading = btn_e.parent();

		if($("#btn-drw-prise").text() == "+") 
		{
			$("#btn-drw-prise").html("-");
			itemheading.removeClass("close").addClass("open");
		} else 
		{
			$("#btn-drw-prise").html("+");
			itemheading.removeClass("open").addClass("close");
		}
	});


});