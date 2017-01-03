$(document).ready(function(){
	
	scheduler.config.xml_date="%Y-%m-%d %H:%i";
	scheduler.init('scheduler_here',new Date(),"week");
	scheduler.load("restAPI/events/" + window.username + "/" + window.userRole + "/all","json");
	var dp = new dataProcessor("restAPI/events/" + window.username + "/" + window.userRole + "/");
	dp.init(scheduler);
	dp.setTransactionMode("REST");
	
});
