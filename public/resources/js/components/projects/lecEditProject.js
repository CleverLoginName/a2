var LECEditProject = function (containerId,data,returningId,projectInitData) {

    this.containerId = containerId;
    this.returningId = returningId;
    this.container = $('#' + containerId);
    this.id = UUID();
    this.data = data;

};
LECEditProject.prototype = {

    init: function () {

        this.container.empty();
        var template = '<section class="box new-item-wrapper">' +
            '<section class="box-header"></section>' +
            '<section class="box-body">';

        template += this._initUI();

        template += '</section>' +
        '</section>';

        $(template).appendTo(this.container);


        $('#proj-frm-des').val(this.data['description']);
        this._initEvents();

    },
    _initUI: function () {


        var uiTemplate = '<form class="row new-item-from-wrapper" role="form" method="post" id="edit-project-form">' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Title</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="proj-frm-title" name="proj-frm-title" value="' + this.data['title'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Description</label></section>' +
            '<section class="col-md-6"><textarea class="form-control required" id="proj-frm-des" name="proj-frm-des" ></textarea></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Budget  (<i class="fa fa-dollar"></i>)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required budget" id="proj-frm-budget" name="proj-frm-budget" value="' + this.data['budget'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Energy Consumption (W)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required ec" id="proj-frm-ec" name="proj-frm-ec" value="' + this.data['energyConsumption'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Location</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="proj-frm-lc" name="proj-frm-lc" value="' + this.data['location'] + '"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +           
            '<section class="row box-footer">' +
            '<button id="' + this.id + '-edit-project-btn" type="submit" class="btn add-item-btn">Update <img src="resources/images/spinning-circles.svg" class="loading-img-btn" style="display:none;" id="' + this.id + '-edit-project-loading"/></button>' +
            '<button class="btn add-item-btn" id="proj-edit-back-btn" style="margin-right:10px;"><i class="fa fa-mail-reply"></i> Back</button>' +
            '</section>' +
            '</form>';

        return uiTemplate;

    },
    _initEvents : function(){

        var _this = this;       
        
        
        $("#edit-project-form").validate();

        $("#edit-project-form").submit(function (event) {

            if ($(this).find('input.error,select.error').length === 0) {

                var frmData = _this._collectData();
                _this._submitData(JSON.stringify(frmData));

            }

            event.preventDefault();

        });

        $('#proj-edit-back-btn').on('click',function(e){

            $('#' +  _this.containerId).hide();
            $('#' +  _this.returningId).show();

            e.preventDefault();

        });

    },
    _collectData : function(){

    	this.data['title'] = $('#proj-frm-title').val();
    	this.data['description'] = $('#proj-frm-des').val();
    	this.data['budget'] = parseFloat($('#proj-frm-budget').val());
    	this.data['energyConsumption'] = parseFloat($('#proj-frm-ec').val());
    	this.data['location'] = $('#proj-frm-lc').val();
    	return this.data;

    },
    _submitData : function(data){

        var _this = this;
        $('#' + this.id + '-edit-project-loading').show();
        $('#' + this.id + '-edit-project-btn').attr('disabled',true);
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/lec/project/update',
            data: data
        }).success(function (response) {
            
            if (response && response['type'] === 'SUCCESS') {
            	alertify.success(response['msg']);
                $('#' + _this.id + '-edit-project-loading').hide();
                $('#' + _this.id + '-edit-project-btn').attr('disabled',false);
                $('#' +  _this.containerId).hide();
                $('#' +  _this.returningId).show();
                _this._updateView();
            }else{
				alertify.error(response['msg']);
			} 
        }).fail(function (e) {
        	alertify.error("Failed to Update Project due to System fault.");
            $('#' + _this.id + '-edit-project-loading').hide();
            $('#' + _this.id + '-edit-project-btn').attr('disabled',false);
        });


    },
    _updateView : function() {
		$(document).trigger('update/editProjectView',{"projectId":this.data['id'],"value":this.data['title'],"property":"title"});
	}
};
