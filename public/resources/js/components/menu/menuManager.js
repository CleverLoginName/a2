var MenuManager = function(){
    this.currentUrl = location.href;
};

MenuManager.prototype = {

    init:function(){

        if(this.currentUrl.indexOf("asa-home") >= 0){
            $(".dashboard").addClass("active");
        }else if(this.currentUrl.indexOf("my-calender") >= 0){
            $(".calender").addClass("active");
        }else if(this.currentUrl.indexOf("msl-home") >= 0){
            $(".dashboard").addClass("active");
        }else if(this.currentUrl.indexOf("msl-reports") >= 0){
            $(".reports").addClass("active");
        }else if(this.currentUrl.indexOf("lec-home") >= 0){
            $(".dashboard").addClass("active");
        }else if(this.currentUrl.indexOf("lm-home") >= 0){
            $(".dashboard").addClass("active");
        }else if(this.currentUrl.indexOf("help-topics") >= 0){
            $(".help").addClass("active");
        }else if(this.currentUrl.indexOf("asa-new-product") >= 0 || this.currentUrl.indexOf("asa-view-products") >= 0 || this.currentUrl.indexOf("asa-edit-products") >= 0 || this.currentUrl.indexOf("products") >= 0){
            $(".products").addClass("active");
        }else if(this.currentUrl.indexOf("asa-new-supplier") >= 0 || this.currentUrl.indexOf("asa-view-suppliers") >= 0 || this.currentUrl.indexOf("asa-edit-suppliers") >= 0){
            $(".suppliers").addClass("active");
        }else if(this.currentUrl.indexOf("asa-view-categories") >= 0 || this.currentUrl.indexOf("asa-edit-categories") >= 0){
            $(".categories").addClass("active");
        }else if(this.currentUrl.indexOf("asa-new-users") >= 0 || this.currentUrl.indexOf("asa-view-users") >= 0 || this.currentUrl.indexOf("asa-edit-users") >= 0 || this.currentUrl.indexOf("msl-new-users") >= 0 || this.currentUrl.indexOf("msl-view-users") >= 0 || this.currentUrl.indexOf("msl-edit-users") >= 0){
            $(".users").addClass("active");
        }else if(this.currentUrl.indexOf("asa-view-profile") >= 0 || this.currentUrl.indexOf("change-password") >= 0 || this.currentUrl.indexOf("asa-edit-profile") >= 0 || this.currentUrl.indexOf("msl-view-profile") >= 0 || this.currentUrl.indexOf("msl-edit-profile") >= 0 || this.currentUrl.indexOf("lec-edit-profile") >= 0 || this.currentUrl.indexOf("lec-view-profile") >= 0 || this.currentUrl.indexOf("lm-edit-profile") >= 0 || this.currentUrl.indexOf("lm-view-profile") >= 0 || this.currentUrl.indexOf("my-subscriptions") >= 0){
            $(".profile").addClass("active");
        }else if(this.currentUrl.indexOf("msl-new-project") >= 0 || this.currentUrl.indexOf("msl-view-projects") >= 0 || this.currentUrl.indexOf("msl-edit-projects") >= 0 || this.currentUrl.indexOf("lec-work-projects") >= 0 || this.currentUrl.indexOf("lec-edit-projects") >= 0  || this.currentUrl.indexOf("lm-view-projects") >= 0){
            $(".projects").addClass("active");
        }

    },
    findSubElementAndAdd : function(subElementWrapper,subElementIdentifier,classToAdd){

        var elementResults = subElementWrapper.find("li a");

        for(var i = 0; i < elementResults.length; i++){
            var element = $(elementResults[i]);
            if(element.attr("href") === "/" + subElementIdentifier){
                element.addClass(classToAdd);
                return;
            }
        }
    },
    cleanUpInit:function(){

    }

};