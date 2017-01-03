/**
 *
 */
var NewProject = function(containerId,initData){

    this.container = $('#' + containerId);
    this.id = UUID();
    this.validator = null;
    this.consultants = initData['consultants'];
    this.customers = initData['customers'];
    this.selectedConsultant = 'default';

};
NewProject.prototype = {

    init : function(){

    	this.container.empty();
        var template = '<section class="box new-item-wrapper">' +
            '<section class="box-header"></section>' +
            '<section class="box-body">';

        template += this._initUI();

        template += '</section>' +
        '</section>';

        $(template).appendTo(this.container);
        window.breadcrumb.addItem("New", this.container.attr('id'));
        this._initEvents();
    },
    _initUI : function(){


        var uiTemplate = '<form class="row new-item-from-wrapper" role="form"  method="post" id="new-proj-form">' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Title</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="proj-frm-title" name="proj-frm-title"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Description</label></section>' +
            '<section class="col-md-6"><textarea class="form-control required" id="proj-frm-des" name="proj-frm-des"></textarea></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Budget  (<i class="fa fa-dollar"></i>)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required budget" id="proj-frm-budget" name="proj-frm-budget"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Energy Consumption (W)</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required ec" id="proj-frm-ec" name="proj-frm-ec"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Location</label></section>' +
            '<section class="col-md-6"><input type="text" class="form-control required" id="proj-frm-lc" name="proj-frm-lc"/></section>' +
            '<section class="col-md-2"></section>' +
            '</section>';
        
        	if(this.customers.length > 1){
        		uiTemplate += '<section class="row form-group">' +
                '<section class="col-md-2"></section>' +
                '<section class="col-md-2"><label>Customer</label></section>' +
                '<section class="col-md-6">' +
                '<select class="form-control required notselected" id="proj-frm-cus" name="proj-frm-cus">' +
                this._setCustomerOpt() +
                '</select>' +
                '</section>' +
                '<section class="col-md-2"></section>' +
                '</section>';
        	}else{
        		uiTemplate += '<section class="row form-group">' +
                '<section class="col-md-2"></section>' +
                '<section class="col-md-2"><label>Customer</label></section>' +
                '<section class="col-md-6">' +
                '<input type="text" class="form-control required" id="proj-frm-cus" name="proj-frm-cus" value="' + this.customers[0]['id'] +  '" style="display:none;" readonly/>' +
                '<input type="text" class="form-control required" id="proj-frm-cus-name" name="proj-frm-cus-name" value="' + this.customers[0]['name'] +  '" readonly/>' +
                '</section>' +
                '<section class="col-md-2"></section>' +
                '</section>';
        	}
            
            uiTemplate += '<section class="row form-group">' +
            '<section class="col-md-2"></section>' +
            '<section class="col-md-2"><label>Consultant</label></section>' +
            '<section class="col-md-6">' +
            '<select class="form-control" id="proj-frm-con" name="proj-frm-con">' +
            this._setConsultantsOpt() +
            '</select>' +
            '</section>' +
            '<section class="col-md-2"></section>' +
            '</section>' +
            '<section class="row box-footer">' +
            '<button id="' + this.id + '-new-project-btn" type="submit" class="btn add-item-btn">Add <img src="resources/images/spinning-circles.svg" class="loading-img-btn" style="display:none;" id="' + this.id + '-new-project-loading"/></button>' +
            '<button id="proj-frm-reset" class="btn add-item-btn" style="margin-right:10px;">Reset</button>' +
            '</section>' +
            '</form>';

        return uiTemplate;

    },
    _initEvents : function(){

        var _this = this;


        this.validator = $("#new-proj-form").validate();

        $("#proj-frm-con").ddlist({
            width: 300,
            minHeight:200,
            onSelected: function (index, value, text) {
            	_this.selectedConsultant = value;
            }
          });

        $("#new-proj-form").submit(function (event) {


            if ($(this).find('input.error,input.sd-err,select.error').length === 0) {

                var frmData = _this._collectData();
                _this._submitData(JSON.stringify(frmData));

            }

            event.preventDefault();

        });

        $('#proj-frm-reset').on('click',function(e){

            _this._reset();
            _this.validator.resetForm();
            e.preventDefault();

        });
        
        $(document).on('import/save/exit',function(){
        	
        	bootbox.dialog({
                closeButton: false,
                message: 'Floor Plan Successfully Added for the project',
                className:"logout-dialog",
                buttons: {
                    main:{
                        label: "Ok",
                        callback: function(){
                        	location.href = 'msl-view-projects';
                        }
                    }
                }
            });
        	
        });
        
        $(document).on('import/exit',function(){
        	bootbox.dialog({
                closeButton: false,
                message: 'Are you sure you want to exit from Floor Plan Upload Section ?',
                className:"logout-dialog",
                buttons: {
                    main:{
                        label: "Yes",
                        callback: function(){
                        	location.href = 'msl-view-projects';
                        }
                    },
                    no:{
                        label: "No",
                        callback: function(){
                        	
                        }
                    }
                }
            });
        });


    },
    _collectData : function(){

        var data = new Object();

        data['status'] = "NEW";
        data['title'] = $('#proj-frm-title').val();
        data['description'] = $('#proj-frm-des').val();
        data['budget'] = parseFloat($('#proj-frm-budget').val());
        data['energyConsumption'] = parseFloat($('#proj-frm-ec').val());
        data['location'] = $('#proj-frm-lc').val();
        data['ownerId'] = parseInt($('#proj-frm-cus').val());
        data['consultantId'] = (this.selectedConsultant == 'default') ? 0 : parseInt(this.selectedConsultant);

        return data;

    },
    _setConsultantsOpt : function(){

        var optTmpl = '<option value="default">Select Consultant For Project</option>';

        for(var i = 0 ; i < this.consultants.length; i++){

            optTmpl+= '<option data-imagesrc="' + this.consultants[i]['image'] + '" data-cat-index="' + i + '" value="' + this.consultants[i]['id']  + '">' + this.consultants[i]['name'] + '</option>';

        }

        return optTmpl;

    },
    _setCustomerOpt : function(){

        var optTmpl = '<option value="default">Select Customer For Project</option>';

        for(var i = 0 ; i < this.customers.length; i++){

            optTmpl+= '<option value="' + this.customers[i]['id']  + '">' + this.customers[i]['name'] + '</option>';

        }

        return optTmpl;

    },
    _reset : function() {

    	this.selectedConsultant = 'default';
        $('#proj-frm-title').val('');
        $('#proj-frm-des').val('');
        $('#proj-frm-budget').val('');
        $('#proj-frm-ec').val('');
        $('#proj-frm-lc').val('');
        if(this.customers.length > 1){
        	$('#proj-frm-cus').val('default');
        }
        $("#proj-frm-con").ddlist('select', { index: 0, value: 'default', text: 'Select Consultant For Project' });
    },
    _submitData : function(data){

        var _this = this;
        $('#' + this.id + '-new-project-loading').show();
        $('#' + this.id + '-new-project-btn').attr('disabled',true);
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/project/save',
            data: data
        }).success(function (response) {
            $('#' + _this.id + '-new-project-loading').hide();
            $('#' + _this.id + '-new-project-btn').attr('disabled',false);
            _this._reset();
            
            if (response && response['type'] === 'SUCCESS') {
	            bootbox.dialog({
	                closeButton: false,
	                message: response['msg'] + ' To add floor plans for this project click "Floor Plans" or click "Exit" for move forward',
	                className:"logout-dialog",
	                buttons: {
	                    main:{
	                        label: "Floor Plans",
	                        callback: function(){
	                        	//location.href = 'msl-view-projects'
	                        	var importImages = new ImportImages(response['data'], 'msl-projects-components', 'msl-projects-components',true);
	                            importImages.init();
	                        }
	                    },
	                    cancel:{
	                        label: "Exit",
	                        callback: function(){
	                        	location.href = 'msl-view-projects';
	                        }
	                    }
	                }
	            });
            }else{
				alertify.error(response['msg']);
			} 
        }).fail(function (e) {
            alertify.error("Failed to create Project due to System fault.");
            $('#' + _this.id + '-new-project-loading').hide();
            $('#' + _this.id + '-new-project-btn').attr('disabled',false);
        });


    }

};
