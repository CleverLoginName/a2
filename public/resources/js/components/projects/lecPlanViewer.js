var LECPlanViewer = function (projectId, containerId,data) {

    this.id = UUID();
    this.container = $('#' + containerId);
    this.projectId = projectId;
    this.data = data;

};
LECPlanViewer.prototype = {

    init: function () {

        this._initUI();
        this._initEvents();

        window.breadcrumb.addItem('Plans', $(this.container).attr('id'));

    },
    _initUI: function () {

        this.container.empty();

        var thumbsTmpl = '<section class="thumb-wrapper"><section class="no-floor-plan" style="display:none" id="viewer-no-attached">There is no currently added floor plans for this Project. Please Edit the project and add your plan in to system.</section>';

        for (var i = 0; i < this.data.length; i += 3) {

            thumbsTmpl += '<div class="row margin-bottom-15">';
            for (var j = 0; j < 3; j++) {

                if (this.data[i + j]) {
                    
                    thumbsTmpl += '<div class="col-xs-6 col-md-4">'                   
                    
                    
                    +'<a class="thumbnail" data-project-id="' + this.projectId + '" data-plan-id="' + this.data[i + j]['planId'] + '"  data-img-id="' + (i + j)
                    +'" id="' + this.id + '-thumb-' + i + '" data-is-edited="' + this.data[i + j]['edited'] + '">'
                    +'<img src="' + mapUrlAsExternalRes(this.data[i + j]['url']) + '" alt="...">' + '</a>'
                    
                    +'<section class="row margin-bottom-5 plan-title-row"  id="' + this.data[i + j]['planId'] + '-name">'
                    +'<section class="col-md-10 plan-title" id="' + this.data[i + j]['planId'] + '-name-fld">' + this.data[i + j]['name']  + '</section>'
                    
                    +'<section class="col-md-2 plan-btn-wrapper">'
                    +'<a class="plan-btn btn-app" id="' + this.data[i + j]['planId'] + '-name-edit-action" data-plan-id="' + this.data[i + j]['planId'] + '"  data-toggle="tooltip" data-placement="top" title="Edit">'
                    +'<i class="fa fa-edit"></i>'
                    +'</a>'
                    
                    +'</section>'  
                    
                    +'</section>'
                    
                    +'<section class="row margin-bottom-5 plan-title-row" style="display:none;" id="' + this.data[i + j]['planId'] + '-edit-name">'
                    +'<section class="col-md-9 padding-0"><input type="text" class="form-control required" id="' + this.data[i + j]['planId'] + '-plan-frm-name" value="' + this.data[i + j]['name'] + '"/></section>'
                    
                    + '<section class="col-md-3 plan-btn-wrapper">'
                    +'<a class="plan-btn btn-app" id="' + this.data[i + j]['planId'] + '-name-edit-save-action" data-plan-id="' + this.data[i + j]['planId'] + '"  data-toggle="tooltip" data-placement="top" title="Save">'
                    +'<i class="fa fa-save"></i>'
                    +'</a>'
                    
                    +'<a class="plan-btn btn-app" id="' + this.data[i + j]['planId'] + '-name-edit-cancel-action" data-plan-id="' + this.data[i + j]['planId'] + '"  data-toggle="tooltip" data-placement="top" title="Cancel">'
                    +'<i class="fa fa-mail-reply"></i>'
                    +'</a>'
                    +'</section>'
                    
                    +'</section>'
                    
                    +'</div>';

                }

            }
            thumbsTmpl += '</div>';

        }

        thumbsTmpl += '</section>';

        $(thumbsTmpl).appendTo(this.container);

        if (this.data.length === 0) {
            $('#viewer-no-attached').show();
        }

    },
    _initEvents: function () {

    	$('[data-toggle="tooltip"]').tooltip();

        $('[id^="' + this.id + '-thumb-"]').on('click', function () {

            $(document).trigger('open/designView', {
                "projectId" : $(this).attr('data-project-id'),
                "planId" : $(this).attr('data-plan-id'),
                "isEdited" : $(this).attr('data-is-edited')
            });

        });
        
        $('[id$="-name-edit-action"]').on('click', function () {

            var planId = $(this).attr('data-plan-id');
            $('#' + planId +'-name').hide();
            $('#' + planId +'-edit-name').show();
            $('#' + planId + '-plan-frm-name').val($('#' + planId + '-name-fld').text());

        });
        
        $('[id$="-name-edit-cancel-action"]').on('click', function () {

            var planId = $(this).attr('data-plan-id');
            $('#' + planId +'-edit-name').hide();
            $('#' + planId +'-name').show();  
            $('#' + planId + '-plan-frm-name').val('');

        });
        
        $('[id$="-name-edit-save-action"]').on('click', function () {

            var planId = $(this).attr('data-plan-id'),
            	newPlanName = $('#' + planId + '-plan-frm-name').val();
            
            $.ajax({
                type: 'POST',
                dataType: "json",
                contentType: 'application/json',
                url: 'restAPI/plan/' + planId + '/update/name',
                data: newPlanName
            }).success(function (response) {                
                
                if (response && response['type'] === 'SUCCESS') {
                	alertify.success(response['msg']);
                	$('#' + planId + '-name-fld').text(newPlanName);
                    $('#' + planId +'-edit-name').hide();
                    $('#' + planId +'-name').show(); 
                                 
                }else{
                	alertify.error(response['msg']);
                } 
                
            }).fail(function (e) {
            	alertify.error("Failed to Update plan name due to System Fault.");
            });           

        });

    }

};