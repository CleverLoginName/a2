/**
 * Created by devthree on 1/5/15.
 */
var ImportImages = function (projectId, containerId, returnId,inline) {

    this.projectId = projectId;
    this.container = $('#' + containerId);
    this.returnContainer = $('#' + returnId);
    this.id = UUID();
    this.recentUploads = new Array();
    this.attachedImagesCount = 0;
    this.newList = new Array();
    this.removeList = new Array();
    this.defaultPlanCount = 0;
    this.existingExtractedPlans = 0;
    this.plans = 0;
    this.inline = inline;

};
ImportImages.prototype = {

    init: function () {

        this.container.empty();
        var wrapper = '<section class="row import-image-wrapper box">' +
            '<section class="row selected-wrapper" id="' + this.id + '-selection-wrapper">' +

            '<section class="row" id="' + this.id + '-extracted-plans-wrapper">' +

            '<h4 class="heading-white upload-heading">' +
            'Upload Your Floor Plans' +
            '<button class="btn  modal-done-btn margin-left-20" id="' + this.id + '-plus"  data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Add Floor Plans"><i class="fa fa-plus"></i></button>' +
            '</h4>' +
            '<h4 class="heading-white margin-left-20 padding-top-10" id="extracted-heading">' +
            'Extracted Floor Plans' +
            '</h4>' +
            '<section class="row extracted overflow-y" id="' + this.id + '-extracted-plans">' +
            '<section class="no-floor-plan" id="no-extracted-floor-plan">There is no Extracted Floor Plans. Please Upload Your Plans.</section>' +
            '</section>' +
            '</section>' +
            '<h4 class="heading-white margin-left-20 padding-top-10">Selected Floor Plans for Designing</h4>' +
            '<section class="row upload-selected-wrapper" id="' + this.id + '-selected-plans-wrapper">' +

            '<section class="row selected overflow-y" id="' + this.id + '-selected-plans">' +
            '<section class="row content-home-loading loading-wrapper" id="plan-loading">Loading ....<div class="loader loading"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div></section>' +
            '<section class="no-floor-plan" style="display:none" id="no-attached">There is no selected Floor Plans for Design, Please select from Extracted Floor Plans.</section>' +
            '</section>' +
            '</section>' +

            '<section class="row import-image-heading">' +
            '<button class="btn  modal-s-btn" id="' + this.id + '-done" style="display:none;">Save and Exit <i class="fa fa-spinner" id="save-and-exit-spinner" style="display:none"></i></button>' +
            '<button class="btn  modal-cancel-btn margin-right-5" id="' + this.id + '-cancel">Cancel</button>' +
            '</section>' +

            '</section>' +
            '<section class="row margin-left-right-0 import-upload" style="display: none;" id="' + this.id + '-upload-wrapper"></section>' +
            '<section class="row margin-left-right-0 import-upload" style="display: none;" id="' + this.id + '-manual-wrapper"></section>' +

            '</section>';

        $(wrapper).appendTo(this.container);
        this._initEvents();
        this._initData();

        if(!this.inline)
        	window.breadcrumb.addItem('Extract Floor Plans', $(this.container).attr('id'));

    },
    _initData: function () {


        var _this = this;
        $.ajax({
            url: "restAPI/project/" + this.projectId + "/plans/base",
            context: document.body
        }).done(function (response) {


        	if (response && response['type'] === 'SUCCESS') {
        		setTimeout(function(){

        			var plans = response['data']['plans'];
                    $('#plan-loading').remove();
                    for (var i = 0; i < plans.length; i++) {

                        _this._addAttachedImage(_this._prepareSection(plans[i]), 'true');

                    }

                    _this.plans = plans.length;
                    _this.defaultPlanCount = plans.length;

                    if (_this.attachedImagesCount === 0) {
                        $('#no-attached').show();
                    }

                },300);
			}else{
				alertify.error(response['msg']);
			} 


        }).fail(function () {
        	alertify.error("Failed to load Project's Plans due to System Fault.");
        });


    },
    _initEvents: function () {


        var _this = this;
        $('[data-toggle="tooltip"]').tooltip();

        $('#' + this.id + '-plus').on('click', function () {

            $('#' +  _this.id + '-selection-wrapper').hide();
            $('#' +  _this.id + '-upload-wrapper').show();
            var upload = new Upload(_this.id + '-upload-wrapper',_this.id + '-selection-wrapper');
            upload.init();
            _this.recentUploads = new Array();


        });

        var _this = this;
        $(document).on('extracted/newImages', function (e, data) {

            if (data.images.length !== 0) {

                var sections = _this._prepareSections(data.images);

                for (var i = 0; i < sections.length; i++) {

                    _this._addExtractedImage(sections[i], 'false');
                    _this.recentUploads.push(sections[i]['id']);

                }


            }

        });

        $(document).on('clear/images', function () {

            for (var i = 0; i < _this.recentUploads.length; i++) {

                $('#' + _this.recentUploads[i] + '-extracted-image-wrapper').remove();

            }

        });

        $('#' + this.id + '-done').on('click', function () {


            _this._saveAndExitAction();


        });

        $('#' + this.id + '-cancel').on('click', function () {


            $(document).trigger('breadcrumb/reset',{'ref' : _this.returnContainer.attr('id'), 'index' : 2});
            $(document).trigger('import/exit');


        });


    },
    _addAttachedImage: function (imageItem, isSaved) {

        $('#no-attached').hide();

        var url = mapUrlAsExternalRes(imageItem['url']),
            absUrl = '';

        if (isSaved === 'false') {
            absUrl = imageItem['url'];
        }

        var imageItemTmpl = '<section id="' + imageItem['id'] + '-image-wrapper" class="col-md-3 image-wrapper">' +
            '<section class="">' +
            '<a class="thumbnail" id="' + imageItem['id'] + '-image">' +
            '<img class="img-thumb" id="' + imageItem['id'] + '-img" data-abs-url="' + absUrl + '"  src="' + url + '" alt="..."/>' +
            '<span class="btn-plus image-remove" data-image-id="' + imageItem['id'] + '" id="' + imageItem['id'] + '-image-remove" data-is-saved="' + isSaved + '" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Remove">' +
            '<i class="fa fa-times"></i>' +
            '</span>' +
            '</a>' +
            '</section>' +
            '</section>';

        $(imageItemTmpl).prependTo($('#' + this.id + '-selected-plans'));
        var _this = this;

        $('#' + imageItem['id'] + '-image-remove').on('click', function () {

            var imageId = $(this).attr('data-image-id');
            var isSaved = $(this).attr('data-is-saved');
            _this._addExtractedImage(imageItem, isSaved);

            if (isSaved === 'false')
                _this._removeFromNewList(imageId);
            else
                _this.removeList.push(imageId)

            $('#' + imageId + '-image-wrapper').remove();
            _this.attachedImagesCount--;
            _this.plans--;
            if (_this.attachedImagesCount === 0) {
                $('#no-attached').show();
            }

            //_this.existingExtractedPlans++;
            //_this._resetExtractedMsg();
            _this._resetSaveActionStatus();

        });

        $('[data-toggle="tooltip"]').tooltip();

        this.attachedImagesCount++;

    },
    _addExtractedImage: function (imageItem, isSaved) {

        var url = mapUrlAsExternalRes(imageItem['url'])

        if (isSaved === 'false') {
            url = mapUrlAsExternalRes(imageItem['url']);
        }

        var imageItemTmpl = '<section id="' + imageItem['id'] + '-extracted-image-wrapper" class="col-md-3 image-wrapper">' +
            '<section class="">' +
            '<a class="thumbnail" id="' + imageItem['id'] + '-image">' +
            '<img class="img-thumb" src="' + url + '" alt="..."/>' +
            '<span class="btn-plus image-add" data-image-id="' + imageItem['id'] + '" id="' + imageItem['id'] + '-image-add" data-is-saved="' + isSaved + '" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Select">' +
            '<i class="fa fa-plus"></i>' +
            '</span>' +
            '</a>' +
            '</section>' +
            '</section>';

        $(imageItemTmpl).prependTo($('#' + this.id + '-extracted-plans'));

        var _this = this;
        $('#' + imageItem['id'] + '-image-add').on('click', function () {

            var imageId = $(this).attr('data-image-id');
            var isSaved = $(this).attr('data-is-saved');
            $('#' + imageId + '-extracted-image-wrapper').remove();
            _this._addAttachedImage(imageItem, isSaved);
            _this.plans++;
            if (isSaved === 'false')
                _this.newList.push(imageId);
            else
                _this._removeFromRemoveList(imageId)

            _this.existingExtractedPlans--;
            _this._resetExtractedMsg();
            _this._resetSaveActionStatus();


        });

        $('[data-toggle="tooltip"]').tooltip();
        this.existingExtractedPlans++;
        this._resetExtractedMsg();

    },
    _prepareSections: function (images) {

        var sections = new Array();

        for (var i = 0; i < images.length; i++) {

            var planItem = new Object();
            planItem['url'] = images[i];
            planItem['id'] = UUID();

            sections.push(planItem);
        }

        return sections;

    },
    _prepareSection: function (image) {

        var planItem = new Object();
        planItem['url'] = image['url'];
        planItem['id'] = image['planId'];

        return planItem;

    },
    _removeFromNewList: function (imageId) {

        var tmpNewList = this.newList;
        for (var i = 0; i < this.newList.length; i++) {

            if (this.newList[i] === imageId) {
                tmpNewList.splice(i, 1);
                break;
            }

        }

        this.newList = tmpNewList;

    },
    _removeFromRemoveList: function (imageId) {

        var tmpRemoveList = this.removeList;
        for (var i = 0; i < this.removeList.length; i++) {

            if (this.removeList[i] === imageId) {
                tmpRemoveList.splice(i, 1);
                break;
            }

        }

        this.removeList = tmpRemoveList;

    },
    _saveAndExitAction: function () {

        $('#save-and-exit-spinner').show();
        if (this.newList.length !== 0 || this.removeList.length !== 0) {

            this._saveAndExitAddAction();


        } else {

            $(document).trigger('breadcrumb/reset',{'ref' : this.returnContainer.attr('id'), 'index' : 2});

        }

    },
    _saveAndExitAddAction: function () {
        var imgObject = new Object(),
            imgs = new Array(),
            _this = this;

        for (var i = 0; i < this.newList.length; i++) {

            var imageId = this.newList[i];
            var src = $('#' + imageId + '-img').attr('data-abs-url');
            imgs.push(src);

        }

        imgObject['projectId'] = this.projectId;
        imgObject['extractedImages'] = imgs;


        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/plan/save/list',
            data: JSON.stringify(imgObject)
        }).success(function (response) {
        	if (response && response['type'] === 'SUCCESS') {
        		_this._saveAndExitRemoveAction();
        	}else{
        		alertify.error(response['msg']);
        	}             
        }).fail(function (e) {
        	alertify.error("Failed to Save Project Plans due to System fault.");
        });
    },
    _saveAndExitRemoveAction: function () {

    	var data = new Object();
    	data['ids'] = this.removeList;
    	var _this = this;
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/plan/remove/list',
            data: JSON.stringify(data)
        }).success(function (response) {

        	if (response && response['type'] === 'SUCCESS') {
        		if (_this.defaultPlanCount === 0) {
                    _this._saveAndExitProjectUpdateAction("INPROGRESS");
                } else if (_this.plans === 0) {
                    _this._saveAndExitProjectUpdateAction("NEW");
                } else {
                    alertify.success("Changes  Successfully applied... ");

                    $(document).trigger('update/actions', {
                        'projectId': _this.projectId,
                        'plans': _this.plans
                    });
                    $(document).trigger('breadcrumb/reset',{'ref' : _this.returnContainer.attr('id'), 'index' : 2});

            		$(document).trigger('import/save/exit');
                }

        	}else{
        		alertify.error(response['msg']);
        	}
            
        }).fail(function (e) {
            alertify.error("Failed to Remove Project Plans due to System fault.");
        });

    },
    _saveAndExitProjectUpdateAction: function (status) {

        var _this = this;
        $.ajax({
            url: "restAPI/project/" + this.projectId + "/status/" + status,
            context: document.body
        }).done(function (response) {

        	if (response && response['type'] === 'SUCCESS') {
        		alertify.success("Changes  Successfully applied... ");

                _this._changeProjectStatus(status);
                $(document).trigger('update/actions', {
                    'projectId': _this.projectId,
                    'plans': _this.plans
                });
                $(document).trigger('breadcrumb/reset',{'ref' : _this.returnContainer.attr('id'), 'index' : 2});

        		$(document).trigger('import/save/exit');
        	}else{
        		alertify.error(response['msg']);
        	} 
            

        }).fail(function () {
            alertify.error("Failed to Update Project Ststus due to System fault.");
        });

    },
    _changeProjectStatus: function (status) {

        $(document).trigger('update/projectDashboard', {
            'projectId': this.projectId,
            'property': "status",
            'value': status
        });

    },
    _resetSaveActionStatus : function(){

        if(this.newList.length === 0 && this.removeList.length === 0){
            $('#' + this.id + '-done').hide();
        }else{
            $('#' + this.id + '-done').show();
        }

    },
    _resetExtractedMsg : function(){


        if(this.existingExtractedPlans === 0){
            $('#no-extracted-floor-plan').text('You have selected all available floor plans.');
            $('#no-extracted-floor-plan').show();
            //$('#extracted-heading').hide();
        }else{
            $('#no-extracted-floor-plan').hide();
            //$('#extracted-heading').show();
        }

    }


};
