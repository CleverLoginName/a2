/**
 * Created by devthree on 1/5/15.
 */
var Upload = function (containerId,returnId) {

    this.container = $('#' + containerId);
    this.returnContainer = $('#' + returnId);
    this.id = UUID();
    this.successUploads = 0;
    this.currentUploads = 0;
    this.responseRecieved = 0;

};
Upload.prototype = {

    init: function () {

        var uploadTmpl = '<section class="row thumb-wrapper import-upload-wrapper">' +
            '<section class="row import-upload-actions">' +
            '<div class="row margin-left-right-0 upload-heading font-size-18" id="upload-actions">Upload your Plan (PDF fotmat Or Image Format). Maximum 20MB allowed.' +
            '</div>' +
            '</section>' +
            '<section class="row import-upload-body">' +
            '<form id="upload" method="post" action="" enctype="multipart/form-data"><div id="drop">Drop Here or <a>Browse</a>' +
            '<input type="file" name="upl" id="upl"/></div>' +
            '</form>' +
            '<div class="row margin-left-right-0 file-list file-info overflow-y" id="upload-file-list">' +
            '</div>' +
            '</section>' +
            '<section class="row import-upload-actions" style="margin-bottom:10px;">' +
            '<button class="btn  upload-next import-cancel-btn margin-right-10" id="' + this.id + '-upload-cancel">Cancel</button>' +
            '<button class="btn  upload-next import-done-btn" id="' + this.id + '-upload-done" disabled="true">Finish Upload</button>' +
            '</div>' +
            '</section>' +
            '</section>';

        this.container.empty();
        $(uploadTmpl).appendTo(this.container);

        this._initUpload();
        this._initEvents();

    },
    _initEvents: function () {

        var _this = this;
        $('#' + this.id + '-upload-cancel').on('click', function () {

            $(document).trigger('clear/images');
            _this.container.hide();
            _this.returnContainer.show();

        });

        $('#' + this.id + '-upload-done').on('click', function () {

            _this.container.hide();
            _this.returnContainer.show();

        });

        $(document).on('manualy/selected', function () {

            _this._getProgressIndicator(_this.responseRecieved -1, '.response-err-msg').text("");
            _this._getProgressIndicator(_this.responseRecieved -1, '.response-suc-msg').text("Floor Plans Manually Selected");
            $('#' + _this.id + '-upload-done').attr('disabled',false);

        });

    },
    _initUpload: function () {

        var ul = $('#upload ul'), _this = this;

        $('#drop a').click(function () {
            $(this).parent().find('#upl').click();
        });

        this.currentUploads = 0;

        $('#upload')
            .fileupload(
            {

                dropZone: $('#drop'),

                url: "restAPI/project/plan/upload",

                add: function (e, data) {

                    var tpl = $('<div class="col-md-12 working file-item-wrapper">'
                    + '<div class="row file-item">'
                    + '<div class="file-status-wrapper">'
                    + '<div class="loader loading" style="display:none;"><div class="spinner">'
                    + '<div class="double-bounce1"></div>'
                    + '<div class="double-bounce2"></div>'
                    + '</div></div>'
                    + '<div class="loading-done" style="display:none;"><i class="fa fa-check"></i></div><div class="loading-fail" style="display:none;"><i class="fa fa-times"></i></div></div>'
                    + '<div class="file-details"></div>'
                    + '<span class="response-err-msg"></span>'
                    + '<span class="response-suc-msg"></span>'
                    + '</div>'
                    + '</div>');

                    tpl
                        .find('.file-details')
                        .text(data.files[0].name)
                        .append(
                        '<i style="margin-left: 15px;">'
                        + formatFileSize(data.files[0].size)
                        + '</i>');

                    data.context = tpl
                        .appendTo($('.file-list'));

                    //tpl.find('input').knob();

                    tpl.find('span').click(function () {

                        if (tpl.hasClass('working')) {
                            jqXHR.abort();
                        }

                        tpl.fadeOut(function () {
                            tpl.remove();
                        });

                    });

                    var jqXHR = data.submit();
                    _this._getProgressIndicator(_this.currentUploads, '.loading').show();
                    _this.currentUploads++;

                },

                progress: function (e, data) {

                    var progress = parseInt(data.loaded
                    / data.total * 100, 10);

                    data.context.find('input').val(progress)
                        .change();

                    if (progress == 100) {
                        data.context.removeClass('working');
                    }
                },

                fail: function (e, data) {
                    data.context.addClass('error');
                    _this._getProgressIndicator(_this.responseRecieved, '.response-err-msg').text("Error Occurred ....");
                    _this._getProgressIndicator(_this.responseRecieved, '.loading').hide();
                    _this._getProgressIndicator(_this.responseRecieved, '.loading-fail').show();
                    _this.responseRecieved++;
                },

                done: function (e, data) {

                    if (data.result.type === "ERROR") {
                        _this._handleUploadError(data);
                    } else {
                    	$('#' + _this.id + '-upload-done').attr('disabled',false);
                        _this._handleUploadSuccess(data);
                    }
                    _this.responseRecieved++;

                }

            });

        $(document).on('drop dragover', function (e) {
            e.preventDefault();
        });

    },
    _getProgressIndicator: function (index, indicator) {
        return $($($('.file-item')[index]).find(indicator)[0]);
    },
    _handleUploadError : function(data){

        var _this = this;
        alertify.error(data.result.msg);
        this._getProgressIndicator(this.responseRecieved, '.loading').hide();
        this._getProgressIndicator(this.responseRecieved, '.loading-fail').show();
        this._getProgressIndicator(this.responseRecieved, '.response-err-msg').text(data.result.msg);
        if(data.result.resultCode === 8822){
            bootbox.dialog({
                closeButton: false,
                message: 'System can not detect Floor Plans in uploaded file. Do you wish to select the Floor Plan Area manually?',
                className:"logout-dialog",
                buttons: {
                    main:{
                        label: "Yes",
                        className: "btn btn-primary",
                        callback: function(e){
                            _this._handleManualyDetectPdf(data);
                            e.preventDefault();
                        }
                    },
                    sucess:{
                        label: "No",
                        className: "btn btn-default",
                        callback: function(){

                        }
                    }
                }
            });
        }else if(data.result.resultCode === 8855){
            bootbox.dialog({
                closeButton: false,
                message: 'System can not detect Floor Plans in uploaded file. Do you wish to select the Floor Plan Area manually?',
                className:"logout-dialog",
                buttons: {
                    main:{
                        label: "Yes",
                        className: "btn btn-primary",
                        callback: function(){
                            _this._handleManualyDetectImage(data);
                        }
                    },
                    sucess:{
                        label: "No",
                        className: "btn btn-default",
                        callback: function(){

                        }
                    }
                }
            });
        }

    },
    _handleUploadSuccess : function(data){

        alertify.success(data.result.msg);
        this.successUploads++;
        this._getProgressIndicator(this.responseRecieved, '.response-suc-msg').text(data.result.data.length + " floor plans found according to detect criteria.");
        this._getProgressIndicator(this.responseRecieved, '.loading').hide();
        this._getProgressIndicator(this.responseRecieved, '.loading-done').show();
        $(document).trigger('extracted/newImages', {'images': data.result.data});

    },
    _handleManualyDetectPdf : function(data) {

        this._getProgressIndicator(this.responseRecieved-1, '.loading').show();
        var obj = new Object(),
            _this = this;
        obj['path'] = data.result.data;
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/project/plans/convert/pdf/image',
            data: JSON.stringify(obj)
        }).success(function (response) {
            if (response.type === "ERROR") {
                alertify.error("Failed to Convert PDF to Image due to " + response.msg);
            } else {
                alertify.success("File Successfully converted to Images");
                var uploadContainerId = _this.container.attr('id'),
                    selectionContainerId = uploadContainerId.replace('upload','manual');
                var manualSelection = new ManualSelection(selectionContainerId,uploadContainerId,response.data);
                manualSelection.init();
                _this.container.hide();
                $('#' + selectionContainerId).show();
                //$(document).trigger('extracted/newImages', {'images': response.data});
            }
            _this._getProgressIndicator(_this.responseRecieved-1, '.loading').hide();
            _this._getProgressIndicator(_this.responseRecieved-1, '.loading-done').show();
        }).fail(function (e) {
            alertify.error("Failed to Convert PDF to Image at this moment due to System Fault");
            _this._getProgressIndicator(_this.responseRecieved-1, '.loading').hide();
            _this._getProgressIndicator(_this.responseRecieved-1, '.loading-done').show();
        });

    },
    _handleManualyDetectImage : function(data) {

        this._getProgressIndicator(this.responseRecieved-1, '.loading').show();
        var obj = new Object(),
            _this = this;
        obj['path'] = data.result.data;
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: 'restAPI/project/plans/make/image/resource',
            data: JSON.stringify(obj)
        }).success(function (response) {
            if (response.type === "ERROR") {
                alertify.error("Failed to Move Image");
            } else {
                alertify.success("Image Successfully moved");
                var uploadContainerId = _this.container.attr('id'),
                    selectionContainerId = uploadContainerId.replace('upload','manual'),
                    images = new Array();
                images.push(response.data);
                var manualSelection = new ManualSelection(selectionContainerId,uploadContainerId,images);
                manualSelection.init();
                _this.container.hide();
                $('#' + selectionContainerId).show();
            }
            _this._getProgressIndicator(_this.responseRecieved-1, '.loading').hide();
            _this._getProgressIndicator(_this.responseRecieved-1, '.loading-done').show();
        }).fail(function (e) {
            alertify.error("Failed to Convert PDF to Image at this moment due to System Fault.");
            _this._getProgressIndicator(_this.responseRecieved-1, '.loading').hide();
            _this._getProgressIndicator(_this.responseRecieved-1, '.loading-done').show();
        });

    }

};