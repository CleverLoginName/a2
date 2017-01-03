var LMPlanViewer = function (projectId, containerId,returningId,data) {

    this.id = UUID();
    this.containerId = containerId;
    this.returningId = returningId;
    this.container = $('#' + containerId);
    this.projectId = projectId;
    this.data = data;

};
LMPlanViewer.prototype = {

    init: function () {

        this._initUI();
        this._initEvents();

    },
    _initUI: function () {

        this.container.empty();

        var thumbsTmpl = '<section class="thumb-wrapper new-item-wrapper box"><section class="box-body">' +
            '<section class="no-floor-plan" style="display:none" id="viewer-no-attached">There is no currently added floor plans for this Project. Please Edit the project and add your plan in to system.</section>';

        for (var i = 0; i < this.data.length; i += 3) {

            thumbsTmpl += '<div class="row" style="margin-bottom:15px;">';
            for (var j = 0; j < 3; j++) {

                if (this.data[i + j]) {

                    thumbsTmpl += '<div class="col-xs-6 col-md-4">'                    	
                    + '<a class="thumbnail" data-project-id="' + this.projectId + '" data-plan-id="' + this.data[i + j]['planId'] + '"  data-img-id="' + (i + j)
                    + '" id="' + this.id + '-thumb-' + i + '" data-is-edited="' + this.data[i + j]['edited'] + '">'
                    + '<img src="' + mapUrlAsExternalRes(this.data[i + j]['url']) + '" alt="..." class="">' + '</a>'
                    +'<section class="row margin-bottom-5 plan-title-row-view plan-title-view">' + this.data[i + j]['name']  + '</section>'                    	
                    
                    + '</div>';

                }

            }
            thumbsTmpl += '</div>';

        }

        thumbsTmpl += '</section>' + 
        '<section class="row box-footer">' +
        '<button class="btn add-item-btn" id="tplan-viewer-back-btn"><i class="fa fa-mail-reply"></i> Back</button>' +
        '</section>' +
        +'</<section>';

        $(thumbsTmpl).appendTo(this.container);

        if (this.data.length === 0) {
            $('#viewer-no-attached').show();
        }

    },
    _initEvents: function () {

        var _this = this;

        $('#tplan-viewer-back-btn').on('click',function(e){

            $('#' +  _this.containerId).hide();
            $('#' +  _this.returningId).show();

            e.preventDefault();

        });
        
        $('[id^="' + this.id + '-thumb-"]').on('click', function () {

            $(document).trigger('open/designView', {
                "projectId" : $(this).attr('data-project-id'),
                "planId" : $(this).attr('data-plan-id'),
                "isEdited" : $(this).attr('data-is-edited')
            });

        });


    }

};